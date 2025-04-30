import './JobBookmark.scss';
import { HiArrowCircleLeft, HiArrowCircleRight } from 'react-icons/hi';
import { useEffect, useState } from 'react';
import { userInfoPropTypes } from '@/utils/UserMyPagePropTypes.js';
import axiosInstance from '@/apis/axiosInstance.js';
import JobBookmarkCard from './JobBookmarkCard';

function JobBookmark({ userInfo }) {
  //const [favorites, setFavorites] = useState([]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [recommendJobs, setRecommendJobs] = useState([]);

  const handlerPrev = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const visibleCount = 3;
  const maxIndex = recommendJobs.length - visibleCount;
  const handlerNext = () => {
    if (currentIndex < maxIndex) setCurrentIndex(currentIndex + 1);
  };

  useEffect(() => {
    const fetchRecommendJobs = async () => {
      try {
        const response = await axiosInstance.get('/posting/');

        const allJobs = response.data.items;
        console.log(allJobs);
        setRecommendJobs(allJobs);
      } catch (err) {
        console.log('🔥 axios 요청 에러 발생:', err);
        console.log(err);
      }
    };

    fetchRecommendJobs();
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
        {recommendJobs.length > 0 ? (
          <div
            className="reco_slider-wrapper"
            style={{ transform: `translateX(-${currentIndex * 317}px)` }}
          >
            {recommendJobs?.map((job) => (
              <JobBookmarkCard key={job.id} job={job} />
            ))}
          </div>
        ) : (
          <div className="reco_slider-wrapper">
            <div className="no_jobs">즐겨 찾기한 공고가 없습니다 🙏</div>
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
