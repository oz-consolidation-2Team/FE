import React, { useEffect, useState } from 'react';
import PublicJobCard from './PublicJobCard'; 
import { fetchPublicRecruitments } from '@/apis/RecruitmentApi';
import './PublicJobList.scss';

const PublicJobList = () => {
  const [jobs, setJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const loadJobs = async () => {
      const data = await fetchPublicRecruitments({ pageNo: currentPage });
      setJobs(data?.result || []);
    };

    loadJobs();
  }, [currentPage]);
  
  const totalPages = 10;

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="job_section">
      <div className="PublicJobList_container">
        <div className="header">
          <h2 className="title">공공 일자리 정보</h2>
          <div className="buttons">
            <button onClick={handlePrevPage} disabled={currentPage === 1}>이전</button>
            <button onClick={handleNextPage} disabled={currentPage === totalPages}>다음</button>
          </div>
        </div>
        <div className="public-job-grid">
          {jobs.map((job) => (
            <PublicJobCard key={job.recrutPblntSn} job={job} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PublicJobList;