import Category from "../Category";
import CategoryTitle from "../CategoryTitle";
import InputText from "../InputText";
import "../styles/inputs/WorkLocation.scss"

/**props = {
 * @formData 상태관리
 * @setFormData 상태관리
 * @errors 상태관리
 * @setErrors 상태관리
} */
export default function WorkLocation (props) {
    return (
        <div className="WorkLocation_container">
            <CategoryTitle title='근무지 정보' />
            <div className="box">
                <Category text='근무지 주소' />
                <input 
                className="search"
                style={{width: '100px'}} type='button' placeholder="주소지 찾기" />
            </div>
        {props.errors['work_address'] && <span className="error_message">근무지주소를 입력해주세요</span>}

            <div className="box">
                <Category text='근무지명' />
                <InputText {...props} text='근무지명' type='text' name='work_place_name' placeholder={props.formData.work_place_name} />
            </div>
        {props.errors['work_place_name'] && <span className="error_message">근무지명을 입력해주세요</span>}
        </div>
    )
}