import { useNavigate } from 'react-router-dom';
import './UserInfoPage.scss';

function UserInfo({ userInfo }) {
  const navigate = useNavigate();

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
            <p className="info_text"> 생일 : {userInfo.birthday}</p>
            <p className="info_text"> 전화번호 : {userInfo.phone_number}</p>
            <p className="info_text"> 이메일 : {userInfo.email}</p>
            <p className="info_text"> 관심분야 : {userInfo.interests}</p>
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
