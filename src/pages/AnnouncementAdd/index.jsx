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
        공고제목: '',
        근무요약: '',
        모집기간: null,
        모집기간상시: false,
        모집인원: null,
        학력: null,
        복리후생: null,
        우대조건: null,
        기타조건: null,
        근무지주소: null,
        근무지명: '',
        급여: null,
        급여지급방법: null,
        근무기간: null,
        근무기간협의: false,
        근무요일: null,
        근무요일협의: false,
        근무요일변동: false,
        고용형태: null,
        근무시간: null,
        근무시간협의: null,
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