import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBookmark, FaRegBookmark } from 'react-icons/fa';
import { addFavorite, deleteFavorite } from '@/apis/favoriteApi';
import './JobCard.scss';
import LoginPromptModal from '@/components/Company/Modal/LoginPromptModal';

const JobCard = ({ job }) => {
  const navigate = useNavigate();
  const [isBookmarked, setIsBookmarked] = React.useState(job.is_favorited);
  const [showLoginModal, setShowLoginModal] = React.useState(false);
  const token = localStorage.getItem('access_token');
  const userType = localStorage.getItem('userType');

  useEffect(() => {
    setIsBookmarked(job.is_favorited);
  }, [job.is_favorited]);

  const handleCardClick = () => {
    navigate(`/job-detail/${job.id}`);
  };

  const handleBookmarkClick = async (e) => {
    e.stopPropagation();
    if (!token) {
      setShowLoginModal(true);
      return;
    }

    try {
      if (isBookmarked) {
        await deleteFavorite(job.id);
        setIsBookmarked(null); //
      } else {
        await addFavorite(job.id);
        setIsBookmarked(true); //
      }
    } catch (error) {
      console.error('즐겨찾기 처리 실패:', error);
    }
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
    <>
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
          {userType !== 'company' && (
            <div className="bookmark-icon">
              {isBookmarked ? (
                <FaBookmark className="bookmark_icon filled" onClick={handleBookmarkClick} />
              ) : (
                <FaRegBookmark className="bookmark_icon" onClick={handleBookmarkClick} />
              )}
            </div>
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
      {showLoginModal && (
        <LoginPromptModal
          onClose={() => setShowLoginModal(false)}
          navigate={navigate}
        />
      )}
    </>
  );
};

export default JobCard;
