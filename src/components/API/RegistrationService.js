import { API_HOST } from "../../utils/consts";
import axios from "axios";

export default class RegistrationService{
    
    static registerPromise(url, userData){
        // const responseData = [];
        return axios.post(
            API_HOST+url,
            JSON.stringify(userData),
            {headers: {'Content-Type' : 'application/json'}}
        )
    }

}
