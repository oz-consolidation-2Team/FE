import { useNavigate } from 'react-router-dom';

function MainPage() {
  const navigate = useNavigate();

  const handleUserClick = () => {
    navigate('/user_mypage');
  };

  const handleCompanyClick = () => {
    navigate('/company_info_page');
  };

  const handleRecruitmentClick = () => {
    navigate('/recruitment_info');
  };

  return (
    <>
      <h1> 메인 페이지</h1>
      <h2>진짜 됐어...? 나 울어...?</h2>
      <h3> main에 올려야함 </h3>
      <button onClick={handleRecruitmentClick}> 채용 정보</button>
      <button onClick={handleCompanyClick}> 기업 정보</button>
      <button onClick={handleUserClick}> 개인 정보</button>
    </>
  );
}

export default MainPage;
