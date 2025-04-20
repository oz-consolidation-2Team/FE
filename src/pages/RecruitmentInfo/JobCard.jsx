import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaStar, FaRegStar } from 'react-icons/fa';
import './JobCard.scss';

const JobCard = ({ job, isBookmarked, toggleBookmark }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/job-detail/${job.id}`, { state: { job } });
  };

  const handleBookmarkClick = (e) => {
    e.stopPropagation();
    toggleBookmark(job.id);
  };

  return (
    <div className="job_card" onClick={handleCardClick}>
      <div className="header">
        <div className="company">
          <div className="name">{job.work_place_name}</div>
          <div className="title">{job.title}</div>
          <div className="description">{job.other_conditions}</div>
        </div>
        {isBookmarked ? (
          <FaStar className="star_icon filled" onClick={handleBookmarkClick} />
        ) : (
          <FaRegStar className="star_icon" onClick={handleBookmarkClick} />
        )}
      </div>
        <div className="company-address">{job.work_address}</div>
      <div className="job-footer">
        {new Date(job.deadline_at).toLocaleDateString()} 마감
      </div>
    </div>
  );
};

export default JobCard;