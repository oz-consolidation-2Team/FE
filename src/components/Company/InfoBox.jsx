import { useNavigate } from 'react-router-dom';
import "./styles/InfoBox.scss"
import PropTypes from 'prop-types';

/**
 * @param {'user' | 'company'} type 'user' or 'company' 어디서 호출했는지 구분하기 위함
 * @param {number} company_id해당 ID값으로 API 호출용도
 */
export default function InfoBox (props) {
    const navigate = useNavigate();

    // 기업 정보 호출 api
    //api 기업 정보 조회 (기업 ID로 해당 기업 상세 정보 조회) /company/me (body에 작성 / 전역상태에서 company_user_id 호출)

    // 더미데이터
    const data = {
        manager_phone: '010-1234-5678',
        manager_email: 'oz123@gmail.com',
        company_intro: '기업 소개글입니다'
    }

    return <div className='InfoBox_cantainer'>
        {props.type === 'company' && 
        <button 
        className='button_info_edit'
        onClick={() => navigate("/company_info_edit_page")}>기업 정보 수정</button> }
        <p>담당자 전화번호: {data.manager_phone}</p>
        <p>담당자 이메일: {data.manager_email}</p>
        <p>기업 소개: {data.company_intro}</p>
    </div>
}

InfoBox.propTypes = {
    type: PropTypes.oneOf(['user', 'company']).isRequired,
    company_id: PropTypes.number.isRequired,
} 