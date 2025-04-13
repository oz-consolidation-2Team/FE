import { useNavigate } from 'react-router-dom';
import JobPosting from './JobPosting';
import './UserInfoPage.scss';
function UserMyPage() {
  const navigate = useNavigate();

  return (
    <div className="user_mypage_container">
      <h1>마이 페이지</h1>
      <section className="user_info_section">
        <div className="user_info">
          <h2>
            서혜진<span>님, 안녕하세요!</span>
          </h2>
        </div>

        <button
          onClick={() => {
            navigate('/mypage/user/resume');
          }}
        >
          간단 이력서 작성하기
        </button>
        <JobPosting />
      </section>
    </div>
  );
}

export default UserMyPage;
