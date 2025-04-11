import { useNavigate } from "react-router-dom"
import Modal from "./Modal"

/**props = {
 * @setModal 상태관리
 * @modalType 'add' | 'edit' | 'delete' | 'delete-Success' (모달 타입)
 * @setModalType 상태관리
} */
export default function Button (props) {
    const navigate = useNavigate()
    return <div>
        {props.modalType === 'delete' ? 
            <div>
                <button onClick={()=>props.setModalType('delete-Success')}>삭제하기</button>
                <button onClick={()=>{props.setModal(false)}}>취소</button>
            </div>
            : <button onClick={() => {
                props.setModal(false)
                navigate(-1)
                }}>완료</button>
            }
    </div>
}