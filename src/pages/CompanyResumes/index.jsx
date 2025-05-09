import CompanyCard from "../../components/Company/CompanyCard"
import Modal from "../../components/Company/Modal/Modal"
import { useEffect, useState } from "react"
import "./CompanyResumes.scss"
import Hr from "@/utils/Hr"
import { resumeInquiryPosting } from "@/apis/companyApi"
import { useNavigate, useParams } from "react-router-dom"

export default function CompanyResumes () {
    const [resumes, setResumes] = useState(null)
    const [resumesLoading, setResumesLoading] = useState(true)
    const [resumesLoadingError, setResumesError] = useState(null)
    const [modal, setModal] = useState(false)
    const params = useParams("id")
    const navigate = useNavigate();

    useEffect(()=>{
        try {
            resumeInquiryPosting().then(res => {
                const respone = res.filter((item) => item.job_posting_id === Number(params.id))
                console.log(respone)
                setResumes(respone)
                setResumesLoading(false)
            })
        } catch (error) {
            setResumesError('이력서 조회 에러', error)
            setResumesLoading(false)
        }
    },[])

    return (
        <div className="company_main resumes">
            <div className="CompanyResumes_container">
                <h1>지원자 이력서 관리</h1>
                <Hr />
                <div className="div_content">
                    <CompanyCard params={params.id} />
                    <Hr />
                    <div className="resume">
                        {resumesLoading ? <h2>로딩 중...</h2>
                        : resumes.length ? resumes.map((item)=>{
                            return (
                                <div className="resume-content" key={item.id}>
                                    <div>
                                        <h2>{item.resumes_data.applicant_name}님의 이력서</h2>
                                        <p>{item.resumes_data.introduction}</p>
                                        <div className="tage">
                                            {item.resumes_data.desired_area.split(", ").map((area, index) => {
                                                if (index > 3) return null
                                                if (index === 3) return <span key={index}>...</span>
                                                return <span key={index}>{area}</span>
                                            })}
                                        </div>
                                    </div>
                                    <button onClick={()=>{navigate(`/mypage/company/announcement/resumes/detail/${item.id}`)}}>자세히 보기</button>
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