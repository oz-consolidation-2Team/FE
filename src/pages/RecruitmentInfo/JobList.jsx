import React, { useState, useEffect } from 'react';
import './JobList.scss';
import JobCard from './JobCard'; 
import { getJobList } from '@/apis/RecruitmentApi';
import Pagination from "react-js-pagination";

const JobList = () => {
// 상태 변수: 북마크 상태를 저장하는 객체
const [isBookmarked, setIsBookmarked] = useState({});
// 상태 변수: 채용 공고 목록 상태
const [jobList, setJobList] = useState([]);
// 상태 변수: 현재 페이지 번호
const [currentPage, setCurrentPage] = useState(1);
// 상태 변수: 전체 채용공고 수
const [totalCount, setTotalCount] = useState(0);
// 상수: 페이지당 항목 수
const itemsPerPage = 10;

useEffect(() => {
  fetchJobs(currentPage);
}, [currentPage]);

/**
 * 비동기 채용공고 호출 함수
 * @param {number} pageNum - 호출할 페이지 번호 (기본값: 1)
 */
const fetchJobs = async (pageNum = 1) => {
  try {
    const res = await getJobList({ skip: (pageNum - 1) * itemsPerPage, limit: itemsPerPage });
    setJobList(res.items || []);
    setTotalCount(res.total || 0);
  } catch (error) {
    console.error('채용공고 불러오기 실패:', error);
  }
};

/**
 * 북마크 상태 토글 함수
 * @param {number|string} id - 채용공고의 고유 ID
 */
const toggleBookmark = (id) => {
  setIsBookmarked((prev) => ({
    ...prev,
    [id]: !prev[id]
  }));
};

  return (
        <div className="job_list">
          <h2 className="section_title">일반 채용 정보</h2>
          <div className="job_list_header">
            <div className="col_bookmark"></div>
            <div className="col_company">기업명 / 공고제목</div>
            <div className="col_location">근무지</div>
            <div className="col_time">근무시간</div>
            <div className="col_pay">급여</div>
            <div className="col_date">마감일</div>
          </div>
        {jobList.map((job) => (
          <JobCard
            key={job.id}
            job={job}
            isBookmarked={isBookmarked[job.id] !== undefined ? isBookmarked[job.id] : job.is_favorited}
            toggleBookmark={toggleBookmark}
          />
        ))}
        <Pagination
          activePage={currentPage}
          totalItemsCount={totalCount}
          itemsCountPerPage={itemsPerPage}
          pageRangeDisplayed={10}
          onChange={(page) => {
            setCurrentPage(page);
            fetchJobs(page);
            window.scrollTo({ top: 0});
          }}
          innerClass="pagination"
          activeClass="active"
          disabledClass="disabled"
        />
        </div>
  );
};

export default JobList;