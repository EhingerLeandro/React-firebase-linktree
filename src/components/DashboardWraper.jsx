
import {Link} from "react-router-dom";
import "../components/DashboardWrapper.css";
import logo from "../images/pic_link_tree.png";

export function DashboardWrapper ({children}){
    return(
        <div className="containWrapper">
            <div className="outLikeNavbar">
                <div className="likeNavbar">
                    <Link to="/">
                        <img className="logo" src={logo}/>
                    </Link>
                    <Link className="links" to="/dashboard">Links</Link>
                    <Link className="links" to="/dashboard/profile">Profile</Link>
                    <Link className="links" to="/signout">Signout</Link>
                </div>
            </div>
            <div className="outContainForm">
                <div className="containForm">
                    {children}
                </div>
            </div>
        </div>
    )
}