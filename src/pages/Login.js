

import axios from 'axios';
import React, {useContext} from 'react';
import { AppContext } from '../hooks/AppContext.js';
import AuthComponent from '../components/AuthComponent';

function Login() {    
    return (
      <div className="login">
        <h1>Авторизация</h1>
        <AuthComponent popup={false}/>
      </div>
    );
  
}

export default Login;
