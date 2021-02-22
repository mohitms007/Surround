import React, {useContext} from "react";
import {withRouter, NavLink} from 'react-router-dom'
import {FirebaseContext} from "../firebase";

function Header() {
    const {user, firebase} = useContext(FirebaseContext)
    return (

        <div className="header">
            <div className="logo-container">
                <NavLink to="/" className="header-title">
                    Surround
                </NavLink>
            </div>
            <div className="navlinks">
                <NavLink to="/" className="header-link">
                    New
                </NavLink>
                <div className="divider"></div>
                <NavLink to="/top" className="header-link">
                    Top
                </NavLink>
                <div className="divider"></div>
                <NavLink to="/search" className="header-link">
                    Search
                </NavLink>
                {user && (
                <>
                    <div className="divider"></div>
                    <NavLink to="/create" className="header-link">
                        Add
                    </NavLink>
                </>)
                }
                <div className="divider"></div>
                { user ? (
                    <>
                     <div className="header-name link">{user.displayName}</div>
                     <div className="divider">|</div>
                     <NavLink to="/" className="header-link" onClick={() => firebase.logout()}> Logout </NavLink>
                    </>
                ) : <NavLink to="/login" className="header-link">
                    Login
                </NavLink>}
                 
            </div>
        </div>

    )
}

export default withRouter(Header);
