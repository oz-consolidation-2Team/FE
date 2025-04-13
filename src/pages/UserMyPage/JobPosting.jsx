import MyJobList, { dummyData } from './MyJobList';
import './UserInfoPage.scss';

function JobPosting() {
  return (
    <section className="job_positing">
      <h3>내가 지원한 공고</h3>
      <MyJobList jobs={dummyData.slice(0, 2)} />
    </section>
  );
}

export default JobPosting;
