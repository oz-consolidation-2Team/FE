import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaStar, FaRegStar, FaRegCopy } from 'react-icons/fa';
import './JobDetail.scss';
import JobApplyModal from '@/components/Company/Modal/JobApplyModal';
import { getJobDetail } from '@/apis/RecruitmentApi';
import useUserStore from 'utils/userStore';

const JobDetail = () => {
  const { postingId } = useParams();
  const [job, setJob] = useState(null);
  const { token } = useUserStore();
  const navigate = useNavigate();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const data = await getJobDetail(postingId, token);
        setJob(data);
      } catch (error) {
        console.error('채용공고 불러오기 실패:', error);
      }
    };

    fetchJob();
    window.scrollTo(0, 0);
  }, [postingId]);

  if (!job) return <div>로딩 중...</div>;

  const handleBookmarkClick = () => {
    setIsBookmarked(prev => !prev);
  };

  return (
    <div className="jobdetail_container">
      <section className="section">
        <div className="header">
          <div className="address">{job.work_address}</div>
          <div
            className="company"
            style={{ cursor: 'pointer' }}
            onClick={() => navigate(`/company_info_page/${job.company_id}`)}
            >{job.work_place_name}</div>
        </div>
          <h2 className="title">{job.title}</h2>
        <div className="tags">
          <span className="job-tag">{job.job_category}</span>
          <span>{job.payment_method} {job.salary.toLocaleString()}</span>
          <span>근무요일 {job.work_days}</span>
          <span>근무기간 {job.work_duration}</span>
        </div>
      </section>

      <section className="section">
        <h3>모집조건</h3>
        <div className="conditions">
          <div className="condition_row">
            <div className="condition_label">모집기간</div>
            <div className="condition_value">
              {job.is_always_recruiting
                ? '상시 모집'
                : `${job.recruit_period_start} ~ ${job.recruit_period_end}`}
            </div>
          </div>
          <div className="condition_row">
            <div className="condition_label">고용 형태</div>
            <div className="condition_value">{job.employment_type}</div>
          </div>
          <div className="condition_row">
            <div className="condition_label">학력</div>
            <div className="condition_value">{job.education}</div>
          </div>
          <div className="condition_row">
            <div className="condition_label">모집인원</div>
            <div className="condition_value">{job.recruit_number}명</div>
          </div>
          <div className="condition_row">
            <div className="condition_label">우대조건</div>
            <div className="condition_value">{job.preferred_conditions}</div>
          </div>
          <div className="condition_row">
            <div className="condition_label">경력사항</div>
            <div className="condition_value">{job.career}</div>
          </div>
          <div className="condition_row">
            <div className="condition_label">모집조건</div>
            <div className="condition_value">{job.other_conditions}</div>
          </div>
          <div className="condition_row">
            <div className="condition_label">복리후생</div>
            <div className="condition_value">{job.benefits}</div>
          </div>
        </div>
        
      </section>

      <section className="section">
        <h3>근무지 정보</h3>
        <p>근무지명: {job.work_place_name}</p>
          <div className="address-row" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span>근무지 주소:</span>
            <span style={{ userSelect: 'text' }}>{job.work_address}</span>
            <button
              onClick={() => {
                navigator.clipboard.writeText(job.work_address);
                alert('근무지 주소가 복사되었습니다!');
              }}
            >
              <FaRegCopy />
            </button>
          </div>
      </section>

      <section className="section">
        <h3>상세 내용</h3>
        <pre className="description">{job.description}</pre>
        {job.postings_image && (
            <img
              src={job.postings_image}
              alt="채용 공고 이미지"
              className="job-image"
              style={{ width: '100%', maxHeight: '600px', objectFit: 'cover', marginTop: '20px' }}
            />
          )}
      </section>

      <section className="section">
        <p><strong>대표 전화번호</strong>: 010-1234-5678</p>
        <p><strong>이메일</strong>: nextrunners@nextrunners.co.kr</p>
        <p><strong>기업 소개</strong>: 나도 몰라유</p>
      </section>

      <div className="action">
        <button className="button" onClick={() => setIsModalOpen(true)}>지원하기</button>
        <div className="bookmark">
          {isBookmarked ? (
            <FaStar className="star_icon filled" onClick={handleBookmarkClick} />
          ) : (
            <FaRegStar className="star_icon" onClick={handleBookmarkClick} />
          )}
        </div>
      </div>
      {isModalOpen && (
        <JobApplyModal
          onClose={() => setIsModalOpen(false)}
          onApply={() => {
            setIsModalOpen(false);
            alert('지원이 완료되었습니다!'); // 나중에 API 연동 예정
          }}
          onEditResume={() => navigate('/mypage/user/resumes')}
        />
      )}
    </div>
  );
};

export default JobDetail;
