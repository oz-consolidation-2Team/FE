import { useState, useEffect } from 'react';
import { FaRegBookmark, FaBookmark } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { addFavorite, deleteFavorite } from '@/apis/favoriteApi';
import LoginPromptModal from '@/components/Company/Modal/LoginPromptModal';

import './MainPage.scss';

const MainJobCard = ({ job, onToggleFavorite }) => {
  const navigate = useNavigate();
  const [token, setToken] = useState(null);
  const [userType, setUserType] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    setToken(localStorage.getItem('access_token'));
    setUserType(localStorage.getItem('userType'));
  }, []);

  const toggleBookmark = async (e) => {
    e.stopPropagation();

    if (!token) {
      setShowLoginModal(true);
      return;
    }

    try {
      if (job.is_favorited) {
        await deleteFavorite(job.id);
        onToggleFavorite?.(job.id, false);
      } else {
        await addFavorite(job.id);
        onToggleFavorite?.(job.id, true);
      }
    } catch (error) {
      console.error('즐겨찾기 처리 실패:', error);
    }
  };

  return (
    <>
      <div
        className="job_card"
        onClick={() => navigate(`/job-detail/${job.id}`, { state: { job } })}
      >
        <div className="job_top">
          <span className="company">{job?.work_place_name}</span>
          {userType !== 'company' && (
            job.is_favorited ? (
              <FaBookmark className="bookmark_icon filled" onClick={toggleBookmark} />
            ) : (
              <FaRegBookmark className="bookmark_icon" onClick={toggleBookmark} />
            )
          )}
          <div className="title_and_bookmark">
            <h3 className="title">{job?.title}</h3>
          </div>
        </div>
        <div className="job_bottom">
          <span className="location">{job?.work_address}</span>
        </div>
        <div className="job_footer">
          <span className="date">{job?.recruit_period_end}</span>
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

export default MainJobCard;
