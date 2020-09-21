<template>
  <div class="categories">
    <el-breadcrumb separator=">" class="path">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="out">
      <el-button type="primary" class="top_btn" @click="dialogtian = true">添加分类</el-button>
      <el-dialog title="添加分类" :visible.sync="dialogtian" width="40%">
        <el-form>
          <el-form-item label="分类名称:" :label-width="formLabelWidth" prop="username">
            <el-input autocomplete="off" clearable v-model="fenname"></el-input>
          </el-form-item>
          <div class="sheng">
            <span>父级分类:</span>
            <el-cascader
              v-model="value"
              :options="options"
              :props="{ expandTrigger: 'hover',label:'cat_name',value:'cat_id',checkStrictly:true}"
              @change="handleChange"
            ></el-cascader>
          </div>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogtian = false">取 消</el-button>
          <el-button type="primary" @click="add();dialogtian = false">确 定</el-button>
        </div>
      </el-dialog>
      <el-table
        :data="tableData"
        :max-height="hei-300"
        style="width: 100%;"
        row-key="cat_id"
        border
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
        :indent="40"
      >
        <el-table-column type="index" label="#" width="60"></el-table-column>
        <el-table-column prop="cat_name" label="分类名称"></el-table-column>
        <el-table-column prop="address" label="是否有效">
          <template>
            <el-button type="success" icon="el-icon-check" circle size="mini"></el-button>
          </template>
        </el-table-column>
        <el-table-column label="排序">
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.cat_level == 0?'':scope.row.cat_level == 1?'success':'warning'"
            >{{scope.row.cat_level == 0?'一级':scope.row.cat_level == 1?'二级':'三级'}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="操作">
          <template></template>
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
import reque from "../../../request/request";
export default {
  props: {},
  data() {
    return {
      value: [],
      options: [],
      pagenum: 1,
      pagesize: 10,
      num: 0,
      tableData: [],
      hei: 0,
      dialogtian: false,
      formLabelWidth: "80px",
      fenname:''
    };
  },
  methods: {
      add(){
          reque({
              url:'/categories',
              method:'post',
              data:{
                  cat_pid:this.value.length == 0?0:this.value[this.value.length - 1],
                  cat_level:this.value.length == 2?2:this.value.length == 1?1:0,
                  cat_name:this.fenname
              }
          }).then(res=>{
              console.log(res);
              this.req();
          });
      },
    handleChange(v) {
    },
    req() {
      reque({
        url: "/categories",
        method: "get",
        params: {
          pagenum: this.pagenum,
          pagesize: this.pagesize,
        },
      }).then((res) => {
        this.tableData = res.data.result;
        this.num = res.data.total;
      });
    },
    next() {
      this.pagenum += 1;
      this.req();
    },
    prev() {
      this.pagenum -= 1;
      this.req();
    },
    chan(val) {
      this.pagesize = val;
      this.req();
    },
    current(val) {
      this.pagenum = val;
      this.req();
    },
  },
  components: {},
  mounted() {
    this.req();
    this.hei = document.body.clientHeight;
    onresize = () => {
      this.hei = document.body.clientHeight;
    };
    reque({
      url: "/categories",
      method: "get",
    }).then((res) => {
      this.options = res.data;
    });
  },
};
</script>

<style scoped lang="less">
.categories {
  height: 100%;
  background-color: #eaedf1;
  padding: 0 30px;
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
    .top_btn {
      margin: 15px 0;
    }
    .block {
      position: fixed;
      bottom: 65px;
    }
    .sheng {
      display: flex;
      align-items: center;
      span {
        display: inline-block;
        width: 80px;
        text-align: center;
        a {
          color: red;
        }
      }
      .el-cascader {
        width: 85%;
      }
    }
  }
}
</style>
