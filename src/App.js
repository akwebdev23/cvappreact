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
  const [navToggleClass,  navOpenCloseHandler] = useToggleClass('open');
  const [authToggleClass,  authOpenCloseHandler] = useToggleClass('open-auth');

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
        <header className={mobile ? "header "+"mobile":"header"}>
          <Navbar user={{auth : true}} mobile={mobile} nav={[navToggleClass, navOpenCloseHandler]} auth={[authToggleClass, authOpenCloseHandler]}/>
        </header>
        <main className={mobile ? "main-content container mobile":"main-content container px-0"}>
          <AppRouter />
        </main>
      </AppContext.Provider>
    </BrowserRouter>
  );
}
export default App;