import { useState } from 'react';
import { FaRegStar, FaStar } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './MainPage.scss';

const MainJobCard = ({ job }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const navigate = useNavigate();

  const toggleBookmark = () => {
    setIsBookmarked((prev) => !prev);
  };

  return (
    <div className="job_card" onClick={() => navigate(`/job-detail/${job.id}`, { state: { job } })}>
      <div className="job_top">
        <span className="company">{job?.work_place_name}</span>
        <h3 className="title">{job?.title}</h3>
        <span className="date">{job?.recruit_period_end}</span>
      </div>
      <div className="job_bottom">
        {isBookmarked ? (
          <FaStar className="star_icon filled" onClick={toggleBookmark} />
        ) : (
          <FaRegStar className="star_icon" onClick={toggleBookmark} />
        )}
        <span className="location">{job?.work_address}</span>
      </div>
    </div>
  );
};

export default MainJobCard;
