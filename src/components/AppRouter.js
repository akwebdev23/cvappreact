import React from 'react';
import {Routes, Route} from "react-router-dom";
import {publicRoutes, adminRoutes} from '../routes';

export default function AppRouter(){
    return (
        <Routes>
            {publicRoutes.map(({path, Component}) => <Route exact key={path} path={path} element={<Component/>}/>)}
            {adminRoutes.map(({path, Component}) => <Route exact key={path} path={path} element={<Component/>}/>)}
        </Routes>
    );
}