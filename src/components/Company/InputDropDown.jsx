import { useState } from "react"
import "./styles/InputDropDown.scss"
import { GoChevronRight, GoChevronDown  } from "react-icons/go";
import TimeDropDown from "./TimeDropDown";
import DayDropDown from "./DayDropDown";
import PropTypes from 'prop-types';
import { CAREER_OPTIONS, EDUCATION_OPTIONS, EMPLOYMENT_TYPE_OPTIONS, INTEREST_OPTIONS, PAYMENT_OPTIONS, WORK_DURATION_OPTIONS } from "@/utils/signUpInfoOptions";

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
        "education": EDUCATION_OPTIONS,
        "employment_type": EMPLOYMENT_TYPE_OPTIONS,
        "work_duration": WORK_DURATION_OPTIONS,
        "payment_method": PAYMENT_OPTIONS,
        "job_category": INTEREST_OPTIONS,
        "career": CAREER_OPTIONS
    }

    let content;
    if (type === 'day') content = <DayDropDown {...props} />
    else if (type === 'time') content =  <TimeDropDown {...props} />
    else content = <ul className="ul_listBox ul_dropdown">
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
            className={`button_dropDown ${viewDropDown ? "viewDropDown" : ""}`}
            onClick={() => setViewDropDown(!viewDropDown)}>
                {formData[name] ? formData[name] : `${text} 선택`}
                {viewDropDown ? <GoChevronDown /> : <GoChevronRight />}
                {viewDropDown && content}
            </button>
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