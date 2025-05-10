import Hr from '@/utils/Hr';
import PropTypes from 'prop-types';

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
                    <p>{props.formData.work_place_name}</p>
                </div>
                <Hr />
                <div className="announcement">
                    <p className="title">{props.formData.title}</p>
                    <p>{props.formData.summary}</p>
                </div>
                <p className="time">{props.formData.is_always_recruiting ? "상시모집" : props.formData.recruit_period_end}</p>
            </div>
            <p>근무지주소: {props.formData.work_address}</p>
            <Hr />

            <div className="div_box">
                <p>모집기간: {props.formData.is_always_recruiting ? "상시모집" : props.formData.recruit_period_end}</p>
                <p>모집인원: {props.formData.recruit_number}명</p>
                <p>학력: {props.formData.education}</p>
            </div>
            <div>복리후생: {props.formData.benefits && props.formData.benefits.join(', ')}</div>
            <div>우대사항: {props.formData.preferred_conditions && props.formData.preferred_conditions.join(', ')}</div>
            <div>기타조건: {props.formData.other_conditions && props.formData.other_conditions.join(', ')}</div>
            <Hr />

            <div className="div_box">
                <p>급여: {props.formData.salary}</p>
                <p>급여지급방법: {props.formData.payment_method}</p>
                <p>고용형태: {props.formData.employment_type}</p>
            </div>
            <div className="div_box">
                <p>근무기간: {props.formData.work_duration}<span>{props.formData.is_work_duration_negotiable && "(협의 가능)"}</span></p>
                <p>근무시간: {props.formData.work_start_time} ~ {props.formData.work_end_time}<span>{props.formData.is_work_time_negotiable && "(협의 가능)"}</span></p>
            </div>
            <div>근무요일: {props.formData.work_days && props.formData.work_days.join(', ')}<span>{props.formData.is_work_days_negotiable && "(협의 가능)"}</span><span>{props.formData.is_schedule_based}</span></div>
    </div>
  );
}

Content.propTypes = {
  formData: PropTypes.object.isRequired,
  modalType: PropTypes.oneOf(['add' | 'edit' | 'delete' | 'delete-Success']),
};
