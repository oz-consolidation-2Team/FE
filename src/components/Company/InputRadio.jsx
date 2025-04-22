import "./styles/InputRadio.scss"
import PropTypes from 'prop-types';

/**
 * @param {복리후생, 우대조건, 기타조건, 상시모집, 협의가능, 근무요일, 근무요일협의, 근무요일변동} type 표시할 그룹체크박스 
/* @param {string} name input 변수 전달
*/
export default function InputRadio (props) {
    const handleClick = e => {
        const label = e.target.closest('label');
        const text = label.textContent.trim()
        const NAME_TYPE_ARRAY = ['benefits', 'preferred_conditions', 'other_conditions', 'work_days']

        let value;
        if (NAME_TYPE_ARRAY.indexOf(e.target.name) === -1) value = e.target.checked
        else value = new Set([
            ...props.formData[e.target.name],
            text
        ]);

        props.setFormData({
            ...props.formData,
            [e.target.name]: typeof value === 'boolean' ? value : [...value],
        })
    }
    const DATA = {
        복리후생: ['복리1','복리2','복리3','복리4'],
        우대조건: ['동종업계 경력자', '장기근무 경력자', '운전면허 소지자', '차량 소지자', '인근 거주자', '경력단절자', '컴퓨터활용 가능자'],
        기타조건: ['초보 가능', '주부 가능', '직장인 가능', '정규직 전환 가능'],
        근무요일: ['월','화','수','목','금','토','일'],
        근무요일협의: ['협의 가능'],
        근무요일변동: ['일정에 따른 근무'],
        상시모집: ['상시모집'],
        협의가능: ['협의 가능']
    }
    return (
        <div className="InputRadio_container">
            {DATA[props.type].map((item, index)=>{
                return (
                    <label className="div_checkBoxs" key={index}>
                        <input type='checkbox' name={props.name} onChange={handleClick}/>
                        {item}
                    </label>
                )
                })}
        </div>
    )
}

InputRadio.propTypes = {
    formData: PropTypes.object,
    setFormData: PropTypes.node.isRequired,
    error: PropTypes.object,
    setError: PropTypes.node.isRequired,
    name: PropTypes.string.isRequired,
    
    type: PropTypes.oneOf(['복리후생', '우대조건', '기타조건', '상시모집', '협의가능', '근무요일', '근무요일협의', '근무요일변동'])
}