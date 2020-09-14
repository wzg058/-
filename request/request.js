import axios from 'axios'
import { Message } from 'element-ui'
export default function (config) {
    const instance = axios.create({
        baseURL: `http://192.168.1.13:8888/api/private/v1/`,
        timeout: 3000,
    });
    instance.interceptors.request.use((config)=>{
        let Authorization = sessionStorage.getItem('Authorization');
        if(Authorization){
            config.headers.Authorization =  Authorization
        };
        return config;
    }, function (error) {
        // 对请求错误做些什么
        return Promise.reject(error);
    });
    instance.interceptors.response.use((response)=>{
        // 对响应数据做点什么
        if(response.data.meta.status !== 200){
            Message({
                message:response.data.meta.msg,
                duration:1000,
                type:'error'
            });
        }
        return response.data;
    }, function (error) {
        // 对响应错误做点什么
        return Promise.reject(error);
    });

    return instance(config);
}