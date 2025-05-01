import React, { useState } from 'react';

import { jobPropsType } from '@/utils/UserMyPagePropTypes';
import PropTypes from 'prop-types';
import MyApplyJobCard from './MyApplyJobCard';

const MyApplyJobList = ({ appliedJobs, userInfo, onUpdate }) => {
  const [isBookmarked, setIsBookmarked] = useState({});

  const toggleBookmark = (id) => {
    setIsBookmarked((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="job-list">
      {appliedJobs.map((job) => (
        <MyApplyJobCard
          key={job.id}
          job={job.job_posting}
          isBookmarked={isBookmarked[job.id]}
          toggleBookmark={toggleBookmark}
          userInfo={userInfo}
          onUpdate={onUpdate}
          appliedJobs={job}
        />
      ))}
    </div>
  );
};

MyApplyJobList.propTypes = {
  appliedJobs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      job_posting_id: PropTypes.number.isRequired,
      job_posting: jobPropsType.isRequired,
    })
  ).isRequired,
  userInfo: PropTypes.object.isRequired,
  onUpdate: PropTypes.func,
};

export default MyApplyJobList;
