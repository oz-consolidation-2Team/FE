import React from 'react';
import { useLocation } from 'react-router-dom';
import './JobDetail.scss';

const JobDetail = () => {
  const location = useLocation();
  const job = location.state?.job;

  if (!job) return <div>로딩 중...</div>;

  return (
    <div className="job-detail">
      <section className="job-section">
        <div className="job-header">
          <div className="job-address">{job.work_address}</div>
          <div className="job-company">{job.work_place_name}</div>
        </div>
        <h2 className="job-title">{job.title}</h2>
        <div className="job-tags">
          <span className="job-tag">{job.job_category}</span>
          <span>{job.payment_method} {job.salary.toLocaleString()}</span>
          <span>근무요일 {job.work_days}</span>
          <span>근무기간 {job.work_duration}</span>
        </div>
      </section>

      <section className="job-section">
        <h3>모집조건</h3>
        <div className="job-conditions">
          <div className="condition-row">
            <div className="condition-label">모집기간</div>
            <div className="condition-value">
              {job.is_always_recruiting
                ? '상시 모집'
                : `${job.recruit_period_start} ~ ${job.recruit_period_end}`}
            </div>
          </div>
          <div className="condition-row">
            <div className="condition-label">고용 형태</div>
            <div className="condition-value">{job.employment_type}</div>
          </div>
          <div className="condition-row">
            <div className="condition-label">학력</div>
            <div className="condition-value">{job.education}</div>
          </div>
          <div className="condition-row">
            <div className="condition-label">모집인원</div>
            <div className="condition-value">{job.recruit_number}명</div>
          </div>
          <div className="condition-row">
            <div className="condition-label">우대조건</div>
            <div className="condition-value">{job.preferred_conditions}</div>
          </div>
          <div className="condition-row">
            <div className="condition-label">경력사항</div>
            <div className="condition-value">{job.career}</div>
          </div>
          <div className="condition-row">
            <div className="condition-label">모집조건</div>
            <div className="condition-value">{job.other_conditions}</div>
          </div>
          <div className="condition-row">
            <div className="condition-label">복리후생</div>
            <div className="condition-value">{job.benefits}</div>
          </div>
        </div>
        
      </section>

      <section className="job-section">
        <h3>근무지 정보</h3>
        <p>근무지 주소: {job.work_address}</p>
        <p>근무지명: {job.work_place_name}</p>
      </section>

      <section className="job-section">
        <h3>상세 내용</h3>
        <img src="https://via.placeholder.com/250x180?text=상세+이미지" alt="상세 이미지" className="job-image" />
        <pre className="job-description">{job.description}</pre>
      </section>

      <section className="job-section">
        <p><strong>대표 전화번호</strong>: 010-1234-5678</p>
        <p><strong>이메일</strong>: nextrunners@nextrunners.co.kr</p>
        <p><strong>기업 소개</strong>: 나도 몰라유</p>
      </section>

      <div className="job-action">
        <button className="apply-button">지원하기</button>
      </div>
    </div>
  );
};

export default JobDetail;
