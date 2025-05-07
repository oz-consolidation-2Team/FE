import './JobBookmark.scss';
import { HiArrowCircleLeft, HiArrowCircleRight } from 'react-icons/hi';
import { useEffect, useState } from 'react';
import { userInfoPropTypes } from '@/utils/UserMyPagePropTypes.js';

import JobBookmarkCard from './JobBookmarkCard';
import { useFavoriteStore } from '@/store/useFavoriteStore';

function JobBookmark({ userInfo }) {
  const { favorites, fetchFavorites } = useFavoriteStore();
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlerPrev = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const visibleCount = 3;
  const maxIndex = favorites.length - visibleCount;
  const handlerNext = () => {
    if (currentIndex < maxIndex) setCurrentIndex(currentIndex + 1);
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  return (
    <section className="job_recommend">
      <h3 className="job_recommend_title">{userInfo.name}님이 즐겨찾기한 공고</h3>
      <div className="job_recommend_btn_group">
        <HiArrowCircleLeft
          className={`reco_left_btn ${currentIndex === 0 ? 'disabled' : ''}`}
          onClick={handlerPrev}
        />
        <HiArrowCircleRight
          className={`reco_right_btn ${currentIndex >= maxIndex ? 'disabled' : ''}`}
          onClick={handlerNext}
        />
      </div>
      <div className="reco_slider-container">
        {favorites.length > 0 ? (
          <div
            className="reco_slider-wrapper"
            style={{ transform: `translateX(-${currentIndex * 317}px)` }}
          >
            {favorites?.map((job) => (
              <JobBookmarkCard key={job.job_posting_id} job={job} />
            ))}
          </div>
        ) : (
          <div className="reco_slider-wrapper">
            <div className="no_jobs">즐겨 찾기한 공고가 없습니다</div>
          </div>
        )}
      </div>
    </section>
  );
}

export default JobBookmark;
JobBookmark.propTypes = {
  userInfo: userInfoPropTypes.isRequired,
};
