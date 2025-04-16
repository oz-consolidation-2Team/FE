import Category from "../Category";
import CategoryTitle from "../CategoryTitle";
import InputText from "../InputText";
import "../styles/inputs/WorkLocation.scss"

/**props = {
 * @data 상태관리
 * @setData 상태관리
} */
export default function WorkLocation (props) {
    return (
        <div className="WorkLocation_container">
            <CategoryTitle title='근무지 정보' />
            <div className="box">
                <Category text='근무지 주소' />
                <input 
                className="search"
                style={{width: '100px'}} type='button' placeholder="주소지 찾기" />
            </div>
            <div className="box">
                <Category text='근무지명' />
                <InputText text='근무지명' type='text' placeholder={props.data.근무지명} />
            </div>
        </div>
    )
}