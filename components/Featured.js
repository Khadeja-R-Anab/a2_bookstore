export default function Featured({title, description, click}) {
    return(
        <div className="featured" onClick={click}>
            <h2>{title}</h2>
            <p>{description}</p>
        </div>
    )
}