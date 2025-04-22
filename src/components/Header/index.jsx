import React from 'react';
import './Header.scss';
import { useNavigate } from 'react-router-dom';
import useUserStore from '@/utils/userStore';
import { logoutUser } from '@/apis/authApi';
import Modal from '@/components/common/Modal';

const Header = () => {
  const navigate = useNavigate();
  const { user, logout } = useUserStore();
  const [modal, setModal] = React.useState(null);

  const goTo = (path) => () => navigate(path);

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (err) {
      console.warn('서버 로그아웃 실패:', err);
    }
  
    logout();
  
    setModal({
      type: 'success',
      title: '로그아웃 완료',
      message: '정상적으로 로그아웃되었습니다.',
      onConfirm: () => {
        setModal(null);
        navigate('/');
      },
    });
  };

  return (
    <>
    <header className="gnb">
      <div className="gnb_inner">
        <div className="left_nav">
          <div className="logo" onClick={goTo('/')}>
            <img src="/logo.png" alt="시니어 내일 로고" />
          </div>
          <ul className="nav_links">
            <li onClick={goTo('/about')}>회사소개</li>
            <li onClick={goTo('/recruitment_info')}>채용정보</li>
            <li onClick={goTo('/TrainingSearch')}>직업훈련정보</li>
          </ul>
        </div>

        <nav className="menu">
          {user ? (
            <>
              {user.type === 'user' && (
                <button className="mypage_btn" onClick={goTo('/mypage/user')}>
                  마이페이지
                </button>
              )}
              {user.type === 'company' && (
                <button className="companypage_btn" onClick={goTo('/mypage/company')}>
                  기업페이지
                </button>
              )}
              <button className="logout_btn" onClick={handleLogout}>
                로그아웃
              </button>
            </>
          ) : (
            <>
              <button className="signup_btn" onClick={goTo('/signup')}>
                회원가입
              </button>
              <button className="login_btn" onClick={goTo('/login')}>
                로그인
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
    {modal && <Modal {...modal} />}
    </>
  );
};

export default Header;