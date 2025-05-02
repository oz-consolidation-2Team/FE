import "./styles/InputText.scss"
import PropTypes from 'prop-types';

/**
 * @param {상태관리} formData input값 저장
 * @param {상태관리} error 유효성검사
 * @param {boolean} disabled input 비활성화 유무
 * @param {string} name input 변수 전달
 * @param {string} type input type 지정
 * @param {string} text 플레이스홀더 입력값 (빈값용)
 * @param {string} placeholder 플레이스홀더 입력값 (기존값 표시용)
 * @returns 
 */
export default function InputText (props) {
    const handleChange = e => {
        props.setFormData(el => ({
            ...el,
            [e.target.name]: e.target.value,
        }))

        props.setError(el => ({
            ...el,
            [props.name]: false
        }))
    }

    return (
        <div className="InputText_container">
            <input 
            className={`${props.text === '모집인원' ? "resize" : ""}`}
            name={props.name}
            type={props.type}
            value={props.formData[props.name]}
            onChange={handleChange}
            disabled={props.disabled && true}
            placeholder={props.placeholder || `${props.text} 입력`}
            />
            {props.text === '모집인원' && <p>명</p>}
        </div>
    )
}

InputText.propTypes = {
    formData: PropTypes.object,
    setFormData: PropTypes.node.isRequired,
    error: PropTypes.object,
    setError: PropTypes.node.isRequired,
    name: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    type: PropTypes.oneOf(['normal', 'day', 'time']),
    disabled: PropTypes.bool
} 