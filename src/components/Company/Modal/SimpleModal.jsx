import { useNavigate } from "react-router-dom"

/**props = {
 * @setModal 상태관리 (모달창 닫기 위함)
 * @title string; (모달제목)
 * @content string; (모달내용)
 * @notNavigate boolean | undefind; (true 아니면 뒤로가기)
} */
export default function SimpleModal (props) {
    const navigate = useNavigate()
    console.log(123)
    return (
        <div>
            <h1>{props.title}</h1>
            <p>{props.content}</p>
            <button onClick={()=>{
                props.setModal(false)
                {props.setNavigate ? window.location.reload() : navigate(-1)}
            }}>완료</button>
        </div>
    )
}