import PropTypes from 'prop-types';

function IntroSection({ data, setData }) {
  const handleChange = (e) => {
    setData((prev) => ({ ...prev, introduction: e.target.value }));
  };
  return (
    <div className="resumes_introduce">
      <h3 className="intro_title">자기소개서</h3>
      <textarea
        type="text"
        name="introduction"
        value={data.introduction || ''}
        onChange={handleChange}
        placeholder="내용을 입력하세요"
        className="intro_input"
      />
    </div>
  );
}

export default IntroSection;

IntroSection.propTypes = {
  data: PropTypes.shape({
    introduction: PropTypes.string,
  }).isRequired,
  setData: PropTypes.func.isRequired,
};
