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

    return (
        <div className="div_dropdown">
            <div className="div_button_tap">
                <button
                className={basics === 'year' ? "disabled" : ""}
                onClick={()=>{
                    setBasics('year')
                    scrollRef.current.scrollTop = 0
                }}>년</button>
                <button
                className={basics === 'month' ? "disabled" : ""}
                onClick={()=>{
                    setBasics('month')
                    scrollRef.current.scrollTop = 0
                }}>월</button>
                <button
                className={basics === 'day' ? "disabled" : ""}
                onClick={()=>{
                    setBasics('day')
                    scrollRef.current.scrollTop = 0
                }}>일</button>
            </div>
            <ul className="ul_listBox" ref={scrollRef}>
                {Array(arrayFill).fill("").map((_, index) => {
                    return <li key={index} onClick={() => {
                        basics === 'year' ? setYear(date.getFullYear() + index)
                            : basics === 'month' ? setMonth(index + 1) : setDay(index + 1)
                        props.setFormData(el => ({...el, [props.name]: `${year}-${padZero(month)}-${padZero(day)}`}))
                        props.setError(el => ({...el, [props.name]: false}))
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