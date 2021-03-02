<template>
    <div class="container">
    <h1>
      欢迎您
      <span>{{ username }}</span>
    </h1>
    <p>你可以这里查看统计数据</p>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>销售数据统计</span>
      </div>
      <div id="echarts_div"></div>
    </el-card>
    </div>
</template>

<script>
    var echarts = require("echarts");
    export default {
        data(){
            return {
                username: ''
            }
        },
        created(){
            this.username = localStorage.getItem('name')
        },
        mounted(){
            var myecharts = echarts.init(document.getElementById("echarts_div"));
            var option = {
                title: {
                    text: '折线图堆叠'
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: ['烟酒', '水果', '零食', '肉类', '饮料']
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                toolbox: {
                    feature: {
                        saveAsImage: {}
                    }
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                        name: '烟酒',
                        type: 'line',
                        stack: '总量',
                        data: [120, 132, 101, 134, 90, 230, 210]
                    },
                    {
                        name: '水果',
                        type: 'line',
                        stack: '总量',
                        data: [220, 182, 191, 234, 290, 330, 310]
                    },
                    {
                        name: '零食',
                        type: 'line',
                        stack: '总量',
                        data: [150, 232, 201, 154, 190, 330, 410]
                    },
                    {
                        name: '肉类',
                        type: 'line',
                        stack: '总量',
                        data: [320, 332, 301, 334, 390, 330, 320]
                    },
                    {
                        name: '饮料',
                        type: 'line',
                        stack: '总量',
                        data: [820, 932, 901, 934, 1290, 1330, 1320]
                    }
                ]
            };

            myecharts.setOption(option)
        }
    }
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