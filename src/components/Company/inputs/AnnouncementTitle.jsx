import Category from "../Category";
import CategoryTitle from "../CategoryTitle";
import InputText from "../InputText"
import "../styles/inputs/AnnouncementTitle.scss"
import PropTypes from 'prop-types';

/**
 * @param {상태관리} formData input값 저장
 * @param {상태관리} error 유효성검사
 */
export default function AnnouncementTitle (props) {
    return (
        <div className="AnnouncementTitle_container">
            <CategoryTitle title="공고제목" />
            <div className="div_box">
                <Category text='공고제목' />
                <InputText {...props} text='공고 제목' type='text' name='title' placeholder={props.formData.title} />
            </div>
            {props.error['title'] && <span className="error_message">공고 제목을 입력해주세요</span>}

            <div className="div_box">
                <Category text='근무요약' />
                <InputText {...props} text='근무 요약' type='text' name='summary' placeholder={props.formData.summary}/>
            </div>
            {props.error['summary'] && <span className="error_message">근무 요약을 입력해주세요</span>}
        </div>
    )
}

AnnouncementTitle.propTypes = {
    formData: PropTypes.object,
    setFormData: PropTypes.node.isRequired,
    error: PropTypes.object,
    setError: PropTypes.node.isRequired
} 