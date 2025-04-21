import React, { useState } from 'react';
import '../UserMyPage/JobRecommend/JobRecommend.scss';
import MyJobCard from './MyJobCard';
import { jobPropsType } from '@/utils/UserMyPagePropTypes';
import PropTypes from 'prop-types';

// 더미 데이터
export const dummyData = [
  {
    id: 1,
    work_place_name: '넥스트러너스',
    title: '저같은 교육자 뽑아요',
    work_address: '서울 강북구',
    other_conditions: '60대 이상 가능, 상주 인력 환영',
    deadline_at: '2025-06-25',
    job_category: '교육',
    salary: 10000,
    payment_method: '월급',
    description: '상세 내용이 여기에 들어갑니다.',
    recruit_period_start: '2025-01-01',
    recruit_period_end: '2025-12-31',
    education: '학력무관',
    recruit_number: 1,
    preferred_conditions: '운전면허 소지자,경력자 우대',
    employment_type: '정규직',
    benefits: '병가, 유급 휴가, 가족상 휴가',
    career: '경력',
    work_duration: '1년 이상',
    work_days: '월-금',
    created_at: '2025-04-05T10:00:00Z',
    updated_at: '2025-04-05T10:00:00Z',
    is_always_recruiting: false,
    company_users_id: 1,
    company_id: 1,
  },
  {
    id: 2,
    work_place_name: 'ABC Tech',
    title: '프론트엔드 개발자 채용',
    work_address: '서울 강남구',
    other_conditions: '경력 3년 이상',
    deadline_at: '2025-05-01',
    job_category: 'IT',
    salary: 10000,
    payment_method: '월급',
    description: '상세 내용이 여기에 들어갑니다.',
    recruit_period_start: '',
    recruit_period_end: '',
    education: '학력무관',
    recruit_number: 1,
    preferred_conditions: '경력자 우대',
    employment_type: '정규직',
    benefits: '병가, 유급 휴가, 가족상 휴가',
    career: '경력',
    work_duration: '1년 이상',
    work_days: '월-금',
    created_at: '2025-04-05T10:00:00Z',
    updated_at: '2025-04-05T10:00:00Z',
    is_always_recruiting: true,
    company_users_id: 1,
    company_id: 1,
  },
  // 더미 데이터 추가...
];

const JobList = ({ jobs = [] }) => {
  const [isBookmarked, setIsBookmarked] = useState({});

  const toggleBookmark = (id) => {
    setIsBookmarked((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // API가 준비될 때까지 더미 데이터 사용
  const data = jobs.length ? jobs : dummyData;

  return (
    <div className="job-list">
      {data.map((job) => (
        <MyJobCard
          key={job.id}
          job={job}
          isBookmarked={isBookmarked[job.id]}
          toggleBookmark={toggleBookmark}
        />
      ))}
    </div>
  );
};

JobList.propTypes = {
  jobs: PropTypes.arrayOf(jobPropsType),
};
export default JobList;
