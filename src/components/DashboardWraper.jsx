
import {Link} from "react-router-dom";

export function DashboardWrapper ({children}){
    return(
        <div>
            <div>Logotipo</div>
            <Link to="/dashboard">Links</Link>
            <Link to="/dashboard/profile">Profile</Link>
            <Link to="/signout">Signout</Link>
            <div>
                {children}
            </div>
        </div>
    )
}