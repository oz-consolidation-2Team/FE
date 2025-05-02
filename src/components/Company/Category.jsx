import "./styles/Category.scss"
import PropTypes from 'prop-types';

/**
 * @param {string} text 항목 이름 
 * @param {false | undefind} essential 필수 유무
 */
export default function Category (props) {
    return <div className="Category_condainer">
            <p>{props.text}</p>
            <p className="essential">{props.essential === undefined && "*"}</p>
        </div>
}

Category.propTypes = {
    text: PropTypes.string.isRequired,
    essential: PropTypes.bool
} 