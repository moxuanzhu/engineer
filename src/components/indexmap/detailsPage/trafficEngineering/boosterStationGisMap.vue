<template>
<div class="boosterMap" :style="{height:clientHeight-180+'px'}">
  <div class="innerMap" >
      <div id="leftEchertsTop" style="width:100%;height:17vh" ref="leftEchertsTop"></div>
      <!-- 进度条 -->
      <div class="bfber" style="width:100%;height:9vh;padding-top:5px;">
           <p class="grie">
               <span class="projectName">土建</span>
               <span class="progressBar"><el-progress :text-inside="true" :stroke-width="14" :percentage="civilEngineering>100?100:civilEngineering" color="#FDEE00"></el-progress></span>
               <span class="total">{{completion}}/{{total}}</span>
            </p>
            <p class="grie">
               <span class="projectName">电气</span>
               <span class="progressBar"><el-progress :text-inside="true" :stroke-width="14" :percentage="electrical>100?100:electrical" color="#FD5421"></el-progress></span>
               <span class="total">{{completion}}/{{total}}</span>
            </p>
      </div>
  </div>
</div>
</template>
<script>
    export default {
        data() {
            return {
              itemId:this.$parent.$parent.$parent.popData.fdProid,
              clientHeight:this.$parent.$parent.$parent.clientHeight,

              birvalue1:10,  //环形图
              birvalue2:30,

              completion:60,//完成
              total:100,//总量

              civilEngineering:20,//土建进度条
              electrical:30,//电气进度条

            };
        },
        methods: {
          leftEchertsTop(){
              this.optiontop = {
                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend:[
                     {
                    x: 'center',
                    data:['土建','电气'],
                    color:'#fff'
                },
                
                ],
                calculable : true,
                // graphic:{//环形图圆心百分比
                //      type:'text',
                //      left:'center',
                //      top:'55%',
                //      style:{
                //          text:this.graptate,
                //          fontSize:22,
                //          color:"#797979"
                //      }
                // },
                series : [
                    {
                        type:'pie',
                        radius: ['50%', '70%'],
                        top:'2%',
                        center: ['50%', '40%'],
                        data:[
                            {value:this.birvalue1, name:'土建',itemStyle:{normal:{color:'#2DC7C9'}}},
                            {value:this.birvalue2, name:'电气',itemStyle:{normal:{color:'#FFB980'}}}
                           
                        ]
                    }
                ]
            };
          },
          ringDiagram(){
              let leftmyChart = this.$echarts.init(this.$refs['leftEchertsTop']);
              leftmyChart.setOption(this.optiontop);
            },
          ringDiagramLightingale(){        //升压站电气
               var params={
                        // proId:167
                        fdProid:this.fontId
                    }
                //this.$http.post('/engineer/ProgressOverview/barChartModule', params)
                .then(res => {
                
                }).catch(err => {
                })
          },

        },
        mounted(){
            this.ringDiagramLightingale();        //获取条形图数据
            this.leftEchertsTop();
            this.ringDiagram();
        },

        watch:{
            birvalue1(){
                this.leftEchertsTop();
                this.ringDiagram();
            },
        }
    }
</script>

<style >
  .boosterMap{
    position: relative;
    width: 99%;
    background-color: #1A181E;
    background-image:url(/static/images/u18124.png);
    background-repeat:no-repeat;
    background-size:100% 100%;
  }
  .boosterMap .innerMap{
    width: 17%;
    height: 33%;
    position: absolute;
    margin-top: 1%;
    margin-left: 3%;
    border: 1px solid white;
  }
  p .grie{
    width: 100%;
  }
  .projectName{
    width: 20%;
    padding: 5px 10px;
    color: #fff;
  }
  .progressBar{
    width: 55%;
    padding: 5px 0;
 }
  .total{
     width: 25%;
     padding: 5px 10px;
     color: #fff;

  }
  .projectName,.progressBar,.total{
    float: left;
  }
</style>
