<template>
  <div class="orders">
    <div class="path">
      <span>首页</span>>权限管理>权限列表
    </div>
    <div class="box">
      <div style="width:25%;margin-bottom:20px">
        <el-input placeholder="请输入内容" v-model="input3" class="input-with-select">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </div>
      <el-table :data="list" stripe style="width: 100%" border :max-height="hei-300">
        <el-table-column label="#" type="index" width="50"></el-table-column>
        <el-table-column prop="order_number" label="订单编号"></el-table-column>
        <el-table-column prop="order_price" label="订单价格" width="70"></el-table-column>
        <el-table-column prop="order_pay" label="是否付款" width="150">
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.pay_status==0?'danger':'success'"
              disable-transitions
            >{{scope.row.pay_status==0?'未付款':'已付款'}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="is_send" label="是否发货" width="150"></el-table-column>
        <el-table-column prop="create_time" label="下单时间" width="250"></el-table-column>
        <el-table-column prop="address" label="操作" class="btn">
          <template slot-scope="scope">
            <el-button class="btn" type="success" icon="el-icon-location"></el-button>

            <el-button
              class="btn"
              type="primary"
              icon="el-icon-edit-outline"
              @click="row(scope.row);dialogForm = true"
            ></el-button>
            <el-dialog title="修改订单" :visible.sync="dialogForm" width="40%">
              <el-form>
                <el-form-item label="订单价格" :label-width="formLabelWidth">
                  <el-input v-model="orders_sta.order_price" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="发送状态" :label-width="formLabelWidth">
                  <el-input v-model="orders_sta.is_send" autocomplete="off"></el-input>
                  <span>0为未发货，1为已发货</span>
                </el-form-item>
                <el-form-item label="付款状态" :label-width="formLabelWidth">
                  <el-input v-model="orders_sta.pay_status" autocomplete="off"></el-input>
                  <span>0为未付款，1为已付款</span>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogForm = false">取 消</el-button>
                <el-button type="primary" @click="put();dialogForm = false">确 定</el-button>
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
import date from "../../model/date";
import { Message } from "element-ui";
export default {
  props: {},
  data() {
    return {
      dialogForm: false,
      pagenum: 1,
      pagesize: 10,
      list: [],
      num: 0,
      hei: "",
      input3: "",
      formLabelWidth: "120px",
      orders_sta: {
        order_price: "",
        is_send: "",
        pay_status: "",
        order_id: "",
      },
    };
  },
  methods: {
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
        url: "/orders",
        method: "get",
        params: {
          pagenum: this.pagenum,
          pagesize: this.pagesize,
        },
      }).then((res) => {
        res.data.goods.forEach((item) => {
          item.create_time = date(item.create_time);
        });
        this.list = res.data.goods;
        this.num = res.data.total;
      });
    },
    row(r) {
      console.log(r);
      this.orders_sta.order_price = r.order_price;
      this.orders_sta.is_send = r.is_send;
      this.orders_sta.pay_status = r.pay_status;
      this.orders_sta.order_id = r.order_id;
    },
    put() {
      req({
        url: `orders/${this.orders_sta.order_id}`,
        method: "put",
        data: {
          order_price: this.orders_sta.order_price,
          is_send: this.orders_sta.is_send,
          pay_status: this.orders_sta.pay_status,
        },
      }).then((res) => {
        Message({
          message: res.meta.msg,
          duration: 1000,
          type: "success",
        });
        console.log(res);
        this.reque();
      });
    },
  },
  components: {},
  mounted() {
    this.hei = document.body.clientHeight;
    this.reque();
  },
};
</script>

<style scoped lang="less">
.orders {
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
  .box {
    padding: 30px;
    background-color: #fff;
    box-sizing: border-box;
    .block {
      margin-top: 15px;
    }
  }
  .btn {
    margin: 0 5px;
  }
}
</style>
