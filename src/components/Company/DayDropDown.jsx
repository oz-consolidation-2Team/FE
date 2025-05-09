import { useRef, useState } from "react"
import PropTypes from 'prop-types';
import { padZero } from "@/utils/validation";

export default function DayDropDown (props) {
    const date = new Date()
    const scrollRef = useRef(null)
    
    const [basics, setBasics] = useState('year')
    const [year, setYear] = useState(date.getFullYear())
    const [month, setMonth] = useState(date.getMonth() + 1) // month 0부터 시작
    const [day, setDay] = useState(date.getDay())

    let arrayFill;
    if (basics === "year") arrayFill= 10
    else if (basics === "month") arrayFill= 12
    else arrayFill= new Date(year, month, 0).getDate()

    const handleClick = (e, type) => {
        e.stopPropagation()
        setBasics(type)
        scrollRef.current.scrollTop = 0
    }

    const getDisabledClass = (disabled) => {
        return basics === disabled ? "disabled" : ""
    }
    
    const validateWorkDay = () => {
        if (props.formData['recruit_period_start'] > props.formData['recruit_period_end']) alert("모집기간을 다시 확인해주세요")
    }

    return (
        <div className="div_dropdown div_ref">
            <div className="div_button_tap">
                <span
                className={getDisabledClass('year')}
                onClick={(e) => handleClick(e, 'year')}>년</span>
                <span
                className={getDisabledClass('month')}
                onClick={(e) => handleClick(e, 'month')}>월</span>
                <span
                className={getDisabledClass('day')}
                onClick={(e) => handleClick(e, 'day')}>일</span>
            </div>
            <ul className="ul_listBox" ref={scrollRef}>
                {Array(arrayFill).fill("").map((_, index) => {
                    return <li key={index} onClick={(e) => {
                        e.stopPropagation()
                        basics === 'year' ? setYear(date.getFullYear() + index)
                        : basics === 'month' ? setMonth(index + 1) : setDay(index + 1)
                        props.setFormData(el => ({...el, [props.name]: `${year}-${padZero(month)}-${padZero(day)}`}))
                        props.setError(el => ({...el, [props.name]: false}))
                        validateWorkDay()
                    }}>{basics === 'year' ? date.getFullYear() + index
                        :  index +1}</li>
                })}
            </ul>
        </div>
    )
}

DayDropDown.propTypes = {
    formData: PropTypes.object,
    setFormData: PropTypes.node.isRequired,
    error: PropTypes.object,
    setError: PropTypes.node.isRequired,
    name: PropTypes.string.isRequired
} 