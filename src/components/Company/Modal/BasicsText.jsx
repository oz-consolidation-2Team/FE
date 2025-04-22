import PropTypes from 'prop-types';

/**props = {text: string; (데이터값)} */
export default function BasicsText (props) {
    return <span>{props.text}</span>
}

BasicsText.propTypes = {
    text: PropTypes.string.isRequired,
}