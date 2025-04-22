
import { useNavigate } from 'react-router-dom';
import "./styles/AnnouncementCard.scss"
import PropTypes from 'prop-types';

/**props = {
 * data: 공고호출api값{} (공고 카드를 그리기위함)
    } 
*/
export default function AnnouncementCard (props) {
    const navigate = useNavigate();

    const handleAnnouncementEditClick = () => {
        navigate(`/company_announcement_edit_page/${props.id}`);
    };

    return (
    <div className='AnnouncementCard_cantainer'>
        <div>
            <p>{props.companyName}</p>
            <p>{props.companyAdress}</p>
        </div>
        <div>
            <h3 className='title_name'>{props.AnnouncementName}</h3>
            <p>{props.AnnouncementContent}</p>
        </div>
        <p className='time'>{props.time}</p>
        <div className='button_group'>
            <button onClick={handleAnnouncementEditClick}>수정하기</button>
            <button onClick={() => navigate(`/company_resumes_page/${props.id}`)}>이력서 확인하기</button>
        </div>
    </div>
    )
}

AnnouncementCard.propTypes = {
    companyName: PropTypes.object,
    companyAdress: PropTypes.node.isRequired,
    AnnouncementName: PropTypes.string.isRequired,
    AnnouncementContent: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired
} 