import Category from "../Category";
import CategoryTitle from "../CategoryTitle";
import InputImage from "../InputImage";
import InputText from "../InputText";
import "../styles/inputs/AnnouncementContent.scss"

/**
 * @param {상태관리} formData input값 저장
 * @param {상태관리} error 유효성검사
 */
export default function AnnouncementContent (props) {
    return (
    <div className="AnnouncementContent_container">
        <CategoryTitle title='공고 상세 내용' />
        <div className="box">
            <Category text='공고 내용' essential={false} />
            <InputText {...props} text='공고 내용' type='text' name='description' placeholder={props.formData.description} />
        </div>
        <div className="box">
            <Category text='이미지 등록' />
            <InputImage {...props} />
        </div>
    </div>
    )
}