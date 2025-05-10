import CareerSection from './CareerSection';
import EducationSection from './EducationSection';
import IntroSection from './IntroSection';
import RegionSection from './RegionSection';
import UserInfoSection from './UserInfoSection';

import './CompanyReviewResumes.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { resumeInquiryPosting } from '@/apis/companyApi';

function CompanyReviewResumes() {
  const [formData, setFormData] = useState()
  const params = useParams("id")
  const navigate = useNavigate();

  useEffect(()=>{
    try {
        resumeInquiryPosting().then(res => {
            const respone = res.filter((item) => item.id === Number(params.id))
            setFormData(respone[0].resumes_data)
        })
    } catch (error) {
        console.log('이력서 조회 에러', error)
    }
  },[])

  if (!formData) return
  const userName = formData.applicant_name;

  return (
    <div className="resumes_wrapper">
      <div className="resumes_container">
        <h2 className="resumes_title">{`${userName} 님의 이력서`}</h2>
        <UserInfoSection data={formData} />
        <EducationSection data={formData} />
        <CareerSection data={formData} />
        <RegionSection data={formData} />
        <IntroSection data={formData} />
        <button type="button" className="resumes_submit" onClick={()=>navigate(-1)}>
          닫기
        </button>
      </div>
    </div>
  );
}

export default CompanyReviewResumes;
