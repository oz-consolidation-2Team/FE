import { useState } from "react"

export default function TimeDropDown (props) {
    const [basics, setBasics] = useState('hour')
    const [hour, setHour] = useState(0)
    const [minute, setMinute] = useState(0)

    const arrayFill = basics === 'hour' ? 24 : 6

    return (
        <>
            <div>
                <button
                onClick={()=>{
                    setBasics('hour')
                }}>시</button>
                <button
                onClick={()=>{
                    setBasics('minute')
                }}>분</button>
            </div>
            <ul className="ul_listBox">
                <div>
                    {Array(arrayFill).fill("").map((_, index) => {
                        return <li key={index} onClick={() => {
                            basics === 'hour' ? setHour(index) : setMinute(10 * index)
                            props.setFormData(el => ({...el, [props.name]: `${hour}:${minute}`}))
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