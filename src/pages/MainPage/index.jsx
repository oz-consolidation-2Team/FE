import React, { useState, useEffect } from 'react';
import './MainPage.scss';
import { FaRegStar, FaStar } from 'react-icons/fa';
import { FiSearch } from 'react-icons/fi';
import { getPopularJobList} from '../../apis/RecruitmentApi';
import { useNavigate } from 'react-router-dom';
import MainJobCard from './MainJobCard';



const JobCard = ({ job }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);

  const toggleBookmark = () => {
    setIsBookmarked((prev) => !prev);
  };

  return (
    <div className="job_card">
      <div className="job_top">
        <span className="company">{job.work_place_name}</span>
        <h3 className="title">{job.title}</h3>
        <span className="date">{job.recruit_period_end}</span>
      </div>
      <div className="job_bottom">
        {isBookmarked ? (
          <FaStar className="star_icon filled" onClick={toggleBookmark} />
        ) : (
          <FaRegStar className="star_icon" onClick={toggleBookmark} />
        )}
        <span className="location">{job.work_address}</span>
      </div>
    </div>
  );
};

const MainPage = () => {
  const [keyword, setKeyword] = useState('');
  const [popularJobs, setPopularJobs] = useState([]);
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

    fetchPopularJobs();
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
          {Array(4)
            .fill(0)
            .map((_, i) => (
              <MainJobCard
                key={i}
                job={{
                  work_place_name: '더미 기업',
                  title: '더미 공고 제목',
                  recruit_period_end: '2025-12-31',
                  work_address: '서울시 강남구'
                }}
              />
            ))}
        </div>
      </section>
    </div>
  );
};

export default MainPage;
