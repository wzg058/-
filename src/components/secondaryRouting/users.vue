<template>
  <div class="users">
    <el-breadcrumb separator=">" class="path">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="out">
      <div class="ipt_btn">
        <el-input
          placeholder="请输入内容"
          v-model="input3"
          @keydown.enter.native="cha"
          class="input-with-select"
        >
          <el-button slot="append" icon="el-icon-search" @click="cha"></el-button>
        </el-input>
        <el-button type="primary" class="tbtn" @click="dialogtian = true">添加用户</el-button>
        <el-dialog title="添加用户" :visible.sync="dialogtian" width="40%">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" :show-message="false">
            <el-form-item label="用户名" :label-width="formLabelWidth" prop="username">
              <el-input autocomplete="off" v-model="ruleForm.username" clearable></el-input>
            </el-form-item>
            <el-form-item label="密码" :label-width="formLabelWidth" prop="password">
              <el-input autocomplete="off" v-model="ruleForm.password" clearable></el-input>
            </el-form-item>
            <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
              <el-input autocomplete="off" v-model="ruleForm.email" clearable></el-input>
            </el-form-item>
            <el-form-item label="手机" :label-width="formLabelWidth" prop="mobile">
              <el-input autocomplete="off" v-model="ruleForm.mobile" clearable></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogtian = false">取 消</el-button>
            <el-button type="primary" @click="add();dialogtian = false">确 定</el-button>
          </div>
        </el-dialog>
      </div>
      <el-table :data="list" stripe style="width: 100%;" border :max-height="hei-300">
        <el-table-column label="#" type="index" width="70"></el-table-column>
        <el-table-column prop="username" label="姓名"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="mobile" label="电话"></el-table-column>
        <el-table-column prop="role_name" label="角色"></el-table-column>
        <el-table-column prop="mg_state" label="状态">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.mg_state" @change="sta(scope.row)"></el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="操作">
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              circle
              @click="kai(scope.row);dialogbian = true"
            ></el-button>
            <el-dialog title="修改用户" :visible.sync="dialogbian" width="40%">
              <el-form :model="rForm" :rules="rul" ref="rForm" :show-message="false">
                <el-form-item label="用户名" :label-width="formLabelWidth">
                  <el-input autocomplete="off" v-model="rForm.uname" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" :label-width="formLabelWidth" prop="ema">
                  <el-input autocomplete="off" v-model="rForm.ema" clearable></el-input>
                </el-form-item>
                <el-form-item label="手机" :label-width="formLabelWidth" prop="phone">
                  <el-input autocomplete="off" v-model="rForm.phone" clearable></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogbian = false">取 消</el-button>
                <el-button type="primary" @click="put();dialogbian = false">确 定</el-button>
              </div>
            </el-dialog>
            <el-button type="danger" icon="el-icon-delete" circle @click="open(scope.row)"></el-button>
            <el-button
              type="warning"
              icon="el-icon-setting"
              circle
              @click="huan(scope.row);dialogfen = true"
            ></el-button>
            <el-dialog title="修改用户" :visible.sync="dialogfen" width="40%">
              <div class="mar">当前的用户：{{fenpei.username}}</div>
              <div class="mar">当前的角色：{{fenpei.role_name}}</div>
              <div class="xuan mar">
                <span>分配新角色：</span>
                <el-select v-model="value" placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </div>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogfen = false">取 消</el-button>
                <el-button type="primary" @click=";dialogfen = false">确 定</el-button>
              </div>
            </el-dialog>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          @size-change="chan"
          :page-sizes="[10, 15, 20, 25,30]"
          :page-size="pagesize"
          layout="total, sizes, prev, pager, next"
          :total="num"
          @next-click="next"
          @prev-click="prev"
          @current-change="current"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import req from "../../../request/request";
import { Message } from "element-ui";
export default {
  props: {},
  data() {
    return {
      list: [],
      input3: "",
      pagenum: 1,
      pagesize: 10,
      hei: 0,
      num: 0,
      dialogtian: false,
      dialogbian: false,
      dialogfen: false,
      formLabelWidth: "120px",
      fenpei: {
        username: "",
        role_name: "",
      },
      ruleForm: {
        username: "",
        password: "",
        email: "",
        mobile: "",
      },
      rules: {
        username: [{ required: true }],
        password: [{ required: true }],
        email: [{ required: true }],
        mobile: [{ required: true }],
      },
      rForm: {
        ema: "",
        phone: "",
        uname: "",
        id: "",
      },
      rul: {
        phone: [{ required: true }],
        ema: [{ required: true }],
      },
      options: [
        {
          value: "0",
          label: "超级管理员",
        },
        {
          value: "1",
          label: "主管",
        },
        {
          value: "2",
          label: "组长",
        },
        {
          value: "3",
          label: "测试账号1",
        },
        {
          value: "4",
          label: "测试账号2",
        },
      ],
      value: "",
    };
  },
  methods: {
    huan(row) {
      this.fenpei.username = row.username;
      this.fenpei.role_name = row.role_name;
    },
    kai(row) {
      this.rForm.uname = row.username;
      this.rForm.ema = row.email;
      this.rForm.phone = row.mobile;
      this.rForm.id = row.id;
    },
    put() {
      req({
        url: `/users/${this.rForm.id}`,
        method: "put",
        data: {
          email: this.rForm.ema,
          mobile: this.rForm.phone,
        },
      }).then((res) => {
        if (res.meta.status == 200) {
          this.reque();
        }
        Message({
          message: res.meta.msg,
          duration: 1000,
          type: "success",
        });
      });
    },
    add() {
      req({
        url: "users",
        method: "post",
        data: {
          username: this.ruleForm.username,
          password: this.ruleForm.password,
          email: this.ruleForm.email,
          mobile: this.ruleForm.mobile,
        },
      }).then((res) => {
        this.reque();
        this.$refs.ruleForm.resetFields();
        Message({
          message: res.meta.msg,
          duration: 1000,
          type: "success",
        });
      });
    },
    sta(row) {
      req({
        url: `users/${row.id}/state/${row.mg_state}`,
        method: "put",
      }).then((res) => {
        Message({
          message: res.meta.msg,
          duration: 1000,
          type: "success",
        });
      });
    },
    cha() {
      if (this.input3 == "") {
        this.reque();
        return false;
      }
      req({
        url: `/users`,
        method: "get",
        params: {
          query: this.input3,
          pagenum: 1,
          pagesize: 10,
        },
      }).then((res) => {
        if (res.meta.status == 200) {
          this.list = res.data.users;
          Message({
            message: res.meta.msg,
            duration: 1000,
            type: "success",
          });
        } else {
          Message({
            message: res.meta.msg.message,
            duration: 1000,
            type: "error",
          });
        }
      });
    },
    next() {
      this.pagenum += 1;
      this.reque();
    },
    prev() {
      this.pagenum -= 1;
      this.reque();
    },
    chan(val) {
      this.pagesize = val;
      this.reque();
    },
    current(val) {
      this.pagenum = val;
      this.reque();
    },
    reque() {
      return req({
        url: "/users",
        method: "get",
        params: {
          pagenum: this.pagenum,
          pagesize: this.pagesize,
        },
      }).then((res) => {
        this.list = res.data.users;
        this.num = res.data.total;
      });
    },
    open(row) {
      this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          req({
            url: `users/${row.id}`,
            method: "delete",
          }).then((res) => {
            this.$message({
              type: "success",
              message: res.meta.msg,
            });
            this.reque();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
  mounted() {
    this.reque();
    this.hei = document.body.clientHeight;
    onresize = () => {
      this.hei = document.body.clientHeight;
    };
  },
};
</script>

<style scoped lang="less">
.users {
  width: 100%;
  height: 100%;
  background-color: #eaedf1;
  padding: 0 30px;
  box-sizing: border-box;
  .path {
    height: 50px;
    line-height: 50px;
    color: #666;
    font-size: 13px;
  }
  .out {
    width: 100%;
    height: 85%;
    padding: 0 20px;
    background-color: #fff;
    box-sizing: border-box;
    position: relative;
    .ipt_btn {
      display: flex;
      align-items: center;
      width: 25%;
      padding-top: 20px;
      margin-bottom: 15px;
      .tbtn {
        margin-left: 20px;
      }
    }
    .block {
      position: fixed;
      bottom: 65px;
    }
  }
  .cell {
    .el-button {
      margin: 0 3px;
    }
  }
  .xuan {
    display: flex;
    align-items: center;
  }
  .mar{
      margin: 5px 0;
  }
}
</style>
