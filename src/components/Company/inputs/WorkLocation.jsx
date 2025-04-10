import Category from "../Category";
import CategoryTitle from "../CategoryTitle";
import InputText from "../InputText";

export default function WorkLocation () {
    return (
        <div>
            <CategoryTitle title='근무지 정보' />
            <div>
                <Category text='근무지 주소' />
                <input style={{width: '100px'}} type='button' placeholder="주소지 찾기" />
            </div>
            <div>
                <Category text='근무지명' />
                <InputText text='근무지명' type='text' />
            </div>
        </div>
    )
}