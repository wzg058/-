<template>
  <div class="orders">
    <div class="path">
      <span>首页</span>>权限管理>权限列表
    </div>
    <div class="box">
      <div style="width:25%;margin-bottom:20px">
        <el-input placeholder="请输入内容" v-model="input3" class="input-with-select">
          <el-button slot="append" icon="el-icon-search" @click="cha"></el-button>
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
            <el-button class="btn" type="primary" icon="el-icon-edit" @click="dialogdizhi = true"></el-button>
            <el-dialog title="修改地址" :visible.sync="dialogdizhi" width="40%">
              <div class="sheng">
                <span>
                  <a>*</a> 省市区/县
                </span>
                <el-cascader :options="options" :props="{ expandTrigger: 'hover' }"></el-cascader>
              </div>
              <div class="sheng2">
                <span>
                  <a>*</a> 详细地址
                </span>
                <el-input v-model="a" class="xiangxi"></el-input>
              </div>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogdizhi = false">取 消</el-button>
                <el-button type="primary" @click=";dialogdizhi = false">确 定</el-button>
              </div>
            </el-dialog>
            <el-button
              class="btn"
              type="success"
              icon="el-icon-location"
              @click="schedule();dialogjindu = true"
            ></el-button>
            <el-dialog title="物流进度" :visible.sync="dialogjindu" width="40%">
              <el-timeline :reverse="true">
                <el-timeline-item
                  v-for="(item, index) in activities"
                  :key="index"
                  :timestamp="item.timestamp"
                >{{item.context}}</el-timeline-item>
              </el-timeline>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogjindu = false">取 消</el-button>
                <el-button type="primary" @click=";dialogjindu = false">确 定</el-button>
              </div>
            </el-dialog>
            <el-button
              class="btn"
              type="info"
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
            <el-button
              class="btn"
              type="warning"
              icon="el-icon-document"
              @click="xinxi(scope.row);dialogxiangqing = true"
            ></el-button>
            <el-dialog title="订单详情" :visible.sync="dialogxiangqing" width="40%">
              <div class="xin">
                订单编号：
                <el-tag type="warning">{{xiangxi.order_number}}</el-tag>
              </div>
              <div class="xin">
                订单价格：
                <el-tag type="info">{{xiangxi.order_price}}</el-tag>
              </div>
              <div class="xin">
                是否发货：
                <el-tag type="success">{{xiangxi.is_send}}</el-tag>
              </div>
              <div class="xin">
                商品类型：
                <el-tag>{{xiangxi.order_fapiao_title}}</el-tag>
              </div>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogxiangqing = false">取 消</el-button>
                <el-button type="primary" @click=";dialogxiangqing = false">确 定</el-button>
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
import options from "../../model/city_data2017_element";
export default {
  props: {},
  data() {
    return {
      a: "",
      options: options,
      dialogForm: false,
      dialogdizhi: false,
      dialogjindu: false,
      dialogxiangqing: false,
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
      activities: [],
      xiangxi: [],
    };
  },
  methods: {
    cha() {
      req({
        url: "/orders",
        method: "get",
        params: {
          user_id: this.input3,
          pagenum: this.pagenum,
          pagesize: this.pagesize,
        },
      }).then((res) => {
        console.log(res, this.input3);
      });
    },
    xinxi(row) {
      req({
        url: `orders/${row.order_id}`,
        method: "get",
      }).then((res) => {
        console.log(res);
        this.xiangxi = res.data;
      });
    },
    schedule() {
      req({
        url: "/kuaidi/1106975712662",
        method: "get",
      }).then((res) => {
        console.log(res);
        this.activities = res.data;
        Message({
          message: res.meta.message,
          duration: 1000,
          type: "success",
        });
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
    onresize = () => {
      this.hei = document.body.clientHeight;
    };
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
  .el-cascader {
    width: 100%;
  }
  .sheng2 {
    margin-top: 20px;
    display: flex;
    align-items: center;
    span {
      display: inline-block;
      width: 120px;
      text-align: center;
      a {
        color: red;
      }
    }
  }
  .sheng {
    display: flex;
    align-items: center;
    span {
      display: inline-block;
      width: 120px;
      text-align: center;
      a {
        color: red;
      }
    }
  }
  .xin {
    margin: 15px 0;
  }
}
</style>
