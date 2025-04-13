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
    <div className="job_list_container">
      <div className="job_card">
        <div className="company_card" onClick={handleCardClick}>
          <div className="job-header">
            <div className="company-info">
              <div className="company-name">{job.work_place_name}</div>
              <div className="job-title">{job.title}</div>
              <div className="job-description">{job.other_conditions}</div>
            </div>
          </div>
          <div className="recruitment_info">
            <p className="company-address">{job.work_address}</p>
            <p className="job-deadlin">{new Date(job.deadline_at).toLocaleDateString()} 마감</p>
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
      <div className="job_footer">
        <div> 지원 일자 : 2025.05.01 </div>
        <div> D-1</div>
      </div>
    </div>
  );
};

export default MyJobCard;
