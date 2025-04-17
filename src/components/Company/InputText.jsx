import { useRef } from "react"
import "./styles/InputText.scss"

/**props = {
 * @fomrData 상태관리
 * @setFormData 상태관리
 * @error 상태관리
 * @setError 상태관리
 * @text string; (빈 값일 경우 placeholder 표시용)
 * @name string; (input 고유값 지정)
 * @type string; (input type을 지정하기 위함)
 * @placeholder string | null; (플레이스홀더를 입력하기 위함)
} */
export default function InputText (props) {
    const handleChange = e => {
        props.setFormData({
            ...props.formData,
            [e.target.name]: e.target.value,
        })
        props.setErrors(el => ({
            ...el,
            [props.name]: false
        }))
    }

    return (
        <div className="InputText_container">
            <input 
            name={props.name}
            type={props.type}
            value={props.formData[props.name]}
            onChange={handleChange}
            placeholder={props.placeholder || `${props.text} 입력`}/>
            {props.text === '모집인원' && <p>명</p>}
        </div>
    )
}