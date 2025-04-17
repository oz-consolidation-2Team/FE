import Hr from "@/utils/Hr";
import BasicsText from "./BasicsText";

/**props = {
 * @formData 상태관리
 * @modalType 'add' | 'edit' | 'delete' | 'delete-Success' (모달 타입)
} */
export default function Content (props) {
    // 기업 호출 API
    return (
        <div className="Content_container">
            <div className="announcement_card">
                <div className="company">
                    <p>기업명</p>
                    <p>{props.formData.work_place_name}</p>
                </div>
                <Hr />
                <div className="announcement">
                    <p className="title">{props.formData.title}</p>
                    <p>{props.formData.근무요약}</p>
                </div>
                <p className="time">{props.formData.is_always_recruiting ? "상시모집" : props.formData.recruit_period_start}</p>
            </div>
            <p>근무지주소: {props.formData.work_address}</p>
            <Hr />

            <div className="box">
                <p>모집기간: {props.formData.is_always_recruiting ? "상시모집" : props.formData.recruit_period_start}</p>
                <p>모집인원: {props.formData.recruit_number}명</p>
                <p>학력: {props.formData.education}</p>
            </div>
            <div>복리후생: {props.formData.benefits && props.formData.benefits.join(', ')}</div>
            <div>우대사항: {props.formData.preferred_conditions && props.formData.preferred_conditions.join(', ')}</div>
            <div>기타조건: {props.formData.other_conditions && props.formData.other_conditions.join(', ')}</div>
            <Hr />

            <div className="box">
                <p>급여: {props.formData.salary}</p>
                <p>급여지급방법: {props.formData.payment_method}</p>
                <p>고용형태: {props.formData.employment_type}</p>
            </div>
            <div className="box">
                <p>근무기간: {props.formData.work_duration}<span>{props.formData.근무기간협의 && "(협의 가능)"}</span></p>
                <p>근무시간: {props.formData.근무시간}<span>{props.formData.근무시간협의 && "(협의 가능)"}</span></p>
            </div>
            <div>근무요일: {props.formData.work_days && props.formData.work_days.join(', ')}<span>{props.formData.근무요일협의 && "(협의 가능)"}</span><span>{props.formData.근무요일변동}</span></div>
        </div>
    )
}

