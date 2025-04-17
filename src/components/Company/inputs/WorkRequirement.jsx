import Category from "../Category";
import CategoryTitle from "../CategoryTitle";
import InputDropDown from "../InputDropDown";
import InputRadio from "../InputRadio";
import InputText from "../InputText";
import "../styles/inputs/WorkRequirement.scss"

/**props = {
 * @formData 상태관리{} (InputDropDown에 props 하기 위함)
 * @setFormData 상태관리{} (InputDropDown에 props 하기 위함)
 * @errors
 * @setErrors
} */
export default function WorkRequirement (props) {
    return (
        <div className="WorkRequirement_container">
            <CategoryTitle title='근무 조건' />
            <div className="box move_pos">
                <Category text='급여' />
                <InputText {...props} text='급여' type='number' name='salary' placeholder={props.formData.salary} />
            </div>
            {props.errors['salary'] && <span className="error_message">급여를 입력해주세요</span>}

            <div className="box">
                <Category text='급여지급방법' />
                <InputDropDown {...props} text='payment_method' name='급여지급방법' />
            </div>
            {props.errors['payment_method'] && <span className="error_message">급여지급방법을 선택해주세요</span>}

            <div className="box">
                <Category text='근무기간' />
                <InputDropDown {...props} text='work_duration' name='근무기간' />
                <InputRadio {...props} type='협의가능' name='근무기간협의' />
            </div>
            {props.errors['work_duration'] && <span className="error_message">근무기간을 선택해주세요</span>}

            <div className="box remove">
                <Category text='근무요일' />
                <InputRadio {...props} type='근무요일' name='work_days' />
                <InputRadio {...props} type='근무요일협의' name='근무요일협의' />
                <InputRadio {...props} type='근무요일변동' name='근무요일변동' />
            </div>
            {props.errors['work_days'] && <span className="error_message">근무요일을 선택해주세요</span>}

            <div className="box">
                <Category text='고용형태' />
                <InputDropDown {...props} text='employment_type' name='고용형태' />
            </div>
            {props.errors['employment_type'] && <span className="error_message">고용형태를 선택해주세요</span>}

            <div className="box">
                <Category text='근무시간' />
                <InputDropDown {...props} text='근무시간' name='근무시간' />
                <InputRadio {...props} type='협의가능' name='근무시간협의' />
            </div>
            {props.errors['근무시간'] && <span className="error_message">근무시간을 선택해주세요</span>}
        </div>
    )
}