import Category from "../Category";
import CategoryTitle from "../CategoryTitle";
import InputDropDown from "../InputDropDown";
import InputRadio from "../InputRadio";
import InputText from "../InputText";
import "../styles/inputs/JobRequirement.scss"

/**props = {
 * @data 상태관리{} (InputDropDown에 props하기 위함)
 * @setDate 상태관리 (InputDropDown에 props하기 위함)
} */
export default function JobRequirement (props) {
    return (
    <div className="JobRequirement_container">
        <CategoryTitle title="모집 조건" />
        <div className="box">
            <Category text="모집기간" />
            <InputDropDown {...props} text='모집기간' />
        </div>
        <div className="box recruite_peple">
            <Category text="모집인원" />
            <InputText {...props} text='모집인원' type='number' placeholder={props.data.모집인원} />
        </div>
        <div className="box">
            <Category text="학력" />
            <InputDropDown {...props} text='학력' />
        </div>
        <div className="box">
            <Category text="직종" />
            <InputDropDown {...props} text='직종' />
        </div>
        <div className="box">
            <Category text="복리후생" essential={false} />
            <InputRadio {...props} type='복리후생'/>
        </div>
        <div className="box">
            <Category text="우대조건" essential={false} />
            <InputRadio {...props} type='우대조건' />
        </div>
        <div className="box">
            <Category text="기타조건" essential={false} />
            <InputRadio {...props} type='기타조건' />
        </div>
    </div>
    )
}