import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axiosPublicInstance from '@/apis/axiosPublicInstance';
import './VerifyEmailPage.scss';

const VerifyEmailPage = () => {
  const [searchParams] = useSearchParams();
  const [message, setMessage] = useState('이메일 인증이 완료되었습니다!');

  const handleConfirm = () => {
    window.close();
  };

  useEffect(() => {
    const token = searchParams.get('token');
    const userType = searchParams.get('user_type');

    if (token && userType) {
      verifyEmail(token, userType);
    }
  }, [searchParams]);

  const verifyEmail = async (token, userType) => {
    try {
      await axiosPublicInstance.get('/verify-email', {
        params: { token, user_type: userType },
      });
      setMessage('이메일 인증이 완료되었습니다!');
    } catch (err) {
      const errorMsg = err.response?.data?.detail || '이메일 인증에 실패했습니다.';
      setMessage(errorMsg);
    }
  };

  return (
    <div className="verify-email-page">
      <div className="email-container">
        <img src="/public/senior_logo.png" alt="Secondary Logo" className="secondary-logo" />
        <img src="/public/logo.png" alt="Main Logo" className="main-logo" />

        <h1>{message}</h1>

        <button className="confirm-btn" onClick={handleConfirm}>
          확인
        </button>
      </div>
    </div>
  );
};

export default VerifyEmailPage;
