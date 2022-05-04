import React, { useContext, useEffect, useState } from 'react';
import {Routes, Route, Redirect, useNavigate, Navigate, useLocation} from "react-router-dom";
import {publicRoutes, adminRoutes} from '../routes';
import { AppContext } from '../hooks/AppContext.js';
import Home from '../pages/Home';
import Login from '../pages/Login';
import LoadingSpinner from './assets/loadingspinner/LoadingSpinner';

export default function AppRouter(){
    const [{user}, {unexpectedAlertData}] = useContext(AppContext);
    const {pathname}  = useLocation();
    const [authRoutes, setAuthRoutes] = useState();

    const navigate = useNavigate();

    useEffect(()=>{
        const routes = adminRoutes.map(({path, Component, ROLES}) => {
            if(ROLES?.length > 0){
                if(user.auth === undefined){
                    return <Route exact key={path} path={path} element={<LoadingSpinner />}/>
                } else if(!user.auth){
                    return <Route exact key={path} path={path} element={<Navigate to={'/login'}/>}/>
                } else if(user?.roles){
                    if(ROLES.filter(role => user?.roles.includes(role)).length > 0){
                        return <Route exact key={path} path={path} element={<Component />}/>
                    } else {
                        return <Route exact key={path} path={path} element={<div>Нет доступа</div>}/>
                    }
                }
            } else {
                <Route exact key={path} path={path} element={<Component />}/>
            }
        });
        setAuthRoutes(routes);
    }, [user]);
    return (
        <Routes>
            {publicRoutes.map(({path, Component}) => <Route exact key={path} path={path} element={<Component />}/>)}
            {authRoutes?.map((Route) => Route)}
            <Route exact path={"*"} element={<div>Страница не найдена</div>}/>
        </Routes>
    );
}