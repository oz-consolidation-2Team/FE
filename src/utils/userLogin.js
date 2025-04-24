import { loginUser, logoutUser } from '@/apis/authApi';
import { validateEmail, validatePassword } from '@/utils/validation';

export const handleUserLogin = async ({ form, userType, setErrors, setModal, navigate }) => {
  const newErrors = {};

  if (!validateEmail(form.email)) newErrors.email = '올바른 이메일 형식이 아닙니다.';
  if (!validatePassword(form.password)) newErrors.password = '비밀번호 형식이 올바르지 않습니다.';

  if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors);
    return;
  }

  try {
    const token = await loginUser(form.email, form.password);
    console.log('[로그인 성공] 토큰:', token);

    localStorage.setItem('userType', userType);
    localStorage.setItem('access_token', token.access_token);
    localStorage.setItem('refresh_token', token.refresh_token);

    setModal({
      type: 'success',
      message: '로그인 완료!',
      onConfirm: () => {
        setModal(null);
        navigate('/');
      },
    });
  } catch (err) {
    const statusCode = err?.response?.status;
    const serverMessage = err?.response?.data?.detail;
    let message;

    switch (statusCode) {
      case 401:
        message = serverMessage || '이메일 또는 비밀번호가 일치하지 않습니다.';
        break;
      case 500:
        message = serverMessage || '서버 내부 오류가 발생했습니다.';
        break;
      default:
        message = serverMessage || '알 수 없는 오류가 발생했습니다.';
    }

    setModal({
      type: 'error',
      message,
      onConfirm: () => setModal(null),
    });
  }
};

export const handleUserLogout = async ({ setModal, navigate }) => {
  try {
    await logoutUser();
    localStorage.removeItem('userType');
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');

    setModal({
      type: 'success',
      title: '로그아웃 완료',
      message: '정상적으로 로그아웃되었습니다.',
      onConfirm: () => {
        setModal(null);
        navigate('/');
      },
    });
  } catch (err) {
    const code = err.response?.data?.code;
    const message = err.response?.data?.message;

    let title = '로그아웃 실패';
    let displayMessage = message || '알 수 없는 오류가 발생했습니다.';
    if (code === 401) {
      displayMessage = '유효하지 않은 토큰값입니다. 다시 로그인해주세요.';
    } else if (code === 500) {
      displayMessage = '로그아웃 처리 중 문제가 발생했습니다. 잠시 후 다시 시도해주세요.';
    }

    setModal({
      type: 'error',
      title,
      message: displayMessage,
      onConfirm: () => setModal(null),
    });
  }
};
