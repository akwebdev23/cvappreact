import { API_HOST } from "../../utils/consts";
import axios from "axios";

export default class UserService{
    
    static registerPromise(url, userData){
        // const responseData = [];
        return axios.post(
            API_HOST+url,
            JSON.stringify(userData),
            {headers: {'Content-Type' : 'application/json'}}
        )
    }
    static loginPromise(url, userData){
        // const responseData = [];
        return axios.post(
            API_HOST+url,
            JSON.stringify(userData),
            {headers: {'Content-Type' : 'application/json'}, withCredentials: true}
        )
    }
    static getUserAuthPromise(url){
        return axios.get(
            API_HOST+url,
            {withCredentials: true}
        )
    }
}
