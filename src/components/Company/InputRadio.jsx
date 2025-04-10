/** props = {
 * type: 복리후생 | 우대조건 | 기타조건 | 상시모집 | 협의가능 | 근무요일협의; (항목 간 타입 지정)
*/
export default function InputRadio (props) {
    const data = {
        복리후생: ['복리1','복리2','복리3','복리4'],
        우대조건: ['동종업계 경력자', '장기근무 경력자', '운전면허 소지자', '차량 소지자', '인근 거주자', '경력단절자', '컴퓨터활용 가능자'],
        기타조건: ['초보 가능', '주부 가능', '직장인 가능', '정규직 전환 가능'],
        근무요일: ['월','화','수','목','금','토','일'],
        근무요일협의: ['협의 가능', '일정에 따른 근무'],
        상시모집: ['상시모집'],
        협의가능: ['협의 가능']
    }
    return (
        <div>
            {data[props.type].map((item, index)=>{
                const random_id = Math.random()
                return (
                    <div key={index}>
                        <input id={random_id} type='checkbox' />
                        <label htmlFor={random_id}>{item}</label>
                    </div>
                )
                })}
        </div>
    )
}