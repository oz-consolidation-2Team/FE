import Hr from "@/utils/Hr"
import "./styles/CategoryTitle.scss"

/**
 * @param {string} title 섹션분류를 위한 제목
 * @returns 
 */
export default function CategoryTitle (props) {
    return (
        <div className="CategoryTitle_condainer">
            <span className="title">{props.title}</span>
            <Hr />
        </div>
        )
}