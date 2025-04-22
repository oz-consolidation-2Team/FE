import Title from "./Title"
import Content from "./Content"
import Button from "./Button"
import SimpleModal from "./SimpleModal"
import "../styles/modal/modal.scss"
import PropTypes from 'prop-types';

/**
 * @param {상태관리} formData 상태관리
 * @param {상태관리} setShowModal 상태관리
 * @param {상태관리} setModalType 상태관리
 * @param {'add' | 'edit' | 'delete' | 'delete-Success' | 'cencel-resume'} modalType 상태관리
 */
export default function Modal (props) {
    //api 기업 정보 수정 (기업 ID로 해당 기업 정보 수정) /company/{company_user_id}

    return (
        <div className="modal_overlay">
            <div className="modal_container">
                {props.modalType === 'delete-Success' || props.modalType === 'cencel-resume' ? 
                    (
                        props.modalType === 'delete-Success' ?
                        <SimpleModal title="삭제가 완료 되었습니다" content="" setShowModal={props.setShowModal} />
                        : <SimpleModal title="취소된 이력서입니다" content="이런! 그 사이에 취소된 이력서예요" setShowModal={props.setShowModal} setNavigate={true} />
                    )
                    : <>
                        <Title modalType={props.modalType} />
                        <Content formData={props.formData} modalType={props.modalType} />
                        <Button {...props } />
                    </>
                }
            </div>
        </div>
    )
}

Modal.propTypes = {
    formData: PropTypes.node.isRequired,
    setShowModal: PropTypes.node.isRequired,
    setModalType: PropTypes.node.isRequired,
    modalType: PropTypes.string.isRequired,
}