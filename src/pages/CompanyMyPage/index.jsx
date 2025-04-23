import InfoBox from "../../components/Company/InfoBox"
import AnnouncementCard from "../../components/Company/AnnouncementCard"
import { useNavigate } from 'react-router-dom';
import "./CompanyMyPage.scss"
import Hr from "@/utils/Hr";
import { useEffect, useState } from "react";
import { listJobPosting } from "@/apis/companyPostingApi";


export default function CompanyMyPage() {
  const [data, setData] = useState()
  const navigate = useNavigate();
  
  useEffect(()=>{
    listJobPosting().then(res => setData(res))
  },[])
  
  return (
    <div className="companyMyPage_cantainer">
      <h1 className="h1_title">기업 이름</h1>
      <div className="div_info">
        <InfoBox type='company' />
        <button 
        className="button_add"
        onClick={() => navigate("/company_announcement_add_page")}>공고 작성하기</button>
      </div>
      
      <Hr />

      <h2>나의 공고</h2>
      {data?.job_postings.map(item => 
        <AnnouncementCard {...item} key={item.id} />
      )}
    </div>
  );
}