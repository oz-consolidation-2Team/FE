import React, { useState } from 'react';
import './MainPage.scss';
import Header from '../../components/Header';
import { FaRegStar, FaStar } from 'react-icons/fa';
import { FiSearch } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const JobCard = () => {
  const [isBookmarked, setIsBookmarked] = useState(false);

  const toggleBookmark = () => {
    setIsBookmarked((prev) => !prev);
  };

  return (
    <div className="job_card">
      <div className="job_top">
        <span className="company">넥스트로컬뉴스</span>
        <h3 className="title">디자인 기깔나게 잘 뽑는 디자이너 구함</h3>
        <span className="date">2025.04.25</span>
      </div>
      <div className="job_bottom">
        {isBookmarked ? (
          <FaStar className="star_icon filled" onClick={toggleBookmark} />
        ) : (
          <FaRegStar className="star_icon" onClick={toggleBookmark} />
        )}
        <span className="location">서울 중구</span>
      </div>
    </div>
  );
};

const MainPage = () => {
  const [keyword, setKeyword] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (keyword.trim()) {
      console.log('검색어:', keyword);
      // navigate(`/search?query=${keyword}`);
    }
  };

  return (
Feature/Header
    <div className="main_page">
      <Header />

      <section className="hero_section">
        <div className="hero_inner">
          <h1>시니어 세대가 다시 빛나는 순간!</h1>
          <p>
            <strong>경험</strong>과 <strong>가치</strong>를 이어가는 새로운 일자리 매칭!<br />
            <span className="highlight">
              <span className="underline-highlight">일자리</span>, 커뮤니티, <span className="underline-highlight">성장의 기회</span>
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
          {Array(4).fill(0).map((_, i) => (
            <JobCard key={i} />
          ))}
        </div>
      </section>

      <section className="section_area recent">
        <h2>최근에 등록된 공고</h2>
        <div className="job_grid">
          {Array(4).fill(0).map((_, i) => (
            <JobCard key={i} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default MainPage;
