import { useNavigate } from "react-router-dom"

/**props = {
 * @setModal 상태관리(boolean) (모달관리 닫기 위함)
 * @data 상태관리(input값들) (출력을 위함)
} */
export default function Modal (props) {
    const navigate = useNavigate()
    // 기업 호출 api 

    return (
        <div>
            <h1>공고 등록이 완료되었습니다</h1>
            <div>
                <div>
                    <p>기업명</p>
                    <p>{props.data.근무지명}</p>
                </div>
                <div>
                    <p>{props.data.공고제목}</p>
                    <p>{props.data.근무요약}</p>
                </div>
                <p>{props.data.모집기간상시 ? "상시모집" : props.data.모집기간}</p>
            </div>
            <p>{props.data.근무지주소}</p>
            <hr />

            <div>
                <p>{props.data.모집기간상시 ? "상시모집" : props.data.모집기간}</p>
                <p>{props.data.모집인원}명</p>
                <p>{props.data.학력}</p>
            </div>
            <p>{props.data.복리후생.join(', ')}</p>
            <p>{props.data.우대사항.join(', ')}</p>
            <p>{props.data.기타조건.join(', ')}</p>
            <hr />

            <div>
                <p>{props.data.급여}</p>
                <p>{props.data.급여지급방법}</p>
                <p>{props.data.고용형태}</p>
            </div>
            <div>
                <p>{props.data.근무기간}<span>{props.data.근무기간협의 && "(협의 가능)"}</span></p>
                <p>{props.data.근무시간}<span>{props.data.근무시간협의 && "(협의 가능)"}</span></p>
            </div>
            <p>{props.data.근무요일.join(', ')}<span>{props.data.근무요일협의 && "(협의 가능)"}</span><span>{props.data.근무요일변동}</span></p>
            <div>
                <button>등록된 공고 보러 가기</button>
                <button onClick={() => {
                    props.setModal(false)
                    navigate(-1)
                    }}>완료</button>
            </div>
        </div>
    )
}