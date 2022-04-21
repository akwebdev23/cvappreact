import React, {useEffect, useState} from "react";
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import Navbar from "./components/Navbar";
import './App.css';

function App() {
  const [mobile, setMobile] = useState(false);

  useEffect(()=>{
    window.onresize = () => {
      setMobile(window.outerWidth < 576 ? true : false);
    }
    let state = window.outerWidth < 576 ? true : false;
    setMobile(state);
  })
  return (
    <BrowserRouter>
      <Navbar mobile={mobile}/>
      <AppRouter/>
    </BrowserRouter>
  );
}
export default App;