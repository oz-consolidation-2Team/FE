import { useState } from "react"
import "./styles/InputDropDown.scss"
import { GoChevronRight, GoChevronDown  } from "react-icons/go";

/**props = {
 * @data 상태관리{} (선택된 값 출력하기 위함)
 * @setData 상태관리 (해당 값을 data에 입력하기 위함)
 * @text string; (항목 구분을 위함)
} */
export default function InputDropDown (props) {
    
    const [viewDropDown, setViewDropDown] = useState(false)
        // 더미데이터
        const data_dropdown = ['1~~~~~~~~~','2~~~~~~~~~','3~~~~~~~~~','4~~~~~~~~~','5~~~~~~~~~']
        return (
            <div className="InputDropDown_container">
                <button 
                className="button_dropDown"
                onClick={() => setViewDropDown(!viewDropDown)}>
                    {props.data[props.text] ? props.data[props.text] : `${props.text}을(를) 선택해주세요`}
                    {viewDropDown ? <GoChevronDown /> : <GoChevronRight />}
                </button>
                {viewDropDown && <ul className="ul_listBox">
                    {data_dropdown.map((item, index) => 
                        <li key={index} onClick={() => {
                            props.setData({...props.data, [props.text]: item})
                            setViewDropDown(false)
                        }}>{item}</li>
                    )}
                    </ul>
                }
            </div>
        )
}