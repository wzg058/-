import axios from 'axios'

export default function (config) {
    const instance = axios.create({
        baseURL: `http://192.168.1.8:8888/api/private/v1/`,
        timeout: 3000,
    });
    instance.interceptors.request.use(function (config) {
        // 在发送请求之前做些什么
        // config.Authorization 
        return config;
    }, function (error) {
        // 对请求错误做些什么
        return Promise.reject(error);
    });
    instance.interceptors.response.use(function (response) {
        // 对响应数据做点什么
        return response.data;
    }, function (error) {
        // 对响应错误做点什么
        return Promise.reject(error);
    });

    return instance(config);
}