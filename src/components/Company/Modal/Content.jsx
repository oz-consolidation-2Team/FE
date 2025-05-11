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
            <p><span className='category'>근무지주소</span> {props.formData.work_address}</p>
            <Hr />

            <div className="div_box">
                <p><span className='category'>모집기간</span> {props.formData.is_always_recruiting ? "상시모집" : props.formData.recruit_period_end}</p>
                <p><span className='category'>모집인원</span> {props.formData.recruit_number}명</p>
                <p><span className='category'>학력</span> {props.formData.education}</p>
            </div>
            <div><span className='category'>복리후생</span> {props.formData.benefits && props.formData.benefits.join(', ')}</div>
            <div><span className='category'>우대사항</span> {props.formData.preferred_conditions && props.formData.preferred_conditions.join(', ')}</div>
            <div><span className='category'>기타조건</span> {props.formData.other_conditions && props.formData.other_conditions.join(', ')}</div>
            <Hr />

            <div className="div_box">
                <p><span className='category'>급여</span> {props.formData.salary}</p>
                <p><span className='category'>급여지급방법</span> {props.formData.payment_method}</p>
                <p><span className='category'>고용형태</span> {props.formData.employment_type}</p>
            </div>
            <div className="div_box">
                <p><span className='category'>근무기간</span> {props.formData.work_duration}<span>{props.formData.is_work_duration_negotiable && "(협의 가능)"}</span></p>
                <p><span className='category'>근무시간</span> {props.formData.work_start_time} ~ {props.formData.work_end_time}<span>{props.formData.is_work_time_negotiable && "(협의 가능)"}</span></p>
            </div>
            <div><span className='category'>근무요일</span> {props.formData.work_days && props.formData.work_days.join(', ')}<span>{props.formData.is_work_days_negotiable && "(협의 가능)"}</span><span>{props.formData.is_schedule_based}</span></div>
    </div>
  );
}

Content.propTypes = {
  formData: PropTypes.object.isRequired,
  modalType: PropTypes.oneOf(['add' | 'edit' | 'delete' | 'delete-Success']),
};
