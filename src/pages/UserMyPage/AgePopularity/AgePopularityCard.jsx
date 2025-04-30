import './AgePopularity.scss';
import { FaBookmark, FaRegBookmark } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { bookmarkJobPropsType } from '@/utils/UserMyPagePropTypes';
import { useEffect, useState } from 'react';
import axiosInstance from '@/apis/axiosInstance';

const AgePopularityCard = ({ job }) => {
  const [isBookmarked, setIsBookmarked] = useState(job.is_favorited);
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/job-detail/${job.id}`);
  };

  useEffect(() => {
    setIsBookmarked(job.is_favorited);
  }, [job.is_favorited]);

  const handleBookmarkClick = async (e) => {
    e.stopPropagation();

    try {
      if (isBookmarked) {
        await axiosInstance.delete(`/favorites/${job.id}`);
      } else {
        await axiosInstance.post(`favorites`, { job_posting_id: job.id });
      }
      setIsBookmarked(!isBookmarked);
    } catch (err) {
      console.error('❌ 북마크 토글 실패', err);
    }
  };
  return (
    <>
      <div className="job_card" key={job.id} onClick={handleCardClick}>
        <div className="job_left">
          <p className="company">{job.work_place_name}</p>
          <h3 className="title">{job.title}</h3>
          <p className="date">{job.recruit_period_end}</p>
          <p className="location">{job.work_address}</p>
        </div>
        <div className="job_right">
          {isBookmarked ? (
            <FaBookmark className="bookmark_icon filled" onClick={handleBookmarkClick} />
          ) : (
            <FaRegBookmark className="bookmark_icon" onClick={handleBookmarkClick} />
          )}
        </div>
      </div>
    </>
  );
};

AgePopularityCard.propTypes = {
  job: bookmarkJobPropsType.isRequired,
};
export default AgePopularityCard;
