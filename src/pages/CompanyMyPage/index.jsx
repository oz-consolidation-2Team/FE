import InfoBox from "@/components/Company/InfoBox"
import AnnouncementCard from "@/components/Company/AnnouncementCard"
import { useNavigate } from 'react-router-dom';
import "./CompanyMyPage.scss"
import Hr from "@/utils/Hr";
import { useEffect, useState } from "react";
import axios from "axios";
import { companyMe } from "@/apis/companyPostingApi";
import { CompaniesInfo } from "@/apis/companyApi";


export default function CompanyMyPage() {
  const [jobPosting, setJobPosting] = useState(null)
  const [jobPostingLoading, setJobPostingLoading] = useState(false)
  const [jobPostingError, setJobPostingError] = useState(null)
  
  const [companyInfo, setCompanyInfo] = useState(null)
  const [companyInfoLoading, setCompanyInfoLoading] = useState(false)
  const [companyInfoError, setCompanyInfoError] = useState(null)
  const navigate = useNavigate();
  
  // 기업 마이 페이지 조회
  useEffect(()=>{
    try {
      companyMe().then(res => setJobPosting(res))
    } catch (error) {
      if (axios.isAxiosError(error)) setJobPostingError(error.response?.data?.message || '요청 실패')
      else setJobPostingError('알 수 없는 에러 발생')
    } finally {
      setJobPostingLoading(true)
    }
  },[])

  // 기업 정보 조회
  useEffect(()=>{
    try {
      CompaniesInfo(jobPosting.company_id).then(res => setCompanyInfo(res))
    } catch (error) {
      if (axios.isAxiosError(error)) setCompanyInfoError(error.response?.data?.message || '요청 실패')
      else setCompanyInfoError('알 수 없는 에러 발생')
    } finally {
      setCompanyInfoLoading(true)
    }
  },[jobPosting])

  return (
    <div className="companyMyPage_cantainer">
      <h1 className="h1_title">기업 이름</h1>
      <div className="div_info">
        {jobPosting && <InfoBox type='company' data={jobPosting} />}
        <button 
        className="button_add"
        onClick={() => navigate("/company_announcement_add_page")}>공고 작성하기</button>
      </div>
      
      <Hr />

      <h2>나의 공고</h2>
      {jobPosting && companyInfo && jobPosting?.job_postings?.map(item => 
        <AnnouncementCard {...item} key={item.id} />
      )}
    </div>
  );
}