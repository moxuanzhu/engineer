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
    <div style="height:391px;border: 1px solid #EAF0F4;">
      <div id="leftEchertsTop" style="width:100%;height:190px;border-bottom:1px solid #F2F2F2;" ref="leftEchertsTop"></div>
        <!-- 条形图 -->
        <div id="leftEchertsBottom" style="width:100%;height:201px;padding-top:2px;" ref="leftEchertsBottom"></div>
    </div>
  </div>
  <div class="tabs" style="width: 66%;float: left;margin-left:3%;">
      <div class="infos">
          <div class="infotitle">送出线路基础信息表</div>
          <table>
              <tbody>
                <tr>
                    <td style="width:80px;">建设主体</td>
                    <td style="width:80px;">{{construction}}</td>
                    <td style="width:80px;">接入方式</td>
                    <td>{{joinup}}</td>
                    <td style="width:80px;">线路长度</td>
                    <td style="width:80px;">
                        {{longitudinal}} km
                    </td>
                    <td style="width:80px;">线路基础数</td>
                    <td>
                        <el-input
                            size="medium"
                            placeholder="请输入内容"
                            v-model="circuit">
                        </el-input>基
                    </td>
                    <td style="width:40px;" rowspan="2" @click="confirm">√</td>
                </tr>
                <tr>
                    <td>是否跨越</td>
                    <td>{{crossdomain}}</td>
                    <td>跨越类型</td>
                    <td>
                        <el-select v-model="crossdomaintype" placeholder="请选择">
                            <el-option
                                v-for="item in options2"
                                :key="item.value"
                                :label="item.label"
                                :value="item.label"
                                :disabled="item.disabled">
                            </el-option>
                        </el-select>
                    </td>
                    <td>跨越物描述</td>
                    <td colspan="3">
                        <el-input
                            size="medium"
                            placeholder="请输入内容"
                            v-model="describe">
                        </el-input>
                    </td>
                </tr>
              </tbody>
          </table>
      </div>
      <el-tabs style="width:100%;height:305px;border: 2px solid #EAF0F4;">
            <el-tab-pane label="周完成量面积图">
                <div id="rightEchertsBottom2" style="width:67vw;height:243px" ref="rightEchertsBottom2"></div>
            </el-tab-pane>
            <el-tab-pane label="预测分析图">
                <div id="rightEchertsBottom3" style="width:67vw;height:243px" ref="rightEchertsBottom3"></div>
                <div class="predictDateds">
                    <p>基础浇筑还需<span>{{predictnNewdata}}</span>天</p>
                    <p>预计完工时间：{{predictnTime}}</p>
                    <p>线路组塔还需<span>{{predictnNewdatas}}</span>天</p>
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
              graptate:'0%',//南丁格尔玫瑰图圆心百分比           

              fontId:this.$parent.$parent.$parent.popData.fdProid,
                      
              haveArrived:[],//已到货正数
              noArrival:[],//未到货负数

              zhouAareadata:[],     //周面积图data
              areaCharts1:[],   //面积道路清表
              areaCharts2:[],   //面积道路放线
              areaCharts3:[],   //面积道路施工
              areagramx:[],     //面积水平线
              zheGramxdata:[],  //折线图data数据
              zheGramx:[],         //折线水平线
              zheGram1:[],          //预测基础浇筑工期
              zheGram2:[],          //建议基础浇筑完成量
              zheGram3:[],          //预测线路组塔工期
              zheGram4:[],          //建议线路组塔完成量
              predictnNewdata:0,   //基础浇筑还需多少天
              predictnTime:"0000-00-00",       //折线图预计完工时间
              predictnNewdatas:0,   //线路组塔还需多少天
              predictnTimes:"0000-00-00",       //折线图预计完工时间
              yeardata:"",
              numMax:0,       //y轴最大值
              options2: [{
                value: '1',
                label: '铁路'
                }, {
                value: '2',
                label: '国道',
                }, {
                value: '3',
                label: '省道'
                }, {
                value: '4',
                label: '县道'
                }, {
                value: '5',
                label: '河流'
                }, {
                value: '6',
                label: '鱼塘'
                }, {
                value: '7',
                label: '湖泊'
                }, {
                value: '8',
                label: '高山'
                }, {
                value: '9',
                label: '峡谷'
                }, {
                value: '10',
                label: '高速公路'
                }, {
                value: '11',
                label: '高压线路'
                }],
                construction:"",    //建设主体
                joinup:"",          //接入方式
                longitudinal:"",    //线路长度
                circuit:"",         //线路基本书
                crossdomain:"",     //是否跨越
                crossdomaintype:"", //跨越类型
                describe:"", //跨越物描述
                fdLineFoundationId:"" //送出线路信息表id
            }
        },
        methods:{
            // 南丁格尔玫瑰图
          leftEchertsTop(){
             this.optiontop = {
                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend:[
                     {
                    type:'plain',//图例多时使用scroll
                    itemWidth: 10,
                    itemHeight: 10,
                    itemGap: 20,
                    left:'center',
                    //right: '10%',
                    data:['基础浇筑','线路组塔','放紧线']
                    },               
   
                ],
                calculable : true,
                graphic:{//饼图圆心百分比位置
                     type:'text',
                     left:'center',
                     top:'52%',
                     style:{
                         text:this.graptate,
                         fontSize:12,
                         color:"#797979",
                     }
                },
                series : [
                    {
                        name:'占比率',
                        center: ['50%', '55%'], // 第一项是横坐标，第二项是纵坐标                 
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
                        data:[
                            {value:this.birvalue1, name:'基础浇筑',itemStyle:{normal:{color:'#4290F7'}}},
                            {value:this.birvalue2, name:'线路组塔',itemStyle:{normal:{color:'#62BE67'}}},
                            {value:this.birvalue3, name:'放紧线',itemStyle:{normal:{color:'#F3CD49'}}}

                        ]
                    }
                ]
            };
          },
          //条形图
          leftEchertsBottom(){
                this.optionbottom = {
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
                top:'3%',
                right:'10%',
                data:['未到货','已到货']
            },
            grid: {
                left: '9%',
                right: '9%',
                bottom: '3%',
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
                data : ['放紧线','线路组塔','基础浇筑']
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
          // 周完成量面积图
          rightEchertsBottom2(){
              var _this=this;
              _this.optionright2 = {
                tooltip : {
                    trigger: 'axis'
                },
                legend: {
                    right:"10%",
                    data:['日均建议完成量','基础浇筑','线路组塔','放紧线']
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
                series : [
                    {
                        name:'基础浇筑',
                        type:'line',
                        smooth:true,
                        itemStyle: {normal: {areaStyle: {type: 'default'},color:"rgb(66,144,247)"}},
                        data:this.areaCharts1
                    },
                    {
                        name:'线路组塔',
                        type:'line',
                        smooth:true,
                        itemStyle: {normal: {areaStyle: {type: 'default'},color:"rgb(97,190,103)"}},
                        data:this.areaCharts2
                    },
                    {
                        name:'放紧线',
                        type:'line',
                        smooth:true,
                        itemStyle: {normal: {areaStyle: {type: 'default'},color:"rgb(243,205,73)"}},
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
                    data:['年度计划完工日期','日均建议完成量','预测基础浇筑工期','建议基础浇筑完成量','预测线路组塔工期','建议线路组塔完成量']
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
                                    color:"#4290F7",
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
                                    color:"#4290F7",
                                }
                        },
                        data:this.zheGram2
                    },
                    {
                        name:'预测线路组塔工期',
                        type:'line',
                        itemStyle: {
                                normal: {
                                    color:"#61BE67",
                                     lineStyle:{
                                        width:2,
                                        type:'dashed'  //'dotted'虚线 'solid'实线
                                    }
                                }
                        },
                        data:this.zheGram3
                    },
                    {
                        name:'建议线路组塔完成量',
                        type:'line',
                        symbol:"circle",
                        itemStyle: {
                                normal: {
                                    color:"#61BE67"
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
           echartsShow(){//南丁格尔玫瑰
                let leftmyChart = this.$echarts.init(this.$refs['leftEchertsTop']);
                leftmyChart.setOption(this.optiontop);
            },
           echartsShow1(){//条形图
                let leftmyChart = this.$echarts.init(this.$refs['leftEchertsBottom']);
                leftmyChart.setOption(this.optionbottom);
           } ,
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
                this.$http.post('/engineer/sendOutLineZwq/querySendOutLineEchartsData', params)
                .then(res => {
                     //console.log(res);
                    let bar=res.data.data;
                    
                    if(res.data.status == 200){
                        this.birvalue1=bar.fdTionPouringQZ;         //基础浇筑
                        this.birvalue2=bar.fdLineTowerQZ;           //线路组塔
                        this.birvalue3=bar.fdSendLineQZ;            //放紧线
                        this.graptate=bar.entiretyFinishPercent.toFixed(2)+"%";    //百分比
                    }

                }).catch(err => {
                })
           },

           barGraphEcharts(){//条形图
                var params={
                    fdProid:this.fontId
                }
                this.$http.post('/engineer/sendOutLineZwq/querySendOutLineEchartsData', params)
                .then(res => {
                     let barline=res.data.data;
                    if(res.data.status == 200){
                        this.haveArrived=barline.finishiDataList;//已到货正数
                        this.noArrival=barline.notFinishiDataList;//未到货负数
                    }
                }).catch(err => {
                })
           },
           areaGraph(){       //面积图数据
               var params={
                        fdProid:this.fontId
                        // fdProid:167
                    }
                this.$http.post('/engineer/CollectorCycleAndAnalysisChart/queryTowerAreaChartModule', params)
                .then(res => {
                    if(res.data.status == 200){
                        this.areaCharts1 = res.data.data.queryTowerFoundationPouring;    //基础浇筑
                        this.areaCharts2 = res.data.data.queryTowerLine_tower;    //线路组塔
                        this.areaCharts3 = res.data.data.queryTowerTightenLine;    //放紧线
                        let Dox = res.data.data.GiveLineFoundationTotal; // 水平线
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
                        fdProid:_this.fontId
                        // fdProid:167
                    }
                _this.$http.post('/engineer/CollectorCycleAndAnalysisChart/queryTowerPredictionAnalysisChartModule', params)
                .then(res => {
                    let Do=res.data.data;
                    if(res.data.status == 200){
                        this.zheGramxdata=Do.splitDay;  //x周对应的时间
                        this.predictnTime=Do.endDay;    //基础浇筑预计完成时间
                        this.predictnTimes=Do.endDay2;  //基础浇筑预计完成时间
                        this.predictnNewdata=Do.queryTowerFoundationPouringAdviseDays; //基础浇筑还需多少天
                        this.predictnNewdatas=Do.queryTowerLine_towerAdviseDays;   //塔材组立还需多少天
                        this.zheGram2=Do.queryTowerFoundationPouring   //基础浇筑建议完成量
                        this.zheGram4=Do.queryTowerLine_tower   //塔材组立建议万成炼
                        this.numMax=Do.maxValue;
                        this.yeardata=Do.nowDate;    //当前时间
                        for(var i=0;i<this.zheGramxdata.length;i++){
                            this.zheGramx.push(Do.GiveLineFoundationAvg);// 水平线
                            if(this.zheGramxdata[i] < this.yeardata){
                                this.zheGram1.push('-')
                                this.zheGram3.push('-')
                            }else{
                                this.zheGram1.push(Do.queryTowerFoundationPouringAdviseDays);
                                this.zheGram3.push(Do.queryTowerLine_towerAdviseDays);
                            }
                        }
                    }
                }).catch(err => {
                })
           },
           formData(){
                var params={
                        fdProid:this.fontId
                        // fdProid:167
                    }
                    this.$http.post('/engineer/selectBasicInformationSheet', params)
                    .then(res => {
                        let Do=res.data.data[0];
                        if(res.data.status==200){
                            if(Do.fdMainSubject==1){    //建设主体
                                this.construction="自建"
                            }else{
                                this.construction="国网建设"
                            }
                            if(Do.fdAccessMode==1){ //接入方式
                                this.joinup="T接"
                            }else{
                                this.joinup="π接"
                            } 
                            if(Do.fdStrideAcross==1){ //是否跨越
                                this.crossdomain="是"
                            }else{
                                this.crossdomain="否"
                            } 
                            this.longitudinal=Do.fdSendLine    //线路长度
                            this.circuit=Do.fdLineFoundationNumber        //线路基本数
                            this.crossdomaintype=Do.fdSpanningType //跨越类型
                            this.describe=Do.fdCrossingDescription //跨越物描述
                            this.fdLineFoundationId=Do.fdLineFoundationId   //信息表id
                            
                        }
                        
                    }).catch(err => {
                    })
           },
           confirm(){
               var params={
                        fdProid:167,
                        fdLineFoundationId:this.fdLineFoundationId,
                        fdLineFoundationNumber:this.circuit,//线路基础数
                        fdSpanningType:this.crossdomaintype,//跨越类型
                        fdCrossingDescription:this.describe,//跨越物描述
                    }
                    this.$http.post('/engineer/updateBasicInformationSheet', params)    //修改接口
                    .then(res => {
                        if(res.data.status==200){
                            this.$message({
                                message: '修改成功',
                                type: 'success'
                            });
                             this.formData();
                        }
                        
                    }).catch(err => {
                    })
                
           }
        },
        mounted(){
            this.pieChart();   //获取南丁格尔玫瑰图数据
            this.leftEchertsTop();
            this.echartsShow();
               
            this.barGraphEcharts(); //获取条形图数据
            this.leftEchertsBottom();
            this.echartsShow1();

            this.areaGraph();    //面积图
            this.rightEchertsBottom2();
            this.echartsShow3();

            this.zheGreaph();    //预测分析图
            this.rightEchertsBottom3();
            this.echartsShow4();

            this.formData();
        },
        watch:{
           birvalue1(){
                this.leftEchertsTop();
                this.echartsShow();
            },
            haveArrived(){
                this.leftEchertsBottom();
                this.echartsShow1(); 
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
.grie .TightenLine{
    width: 48px;
}
.leftEcharts p{
    padding: 0 20px;
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
.predictDateds{
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
.predictDateds p{
    margin:0px;
    text-align: center;
    line-height: 24px;
    font-size: 16px;
    color: #434343;
}
.predictDateds p span{
    font-size: 18px;
    color:red;
    margin: 0px 5px;
}
.predictDateds p:nth-child(even){
    font-size: 12px;
}
.tabs .el-tabs__active-bar{
    width:119px !important;
}
.tabs .el-tabs__active-bar .is-top{
    text-align: center !important;
}
.infos{
    width: 100%;
    height:138px;
    border: 2px solid #EAF0F4;
}
.infos .infotitle{
    font-size: larger;
    font-weight: bold;
    color:#58616E;
    height: 50px;
    padding-left: 13px;
    line-height: 50px;
    border: 1px solid rgb(234, 240, 244);
    background-color: rgb(249, 250, 251)
}
.infos table{
    width: 100%;
}
.infos table tbody tr{
    height: 40px !important;
}
.infos table tr td{
    border: 0.5px solid #ccc;
    text-align: center;
}
.infos table .el-select{
    height: 30px !important;
    width: 80% !important;
}
.infos table .el-select .el-input{
     height: 30px !important;
    width: 100% !important;
}
.infos table .el-select .el-input input{
    height: 30px !important;
    width: 100% !important;
}
.infos table .el-input{
    width: 80% !important;
}
.infos table .el-input input{
    width: 100% !important;
    height: 30px !important;
}
.infos table tr td:nth-child(odd){
     background:#FAFAFA;
}
</style>
