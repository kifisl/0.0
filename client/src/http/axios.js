import axios from 'axios';
//import { config } from 'process';
export const API_URL='http://localhost:5000/api'

const $api=axios.create({
    withCredentials: true, //автоматич куки к запросу
    baseURL: API_URL    
})

$api.interceptors.request.use((config)=>{
    config.headers.Authorization=`Bearer ${localStorage.getItem('token')}`
    return config;
})

export default $api;