import "./styles/InputText.scss"

/**
 * @param {상태관리} formData input값 저장
 * @param {상태관리} error 유효성검사
 * @param {string} name input 변수 전달
 * @param {string} type input type 지정
 * @param {string} text 플레이스홀더 입력값 (공고등록용)
 * @param {string | null} placeholder 플레이스홀더 입력값 (공고수정용)
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
            name={props.name}
            type={props.type}
            value={props.formData[props.name]}
            onChange={handleChange}
            placeholder={props.placeholder || `${props.text} 입력`}/>
            {props.text === '모집인원' && <p>명</p>}
        </div>
    )
}