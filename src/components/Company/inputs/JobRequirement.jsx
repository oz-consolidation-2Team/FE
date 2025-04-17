import Category from "../Category";
import CategoryTitle from "../CategoryTitle";
import InputDropDown from "../InputDropDown";
import InputRadio from "../InputRadio";
import InputText from "../InputText";
import "../styles/inputs/JobRequirement.scss"

/**props = {
 * @formData 상태관리{} (InputDropDown에 props하기 위함)
 * @setFormData 상태관리 (InputDropDown에 props하기 위함)
 * @errors 상태관리
 * @setErrors 상태관리
} */
export default function JobRequirement (props) {
    return (
    <div className="JobRequirement_container">
        <CategoryTitle title="모집 조건" />
        <div className="box">
            <Category text="모집기간" />
            <InputDropDown {...props} text='recruit_period_start' name='모집기간' />
        </div>
        {props.errors['recruit_period_start'] && <span className="error_message">모집기간을 선택해주세요</span>}

        <div className="box recruite_peple">
            <Category text="모집인원" />
            <InputText {...props} text='모집인원' type='number' name='recruit_number' placeholder={props.formData.recruit_number} />
            <InputRadio {...props} type='상시모집' name='is_always_recruiting' />
        </div>
        {props.errors['recruit_number'] && <span className="error_message">모집인원을 입력해주세요</span>}

        <div className="box">
            <Category text="학력" />
            <InputDropDown {...props} text='education' name='학력' />
        </div>
        {props.errors['education'] && <span className="error_message">학력을 선택해주세요</span>}

        <div className="box">
            <Category text="직종" />
            <InputDropDown {...props} text='job_category' name='직종' />
        </div>
        {props.errors['job_category'] && <span className="error_message">직종을 선택해주세요</span>}

        <div className="box">
            <Category text="경력" />
            <InputDropDown {...props} text='career' name='경력' />
        </div>
        {props.errors['career'] && <span className="error_message">경력을 선택해주세요</span>}

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