import React from 'react';
import './ApplyJobPosting.scss';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { jobPropsType } from '@/utils/UserMyPagePropTypes';
import axiosInstance from '@/apis/axiosInstance';

const MyApplyJobCard = ({ job, userInfo }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/job-detail/${job.id}`, { state: { job } });
  };

  console.log('✨', userInfo);
  const getDDay = (endDate) => {
    const today = new Date();
    const end = new Date(endDate);

    // 시간 차이 계산 (ms → 일 단위로 변환)
    const diffTime = end.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays > 0) return `D-${diffDays}`;
    if (diffDays === 0) return `D-day`;
    return `마감`;
  };

  const ApplyDelete = (e) => {
    e.stopPropagation();

    const applicationsId = userInfo?.applications?.[0]?.id;

    console.log(applicationsId);
    if (!applicationsId) {
      console.warn('지원이력 ID가 없습니다');
      return;
    }
    const fetchApplyCancel = async () => {
      try {
        const response = await axiosInstance.delete(`/applications/${applicationsId}`);

        console.log(response);
      } catch (err) {
        console.log(err);
      }
    };
    fetchApplyCancel();
  };

  return (
    <div className="apply_job_list_container">
      <div className="apply_job_card">
        <div className="company_card" onClick={handleCardClick}>
          <div className="job_left">
            <div className="company_info">
              <p className="company_name">{job.work_place_name}</p>
              <p className="job_title">{job.title}</p>
              <p className="job_description">{job.other_conditions}</p>
              <p className="company_address">{job.work_address}</p>
              <p className="job_deadlin">{`${job.recruit_period_end?.split('T')[0]} 마감`}</p>
            </div>
          </div>
          <div className="job_right">
            <button type="button" className="cancel_btn" onClick={ApplyDelete}>
              지원 취소하기
            </button>
          </div>
        </div>
        <div className="job_footer">
          <div>{`지원 일자 : ${job.recruit_period_start?.split('T')[0]}`}</div>
          <div>{getDDay(job.recruit_period_end)}</div>
        </div>
      </div>
    </div>
  );
};

MyApplyJobCard.propTypes = {
  job: jobPropsType.isRequired,
  userInfo: PropTypes.object.isRequired,
};

export default MyApplyJobCard;
