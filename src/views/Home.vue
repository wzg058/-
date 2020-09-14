<template>
  <div class="home">
    <el-container>
      <el-header>铭儿后台管理系统</el-header>
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
    };
  },
  methods: {
    zhe() {
      this.isCollapse = !this.isCollapse;
    },
    tiao(index,ind){
      this.$router.replace('/home/'+this.list[index].children[ind].path);
    }
  },
  components: {},
  mounted() {
    req().then((res) => {
      console.log(res.data);
      this.list = res.data;
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
</style>
