import PropTypes from 'prop-types';

/**props = {
 * @text string; (수정된 데이터값 표시)
 * } */
export default function ModifiedText (props) {
    return <span>{props.text}</span>
}

ModifiedText.propTypes = {
    text: PropTypes.string.isRequired,
}