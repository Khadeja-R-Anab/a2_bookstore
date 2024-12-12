export default function Button({text, route, type}){
    return (
        <>
            <button onClick={route} type={type}>{text}</button>
        </>
    )
}