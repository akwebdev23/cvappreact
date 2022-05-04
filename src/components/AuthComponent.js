

import axios from 'axios';
import React, {useContext, useEffect, useState} from 'react';
import EntityDataService from './API/EntityDataService';
import { API_HOST, REGISTRATION_ROUTE, LOGIN_ROUTE, LOGOUT_ROUTE } from '../utils/consts';
import Alert from './assets/alert/Alert';
import UserService from './API/UserService';
import {Navigate, useHref, useNavigate, NavLink} from 'react-router-dom';
import LoadingSpinner from './assets/loadingspinner/LoadingSpinner';
import { AppContext } from '../hooks/AppContext.js';
import LoginForm from '../pages/LoginFrom';
import LogoutForm from '../pages/LogoutForm';

function AuthComponent({popup}) {
  const [{user, setUser}, {unexpectedAlertData}, spinner] = useContext(AppContext);
    if(user.auth)
      return (
        <div className={popup ? 'nav-logout-popup':'nav-logout-no_popup'}>
          <LogoutForm popup={popup}/>
        </div>
      )
    else
      return (
        <div className={popup ? 'nav-login-popup':'nav-login-no_popup'}>
            <LoginForm popup={popup}/>
        </div>
      );
  
}

export default AuthComponent;
