import { useNavigate } from 'react-router-dom';
import './UserInfoPage.scss';
import { userInfoPropTypes } from '@/utils/UserMyPagePropTypes';

UserInfo.propTypes = {
  userInfo: userInfoPropTypes.isRequired,
};

function UserInfo({ userInfo }) {
  const navigate = useNavigate();

  const hasResume = userInfo?.resumes?.length > 0;

  const handleHasResume = () => {
    if (hasResume) {
      navigate(`/mypage/user/resumes/${userInfo?.resumes[0]?.id}`);
    } else {
      navigate(`/mypage/user/resumes`);
    }
  };

  console.log('UserInfo유저ID', userInfo.id);
  console.log('UserInfo', userInfo);
  return (
    <section className="user_info_section">
      <div className="user_info">
        <p
          className="info_modify"
          onClick={() => {
            if (!userInfo?.id) return;
            navigate('/mypage/user/edit_info', { state: { userId: userInfo?.id } });
          }}
        >
          개인정보 수정하기
        </p>
        <div className="user_detail">
          <div className="user_profile_text">
            <p className="info_text"> 생일 : {userInfo?.birthday}</p>
            <p className="info_text"> 전화번호 : {userInfo?.phone_number}</p>
            <p className="info_text"> 이메일 : {userInfo?.email}</p>
            <p className="info_text"> 관심분야 : {userInfo?.interests?.join(', ')}</p>
          </div>
        </div>
      </div>
      <button
        onClick={() => {
          handleHasResume();
        }}
      >
        {hasResume > 0 ? '이력서\n수정하기' : '이력서\n등록하기'}
      </button>
    </section>
  );
}

export default UserInfo;
