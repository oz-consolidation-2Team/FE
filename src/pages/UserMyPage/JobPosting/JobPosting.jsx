import MyJobList, { dummyData } from '../MyJobList';
import './JobPosting.scss';

import { userInfoPropTypes } from '@/utils/UserMyPagePropTypes';

JobPosting.propTypes = {
  userInfo: userInfoPropTypes.isRequired,
};

function JobPosting({ userInfo }) {
  return (
    <section className="job_positing">
      <h3>{userInfo.name}님이 지원한 공고</h3>
      <MyJobList jobs={dummyData.slice(0, 2)} />
    </section>
  );
}

export default JobPosting;
