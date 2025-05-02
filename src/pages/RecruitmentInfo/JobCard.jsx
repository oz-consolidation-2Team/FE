import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBookmark, FaRegBookmark } from 'react-icons/fa';
import { addFavorite, deleteFavorite } from '@/apis/favoriteApi';
import './JobCard.scss';
import LoginPromptModal from '@/components/Company/Modal/LoginPromptModal';
import { BsBoxArrowUpRight } from 'react-icons/bs';

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
        setIsBookmarked(false); //
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
      case '주급':
        return 'payment-weekly';
      case '연봉':
        return 'payment-yearly';
      default:
        return 'payment-default';
      }
    };
    
    return (
      <>
      <div className="job_card_container">
        <div className="job_card_row" onClick={handleCardClick}>
          <div className="col_utillbutton">
            {userType !== 'company' && (
              <div className="bookmark">
                {isBookmarked ? (
                  <FaBookmark className="bookmark_icon filled" onClick={handleBookmarkClick} />
                ) : (
                  <FaRegBookmark className="bookmark_icon" onClick={handleBookmarkClick} />
                )}
              </div>
            )}
            <button
              className="external_link_btn"
              onClick={(e) => {
                e.stopPropagation();
                window.open(`/job-detail/${job.id}`, '_blank');
              }}
            >
              <BsBoxArrowUpRight />
            </button>
          </div>
          <div className="col_company">
            <div className="company_name">{job.work_place_name}</div>
            <div className="job_title">{job.title}</div>
          </div>
          <div className="col_location">{job.work_address}</div>
          <div className="col_time">
            {job.work_start_time && job.work_end_time
              ? `${job.work_start_time} ~ ${job.work_end_time}`
              : '협의 가능'}
          </div>
          <div className="col_pay">
            <span className={getPaymentClass(job.payment_method)}>{job.payment_method}</span> {job.salary.toLocaleString()}원
          </div>
          <div className="col_date">
            {job.is_always_recruiting
              ? '상시 모집'
              : `${new Date(job.recruit_period_end).toLocaleDateString()} `}
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
