import './InterestAnnouncement.scss';
import { HiArrowCircleLeft, HiArrowCircleRight } from 'react-icons/hi';
import { useEffect, useState } from 'react';
import { userInfoPropTypes } from '@/utils/UserMyPagePropTypes.js';
import axiosInstance from '@/apis/axiosInstance.js';
import InterestJobCard from './InterestJobCard';

InterestAnnouncement.propTypes = {
  userInfo: userInfoPropTypes.isRequired,
};

function InterestAnnouncement({ userInfo }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [interestJobs, setInterestJobs] = useState([]);
  const handlerPrev = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const visibleCount = 3;
  const maxIndex = interestJobs.length - visibleCount;
  const handlerNext = () => {
    if (currentIndex < maxIndex) setCurrentIndex(currentIndex + 1);
  };

  const fetchInterestJobs = async () => {
    try {
      const response = await axiosInstance.get('/user/recommend');

      const recommendRes = response.data.data;
      console.log('관심 있을만한', recommendRes);

      setInterestJobs(recommendRes);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchInterestJobs();
  }, []);

  return (
    <section className="interest_announcement">
      <h3 className="interest_announcement_title">{userInfo.name}님 관심있을 만한 공고</h3>
      <div className="interest_announcement_btn_group">
        <HiArrowCircleLeft
          className={`interest_left_btn ${currentIndex === 0 ? 'disabled' : ''}`}
          onClick={handlerPrev}
        />
        <HiArrowCircleRight
          className={`interest_right_btn ${currentIndex >= maxIndex ? 'disabled' : ''}`}
          onClick={handlerNext}
        />
      </div>
      <div className="interest_slider-container">
        {interestJobs.length > 0 ? (
          <div
            className="interest_slider-wrapper"
            style={{ transform: `translateX(-${currentIndex * 317}px)` }}
          >
            {interestJobs.map((job) => (
              <InterestJobCard key={job.job_id} job={job} onBookmarkChange={fetchInterestJobs} />
            ))}
          </div>
        ) : (
          <div className="interest_slider-wrapper">
            <div className="no_jobs">추천할 공고가 없습니다 🙏</div>
          </div>
        )}
      </div>
    </section>
  );
}

export default InterestAnnouncement;
