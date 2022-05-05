
import axios from 'axios';
import React, {useState} from 'react';
import EntityDataService from '../components/API/EntityDataService';
import UserService from '../components/API/UserService';
import { API_HOST, REGISTRATION_ROUTE } from '../utils/consts';
import Alert from '../components/assets/alert/Alert';

function Registration(unexpectedAlertData) {
  const [userData, setUserData] = useState({});
  const [alertData, setAlertData] = useState({});

  const alertCloseHandler = () => {
    setAlertData({});
  }
  const onChangeHandler = (event) => {
    setUserData({...userData, [event.target.name]: event.target.value});
  }
  const registrationSubmit = (event) => {
    event.preventDefault();
    console.dir(userData);
    console.dir(alertData);
    UserService.registerPromise(REGISTRATION_ROUTE, userData)
    .then(response => {
      console.dir('response');
      console.dir(response);
      if(response.data.status === 'validation_fail'){
        setAlertData({messages: response.data.messages, color: 'warning', show: true});
        return;
      } else if(response.data.status === 'ok'){
        setUserData({});
        setAlertData({messages: response.data.messages, color: 'success', show: true});
      }
    })
    .catch(error => {
        console.dir('catch');
        console.dir(error);
        setAlertData(unexpectedAlertData);
    })
  }
  return (
    <div className="registration">
        <h1>Регистрация</h1>
        {alertData?.show ? <Alert alertData={alertData} setAlertData={setAlertData} messages={alertData.messages} color={alertData.color}/>:''}

        <div className='registration-form_box'>
          <form onSubmit={registrationSubmit} method='POST' className='registration-form'>
            <input onChange={onChangeHandler} value={userData.email ? userData.email : ''} className='form-control my-2' placeholder='Введите email' type="text" name="email" required/>
            <input onChange={onChangeHandler} value={userData.password ? userData.password : ''} className='form-control my-2' placeholder='Введите пароль' type="password" name="password" required/>
            <input onChange={onChangeHandler} value={userData.name ? userData.name : ''} className='form-control my-2' placeholder='Введите имя' type="text" name="name" required/>
            <div className='d-flex'>
              <input className='btn btn-outline-light' value="Отправить" type="submit" name="submit" required/>
            </div>
          </form>
        </div>
    </div>
  );
}

export default Registration;
