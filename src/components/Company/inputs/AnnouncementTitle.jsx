import Category from "../Category";
import CategoryTitle from "../CategoryTitle";
import InputText from "../InputText"
import "../styles/inputs/AnnouncementTitle.scss"

/**props = {
 * @formData 상태관리
 * @setFormData 상태관리
 * @error 에러 상태관리
 * @setError 에러 상태관리
} */
export default function AnnouncementTitle (props) {
    return (
        <div className="AnnouncementTitle_container">
            <CategoryTitle title="공고제목" />
            <div className="box">
                <Category text='공고제목' />
                <InputText {...props} text='공고 제목' type='text' name='title' placeholder={props.formData.title} />
            </div>
            {props.errors['title'] && <span className="error_message">공고 제목을 입력해주세요</span>}

            <div className="box">
                <Category text='근무요약' />
                <InputText {...props} text='근무 요약' type='text' name='근무요약' placeholder={props.formData.근무요약}/>
            </div>
            {props.errors['근무요약'] && <span className="error_message">근무 요약을 입력해주세요</span>}
        </div>
    )
}