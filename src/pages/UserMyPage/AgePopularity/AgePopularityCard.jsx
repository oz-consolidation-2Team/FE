import './AgePopularity.scss';
import { FaBookmark, FaRegBookmark } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { bookmarkJobPropsType } from '@/utils/UserMyPagePropTypes';
import { useEffect, useState } from 'react';

const AgePopularityCard = ({ job }) => {
  const [isBookmarked, setIsBookmarked] = useState(job.is_favorited);
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/job-detail/${job.id}`);
  };

  useEffect(() => {
    setIsBookmarked(job.is_favorited);
  }, [job.is_favorited]);

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
            <FaBookmark className="bookmark_icon filled" />
          ) : (
            <FaRegBookmark className="bookmark_icon" />
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
