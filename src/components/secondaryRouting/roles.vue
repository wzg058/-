<template>
  <div class="roles">
    <div class="path">
      <span>首页</span>>权限管理>角色列表
    </div>
    <div class="list">
      <el-button type="primary" @click="dialogFormVisible = true">添加角色</el-button>
      <el-dialog title="添加角色" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="角色名称" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="角色描述" :label-width="formLabelWidth">
            <el-input v-model="form.describe" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="add();dialogFormVisible = false">确 定</el-button>
        </div>
      </el-dialog>
      <el-table :data="tableData" height="80%" border style="width: 100%">
        <el-table-column prop label width="70" type="expand">
          <template slot-scope="scope">
            <div class="tag">
              <div class="tag1" v-for="(item,index) in scope.row.children" :key="index">
                <el-tag
                  closable
                  @close="handleClose(item,scope.row,scope.row.children)"
                >{{item.authName}}</el-tag>
                <div class="tag2">
                  <div class="tag3" v-for="(ite,inde) in item.children" :key="inde">
                    <el-tag
                      type="success"
                      closable
                      @close="handleClose(ite,scope.row,item.children)"
                    >{{ite.authName}}</el-tag>
                    <div class="tag4">
                      <div class="tag5" v-for="(it,ind) in ite.children" :key="ind">
                        <el-tag
                          type="warning"
                          closable
                          @close="handleClose(it,scope.row,ite.children)"
                        >{{it.authName}}</el-tag>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column type="index" label="#" width="70"></el-table-column>
        <el-table-column prop="roleName" label="角色名称"></el-table-column>
        <el-table-column prop="roleDesc" label="角色描述"></el-table-column>
        <el-table-column prop="address" label="操作">
          <template slot-scope="scope">
            <el-button
              type="primary"
              class="xuan"
              icon="el-icon-edit"
              @click="put(scope.row);dialogForm = true"
            >编辑</el-button>
            <el-dialog title="编辑" :visible.sync="dialogForm">
              <el-form :model="form">
                <el-form-item label="角色名称" :label-width="formLabelWidth">
                  <el-input v-model="put_.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="角色描述" :label-width="formLabelWidth">
                  <el-input v-model="put_.describe" autocomplete="off"></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogForm = false">取 消</el-button>
                <el-button type="primary" @click="amend();dialogForm = false">确 定</el-button>
              </div>
            </el-dialog>
            <el-button
              type="danger"
              class="xuan"
              icon="el-icon-delete-solid"
              @click="remove(scope.row)"
            >删除</el-button>
            <el-button
              type="warning"
              class="xuan"
              icon="el-icon-s-tools"
              @click="dist(scope.row);dialoglist = true"
            >分配权限</el-button>
            <el-dialog title="分配权限" :visible.sync="dialoglist">
              <el-tree :data="dat" show-checkbox :props="props" node-key="id" ref="tree"></el-tree>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialoglist = false">取 消</el-button>
                <el-button type="primary" @click="dialoglist = false;getCheckedKeys()">确 定</el-button>
              </div>
            </el-dialog>
          </template>
        </el-table-column>
      </el-table>
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
      tableData: [],
      dat: [],
      dialogFormVisible: false,
      dialogForm: false,
      dialoglist: false,
      form: {
        name: "",
        describe: "",
      },
      formLabelWidth: "120px",
      put_: {
        name: "",
        describe: "",
        id: null,
      },
      props: {
        label: "authName",
        children: "children",
      },
      jueid: "",
      rids: "",
    };
  },
  methods: {
    handleClose(tag, x, c) {
      req({
        url: `roles/${x.id}/rights/${tag.id}`,
        method: "delete",
      }).then((res) => {
        if (res.meta.status == 200) {
          Message({
            message: res.meta.msg,
            duration: 1000,
            type: "success",
          });
          c.splice(c.indexOf(tag), 1);
        }
      });
    },
    add() {
      req({
        url: "/roles",
        method: "post",
        data: {
          roleName: this.form.name,
          roleDesc: this.form.describe,
        },
      }).then((res) => {
        if (res.meta.status == 201) {
          this.form.name = "";
          this.form.describe = "";
          this.mess(res);
        }
      });
    },
    remove(row) {
      req({
        url: `roles/${row.id}`,
        method: "delete",
      }).then((res) => {
        if (res.meta.status == 200) {
          this.mess(res);
        }
      });
    },
    put(row) {
      this.put_.name = row.roleName;
      this.put_.describe = row.roleDesc;
      this.put_.id = row.id;
    },
    amend() {
      req({
        url: `roles/${this.put_.id}`,
        data: {
          roleName: this.put_.name,
          roleDesc: this.put_.describe,
        },
        method: "put",
      }).then((res) => {
        if (res.meta.status == 200) {
          this.mess(res);
        }
      });
    },
    huoqu() {
      req({
        url: "/roles",
        method: "get",
      }).then((res) => {
        this.tableData = res.data;
      });
    },
    mess(res) {
      this.huoqu();
      Message({
        message: res.meta.msg,
        duration: 1000,
        type: "success",
      });
    },
    dist(row) {
      this.jueid = row.id;
    },
    getCheckedKeys() {
      req({
        url: `roles/${this.jueid}/rights`,
        method: "post",
        data: {
          rids:
            this.$refs.tree.getHalfCheckedKeys().join(",") +
            "," +
            this.$refs.tree.getCheckedKeys().join(","),
        },
      }).then((res) => {
        if (res.meta.status == 200) {
          this.mess(res);
          this.$refs.tree.setCheckedKeys([]);
        }
      });
    },
  },
  components: {},
  mounted() {
    this.huoqu();
    req({
      url: "/rights/tree",
      method: "get",
    }).then((res) => {
      this.dat = res.data;
    });
  },
};
</script>

<style scoped lang="less">
.roles {
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
    span {
      color: #000;
    }
  }
  .list {
    width: 100%;
    height: 85%;
    background-color: #fff;
    padding: 0 20px;
    box-sizing: border-box;
    .el-button {
      margin: 20px 0;
    }
    .xuan {
      margin: 0 5px;
    }
  }
}
.el-table_1_column_5 {
  display: flex;
  flex-wrap: nowrap;
  .el-button {
    flex: 1;
  }
}
.tag {
  width: 100%;
  display: flex;
  flex-direction: column;

  .tag1 {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #ccc;
    box-sizing: border-box;
  }
  .tag2 {
    width: 80%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    box-sizing: border-box;
    margin-bottom: -1px;
    .tag3 {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #ccc;
      .tag4 {
        width: 80%;
        display: flex;
        flex-wrap: wrap;
      }
      .tag5 {
        margin: 5px 10px;
      }
    }
  }
}
</style>
