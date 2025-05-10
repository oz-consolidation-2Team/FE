import { useEffect, useState } from 'react';
import { JobPosting } from '@/apis/companyPostingApi';
import { useNavigate } from 'react-router-dom';

/**
 * @param {string} params 공고 ID
 */
export default function CompanyCard({ params }) {
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [jobLoading, setJobLoading] = useState(true);
  const [jobError, setJobError] = useState(null);

  // 공고 상세 조회
  useEffect(() => {
    try {
      JobPosting(params).then((res) => {
        setJob(res);
        setJobLoading(false);
      });
    } catch (error) {
      setJobError('공고 상세 조회 에러', error);
      setJobLoading(false);
    }
  }, []);

  if (!job) return;

  const 상시모집 = job.is_always_recruiting ? '상시 모집' : job.recruit_period_end + ' 까지';
  return (
    <div className="CompanyCard_container">
      {jobLoading ? (
        <p>로딩 중...</p>
      ) : (
        <>
          <p>{job.work_place_name}</p>
          <h3>{job.title}</h3>
          <p>{job.summary}</p>
          <div className="bottom">
            <p>{job.work_address}</p>
            <p>{상시모집}</p>
            <button onClick={() => navigate(`/job-detail/${job.id}`)}>공고 보러 가기</button>
          </div>
        </>
      )}
    </div>
  );
}
