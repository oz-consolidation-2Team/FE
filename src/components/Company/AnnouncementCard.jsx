
import { useNavigate } from 'react-router-dom';
import "./styles/AnnouncementCard.scss"
import PropTypes from 'prop-types';

/**
 * @param {object} data 기업 공고 데이터
 */
export default function AnnouncementCard (props) {
    console.log(props)
    const navigate = useNavigate();

    const handleAnnouncementEditClick = () => {
        navigate(`/company_announcement_edit_page/${props.id}`);
    };

    const dayRander = props.is_always_recruiting ? "상시 모집" : props.recruit_period_end

    return (
        <div className='AnnouncementCard_cantainer'>
            <p>{props.work_address}</p>
            <div>
                <h3 className='title_name'>{props.title}</h3>
                <p>근무요약</p>
            </div>
            <p className='time'>{dayRander}</p>
            <div className='button_group'>
                <button onClick={handleAnnouncementEditClick}>수정하기</button>
                <button onClick={() => navigate(`/company_resumes_page/${props.id}`)}>이력서 확인하기</button>
            </div>
        </div>
    )
}

AnnouncementCard.propTypes = {
    title: PropTypes.string.isRequired,
    AnnouncementContent: PropTypes.string.isRequired,
    work_address: PropTypes.string.isRequired,
    recruit_period_end: PropTypes.string.isRequired,
    is_always_recruiting: PropTypes.bool.isRequired,
    id: PropTypes.number.isRequired
} 