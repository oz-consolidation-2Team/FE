import React from 'react';
import './PublicJobCard.scss';
import { FaRegStar, FaStar } from 'react-icons/fa';

const PublicJobCard = ({ job }) => {
  const [isBookmarked, setIsBookmarked] = React.useState(false);

  const handleBookmarkClick = (e) => {
    e.preventDefault();
    setIsBookmarked((prev) => !prev);
  };

  const {
    recrutPbancTtl,
    instNm,
    workRgnNmLst,
    pbancEndYmd,
    srcUrl
  } = job;

  const formattedDeadline = pbancEndYmd
    ? `${pbancEndYmd.slice(0, 4)}-${pbancEndYmd.slice(4, 6)}-${pbancEndYmd.slice(6)}`
    : '상시 모집';

  return (
    <a href={srcUrl} target="_blank" rel="noreferrer" className="public-job-card">
      <div className="card-header">
        <p className="institute">{instNm}</p>
            {isBookmarked ? (
                <FaStar className="star_icon filled" onClick={handleBookmarkClick} />
            ) : (
                <FaRegStar className="star_icon" onClick={handleBookmarkClick} />
            )}
      </div>
      <div className="card-content">
        <h3 className="job-title">{recrutPbancTtl}</h3>
      </div>
      <div className="card-footer">
        <div className="footer-left">
          <p className="region">{workRgnNmLst}</p>
        </div>
        <p className="deadline">{formattedDeadline} 마감</p>
      </div>
    </a>
  );
};

export default PublicJobCard;
