import React, { useState } from 'react';
import './ApplyJobPosting.scss';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { jobPropsType } from '@/utils/UserMyPagePropTypes';
import axiosInstance from '@/apis/axiosInstance';
import Modal from '@/components/Modal';

const MyApplyJobCard = ({ appliedJobs, job, onUpdate }) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalInfo, setModalInfo] = useState({
    title: '',
    description: '',
    buttons: [],
  });

  const jobPostingId = job.id;

  console.log('📌jobPostingId', jobPostingId);
  const openModal = (info) => {
    setModalInfo(info);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleCardClick = () => {
    navigate(`/job-detail/${jobPostingId}`);
  };

  const ApplyDelete = () => {
    const applicationsId = appliedJobs.find((app) => app.job_posting_id === job.id).id;

    if (!applicationsId) {
      console.warn('지원이력 ID가 없습니다');
      return;
    }

    const fetchApplyCancel = async () => {
      try {
        await axiosInstance.delete(`/applications/${applicationsId}`);
      } catch (err) {
        console.log(err);
      }
    };
    fetchApplyCancel();
  };

  const handleApplyCancel = (e) => {
    e.stopPropagation();

    openModal({
      title: '지원 취소',
      description: '지원이 취소하시겠습니까?',
      buttons: [
        {
          label: '네',
          className: 'modal_btn_green',
          onClick: () => {
            ApplyDelete();
            closeModal();
            CheckModal();
          },
        },

        {
          label: '아니오',
          className: 'modal_btn_orange',
          onClick: () => {
            closeModal();
            navigate('/mypage/user');
          },
        },
      ],
    });
  };

  const CheckModal = () => {
    openModal({
      title: '지원 취소 완료',
      description: '지원이 취소 되었습니다.',
      buttons: [
        {
          label: '확인',
          className: 'modal_btn_green',
          onClick: () => {
            closeModal();
            if (onUpdate) {
              onUpdate();
            }
          },
        },
      ],
    });
  };

  return (
    <>
      <div className="apply_job_list_container">
        <div className="apply_job_card" onClick={handleCardClick}>
          <div className="company_card">
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
              <button type="button" className="cancel_btn" onClick={handleApplyCancel}>
                지원 취소하기
              </button>
            </div>
          </div>
          <div className="job_footer">
            <div>{`지원 일자 : ${job.recruit_period_start?.split('T')[0]}`}</div>
          </div>
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={modalInfo.title}
        description={modalInfo.description}
        buttons={modalInfo.buttons}
      />
    </>
  );
};

MyApplyJobCard.propTypes = {
  job: jobPropsType.isRequired,

  onUpdate: PropTypes.func,
  appliedJobs: PropTypes.arrayOf(jobPropsType),
};

export default MyApplyJobCard;
