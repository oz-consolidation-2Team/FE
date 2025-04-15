import BookmarkJobCard from './BookMarkJobCard.jsx';
import './JobRecommend.scss';
import { HiArrowCircleLeft, HiArrowCircleRight } from 'react-icons/hi';
import { useState } from 'react';
import { Bookmark } from './BookmarkDummy';

function JobRecommend({ userInfo }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlerPrev = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const visibleCount = 3;
  const maxIndex = Bookmark.length - visibleCount;
  console.log(Bookmark.length);
  const handlerNext = () => {
    if (currentIndex < maxIndex) setCurrentIndex(currentIndex + 1);
  };

  const job = Bookmark;

  return (
    <section className="job_recommend">
      <h3 className="job_recommend_title">{userInfo.name}님이 즐겨찾기한 공고</h3>
      <div className="job_recommend_btn_group">
        <HiArrowCircleLeft className="reco_left_btn" onClick={handlerPrev} />
        <HiArrowCircleRight className="reco_right_btn" onClick={handlerNext} />
      </div>
      <div className="reco_slider-container">
        <div
          className="reco_slider-wrapper"
          style={{ transform: `translateX(-${currentIndex * 317}px)` }}
        >
          {job.map((job) => (
            <BookmarkJobCard key={job.id} job={job} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default JobRecommend;
