import "./styles/InputText.scss"

/**props = {
 * @setData 상태관리
 * @text string; (label 이름을 지정하기 위함)
 * @type string; (input type을 지정하기 위함)
 * @placeholder string | null; (플레이스홀더를 입력하기 위함)
} */
export default function InputText (props) {
    return (
    <div className="InputText_container">
        <input 
        className='' 
        type={props.type} 
        placeholder={props.placeholder || `${props.text}을(를) 입력해주세요`}/>
        {props.text === '모집인원' && <p>명</p>}
    </div>
    )
}