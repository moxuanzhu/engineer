<template>
<div>
    <!-- 总工程量/计划预期 -->
  <div class="leftEcharts" style="width: 30%;border: 1px solid #EAF0F4;float: left">
    <div style="width:100%;height: 50px;background-color:#F9FAFB;position: relative; ">
      <span style="width:100%;position: absolute;font-size: larger;font-weight: bold;margin-top: 12px;margin-left: 13px;color:#58616E;"> 
        进度总览
      </span>
    </div>
    <!-- 饼图 -->
    <div style="height: 391px;border: 1px solid #EAF0F4;">
       <div id="leftEchertsBottom" style="width:100%;height:220px" ref="leftEchertsBottom"></div>
       <div style="width:100%;height:191px;padding-top:20px;">
           <p class="grie">
               <span>风机吊装</span>
               <span><el-progress :text-inside="true" :stroke-width="18" :percentage="percent1>100?100:percent1" color="#FFB97F"></el-progress></span>
               <span>{{kilometre1}}/{{gross}}个</span>
            </p>
            <p class="grie">
               <span>箱变基础</span>
               <span><el-progress :text-inside="true" :stroke-width="18" :percentage="percent2>100?100:percent2" color="#B7A1DE"></el-progress></span>
               <span>{{kilometre2}}/{{gross}}个</span>
            </p>
            <p class="grie">
               <span>箱变安装</span>
               <span><el-progress :text-inside="true" :stroke-width="18" :percentage="percent3>100?100:percent3" color="#5BB1EF"></el-progress></span>
               <span>{{kilometre3}}/{{gross}}个</span>
            </p>
        </div>
    </div>
  </div>
  <div class="tabs" style="width: 66%;border: 2px solid #EAF0F4;float: left;margin-left:3%;">
      <el-tabs style="width:100%;height:443px;">
            <el-tab-pane label="日完成量柱状图">
                <div id="rightEchertsBottom1" style="width:67vw;height:386px" ref="rightEchertsBottom1"></div>
            </el-tab-pane>
            <el-tab-pane label="周完成量面积图">
                <div id="rightEchertsBottom2" style="width:67vw;height:386px" ref="rightEchertsBottom2"></div>
            </el-tab-pane>
            <el-tab-pane label="预测分析图">
                <div id="rightEchertsBottom3" style="width:67vw;height:386px" ref="rightEchertsBottom3"></div>
                <div class="predictDate">
                    <p>还需<span>{{predictnNewdata}}</span>天</p>
                    <p>预计完工时间：{{predictnTime}}</p>
                </div>
            </el-tab-pane>
        </el-tabs>
  </div>
</div>
</template>

<script>
    export default {
        data() {
            return {
              birvalue1:0,  //饼图
              birvalue2:0,
              birvalue3:0,
              fontId:this.$parent.$parent.$parent.popData.fdProid,
              percent1:0,   //百分比
              percent2:0,
              percent3:0,
              kilometre1:"0", //完成台数
              kilometre2:"0", //完成台数
              kilometre3:"0", //完成台数
              gross:"0",      //工程总量
              histogram1:[],    //风机吊装
              histogram2:[],    //箱变基础
              histogram3:[],    //箱变安装
              histogramx:[],    //水平线
              bargraphdata:[],
              zhouAareadata:[],     //周面积图data
              areaCharts1:[],   //面积道路清表
              areaCharts2:[],   //面积道路放线
              areaCharts3:[],   //面积道路施工
              areagramx:[],     //面积水平线
              zheGramxdata:[],  //折线图data数据
              zheGramx:[],         //折线水平线
              zheGram1:[],          //道路施工预测工期
              zheGram2:[],          //道路施工建议完成量
              predictnNewdata:0,   //折线图还需多少天
              predictnTime:"0000-00-00",       //折线图预计完工时间
              yeardata:"",
              numMax:0,       //y轴最大值
            }
        },
        methods:{
          // 饼图
          leftEchertsBottom(){
            this.optionleft = {
                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    data:['风机吊装','箱变基础','箱变安装']
                },
                calculable : true,
                series : [
                    {
                        name:'访问来源',
                        type:'pie',
                        radius : '55%',
                        center: ['50%', '60%'],
                        data:[
                            {value:this.birvalue1, name:'风机吊装',itemStyle:{normal:{color:'#FFB97F'}}},
                            {value:this.birvalue2, name:'箱变基础',itemStyle:{normal:{color:'#B7A1DE'}}},
                            {value:this.birvalue3, name:'箱变安装',itemStyle:{normal:{color:'#5BB1EF'}}}
                        ]
                    }
                ]
            };
          },
          // 日完成量柱状图
          rightEchertsBottom1(){
             this.optionright = {
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow'
                        }
                    },
                    legend: {
                        right:"10%",
                        data:['日均建议完成量','风机吊装','箱变基础','箱变安装']
                    },
                    grid:{
                        bottom: 80,
                    },
                    dataZoom : {
                        show : true,
                        realtime: true,
                        start : 20,
                        end : 100
                    },
                    yAxis: {
                        type: 'value',
                        name:'台',
                        boundaryGap: [0, 0.01]
                    },
                    xAxis: {
                        type: 'category',
                        data: this.bargraphdata,
                    },
                    series: [
                        {
                            name: '风机吊装',
                            type: 'bar',
                            itemStyle: {
                                normal: {
                                    color:"#FFB97F"
                                }
                            },
                            data: this.histogram1,
                        },
                        {
                            name: '箱变基础',
                            type: 'bar',
                            itemStyle: {
                                normal: {
                                    color:"#B7A1DE"
                                }
                            },
                            data: this.histogram2
                        },
                        {
                            name: '箱变安装',
                            type: 'bar',
                            itemStyle: {
                                normal: {
                                    color:"#5BB1EF"
                                }
                            },
                            data: this.histogram3
                        },
                        {
                            name:'日均建议完成量',
                            type:'line',
                            smooth:false,   //关键点，为true是不支持虚线的，实线就用true
                            itemStyle: {
                                    normal: {
                                        color:"red",
                                        lineStyle:{
                                            width:0,
                                            type:'dashed'  //'dotted'虚线 'solid'实线
                                        }
                                    }
                            },
                            data:this.histogramx,
                            markLine: {
                                data: [
                                    {type: 'average', name: '平均值'}
                                ]
                            }
                        }
                    ]
                };

          },
          // 周完成量面积图
          rightEchertsBottom2(){
              var _this=this;
              _this.optionright2 = {
                tooltip : {
                    trigger: 'axis'
                },
                legend: {
                    right:"10%",
                    data:['日均建议完成量','风机吊装','箱变基础','箱变安装']
                },
                grid:{
                    bottom: 80,
                },
                dataZoom : {
                    show : true,
                    realtime: true,
                    start : 20,
                    end : 100
                },
                calculable : true,
                xAxis : [
                    {
                        type : 'category',
                        boundaryGap :false,
                        data : this.zhouAareadata
                    }
                ],
                yAxis : [
                    {
                        type : 'value',
                        name:'台',
                        boundaryGap: [0, 0.01]
                    }
                ],
                series : [
                    {
                        name:'风机吊装',
                        type:'line',
                        smooth:true,
                        itemStyle: {normal: {areaStyle: {type: 'default'},color:"rgb(245,192,168)"}},
                        data:this.areaCharts1
                    },
                    {
                        name:'箱变基础',
                        type:'line',
                        smooth:true,
                        itemStyle: {normal: {areaStyle: {type: 'default'},color:"rgb(196,178,228)"}},
                        data:this.areaCharts2
                    },
                    {
                        name:'箱变安装',
                        type:'line',
                        smooth:true,
                        itemStyle: {normal: {areaStyle: {type: 'default'},color:"rgb(128,194,243)"}},
                        data:this.areaCharts3
                    },
                     {
                            name:'日均建议完成量',
                            type:'line',
                            smooth:false,   //关键点，为true是不支持虚线的，实线就用true
                            itemStyle: {
                                    normal: {
                                        color:"red",
                                        lineStyle:{
                                            width:0,
                                            type:'dashed'  //'dotted'虚线 'solid'实线
                                        }
                                    }
                            },
                            data:this.areagramx,
                            markLine: {
                                data: [
                                    {type: 'average', name: '平均值'}
                                ]
                            }
                        }
                ]
            };
        
          },
          // 预测分析图
          rightEchertsBottom3(){
                var _this=this;
              _this.optionright3 = {
                // title: {
                //     text: '折线图堆叠'
                // },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    right:"10%",
                    data:['年度计划完工日期','日均建议完成量','风机吊装预测工期','风机吊装建议完成量']
                },
                grid:{
                    bottom: 80,
                },
                dataZoom : {
                    show : true,
                    realtime: true,
                    start : 20,
                    end : 100
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: this.zheGramxdata
                },
                yAxis: {
                    type: 'value',
                    name:'台',
                    boundaryGap: [0, 0.01]
                },
                series: [
                    {
                        name:'风机吊装预测工期',
                        type:'line',
                        itemStyle: {
                                normal: {
                                    color:"#5AAFED",
                                     lineStyle:{
                                        width:2,
                                        type:'dashed'  //'dotted'虚线 'solid'实线
                                    }
                                }
                        },
                        data:this.zheGram2
                    },
                    {
                        name:'风机吊装建议完成量',
                        type:'line',
                        symbol:"circle",
                        itemStyle: {
                                normal: {
                                    color:"#5AAFED"
                                }
                        },
                        data:this.zheGram1
                    },
                    {
                        name:'日均建议完成量',
                        type:'line',
                        smooth:false,   //关键点，为true是不支持虚线的，实线就用true
                        itemStyle: {
                                normal: {
                                    color:"red",
                                    lineStyle:{
                                        width:0,
                                        type:'dashed'  //'dotted'虚线 'solid'实线
                                    }
                                }
                        },
                        data:this.zheGramx,
                        markLine: {
                            data: [
                                {type: 'average', name: '平均值'}
                            ]
                        }
                    },
                    {
                        name:'年度计划完工日期',
                        type:'line',
                        //data:[0],
                        markLine: {
                            name:'aa',
                            data: [[
                                {coord:[this.yeardata,0]},
                                {coord:[this.yeardata,this.numMax]}//如何获取grid上侧最大值，目前是写死的
                            ]]
                        }
                    }
                ]
              }
          },
           echartsShow1(){
                let leftmyChart = this.$echarts.init(this.$refs['leftEchertsBottom']);
                leftmyChart.setOption(this.optionleft);
            },
           echartsShow2(){
                let leftmyChart = this.$echarts.init(this.$refs['rightEchertsBottom1']);
                leftmyChart.setOption(this.optionright);
           },
           echartsShow3(){ 
                let leftmyChart = this.$echarts.init(this.$refs['rightEchertsBottom2']);
                leftmyChart.setOption(this.optionright2);
           },
           echartsShow4(){
                let leftmyChart = this.$echarts.init(this.$refs['rightEchertsBottom3']);
                leftmyChart.setOption(this.optionright3);
           },
           pieChart(){        //进度总览数据
                var params={
                        proId:this.fontId
                        // proId:167
                    }
                this.$http.post('/engineer/ProgressOverview/pieChartModule', params)
                .then(res => {
                    // console.log(res);
                    if(res.data.status == 200){
                        let Do=res.data.data;
                        if(Do){
                            this.birvalue1=Do.VaneHoistingCountWeight;  //风机吊装
                            this.birvalue2=Do.FoundationPouringsWeight;      //箱变基础
                            this.birvalue3=Do.BoxVariableInstallationWeight;    //箱变安装

                            this.percent1 = Number(Do.VaneHoistingCountPercent);      //百分比风机吊装
                            this.percent2 = Number(Do.FoundationPouringsPercent);      //百分比箱变基础
                            this.percent3 = Number(Do.BoxVariableInstallationPercent);      //百分比箱变安装

                            this.kilometre1=Do.VaneHoistingCount.toFixed(2);            //风机吊装完成度
                            this.kilometre2=Do.FoundationPourings.toFixed(2);           //箱变基础完成度
                            this.kilometre3=Do.BoxVariableInstallation.toFixed(2);            //箱变安装完成度

                            this.gross=Do.TotalFan          //工程总量
                        }
                    }
                }).catch(err => {
                })
           },
           barGraph(){        //柱状图数据
               var params={
                        // proId:167
                        proId:this.fontId
                    }
                this.$http.post('/engineer/ProgressOverview/barChartModule', params)
                .then(res => {
                    // console.log(res.data.data);
                    if(res.data.status == 200){
                        this.bargraphdata = res.data.data.splitDay; // x轴日期
                        this.histogram1 = res.data.data.selectVaneHoistingCount;   // 风机吊装
                        this.histogram2 = res.data.data.selectFoundationPourings;  // 箱变基础
                        this.histogram3 = res.data.data.selectBoxVariableInstallation;  // 箱变安装
                        let Dox=res.data.data.averFanNumber; //水平线
                        if(this.bargraphdata){
                            for(var i=0;i<this.bargraphdata.length;i++){
                                this.histogramx.push(Dox);   //水平线
                            }
                        }
                    }
                }).catch(err => {
                })
           },
           areaGraph(){       //面积图数据
               var params={
                        // proId:this.fontId
                        proId:167
                    }
                this.$http.post('/engineer/ProgressOverview/areaChartModule', params)
                .then(res => {
                    // console.log(res.data.data);
                    if(res.data.status == 200){
                        this.areaCharts1 = res.data.data.selectVaneHoistingCount;    //风机吊装
                        this.areaCharts2 = res.data.data.selectFoundationPourings;    //箱变基础
                        this.areaCharts3 = res.data.data.selectBoxVariableInstallation;    //箱变安装
                        let Dox = res.data.data.averFanNumber; // 水平线
                        let areatime = res.data.data.splitWeek;  // X轴日期
                        if(this.areaCharts1){
                            for(var i=0;i<this.areaCharts1.length;i++){  
                                this.areagramx.push(Dox);
                            }
                        }
                        if(areatime){
                            var strings="";
                            for(var i=0;i<areatime.length;i++){
                                strings=areatime[i][0]+"\n"+areatime[i][1];
                                this.zhouAareadata.push(strings);
                            }
                        }
                    }
                }).catch(err => {
                })
           },
           zheGreaph(){       //预测分析图
           var  _this=this;
                var params={
                        proId:_this.fontId
                        // proId:167
                    }
                _this.$http.post('/engineer/ProgressOverview/predictionAnalysisChartModule', params)
                .then(res => {
                    if(res.data.status == 200){
                        _this.zheGramxdata = res.data.data.splitDay; // X轴日期
                        _this.yeardata = res.data.data.nowDate; // 当前时间
                        for(var i=0;i<_this.zheGramxdata.length;i++){
                            _this.zheGramx.push(res.data.data.averFanNumber);// 水平线
                            if(_this.zheGramxdata[i] < _this.yeardata){
                                _this.zheGram2.push('-')
                            }else{
                                _this.zheGram2.push(res.data.data.needDays);
                            }
                        }
                        _this.zheGram1 = res.data.data.selectVaneHoistingCount; // 风机吊装预测工期
                        _this.predictnNewdata = res.data.data.needDays; // 还需天数
                        _this.predictnTime = res.data.data.needDate;  // 预计完工时间
                        _this.numMax=res.data.data.selectWorkedsNumMax;
                        
                    }
                }).catch(err => {
                })
           }
        },
        mounted(){
            this.pieChart();   //获取饼状图数据
            this.leftEchertsBottom();
            this.echartsShow1();

            this.barGraph();    //获取柱状图
            this.rightEchertsBottom1();
            this.echartsShow2();

            this.areaGraph();    //面积图
            this.rightEchertsBottom2();
            this.echartsShow3();

            this.zheGreaph();    //预测分析图
            this.rightEchertsBottom3();
            this.echartsShow4();
        },
        watch:{
            birvalue1(){
                this.leftEchertsBottom();
                this.echartsShow1();
            },
            histogram1(){
                this.rightEchertsBottom1();
                this.echartsShow2();
            },
            areaCharts1(){
                this.rightEchertsBottom2();
                this.echartsShow3();
            },
            zheGram1(){
                this.rightEchertsBottom3();
                this.echartsShow4();
            }
        },
    }
</script>
<style>
.leftEcharts .grie{
    display: flex;
    justify-content: space-between;
}
.leftEcharts p{
    padding: 10px 20px;
}
.leftEcharts p span:nth-child(2){
    width: 60%;
    padding:0 10px;
    display: inline-block;
}
.leftEcharts .el-progress{
    width: 100%;
}
#rightEchertsBottom3{
    position: relative;
}
.predictDate{
    width:170px;
    height:50px;
    position:absolute;
    overflow: hidden;
    right: 15%;
    top:13%;
    z-index: 9999;
    border:1px solid #C9C9C9;
    background: #F8F8F8;
    border-radius: 2px;
    /* opacity: 0.6; */
}
.predictDate p{
    margin:0px;
    text-align: center;
    line-height: 24px;
    font-size: 16px;
    color: #434343;
}
.predictDate p span{
    font-size: 18px;
    color:red;
    margin: 0px 5px;
}
.predictDate p:nth-child(2){
    font-size: 12px;
}
.tabs .el-tabs__active-bar{
    width:119px !important;
}
.tabs .el-tabs__active-bar .is-top{
    text-align: center !important;
}
</style>
