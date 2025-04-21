import { useState } from 'react';
import { FaRegStar, FaStar } from 'react-icons/fa';
import '../UserMyPage/JobRecommend/JobRecommend.scss';
import { bookmarkJobPropsType } from '@/utils/UserMyPagePropTypes';

const BookmarkJobCard = ({ job }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);

  const toggleBookmark = () => {
    setIsBookmarked((prev) => !prev);
  };

  return (
    <>
      <div className="job_card" key={job.id}>
        <div className="job_top">
          <span className="company">{job.job_posting_id.company_id}</span>
          <h3 className="title">{job.job_posting_id.title}</h3>
          <span className="date">{job.job_posting_id.deadline_at}</span>
        </div>
        <div className="job_bottom">
          {isBookmarked ? (
            <FaStar className="star_icon filled" onClick={toggleBookmark} />
          ) : (
            <FaRegStar className="star_icon" onClick={toggleBookmark} />
          )}
          <span className="location">{job.job_posting_id.work_address}</span>
        </div>
      </div>
    </>
  );
};

BookmarkJobCard.propTypes = {
  job: bookmarkJobPropsType.isRequired,
};
export default BookmarkJobCard;
