import BookMarkJobCard from '@/pages/UserMyPage/BookMarkJobCard';
import './JobRecommend.scss';
import { HiArrowCircleLeft, HiArrowCircleRight } from 'react-icons/hi';
import { useState } from 'react';

function JobRecommend({ userInfo }) {
  const { currentIndex, setCurrentIndex } = useState();

  const handlerPrev = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const handlerNext = () => {
    if (currentIndex < 2) setCurrentIndex(currentIndex + 1);
  };

  return (
    <section className="job_recommend">
      <h3 className="job_recommend_title">{userInfo.name}님이 즐겨찾기한 공고</h3>
      <div className=" slider-container">
        <HiArrowCircleLeft className="left_btn" onClick={handlerPrev} />
        <div className="slider-wrapper">
          <BookMarkJobCard />
        </div>
        <HiArrowCircleRight className="right_btn" onClick={handlerNext} />
      </div>
    </section>
  );
}

export default JobRecommend;
