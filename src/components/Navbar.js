
import React from 'react';
import {NavLink} from 'react-router-dom';
import { useToggleClass } from '../hooks/useToggleClass';
import { API_UPLOAD } from '../utils/consts';

function Navbar({mobile}) {
    const [toggleClass,  openCloseHandler] = useToggleClass('open', false, ['navbar', 'nav-burger-menu', 'navbar-nav', 'img']);
    return (
        <nav className={toggleClass+' navbar navbar-expand-sm bg-muted pb-sm-2 pb-4 container'} 
                onClick={mobile ? openCloseHandler : ()=>false}>
            <div className='navbar-box col-12'>
                {mobile ? 
                    <div className='nav-burger-menu'>
                        <img className='nav-burger-menu-img' src={API_UPLOAD+'assets/icons/burger-menu-primary.png'}/>
                    </div>
                    :''
                }
                <ul className={
                        `navbar-nav pt-3 pt-sm-0 col-12 col-sm-8 px-0
                        d-flex flex-sm-row flex-column 
                        justify-content-between align-items-center`}>
                    <li className="nav-item">
                        <NavLink className="nav-link hover-prim" to="/">Main</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link hover-primary" to="/skills">Skills</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link hover-info" to="/experience">Experience</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link hover-success" to="/contacts">Contacts</NavLink>
                    </li>
                </ul>
            </div>
        </nav>
        );
    }

export default Navbar;
