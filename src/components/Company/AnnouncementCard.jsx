
import { useNavigate } from 'react-router-dom';

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
    <div>
        <div>
            <p>{props.companyName}</p>
            <p>{props.companyAdress}</p>
        </div>
        <div>
            <p>{props.AnnouncementName}</p>
            <p>{props.AnnouncementContent}</p>
        </div>
        <p>{props.time}</p>
        <div>
            <button onClick={handleAnnouncementEditClick}>수정하기</button>
            <button onClick={() => navigate(`/company_resumes_page/${props.id}`)}>이력서 확인하기</button>
        </div>
    </div>
    )
}