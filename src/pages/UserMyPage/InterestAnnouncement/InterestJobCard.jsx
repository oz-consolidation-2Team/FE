import './InterestAnnouncement.scss';
import { bookmarkJobPropsType } from '@/utils/UserMyPagePropTypes';
import { FaBookmark, FaRegBookmark } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useFavoriteStore } from '@/store/useFavoriteStore';

const InterestJobCard = ({ job }) => {
  const { toggleFavorite, favorites } = useFavoriteStore();

  const navigate = useNavigate();

  const isFavorited = favorites.some(
    (fav) => (fav.job_posting_id || fav.id || fav.job_id) === job.job_id
  );
  const handleCardClick = () => {
    navigate(`/job-detail/${job.job_id}`);
  };

  const handleBookmarkClick = async (e) => {
    e.stopPropagation();
    toggleFavorite(job);
  };

  return (
    <>
      <div className="job_card" key={job.job_id} onClick={handleCardClick}>
        <div className="job_left">
          <p className="company">{job.company_name}</p>
          <h3 className="title">{job.title}</h3>
          <p className="date">{job.recruit_period_end}</p>
          <p className="location">{job.location}</p>
        </div>
        <div className="job_right">
          {isFavorited ? (
            <FaBookmark className="bookmark_icon filled" onClick={handleBookmarkClick} />
          ) : (
            <FaRegBookmark className="bookmark_icon" onClick={handleBookmarkClick} />
          )}
        </div>
      </div>
    </>
  );
};

InterestJobCard.propTypes = {
  job: bookmarkJobPropsType.isRequired,
};
export default InterestJobCard;
