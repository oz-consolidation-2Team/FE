import './AgePopularity.scss';
import { FaBookmark, FaRegBookmark } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { bookmarkJobPropsType } from '@/utils/UserMyPagePropTypes';
import { useFavoriteStore } from '@/store/useFavoriteStore';

const AgePopularityCard = ({ job }) => {
  const { toggleFavorite } = useFavoriteStore();

  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/job-detail/${job.id}`);
  };

  const handleBookmarkClick = async (e) => {
    e.stopPropagation();
    toggleFavorite(job);
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
          {job.is_favorited ? (
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
  onBookmarkChange: bookmarkJobPropsType.func,
};
export default AgePopularityCard;
