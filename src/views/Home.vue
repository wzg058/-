<template>
  <div class="home">
    <el-container>
      <el-header>
        铭儿后台管理系统
        <el-button type="info" class="tui" @click="dialogFormVisible = true">退出</el-button>
        <el-dialog :visible.sync="dialogFormVisible" width="25%">
          确定要退出吗
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="tui();dialogFormVisible = false">确 定</el-button>
          </div>
        </el-dialog>
      </el-header>
      <el-container>
        <el-aside width="auto">
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
            :collapse="!isCollapse"
            :class="{wid:isCollapse}"
            :unique-opened="true"
          >
            <i class="el-icon-set-up" @click="zhe"></i>
            <el-submenu :index="String(item.id)" v-for="(item,index) in list" :key="index">
              <template slot="title">
                <i :class="iconList[index]"></i>
                <span>{{item.authName}}</span>
              </template>
              <el-menu-item-group>
                <el-menu-item
                  :index="String(ite.id)"
                  v-for="(ite,ind) in item.children"
                  :key="ind"
                  @click="tiao(index,ind)"
                >{{ite.authName}}</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import req from "../../request/menus";
import { Message } from "element-ui";
export default {
  props: {},
  data() {
    return {
      isCollapse: false,
      list: [],
      iconList: [
        "el-icon-s-custom",
        "el-icon-collection-tag",
        "el-icon-s-goods",
        "el-icon-s-order",
        "el-icon-pie-chart",
      ],
      dialogFormVisible: false,
    };
  },
  methods: {
    zhe() {
      this.isCollapse = !this.isCollapse;
    },
    tiao(index, ind) {
      this.$router.replace("/home/" + this.list[index].children[ind].path);
    },
    tui() {
      sessionStorage.removeItem("Authorization");
      this.$router.replace("/login");
    },
  },
  components: {},
  mounted() {
    req().then((res) => {
      this.list = res.data;
      if (res.meta.status == 400) {
        Message({
          message: '请先登录',
          duration: 1000,
          type: "error",
        });
        this.$router.replace("/login");
      }
    });
  },
};
</script>

<style scoped lang="less">
.home,
.el-container {
  height: 100%;
}
.el-header {
  background-color: #545c64;
  font-size: 26px;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}
.el-menu {
  .el-icon-set-up {
    color: #fff;
    display: block;
    width: 100%;
    height: 30px;
    font-size: 26px;
    text-align: center;
    line-height: 30px;
  }
}
.wid {
  width: 200px;
}
.el-menu-vertical-demo {
  height: 100%;
}
.el-main {
  margin: 0;
  padding: 0;
}
.tui {
  position: absolute;
  right: 100px;
}
</style>
