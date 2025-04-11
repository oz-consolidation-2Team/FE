import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaStar, FaRegStar } from 'react-icons/fa';

const JobCard = ({ job, isBookmarked, toggleBookmark }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/job-detail/${job.id}`);
  };

  const handleBookmarkClick = (e) => {
    e.stopPropagation(); // 카드 클릭 방지
    toggleBookmark(job.id);
  };

  return (
    <div className="job-card" onClick={handleCardClick}>
      <div className="job-header">
        <div className="company">{job.work_address}</div>
        {isBookmarked ? (
          <FaStar className="star_icon filled" onClick={handleBookmarkClick} />
        ) : (
          <FaRegStar className="star_icon" onClick={handleBookmarkClick} />
        )}
      </div>
      <div className="job-title">{job.title}</div>
      <div className="job-description">{job.other_conditions}</div>
      <div className="job-footer">
        {new Date(job.deadline_at).toLocaleDateString()} 마감
      </div>
    </div>
  );
};

export default JobCard;