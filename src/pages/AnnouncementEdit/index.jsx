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

    // 더미데이터
    const [data, setData] = useState({
        공고제목: '유치원교사 모집합니다',
        근무요약: '아이들을 좋아하는 분 환영',
        모집기간: '2025.02.01',
        모집기간상시: false,
        모집인원: 1,
        학력: '대학교',
        복리후생: ['복리1','복리2'],
        우대사항: ['우대1','우대2','우대3'],
        기타조건: ['기타1'],
        근무지주소: '지구 어딘가 어딘가 어딘가',
        근무지명: '근무지명이에요',
        급여: 5000000,
        급여지급방법: '월급',
        근무기간: '1년 이상',
        근무기간협의: true,
        근무요일: ['월','화','수','목','금'],
        근무요일협의: false,
        근무요일변동: false,
        고용형태: '정규직',
        근무시간: '08:00~18:00',
        근무시간협의: false,
        공고내용: '공고 텍스트 공간이에요',
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