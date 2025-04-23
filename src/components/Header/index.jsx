import React from 'react';
import './Header.scss';
import { useNavigate } from 'react-router-dom';
import Modal from '@/components/common/Modal';
import { handleUserLogout } from '@/utils/userLogin';

const Header = () => {
  const navigate = useNavigate();
  const accessToken = localStorage.getItem('accessToken');
  const userType = localStorage.getItem('userType');
  const isLoggedIn = !!accessToken;
  const [modal, setModal] = React.useState(null);

  const handleLogoutClick = () => {
    handleUserLogout({ setModal, navigate });
  };

  const goTo = (path) => () => navigate(path);

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
        {isLoggedIn ? (
          <>
            {userType === 'user' && (
              <button className="mypage_btn" onClick={goTo('/mypage/user')}>
                마이페이지
              </button>
            )}
            {userType === 'company' && (
              <button className="companypage_btn" onClick={goTo('/mypage/company')}>
                기업페이지
              </button>
            )}
            <button className="logout_btn" onClick={handleLogoutClick}>
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