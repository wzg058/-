<template>
    <div class="login">
        <div class="box">
            <div class="user_d">
                <i class="el-icon-user-solid"></i>
                <el-input v-model="username" placeholder="请输入用户名" clearable></el-input>
            </div>
            <div class="pass_d">
                <i></i>
                <el-input placeholder="请输入密码" v-model="paddword" show-password clearable></el-input>
            </div>
        </div>
    </div>
</template>

<script>
import req from '../../request/request'
export default {
    props: {

    },
    data() {
        return {
            username:'',
            paddword:''
        };
    },
    methods: {

    },
    components: {

    },
    // mounted() {
    //     let con = {
    //         url:'/login',
    //         method:'post',
    //         data:{
    //             username:"admin",
    //             password:"123456"
    //         }
    //     }
    //     req(con).then(res=>{
    //         console.log(res);
    //         sessionStorage.setItem("Authorization",res.data.token)
    //     });
    // },
};
</script>

<style scoped lang="less">
    .login{
        height: 100%;
        background-color:darkslategrey;
        display: flex;
        justify-content: center;
        align-items: center;
        .box{
            width: 450px;
            height: 300px;
            background-color: #fff;
            border-radius: 5px;
            padding-top: 115px;
            box-sizing: border-box;
            .user_d,.pass_d{
                width: 90%;
                height: 40px;
                margin: 0 auto 23px auto;
                position: relative;
                .inp{
                    padding-left: 30px;
                }
                i{
                    display: inline-block;
                    width: 30px;
                    height: 100%;
                    position: absolute;
                    color: #c0c4cc;
                    z-index: 10;
                    line-height: 40px;
                }
            }
        }
    }
</style>
