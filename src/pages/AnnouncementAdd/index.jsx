import AnnouncementTitle from "../../components/Company/inputs/AnnouncementTitle"
import JobRequirement from "../../components/Company/inputs/JobRequirement"
import WorkLocation from "../../components/Company/inputs/WorkLocation"
import WorkRequirement from "../../components/Company/inputs/WorkRequirement"
import AnnouncementContent from "../../components/Company/inputs/AnnouncementContent"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Modal from "./Modal"


export default function AnnouncementAdd () {
    const navigate = useNavigate()
    // input 상태관리를 여기서

    // 더미데이터
    const [data, setData1] = useState({
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
        근무지명: '근무지명',
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
        공고텍스트: '',
        이미지등록: null
    })
    const [modal, setModal] = useState(false)

    return (
    <div>
        <button onClick={() => navigate(-1)}>{`<-`}</button>
        <h1>채용 공고 등록</h1>
        <div>
            <AnnouncementTitle />
            <JobRequirement data={data} setData={setData1}/>
            <WorkLocation />
            <WorkRequirement data={data} setData={setData1} />
            <AnnouncementContent />
        </div>
        <button onClick={() => setModal(true)}>등록하기</button>
        <button>공고 미리보기</button>
        {modal && <Modal setModal={setModal} data={data}/>}
    </div>
    )
}