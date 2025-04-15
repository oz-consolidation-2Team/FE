import { useState } from "react"
import "./styles/InputDropDown.scss"
import { GoChevronRight, GoChevronDown  } from "react-icons/go";

/**props = {
 * @data 상태관리{} (선택된 값 출력하기 위함)
 * @setData 상태관리 (해당 값을 data에 입력하기 위함)
 * @text string; (항목 구분을 위함)
} */
export default function InputDropDown (props) {
    
    const [viewDropDown, setViewDropDown] = useState(false)
        // 더미데이터
        const data_dropDown = {
            "학력": ['학력 무관','고졸','초대졸(전문대학)','대졸','대학원'],
            "고용형태": ['정규직', '아르바이트, 계약직', '일용직', '파견직', '위촉직 (프리랜서)'],
            "모집기간": ['3개월 이상', '6개월 이상', '1년 이상', '3년 이상'],
            "근무기간": ['3개월 이상', '6개월 이상', '1년 이상', '3년 이상'],
            "근무시간": ['테스트중1','테스트중1','테스트중1','테스트중1','테스트중1'],
            "급여지급방법": ['테스트중1','테스트중1','테스트중1','테스트중1'],
            "직종": ['IT', '교육', '서비스', '생산', '기타', '디자인', '제조', '의료', '기획', '물류', '운송', '농업']
            
        }
        return (
            <div className="InputDropDown_container">
                <button 
                className="button_dropDown"
                onClick={() => setViewDropDown(!viewDropDown)}>
                    {props.data[props.text] ? props.data[props.text] : `${props.text} 선택`}
                    {viewDropDown ? <GoChevronDown /> : <GoChevronRight />}
                </button>
                {viewDropDown && <ul className="ul_listBox">
                    {data_dropDown[props.text].map((item, index) => 
                        <li key={index} onClick={() => {
                            props.setData({...props.data, [props.text]: item})
                            setViewDropDown(false)
                        }}>{item}</li>
                    )}
                    </ul>
                }
            </div>
        )
}