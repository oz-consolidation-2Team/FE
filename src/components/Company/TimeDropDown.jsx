import { useEffect, useRef, useState } from "react";
import PropTypes from 'prop-types';
import { padZero } from "@/utils/validation";

export default function TimeDropDown (props) {

    const [basics, setBasics] = useState('hour')
    const [hour, setHour] = useState(initTime('hour'))
    const [minute, setMinute] = useState(initTime('minute'))
    const didMount = useRef(false)

    const arrayFill = basics === 'hour' ? 24 : 2

    function initTime (unit) {
        const startTime = props.formData['work_start_time'].split(':')
        const endTime = props.formData['work_end_time'].split(':')
        const isStartType = props.name === 'work_start_time'

        if (isStartType) return Number(startTime[unit === 'hour' ? 0 : 1]) || 0
        else return Number(endTime[unit === 'hour' ? 0 : 1]) || Number(startTime[unit === 'hour' ? 0 : 1]) || 0
        
    }

    const validateWorkTime = (endTime) => {
        if (props.name === 'work_start_time') return true
        if (props.formData['work_start_time'] > endTime) {
            alert(`시작시간보다 이전인 시간은 선택할 수 없습니다
                시작 시간: ${props.formData['work_start_time']}
                선택 시간: ${endTime}`)
            return false
        }
        else return true
        }

    useEffect(()=>{
        if (!didMount.current) {
            const endTime = `${padZero(hour)}:${padZero(minute)}`
            
            if (!validateWorkTime(endTime)) return

            props.setFormData(el => ({...el, [props.name]: endTime}))
            props.setError(el => ({...el, [props.name]: false}))
        }
        else didMount.current = true
    },[hour, minute])

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