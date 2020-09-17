<template>
  <div class="rights">
    <template>
      <div class="path">
        <span>首页</span>>权限管理>权限列表
      </div>
      <el-table :data="tableData" stripe style="width: 100%" border :max-height="hei-140">
        <el-table-column prop="date" label="#" width="70" type="index"></el-table-column>
        <el-table-column prop="authName" label="权限名称"></el-table-column>
        <el-table-column prop="path" label="路径"></el-table-column>
        <el-table-column prop="level" label="权限等级">
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.level=='0'?'primary':scope.row.level=='1'?'success':'warning'"
              disable-transitions
            >{{scope.row.level=='0'?'一级权限':scope.row.level=='1'?'二级权限':'三级权限'}}</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </template>
  </div>
</template>

<script>
import req from "../../../request/request";
export default {
  props: {},
  data() {
    return {
      tableData: [],
      hei: "",
      one: false,
      two: false,
      three: false,
    };
  },
  methods: {},
  components: {},
  mounted() {
    req({
      url: "/rights/list",
      method: "get",
    }).then((res) => {
      this.tableData = res.data;
    });
    this.hei = document.body.clientHeight;
  },
};
</script>

<style scoped lang="less">
.rights {
  height: 100%;
  background-color: #eaedf1;
  padding: 0 30px;
  .path {
    height: 50px;
    line-height: 50px;
    color: #666;
    font-size: 13px;
    span {
      color: #000;
    }
  }
}
</style>
