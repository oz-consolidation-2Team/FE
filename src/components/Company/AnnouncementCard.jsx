
import { useNavigate } from 'react-router-dom';
import "./styles/AnnouncementCard.scss"
import PropTypes from 'prop-types';

/**
 * @param {object} data 기업 공고 api (분해된)
 * @param {object} companyInfo 기업 정보 api
 */
export default function AnnouncementCard (props) {
    const navigate = useNavigate();

    const handleAnnouncementEditClick = (e) => {
        e.stopPropagation()
        navigate(`/mypage/company/announcement/edit/${props.id}`);
    };

    const dayRander = props.is_always_recruiting ? "상시 모집" : props.recruit_period_end
    console.log(props)
    return (
        <div className='AnnouncementCard_cantainer' onClick={() => navigate(`/job-detail/${props.id}`)}>
            <p>{props.work_address}</p>
            <div>
                <h3 className='title_name'>{props.title}</h3>
                <p>{props.summary}</p>
            </div>
            <p className='time'>{dayRander}</p>
            <div className='button_group'>
                <button onClick={handleAnnouncementEditClick}>수정하기</button>
                <button onClick={(e) => {
                        e.stopPropagation()
                        navigate(`/mypage/company/announcement/resumes/${props.id}`)
                    }}>이력서 확인하기</button>
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