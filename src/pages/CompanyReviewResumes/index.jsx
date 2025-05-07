import CareerSection from './CareerSection';
import EducationSection from './EducationSection';
import IntroSection from './IntroSection';
import RegionSection from './RegionSection';
import UserInfoSection from './UserInfoSection';

import './CompanyReviewResumes.scss';

import { useResume } from '@/hooks/useResume';

function CompanyReviewResumes() {
  //initialFormData 유저 정보 및 이력서 정보
  const { formData, setFormData, isLoading, isError } = useResume();

  if (isLoading) {
    return (
      <div className="skeleton_wrapper">
        <div className="skeleton_title" />
        <div className="skeleton_input" />
        <div className="skeleton_input" />
        <div className="skeleton_input" />
        <div className="skeleton_button" />
      </div>
    );
  }
  if (isError) {
    return <p className="error_text">이력서를 불러오는 데 실패했어요 😢</p>;
  }

  const userName = formData.user_id.data.name;

  return (
    <div className="resumes_wrapper">
      <div className="resumes_container">
        <h2 className="resumes_title">{`${userName} 님의 이력서`}</h2>
        <UserInfoSection data={formData} />
        <EducationSection data={formData} />
        <CareerSection data={formData} setData={setFormData} />
        <RegionSection data={formData} setData={setFormData} />
        <IntroSection data={formData} setData={setFormData} />
        <button type="button" className="resumes_submit">
          닫기
        </button>
      </div>
    </div>
  );
}

export default CompanyReviewResumes;
