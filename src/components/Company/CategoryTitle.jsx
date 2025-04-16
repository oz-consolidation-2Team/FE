import "./styles/CategoryTitle.scss"

/**props = {
 * title: string;
} */
export default function CategoryTitle (props) {
    return (
        <div className="CategoryTitle_condainer">
            <span className="title">{props.title}</span>
            <hr />
        </div>
        )
}