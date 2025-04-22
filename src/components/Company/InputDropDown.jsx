import { useState } from "react"
import "./styles/InputDropDown.scss"
import { GoChevronRight, GoChevronDown  } from "react-icons/go";
import TimeDropDown from "./TimeDropDown";
import DayDropDown from "./DayDropDown";
import PropTypes from 'prop-types';

/**
 * @param {상태관리} formData input값 저장
 * @param {상태관리} error 유효성검사
 * @param {string} name input 변수 전달
 * @param {string} text 플레이스홀더 입력값 (선택되지 않았을 때)
 * @param {'normal' | 'day' | 'time'} type 드롭다운 타입 지정 (탭 부분)
 */
export default function InputDropDown (props) {
    const {formData, setFormData, setError, name, text, type} = props;
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

    let content;
    if (type === 'day') content = <DayDropDown {...props} />
    else if (type === 'time') content =  <TimeDropDown {...props} />
    else content = <ul className="ul_listBox">
        {data_dropDown[name].map((item, index) =>
            <li key={index} onClick={() => {
                setFormData(el => ({...el, [name]: item}))
                setViewDropDown(false)
                setError(el => ({
                    ...el,
                    [name]: false
                }))
            }}>{item}</li>
        )}
        </ul>

    return (
        <div className="InputDropDown_container">
            <button 
            className={`button_dropDown ${text === '근무시간' ? "resize" : ""}`}
            onClick={() => setViewDropDown(!viewDropDown)}>
                {formData[name] ? formData[name] : `${text} 선택`}
                {viewDropDown ? <GoChevronDown /> : <GoChevronRight />}
            </button>
            {viewDropDown && content}
        </div>
    )
}

InputDropDown.propTypes = {
    formData: PropTypes.object,
    setFormData: PropTypes.node.isRequired,
    error: PropTypes.object,
    setError: PropTypes.node.isRequired,
    name: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['normal', 'day', 'time'])
} 