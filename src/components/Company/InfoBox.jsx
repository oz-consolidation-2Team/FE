import { useNavigate } from 'react-router-dom';
import "./styles/InfoBox.scss"
import PropTypes from 'prop-types';
import { formatPhoneNumber } from '@/utils/format';

/**
 * @param {'user' | 'company'} type 'user' or 'company' 어디서 호출했는지 구분하기 위함
 * @param {object} data 기업 마이 페이지 조회 API
 */
export default function InfoBox ({type, data}) {
    const navigate = useNavigate();

    return <div className='InfoBox_cantainer'>
        {type === 'company' && 
        <button 
        className='button_info_edit'
        onClick={() => navigate("/mypage/company/info-edit")}>기업 정보 수정</button> }
        <p>담당자 전화번호: {formatPhoneNumber(data.manager_phone)}</p>
        <p>담당자 이메일: {data.manager_email}</p>
        <p>기업 소개: {data.company_intro}</p>
    </div>
}

InfoBox.propTypes = {
    type: PropTypes.oneOf(['user', 'company']).isRequired,
    data: PropTypes.object.isRequired
} 