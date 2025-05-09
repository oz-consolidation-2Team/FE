import { useState } from "react";
import "./styles/InputImage.scss"
import PropTypes from 'prop-types';

/**props = {
 * @formData 상태관리
 * @setformData 상태관리
} */
export default function InputImage (props) {
    // 그저 파일명 표시하기 위함
    console.log(props.formData)
    const [img, setImg] = useState(props.formData['postings_image'])

    const onchangeImageUpload = (e) => {
        setImg(e.target.files[0].name)
        props.setFormData((el) => ({
            ...el,
            image_file: e.target.files[0],
        }))
        props.setError({
            ...props.error,
            image_file: false
        })
    }

    return (
        <div className="InputImage_container">
            <div className="div_box">
                <input id='input_for_button' type='file' accept=".jpg,.jpeg,.png" onChange={onchangeImageUpload} />
                <div>{img || "선택된 파일이 없습니다"}</div>
                <label htmlFor="input_for_button" className="color">파일 선택</label>
            </div>
            <p>jpg, jpeg, png 파일만 등록할 수 있습니다</p>
        </div>
    )
}

InputImage.propTypes = {
    formData: PropTypes.object,
    setFormData: PropTypes.node.isRequired,
    error: PropTypes.object,
    setError: PropTypes.node
}