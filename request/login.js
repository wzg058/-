import request from './request'

export default (user,pass)=>{
    return request({
        url:'/login',
        method:'post',
        data:{
            username:user,
            password:pass
        }
    });
}