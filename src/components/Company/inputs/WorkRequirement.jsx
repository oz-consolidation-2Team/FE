import Category from "../Category";
import CategoryTitle from "../CategoryTitle";
import InputDropDown from "../InputDropDown";
import InputRadio from "../InputRadio";
import InputText from "../InputText";
import "../styles/inputs/WorkRequirement.scss"

/**props = {
 * @data 상태관리{} (InputDropDown에 props 하기 위함)
 * @setData 상태관리{} (InputDropDown에 props 하기 위함)
} */
export default function WorkRequirement (props) {
    return (
        <div className="WorkRequirement_container">
            <CategoryTitle title='근무 조건' />
            <div className="box move_pos">
                <Category text='급여' />
                <InputText {...props} text='급여' type='number' placeholder={props.data.급여} />
            </div>
            <div className="box">
                <Category text='급여지급방법' />
                <InputDropDown {...props} text='급여지급방법' />
            </div>
            <div className="box">
                <Category text='근무기간' />
                <InputDropDown {...props} text='근무기간' />
                <InputRadio {...props} type='협의가능' />
            </div>
            <div className="box remove">
                <Category text='근무요일' />
                <InputRadio {...props} type='근무요일' />
                <InputRadio {...props} type='근무요일협의' />
            </div>
            <div className="box">
                <Category text='고용형태' />
                <InputDropDown {...props} text='고용형태' />
            </div>
            <div className="box">
                <Category text='근무시간' />
                <InputDropDown {...props} text='근무시간' />
                <InputRadio {...props} type='협의가능' />
            </div>
        </div>
    )
}