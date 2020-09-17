<template>
  <div class="box">
    <div ref="chart" style="width: 100%;height:100%;"></div>
  </div>
</template>

<script>
import req from "../../../request/request";
export default {
  props: {},
  data() {
    return {
      option: null,
    };
  },
  methods: {
    getEchartData() {
      const chart = this.$refs.chart;
      if (chart) {
        const myChart = this.$echarts.init(chart);
        const option = { ...this.option };
        console.log(this.option);
        myChart.setOption(option);
        window.addEventListener("resize", function () {
          myChart.resize();
        });
      }
      this.$on("hook:destroyed", () => {
        window.removeEventListener("resize", function () {
          myChart.resize();
        });
      });
    },
  },
  components: {},
  mounted() {
    req({
      url: "reports/type/1",
      method: "get",
    }).then((res) => {
      console.log(res);
      this.option = res.data;
      this.getEchartData();
    });
  },
};
</script>

<style scoped lang="less">
.box{
    height: 100%;
}
</style>
