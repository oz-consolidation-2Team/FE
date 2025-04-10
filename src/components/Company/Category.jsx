/**
 * props = {
 * @text string; (항목 이름)
 * @essential false | undefind; (필수 유무)
 * }
 */
export default function Category (props) {
    return <p>{props.text}<span>{props.essential === undefined && "*"}</span></p>
}