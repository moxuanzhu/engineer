<template>
<div>
    <!-- 总工程量/计划预期 -->
  <div class="leftEcharts" style="width: 30%;border: 1px solid #EAF0F4;float: left">
    <div style="width:100%;height: 50px;background-color:#F9FAFB;position: relative; ">
      <span style="width:100%;position: absolute;font-size: larger;font-weight: bold;margin-top: 12px;margin-left: 13px;color:#58616E;"> 
        进度总览
      </span>
    </div>
    <!-- 南丁格尔玫瑰图 -->
    <div style="height: 391px;border: 1px solid #EAF0F4;">
       <div id="leftEchertsBottom" style="width:100%;height:230px" ref="leftEchertsBottom"></div>
        <!-- 进度条 -->
        <div class="bfber" style="width:100%;height:180px;padding-top:1px;">
           <p class="grie">
               <span>基础开挖</span>
               <span><el-progress :text-inside="true" :stroke-width="14" :percentage="percent1>100?100:percent1" color="#38A2DA"></el-progress></span>
               <span>{{kilometre1}}/{{gross1}}</span>
            </p>
            <p class="grie">
               <span>基础浇筑</span>
               <span><el-progress :text-inside="true" :stroke-width="14" :percentage="percent2>100?100:percent2" color="#33C7E9"></el-progress></span>
               <span>{{kilometre2}}/{{gross2}}</span>
            </p>
            <p class="grie">
               <span>塔材组立</span>
               <span><el-progress :text-inside="true" :stroke-width="14" :percentage="percent3>100?100:percent3" color="#9EE6B7"></el-progress></span>
               <span>{{kilometre3}}/{{gross3}}</span>
            </p>
            <p class="grie">
               <span>塔材到货</span>
               <span><el-progress :text-inside="true" :stroke-width="14" :percentage="percent4>100?100:percent4" color="#FFDB5C"></el-progress></span>
               <span>{{kilometre4}}/{{gross4}}</span>
            </p>
            <p class="grie">
               <span class="tightenLine">放紧线</span>
               <span><el-progress :text-inside="true" :stroke-width="14" :percentage="percent5>100?100:percent5" color="#FF9F7F"></el-progress></span>
               <span>{{kilometre5}}/{{gross5}}</span>
            </p>
            <p class="grie" v-show="percent6!=0 && kilometre6!= 0 && gross6 !=0">
               <span>地埋敷设</span>
               <span><el-progress :text-inside="true" :stroke-width="14" :percentage="percent6>100?100:percent6" color="#FB7293" ></el-progress></span>
               <span>{{kilometre6}}/{{gross6}}</span>
            </p>
             <p class="grie" v-show="percent7!=0 && kilometre7!= 0 && gross7!=0">
               <span>架空线路</span>
               <span><el-progress :text-inside="true" :stroke-width="14" :percentage="percent7>100?100:percent7" color="#8378EA"></el-progress></span>
               <span>{{kilometre7}}/{{gross7}}</span>
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
                <div class="predictDates">
                    <p>基础浇筑还需<span>{{predictnNewdata}}</span>天</p>
                    <p>预计完工时间：{{predictnTime}}</p>
                    <p>塔材组立还需<span>{{predictnNewdatas}}</span>天</p>
                    <p>预计完工时间：{{predictnTimes}}</p>
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
              birvalue1:0,  //南丁格尔玫瑰图
              birvalue2:0,
              birvalue3:0,
              birvalue4:0,  
              birvalue5:0,
              birvalue6:0,
              birvalue7:0,

              fontId:this.$parent.$parent.$parent.popData.fdProid,
              percent1:0,   //百分比
              percent2:0,
              percent3:0,
              percent4:0,   //百分比
              percent5:0,
              percent6:0,
              percent7:0,

              kilometre1:0, //完成
              kilometre2:0, //完成
              kilometre3:0, //完成
              kilometre4:0, //完成
              kilometre5:0, //完成
              kilometre6:0, //完成
              kilometre7:0, //完成

              gross1:0,//总数量
              gross2:0,
              gross3:0,
              gross4:0,
              gross5:0,
              gross6:0,
              gross7:0,
              
              graptate:'0%',//南丁格尔玫瑰图圆心百分比
              burying:['塔材到货'],
              overviewProgress:[],

              histogram1:[],    //基础开挖
              histogram2:[],    //基础浇筑
              histogram3:[],    //塔材组立
              histogram4:[],    //塔材到货
              histogram5:[],    //放紧线
              histogram6:[],    //地埋敷设
              histogram7:[],    //架空线路
              histogramx:[],    //水平线
              bargraphdata:[],   //柱状图X轴数据
              bargraphtitle:['日均建议完成量','基础开挖','基础浇筑','塔材组立','塔材到货','放紧线'],         //柱状图标题数据
              zhouAareadata:[],     //周面积图data
              zhouAareatitle:['日均建议完成量','基础开挖','基础浇筑','塔材组立','塔材到货','放紧线'],    //周完成面积图
              areaCharts1:[],   //面积基础开挖
              areaCharts2:[],   //面积基础浇筑
              areaCharts3:[],   //面积塔材组立
              areaCharts4:[],   //面积塔材到货
              areaCharts5:[],   //面积放紧线
              areaCharts6:[],   //面积地埋敷设
              areaCharts7:[],   //面积架空线路
              areagramx:[],     //面积水平线
              zheGramxdata:[],  //折线图data数据
              zheGramx:[],         //折线水平线
              zheGram1:[],          //预测基础浇筑工程
              zheGram2:[],          //建议基础浇筑完成量
              zheGram3:[],          //预测塔材组立工期
              zheGram4:[],          //建议塔材组立完成量
              predictnNewdata:0,   //折线图还需多少天   基础浇筑
              predictnNewdatas:0,   //折线图还需多少天  塔材组立
              predictnTime:"0000-00-00",       //折线图预计完工时间  基础浇筑
              predictnTimes:"0000-00-00",       //折线图预计完工时间 塔材组立
              yeardata:"",
              numMax:0,       //y轴最大值
              dailyCompletion:[],   //初始柱状图结构
              zhouAareation:[]
   
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
                legend:[
                     {
                        type:'plain',   //图例多时使用scroll
                        x: 'center',
                        data:['基础开挖','基础浇筑','塔材组立','放紧线']
                    },
                    {
                        // x:83,
                        top:'9%',
                        data:this.burying
                    }
              
                ],
                calculable : true,
                graphic:{//饼图圆心百分比位置
                     type:'text',
                     left:'center',
                     top:'57%',
                     style:{
                         text:this.graptate,
                         fontSize:12,
                         color:"#797979",
                     }
                },
                series : [
                    {
                        center: ['50%', '60%'], // 第一项是横坐标，第二项是纵坐标                 
                        name:'面积模式',
                        type:'pie',
                        radius : [30, 82],//第一项是内半径，第二项是外半径
                        roseType : 'area',//radius圆心的数据百分比
                      
                        label : {
                                normal : {
                                    show:true,
                                    formatter: '{d}%',
                                    textStyle : {
                                    fontWeight : 'normal',
                                    fontSize : 12,
                                
                                    }
                                }
                            }, 
                        data:this.overviewProgress
                    }
                ]
            };
          },
          // 日完成量柱状图
          rightEchertsBottom1(){
             this.optionright = {
                    tooltip: {
                        trigger:'axis',
                        axisPointer: {
                            type:'shadow'
                        }
                    },
                    legend: {
                        right:"10%",
                        data:this.bargraphtitle
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
                        boundaryGap: [0, 0.01]
                    },
                    xAxis: {
                        type: 'category',
                        data: this.bargraphdata,
                    },
                    series: this.dailyCompletion
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
                    data:this.zhouAareatitle
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
                        boundaryGap: [0, 0.01]
                    }
                ],
                series : this.zhouAareation
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
                    data:['年度计划完工日期','日均建议完成量','预测基础浇筑工期','建议基础浇筑完成量','预测塔材组立工期','建议塔材组立完成量']
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
                    boundaryGap: [0, 0.01]
                },
                series: [
                    {
                        name:'预测基础浇筑工期',
                        type:'line',
                        itemStyle: {
                                normal: {
                                    color:"#33C5E9",
                                     lineStyle:{
                                        width:2,
                                        type:'dashed'  //'dotted'虚线 'solid'实线
                                    }
                                }
                        },
                        data:this.zheGram1
                    },
                    {
                        name:'建议基础浇筑完成量',
                        type:'line',
                        symbol:"circle",
                        itemStyle: {
                                normal: {
                                    color:"#33C5E9"
                                }
                        },
                        data:this.zheGram2
                    },
                    {
                        name:'预测塔材组立工期',
                        type:'line',
                        itemStyle: {
                                normal: {
                                    color:"#9EE6B7",
                                     lineStyle:{
                                        width:2,
                                        type:'dashed'  //'dotted'虚线 'solid'实线
                                    }
                                }
                        },
                        data:this.zheGram3
                    },
                    {
                        name:'建议塔材组立完成量',
                        type:'line',
                        symbol:"circle",
                        itemStyle: {
                                normal: {
                                    color:"#9EE6B7"
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
                    },
                    {
                        name:'年度计划完工日期',
                        type:'line',
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
           echartsShow1(){//南丁格尔玫瑰图
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
                        fdProid:this.fontId
                    }
                this.$http.post('/engineer/tbCollectorzwq/queryCollectorEchartsData', params)
                .then(res => {
                    let Do=res.data.data;
                    if(res.data.status == 200){
                        this.birvalue1=Do.excavationqz;   //基础开挖
                        this.birvalue2=Do.pouringQZ;      //基础浇筑
                        this.birvalue3=Do.pagodaQZ;       //塔材组立
                        this.birvalue4=Do.pagodaArrivalQZ;  //塔材到货
                        this.birvalue5=Do.tightenLineQZ;      //放紧线
                        
                        this.overviewProgress=[
                            {value:this.birvalue1, name:'基础开挖',itemStyle:{normal:{color:'#38A2DA'}}},
                            {value:this.birvalue2, name:'基础浇筑',itemStyle:{normal:{color:'#33C7E9'}}},
                            {value:this.birvalue3, name:'塔材组立',itemStyle:{normal:{color:'#9EE6B7'}}},
                            {value:this.birvalue4, name:'塔材到货',itemStyle:{normal:{color:'#FFDB5C'}}},
                            {value:this.birvalue5, name:'放紧线',itemStyle:{normal:{color:'#FF9F7F'}}}
                        ]
                         
                        if(Do.buryingStatus==1){    //地埋敷设
                            this.burying.push('地埋敷设');     
                            this.birvalue6=Do.buryingQZ;
                            this.kilometre6=Do.collectorBurying.fdFinish;            //地埋敷设完成
                            this.gross6=Do.collectorBurying.fdTotal;                 //地埋敷设总量
                            var obj={value:this.birvalue6, name:'地埋敷设',itemStyle:{normal:{color:'#FB7293'}}};//动态
                            this.overviewProgress.push(obj);
                        };

                        if(Do.overheadLineStatus==1){   //架空线路 
                            this.burying.push('架空线路');    
                            this.birvalue7=Do.overheadLineQZ;
                            this.kilometre7=Do.collectorOverheadLine.fdFinish;       //架空线路完成
                            this.gross7=Do.collectorOverheadLine.fdTotal;            //架空线路总量
                            var obj={value:this.birvalue7, name:'架空线路',itemStyle:{normal:{color:'#8378FA'}}};//动态
                            this.overviewProgress.push(obj);
                        };
                       
                        //南丁格尔玫瑰图中心百分比
                        this.graptate =((this.birvalue1+this.birvalue2+this.birvalue3+this.birvalue4+this.birvalue5+this.birvalue6+this.birvalue7)*100).toFixed(2)+"%";
                        
                        this.percent1 = Number(Do.queryExcavation.fdPercent.toFixed(2));      //百分比基础开挖
                        this.percent2 = Number(Do.collectorPouring.fdPercent.toFixed(2));      //百分比基础浇筑
                        this.percent3 = Number(Do.collectorPagoda.fdPercent.toFixed(2));      //百分比塔材组立
                        this.percent4 = Number(Do.collectorPagodaArrival.fdPercent.toFixed(2));      //百分比塔材到货
                        this.percent5 = Number(Do.collectorTightenLine.fdPercent.toFixed(2));      //百分比放紧线
                        this.percent6 = Number(Do.collectorBurying.fdPercent.toFixed(2));      //百分比地埋敷设
                        this.percent7 = Number(Do.collectorOverheadLine.fdPercent.toFixed(2)); //百分比架空线路

                        this.kilometre1=Do.queryExcavation.fdFinish;            //基础开挖完成
                        this.gross1=Do.queryExcavation.fdTotal;                 //基础开挖总量
                        
                        this.kilometre2=Do.collectorPouring.fdFinish;           //基础浇筑完成
                        this.gross2=Do.collectorPouring.fdTotal;                //基础浇筑总量
                        
                        this.kilometre3=Do.collectorPagoda.fdFinish;            //塔材组立完成
                        this.gross3=Do.collectorPagoda.fdTotal;                 //塔材组立总量

                        this.kilometre4=Do.collectorPagodaArrival.fdFinish;      //塔材到货完成
                        this.gross4=Do.collectorPagodaArrival.fdTotal;           //塔材到货总量

                        this.kilometre5=Do.collectorTightenLine.fdFinish;        //放紧线完成
                        this.gross5=Do.collectorTightenLine.fdTotal;             //放紧线总量
                    }
                }).catch(err => {
                })
           },
           barGraph(){        //柱状图数据
               var params={
                        // fdProid:167
                        fdProid:this.fontId
                    }
                this.$http.post('/engineer/CollectorCycleAndAnalysisChart/queryPredictionAnalysisChartModule', params)
                .then(res => {
                   
                    let Do=res.data.data;
                    if(res.data.status == 200){
                        this.bargraphdata=Do.splitDay;
                        this.histogram1=Do.queryFoundationExcavation;   //基础开挖
                        this.histogram2=Do.queryCollectorPouring;       //基础浇筑
                        this.histogram3=Do.queryCollectorPagoda;        //塔材组立
                        this.histogram4=Do.queryCollectorPagodaArrival; //塔材到货
                        this.histogram5=Do.queryCollectorTightenLine;   //放紧线
                        this.histogram6=Do.queryCollectorBurying;    //地埋敷设
                        this.histogram7=Do.querytCollectorOverheadLine;    //架空线路
                        var services=[
                            {
                                name: '基础开挖',
                                type: 'bar',
                                itemStyle: {
                                    normal: {
                                        color:"#38A2DA"
                                    }
                                },
                                data: this.histogram1,
                            },
                            {
                                name: '基础浇筑',
                                type: 'bar',
                                itemStyle: {
                                    normal: {
                                        color:"#33C5E9"
                                    }
                                },
                                data: this.histogram2
                            },
                            {
                                name: '塔材组立',
                                type: 'bar',
                                itemStyle: {
                                    normal: {
                                        color:"#9EE6B7"
                                    }
                                },
                                data: this.histogram3
                            },
                            {
                                name: '塔材到货',
                                type: 'bar',
                                itemStyle: {
                                    normal: {
                                        color:"#FFDB5C"
                                    }
                                },
                                data: this.histogram4
                            },
                            {
                                name: '放紧线',
                                type: 'bar',
                                itemStyle: {
                                    normal: {
                                        color:"#FF9F7F"
                                    }
                                },
                                data: this.histogram5
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
                        var dmjson={
                            name: '地埋敷设',
                            type: 'bar',
                            itemStyle: {
                                normal: {
                                    color:"#FB7293"
                                }
                            },
                            data: this.histogram6
                        };
                        var jkjson={
                            name: '架空线路',
                            type: 'bar',
                            itemStyle: {
                                normal: {
                                    color:"#8378EA"
                                }
                            },
                            data: this.histogram7
                        };
                        if(Do.querytCollectorOverheadLineisEnable==1){      //创建地埋敷设
                            services.push(dmjson)
                            this.bargraphtitle.push("地埋敷设");
                        }
                        if(Do.queryCollectorBuryingisEnable==1){        //创建架空线路判断
                            services.push(jkjson)
                            this.bargraphtitle.push("架空线路")   
                        } 
                        this.dailyCompletion=services;      //创建赋值给data初始echarts
                        for(var i=0;i<Do.splitDay.length;i++){  //水平线
                            this.histogramx.push(Do.adviseWorksNum)
                        }
                    }
                }).catch(err => {
                })
           },
           areaGraph(){       //面积图数据
               var params={
                        fdProid:this.fontId
                        // fdProid:167
                    }
                this.$http.post('/engineer/CollectorCycleAndAnalysisChart/queryAreaChartModule', params)
                .then(res => {
                    let Do=res.data.data;
                    if(res.data.status == 200){
                        this.areaCharts1=Do.queryFoundationExcavation;   //面积基础开挖
                        this.areaCharts2=Do.queryCollectorPouring;       //面积基础浇筑
                        this.areaCharts3=Do.queryCollectorPagoda;        //面积塔材组立
                        this.areaCharts4=Do.queryCollectorPagodaArrival; //面积塔材到货
                        this.areaCharts5=Do.queryCollectorTightenLine;   //面积放紧线
                        this.areaCharts6=Do.queryCollectorBurying;    //面积地埋敷设
                        this.areaCharts7=Do.querytCollectorOverheadLine;    //面积架空线路
                        var dars=[       //初始面积图结构
                            {
                                name:'基础开挖',
                                type:'line',
                                symbol:"circle",
                                smooth:true,
                                itemStyle: {normal: {areaStyle: {type: 'default'},color:"rgb(56,162,218)"}},
                                data:this.areaCharts1
                            },
                            {
                                name:'基础浇筑',
                                type:'line',
                                symbol:"circle",
                                smooth:true,
                                itemStyle: {normal: {areaStyle: {type: 'default'},color:"rgb(51,197,233)"}},
                                data:this.areaCharts2
                            },
                            {
                                name:'塔材组立',
                                type:'line',
                                symbol:"circle",
                                smooth:true,                                                                                        
                                itemStyle: {normal: {areaStyle: {type: 'default'},color:"rgb(158,230,183)"}},
                                data:this.areaCharts3
                            },
                            {
                                name:'塔材到货',
                                type:'line',
                                symbol:"circle",
                                smooth:true,
                                itemStyle: {normal: {areaStyle: {type: 'default'},color:"rgb(255,219,92)"}},
                                data:this.areaCharts4
                            },
                            {
                                name:'放紧线',
                                type:'line',
                                symbol:"circle",
                                smooth:true,
                                itemStyle: {normal: {areaStyle: {type: 'default'},color:"rgb(255 ,159,127)"}},
                                data:this.areaCharts5
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
                        var dmjson={
                            name:'地埋敷设',
                            type:'line',
                            symbol:"circle",
                            smooth:true,
                            itemStyle: {normal: {areaStyle: {type: 'default'},color:"rgb(251,114,147)"}},
                            data:this.areaCharts6
                        };
                        var jkjson={
                            name:'架空线路',
                            type:'line',
                            symbol:"circle",
                            smooth:true,
                            itemStyle: {normal: {areaStyle: {type: 'default'},color:"rgb(131,120,234)"}},
                            data:this.areaCharts7
                        };
                        if(Do.querytCollectorOverheadLineisEnable==1){      //创建地埋敷设
                            this.zhouAareatitle.push("地埋敷设");
                            dars.push(dmjson)
                        }
                        if(Do.queryCollectorBuryingisEnable==1){        //创建架空线路判断
                            this.zhouAareatitle.push("架空线路")
                            dars.push(jkjson)
                        } 
                        this.zhouAareation=dars;
                       for(var i=0;i<Do.splitWeek.length;i++){
                           this.zhouAareadata.push(Do.splitWeek[i][0]+"\n"+Do.splitWeek[i][1])
                           this.areagramx.push(Do.adviseWorksNum)
                       }
                    }
                }).catch(err => {
                })
           },
           zheGreaph(){       //预测分析图
                var params={
                        fdProid:this.fontId
                        // fdProid:167
                    }
                this.$http.post('/engineer/tbCollectorzwq/queryCollector', params)
                .then(res => {
                    let Do=res.data.data;
                    if(res.data.status == 200){
                        this.zheGramxdata=Do.splitDay;  //x周对应的时间
                        this.predictnTime=Do.endDay;    //基础浇筑预计完成时间
                        this.predictnTimes=Do.endDay2;  //基础浇筑预计完成时间
                        this.predictnNewdata=Do.surplusadevise; //基础浇筑还需多少天
                        this.predictnNewdatas=Do.surplusadevise1;   //塔材组立还需多少天
                        this.zheGram2=Do.collectorPouringList   //基础浇筑建议完成量
                        this.zheGram4=Do.collectorPagodaList   //基础浇筑建议完成量
                        this.numMax=Do.maxValue
                        this.yeardata=Do.nowDate;    //当前时间
                        for(var i=0;i<this.zheGramxdata.length;i++){
                            this.zheGramx.push(Do.daySuggestFinish);// 水平线
                            if(this.zheGramxdata[i] < this.yeardata){
                                this.zheGram1.push('-')
                                this.zheGram3.push('-')
                            }else{
                                this.zheGram1.push(Do.surplusadevise);
                                this.zheGram3.push(Do.surplusadevise1);
                            }
                        }
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
            bargraphdata(){
                this.rightEchertsBottom1();
                this.echartsShow2();
            },
            zhouAareadata(){
                this.rightEchertsBottom2();
                this.echartsShow3();
            },
            zheGramxdata(){
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
p .grie {
    margin: 0;
}
.grie .tightenLine{
    width: 48px;
}
.leftEcharts p{
    padding: 0 20px;
    margin: -4px 0px 10px;
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
.predictDates{
    width:170px;
    position:absolute;
    right: 15%;
    top:13%;
    z-index: 9999;
    border:1px solid #C9C9C9;
    background: #F8F8F8;
    border-radius: 2px;
    /* opacity: 0.6; */
}
.predictDates p{
    margin:0px;
    text-align: center;
    line-height: 24px;
    font-size: 16px;
    color: #434343;
}
.predictDates p span{
    font-size: 18px;
    color:red;
    margin: 0px 5px;
}
.predictDates p:nth-child(even){
    font-size: 12px;
}
.tabs .el-tabs__active-bar{
    width:119px !important;
}
.tabs .el-tabs__active-bar .is-top{
    text-align: center !important;
}
</style>
