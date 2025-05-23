import { useState } from "react";
import Category from "../Category";
import CategoryTitle from "../CategoryTitle";
import InputText from "../InputText";
import "../styles/inputs/WorkLocation.scss"
import DaumLocation from "../Modal/DaumLocation";
import PropTypes from 'prop-types';

/**
 * @param {상태관리} formData input값 저장
 * @param {상태관리} error 유효성검사
 */
export default function WorkLocation (props) {
    const [showModal, setShowModal] = useState(false)
    
    return (
        <div className="WorkLocation_container">
            <CategoryTitle title='근무지 정보' />
            <div className="div_box">
                <Category text='근무지 주소' />
                <button
                className="search"
                onClick={() => setShowModal(true)}
                >{props.formData['work_address'] || "주소지 찾기" }</button>
            </div>
            {props.error['work_address'] && <span className="error_message">근무지주소를 입력해주세요</span>}

            <div className="div_box">
                <Category text='근무지명' />
                <InputText {...props} text='근무지명' type='text' name='work_place_name' placeholder={props.formData.work_place_name} />
            </div>
            {props.error['work_place_name'] && <span className="error_message">근무지명을 입력해주세요</span>}        
        
            {showModal && <DaumLocation {...props} setShowModal={setShowModal} />}
        </div>
    )
}

WorkLocation.propTypes = {
    formData: PropTypes.object,
    setFormData: PropTypes.node.isRequired,
    error: PropTypes.object,
    setError: PropTypes.node.isRequired
} 