import BasicsText from "./BasicsText";

/**props = {
 * @data 상태관리
 * @modalType 'add' | 'edit' | 'delete' | 'delete-Success' (모달 타입)
} */
export default function Content (props) {
    // 기업 호출 API
    return (
        <div className="Content_container">
            <div className="announcement-card">
                <div className="company">
                    <p>기업명</p>
                    <p>{props.data.근무지명}</p>
                </div>
                <hr />
                <div className="announcement">
                    <p className="title">{props.data.공고제목}</p>
                    <p>{props.data.근무요약}</p>
                </div>
                <p className="time">{props.data.모집기간상시 ? "상시모집" : props.data.모집기간}</p>
            </div>
            <p>근무지주소: {props.data.근무지주소}</p>
            <hr />

            <div className="box">
                <p>모집기간: {props.data.모집기간상시 ? "상시모집" : props.data.모집기간}</p>
                <p>모집인원: {props.data.모집인원}명</p>
                <p>학력: {props.data.학력}</p>
            </div>
            <div>복리후생: {props.data.복리후생 && props.data.복리후생.join(', ')}</div>
            <div>우대사항: {props.data.우대사항 && props.data.우대사항.join(', ')}</div>
            <div>기타조건: {props.data.기타조건 && props.data.기타조건.join(', ')}</div>
            <hr />

            <div className="box">
                <p>급여: {props.data.급여}</p>
                <p>급여지급방법: {props.data.급여지급방법}</p>
                <p>고용형태: {props.data.고용형태}</p>
            </div>
            <div className="box">
                <p>근무기간: {props.data.근무기간}<span>{props.data.근무기간협의 && "(협의 가능)"}</span></p>
                <p>근무시간: {props.data.근무시간}<span>{props.data.근무시간협의 && "(협의 가능)"}</span></p>
            </div>
            <div>근무요일: {props.data.근무요일 && props.data.근무요일.join(', ')}<span>{props.data.근무요일협의 && "(협의 가능)"}</span><span>{props.data.근무요일변동}</span></div>
        </div>
    )
}

