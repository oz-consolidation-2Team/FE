import { useNavigate } from "react-router-dom"
import PropTypes from 'prop-types';

/**props = {
 * @setShowModal 상태관리
 * @modalType 'add', 'edit', 'delete', 'delete-Success' (모달 타입)
 * @setModalType 상태관리
} */
export default function Button (props) {
    const navigate = useNavigate()

    return <div className="Button_container">
        {props.modalType === 'delete' ? 
            <div className="button_box">
                <button onClick={()=>props.setModalType('delete-Success')}>삭제하기</button>
                <button onClick={()=>{props.setShowModal(false)}}>취소</button>
            </div>
            : <button onClick={() => {
                props.setShowModal(false)
                navigate(-1)
                }}>완료</button>
            }
    </div>
}

Button.propTypes = {
    setShowModal: PropTypes.node.isRequired,
    setModalType: PropTypes.node.isRequired,
    modalType: PropTypes.oneOf(['add', 'edit', 'delete', 'delete-Success']).isRequired,
}