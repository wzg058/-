<template>
  <div class="login">
    <div class="box">
      <div class="user_d" prop="name">
        <i class="el-icon-user-solid"></i>
        <el-input v-model="username" placeholder="请输入用户名" clearable></el-input>
      </div>
      <div class="pass_d" prop="pass">
        <i class="el-icon-lock"></i>
        <el-input placeholder="请输入密码" v-model="password" show-password clearable></el-input>
      </div>
      <div class="btn">
        <el-button type="success" @click="log">登录</el-button>
        <el-button type="info" @click="reset">重置</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import req from "../../request/login";
export default {
  props: {},
  data() {
    return {
      username: "admin",
      password: "123456",
    };
  },
  methods: {
    reset() {
      this.username = "";
      this.password = "";
    },
    log() {
      req(this.username, this.password).then((res) => {
        if (res.meta.status == 200) {
          sessionStorage.setItem("Authorization", res.data.token);
          this.$message({
            message: "登录成功",
            type: "success",
            duration: 1000,
            onClose: () => {
              this.$router.replace("/home");
            },
          });
        }
      });
    },
  },
  components: {},
};
</script>

<style scoped lang="less">
.login {
  height: 100%;
  background-color: darkslategrey;
  display: flex;
  justify-content: center;
  align-items: center;
  .box {
    width: 450px;
    height: 300px;
    background-color: #fff;
    border-radius: 5px;
    padding-top: 115px;
    box-sizing: border-box;
    position: relative;
    .user_d,
    .pass_d {
      width: 90%;
      height: 40px;
      margin: 0 auto 23px auto;
      position: relative;
      .inp {
        padding-left: 30px;
      }
      i {
        display: inline-block;
        width: 30px;
        height: 100%;
        position: absolute;
        color: #c0c4cc;
        z-index: 10;
        line-height: 40px;
      }
    }
    .btn {
      position: absolute;
      bottom: 22px;
      right: 21px;
    }
  }
}
</style>
