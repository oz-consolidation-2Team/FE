import { useRef, useState } from "react"

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
        <>
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
                {console.log(arrayFill)}
                {Array(arrayFill).fill("").map((_, index) => {
                    return <li key={index} onClick={() => {
                        basics === 'year' ? setYear(date.getFullYear() + index)
                            : basics === 'month' ? setMonth(index + 1) : setDay(index)
                        props.setFormData(el => ({...el, [props.name]: `${year}-${month}-${day}`}))
                        props.setError(el => ({...el, [props.name]: false}))
                    }}>{basics === 'year' ? date.getFullYear() + index
                        : basics === 'month' ? index + 1 : index}</li>
                })}
            </ul>
        </>
    )
}