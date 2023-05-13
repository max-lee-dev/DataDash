export default function NavBar(){
    const path = window.location.pathname
    return <nav className="nav">
        <a href="/" className="site-title">
            DataDash
        </a>
        <ul>
            <CustomLink href="/dashboard">Dashboard</CustomLink>
            <CustomLink href="/login">Login</CustomLink>
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