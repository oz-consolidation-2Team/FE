import { useState } from 'react';
import { FaBookmark, FaRegBookmark } from 'react-icons/fa';
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
          <p className="company">{job.job_posting_id.company_id}</p>
          <h3 className="title">{job.job_posting_id.title}</h3>
          <p className="date">{job.job_posting_id.deadline_at}</p>
          <p className="location">{job.job_posting_id.work_address}</p>
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

BookmarkJobCard.propTypes = {
  job: bookmarkJobPropsType.isRequired,
};
export default BookmarkJobCard;
