<template>

  <div>
      <div id="BarGraphEcharts" style="width:100%;height:400px" ref="BarGraphEcharts"></div>
  </div>    

</template>

<script>
export default {
    data(){
        return{
                fontId:this.$parent.$parent.$parent.$parent.popData.fdProid,
                noArrival:[],//未到货
                haveArrived:[],//已到货
        }
    },
    methods:{
        echartsShow() {
            //条形图
            // 基于准备好的dom，初始化echarts实例
          let leftmyChart = this.$echarts.init(this.$refs["BarGraphEcharts"]);
          leftmyChart.setOption(this.option);
    
        },

        BarGraphEcharts() {
            this.option = {
            tooltip : {
                trigger: 'axis',
                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            },
            formatter: function (data) {//提示数据为正值展示
                var res="<div><p>"+data[0].axisValue+"</p></div>";
                //debugger
                res=res+"<p>总量："+(Math.abs(data[0].value)+Math.abs(data[1].value))+"</p>";
                for(var i=0;i<data.length;i++){
                    res+="<p>"+data[i].marker+data[i].seriesName+"："+Math.abs(data[i].data)+"</p>";
                }
                return res;
            },
            },
            legend: {
                type:'plain',
                itemWidth: 10,
                itemHeight: 10,
                itemGap: 20,
                top:'2%',
                right:'10%',
                data:['未到货','已到货']
            },
            grid: {
                left: '6%',
                right: '6%',
                bottom: '2%',
                containLabel: true,
            },
            xAxis : [
                {
                    type : 'value',
                    axisLine: {show: true,
                    lineStyle:{
                            color:'#36A2DA',
                            width:2,
                    },
                    },

                    axisTick: {show: true,},
                    splitLine: {show: false},
                    axisLabel:{
                        textStyle:{color:"#666"},
                        formatter:function(data){//X轴 取绝对值
                            return (Math.abs(data));
                        }
                    },
                },
            ],
            yAxis : [
                {
                type : 'category',
                axisLine: {show: true},
                axisLabel: {show: false},
                axisTick: {show: false},
                data : ['箱变','叶片','发电机','机舱轮毂','塔筒']
                },
            ],
            series :[
            {
                name:'已到货',
                type:'bar',
                stack: '总量',
                color : '#36A2DA',
                label: {
                    normal: {
                        show: true,
                        position: 'insideLeft',
                        formatter:"{b}"+"   "+"{c}"
                    }
                },
                 data:this.haveArrived,
            },
            {
                name:'未到货',
                type:'bar',
                stack: '总量',
                barWidth : 25,
                barCateGoryGap:5,
                color:'#FB7293',
                label: {
                    normal: {
                        show: true,
                        position: 'left', //right
                        formatter: function (data) {//echarts回调函数方法
                        var res="";
                        if(Math.abs(data.data)!=0){//负值占位
                            res=(Math.abs(data.data))//取绝对值
                        }
                        return res;

                    }

                    },
                },
                data:this.noArrival,
            
            },
            ]
            };
        },
        BarGraph(){
            var params={
              //传参
              fdProid:this.fontId
            }
            //请求数据
            this.$http.post('/engineer/equipmentArrival/getEchartsData',params) 
            .then((res)=>{
                console.log(res)
                this.haveArrived=res.data.data.fdTotalAOGList;//已到货正数
                this.noArrival=res.data.data.notFdTotalAOGList;//未到货负数
            })
            .catch((res)=>{
                console.log("数据请求失败");
            })
        }
    },
    mounted() {
        this.BarGraph();
        this.BarGraphEcharts();
        this.echartsShow()
    },
   
    watch:{
        noArrival(){//监听
            this.BarGraphEcharts();
            this.echartsShow()
        }
    
    },


    }

</script>

<style>

</style>

