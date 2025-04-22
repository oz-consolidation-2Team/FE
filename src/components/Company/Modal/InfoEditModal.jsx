import { useNavigate } from "react-router-dom"
import "@/components/Company/styles/modal/modal.scss"
import "@/components/Company/styles/modal/InfoEditModal.scss"
import Hr from "@/utils/Hr"
import PropTypes from 'prop-types';

/**
 * @param {*} formData input값 저장
 * @param {*} setShowModal 모달창을 닫기 위함
 */
export default function InfoEditModal (props) {
    const navigate = useNavigate()
    return (
        <div className="modal_overlay">
            <div className="modal_container">
                <h1>기업 정보 수정이 완료되었습니다</h1>
                <div className="Content_container">
                    <p>기업명: {props.formData.company_name}</p>
                    <p>기업소개: {props.formData.company_intro}</p>
                    <Hr />
                    <p>개업년월일: {props.formData.opening_date}</p>
                    <p>사업자등록번호: {props.formData.business_reg_number}</p>
                    <Hr />
                    <div className="manager_info">
                        <p className="manager_name">담당자 이름: {props.formData.manager_name}</p>
                        <p>담당자 전화번호: {props.formData.manager_phone}</p>
                    </div>
                    <p>담당자 이메일: {props.formData.manager_email}</p>
                </div>
                <div className="Button_container">
                    <button onClick={() => {
                        props.setShowModal(false)
                        navigate(-1)
                        }}>완료</button>
                </div>
            </div>
        </div>
    )
}

InfoEditModal.propTypes = {
    formData: PropTypes.node.isRequired,
    setShowModal: PropTypes.node.isRequired
}