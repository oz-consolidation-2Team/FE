import PropTypes from 'prop-types';

function CareerSection({ data }) {
  const experiences = data.experiences;

  return (
    <div className="resumes_career">
      <h3 className="career_title">경력사항</h3>
      {experiences.map((career, index) => (
        <div key={index} className="career_row">
          <input type="text" value={career.company_name} disabled />
          <label className="label_title">입사일자</label>
          <input
            id="CareerStartDate"
            type="date"
            value={career.start_date.split('T')[0]}
            disabled
          />
          <label className="label_title">퇴사일자</label>
          <input type="date" value={career.end_date.split('T')[0]} disabled />
          <input type="text" value={career.position} disabled />
          <input type="text" value={career.description} disabled />
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
