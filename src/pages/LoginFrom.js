

import axios from 'axios';
import React, {useContext, useEffect, useState} from 'react';
import EntityDataService from '../components/API/EntityDataService';
import { API_HOST, REGISTRATION_ROUTE, LOGIN_ROUTE } from '../utils/consts';
import Alert from '../components/assets/alert/Alert';
import UserService from '../components/API/UserService';
import {Navigate, useHref, useNavigate, Link} from 'react-router-dom';
import LoadingSpinner from '../components/assets/loadingspinner/LoadingSpinner';
import { AppContext } from '../hooks/AppContext.js';
import LoadingSpinnerCircle from '../components/assets/loadingspinnerCircle/LoadingSpinnerCircle';

function LoginForm({popup}) {
  const [userData, setUserData] = useState({});
  const [alertData, setAlertData] = useState({});
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [{user, setUser}, {unexpectedAlertData}, Spinner] = useContext(AppContext);
  const navigate = useNavigate();
  useEffect(()=>{
    console.dir('LOGIN user');
    console.dir(user);
    if(user.auth !== undefined)
      setCheckingAuth(false);
    if(user.auth == true)
      navigate('/');
  }, [user]);
  // const alertCloseHandler = () => {
  //   setAlertData({});
  // }
  const onChangeHandler = (event) => {
    setUserData({...userData, [event.target.name]: event.target.value});
  }
  const loginSubmit = (event) => {
    event.preventDefault();
    console.dir(userData);
    console.dir(alertData);

    setCheckingAuth(true);
    UserService.loginPromise(LOGIN_ROUTE, userData)
    .then(response => {
      console.dir('response');
      console.dir(response);

      if(response.data.status === 'validation_fail')
        setAlertData({messages: response.data.messages, color: 'warning', show: true});
      else if(response.data.status === 'ok')
        setUser({...response.data.user, auth:true});
      else if(response.data.status === 'error')
        setAlertData({messages: response.data.messages, color: 'danger', show: true});

      setCheckingAuth(false);
    })
    .catch(error => {
      console.dir('catch');
      console.dir(error);
      setAlertData(unexpectedAlertData);
      setCheckingAuth(false);
    })
  }
  if(checkingAuth)
    return (<div className='d-flex justify-content-center mr-sm-4'><LoadingSpinnerCircle/></div>);
  else
    return (
      <div className="login-form">
        {alertData?.show ? <Alert alertData={alertData} setAlertData={setAlertData} messages={alertData.messages} color={alertData.color}/>:''}
        <div className='login-form_box'>
          <form onSubmit={loginSubmit} method='POST' className='login-form'>
            <input onChange={onChangeHandler} value={userData.email ? userData.email : ''} className='p-1 px-2 form-control my-2' placeholder='Введите email' type="text" name="email" required/>
            <input onChange={onChangeHandler} value={userData.password ? userData.password : ''} className='p-1 px-2 form-control my-2' placeholder='Введите пароль' type="password" name="password" required/>
            <div className='d-flex justify-content-center justify-content-sm-end'>
              <input className={'btn btn-outline-light px-2 mr-1 '+ (popup ? 'btn-sm' : '') } value="Войти" type="submit" name="submit" required/>
              <Link to={'/registration'} className={'btn btn-outline-light px-2 '+ (popup ? 'btn-sm mr-sm-auto' : 'mr-auto') }>
                Регистрация
              </Link>
            </div>
          </form>
        </div>
      </div>
    )
  
}

export default LoginForm;
