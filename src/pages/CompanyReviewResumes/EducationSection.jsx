import PropTypes from 'prop-types';

function EducationSection({ data }) {
  const educations = data.educations;

  return (
    <div className="review_resumes_education">
      <h3 className="review_education_title">학력사항</h3>
      {educations.map((edu, index) => (
        <div key={index} className="review_education_row">
          <select value={edu.education_type} disabled>
            <option value="">학력 선택</option>
            <option value="고등학교">고등학교</option>
            <option value="대학교(2,3년)">대학(2,3년)</option>
            <option value="대학교(4년)">대학교(4년)</option>
            <option value="대학원">대학원</option>
          </select>

          <input type="text" placeholder="학교명을 입력하세요" value={edu.school_name} disabled />

          <select value={edu.education_status} disabled>
            <option value="">졸업여부 선택</option>
            <option value="졸업">졸업</option>
            <option value="재학중">재학중</option>
          </select>

          <lable className="label_title">입학일자</lable>
          <input type="date" value={edu.start_date.split('T')[0]} disabled />
          <lable className="label_title">졸업일자</lable>
          {edu.end_date ? (
            <input type="date" value={edu.end_date.split('T')[0]} disabled />
          ) : (
            <input type="text" placeholder="졸업 예정일 없음" disabled />
          )}
        </div>
      ))}
    </div>
  );
}

export default EducationSection;

EducationSection.propTypes = {
  data: PropTypes.object.isRequired,
  setData: PropTypes.func.isRequired,
};
