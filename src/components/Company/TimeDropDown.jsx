import { useState } from "react";
import PropTypes from 'prop-types';
import { padZero } from "@/utils/validation";

export default function TimeDropDown (props) {
    const [basics, setBasics] = useState('hour')
    const [hour, setHour] = useState(0)
    const [minute, setMinute] = useState(0)

    const arrayFill = basics === 'hour' ? 24 : 6

    return (
        <>
            <div className="div_button_tap">
                <button
                className={basics === 'hour' ? "disabled" : ""}
                onClick={()=>{
                    setBasics('hour')
                }}>시</button>
                <button
                className={basics === 'minute' ? "disabled" : ""}
                onClick={()=>{
                    setBasics('minute')
                }}>분</button>
            </div>
            <ul className="ul_listBox">
                <div>
                    {Array(arrayFill).fill("").map((_, index) => {
                        return <li key={index} onClick={() => {
                            basics === 'hour' ? setHour(index) : setMinute(10 * index)
                            props.setFormData(el => ({...el, [props.name]: `${padZero(hour)}:${padZero(minute)}`}))
                            props.setError(el => ({...el, [props.name]: false}))
                        }}>{basics === 'hour' ? 
                            (index < 10 ? `0` + `${index}` : index)
                            : (`${index === 0 ? 0 : ""}${10 * index}`)}</li>
                    })}
                </div>
            </ul>
        </>
    )
}

TimeDropDown.propTypes = {
    formData: PropTypes.object,
    setFormData: PropTypes.node.isRequired,
    error: PropTypes.object.isRequired,
    setError: PropTypes.node.isRequired,
    name: PropTypes.string.isRequired
} 