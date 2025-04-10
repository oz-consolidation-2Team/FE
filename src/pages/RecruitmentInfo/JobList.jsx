import React from 'react';
import './JobList.scss'; // CSS 파일을 import합니다.

// 더미 데이터
export const dummyData = [
    {
      id: 1,
      company_name: '넥스트러너스',
      title: '저같은 교육자 뽑아요',
      work_address: '서울 강북구',
      other_conditions: '60대 이상 가능, 상주 인력 환영',
      deadline_at: '2025-06-25',
      category: '교육',
    },
    {
      id: 2,
      company_name: 'ABC Tech',
      title: '프론트엔드 개발자 채용',
      work_address: '서울 강남구',
      other_conditions: '경력 3년 이상',
      deadline_at: '2025-05-01',
      category: 'IT',
    },
    {
      id: 3,
      company_name: '부산 IT',
      title: '백엔드 개발자 채용',
      work_address: '부산 해운대구',
      other_conditions: 'Node.js 가능자 우대',
      deadline_at: '2025-06-30',
      category: 'IT',
    },
    {
      id: 4,
      company_name: '인천 스타트업',
      title: '디자이너 채용',
      work_address: '인천 부평구',
      other_conditions: '포토샵 가능자',
      deadline_at: '2025-07-15',
      category: '디자인',
    },
    {
      id: 5,
      company_name: '광주 스마트공장',
      title: '기계 설계',
      work_address: '광주 광산구',
      other_conditions: '기계 CAD 가능자',
      deadline_at: '2025-08-01',
      category: '제조업',
    },
    {
      id: 6,
      company_name: '제주리조트',
      title: '프론트 직원 채용',
      work_address: '제주 서귀포시',
      other_conditions: '호텔 경험자 우대',
      deadline_at: '2025-09-10',
      category: '서비스업',
    },
    {
      id: 7,
      company_name: '서울 헬스케어',
      title: '간호사 모집',
      work_address: '서울 송파구',
      other_conditions: '자격증 소지자',
      deadline_at: '2025-09-30',
      category: '의료',
    },
    {
      id: 8,
      company_name: '서울문화센터',
      title: '문화 기획자',
      work_address: '서울 종로구',
      other_conditions: '문화 행사 기획 경험',
      deadline_at: '2025-10-05',
      category: '기획',
    },
    {
      id: 9,
      company_name: '부산 물류센터',
      title: '물류 관리자',
      work_address: '부산 사하구',
      other_conditions: '지게차 가능자 우대',
      deadline_at: '2025-08-20',
      category: '물류',
    },
    {
      id: 10,
      company_name: '부산 스타트업',
      title: '프론트엔드 개발자',
      work_address: '부산 금정구',
      other_conditions: 'React 가능자',
      deadline_at: '2025-07-25',
      category: 'IT·인터넷',
    },
    {
      id: 11,
      company_name: '인천 물류회사',
      title: '배송 기사',
      work_address: '인천 연수구',
      other_conditions: '운전면허 필수',
      deadline_at: '2025-09-01',
      category: '운송',
    },
    {
      id: 12,
      company_name: '인천 문화센터',
      title: '이벤트 운영',
      work_address: '인천 중구',
      other_conditions: '행사 진행 경험자',
      deadline_at: '2025-10-01',
      category: '기획',
    },
    {
      id: 13,
      company_name: '광주 테크',
      title: '제품 디자이너',
      work_address: '광주 서구',
      other_conditions: 'UX/UI 디자인 경험자',
      deadline_at: '2025-08-15',
      category: '디자인',
    },
    {
      id: 14,
      company_name: '광주 교육기관',
      title: '보조 강사',
      work_address: '광주 남구',
      other_conditions: '교육 경력자 우대',
      deadline_at: '2025-09-05',
      category: '교육',
    },
    {
      id: 15,
      company_name: '제주 자연농장',
      title: '농장 관리직',
      work_address: '제주 제주시',
      other_conditions: '농업 경험자 우대',
      deadline_at: '2025-07-20',
      category: '농업',
    },
    {
      id: 16,
      company_name: '제주 스타트업',
      title: '웹디자이너',
      work_address: '제주 제주시',
      other_conditions: 'Photoshop, Figma 사용 가능자',
      deadline_at: '2025-08-28',
      category: '디자인',
    },
    // 더미 데이터 추가...
  ];

const JobList = ({ jobs = [] }) => {
  

  // API가 준비될 때까지 더미 데이터 사용
  const data = jobs.length ? jobs : dummyData;

  return (
        <div className="job-list">
        {data.map((job) => (
            <div className="job-card" key={job.id}>
                <div className="job-header">
                    <div className="company">{job.work_address}</div>
                    <button className="bookmark-button">북마크</button>
                </div>
                <div className="job-title">{job.title}</div>
                <div className="job-description">{job.other_conditions}</div>
                <div className="job-footer">{new Date(job.deadline_at).toLocaleDateString()} 마감.</div>
            </div>
        ))}
        </div>
  );
};

export default JobList;