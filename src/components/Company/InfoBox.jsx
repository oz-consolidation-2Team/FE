import { useNavigate } from 'react-router-dom';
import "./styles/InfoBox.scss"

/**props = {
 * type: 'user' | 'company' ('user' or 'company' 어디서 호출했는지 구분하기 위함)
 * company_id: number (해당 ID값으로 API 호출용도)
*/
export default function InfoBox (props) {
    const navigate = useNavigate();

    // 기업 정보 호출 api

    // 더미데이터
    const data = {
        phone: '010-1234-5678',
        email: 'oz123@gmail.com',
        introduction: '기업 소개글입니다'
    }

    return <div className='InfoBox_cantainer'>
        {props.type === 'company' && 
        <button 
        className='button_info_edit'
        onClick={() => navigate("/company_info_edit_page")}>기업 정보 수정</button> }
        <p>담당자 전화번호: {data.phone}</p>
        <p>담당자 이메일: {data.email}</p>
        <p>기업 소개: {data.introduction}</p>
    </div>
}