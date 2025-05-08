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
  const [jobPostingLoading, setJobPostingLoading] = useState(true)
  const [jobPostingError, setJobPostingError] = useState(null)
  const navigate = useNavigate();
  
  // 기업 마이 페이지 조회
  useEffect(()=>{
    try {
      companyMe().then(res => {
        setJobPosting(res)
        setJobPostingLoading(false)
    })
    } catch (error) {
      console.log('기업 마이 페이지 조회 에러', error)
      setJobPostingError(true)
      setJobPostingLoading(false)
    }
  },[])

  return (
    <div className="companyMyPage_main">
      <div className="companyMyPage_cantainer">
        <h1 className="h1_title">{jobPosting?.company_name}</h1>
        <div className="div_info">
          {jobPosting && <InfoBox type='company' data={jobPosting} />}
          <button 
          className="button_add"
          onClick={() => navigate("/mypage/company/announcement/add")}>공고 작성하기</button>
        </div>
        
        <Hr />

        <h2>나의 공고</h2>
        {jobPostingLoading ? <div className="div_noting">로딩 중...</div>
        : jobPosting?.job_postings.length ? jobPosting?.job_postings?.map(item => 
          <AnnouncementCard {...item} key={item.id} />)
          : <div className="div_noting">등록된 공고가 없습니다</div>}
      </div>
    </div>
  );
}