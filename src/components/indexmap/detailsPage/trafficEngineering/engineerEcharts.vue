<template>
<div>
    <!-- 总工程量/计划预期   交通工程echarts-->
  <div class="leftEcharts" style="width: 30%;border: 1px solid #EAF0F4;float: left">
    <div style="width:100%;height: 50px;background-color:#F9FAFB;position: relative; ">
      <span style="width:100%;position: absolute;font-size: larger;font-weight: bold;margin-top: 12px;margin-left: 13px;color:#58616E;"> 
        进度总览
      </span>
    </div>
    <div style="height:391px;border: 1px solid #EAF0F4;">
       <div id="leftEchertsBottom" style="width:100%;height:220px" ref="leftEchertsBottom"></div>
       <div style="width:100%;height:191px;padding-top:20px;">
           <p class="grie">
               <span>道路清表</span>
               <span><el-progress :text-inside="true" :stroke-width="18" :percentage="percent1>100?100:percent1" color="#FFB97F"></el-progress></span>
               <span>{{kilometre1}}/{{gross}}公里</span>
            </p>
            <p class="grie">
               <span>道路放线</span>
               <span><el-progress :text-inside="true" :stroke-width="18" :percentage="percent2>100?100:percent2" color="#B7A1DE"></el-progress></span>
               <span>{{kilometre2}}/{{gross}}公里</span>
            </p>
            <p class="grie">
               <span>道路施工</span>
               <span><el-progress :text-inside="true" :stroke-width="18" :percentage="percent3>100?100:percent3" color="#5BB1EF"></el-progress></span>
               <span>{{kilometre3}}/{{gross}}公里</span>
            </p>
            <p class="grie">
               <span>道路平整</span>
               <span><el-progress :text-inside="true" :stroke-width="18" :percentage="percent4>100?100:percent4" color="#D8787F"></el-progress></span>
               <span>{{kilometre4}}/{{gross}}公里</span>
            </p>
        </div>
    </div>
  </div>
  <div class="tabs" style="width: 66%;border: 2px solid #EAF0F4;float: left;margin-left:3%;">
      <el-tabs style="width:100%;height:443px;" id="tabpane">
            <el-tab-pane label="日完成量柱状图">
                <div id="rightEchertsBottom1" style="width:67vw;height:386px" ref="rightEchertsBottom1"></div>
            </el-tab-pane>
            <el-tab-pane label="周完成量面积图">
                <div id="rightEchertsBottom2" style="width:67vw;height:386px" ref="rightEchertsBottom2"></div>
            </el-tab-pane>
            <el-tab-pane label="完成量趋势图">
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
              birvalue1:0,  //柱状图吊
              birvalue2:0,
              birvalue3:0,
              fontId:this.$parent.$parent.$parent.popData.fdProid,
              birvalue4:0,
              percent1:0,   //百分比
              percent2:0,
              percent3:0,
              percent4:0,
              kilometre1:"0", //完成公里
              kilometre2:"0", //完成公里
              kilometre3:"0", //完成公里
              kilometre4:"0", //完成公里
              gross:"0",      //工程总量
              histogram1:[],    //道路清表
              histogram2:[],    //道路放线
              histogram3:[],    //道路施工
              histogram4:[],    //道路平整
              histogramx:[],    //水平线
              bargraphdata:[],
              zhouAareadata:[],     //周面积图data
              areaCharts1:[],   //面积道路清表
              areaCharts2:[],   //面积道路放线
              areaCharts3:[],   //面积道路施工
              areaCharts4:[],   //面积道路平整
              zheGramxdata:[],  //折线图data数据
              zheGramx:[],         //折线水平线
              zheGram1:[],          //道路施工预测工期
              zheGram2:[],          //道路施工建议完成量
              zheGram3:[],          //道路平整预测工期
              zheGram4:[],          //道路平整建议完成量
              predictnNewdata:"0",   //折线图还需多少天
              predictnTime:"0000-00-00"       //折线图预计完工时间
            }
        },
        methods:{
          leftEchertsBottom(){
            this.optionleft = {
                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    data:['道路清表','道路放线','道路施工','道路平整','日均建议完成量']
                },
                calculable : true,
                series : [
                    {
                        name:'访问来源',
                        type:'pie',
                        radius : '55%',
                        center: ['50%', '60%'],
                        data:[
                            {value:this.birvalue1, name:'道路清表',itemStyle:{normal:{color:'#FFB97F'}}},
                            {value:this.birvalue2, name:'道路放线',itemStyle:{normal:{color:'#B7A1DE'}}},
                            {value:this.birvalue3, name:'道路施工',itemStyle:{normal:{color:'#5BB1EF'}}},
                            {value:this.birvalue4, name:'道路平整',itemStyle:{normal:{color:'#D8787F'}}}
                        ]
                    }
                ]
            };
          },
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
                        data:['日均建议完成量','道路清表','道路放线','道路施工','道路平整']
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
                        name:'公里（KM）',
                        boundaryGap: [0, 0.01]
                    },
                    xAxis: {
                        type: 'category',
                        data: this.bargraphdata
                    },
                    series: [
                        {
                            name: '道路清表',
                            type: 'bar',
                            itemStyle: {
                                normal: {
                                    color:"#FFB97F"
                                }
                            },
                            data: this.histogram1,
                        },
                        {
                            name: '道路放线',
                            type: 'bar',
                            itemStyle: {
                                normal: {
                                    color:"#B7A1DE"
                                }
                            },
                            data: this.histogram2
                        },
                        {
                            name: '道路施工',
                            type: 'bar',
                            itemStyle: {
                                normal: {
                                    color:"#5BB1EF"
                                }
                            },
                            data: this.histogram3
                        },
                        {
                            name: '道路平整',
                            type: 'bar',
                            itemStyle: {
                                normal: {
                                    color:"#D8787F"
                                }
                            },
                            data: this.histogram4
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
          rightEchertsBottom2(){
              var _this=this;
              _this.optionright2 = {
                tooltip : {
                    trigger: 'axis'
                },
                legend: {
                    right:"10%",
                    data:['道路清表','道路放线','道路施工','道路平整']
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
                        name:'公里（KM）',
                        boundaryGap: [0, 0.01]
                    }
                ],
                series : [
                    {
                        name:'道路清表',
                        type:'line',
                        smooth:true,
                        itemStyle: {normal: {areaStyle: {type: 'default'},color:"rgb(245,192,168)"}},
                        data:this.areaCharts1
                    },
                    {
                        name:'道路放线',
                        type:'line',
                        smooth:true,
                        itemStyle: {normal: {areaStyle: {type: 'default'},color:"rgb(196,178,228)"}},
                        data:this.areaCharts2
                    },
                    {
                        name:'道路施工',
                        type:'line',
                        smooth:true,
                        itemStyle: {normal: {areaStyle: {type: 'default'},color:"rgb(128,194,243)"}},
                        data:this.areaCharts3
                    },
                    {
                        name:'道路平整',
                        type:'line',
                        smooth:true,
                        itemStyle: {normal: {areaStyle: {type: 'default'},color:"rgb(238,196,199)"}},
                        data:this.areaCharts4
                    }
                ]
            };
        
          },
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
                    data:['日均建议完成量','道路施工预测工期','道路施工建议完成量','道路平整预测工期','道路平整建议完成量']
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
                    boundaryGap: [0, 0.01],
                    data: this.zheGramxdata
                },
                yAxis: {
                    type: 'value',
                    name:'公里（KM）',
                },
                series: [
                    {
                        name:'道路施工预测工期',
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
                        data:this.zheGram1
                    },
                    {
                        name:'道路施工建议完成量',
                        type:'line',
                        symbol:"circle",
                        itemStyle: {
                                normal: {
                                    color:"#5AAFED"
                                }
                        },
                        data:this.zheGram2
                    },
                    {
                        name:'道路平整预测工期',
                        type:'line',
                        itemStyle: {
                                normal: {
                                    color:"#E39EA3",
                                     lineStyle:{
                                        width:2,
                                        type:'dashed'  //'dotted'虚线 'solid'实线
                                    }
                                }
                        },
                        data:this.zheGram3
                    },
                    {
                        name:'道路平整建议完成量',
                        type:'line',
                        symbol:"circle",
                        itemStyle: {
                                normal: {
                                    color:"#E39EA3",
                                }
                        },
                        data:this.zheGram4
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
           echartsShow3(){//折线图
                let leftmyChart = this.$echarts.init(this.$refs['rightEchertsBottom2']);
                leftmyChart.setOption(this.optionright2);
           },
           echartsShow4(){//折线图
                let leftmyChart = this.$echarts.init(this.$refs['rightEchertsBottom3']);
                leftmyChart.setOption(this.optionright3);
           },
           pieChart(){        //进度总览数据
                var params={
                        fdStageName:2,
                        fdProid:this.fontId
                    }
                this.$http.post('/engineer/queryTotalProgress', params)
                // this.$http.post('queryTotalProgress', params)
                .then(res => {
                    let Do=res.data.data;
                    if(Do){
                        this.birvalue1=Do.clearTable; //道路清表
                        this.birvalue2=Do.payingOff;            //道路放线
                        this.birvalue3=Do.construction;            //道路施工
                        this.birvalue4=Do.level;            //道路平整

                        this.percent1=Do.clearTableProportion,      //百分比道路清标
                        this.percent2=Do.payingOffProportion,      //百分比道路防线
                        this.percent3=Do.constructionProportion,      //百分比道路施工
                        this.percent4=Do.levelProportion,      //百分比道路平整

                        this.kilometre1=Do.roadClearTable.toFixed(2),            //道路清表完成度
                        this.kilometre2=Do.roadLine.toFixed(2),            //道路清表完放线
                        this.kilometre3=Do.roadConstruction.toFixed(2),            //道路清表完施工
                        this.kilometre4=Do.roadLeveling.toFixed(2),            //道路清表完平整

                        this.gross=Do.fdRouteLength          //工程总量
                    }
                }).catch(err => {
                    console.log("数据请求失败")
                })
           },
           barGraph(){        //柱状图数据
               var params={
                        fdStageName:2,
                        fdProid:this.fontId
                        // fdProid:171171
                    }
                this.$http.post('/engineer/queryDayAmountOfCompletion', params)
                // this.$http.post('queryDayAmountOfCompletion', params)
                .then(res => {
                    let Do=res.data.data.roadClearTable;   //道路清表
                    let Dox=res.data.data.suggestAccomplishment; //水平线
                    let Dof=res.data.data.roadLine;        //道路放线
                    let Dos=res.data.data.roadConstruction;//道路施工
                    let Dop=res.data.data.roadLeveling;    //道路施工
                    if(Do){
                        for(var i=0;i<Do.length;i++){
                            this.bargraphdata.push(Do[i].key);   //x轴日期
                            this.histogramx.push(Dox);   //水平线
                            this.histogram1.push(Do[i].dlqb);
                        }
                    }
                    if(Dof){
                        for(var i=0;i<Dof.length;i++){
                            this.histogram2.push(Dof[i].dlqb);
                        }
                    }
                    if(Dos){
                        for(var i=0;i<Dos.length;i++){
                            this.histogram3.push(Dos[i].dlqb);
                        }
                    }
                    if(Dop){
                        for(var i=0;i<Dop.length;i++){
                            this.histogram4.push(Dop[i].dlqb);
                        }
                    }
                }).catch(err => {
                    console.log("数据请求失败")
                })
           },
           areaGraph(){       //面积图数据
               var params={
                        fdStageName:2,
                        fdProid:this.fontId
                    }
                this.$http.post('/engineer/queryKeekAmountOfCompletion', params)
                // this.$http.post('queryKeekAmountOfCompletion', params)
                .then(res => {
                    let Do=res.data.data.roadClearTable;    //道路清表
                    let Dof=res.data.data.roadLine;    //道路放线
                    let Dos=res.data.data.roadConstruction;    //道路施工
                    let Dop=res.data.data.roadLeveling;    //道路平整
                    if(Do){
                        var strings="";
                        for(var i=0;i<Do.length;i++){
                            strings=Do[i].startWeeks+"\n"+Do[i].endWeeks;
                            this.zhouAareadata.push(strings)
                            this.areaCharts1.push(Do[i].workloadSum)
                        }
                    }
                    if(Dof){
                        for(var i=0;i<Dof.length;i++){
                            this.areaCharts2.push(Dof[i].workloadSum)
                        }
                    }
                    if(Dos){
                        for(var i=0;i<Dos.length;i++){
                            this.areaCharts3.push(Dos[i].workloadSum)
                        }
                    }
                    if(Dop){
                        for(var i=0;i<Dop.length;i++){
                            this.areaCharts4.push(Dop[i].workloadSum)
                        }
                    }
                }).catch(err => {
                    console.log("数据请求失败")
                })
           },
           zheGreaph(){       //折线图
                var params={
                        fdStageName:2,
                        fdProid:this.fontId
                    }
                this.$http.post('/engineer/queryPredictiveParsing', params)
                // this.$http.post('queryPredictiveParsing', params)
                .then(res => {
                    let Do=res.data.data;
                    let Dox=res.data.data.suggestAccomplishment;
                    if(Do){
                        this.predictnTime=Do.finishTime;
                        this.predictnNewdata=Do.forecastWork
                        for(var i=0;i<Do.allTheTime.length;i++){
                            var data=new Date(Do.allTheTime[i]);
                            var year=data.getFullYear();  //年
                            var month=data.getMonth()+1;  //月
                            var date=data.getDate();      //日
                            var times=year+"/"+month+"/"+date;
                            this.zheGramxdata.push(times)
                            this.zheGramx.push(Dox)
                            this.zheGram1.push(Do.forecastWork)
                            this.zheGram2.push(Do.suggestWork)
                            this.zheGram3.push(Do.forecastLevel)
                            this.zheGram4.push(Do.suggestLevel)
                            
                        }
                    }
                }).catch(err => {
                    console.log("数据请求失败")
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

            this.zheGreaph();    //折线图
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
        created(){
        }
    }
</script>
<style scoped>
.leftEcharts .grie{
    display: flex;
    justify-content: space-between;
}
.leftEcharts p{
    padding: 5px 20px;
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
#tabpane /deep/ .el-tabs__active-bar{
    width:119px !important;
}
</style>
