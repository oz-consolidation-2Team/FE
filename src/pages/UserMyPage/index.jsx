import JobPosting from './JobPosting';
import './UserInfoPage.scss';
import UserInfo from './UserInfo';

function UserMyPage() {
  return (
    <div className="user_mypage_container">
      <div className="user_name">
        <h2>서혜진</h2>
        <span>님, 안녕하세요!</span>
      </div>
      <UserInfo />
      <JobPosting />
    </div>
  );
}

export default UserMyPage;
