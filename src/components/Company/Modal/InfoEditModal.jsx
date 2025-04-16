import { useNavigate } from "react-router-dom"
import "@/components/Company/styles/modal/modal.scss"
import "@/components/Company/styles/modal/InfoEditModal.scss"
import Hr from "@/utils/Hr"

/**props = {
 * @data 수정된 데이터
 * @setShowModal 모달찯을 닫기 위함
} */
export default function InfoEditModal (props) {
    const navigate = useNavigate()
    return (
        <div className="modal_overlay">
            <div className="modal_container">
                <h1>기업 정보 수정이 완료되었습니다</h1>
                <div className="Content_container">
                    <p>기업명: {props.data.company_info.company_name}</p>
                    <p>기업소개: {props.data.company_info.company_intro}</p>
                    <Hr />
                    <p>개업년월일: {props.data.company_info.opening_date}</p>
                    <p>사업자등록번호: {props.data.company_info.business_reg_number}</p>
                    <Hr />
                    <div className="manager_info">
                        <p className="manager_name">담당자 이름: {props.data.company_user.manager_name}</p>
                        <p>담당자 전화번호: {props.data.company_user.manager_phone}</p>
                    </div>
                    <p>담당자 이메일: {props.data.company_user.manager_email}</p>
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