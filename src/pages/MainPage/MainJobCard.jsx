import { useState } from 'react';
import { FaRegStar, FaStar } from 'react-icons/fa';
import './MainPage.scss';

const MainJobCard = () => {
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

export default MainJobCard;
