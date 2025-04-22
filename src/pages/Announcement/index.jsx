import AnnouncementTitle from "../../components/Company/inputs/AnnouncementTitle"
import JobRequirement from "../../components/Company/inputs/JobRequirement"
import WorkLocation from "../../components/Company/inputs/WorkLocation"
import WorkRequirement from "../../components/Company/inputs/WorkRequirement"
import AnnouncementContent from "../../components/Company/inputs/AnnouncementContent"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Modal from "../../components/Company/Modal/Modal"
import "./Announcement.scss"
import { GoArrowLeft } from "react-icons/go";

/**
 * @param {'add' | 'edit'} type 공고 등록인지 수정인지 체크
 */
export default function Announcement (props) {
    const navigate = useNavigate()
    
    // edit엔 api 호출로 추후 변경
    let data;
    if (props.type === "edit") data = {
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
    }
    else data = {
        title: '', // 공고제목
        근무요약: '',  // 근무요약
        recruit_period_start: '', // 모집시작일
        recruit_period_end: '', // 모집 마감일
        is_always_recruiting: false, // 상시모집여부
        recruit_number: '', // 모집인원
        education: '', // 학력
        benefits: [], // 복리후생
        preferred_conditions: [], // 우대조건
        other_conditions: [], // 기타조건
        work_address: '', // 근무지주소
        work_place_name: '', // 근무지명
        salary: '', // 급여
        payment_method: '', // 급여지급방법
        job_category: '', // 직종
        career: '', // 경력
        work_duration: '', // 근무기간
        근무기간협의: false, // 근무기간협의
        work_days: [], // 근무요일
        근무요일협의: false, // 근무요일협의
        근무요일변동: false, // 근무요일변동
        employment_type: '', // 고용형태
        근무시간: '', // 근무시간
        근무시간협의: false, // 근무시간협의
        description: '', // 공고상세내용
        이미지등록: ''
    }

    const [showModal, setShowModal] = useState(false)
    const [modalType, setModalType] = useState('edit')
    const [formData, setFormData] = useState(data)
    const [error, setError] = useState({
        title: false, // 공고제목
        근무요약: false,  // 근무요약
        recruit_period_start: false, // 모집시작일
        // recruit_period_end: false, // 모집 마감일
        recruit_number: false, // 모집인원
        education: false, // 학력
        // work_address: false, // 근무지주소
        work_place_name: false, // 근무지명
        salary: false, // 급여
        payment_method: false, // 급여지급방법
        job_category: false, // 직종
        career: false, // 경력
        work_duration: false, // 근무기간
        work_days: false, // 근무요일
        employment_type: false, // 고용형태
        근무시간: false, // 근무시간
        // 이미지등록: false // 이미지등록
    })
    
    const validate = () => {
        console.log('validate 실행됨')
        const newerror = {...error}
        Object.entries(error).forEach((item) => {
            if (!formData[item[0]]) newerror[item[0]] = true
        })
        setError(newerror)
        console.log(newerror)
        return Object.values(newerror).includes(true)
    }

    return (
        <div className="AnnouncementAdd_container">
            <GoArrowLeft 
            className="button_back"
            onClick={() => navigate(-1)} />
            <h1>채용 공고 {props.type === 'add' ? "등록" : "수정"}</h1>
            {props.type === 'edit' && <button 
                className="button_delete"
                onClick={()=>{
                setModalType('delete')
                setShowModal(true)
            }}>삭제하기</button>}

            <div className="input_group">
                <AnnouncementTitle formData={formData} setFormData={setFormData} error={error} setError={setError} />
                <JobRequirement formData={formData} setFormData={setFormData} error={error} setError={setError} />
                <WorkLocation formData={formData} setFormData={setFormData} error={error} setError={setError} />
                <WorkRequirement formData={formData} setFormData={setFormData} error={error} setError={setError} />
                <AnnouncementContent formData={formData} setFormData={setFormData} error={error} setError={setError} />
            </div>

            <button 
            className="button_add color-change"
            onClick={() => {
                if (validate()) alert('폼을 다시 확인해주세요')
                else {
                    setShowModal(true)
                    setModalType(props.type)
                }
            }}>등록하기</button>
            <button className="button_preview">공고 미리보기</button>
            {showModal && <Modal setShowModal={setShowModal} formData={formData} modalType={modalType} />}
        </div>
    )
}