import MyJobList, { dummyData } from './MyJobList';

function JobPosting() {
  return (
    <section>
      <h3>내가 지원한 공고</h3>
      <MyJobList jobs={dummyData.slice(0, 2)} />
    </section>
  );
}

export default JobPosting;
