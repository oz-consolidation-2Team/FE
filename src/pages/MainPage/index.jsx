import React, { useState, useEffect } from 'react';
import './MainPage.scss';
import { FaRegStar, FaStar } from 'react-icons/fa';
import { FiSearch } from 'react-icons/fi';
import { getPopularJobList, getJobList } from '../../apis/RecruitmentApi';
import { useNavigate } from 'react-router-dom';
import MainJobCard from './MainJobCard';



const MainPage = () => {
  const [keyword, setKeyword] = useState('');
  const [popularJobs, setPopularJobs] = useState([]);
  const [recentJobs, setRecentJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPopularJobs = async () => {
      try {
        const res = await getPopularJobList();
        setPopularJobs(res.items || []);
      } catch (error) {
        console.error('인기 공고 불러오기 실패', error);
      }
    };

    const fetchRecentJobs = async () => {
      try {
        const res = await getJobList({ skip: 0, limit: 4 });
        setRecentJobs(res.items || []);
      } catch (error) {
        console.error('최근 공고 불러오기 실패', error);
      }
    };

    fetchPopularJobs();
    fetchRecentJobs();
  }, []);

  const handleSearch = () => {
    if (keyword.trim()) {
      const params = new URLSearchParams({
        keyword: keyword.trim(),
        page: 1,
      });
      navigate(`/search-results?${params.toString()}`);
    }
  };

  return (
    <div className="main_page">
      <section className="hero_section">
        <div className="hero_inner">
          <h1>시니어 세대가 다시 빛나는 순간!</h1>
          <p>
            <strong>경험</strong>과 <strong>가치</strong>를 이어가는 새로운 일자리 매칭!
            <br />
            <span className="highlight">
              <span className="underline-highlight">일자리</span>, 커뮤니티,{' '}
              <span className="underline-highlight">성장의 기회</span>
            </span>
            <br />
            <span className="bottom-call">— 지금 바로 시작 하세요!</span>
          </p>

          <div className="search_box">
            <div className="search_input_wrap">
              <FiSearch className="search_icon" onClick={handleSearch} />
              <input
                type="text"
                placeholder="검색어를 입력해주세요."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section_area popular">
        <h2>인기 공고</h2>
        <div className="job_grid">
          {popularJobs.slice(0, 4).map((job) => (
            <MainJobCard key={job.id} job={job} />
          ))}
        </div>
      </section>

      <section className="section_area recent">
        <h2>최근에 등록된 공고</h2>
        <div className="job_grid">
          {recentJobs.map((job) => (
            <MainJobCard key={job.id} job={job} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default MainPage;
