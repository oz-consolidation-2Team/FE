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
                    <p><span className='category'>기업명</span> {props.formData.company_name}</p>
                    <p><span className='category'>기업소개</span> {props.formData.company_intro}</p>
                    <Hr />
                    <p><span className='category'>개업년월일</span> {props.formData.opening_date}</p>
                    <p><span className='category'>사업자등록번호</span> {props.formData.business_reg_number}</p>
                    <Hr />
                    <div className="manager_info">
                        <p className="manager_name"><span className='category'>담당자 이름</span> {props.formData.manager_name}</p>
                        <p><span className='category'>담당자 전화번호</span> {props.formData.manager_phone}</p>
                    </div>
                    <p><span className='category'>담당자 이메일</span> {props.formData.manager_email}</p>
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