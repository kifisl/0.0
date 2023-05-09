import axios from "axios";
import { error } from "console";
import { config } from "process";
import { AuthResponse } from "../models/response/AuthResponse";
//import { config } from 'process';
export const API_URL = "http://localhost:5000/api";

const $api = axios.create({
  withCredentials: true, //автоматич куки к запросу
  baseURL: API_URL,
});

$api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
});

$api.interceptors.response.use((config)=>{
  return config;
}, async (error)=>{
  const originalRequest = error.config;
  if(error.response.status==401 && error.config && !error.config._isRetry){
    originalRequest._isRetry = true;
    try{
      const response=await axios.get<AuthResponse>(`${API_URL}/refresh`, {withCredentials:true})
      localStorage.setItem('token', response.data.accessToken);
      return $api.request(originalRequest);
    }catch(e){
      console.log('не авторизован')
    }

  }
  throw error;
})

export default $api;