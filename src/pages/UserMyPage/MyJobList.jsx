import React, { useState } from 'react';
import '../UserMyPage/JobRecommend/JobRecommend.scss';
import MyJobCard from './MyJobCard';
import { jobPropsType } from '@/utils/UserMyPagePropTypes';
import PropTypes from 'prop-types';

const JobList = ({ appliedJobs }) => {
  const [isBookmarked, setIsBookmarked] = useState({});

  const toggleBookmark = (id) => {
    setIsBookmarked((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };
  console.log(appliedJobs);

  return (
    <div className="job-list">
      {appliedJobs.map((job) => (
        <MyJobCard
          key={job.id}
          job={job}
          isBookmarked={isBookmarked[job.id]}
          toggleBookmark={toggleBookmark}
        />
      ))}
    </div>
  );
};

JobList.propTypes = {
  appliedJobs: PropTypes.arrayOf(jobPropsType),
};
export default JobList;
