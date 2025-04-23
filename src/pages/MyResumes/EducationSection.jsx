import PropTypes from 'prop-types';
import { useState } from 'react';

function EducationSection({ data, setData }) {
  const educations = data.educations;

  const setEducations = (updateList) => {
    setData({ ...data, educations: updateList });
  };

  const [fixedEducation, setFixedEducation] = useState({
    education_type: '',
    school_name: '',
    education_status: '',
    start_date: '',
    end_date: '',
  });

  const handleChange = (index, field, value) => {
    const updated = [...educations];
    updated[index][field] = value;
    setEducations(updated);
  };

  const handleAddEducation = () => {
    const { education_type, school_name, education_status, start_date, end_date } = fixedEducation;

    const isFilled =
      education_type &&
      school_name &&
      education_status &&
      start_date &&
      (education_status === '재학중' || end_date);

    if (!isFilled) {
      alert('모든 항목을 입력해야 새로운 항목을 추가할 수 있어요!');
      return;
    }

    setEducations([...educations, fixedEducation]);

    setFixedEducation({
      education_type: '',
      school_name: '',
      education_status: '',
      start_date: '',
      end_date: '',
    });
  };

  const handleRemoveEducation = (index) => {
    const updated = educations.filter((_, i) => i !== index);
    setEducations(updated);
  };

  const handleFixedChange = (field, value) => {
    let newFixed = { ...fixedEducation, [field]: value };

    if (field === 'education_status' && value === '재학중') {
      newFixed.end_date = '';
    }

    setFixedEducation(newFixed);
  };

  return (
    <div className="resumes_education">
      <h3 className="education_title">학력사항</h3>
      <div className="education_row fixed">
        <select
          value={fixedEducation.education_type}
          onChange={(e) => handleFixedChange('education_type', e.target.value)}
        >
          <option value="">학력 선택</option>
          <option value="고등학교">고등학교</option>
          <option value="대학교(2,3년)">대학교(2,3년)</option>
          <option value="대학교(4년)">대학교(4년)</option>
          <option value="대학원">대학원</option>
        </select>

        <input
          type="text"
          placeholder="학교명을 입력하세요"
          value={fixedEducation.school_name}
          onChange={(e) => handleFixedChange('school_name', e.target.value)}
        />

        <select
          value={fixedEducation.education_status}
          onChange={(e) => handleFixedChange('education_status', e.target.value)}
        >
          <option value="">졸업여부 선택</option>
          <option value="졸업">졸업</option>
          <option value="재학중">재학중</option>
        </select>

        <label htmlFor="educationStartDate">입학일자</label>
        <input
          id="educationStartDate"
          type="date"
          value={fixedEducation.start_date}
          onChange={(e) => handleFixedChange('start_date', e.target.value)}
        />

        <label htmlFor="educationEndDate">졸업일자</label>
        <input
          id="educationEndDate"
          type="date"
          value={fixedEducation.end_date}
          onChange={(e) => handleFixedChange('end_date', e.target.value)}
          disabled={fixedEducation.education_status === '재학중'}
        />

        <button type="button" onClick={handleAddEducation}>
          +
        </button>
      </div>
      {educations.map((edu, index) => (
        <div key={index} className="education_row">
          <select
            value={edu.education_type}
            onChange={(e) => handleChange(index, 'education_type', e.target.value)}
          >
            <option value="">학력 선택</option>
            <option value="고등학교">고등학교</option>
            <option value="대학(2,3년)">대학(2,3년)</option>
            <option value="대학교(4년)">대학교(4년)</option>
            <option value="대학원">대학원</option>
          </select>

          <input
            type="text"
            placeholder="학교명을 입력하세요"
            value={edu.school_name}
            onChange={(e) => handleChange(index, 'school_name', e.target.value)}
          />

          <select
            value={edu.education_status}
            onChange={(e) => handleChange(index, 'education_status', e.target.value)}
          >
            <option value="">졸업여부 선택</option>
            <option value="졸업">졸업</option>
            <option value="재학중">재학중</option>
          </select>

          <input
            type="date"
            value={edu.start_date}
            onChange={(e) => handleChange(index, 'start_date', e.target.value)}
          />

          <input
            type="date"
            value={edu.end_date}
            onChange={(e) => handleChange(index, 'end_date', e.target.value)}
            disabled={edu.education_status === '재학중'}
          />
          <button type="button" onClick={() => handleRemoveEducation(index)}>
            -
          </button>
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
