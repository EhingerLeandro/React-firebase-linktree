export function PublicLink ({url, title}){
    return(
    <div>
        <a target="blank" href={url}>{title}</a>
    </div>
    )
}