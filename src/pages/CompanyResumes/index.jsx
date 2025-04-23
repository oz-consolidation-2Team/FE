import { useParams } from "react-router-dom"
import CompanyCard from "../../components/Company/CompanyCard"
import Modal from "../../components/Company/Modal/Modal"
import { useEffect, useState } from "react"
import "./CompanyResumes.scss"
import Hr from "@/utils/Hr"
import { resumeInquiryPosting } from "@/apis/companyApi"
import axios from "axios"

export default function CompanyResumes () {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [modal, setModal] = useState(false)

    useEffect(()=>{
        try {
            resumeInquiryPosting().then(res => setData(res))
        } catch (error) {
            if (axios.isAxiosError(error)) setError(error.response?.data?.message || '요청 실패')
            else setError('알 수 없는 에러 발생')
        } finally {
            setLoading(false)
        }
    },[])
    //api 사용자 정보 조회 (사용자 ID로 해당 사용자 상세 정보 조회) /user/{user_id}
    // 유저데이터 중 거주지 누락

    useEffect(()=>{
        console.log(data)
    },[data])

    // 더미데이터
    const data_resumes = [
        {
        "id": 1,
        "user_id": 10,
        "resume_image": "https://example.com/image.jpg",
        "company_name": "오즈코딩스쿨",
        "position": "개발자",
        "work_period_start": "2020-01-01",
        "work_period_end": "2021-12-31",
        "desired_area": "서울",
        "introduction": "자기소개 내용",
        "created_at": "2025-04-05T10:00:00",
        "updated_at": "2025-04-06T12:00:00",
        "educations": [
            {
                "id": 1,
                "education_type": "고등학교",
                "school_name": "서울고등학교",
                "education_status": "졸업",
                "start_date": "2010-03-01",
                "end_date": "2013-02-28",
                "created_at": "2025-04-05T10:00:00",
                "updated_at": "2025-04-05T10:00:00"
            },
            {
                "id": 2,
                "education_type": "대학교(4년)",
                "school_name": "서울대학교",
                "education_status": "졸업",
                "start_date": "2013-03-01",
                "end_date": "2017-02-28",
                "created_at": "2025-04-05T10:00:00",
                "updated_at": "2025-04-05T10:00:00"
            }
        ]},{
            "id": 1,
            "user_id": 10,
            "resume_image": "https://example.com/image.jpg",
            "company_name": "오즈코딩스쿨",
            "position": "개발자",
            "work_period_start": "2020-01-01",
            "work_period_end": "2021-12-31",
            "desired_area": "서울",
            "introduction": "자기소개 내용",
            "created_at": "2025-04-05T10:00:00",
            "updated_at": "2025-04-06T12:00:00",
            "educations": [
                {
                    "id": 1,
                    "education_type": "고등학교",
                    "school_name": "서울고등학교",
                    "education_status": "졸업",
                    "start_date": "2010-03-01",
                    "end_date": "2013-02-28",
                    "created_at": "2025-04-05T10:00:00",
                    "updated_at": "2025-04-05T10:00:00"
                },
                {
                    "id": 2,
                    "education_type": "대학교(4년)",
                    "school_name": "서울대학교",
                    "education_status": "졸업",
                    "start_date": "2013-03-01",
                    "end_date": "2017-02-28",
                    "created_at": "2025-04-05T10:00:00",
                    "updated_at": "2025-04-05T10:00:00"
                }
            ]},{
                "id": 1,
                "user_id": 10,
                "resume_image": "https://example.com/image.jpg",
                "company_name": "오즈코딩스쿨",
                "position": "개발자",
                "work_period_start": "2020-01-01",
                "work_period_end": "2021-12-31",
                "desired_area": "서울",
                "introduction": "자기소개 내용",
                "created_at": "2025-04-05T10:00:00",
                "updated_at": "2025-04-06T12:00:00",
                "educations": [
                    {
                        "id": 1,
                        "education_type": "고등학교",
                        "school_name": "서울고등학교",
                        "education_status": "졸업",
                        "start_date": "2010-03-01",
                        "end_date": "2013-02-28",
                        "created_at": "2025-04-05T10:00:00",
                        "updated_at": "2025-04-05T10:00:00"
                    },
                    {
                        "id": 2,
                        "education_type": "대학교(4년)",
                        "school_name": "서울대학교",
                        "education_status": "졸업",
                        "start_date": "2013-03-01",
                        "end_date": "2017-02-28",
                        "created_at": "2025-04-05T10:00:00",
                        "updated_at": "2025-04-05T10:00:00"
                    }
                ]}
    ]
    const data_user = {
        "id":1,
        "name":"홍길동",
        "email":"user@example.com",
        "gender":"남성",
        "birthday":"1990-01-01",
        "phone_number":"010-1111-2222",
        "interests":["교육","IT"],
        "signup_purpose":"일자리 정보",
        "referral_source":"구글검색",
        "user_image":"https://example.com/image.jpg",
        "created_at":"2025-04-08T12:00:00Z"
    }

    return (
        <div className="CompanyResumes_container">
            <h1>지원자 이력서 관리</h1>
            <Hr />
            <div className="div_content">
                <CompanyCard />
                <Hr />
                <div className="resume">
                    {data_resumes.length ? data_resumes.map((item)=>{
                        return (
                            <div className="resume-content" key={item.id}>
                                <div className="user">
                                    <p>{data_user.name}</p>
                                    <p>유저 거주지</p>
                                </div>
                                <Hr />
                                <div>
                                    <h2>이력서 제목</h2>
                                    <p>{item.introduction}</p>
                                </div>
                                <button onClick={()=>{setModal(true)}}>자세히 보기</button>
                            </div>
                        )
                    }) : <h2>들어온 이력서가 없습니다</h2>}
                </div>
            </div>
            {modal && <Modal modalType="cencel-resume" setModal={setModal}/>}
        </div>
    )
}