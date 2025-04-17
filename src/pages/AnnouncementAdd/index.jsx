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
    
    const [formData, setFormData] = useState({
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
        이미지등록: '' // 이미지등록
    })
    const [errors, setErrors] = useState({
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
        const newErrors = {...errors}
        Object.entries(errors).forEach((item) => {
            if (!formData[item[0]]) newErrors[item[0]] = true
        })
        setErrors(newErrors)
        console.log(newErrors)
        return Object.values(newErrors).includes(true)
    }
    const [showModal, setShowModal] = useState(false)

    return (
    <div className="AnnouncementAdd_container">
        <GoArrowLeft 
        className="button_back"
        onClick={() => navigate(-1)} />
        <h1>채용 공고 등록</h1>
        <div className="input_group">
            <AnnouncementTitle formData={formData} setFormData={setFormData} errors={errors} setErrors={setErrors} />
            <JobRequirement formData={formData} setFormData={setFormData} errors={errors} setErrors={setErrors} />
            <WorkLocation formData={formData} setFormData={setFormData} errors={errors} setErrors={setErrors} />
            <WorkRequirement formData={formData} setFormData={setFormData} errors={errors} setErrors={setErrors} />
            <AnnouncementContent formData={formData} setFormData={setFormData} errors={errors} setErrors={setErrors} />
        </div>
        <button 
        className="button_add color-change"
        onClick={() => {
            validate() ?
            alert('폼을 다시 확인해주세요')
            : setShowModal(true)
            }}>등록하기</button>
        <button className="button_preview">공고 미리보기</button>
        {showModal && <Modal setShowModal={setShowModal} formData={formData} modalType='add' />}
    </div>
    )
}