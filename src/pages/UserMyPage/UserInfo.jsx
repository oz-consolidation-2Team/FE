import { useNavigate } from 'react-router-dom';
import './UserInfoPage.scss';

function UserInfo() {
  const navigate = useNavigate();

  //더미데이터
  const UserInfo = {
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
    <section className="user_info_section">
      <div className="user_info">
        <p
          className="info_modify"
          onClick={() => {
            navigate('/');
          }}
        >
          개인정보 수정하기
        </p>
        <div className="user_detail">
          <div className="user_profile_img">
            <p>
              이미지를
              <br /> 등록해주세요
            </p>
          </div>
          <div className="user_profile_text">
            <p className="info_text"> 생일 : {UserInfo.birthday}</p>
            <p className="info_text"> 전화번호 : {UserInfo.phone_number}</p>
            <p className="info_text"> 이메일 : {UserInfo.email}</p>
            <p className="info_text"> 관심분야 : {UserInfo.interests}</p>
          </div>
        </div>
      </div>
      <button
        onClick={() => {
          navigate('/mypage/user/resume');
        }}
      >
        간단 이력서 <br />
        작성하기
      </button>
    </section>
  );
}

export default UserInfo;
