import Category from "../Category";
import CategoryTitle from "../CategoryTitle";
import InputText from "../InputText"

/**props = {
 * @data 상태관리
 * @setData 상태관리
} */
export default function AnnouncementTitle (props) {
    return (
        <div>
            <CategoryTitle title="공고제목" />
            <div>
                <Category text='공고제목' />
                <InputText text='공고 제목' type='text' placeholder={props.data.공고제목} />
            </div>
                <Category text='근무요약' />
                <InputText text='근무 요약' type='text' placeholder={props.data.근무요약}/>
        </div>
    )
}