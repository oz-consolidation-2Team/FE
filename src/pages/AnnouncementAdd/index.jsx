import AnnouncementTitle from "../../components/Company/inputs/AnnouncementTitle"
import JobRequirement from "../../components/Company/inputs/JobRequirement"
import WorkLocation from "../../components/Company/inputs/WorkLocation"
import WorkRequirement from "../../components/Company/inputs/WorkRequirement"
import AnnouncementContent from "../../components/Company/inputs/AnnouncementContent"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Modal from "../../components/Company/Modal/Modal"
import "./AnnouncementAdd.scss"
import { GoArrowLeft } from "react-icons/go";

export default function AnnouncementAdd () {
    const navigate = useNavigate()
    // input 상태관리를 여기서

    /** {
  "title": "개발자 채용",           // 채용공고 제목
  "recruit_period_start": "2025-01-01",  //모집 시작일
  "recruit_period_end": "2025-06-30",   //모집 종료일
  "is_always_recruiting": false,   //상시 모집 여부
  "education": "대졸",   //학력 요구사항
  "recruit_number": 3,   //모집 인원
  "benefits": "병가, 유급 휴가, 가족상 휴가",   //복리 후생
  "preferred_conditions": "동종업계 경력자, 운전면허 소지자",    //우대 조건
  "other_conditions": "상시 모집, 초보 가능",   //기타 조건
  "work_address": "서울시 강남구 역삼동 123-45",    //근무지 주소 
  "work_place_name": "ABC Tech Center",    //근무지명
  "payment_method": "월급",   //급여 지급 방법
  "job_category": "IT·인터넷",   //모집 직종
  "work_duration": "1년 이상",    //근무 기간
  "career": "경력",   //경력 사항 (신입/경력 등)
  "employment_type": "정규직",   //고용 형태 (정규직/계약직 등)
  "salary": 5000,   //급여
  "deadline_at": "2025-12-31",   //마감일 <- 이건 뭐지
  "work_days": "월-금",    //근무 요일/스케줄
  "description": "채용 공고 상세 내용"    //공고 상세 내용
} */

    // 더미데이터
    const [data, setData1] = useState({
        title: null,
        근무요약: null,
        recruit_period_start: null,
        recruit_period_end: null,
        is_always_recruiting: false,
        recruit_number: null,
        education: null,
        benefits: null,
        preferred_conditions: null,
        other_conditions: null,
        work_address: null,
        work_place_name: null,
        salary: null,
        payment_method: null,
        job_category: null,
        career: null,
        work_duration: null,
        근무기간협의: false,
        work_days: null,
        근무요일협의: false,
        근무요일변동: false,
        employment_type: null,
        근무시간: null,
        근무시간협의: false,
        description: null,
        이미지등록: null
    })
    const [modal, setModal] = useState(false)

    return (
    <div className="AnnouncementAdd_container">
        <GoArrowLeft 
        className="button_back"
        onClick={() => navigate(-1)} />
        <h1>채용 공고 등록</h1>
        <div className="input_group">
            <AnnouncementTitle data={data} setData={setData1} />
            <JobRequirement data={data} setData={setData1}/>
            <WorkLocation data={data} setData={setData1} />
            <WorkRequirement data={data} setData={setData1} />
            <AnnouncementContent data={data} setData={setData1} />
        </div>
        <button 
        className="button_add color-change"
        onClick={() => setModal(true)}>등록하기</button>
        <button className="button_preview">공고 미리보기</button>
        {modal && <Modal setModal={setModal} data={data} modalType='add' />}
    </div>
    )
}