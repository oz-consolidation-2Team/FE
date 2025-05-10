import { useState } from "react";
import PropTypes from 'prop-types';
import { padZero } from "@/utils/validation";

export default function TimeDropDown (props) {
    const [basics, setBasics] = useState('hour')
    const [hour, setHour] = useState(0)
    const [minute, setMinute] = useState(0)

    const arrayFill = basics === 'hour' ? 24 : 2

    const validateWorkTime = () => {
        if (props.name === 'work_start_time') return
        if (props.formData['work_start_time'] > props.formData['work_end_time']) alert("근무시간을 다시 확인해주세요")
    }

    return (
        <div className="div_dropdown div_ref">
            <div className="div_button_tap">
                <span
                className={basics === 'hour' ? "disabled" : ""}
                onClick={(e)=>{
                    e.stopPropagation()
                    setBasics('hour')
                }}>시</span>
                <span
                className={basics === 'minute' ? "disabled" : ""}
                onClick={(e)=>{
                    e.stopPropagation()
                    setBasics('minute')
                }}>분</span>
            </div>
            <ul className="ul_listBox">
                <div>
                    {Array(arrayFill).fill("").map((_, index) => {
                        return <li key={index} onClick={(e) => {
                            e.stopPropagation()
                            basics === 'hour' ? setHour(index) : setMinute(30 * index)
                            props.setFormData(el => ({...el, [props.name]: `${padZero(hour)}:${padZero(minute)}`}))
                            props.setError(el => ({...el, [props.name]: false}))
                            validateWorkTime()
                        }}>{basics === 'hour' ? padZero(index) : padZero(30 * index)}</li>
                    })}
                </div>
            </ul>
        </div>
    )
}

TimeDropDown.propTypes = {
    formData: PropTypes.object,
    setFormData: PropTypes.node.isRequired,
    error: PropTypes.object.isRequired,
    setError: PropTypes.node.isRequired,
    name: PropTypes.string.isRequired
} 