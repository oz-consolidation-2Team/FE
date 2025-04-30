import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginWithNaver } from '@/apis/authApi';

const NaverCallbackPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const url = new URL(window.location.href);
    const code = url.searchParams.get('code');
    const state = url.searchParams.get('state');

    if (code) {
      loginWithNaver(code, state)
        .then((res) => {
          const { status, data } = res;

          if (status === 'need_register') {
            navigate('/user-signup', {
              state: {
                fromSocial: true,
                user: data,
              },
            });
            return;
          }

          const { access_token, refresh_token } = data;
          localStorage.setItem('access_token', access_token);
          localStorage.setItem('refresh_token', refresh_token);
          localStorage.setItem('userType', 'user');
          navigate('/');
        })
        .catch((err) => {
          console.error('❌ 네이버 로그인 실패:', err);
          navigate('/login');
        });
    }
  }, []);

  return <div>네이버 로그인 처리 중입니다...</div>;
};

export default NaverCallbackPage;