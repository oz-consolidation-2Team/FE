import { useNavigate } from "react-router-dom"
import "../styles/modal/SimpleModal.scss"
import PropTypes from 'prop-types';

/**props = {
 * @setModal 상태관리 (모달창 닫기 위함)
 * @title string; (모달제목)
 * @content string; (모달내용)
 * @notNavigate boolean | undefind; (true 아니면 뒤로가기)
} */
export default function SimpleModal (props) {
    const navigate = useNavigate()

    return (
        <div className="SimpleModal_container">
            <h1>{props.title}</h1>
            <p>{props.content}</p>
            <button onClick={()=>{
                props.setShowModal(false)
                {props.setNavigate ? window.location.reload() : navigate(-1)}
            }}>닫기</button>
        </div>
    )
}

SimpleModal.propTypes = {
    title: PropTypes.string.isRequired,
    setShowModal: PropTypes.node.isRequired,
    setNavigate: PropTypes.node.isRequired,
    content: PropTypes.string
} 