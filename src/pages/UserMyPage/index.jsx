import JobPosting from './JobPosting';
import './UserInfoPage.scss';
import UserInfo from './UserInfo';
import JobRecommend from './JobRecommend';
import AgePopularity from './AgePopularity';
import InterestAnnouncement from './InterestAnnouncement';

function UserMyPage() {
  //더미데이터
  const userInfo = {
    name: '홍길동',
    email: 'user@example.com',
    gender: '남성',
    birthday: '1990-01-01',
    phone_number: '010-1111-2222',
    interests: ['교육', 'IT'],
    signup_purpose: '일자리 정보',
    referral_source: '구글검색',
    user_image: 'https://example.com/image.jpg',
    created_at: '2025-04-08T12:00:00Z',
  };

  return (
    <div className="user_mypage_container">
      <div className="user_name">
        <h2>{userInfo.name}</h2>
        <span>님, 안녕하세요!</span>
      </div>
      <UserInfo userInfo={userInfo} />
      <JobPosting userInfo={userInfo} />
      <JobRecommend userInfo={userInfo} />
      <InterestAnnouncement userInfo={userInfo} />
      <AgePopularity userInfo={userInfo} />
    </div>
  );
}

export default UserMyPage;
