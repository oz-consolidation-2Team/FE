import { useEffect, useRef, useState } from "react"
import PropTypes from 'prop-types';
import { padZero } from "@/utils/validation";

export default function DayDropDown (props) {
    const date = new Date()
    const scrollRef = useRef(null)
    const didMount = useRef(false)
    
    const [basics, setBasics] = useState('year')
    const [year, setYear] = useState(date.getFullYear())
    const [month, setMonth] = useState(date.getMonth() + 1) // month 0부터 시작
    const [day, setDay] = useState(date.getDate())

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
    
    const validateWorkDay = (endDay) => {
        if (props.formData['recruit_period_start'] > endDay) {
            alert(`현재날짜보다 이전인 날짜는 선택할 수 없습니다
    현재 날짜: ${date.getFullYear()}-${padZero(date.getMonth() + 1)}-${padZero(date.getDate())}
    선택 날짜: ${endDay}`)
            return false
        }
        else return true
    }

    useEffect(()=>{
        if (!didMount.current) {
            const endDay = `${year}-${padZero(month)}-${padZero(day)}`

            if (!validateWorkDay(endDay)) return

            props.setFormData(el => ({...el, [props.name]: endDay}))
            props.setError(el => ({...el, [props.name]: false}))
        }
        else didMount.current = true
    },[year, month, day])

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