
import userEvent from '@testing-library/user-event';
import React, {useContext} from 'react';
import {NavLink} from 'react-router-dom';
import { useToggleClass } from '../hooks/useToggleClass';
import LoginForm from '../pages/LoginFrom';
import { API_UPLOAD } from '../utils/consts';
import AuthComponent from './AuthComponent'
import { AppContext } from '../hooks/AppContext';

function Navbar({mobile, nav: [navToggleClass, navOpenCloseHandler], auth: [authToggleClass, authOpenCloseHandler]}) {
    const [{user, setUser}] = useContext(AppContext);

    return (
        <nav className={navToggleClass+' navbar navbar-expand-sm bg-muted '+authToggleClass}>
            <div className='navbar-box px-0 container d-sm-flex'>
                {mobile ? 
                    <div onClick={mobile ? navOpenCloseHandler : ()=>false} className='nav-burger-menu'>
                        <img className='nav-burger-menu-img' src={'/icons/burger-menu-primary.png'}/>
                    </div>
                    :''
                }
                <ul className={
                        `navbar-nav pt-3 pt-sm-0 col-12 col-sm-8 px-0
                        d-flex flex-sm-row flex-column 
                        justify-content-between align-items-center`}>
                    <li className="nav-item">
                        <NavLink 
                            className={({isActive})=>
                                (isActive 
                                    ? "nav-link text-primary-trans" 
                                    : "nav-link")+" hover-primary-trans"}
                            to="/"
                        >
                            Main
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink 
                            className={({isActive})=>
                                (isActive 
                                    ? "nav-link text-info" 
                                    : "nav-link")+" hover-info"}
                            to="/skills"
                        >
                            Skills
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink 
                            className={({isActive})=>
                                (isActive 
                                    ? "nav-link text-success" 
                                    : "nav-link")+" hover-success"}
                            to="/experience"
                        >
                            Experience
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink 
                            className={({isActive})=>
                                (isActive 
                                    ? "nav-link text-primary" 
                                    : "nav-link")+" hover-primary"}
                            to="/contacts"
                        >
                            Contacts
                        </NavLink>
                    </li>
                </ul>
                <div className={user.auth ? "mr-4 auth mx-auto ml-sm-auto" : "auth mx-auto mr-sm-0 ml-sm-auto"}>
                    <AuthComponent popup={true}/>
                </div>
                <div className='nav-login d-flex align-items-center' onClick={authOpenCloseHandler}>
                    <span className='nav-login-user_name pr-4 '>{user?.name}</span>
                    <img className='nav-login' src={'/icons/login.png'}/>
                </div>
            </div>
        </nav>
        );
    }

export default Navbar;
