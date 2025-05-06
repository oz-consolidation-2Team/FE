import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axiosInstance from '@/apis/axiosInstance';
import Modal from '@/components/common/Modal';

const VerifyEmailPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [modal, setModal] = useState(null);

  useEffect(() => {
    const token = searchParams.get('token');
    const userType = searchParams.get('user_type');

    const verifyEmail = async () => {
      try {
        await axiosInstance.get('/verify-email', {
          params: { token, user_type: userType },
        });

        setModal({
          type: 'success',
          title: '이메일 인증 완료',
          message: '이메일 인증이 정상적으로 완료되었습니다.',
          onConfirm: () => {
            setModal(null);
            navigate('/login');
          },
        });

      } catch (err) {
        const detail = err.response?.data?.detail || '';
        let title = '인증 실패';
        let message = '이메일 인증에 실패했습니다.';

        if (detail.includes('이미 인증된 이메일')) {
          title = '이미 인증됨';
          message = detail;
        } else if (detail.includes('토큰이 만료')) {
          title = '만료된 링크';
          message = detail;
        }

        setModal({
          type: 'error',
          title,
          message,
          onConfirm: () => {
            setModal(null);
            navigate('/login');
          },
        });
      }
    };

    if (token) verifyEmail();
  }, [searchParams, navigate]);

  return <>{modal && <Modal {...modal} />}</>;
};

export default VerifyEmailPage;
