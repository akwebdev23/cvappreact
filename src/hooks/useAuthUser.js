import { useEffect, useState } from "react";
import UserService from "../components/API/UserService";

export const useAuthUser = () => {
    const [userData, setUserData] = useState({});
    useEffect(()=>{
        UserService.getUserAuthPromise('/get_user_auth')
        .then(response => {
            console.dir('response');
            console.dir(response);
            response.data.authSuccess 
                ? setUserData({...response?.data?.user, auth: true})
                : setUserData({auth:false});
        })
        .catch(error => {
            console.dir('catch');
            console.dir(error);
        })
    }, [])
    return userData;
}