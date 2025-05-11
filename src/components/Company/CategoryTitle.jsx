import './styles/CategoryTitle.scss';
import PropTypes from 'prop-types';

/**
 * @param {string} title 섹션분류를 위한 제목
 */
export default function CategoryTitle(props) {
  return (
    <div className="CategoryTitle_condainer">
      <span className="title">{props.title}</span>
    </div>
  );
}

CategoryTitle.propTypes = {
  title: PropTypes.string,
};
