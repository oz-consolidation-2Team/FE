import DaumPostcode from 'react-daum-postcode';
import "@/components/Company/styles/modal/DaumLocation.scss"

export default function DaumLocation (props) {
    const completeHandler = (data) => {
        // console.log(data)
        console.log('도로명주소 : ' + data.roadAddress);
        console.log('지번주소 : ' + data.jibunAddress);
        console.log('우편번호 : ' + data.zonecode);
        props.setFormData(el => ({
            ...el,
            work_address: data.roadAddress
        }))
        props.setError(el => ({
            ...el,
            work_address: false
        }))
        props.setShowModal(false)
    }

    return (
        <div className='modal_overlay'>
            <div className='DaumLocation_container'>
                <DaumPostcode 
                style={{height: '500px'}}
                onComplete={completeHandler}
                />
            </div>
        </div>
    )
}