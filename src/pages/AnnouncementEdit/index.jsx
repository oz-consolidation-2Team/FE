import { useState } from "react"
import { useNavigate } from "react-router-dom"
import AnnouncementTitle from "../../components/Company/inputs/AnnouncementTitle"
import JobRequirement from "../../components/Company/inputs/JobRequirement"
import WorkLocation from "../../components/Company/inputs/WorkLocation"
import WorkRequirement from "../../components/Company/inputs/WorkRequirement"
import AnnouncementContent from "../../components/Company/inputs/AnnouncementContent"
import Modal from "../../components/Company/Modal/Modal"
import "./AnnouncementEdit.scss"
import { GoArrowLeft } from "react-icons/go";

export default function AnnouncementEdit () {
    // params ID값을 토대로 API 호출
    const [modal, setModal] = useState(false)
    const [modalType, setModalType] = useState('edit')
    const navigate = useNavigate()

    //api 채용공고 상세 조회 (공고 ID로 상세 내용 조회) /posting/{posting_id}


    /**{
    "id": 1,
    "title": "개발자 채용",
    "company_users_id": 2,
    "company_id": 3,
    "recruit_period_start": "2025-01-01",
    "recruit_period_end": "2025-06-30",
    "is_always_recruiting": false,
    "education": "대졸",
    "recruit_number": 3,
    "benefits": "병가, 유급 휴가, 가족상 휴가",
    "preferred_conditions": "동종업계 경력자, 운전면허 소지자",
    "other_conditions": "상시 모집, 초보 가능",
    "work_address": "서울시 강남구 역삼동 123-45",
    "work_place_name": "ABC Tech Center",
    "payment_method": "월급",
    "job_category": "IT·인터넷",
    "work_duration": "1년 이상",
    "career": "경력",
    "employment_type": "정규직",
    "salary": 5000,
    "deadline_at": "2025-12-31",
    "work_days": "월-금",
    "description": "채용 공고 상세 내용",
    "created_at": "2025-04-05T10:00:00Z",
    "updated_at": "2025-04-05T10:00:00Z"
  } */
    // 더미데이터
    const [data, setData] = useState({
        title: '유치원교사 모집합니다',
        근무요약: '아이들을 좋아하는 분 환영',
        recruit_period_start: '2025.02.01',
        recruit_period_end: null,
        is_always_recruiting: false,
        recruit_number: 1,
        education: '대학교',
        benefits: ['복리1','복리2'],
        preferred_conditions: ['우대1','우대2','우대3'],
        other_conditions: ['기타1'],
        work_address: '지구 어딘가 어딘가 어딘가',
        work_place_name: '근무지명이에요',
        salary: 5000000,
        payment_method: '월급',
        work_duration: '1년 이상',
        근무기간협의: true,
        job_category: "IT·인터넷",
        career: "경력",
        work_days: ['월','화','수','목','금'],
        근무요일협의: false,
        근무요일변동: false,
        employment_type: '정규직',
        근무시간: '08:00~18:00',
        근무시간협의: false,
        description: '공고 텍스트 공간이에요',
        이미지등록: '테스트이미지_파일1.png'
    }) 

    return (
    <div className="AnnouncementEdit_container">
        {modal && <Modal setModal={setModal} data={data} modalType={modalType} setModalType={setModalType} />}
        <GoArrowLeft 
        className="button_back"
        onClick={() => navigate(-1)}/>
        <h1>채용 공고 수정</h1>
        <button 
            className="button_delete"
            onClick={()=>{
            setModalType('delete')
            setModal(true)
            }}>삭제하기</button>
        <div>
            <AnnouncementTitle data={data} setData={setData} />
            <JobRequirement data={data} setData={setData}/>
            <WorkLocation data={data} setData={setData}/>
            <WorkRequirement data={data} setData={setData} />
            <AnnouncementContent data={data} setData={setData} />
        </div>
        <button 
            className="button_edit"
            onClick={() => setModal(true)}>수정하기</button>
        <button className="button_preview">공고 미리보기</button>
    </div>
    )
}