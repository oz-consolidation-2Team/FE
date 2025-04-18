import React from 'react';
import './PublicJobCard.scss';

const PublicJobCard = ({ job }) => {
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
    <a href={srcUrl} target="_blank" rel="noreferrer" className="PublicJobCard_container">
      <div className="header">
        <p className="institute">{instNm}</p>
      </div>
      <div className="content">
        <h3 className="job_title">{recrutPbancTtl}</h3>
      </div>
      <div className="footer">
        <div className="left">
          <p className="region">{workRgnNmLst}</p>
        </div>
        <p className="deadline">{formattedDeadline} 마감</p>
      </div>
    </a>
  );
};

export default PublicJobCard;
