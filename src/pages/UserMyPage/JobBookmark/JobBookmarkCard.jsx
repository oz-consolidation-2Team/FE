import { useState, useEffect } from 'react';
import { FaBookmark, FaRegBookmark } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { bookmarkJobPropsType } from '@/utils/UserMyPagePropTypes';
import { useFavoriteStore } from '@/store/useFavoriteStore';

const JobBookmarkCard = ({ job }) => {
  const { toggleFavorite } = useFavoriteStore();
  const navigate = useNavigate();

  // ✅ job.is_favorited를 기준으로 로컬 상태 만들기
  const [isBookmarked, setIsBookmarked] = useState(job.is_favorited);

  // ✅ job이 변경되면 최신 상태 반영
  useEffect(() => {
    setIsBookmarked(job.is_favorited);
  }, [job.is_favorited]);

  const handleCardClick = () => {
    navigate(`/job-detail/${job.id || job.job_id}`);
  };

  const handleBookmarkClick = async (e) => {
    e.stopPropagation();
    await toggleFavorite(job);
    setIsBookmarked((prev) => !prev); // ✅ 토글 후 바로 반영
  };

  return (
    <div className="job_card" key={job.id || job.job_id} onClick={handleCardClick}>
      <div className="job_left">
        <p className="company">{job.work_place_name}</p>
        <h3 className="title">{job.title}</h3>
        <p className="date">{job?.recruit_period_end?.split('T')[0]}</p>
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
  );
};

JobBookmarkCard.propTypes = {
  job: bookmarkJobPropsType.isRequired,
};

export default JobBookmarkCard;
