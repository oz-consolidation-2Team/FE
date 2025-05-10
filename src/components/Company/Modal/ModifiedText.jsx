import PropTypes from 'prop-types';

/**
 * @param {string} text 수정된 데이터값 표시
 */
export default function ModifiedText (props) {
    return <span>{props.text}</span>
}

ModifiedText.propTypes = {
    text: PropTypes.string.isRequired,
}