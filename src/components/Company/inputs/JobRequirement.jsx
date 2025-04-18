import Category from "../Category";
import CategoryTitle from "../CategoryTitle";
import InputDropDown from "../InputDropDown";
import InputRadio from "../InputRadio";
import InputText from "../InputText";
import "../styles/inputs/JobRequirement.scss"

/**
 * @param {상태관리} formData input값 저장
 * @param {상태관리} error 유효성검사
 */
export default function JobRequirement (props) {
    return (
    <div className="JobRequirement_container">
        <CategoryTitle title="모집 조건" />
        <div className="box">
            <Category text="모집기간" />
            <InputDropDown {...props} name='recruit_period_start' text='모집기간' />
        </div>
        {props.error['recruit_period_start'] && <span className="error_message">모집기간을 선택해주세요</span>}

        <div className="box recruite_peple">
            <Category text="모집인원" />
            <InputText {...props} text='모집인원' type='number' name='recruit_number' placeholder={props.formData.recruit_number} />
            <InputRadio {...props} type='상시모집' name='is_always_recruiting' />
        </div>
        {props.error['recruit_number'] && <span className="error_message">모집인원을 입력해주세요</span>}

        <div className="box">
            <Category text="학력" />
            <InputDropDown {...props} name='education' text='학력' />
        </div>
        {props.error['education'] && <span className="error_message">학력을 선택해주세요</span>}

        <div className="box">
            <Category text="직종" />
            <InputDropDown {...props} name='job_category' text='직종' />
        </div>
        {props.error['job_category'] && <span className="error_message">직종을 선택해주세요</span>}

        <div className="box">
            <Category text="경력" />
            <InputDropDown {...props} name='career' text='경력' />
        </div>
        {props.error['career'] && <span className="error_message">경력을 선택해주세요</span>}

        <div className="box">
            <Category text="복리후생" essential={false} />
            <InputRadio {...props} type='복리후생' name='benefits' />
        </div>

        <div className="box remove">
            <Category text="우대조건" essential={false} />
            <InputRadio {...props} type='우대조건' name='preferred_conditions' />
        </div>
        <div className="box">
            <Category text="기타조건" essential={false} />
            <InputRadio {...props} type='기타조건' name='other_conditions' />
        </div>
    </div>
    )
}