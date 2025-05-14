import DaumPostcode from 'react-daum-postcode';
import "@/components/Company/styles/modal/DaumLocation.scss"
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { IoCloseSharp } from "react-icons/io5";

/**
 * @param {*} setFormData input값 저장
 * @param {*} setError 유효성검사
 * @param {*} setShowModal 모달찯 닫기 위함
 */
export default function DaumLocation (props) {
    const [location, setLocation] = useState(null)
    const [latitude, setLatitude] = useState(null)
    const [longitude, setLongitude] = useState(null)

    const daumPostcode = (data) => {
        setLocation(data)

        const geocoder = new window.kakao.maps.services.Geocoder();
        geocoder.addressSearch(data.roadAddress, (result, status) => {
        if (status === window.kakao.maps.services.Status.OK) {
            setLatitude(result[0].y)
            setLongitude(result[0].x)
        } else {
            console.error('좌표 검색 실패', status);
            }
    })
    }

    useEffect(()=>{
        if (!location) return
        props.setFormData(el => ({
            ...el,
            work_address: location.roadAddress,
            region1: location.sido,
            region2: location.sigungu,
            latitude: latitude,
            longitude: longitude
        }))
        props.setError(el => ({
            ...el,
            work_address: false
        }))
        props.setShowModal(false)
    },[latitude,longitude])

    return (
        <div className='modal_overlay'>
            <div className='DaumLocation_container'>
                <IoCloseSharp className='icon_close' onClick={()=>props.setShowModal(false)}/>
                <DaumPostcode 
                style={{height: '500px'}}
                onComplete={daumPostcode}
                />
            </div>
        </div>
    )
}

DaumLocation.propTypes = {
    setFormData: PropTypes.string.isRequired,
    setError: PropTypes.node.isRequired,
    setShowModal: PropTypes.node.isRequired
}