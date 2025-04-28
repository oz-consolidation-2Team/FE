import { useState } from 'react';
import { FaBookmark, FaRegBookmark } from 'react-icons/fa';
import './JobRecommend.scss';
import { bookmarkJobPropsType } from '@/utils/UserMyPagePropTypes';

const JobRecommendCard = ({ job }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);

  const toggleBookmark = () => {
    setIsBookmarked((prev) => !prev);
  };

  return (
    <>
      <div className="job_card" key={job.id}>
        <div className="job_top">
          <p className="company">{job.company_name}</p>
          <h3 className="title">{job.title}</h3>
          <p className="date">{job.recruit_period_end}</p>
          <p className="location">{job.location}</p>
        </div>
        <div className="job_bottom">
          {isBookmarked ? (
            <FaBookmark className="star_icon filled" onClick={toggleBookmark} />
          ) : (
            <FaRegBookmark className="star_icon" onClick={toggleBookmark} />
          )}
        </div>
      </div>
    </>
  );
};

JobRecommendCard.propTypes = {
  job: bookmarkJobPropsType.isRequired,
};
export default JobRecommendCard;
