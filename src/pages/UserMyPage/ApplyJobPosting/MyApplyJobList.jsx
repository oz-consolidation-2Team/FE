import React, { useState } from 'react';

import { jobPropsType } from '@/utils/UserMyPagePropTypes';
import PropTypes from 'prop-types';
import MyApplyJobCard from './MyApplyJobCard';

const MyApplyJobList = ({ appliedJobs }) => {
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
          job={job}
          isBookmarked={isBookmarked[job.id]}
          toggleBookmark={toggleBookmark}
        />
      ))}
    </div>
  );
};

MyApplyJobList.propTypes = {
  appliedJobs: PropTypes.arrayOf(jobPropsType),
};
export default MyApplyJobList;
