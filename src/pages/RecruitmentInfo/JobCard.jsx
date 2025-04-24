import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaStar, FaRegStar } from 'react-icons/fa';
import './JobCard.scss';

const JobCard = ({ job, isBookmarked, toggleBookmark }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/job-detail/${job.id}`);
  };

  const handleBookmarkClick = (e) => {
    e.stopPropagation();
    toggleBookmark(job.id);
  };

  const getPaymentClass = (method) => {
    switch (method) {
      case '시급':
        return 'payment-hourly';
      case '월급':
        return 'payment-monthly';
      case '일급':
        return 'payment-daily';
      default:
        return 'payment-default';
    }
  };

  return (
    <div className="job_card" onClick={handleCardClick}>
      <div className="header">
        <div className="company">
          <div className="name">{job.work_place_name}</div>
          <div className="title">{job.title}</div>
          <div className="payment">
            <span className={getPaymentClass(job.payment_method)}>{job.payment_method}</span> {job.salary.toLocaleString()}원
          </div>
          <div className="description">{job.job_category}</div>
        </div>
        {isBookmarked ? (
          <FaStar className="star_icon filled" onClick={handleBookmarkClick} />
        ) : (
          <FaRegStar className="star_icon" onClick={handleBookmarkClick} />
        )}
      </div>
      <div className="footer">
        <div className="company-address">{job.work_address}</div>
        <div className="recruitStatus">
          {job.is_always_recruiting
            ? '상시 모집'
            : `${new Date(job.recruit_period_end).toLocaleDateString()} 마감`}
        </div>
      </div>
    </div>
  );
};

export default JobCard;