import Category from "../Category";
import CategoryTitle from "../CategoryTitle";
import InputImage from "../InputImage";
import InputText from "../InputText";
import "../styles/inputs/AnnouncementContent.scss"
import PropTypes from 'prop-types';

/**
 * @param {상태관리} formData input값 저장
 * @param {상태관리} error 유효성검사
 */
export default function AnnouncementContent (props) {
    return (
    <div className="AnnouncementContent_container">
        <CategoryTitle title='공고 상세 내용' />
        <div className="div_box">
            <Category text='공고 내용' essential={false} />
            <InputText {...props} text='공고 내용' type='text' name='description' placeholder={props.formData.description} />
        </div>
        <div className="div_box">
            <Category text='이미지 등록' />
            <InputImage {...props} />
        </div>
        {props.error['image_file'] && <span className="error_message">이미지를 등록해주세요</span>}
    </div>
    )
}

AnnouncementContent.propTypes = {
    formData: PropTypes.object,
    setFormData: PropTypes.node.isRequired,
    error: PropTypes.object,
    setError: PropTypes.node.isRequired
} 