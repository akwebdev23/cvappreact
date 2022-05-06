import React, {useEffect, useState} from "react";
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import Navbar from "./components/Navbar";
import UserService from "./components/API/UserService";

import './App.css';
import { useAuthUser } from "./hooks/useAuthUser";
import { AppContext } from "./hooks/AppContext";
import { useToggleClass } from "./hooks/useToggleClass";
import LoadingSpinner from "./components/assets/loadingspinner/LoadingSpinner";
import LoadingSpinnerCircle from "./components/assets/loadingspinnerCircle/LoadingSpinnerCircle";

function App() {
  const [mobile, setMobile] = useState(false);
  const [user, setUser] = useState({});
  const [navToggleClass,  navOpenCloseHandler] = useToggleClass('open', 
    ['navbar'], 
    ['nav-login', 'nav-burger-menu', 'btn', 'input', 'alert-close', 'alert-box', 'alert']);
  
  const [authToggleClass,  authOpenCloseHandler] = useToggleClass('open-auth');
  const closeHandler = (event) =>{
    console.dir(event);
    navOpenCloseHandler(event, true);
    authOpenCloseHandler(event, true);
  }

  const userData = useAuthUser();
  const unexpectedAlertData = {
    messages: 'Непредвиденная ошибка. Попробуйте воспользоваться сервисом позже.',
    color: 'danger',
    show: true
  };

  useEffect(()=>{
    setUser(userData);
    console.dir('app use effect userData, user');
    console.dir(userData);
    console.dir(user);
  }, [userData])

  useEffect(()=>{
    window.onresize = () => {
      setMobile(window.outerWidth < 576 ? true : false);
    }
    let state = window.outerWidth < 576 ? true : false;
    setMobile(state);
  }, [])
  return (
    <BrowserRouter>
      <AppContext.Provider value={[{user, setUser}, {unexpectedAlertData}, mobile ?  LoadingSpinnerCircle : LoadingSpinner]}>
        <div className="d-flex flex-column align-items-center">
          <header className={mobile ? "header "+"mobile":"header"}>
            <Navbar user={{auth : true}} mobile={mobile} nav={[navToggleClass, navOpenCloseHandler]} auth={[authToggleClass, authOpenCloseHandler]}/>
          </header>
          <main onClick={closeHandler} className={mobile ? "main-content container flex-shrink mobile":"main-content container px-0"}>
            <AppRouter />
          </main>
          <footer className="mt-auto container d-flex px-0">
            <div className="d-flex justify-content-center align-items-end mx-auto"><span className="mx-auto">akwb &#169; 2022</span></div>
          </footer>
        </div>
      </AppContext.Provider>
    </BrowserRouter>
  );
}
export default App;