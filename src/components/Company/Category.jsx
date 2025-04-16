import "./styles/Category.scss"

/**
 * props = {
 * @text string; (항목 이름)
 * @essential false | undefind; (필수 유무)
 * }
 */
export default function Category (props) {
    return <div className="Category_condainer">
            <p>{props.text}</p>
            <p className="essential">{props.essential === undefined && "*"}</p>
        </div>
}