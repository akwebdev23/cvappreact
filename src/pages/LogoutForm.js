

import axios from 'axios';
import React, {useContext, useEffect, useState} from 'react';
import { NavLink } from 'react-router-dom';
import UserService from '../components/API/UserService';
import { AppContext } from '../hooks/AppContext';

function LogoutForm() {
  const [{user, setUser}, {unexpectedAlertData}, Spinner] = useContext(AppContext);
  const logoutHandler = (event) => {
    event.preventDefault();
    UserService.getUserAuthPromise('/logout')
    .then(response => {
      console.dir('LOGOUT');
      console.dir(response);
      setUser({auth: false});
    })
    .catch(response => {
      console.dir('LOGOUT');
      console.dir(response);
      setUser({auth: false});
    });
  }
    return (
      <div className='logout-form'>
        <div className='d-flex justify-content-end'>
          <NavLink to={'/admin'}>
            <div className='btn btn-sm btn-outline-light mr-sm-1 mr-1'>Админ панель</div>
          </NavLink>
          <button onClick={logoutHandler} className='btn btn-sm btn-outline-light mr-sm-auto'>Выйти</button>
        </div>
      </div>
    )
}
export default LogoutForm;
