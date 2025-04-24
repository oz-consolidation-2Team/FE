import BookmarkJobCard from '../BookMarkJobCard';
import './AgePopularity.scss';
import { HiArrowCircleLeft, HiArrowCircleRight } from 'react-icons/hi';
import { useState } from 'react';
import { Bookmark } from '../BookmarkDummy';
import { userInfoPropTypes } from '@/utils/UserMyPagePropTypes';

AgePopularity.propTypes = {
  userInfo: userInfoPropTypes.isRequired,
};

function AgePopularity({ userInfo }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlerPrev = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const visibleCount = 3;
  const maxIndex = Bookmark.length - visibleCount;
  const handlerNext = () => {
    if (currentIndex < maxIndex) setCurrentIndex(currentIndex + 1);
  };

  const job = Bookmark;

  return (
    <section className="age_popularity">
      <h3 className="age_popularity_title">{userInfo.name}님 연령대에서 인기 있는 공고</h3>
      <div className="age_popularity_btn_group">
        <HiArrowCircleLeft className="age_left_btn" onClick={handlerPrev} />
        <HiArrowCircleRight className="age_right_btn" onClick={handlerNext} />
      </div>
      <div className="age_slider-container">
        <div
          className="age_slider-wrapper"
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

export default AgePopularity;
