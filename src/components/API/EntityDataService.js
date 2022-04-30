import { API_HOST } from "../../utils/consts";
import axios from "axios";

export default class EntityDataService{
    static async get(url){
        const response = await axios.get(API_HOST+url);
        return response.data.status === 'error' 
            ? [response.data, false]
            : [response.data.data, true];
    };
    static async create(url, data){
        const response = await axios.post(
                API_HOST+url, data,
                {headers: {'Content-Type' : 'multipart/form-data'}}
            );
        return response.data.status === 'error' 
            ? [response.data, false]
            : [response.data.data, true];
    };
}