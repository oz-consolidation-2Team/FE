import CompanyCard from "../../components/Company/CompanyCard"
import Modal from "../../components/Company/Modal/Modal"
import { useEffect, useState } from "react"
import "./CompanyResumes.scss"
import Hr from "@/utils/Hr"
import { resumeInquiryPosting } from "@/apis/companyApi"
import axios from "axios"
import { useParams } from "react-router-dom"

export default function CompanyResumes () {
    const [resumes, setResumes] = useState(null)
    const [resumesLoading, setResumesLoading] = useState(true)
    const [resumesLoadingError, setResumesError] = useState(null)
    const [modal, setModal] = useState(false)
    const params = useParams("id")

    useEffect(()=>{
        try {
            resumeInquiryPosting().then(res => setResumes(res))
        } catch (error) {
            if (axios.isAxiosError(error)) setResumesError(error.response?.data?.message || '요청 실패')
            else setResumesError('알 수 없는 에러 발생')
        } finally {
            setResumesLoading(false)
        }
    },[])

    return (
        <div className="company_main">
            <div className="CompanyResumes_container">
                <h1>지원자 이력서 관리</h1>
                <Hr />
                <div className="div_content">
                    <CompanyCard params={params.id} />
                    <Hr />
                    <div className="resume">
                        {resumes ? resumes.map((item)=>{
                            return (
                                <div className="resume-content" key={item.id}>
                                    <div>
                                        <h2>이력서 제목</h2>
                                        <p>{item.resumes_data.introduction}</p>
                                        <div className="tage">
                                            {item.resumes_data.desired_area.split(", ").map((area, index) => {
                                                if (index > 3) return null
                                                if (index === 3) return <span key={index}>...</span>
                                                return <span key={index}>{area}</span>
                                            })}
                                        </div>
                                    </div>
                                    <button onClick={()=>{setModal(true)}}>자세히 보기</button>
                                </div>
                            )
                        }) : <h2>들어온 이력서가 없습니다</h2>}
                    </div>
                </div>
                {modal && <Modal modalType="cencel-resume" setModal={setModal}/>}
            </div>
        </div>
    )
}