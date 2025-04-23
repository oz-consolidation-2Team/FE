import InfoBox from "../../components/Company/InfoBox"
import AnnouncementCard from "../../components/Company/AnnouncementCard"
import { useNavigate } from 'react-router-dom';
import "./CompanyMyPage.scss"
import Hr from "@/utils/Hr";
import { useEffect, useState } from "react";
import { listJobPosting } from "@/apis/companyPostingApi";
import axios from "axios";


export default function CompanyMyPage() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate();
  
  useEffect(()=>{
    try {
      listJobPosting().then(res => setData(res))
    } catch (error) {
      if (axios.isAxiosError(error)) setError(error.response?.data?.message || '요청 실패')
      else setError('알 수 없는 에러 발생')
    } finally {
      setLoading(true)
    }
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
      {data && data?.job_postings?.map(item => 
        <AnnouncementCard {...item} key={item.id} />
      )}
    </div>
  );
}