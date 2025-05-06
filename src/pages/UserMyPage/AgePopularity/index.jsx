import AgePopularityCard from './AgePopularityCard';
import './AgePopularity.scss';
import { HiArrowCircleLeft, HiArrowCircleRight } from 'react-icons/hi';
import { useEffect, useState } from 'react';
import { userInfoPropTypes } from '@/utils/UserMyPagePropTypes';
import axiosInstance from '@/apis/axiosInstance';
import { useFavoriteStore } from '@/store/useFavoriteStore';

AgePopularity.propTypes = {
  userInfo: userInfoPropTypes.isRequired,
};

function AgePopularity({ userInfo }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [popularJobs, setPopularJobs] = useState([]);
  const { favorites } = useFavoriteStore();

  const handlerPrev = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const visibleCount = 3;
  const maxIndex = popularJobs.length - visibleCount;
  const handlerNext = () => {
    if (currentIndex < maxIndex) setCurrentIndex(currentIndex + 1);
  };

  const fetchPopularJobs = async () => {
    try {
      const response = await axiosInstance.get('/posting/popular-by-my-age', {
        params: { limit: 10 },
      });

      const popularData = response.data.items;

      const mergedData = popularData.map((job) => {
        const jobId = job.job_posting_id || job.id || job.job_id;
        const isFavorite = favorites.some((f) => (f.job_posting_id || f.id || f.job_id) === jobId);
        return { ...job, is_favorited: isFavorite };
      });

      console.log('연령대별 공고', popularData);
      setPopularJobs(mergedData); // items 배열만 저장해야 함!
    } catch (err) {
      console.error('나이별 인기 공고 불러오기 실패', err);
    }
  };

  useEffect(() => {
    fetchPopularJobs();
  }, []);

  return (
    <section className="age_popularity">
      <h3 className="age_popularity_title">{userInfo.name}님 연령대에서 인기 있는 공고</h3>
      <div className="age_popularity_btn_group">
        <HiArrowCircleLeft
          className={`age_left_btn ${currentIndex === 0 ? 'disabled' : ''}`}
          onClick={handlerPrev}
        />
        <HiArrowCircleRight
          className={`age_right_btn ${currentIndex >= maxIndex ? 'disabled' : ''}`}
          onClick={handlerNext}
        />
      </div>
      <div className="age_slider-container">
        <div
          className="age_slider-wrapper"
          style={{ transform: `translateX(-${currentIndex * 317}px)` }}
        >
          {popularJobs.length > 0 ? (
            popularJobs.map((job) => (
              <AgePopularityCard key={job.id} job={job} onBookmarkChange={fetchPopularJobs} />
            ))
          ) : (
            <div className="no_jobs">아직 추천할 공고가 없습니다</div>
          )}
        </div>
      </div>
    </section>
  );
}

export default AgePopularity;
