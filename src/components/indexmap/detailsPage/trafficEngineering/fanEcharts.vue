<template>
<div>
    <!-- 总工程量/计划预期 -->
  <div class="leftEcharts" style="width: 30%; border: 1px solid #EAF0F4;float: left">
    <div style="width:100%;height: 50px;background-color:#F9FAFB;position: relative; ">
      <span style="width:100%;position: absolute;font-size: larger;font-weight: bold;margin-top: 12px;margin-left: 13px;color:#58616E;">
        进度总览
      </span>
    </div>
    <div style="height:391px;width:100%;border: 1px solid #EAF0F4;">
       <div id="leftEchertsBottom" style="width:29vw;height:210px" ref="leftEchertsBottom"></div>
       <!-- 进度条 -->
        <div class="bfber" style="width:100%;height:193px;padding-top:5px;">
           <p class="grie">
               <span>基坑开挖</span>
               <span><el-progress :text-inside="true" :stroke-width="18" :percentage="percent1>100?100:percent1" color="#2DC7C9"></el-progress></span>
               <span>{{kilometre1}}/{{gross}}台</span>
            </p>
            <p class="grie">
               <span>地基处理</span>
               <span><el-progress :text-inside="true" :stroke-width="18" :percentage="percent2>100?100:percent2" color="#FFB980"></el-progress></span>
               <span>{{kilometre2}}/{{gross}}台</span>
            </p>
            <p class="grie">
               <span>垫层浇筑</span>
               <span><el-progress :text-inside="true" :stroke-width="18" :percentage="percent3>100?100:percent3" color="#D77A80"></el-progress></span>
               <span>{{kilometre3}}/{{gross}}台</span>
            </p>
            <p class="grie">
               <span>钢筋绑扎</span>
               <span><el-progress :text-inside="true" :stroke-width="18" :percentage="percent4>100?100:percent4" color="#97B551"></el-progress></span>
               <span>{{kilometre4}}/{{gross}}台</span>
            </p>
            <p class="grie">
               <span>模板安装</span>
               <span><el-progress :text-inside="true" :stroke-width="18" :percentage="percent5>100?100:percent5" color="#95706D"></el-progress></span>
               <span>{{kilometre5}}/{{gross}}台</span>
            </p>
            <p class="grie">
               <span>基础浇筑</span>
               <span><el-progress :text-inside="true" :stroke-width="18" :percentage="percent6>100?100:percent6" color="#DB69AA"></el-progress></span>
               <span>{{kilometre6}}/{{gross}}台</span>
            </p>
        </div>
    </div>
  </div>
  <div class="tabes" style="width: 66%;border: 2px solid #EAF0F4;float: left;margin-left:3%;">
      <el-tabs style="width:100%;height:440px;" id="tabpane">
            <el-tab-pane label="日完成量柱状图">
                <div id="rightEchertsBottom1" style="width:67vw;height:385px" ref="rightEchertsBottom1"></div>
            </el-tab-pane>
            <el-tab-pane label="周完成量面积图">
                <div id="rightEchertsBottom2" style="width:67vw;height:385px" ref="rightEchertsBottom2"></div>
            </el-tab-pane>
            <el-tab-pane label="预测分析图">
                <div id="rightEchertsBottom3" style="width:67vw;height:385px" ref="rightEchertsBottom3"></div>
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
import { filterList } from "../../../../utils";
import { join } from "path";
export default {
  data() {
    return {
      projectId: "",

      birvalue1:0, //饼状图
      birvalue2:0,
      birvalue3:0,
      birvalue4:0,
      birvalue5:0,
      birvalue6:0,
      percent1: 0, //百分比
      percent2: 0,
      percent3: 0,
      percent4: 0,
      percent5: 0,
      percent6: 0,

      kilometre1:0, //完成台
      kilometre2:0, //完成台
      kilometre3:0, //完成台
      kilometre4:0, //完成台
      kilometre5:0,
      kilometre6:0,

      gross: "0", //工程总量
      dayBarData: {  //天 柱状图
        bargraphdata: [],
        excavationList: [],
        treatmentList: [],
        cushionList: [],
        bindList: [],
        pourList: [],
        installList: [],
        dailyAverage: []
      },
      weekAreaData: {  //周面积图data
        time: [],
        selectExcavation: [],
        selectTreatment: [],
        selectCushion: [],
        selectBinding: [],
        selectInstalling: [],
        selectPouring: []
      },

      zheGramxdata: [],  //折线图data数据
      zheGramx: [],      //折线水平线
      zheGram1: [],      //道路施工预测工期
      zheGram2: [],      //道路施工建议完成量
      predictnNewdata: "0", //折线图还需多少天
      numMax:0,       //y轴最大值
      predictnTime: "0000-00-00", //折线图预计完工时间
      graptate:"0%",
      yeardata:"" 
    };
  },
  methods: {
    //环形图
    leftEchertsBottom(){
            this.optionleft = {
                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend:[
                     {
                    x: 'center',
                    data:['基坑开挖','地基处理','垫层浇筑']
                },
                 {
                    x: 'center',
                    top:'7%',
                    data:['钢筋绑扎','模板安装','基础浇筑']
                }
                ],
                calculable : true,
                graphic:{
                     type:'text',
                     left:'center',
                     top:'55%',
                     style:{
                         text:this.graptate,
                         fontSize:22,
                         color:"#797979"
                     }
                },
                series : [
                    {
                        name:'访问来源',
                        type:'pie',
                        radius: ['50%', '70%'],
                        top:'20%',
                        center: ['50%', '60%'],
                        data:[
                            {value:this.birvalue1, name:'基坑开挖',itemStyle:{normal:{color:'#2DC7C9'}}},
                            {value:this.birvalue2, name:'地基处理',itemStyle:{normal:{color:'#FFB980'}}},
                            {value:this.birvalue3, name:'垫层浇筑',itemStyle:{normal:{color:'#D77A80'}}},
                            {value:this.birvalue4, name:'钢筋绑扎',itemStyle:{normal:{color:'#97B551'}}},
                            {value:this.birvalue5, name:'模板安装',itemStyle:{normal:{color:'#95706D'}}},
                            {value:this.birvalue6, name:'基础浇筑',itemStyle:{normal:{color:'#DB69AA'}}}
                        ]
                    }
                ]
            };
    },
    rightEchertsBottom1() {
      //柱图
      this.optionright = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        legend: {
          right: "10%",
          data: [
            "日均建议完成量",
            "基坑开挖",
            "地基处理",
            "垫层浇筑",
            "钢筋绑扎",
            "模板安装",
            "基础浇筑"
          ]
        },
        grid: {
          bottom: 80
        },
        dataZoom: {
          show: true,
          realtime: true,
          start: 20,
          end: 100
        },
        yAxis: {
          type: "value",
          name: "台",
           boundaryGap: [0, 0.01]
          // boundaryGap: [0, 12]
        },
        xAxis: {
          //x轴
          type: "category",
          data: this.dayBarData.bargraphdata
        },
        series: [
          {
            name: "基坑开挖",
            type: "bar",
            itemStyle: {
              normal: {
                color: "#2DC7C9"
              }
            },
            data: this.dayBarData.excavationList
          },
          {
            name: "地基处理",
            type: "bar",
            itemStyle: {
              normal: {
                color: "#FFB980"
              }
            },
            //数据
            data: this.dayBarData.treatmentList
          },
          {
            name: "垫层浇筑",
            type: "bar",
            itemStyle: {
              normal: {
                color: "#D77A80"
              }
            },
            data: this.dayBarData.cushionList
          },
          {
            name: "钢筋绑扎",
            type: "bar",
            itemStyle: {
              normal: {
                color: "#97B551"
              }
            },
            data: this.dayBarData.bindList
          },
          {
            name: "模板安装",
            type: "bar",
            itemStyle: {
              normal: {
                color: "#95706D"
              }
            },
            data: this.dayBarData.installList
          },
          {
            name: "基础浇筑",
            type: "bar",
            itemStyle: {
              normal: {
                color: "#DB69AA"
              }
            },
            data: this.dayBarData.pourList
          },
          {
            name: "日均建议完成量",
            type: "line",
            smooth: false, //关键点，为true是不支持虚线的，实线就用true
            itemStyle: {
              normal: {
                color: "red",
                lineStyle: {
                  width: 0,
                  type: "dashed" //'dotted'虚线 'solid'实线
                }
              }
            },
            data: this.dayBarData.dailyAverage,
            markLine: {
              data: [{ type: "average", name: "平均值" }]
            }
          }
        ]
      };
    },
    rightEchertsBottom2() {
      //周完成量面积折线图
      var _this = this;
      _this.optionright2 = {
        tooltip: {
          trigger: "axis"
        },
        legend: {
          right: "10%",
          data: [
            "日均建议完成量",
            "基坑开挖",
            "地基处理",
            "垫层浇筑",
            "钢筋绑扎",
            "模板安装",
            "基础浇筑"
          ]
        },
        grid: {
          bottom: 80
        },
        dataZoom: {
          show: true,
          realtime: true,
          start: 20,
          end: 100
        },
        calculable: true,
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: this.weekAreaData.time
          }
        ],
        yAxis: [
          {
            type: "value",
            name: "台",
            boundaryGap: [0, 0.01]
          }
        ],
        series: [
          {
            name: "基坑开挖",
            type: "line",
            smooth: true,
            itemStyle: {
              normal: {
                areaStyle: { type: "default" },
                color: "rgb(45,199,201)"
              }
            },
            data: this.weekAreaData.selectExcavation
          },
          {
            name: "地基处理",
            type: "line",
            smooth: true,
            itemStyle: {
              normal: {
                areaStyle: { type: "default" },
                color: "rgb(255,185,128)"
              }
            },
            data: this.weekAreaData.selectTreatment
          },
          {
            name: "垫层浇筑",
            type: "line",
            smooth: true,
            itemStyle: {
              normal: {
                areaStyle: { type: "default" },
                color: "rgb(215,122,128)"
              }
            },
            data: this.weekAreaData.selectCushion
          },
          {
            name: "钢筋绑扎",
            type: "line",
            smooth: true,
            itemStyle: {
              normal: {
                areaStyle: { type: "default" },
                color: "rgb(151,181,81)"
              }
            },
            data: this.weekAreaData.selectBinding
          },
          {
            name: "模板安装",
            type: "line",
            smooth: true,
            itemStyle: {
              normal: {
                areaStyle: { type: "default" },
                color: "rgb(149,112,109)"
              }
            },
            data: this.weekAreaData.selectInstalling
          },
          {
            name: "基础浇筑",
            type: "line",
            smooth: true,
            itemStyle: {
              normal: {
                areaStyle: { type: "default" },
                color: "rgb(219,105,170)"
              }
            },
            data: this.weekAreaData.selectPouring
          }
        ]
      };
    },
    rightEchertsBottom3(){//折线图
                var _this=this;
              _this.optionright3 = {
                title: {
                    //text: '折线图'
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    right:"10%",
                    data:['年度计划完工日期','日均建议完成量','基础浇筑预测工期','基础浇筑建议完成量']
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
                        name:'基础浇筑建议完成量',
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
                        name:'基础浇筑预测工期',
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
                        data:this.zheGram2
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
    echartsShow1() {
      //饼图
      let leftmyChart = this.$echarts.init(this.$refs["leftEchertsBottom"]);
      leftmyChart.setOption(this.optionleft);
    },
    echartsShow2() {
      //柱图
      let leftmyChart = this.$echarts.init(this.$refs["rightEchertsBottom1"]);
      leftmyChart.setOption(this.optionright);
    },
    echartsShow3() {
      //折线图
      let leftmyChart = this.$echarts.init(this.$refs["rightEchertsBottom2"]);
      leftmyChart.setOption(this.optionright2);
    },
    echartsShow4() {
      //折线图
      let leftmyChart = this.$echarts.init(this.$refs["rightEchertsBottom3"]);
      leftmyChart.setOption(this.optionright3);
    },
    pieChart() {  //进度总览数据
      var params={
                fdProid:this.projectId
            }
        this.$http.post('/engineer/queryPieChartProgress', params)
        // this.$http.post('queryTotalProgress', params)
        .then(res => {
            let Do=res.data.data;
            if(res.status==200){
                this.birvalue1=Do.a3;           //基坑开挖
                this.birvalue2=Do.a4;            //地基处理
                this.birvalue3=Do.a2;         //垫层浇筑
                this.birvalue4=Do.a5;                //钢筋绑扎
                this.birvalue5=Do.a6;            //模板安装
                this.birvalue6=Do.a1;                    //基础浇筑

                this.percent1=Number(Do.p3);      //百分比基坑开挖
                this.percent2=Number(Do.p4);      //百分比地基处理
                this.percent3=Number(Do.p2);      //百分比垫层浇筑
                this.percent4=Number(Do.p5);      //百分比钢筋绑扎
                this.percent5=Number(Do.p6);      //百分比模板安装
                this.percent6=Number(Do.p1);      //百分比基础浇筑

                this.kilometre1=Do.fdPitExcavation;     //基坑开挖
                this.kilometre2=Do.fdFoundationTreatment;            //比地基处理
                this.kilometre3=Do.fdCushionPouring;    //垫层浇筑
                this.kilometre4=Do.fdBarBinding;        //钢筋绑扎
                this.kilometre5=Do.fdTemplatesInstalling;        //模板安装
                this.kilometre6=Do.fdFoundationPouring;         //基础浇筑
                if(Do.LargePercentage==undefined){
                  Do.LargePercentage=0
                }
                this.graptate=Do.LargePercentage+"%";   //饼状图百分比

                this.gross=Do.fdProid;                   //工程总量
            }
        }).catch(err => {
            console.log("数据请求失败")
        })
    },
    //柱状图数据
    barGraph() {
      var _this = this;
      this.$http.post('/engineer/selectDaily',{ fdProid: this.projectId })
        .then(res => {
          function mapDate() {
            list.map(item => {
              item.data = item;
            });
          }

          if (res.data.status == 200) {
            var list = res.data.data;
            let diffDay = parseInt((new Date(list.selectStartTime.fdPlanEndTime) - new Date(list.selectStartTime.fdPlanStartTime)) / 1000 / 60 / 60 / 24 );

            //日期list
            _this.dayBarData.bargraphdata = filterList(
              diffDay,
              list.selectStartTime.fdPlanStartTime,
              list.selectExcavation,
              "fdPitExcavation"
            ).dateList;
            //日均
            _this.dayBarData.bargraphdata.map(item => {
              _this.dayBarData.dailyAverage.push(
                list.selectStartTime.dayQuantity
                  ? list.selectStartTime.dayQuantity
                  : "0"
              );
            });
            //基坑开挖
            _this.dayBarData.excavationList = filterList(
              diffDay,
              list.selectStartTime.fdPlanStartTime,
              list.selectExcavation,
              "fdPitExcavation"
            ).list;
            //地基处理
            _this.dayBarData.treatmentList = filterList(
              diffDay,
              list.selectStartTime.fdPlanStartTime,
              list.selectTreatment,
              "fdFoundationTreatment"
            ).list;
            //垫层浇筑
            _this.dayBarData.cushionList = filterList(
              diffDay,
              list.selectStartTime.fdPlanStartTime,
              list.selectCushion,
              "fdCushionPouring"
            ).list;
            //钢筋绑扎
            _this.dayBarData.bindList = filterList(
              diffDay,
              list.selectStartTime.fdPlanStartTime,
              list.selectBinding,
              "fdBarBinding"
            ).list;
            //基础浇筑
            _this.dayBarData.pourList = filterList(
              diffDay,
              list.selectStartTime.fdPlanStartTime,
              list.selectPouring,
              "fdFoundationPouring"
            ).list;
            //模板安装
            _this.dayBarData.installList = filterList(
              diffDay,
              list.selectStartTime.fdPlanStartTime,
              list.selectInstalling,
              "fdTemplatesInstalling"
            ).list;
            _this.rightEchertsBottom1();
            _this.echartsShow2();
          }
        })
        .catch(err => {
          console.log("数据请求失败");
        });
    },

    areaGraph() {
      //面积图数据
      let _this = this;
      this.$http.post("/engineer/discussComment/selelctAreaChart", {itemId: this.projectId})
        .then(res => {
          if (res.data.status == 200) {
            _this.weekAreaData = res.data.data;
            _this.weekAreaData.time = res.data.data.time.map(list => {
              return (list = list[0] + "\n" + list[1]);
            });
            _this.rightEchertsBottom2();
            _this.echartsShow3();
          }
        })
        .catch(err => {
          console.log("数据请求失败");
        });
    },
    zheGreaph() {     //折线图
      var params={
              fdStageName:3,
              fdProid:this.projectId
        }
          this.$http.post('/engineer/queryAnalysisFanBase', params)
          // this.$http.post('queryPredictiveParsing', params)
          .then(res => {
              let Do=res.data.data;
              if(res.status==200){
                  this.predictnTime=Do.finishTime;
                  this.predictnNewdata=Do.forecast;
                  this.yeardata=Do.currentTime;
                  this.numMax=Do.maximumNumber;
                  for(var i=0;i<Do.complete.length;i++){
                      this.zheGramxdata.push(Do.complete[i].key)  //折线图Y轴数据
                      this.zheGram1.push(Do.complete[i].value)  //道路施工预测工期
                      this.zheGramx.push(Do.daycomplete)      //日均建议完成量
                      if(Do.complete[i].key<this.yeardata){
                        this.zheGram2.push('-')
                      }else{
                         this.zheGram2.push(Do.forecast) //基础浇筑建议完成量
                      }
                  }
              }
          }).catch(err => {
              console.log("数据请求失败")
          })
    }
  },
  mounted() {
    this.projectId = JSON.parse(this.$route.query.mapData).fdProid;
    this.pieChart(); //获取饼状图数据
    this.leftEchertsBottom();
    this.echartsShow1();

    this.barGraph(); //获取柱状图

    this.areaGraph(); //面积图

    this.zheGreaph(); //折线图
    this.rightEchertsBottom3();
    this.echartsShow4();
  },
  watch: {
    birvalue1() {
      this.leftEchertsBottom();
      this.echartsShow1();
    },
    excavationList() {
      this.rightEchertsBottom1();
      this.echartsShow2();
    },
    dayBarData: {
      handler() {
        this.rightEchertsBottom1();
        this.echartsShow2();
      },
      deep: true
    },
    weekAreaData: {
      handler() {
        this.rightEchertsBottom2();
        this.echartsShow3();
      },
      deep: true
    },
    zheGram1() {
      this.rightEchertsBottom3();
      this.echartsShow4();
    }
  },
  created() {}
};
</script>
<style scoped>
.leftEcharts .grie {
  display: flex;
  justify-content: space-between;
}
.leftEcharts p{
  padding: 1px 20px;
}
.leftEcharts p span:nth-child(2) {
  width: 60%;
  padding: 0 10px;
  display: inline-block;
}
.leftEcharts .el-progress {
  width: 100%;
}
#rightEchertsBottom3 {
  position: relative;
}
.predictDate {
  width: 170px;
  height: 50px;
  position: absolute;
  overflow: hidden;
  right: 15%;
  top: 13%;
  z-index: 9999;
  border: 1px solid #c9c9c9;
  background: #f8f8f8;
  border-radius: 2px;
  /* opacity: 0.6; */
}
.predictDate p {
  margin: 0px;
  text-align: center;
  line-height: 24px;
  font-size: 16px;
  color: #434343;
}
.predictDate p span {
  font-size: 18px;
  color: red;
  margin: 5px 5px;
}
.predictDate p:nth-child(2) {
  font-size: 12px;
}
.tabes .el-tabs__active-bar {
  width: 119px !important;
}
.tabes .el-tabs__active-bar .is-top {
  text-align: center !important;
}
#tabpane /deep/ .el-tabs__active-bar{
    width:119px !important;
}
</style>
