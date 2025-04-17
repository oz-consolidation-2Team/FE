import "./styles/InputImage.scss"

/**props = {
 * @formData 상태관리
 * @setformData 상태관리
} */
export default function InputImage (props) {
    return (
        <div className="InputImage_container">
            <div className="box">
                <div>{props.formData.이미지등록 || "선택된 파일이 없습니다"}</div>
                <button className="color-change">파일 선택</button>
            </div>
            <p>PNG, JPG ... 어쩌구 저쩌구 확장자의 파일만 등록할 수 있습니다</p>
        </div>
    )
}