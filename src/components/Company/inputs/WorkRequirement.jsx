import Category from "../Category";
import CategoryTitle from "../CategoryTitle";
import InputDropDown from "../InputDropDown";
import InputRadio from "../InputRadio";
import InputText from "../InputText";
import "../styles/inputs/WorkRequirement.scss"
import PropTypes from 'prop-types';

/**
 * @param {상태관리} formData input값 저장
 * @param {상태관리} error 유효성검사
 */
export default function WorkRequirement (props) {
    return (
        <div className="WorkRequirement_container">
            <CategoryTitle title='근무 조건' />
            <div className="div_box">
                <Category text='급여' />
                <InputText {...props} text='급여' type='number' name='salary' placeholder={props.formData.salary} />
            </div>
            {props.error['salary'] && <span className="error_message">급여를 입력해주세요</span>}

            <div className="div_box">
                <Category text='급여지급방법' />
                <InputDropDown {...props} name='payment_method' text='급여지급방법' />
            </div>
            {props.error['payment_method'] && <span className="error_message">급여지급방법을 선택해주세요</span>}

            <div className="div_box options">
                <Category text='근무기간' />
                <InputDropDown {...props} name='work_duration' text='근무기간' />
                <InputRadio {...props} type='협의가능' name='is_work_duration_negotiable' />
            </div>
            {props.error['work_duration'] && <span className="error_message">근무기간을 선택해주세요</span>}

            <div className="div_box">
                <Category text='근무요일' />
                <div>
                    <InputRadio {...props} type='근무요일' name='work_days' />
                    <div className="work_day_option">
                        <InputRadio {...props} type='근무요일협의' name='is_work_days_negotiable' />
                        <InputRadio {...props} type='근무요일변동' name='is_schedule_based' />
                    </div>
                </div>
            </div>
            {props.error['work_days'] && <span className="error_message">근무요일을 선택해주세요</span>}

            <div className="div_box">
                <Category text='고용형태' />
                <InputDropDown {...props} name='employment_type' text='고용형태' />
            </div>
            {props.error['employment_type'] && <span className="error_message">고용형태를 선택해주세요</span>}

            <div className="div_box options">
                <Category text='근무시간' />
                <InputDropDown {...props} name='work_start_time' text='시작시간' type='time' />
                <p className="p_swung_dash">~</p>
                <InputDropDown {...props} name='work_end_time' text='종료시간' type='time' />
                <InputRadio {...props} type='협의가능' name='is_work_time_negotiable' />
            </div>
            {props.error['work_start_time'] && props.error['work_end_time'] && <span className="error_message">근무시간을 선택해주세요</span>}
        </div>
    )
}

WorkRequirement.propTypes = {
    formData: PropTypes.object,
    setFormData: PropTypes.node.isRequired,
    error: PropTypes.object,
    setError: PropTypes.node.isRequired
} 