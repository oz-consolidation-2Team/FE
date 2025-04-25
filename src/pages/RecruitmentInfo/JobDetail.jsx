import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaStar, FaRegStar, FaRegCopy } from 'react-icons/fa';
import './JobDetail.scss';
import JobApplyModal from '@/components/Company/Modal/JobApplyModal';
import { getJobDetail } from '@/apis/RecruitmentApi';
import KakaoMap from '@/components/KakaoMap/KakaoMap';
import { CompaniesInfo } from '@/apis/CompanyApi';
import { formatPhoneNumber } from '@/utils/format';



const JobDetail = () => {
  const { postingId } = useParams();
  const [job, setJob] = useState(null);
  const [companyInfo, setCompanyInfo] = useState(null);
  const navigate = useNavigate();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const data = await getJobDetail(postingId);
        setJob(data);
        const companyData = await CompaniesInfo(data.company_id);
        setCompanyInfo(companyData);
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

  const convertToAMPM = (timeStr) => {
    if (!timeStr) return '';
    const [hour, minute] = timeStr.split(':').map(Number);
    const period = hour < 12 ? '오전' : '오후';
    const hour12 = hour % 12 === 0 ? 12 : hour % 12;
    return `${period} ${hour12}:${minute.toString().padStart(2, '0')}`;
  };

  const getWorkDayLabel = (daysStr) => {
    const days = daysStr.split(',').map(d => d.trim());
    const weekday = ['월', '화', '수', '목', '금'];
    const weekend = ['토', '일'];
    const fullWeek = [...weekday, ...weekend];

    const isWeekday = days.every(d => weekday.includes(d));
    const isWeekend = days.every(d => weekend.includes(d));
    const isFullWeek = fullWeek.every(d => days.includes(d)) && days.length === 7;

    if (isFullWeek) return '주7일';
    if (isWeekday) return '평일';
    if (isWeekend) return '주말';
    return daysStr;
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
          <span className="job-tag">{job.job_category}</span>
        <div className="tags">
          <span>{job.payment_method}</span>
          <span>
            {job.is_work_days_negotiable_str ? '협의 가능' : getWorkDayLabel(job.work_days)}
          </span>
          <span>
            {job.is_work_duration_negotiable_str ? '협의 가능' : job.work_duration}
          </span>
          {job.benefits && (
            <span>
              {job.benefits}
            </span>
          )}
        </div>
      </section>

      <section className="section">
        <h3>근무조건</h3>
        <div className="conditions">
          <div className="condition_row">
            <div className="condition_label">급여</div>
            <div className="condition_value">
              <span className={`payment_method_badge ${
                job.payment_method === '시급' ? 'payment-hourly' :
                job.payment_method === '일급' ? 'payment-daily' :
                job.payment_method === '월급' ? 'payment-monthly' :
                'payment-default'
              }`}>{job.payment_method}</span>
              <span className="salary">{job.salary.toLocaleString()}원</span>
            </div>
          </div>
          <div className="condition_row">
            <div className="condition_label">근무 기간</div>
            <div className="condition_value">{job.work_duration}</div>
          </div>
          <div className="condition_row">
            <div className="condition_label">근무 요일</div>
            <div className="condition_value">
              {job.is_work_days_negotiable_str
                ? '협의 가능'
                : job.is_schedule_based_str
                ? '일정에 따름'
                : (
                  <>
                    <span className="day_count">주{job.work_days?.split(',').length}일</span>
                    <span className="day_list">({job.work_days?.split(',').join(', ')})</span>
                  </>
                )}
            </div>
          </div>
          <div className="condition_row">
            <div className="condition_label">근무 시간</div>
            <div className="condition_value">{job.is_work_time_negotiable_str ? '협의 가능' : `${convertToAMPM(job.work_start_time)} ~ ${convertToAMPM(job.work_end_time)}`}</div>
          </div>
          <div className="condition_row">
            <div className="condition_label">업직종</div>
            <div className="condition_value">{job.job_category}</div>
          </div>
          <div className="condition_row">
            <div className="condition_label">고용 형태</div>
            <div className="condition_value">{job.employment_type}</div>
          </div>
          <div className="condition_row">
            <div className="condition_label">복리후생</div>
            <div className="condition_value">{job.benefits}</div>
          </div>
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
            <div className="condition_label">기타조건</div>
            <div className="condition_value">{job.other_conditions}</div>
          </div>
        </div>
      </section>

      <section className="section">
        <h3>근무지 정보</h3>
        <div className="address_row" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div>
            <strong>근무지명:</strong> {job.work_place_name}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <strong>근무지 주소:</strong>
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
          <div className="map_container">
            <KakaoMap
              latitude={job.latitude}
              longitude={job.longitude}
              workPlaceName={job.work_place_name}
            />
          </div>
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
        <h3>기업 정보</h3>
        {companyInfo ? (
          <>
            <p><strong>담당자 전화번호</strong>: {formatPhoneNumber(companyInfo.manager_phone)}</p>
            <p><strong>이메일</strong>: {companyInfo.manager_email || '정보 없음'}</p>
            <p><strong>기업 소개</strong>: {companyInfo.company_intro || '정보 없음'}</p>
          </>
        ) : (
          <p>기업 정보를 불러오는 중...</p>
        )}
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
