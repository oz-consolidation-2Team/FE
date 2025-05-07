import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { resumePropTypes } from '@/utils/MyResumesPropTypes';

UserInfoSection.propTypes = {
  data: resumePropTypes.isRequired,
  setData: PropTypes.func.isRequired,
};

function UserInfoSection({ data, setData }) {
  useEffect(() => {
    if (!data.preview_url && data.resume_image instanceof File) {
      const newPreview = URL.createObjectURL(data.resume_image);
      setData((prev) => ({
        ...prev,
        preview_url: newPreview,
      }));
    }
    return () => {
      if (data.preview_url) {
        URL.revokeObjectURL(data.preview_url);
      }
    };
  }, [data.preview_url]);

  return (
    <div className="resumes_user_info">
      <label htmlFor="user_img" className="user_image_box">
        <img
          src={
            data.preview_url
              ? data.preview_url
              : typeof data.resume_image === 'string'
                ? data.resume_image // ← 문자열 URL
                : URL.createObjectURL(data.resume_image) // ← File 객체
          }
          alt="프로필 이미지"
          disabled
        />
      </label>

      <div className="user_info_inputs">
        <label name="user_name">
          이름
          <input type="text" name="user_name" value={data.user_id.data.name} disabled />
        </label>
        <label name="user_gender">
          성별
          <input type="text" name="user_gender" value={data.user_id.data.gender} disabled />
        </label>
        <label name="user_phone_number">
          전화번호
          <input
            type="text"
            name="user_phone_number"
            value={data.user_id.data.phone_number}
            disabled
          />
        </label>
        <label name="user_email">
          이메일
          <input type="text" name="user_email" value={data.user_id.data.email} disabled />
        </label>
      </div>
    </div>
  );
}

export default UserInfoSection;
