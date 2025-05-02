import { useState } from "react";
import "./styles/InputImage.scss"
import PropTypes from 'prop-types';

/**props = {
 * @formData 상태관리
 * @setformData 상태관리
} */
export default function InputImage (props) {
    // 그저 파일명 표시하기 위함
    const [img, setImg] = useState(null)

    const onchangeImageUpload = (e) => {
        setImg(e.target.files[0].name)
        // const fileName = URL.createObjectURL(e.target.files[0]);
        // if (!fileName) return;
        props.setFormData((el) => ({
            ...el,
            image_file: e.target.files[0]
        }))
    }

    return (
        <div className="InputImage_container">
            <div className="div_box">
                <input id='input_for_button' type='file' accept = "image/*" onChange={onchangeImageUpload} />
                <div>{img || "선택된 파일이 없습니다"}</div>
                <label htmlFor="input_for_button" className="color-change">파일 선택</label>
            </div>
            <p>PNG, JPG ... 어쩌구 저쩌구 확장자의 파일만 등록할 수 있습니다</p>
        </div>
    )
}

InputImage.propTypes = {
    formData: PropTypes.object,
    setFormData: PropTypes.node.isRequired
}