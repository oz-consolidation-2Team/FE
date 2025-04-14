import BookMarkJobCard from '@/pages/UserMyPage/BookmarkJobCard';
import './InterestAnnouncement.scss';
import { HiArrowCircleLeft, HiArrowCircleRight } from 'react-icons/hi';
import { useState } from 'react';
import { Bookmark } from './BookmarkDummy';

function InterestAnnouncement({ userInfo }) {
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
    <section className="interest_announcement">
      <h3 className="interest_announcement_title">{userInfo.name}님 관심있을 만한 공고</h3>
      <div className="interest_announcement_btn_group">
        <HiArrowCircleLeft className="interest_left_btn" onClick={handlerPrev} />
        <HiArrowCircleRight className="interest_right_btn" onClick={handlerNext} />
      </div>
      <div className="interest_slider-container">
        <div
          className="interest_slider-wrapper"
          style={{ transform: `translateX(-${currentIndex * 317}px)` }}
        >
          {job.map((job) => (
            <BookMarkJobCard key={job.id} job={job} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default InterestAnnouncement;
