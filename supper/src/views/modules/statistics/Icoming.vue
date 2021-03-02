<template>
  <div class="container">
    <h1>
      欢迎您
      <span>{{ username }}</span>
    </h1>
    <p>你可以这里查看统计数据</p>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>进货数据统计</span>
      </div>
      <div id="echarts_div"></div>
    </el-card>
  </div>
</template>

<script>
var echarts = require("echarts");
export default {
  data() {
    return {
      username: "",
    };
  },
  created() {
    this.username = localStorage.getItem("name");
  },
  mounted() {
      
    var myecharts = echarts.init(document.getElementById("echarts_div"));
    var dataAxis = ['点', '击', '柱', '子', '或', '者', '两', '指', '在', '触', '屏', '上', '滑', '动', '能', '够', '自', '动', '缩', '放'];
    var data = [220, 182, 191, 234, 290, 330, 310, 123, 442, 321, 90, 149, 210, 122, 133, 334, 198, 123, 125, 220];
    var yMax = 500;
    var dataShadow = [];

    for (var i = 0; i < data.length; i++) {
        dataShadow.push(yMax);
    }
    
    var  option = {
        title: {
          text: "点击查看详细信息",
          subtext: "Feature Sample: Gradient Color, Shadow, Click Zoom"
        },
        xAxis: {
          data: dataAxis,
          axisLabel: {
            inside: true,
            textStyle: {
              color: "#fff"
            }
          },
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          z: 10
        },
        yAxis: {
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            textStyle: {
              color: "#999"
            }
          }
        },
        dataZoom: [
          {
            type: "inside"
          }
        ],
        series: [
          {
            // For shadow
            type: "bar",
            itemStyle: {
              color: "rgba(0,0,0,0.05)"
            },
            barGap: "-100%",
            barCategoryGap: "40%",
            data: dataShadow,
            animation: false
          },
          {
            type: "bar",
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "#83bff6" },
                { offset: 0.5, color: "#188df0" },
                { offset: 1, color: "#188df0" }
              ])
            },
            emphasis: {
              itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#2378f7" },
                  { offset: 0.7, color: "#2378f7" },
                  { offset: 1, color: "#83bff6" }
                ])
              }
            },
            data: data
          }
        ]
      }
    myecharts.setOption(option);
    var zoomSize = 6;
    myecharts.on('click', function (params) {

    console.log(dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)]);
    myecharts.dispatchAction({
        type: 'dataZoom',
        startValue: dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)],
        endValue: dataAxis[Math.min(params.dataIndex + zoomSize / 2, data.length - 1)]
    });
    });
    myecharts.showLoading();
    //     $.get('data.json').done(function (data) {
    //         myecharts.setOption('...');
    //     });

        if(this.option != ''){
            myecharts.hideLoading();
        }
    }
};
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  height: 100%;
  padding: 40px 30px;
  box-sizing: border-box;
  p {
    margin-top: 10px;
  }
  .box-card{
    margin-top: 20px;
    #echarts_div {
      width: 1200px;
      height: 600px;
    }
  }
}
</style>