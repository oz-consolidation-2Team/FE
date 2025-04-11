import Title from "./Title"
import Content from "./Content"
import Button from "./Button"
import SimpleModal from "./SimpleModal"

/**props = {
 * @setModal 상태관리(boolean) (모달관리 닫기 위함)
 * @data 상태관리(input값들) (출력을 위함)
 * @modalType 'add' | 'edit' | 'delete' | 'delete-Success' (모달 타입)
 * @setModalType 상태관리
} */
export default function Modal (props) {
    return (
        <div>
            {props.modalType === 'delete-Success' ? 
                <SimpleModal title="삭제가 완료 되었습니다" content="" setModal={props.setModal} />
                : <>
                    <Title modalType={props.modalType} />
                    <Content data={props.data} modalType={props.modalType} />
                    <Button setModal={props.setModal} modalType={props.modalType} setModalType={props.setModalType}/>
                </>
            }
        </div>
    )
}