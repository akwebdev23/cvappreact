
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
        <nav onClick={mobile ? navOpenCloseHandler : ()=>false} className={navToggleClass+' navbar navbar-expand-sm bg-muted '+authToggleClass}>
            <div className='navbar-box px-0 container d-sm-flex'>
                {mobile ? 
                    <div onClick={mobile ? navOpenCloseHandler : ()=>false} className='nav-burger-menu'>
                        <img className='nav-burger-menu-img' src={'/icons/burger-menu-primary.png'}/>
                    </div>
                    :''
                }
                <ul className={
                        `navbar-nav pt-3 pt-sm-0 col-12 col-sm-6 px-0
                        d-flex flex-md-row flex-column 
                        justify-content-md-between align-items-center`}>
                        <NavLink 
                            className={({isActive})=>
                                (isActive 
                                    ? ("nav-link text-primary-trans " + (navToggleClass ? "" : "nav-link-active-order")) 
                                    : "nav-link")
                                +" hover-primary-trans pl-0"}
                            to="/"
                        >
                            <li className="nav-item mr-sm-3 mr-md-0">
                                Main
                            </li>
                        </NavLink>
                    
                        <NavLink 
                            className={({isActive})=>
                                (isActive 
                                    ? ("nav-link text-info "+ (navToggleClass ? "" : "nav-link-active-order")) 
                                    : "nav-link")+" hover-info pl-0"}
                            to="/skills"
                        >
                            <li className="nav-item mr-sm-3 mr-md-0">  
                                Skills
                            </li>
                        </NavLink>
                    
                        <NavLink 
                            className={({isActive})=>
                                (isActive 
                                    ? ("nav-link text-success "+ (navToggleClass ? "" : "nav-link-active-order"))
                                    : "nav-link")+" hover-success pl-0"}
                            to="/experience"
                        >
                            <li className="nav-item mr-sm-3 mr-md-0">   
                                Experience
                            </li>
                        </NavLink>
                        <NavLink 
                            className={({isActive})=>
                                (isActive 
                                    ? ("nav-link text-primary "+ (navToggleClass ? "" : "nav-link-active-order")) 
                                    : "nav-link")+" hover-primary pl-0"}
                            to="/contacts"
                        >
                            <li className="nav-item mr-sm-3 mr-md-0">   
                                Contacts
                            </li>
                        </NavLink>
                    
                </ul>
                <div className={user.auth ? "auth pr-sm-4 pr-0 mr-4 mx-auto ml-sm-auto mr-sm-0 align-self-sm-end align-self-md-center" : "auth mx-auto mr-sm-0 ml-sm-auto"}>
                    <div className={'nav-login-user_name'}>{user?.name}</div>
                    <AuthComponent popup={true}/>
                </div>
                <div className='nav-login d-flex align-items-center' onClick={authOpenCloseHandler}>
                    <img className='nav-login' src={'/icons/login.png'}/>
                </div>
            </div>
        </nav>
        );
    }

export default Navbar;
