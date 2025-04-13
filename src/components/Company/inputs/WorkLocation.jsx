import Category from "../Category";
import CategoryTitle from "../CategoryTitle";
import InputText from "../InputText";

/**props = {
 * @data 상태관리
 * @setData 상태관리
} */
export default function WorkLocation (props) {
    return (
        <div>
            <CategoryTitle title='근무지 정보' />
            <div>
                <Category text='근무지 주소' />
                <input style={{width: '100px'}} type='button' placeholder="주소지 찾기" />
            </div>
            <div>
                <Category text='근무지명' />
                <InputText text='근무지명' type='text' placeholder={props.data.근무지명} />
            </div>
        </div>
    )
}