import React, { useState } from 'react';
import './Ai.scss';
import { getSummaryFromAI } from '@/apis/summaryApi';

const Ai = ({ job }) => {
  const [summary, setSummary] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSummaryClick = async () => {
    try {
      const requestBody = {
        title: job.title,
        job_category: job.job_category,
        education: job.education,
        employment_type: job.employment_type,
        payment_method: job.payment_method,
        salary: job.salary,
        work_duration: job.work_duration,
        is_work_duration_negotiable: job.is_work_duration_negotiable,
        work_days: job.work_days,
        is_work_days_negotiable: job.is_work_days_negotiable,
        work_start_time: job.work_start_time,
        work_end_time: job.work_end_time,
        is_work_time_negotiable: job.is_work_time_negotiable,
        career: job.career,
        work_place_name: job.work_place_name,
        work_address: job.work_address,
        benefits: job.benefits,
        preferred_conditions: job.preferred_conditions,
        description: job.description
      };

      const result = await getSummaryFromAI(requestBody);
      setSummary(result);
      setIsModalOpen(true);
    } catch (err) {
      console.error('AI 요약 실패:', err);
      alert('AI 요약 중 오류가 발생했습니다.');
    }
  };

  return (
    <section className="section07">
      <button className="ai-button" onClick={handleSummaryClick}>공고 요약 버튼</button>

      {isModalOpen && (
        <div className="ai-modal-overlay">
          <div className="ai-modal-content">
            <h3 className="ai-output">요약 결과</h3>
            <pre className="summary-box">{summary}</pre>
            <button className="close-btn" onClick={() => setIsModalOpen(false)}>닫기</button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Ai;