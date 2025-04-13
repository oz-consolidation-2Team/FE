import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaStar, FaRegStar } from 'react-icons/fa';
import './MyJobList.scss';

const MyJobCard = ({ job, isBookmarked, toggleBookmark }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/job-detail/${job.id}`, { state: { job } });
  };

  const handleBookmarkClick = (e) => {
    e.stopPropagation();
    toggleBookmark(job.id);
  };

  return (
    <div className="job-card">
      <div className="company-card" onClick={handleCardClick}>
        <div className="job-header">
          <div className="company-info">
            <div className="company-name">{job.work_place_name}</div>
            <div className="job-title">{job.title}</div>
            <div className="job-description">{job.other_conditions}</div>
            <div className="company-address">{job.work_address}</div>
            <div className="job-deadlin">{new Date(job.deadline_at).toLocaleDateString()} 마감</div>
          </div>
        </div>
        <div className="job_footer">
          <div> 지원 일자 : 2025.05.01 </div>
          <div> D-1</div>
        </div>
      </div>
      <div className="star">
        {isBookmarked ? (
          <FaStar className="star_icon filled" onClick={handleBookmarkClick} />
        ) : (
          <FaRegStar className="star_icon" onClick={handleBookmarkClick} />
        )}
      </div>
    </div>
  );
};

export default MyJobCard;
