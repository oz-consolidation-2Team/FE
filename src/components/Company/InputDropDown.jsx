import { useState } from "react"
import "./styles/InputDropDown.scss"
import { GoChevronRight, GoChevronDown  } from "react-icons/go";

/**props = {
 * @formData 상태관리{} (선택된 값 출력하기 위함)
 * @setformData 상태관리 (해당 값을 data에 입력하기 위함)
 * @errors 상태관리
 * @setErrors 상태관리
 * @text string; (항목 구분을 위함)
} */
export default function InputDropDown (props) {
    const [viewDropDown, setViewDropDown] = useState(false)

    const data_dropDown = {
        "education": ['학력 무관','고졸','초대졸(전문대학)','대졸','대학원'],
        "employment_type": ['정규직', '아르바이트, 계약직', '일용직', '파견직', '위촉직 (프리랜서)'],
        "recruit_period_start": ['123', '456', '789', '000'],
        "work_duration": ['3개월 이상', '6개월 이상', '1년 이상', '3년 이상'],
        "근무시간": ['근무시간1','근무시간2','근무시간3','근무시간4','근무시간5'],
        "payment_method": ['급여방법1','급여방법2','급여방법3','급여방법4'],
        "job_category": ['IT', '교육', '서비스', '생산', '기타', '디자인', '제조', '의료', '기획', '물류', '운송', '농업'],
        "career": ['경력1', '경력2', '경력3', '경력4']
        
    }
    return (
        <div className="InputDropDown_container">
            <button 
            className="button_dropDown"
            onClick={() => setViewDropDown(!viewDropDown)}>
                {props.formData[props.text] ? props.formData[props.text] : `${props.name} 선택`}
                {viewDropDown ? <GoChevronDown /> : <GoChevronRight />}
            </button>
            {viewDropDown && <ul className="ul_listBox">
                {data_dropDown[props.text].map((item, index) =>
                    <li key={index} onClick={() => {
                        props.setFormData({...props.formData, [props.text]: item})
                        setViewDropDown(false)
                        props.setErrors(el => ({
                            ...el,
                            [props.text]: false
                        }))
                    }}>{item}</li>
                )}
                </ul>
            }
        </div>
    )
}