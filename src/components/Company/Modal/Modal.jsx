import Title from "./Title"
import Content from "./Content"
import Button from "./Button"
import SimpleModal from "./SimpleModal"
import "../styles/modal/Modal.scss"

/**props = {
 * @setModal 상태관리(boolean) (모달관리 닫기 위함)
 * @data 상태관리(input값들) (출력을 위함)
 * @modalType 'add' | 'edit' | 'delete' | 'delete-Success' | 'cencel-resume' (모달 타입)
 * @setModalType 상태관리
} */
export default function Modal (props) {
    return (
        <div className="modal_overlay">
            <div className="modal_container">
                {props.modalType === 'delete-Success' || props.modalType === 'cencel-resume' ? 
                    (
                        props.modalType === 'delete-Success' ?
                        <SimpleModal title="삭제가 완료 되었습니다" content="" setModal={props.setModal} />
                        : <SimpleModal title="취소된 이력서입니다" content="이런! 그 사이에 취소된 이력서예요" setModal={props.setModal} setNavigate={true} />
                    )
                    : <>
                        <Title modalType={props.modalType} />
                        <Content data={props.data} modalType={props.modalType} />
                        <Button setModal={props.setModal} modalType={props.modalType} setModalType={props.setModalType}/>
                    </>
                }
            </div>
        </div>
    )
}