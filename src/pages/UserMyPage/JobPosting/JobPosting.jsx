import { useEffect } from 'react';
import './JobPosting.scss';
import MyJobList from '@/pages/UserMyPage/MyJobList';

import { userInfoPropTypes } from '@/utils/UserMyPagePropTypes';
import axiosInstance from '@/apis/axiosInstance';
import { useState } from 'react';

JobPosting.propTypes = {
  userInfo: userInfoPropTypes.isRequired,
};

function JobPosting({ userInfo }) {
  const [appliedJobs, setAppliedJobs] = useState();

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        const response = await axiosInstance.get(`/applications`);

        setAppliedJobs(response.data);
      } catch (err) {
        if (err.response?.status === 422) {
          console.error('정보를 불러오지 못 했습니다', err);
        } else {
          console.error('지원한 공고 패칭 실패', err);
        }
      }
    };

    fetchAppliedJobs();
  }, []);

  return (
    <section className="job_positing">
      <h3>{userInfo.name}님이 지원한 공고</h3>
      {appliedJobs && appliedJobs.length > 0 ? (
        <MyJobList appliedJobs={appliedJobs || []} />
      ) : (
        <p className="null_applied_jobs">지원한 공고가 없습니다!</p>
      )}
    </section>
  );
}

export default JobPosting;
