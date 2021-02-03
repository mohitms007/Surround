import React from "react";
import {withRouter, Navlink, NavLink} from 'react-router-dom'

function Header() {
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
                <div className="divider"></div>
                <NavLink to="/credit" className="header-link">
                    Submit
                </NavLink>
                <div className="divider"></div>
                <NavLink to="/login" className="header-link">
                    Login
                </NavLink>
         </div> 
        </div>

    )
}

export default withRouter(Header);
