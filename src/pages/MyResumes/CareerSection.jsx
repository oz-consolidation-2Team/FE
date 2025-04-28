import { useState } from 'react';
import PropTypes from 'prop-types';

function CareerSection({ data, setData }) {
  const experiences = data.experiences;

  const setExperiences = (updateList) => {
    setData({ ...data, experiences: updateList });
  };

  const [fixedExperiences, setFixedExperiences] = useState({
    company_name: '',
    position: '',
    start_date: '',
    end_date: '',
    description: '',
  });

  const handleChange = (index, field, value) => {
    const updated = [...experiences];
    updated[index][field] = value;
    setExperiences(updated);
  };

  const handleAddExperiences = () => {
    const { company_name, position, start_date, end_date, description } = fixedExperiences;

    const isFilled = company_name && position && start_date && end_date && description;
    if (!start_date || !end_date) {
      return alert('경력 시작일과 종료일을 모두 입력해주세요!');
    }
    if (start_date > end_date) {
      return alert('경력 시작일은 종료일보다 빠를 수 없습니다!');
    }
    if (!isFilled) {
      return alert('모든 항목을 입력해야 새로운 항목을 추가할 수 있어요!');
    }

    setExperiences([...experiences, fixedExperiences]);

    setFixedExperiences({
      company_name: '',
      position: '',
      start_date: '',
      end_date: '',
      description: '',
    });
  };

  const handleRemoveExperiences = (index) => {
    const newExperiences = data.experiences.filter((_, i) => i !== index);
    setData((prev) => ({ ...prev, experiences: newExperiences }));
  };

  const handleFixedChange = (field, value) => {
    let newFixed = { ...fixedExperiences, [field]: value };

    setFixedExperiences(newFixed);
  };

  return (
    <div className="resumes_career">
      <h3 className="career_title">경력사항</h3>
      <div className="career_row fixed">
        <input
          type="text"
          placeholder="회사명"
          value={fixedExperiences.company_name}
          onChange={(e) => handleFixedChange('company_name', e.target.value)}
        />
        <label htmlFor="CareerStartDate">입사년월</label>
        <input
          id="CareerStartDate"
          type="date"
          value={fixedExperiences.start_date}
          onChange={(e) => handleFixedChange('start_date', e.target.value)}
        />
        <label htmlFor="CareerEndDate">퇴사년월</label>
        <input
          type="date"
          id="CareerEndDate"
          value={fixedExperiences.end_date}
          onChange={(e) => handleFixedChange('end_date', e.target.value)}
        />
        <input
          type="text"
          placeholder="직무/직책"
          value={fixedExperiences.position}
          onChange={(e) => handleFixedChange('position', e.target.value)}
        />
        <input
          type="text"
          placeholder="담당업무"
          value={fixedExperiences.description}
          onChange={(e) => handleFixedChange('description', e.target.value)}
        />
        <button type="button" onClick={handleAddExperiences}>
          +
        </button>
      </div>
      {experiences.map((career, index) => (
        <div key={index} className="career_row">
          <input
            type="text"
            value={career.company_name}
            onChange={(e) => {
              handleChange(index, 'company_name', e.target.value);
            }}
            disabled
          />

          <input
            id="CareerStartDate"
            type="date"
            value={career.start_date}
            onChange={(e) => handleChange(index, 'start_date', e.target.value)}
            disabled
          />

          <input
            type="date"
            value={career.end_date}
            onChange={(e) => {
              handleChange(index, 'end_date', e.target.value);
            }}
            disabled
          />

          <input
            type="text"
            value={career.position}
            onChange={(e) => {
              handleChange(index, 'position', e.target.value);
            }}
            disabled
          />
          <input
            type="text"
            value={career.description}
            onChange={(e) => {
              handleChange(index, 'description', e.target.value);
            }}
            disabled
          />
          <button type="button" onClick={() => handleRemoveExperiences(index)}>
            -
          </button>
        </div>
      ))}
    </div>
  );
}

export default CareerSection;

CareerSection.propTypes = {
  data: PropTypes.object.isRequired,
  setData: PropTypes.func.isRequired,
};
