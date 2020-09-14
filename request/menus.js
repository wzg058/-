import request from './request'

export default function(){
    return request({
        url:'/menus',
        method:'get'
    });
}