import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaRegCopy, FaBookmark, FaRegBookmark } from 'react-icons/fa';
import './JobDetail.scss';
import Ai from '@/pages/RecruitmentInfo/Ai/Ai';
import JobApplyModal from '@/components/Company/Modal/JobApplyModal';
import LoginPromptModal from '@/components/Company/Modal/LoginPromptModal';
import { getJobDetail, applyJobPosting } from '@/apis/RecruitmentApi';
import KakaoMap from '@/components/KakaoMap/KakaoMap';
import { CompaniesInfo } from '@/apis/companyApi';
import { formatPhoneNumber } from '@/utils/format';
import { addFavorite, deleteFavorite } from '@/apis/favoriteApi';
import CalculatorModal from './SalaryCalculator/CalculatorModal';
import { useResume } from '@/hooks/useResume';

const JobDetail = () => {
  const { postingId } = useParams();
  const [job, setJob] = useState(null);
  const [companyInfo, setCompanyInfo] = useState(null);
  const navigate = useNavigate();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoginPromptOpen, setLoginPromptOpen] = useState(false);
  const [isCalcOpen, setIsCalcOpen] = useState(false);
  const Token = localStorage.getItem('access_token');
  const formData = Token && localStorage.getItem('userType') !== 'company' ? useResume().formData : null;
  const userType = localStorage.getItem('userType');

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const data = await getJobDetail(postingId);
        setJob(data);
        setIsBookmarked(data.is_favorited || false);
        const companyData = await CompaniesInfo(data.company_id);
        setCompanyInfo(companyData);
      } catch (error) {
        if (error.response) {
          console.error('채용공고 불러오기 실패:', error);
        }
      }
    };

    fetchJob();
    window.scrollTo(0, 0);
  }, [postingId]);

  if (!job) return <div>로딩 중...</div>;

  const handleBookmarkClick = async (e) => {
    e.stopPropagation();
    if (!Token) {
      setLoginPromptOpen(true);
      return;
    }
    try {
      if (isBookmarked) {
        await deleteFavorite(job.id);
      } else {
        await addFavorite(job.id);
      }
      setIsBookmarked((prev) => !prev);
    } catch (error) {
      console.error('즐겨찾기 처리 실패:', error);
      alert('즐겨찾기 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  const convertToAMPM = (timeStr) => {
    if (!timeStr) return '';
    const [hour, minute] = timeStr.split(':').map(Number);
    const period = hour < 12 ? '오전' : '오후';
    const hour12 = hour % 12 === 0 ? 12 : hour % 12;
    return `${period} ${hour12}:${minute.toString().padStart(2, '0')}`;
  };

  return (
    <div className="jobdetail_container">
      <section className="section01">
        <div className="header_01">
          <div className="address">{job.work_address}</div>
          <div
            className="company"
            style={{ cursor: 'pointer' }}
            onClick={() => navigate(`/company-info/${job.company_id}`)}
          >
            {job.work_place_name}
          </div>
        </div>
        <div className="title-ai-wrapper">
          <h2 className="title">{job.title}</h2>
          <div className="job-tag">{job.job_category}</div>
          <Ai job={job} />
        </div>
        <div className="tags">
          <span>{job.payment_method}</span>
          <span>
            {job.is_work_days_negotiable
              ? '협의 가능'
              : `주${job.work_days?.split(',').length || 0}일`}
          </span>
          <span>{job.is_work_duration_negotiable ? '협의 가능' : job.work_duration}</span>
          {job.benefits && <span>{job.benefits}</span>}
        </div>
      </section>

      <section className="section02">
        <h3>근무조건</h3>
        <div className="conditions_02">
          <div className="condition_salary_content">
            <div className="content_left">
              <div className="condition_label_02">급여</div>
              <button className="salary_calc_button" onClick={() => setIsCalcOpen(true)}>
                급여계산기
              </button>
            </div>
            <div className="condition_value_02 salary_with_button">
              <div className="salary_display">
                <span
                  className={`payment_method_badge ${
                    job.payment_method === '시급'
                      ? 'payment-hourly'
                      : job.payment_method === '일급'
                        ? 'payment-daily'
                        : job.payment_method === '주급'
                          ? 'payment-weekly'
                          : job.payment_method === '월급'
                            ? 'payment-monthly'
                            : job.payment_method === '연봉'
                              ? 'payment-yearly'
                              : 'payment-default'
                  }`}
                >
                  {job.payment_method}
                </span>
                <div className="salary_content">
                  <span className="salary">{job.salary.toLocaleString()}원</span>
                  <span className="salary_note">
                    2025년 최저시급 <strong>10,030원</strong>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="condition_row_02">
            <div className="condition_label_02">근무 기간</div>
            <div className="condition_value_02">{job.work_duration}</div>
          </div>
          <div className="condition_row_02">
            <div className="condition_label_02">근무 요일</div>
            <div className="condition_value_02">
              {job.is_work_days_negotiable ? (
                '협의 가능'
              ) : job.is_schedule_based ? (
                '일정에 따름'
              ) : (
                <>
                  <span className="day_count">주{job.work_days?.split(',').length}일</span>
                  <span className="day_list">({job.work_days?.split(',').join(', ')})</span>
                </>
              )}
            </div>
          </div>
          <div className="condition_row_02">
            <div className="condition_label_02">근무 시간</div>
            <div className="condition_value_02">
              {job.is_work_time_negotiable
                ? '협의 가능'
                : `${convertToAMPM(job.work_start_time)} ~ ${convertToAMPM(job.work_end_time)}`}
            </div>
          </div>
          <div className="condition_row_02">
            <div className="condition_label_02">업직종</div>
            <div className="condition_value_02">{job.job_category}</div>
          </div>
          <div className="condition_row_02">
            <div className="condition_label_02">고용 형태</div>
            <div className="condition_value_02">{job.employment_type}</div>
          </div>
          <div className="condition_row_02">
            <div className="condition_label_02">복리후생</div>
            <div className="condition_value_02">{job.benefits}</div>
          </div>
        </div>
      </section>

      <section className="section03">
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

      <section className="section04">
        <h3>근무지 정보</h3>
        <div
          className="address_row"
          style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}
        >
          <div>
            <strong>근무지명</strong> {job.work_place_name}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <strong>근무지 주소</strong>
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

      <section className="section05">
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

      <section className="section06">
        <h3>기업 정보</h3>
        {companyInfo ? (
          <>
            <p>
              <strong>담당자 전화번호</strong> {formatPhoneNumber(companyInfo.manager_phone)}
            </p>
            <p>
              <strong>이메일</strong>
              {companyInfo.manager_email || '정보 없음'}
            </p>
            <p>
              <strong>기업 소개</strong>
              <br />
              {companyInfo.company_intro || '정보 없음'}
            </p>
          </>
        ) : (
          <p>기업 정보를 불러오는 중...</p>
        )}
      </section>

      {userType !== 'company' && (
        <div className="action">
          <button
            className="button"
            onClick={() => {
              if (!Token) {
                setLoginPromptOpen(true);
                return;
              }

              // 토큰이 있는 경우에만 formData 체크
              if (Token && !formData?.resume_id) {
                alert('이력서가 없습니다. 이력서를 먼저 작성해주세요.');
                return;
              }
              setIsModalOpen(true);
            }}
          >
            지원하기
          </button>
          <div className="bookmark">
            {isBookmarked ? (
              <FaBookmark className="bookmark_filled" onClick={handleBookmarkClick} />
            ) : (
              <FaRegBookmark className="bookmark_icon" onClick={handleBookmarkClick} />
            )}
          </div>
        </div>
      )}
      {isModalOpen && (
        <JobApplyModal
          onClose={() => setIsModalOpen(false)}
          onApply={async () => {
            try {
              await applyJobPosting(job.id);
              setIsModalOpen(false);
              alert('지원이 완료되었습니다!');
            } catch (error) {
              console.error('지원 실패:', error);
              if (error.response?.data?.detail === '이미 지원한 공고입니다.') {
                alert('이미 지원한 공고입니다.');
              } else {
                alert('지원 중 오류가 발생했습니다. 다시 시도해주세요.');
              }
            }
          }}
          onEditResume={() => navigate('/mypage/user/resumes')}
        />
      )}
      {isLoginPromptOpen && (
        <LoginPromptModal onClose={() => setLoginPromptOpen(false)} navigate={navigate} />
      )}
      {isCalcOpen && (
        <CalculatorModal key={job.id} job={job} onClose={() => setIsCalcOpen(false)} />
      )}
    </div>
  );
};

export default JobDetail;
