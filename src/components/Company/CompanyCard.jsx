import { useEffect, useState } from "react"
import axios from "axios"
import { JobPosting } from "@/apis/companyPostingApi"

/**
 * @param {string} params 공고 ID
 */
export default function CompanyCard ({params}) {
    //api 채용공고 상세 조회 (공고 ID로 상세 내용 조회) /postings/{postings_id}
    // 근무 요약 누락
    //api 기업 정보 조회 (기업 ID로 해당 기업 상세 정보 조회) /company/{company_id}

    // const [data, setData] = useState(null)
    // const [loading, setLoading] = useState(true)
    // const [error, setError] = useState(null)

    // // 내 기업 정보 조회
    // useEffect(()=>{
    //     try {
    //         listJobPosting().then(res => setData(res))
    //     } catch (error) {
    //         if (axios.isAxiosError(error)) setError(error.response?.data?.message || '요청 실패')
    //         else setError('알 수 없는 에러 발생')
    //     } finally {
    //       setLoading(false)
    //     }
    // },[])

    const [job, setJob] = useState(null)
    const [jobLoading, setJobLoading] = useState(true)
    const [jobError, setJobError] = useState(null)
    
    // 공고 상세 조회
    useEffect(()=>{
      try {
        JobPosting(params).then(res => setJob(res))
      } catch (error) {
        if (axios.isAxiosError(error)) setJobLoading(error.response?.data?.message || '요청 실패')
        else setJobLoading('알 수 없는 에러 발생')
      } finally {
        setJobError(false)
      }
    },[])

    if (!job) return;
    // console.log(data)
    console.log(job)

    const 상시모집 = job.is_always_recruiting ? "상시 모집" : job.recruit_period_end + " 까지"
    return (
        <div className="CompanyCard_container">
            <p>{job.work_place_name}</p>
            <h3>{job.title}</h3>
            <p>공고 근무 요약</p>
            <div className="bottom">
              <hr />
              <p>{job.work_address}</p>
              <p>{상시모집}</p>
              <button>공고 보러 가기</button>
            </div>
        </div>
    )
}