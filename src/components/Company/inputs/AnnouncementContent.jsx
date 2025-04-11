import Category from "../Category";
import CategoryTitle from "../CategoryTitle";
import InputImage from "../InputImage";
import InputText from "../InputText";

/**props = {
 * @data 상태관리
 * @setData 상태관리
} */
export default function AnnouncementContent (props) {
    return (
    <div>
        <CategoryTitle title='공고 상세 내용' />
        <div>
            <Category text='공고 내용' />
            <InputText {...props} text='공고 내용' type='text' placeholder={props.data.공고내용} />
        </div>
        <div>
            <Category text='이미지 등록' />
            <InputImage {...props} />
        </div>
    </div>
    )
}