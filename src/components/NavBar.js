export default function NavBar(){
    const path = window.location.pathname
    return <nav className="nav">
        <a href="/" className="site-title">
            DataDash
        </a>
        <ul>
            <CustomLink href="/About">About</CustomLink>
            <CustomLink href="/login">Login</CustomLink>
            <div className="nav a:before" />


        </ul>
    </nav>
}

function CustomLink({href, children, ...props}){
    const path = window.location.pathname
    return (
        <li className = {path === href? "active" : ""}>
            <a href = {href}{...props}>{children}</a>
        </li> 
    )
}