import AnnouncementTitle from "../../components/Company/inputs/AnnouncementTitle"
import JobRequirement from "../../components/Company/inputs/JobRequirement"
import WorkLocation from "../../components/Company/inputs/WorkLocation"
import WorkRequirement from "../../components/Company/inputs/WorkRequirement"
import AnnouncementContent from "../../components/Company/inputs/AnnouncementContent"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import Modal from "../../components/Company/Modal/Modal"
import "./Announcement.scss"
import { GoArrowLeft } from "react-icons/go";
import { JobPosting } from "@/apis/companyPostingApi"
import { padZero } from "@/utils/validation"
import { INPUT_BLOCK, INPUT_BLOCK_ARRAY, INPUT_BLOCK_BOOLEAN } from "./inputFieldConfig"


/**
 * @param {'add' | 'edit'} type 공고 등록인지 수정인지 체크
 */
export default function Announcement (props) {
    const navigate = useNavigate()
    const param = useParams()
    const date = new Date()
    
    let data= {};
    INPUT_BLOCK.map(item => {
        if (INPUT_BLOCK_ARRAY.includes(item)) return data[item]= []
        if (INPUT_BLOCK_BOOLEAN.includes(item)) return data[item]= false
        if (item === 'recruit_period_start') return data[item]= `${date.getFullYear()}-${padZero(date.getMonth() +1)}-${padZero(date.getDate())}`
        data[item]= ''
    })

    const [showModal, setShowModal] = useState(false)
    const [modalType, setModalType] = useState('edit')
    const [formData, setFormData] = useState(data)
    const [error, setError] = useState({
        title: false, // 공고제목
        summary: false,  // 근무요약
        recruit_period_end: false, // 모집 마감일
        recruit_number: false, // 모집인원
        education: false, // 학력
        work_address: false, // 근무지주소
        work_place_name: false, // 근무지명
        salary: false, // 급여
        payment_method: false, // 급여지급방법
        job_category: false, // 직종
        career: false, // 경력
        work_duration: false, // 근무기간
        work_days: false, // 근무요일
        employment_type: false, // 고용형태
        work_start_time: false, // 근무시간
        work_end_time: false, // 근무시간
        image_file: false // 이미지등록
    })
    
    useEffect(()=>{
        window.scrollTo({ top: 0, behavior: 'smooth' })
    },[])

    const [editLoading, setEditLoading] = useState(false)

    if (props.type=== 'edit') {
        useEffect(()=>{
            try {
                JobPosting(param.id).then(res => {
                    setFormData(({
                        ...res,
                        'benefits': res['benefits'].split(', '),
                        'other_conditions': res['other_conditions'].split(', '),
                        'preferred_conditions': res['preferred_conditions'].split(', '),
                        'work_days': res['work_days'].split(','),
                    }))
                    setEditLoading(true)
                })
            } catch (error) {
                console.log('기업 공고 조회 에러', error)
            }
        },[])
    }

    const validate = () => {
        console.log('validate 실행됨')
        const newerror = {...error}
        Object.entries(error).forEach((item) => {
            if (!formData[item[0]]) return newerror[item[0]] = true
        })
        setError(newerror)
        console.log(newerror)
        return Object.values(newerror).includes(true)
    }

    const loading = props.type === 'edit' ? editLoading : true

    return (
        <div className="company_main">
            {loading ? 
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
                    {/* <button className="button_preview">공고 미리보기</button> */}
                    {showModal && <Modal setShowModal={setShowModal} formData={formData} modalType={modalType} setModalType={setModalType}/>}
                </div>
            : <p>로딩 중</p>}
        </div>
    )
}