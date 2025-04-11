import { useNavigate } from 'react-router-dom';
import JobList, { dummyData } from '../RecruitmentInfo/JobList';

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
        <section>
          <h3>내가 지원한 공고</h3>
          <JobList jobs={dummyData.slice(0, 2)} />
        </section>
      </section>
    </div>
  );
}

export default UserMyPage;
