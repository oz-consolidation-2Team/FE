import { useNavigate } from "react-router-dom"
import "../styles/modal/SimpleModal.scss"
import PropTypes from 'prop-types';

/**
 * @param {상태관리} setModal  모달창 닫기 위함
 * @param {string} title 모달 제목
 * @param {string} content 모달 내용
 * @param {boolean | undefind} notNavigate true 아니면 뒤로가기
 */
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