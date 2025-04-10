import Category from "../Category";
import CategoryTitle from "../CategoryTitle";
import InputText from "../InputText";

export default function AnnouncementContent () {
    return (
    <div>
        <CategoryTitle title='공고 상세 내용' />
        <div>
            <Category text='공고 내용' />
            <InputText text='공고 내용' type='text' />
        </div>
        <div>
            <Category text='이미지 등록' />
            <div>
                <div>파일명 넣는 곳</div>
                <button>파일 선택</button>
            </div>
            <p>PNG, JPG ... 어쩌구 저쩌구 확장자의 파일만 등록할 수 있습니다</p>
        </div>
    </div>
    )
}