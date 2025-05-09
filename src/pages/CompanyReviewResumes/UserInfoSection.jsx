import PropTypes from 'prop-types';

UserInfoSection.propTypes = {
  data: PropTypes.object.isRequired,
};

function UserInfoSection({ data }) {
  const url = data.resume_image
  const name = data.applicant_name
  const gender = data.applicant_gender
  const phone_number = data.applicant_phone_number
  const email = data.applicant_email

  return (
    <div className="resumes_user_info">
      <label htmlFor="user_img" className="user_image_box">
        <img
          src={url}
          alt="프로필 이미지"
          disabled
        />
      </label>

      <div className="user_info_inputs">
        <label name="user_name">
          이름
          <input type="text" name="user_name" value={name} disabled />
        </label>
        <label name="user_gender">
          성별
          <input type="text" name="user_gender" value={gender} disabled />
        </label>
        <label name="user_phone_number">
          전화번호
          <input
            type="text"
            name="user_phone_number"
            value={phone_number}
            disabled
          />
        </label>
        <label name="user_email">
          이메일
          <input type="text" name="user_email" value={email} disabled />
        </label>
      </div>
    </div>
  );
}

export default UserInfoSection;
