<template>
<div style="height: 100%;width: 100%;background-color: white;">
  <div style="height: 50px">
   <span style="position: absolute;font-size: large;margin-left: 27px;margin-top: 18px;">{{popData.fdName}}</span>
  </div>
  <div class="detailsContent">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="总体进度" style="font-size: large" name="1">
        <div style="width: 100%;overflow-y:auto;" :style="{height:clientHeight-180+'px'}">
          <!-- <div style="height: 600px;">
            gisMap
          </div> -->
          <div style="height: 600px;margin-top: 10px;">
            <engineer-comment v-if="activeName=='1'"></engineer-comment>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="交通工程" name="2">
        <div style="width: 100%;overflow-y:auto" :style="{height:clientHeight-180+'px'}">
          <div style="overflow:hidden" :style="{height:clientHeight-180+'px'}">
            <gis-map v-if="activeName=='2'"></gis-map>
          </div>
          <div style="height: 443px;margin-top: 10px;">
            <gantt-chart v-if="activeName=='2'"></gantt-chart>
          </div>
          <div style="height: 441px;margin-top: 10px;" >
            <engineer-echarts v-if="activeName=='2'"></engineer-echarts>
          </div>
          <div style="height: 498px;margin-top: 10px;">
            <engineer-tables v-if="activeName=='2'"></engineer-tables>
          </div>
         <!-- <div style="height: 600px;margin-top: 10px;">
            <engineer-comment></engineer-comment>
          </div>-->
        </div>
      </el-tab-pane>
      <el-tab-pane label="风机基础" name="3">
        <div style="width: 100%;overflow-y:auto;" :style="{height:clientHeight-180+'px'}">
          <div :style="{height:clientHeight-180+'px'}">
            <fan-gis-map v-if="activeName=='3'"></fan-gis-map>
          </div>
          <div style="height: 500px;margin-top: 10px;">
            <fan-gantt-chart1 v-if="activeName=='3'"></fan-gantt-chart1>
          </div>
          <div style="height: 443px;margin-top: 10px;" >
            <fan-echarts v-if="activeName=='3'"></fan-echarts>
          </div>
          <div style="height: 498px;margin-top: 10px;">
            <fan-tables v-if="activeName=='3'"></fan-tables>
          </div>
          <div style="height:542px;margin-top: 10px;">
            <fan-gantt-chart2 v-if="activeName=='3'"></fan-gantt-chart2>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="风机安装" name="4">
        <div style="width: 100%;overflow-y:auto;" :style="{height:clientHeight-180+'px'}">
          <div :style="{height:clientHeight-180+'px'}">
            <install-gis-map v-if="activeName=='4'"></install-gis-map>
          </div>
          <div style="height: 500px;margin-top: 10px;">
            <fan-install-gantt-chart1 v-if="activeName=='4'"></fan-install-gantt-chart1>
          </div>
          <div style="height: 443px;margin-top: 10px;" >
            <fan-install-echarts v-if="activeName=='4'"></fan-install-echarts>
          </div>
          <div style="height: 498px;margin-top: 10px;">
            <fan-install-tables v-if="activeName=='4'"></fan-install-tables>
          </div>
          <div style="height: 498px;margin-top: 10px;">
            <fan-install-target-tables v-if="activeName=='4'"></fan-install-target-tables>
          </div>
          <div style="height: 498px;margin-top: 10px;">
            <fan-construction-tables  v-if="activeName=='4'"></fan-construction-tables>
          </div>
          <div style="height:542px;margin-top: 10px;">
            <fan-install-gantt-chart2 v-if="activeName=='4'"></fan-install-gantt-chart2>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="集电线路" name="5">
        <div style="width: 100%;overflow-y:auto;" :style="{height:clientHeight-180+'px'}">
          <div :style="{height:clientHeight-180+'px'}">
            <fan-gis-map v-if="activeName=='5'"></fan-gis-map>
          </div>
          <div style="height: 500px;margin-top: 10px;">
            <integrate-line-gantt-chart1 v-if="activeName=='5'"></integrate-line-gantt-chart1>
          </div>
          <div style="height: 443px;margin-top: 10px;" >
            <integrate-line-echarts v-if="activeName=='5'"></integrate-line-echarts>
          </div>
          <div style="height: 498px;margin-top: 10px;">
            <integrate-line-tables v-if="activeName=='5'"></integrate-line-tables>
          </div>
          <div style="height:542px;margin-top: 10px;">
            <integrate-line-gantt-chart2 v-if="activeName=='5'"></integrate-line-gantt-chart2>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="送出线路" name="6">
        <div style="width: 100%;overflow-y:auto;" :style="{height:clientHeight-180+'px'}">
          <div style="height: 500px;margin-top: 10px;">
            <send-line-gantt-chart v-if="activeName=='6'"></send-line-gantt-chart>
          </div>
          <div style="height: 443px;margin-top: 10px;" >
            <send-line-echarts v-if="activeName=='6'"></send-line-echarts>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="升压站" name="7">
        <!--<div style="width: 100%;overflow-y:auto;" :style="{height:clientHeight-180+'px'}">
          <div :style="{height:clientHeight-180+'px'}">
            <booster-station-gis-map v-if="activeName=='7'"></booster-station-gis-map>
          </div>
          <div style="height: 500px;margin-top: 10px;">
            <booster-station-gantt-chart v-if="activeName=='7'"></booster-station-gantt-chart>
          </div>
          <div style="margin-top: 10px;"  :style="{height:clientHeight-180+'px'}">
            <booster-station-echarts v-if="activeName=='7'"></booster-station-echarts>
          </div>
        </div>-->
      </el-tab-pane>
    </el-tabs>
  </div>
</div>
</template>

<script>
  import engineerComment from '@/components/indexmap/detailsPage/trafficEngineering/engineerComment';
  import engineerEcharts from '@/components/indexmap/detailsPage/trafficEngineering/engineerEcharts';
  import engineerTables from '@/components/indexmap/detailsPage/trafficEngineering/engineerTables';
  import ganttChart from '@/components/indexmap/detailsPage/trafficEngineering/ganttChart';
  import gisMap from '@/components/indexmap/detailsPage/trafficEngineering/gisMap';

  import fanEcharts from '@/components/indexmap/detailsPage/trafficEngineering/fanEcharts';
  import fanTables from '@/components/indexmap/detailsPage/trafficEngineering/fanTables';
  import fanGanttChart1 from '@/components/indexmap/detailsPage/trafficEngineering/fanGanttChart1';
  import fanGanttChart2 from '@/components/indexmap/detailsPage/trafficEngineering/fanGanttChart2';
  import fanGisMap from '@/components/indexmap/detailsPage/trafficEngineering/fanGisMap';
  import installGisMap from '@/components/indexmap/detailsPage/trafficEngineering/installGisMap';

  import fanConstructionTables from '@/components/indexmap/detailsPage/trafficEngineering/fanConstructionTables';
  import fanInstallTables from '@/components/indexmap/detailsPage/trafficEngineering/fanInstallTables';
  import fanInstallTargetTables from '@/components/indexmap/detailsPage/trafficEngineering/fanInstallTargetTables';
  import fanInstallEcharts from '@/components/indexmap/detailsPage/trafficEngineering/fanInstallEcharts';
  import fanInstallGanttChart1 from '@/components/indexmap/detailsPage/trafficEngineering/fanInstallGanttChart1';
  import fanInstallGanttChart2 from '@/components/indexmap/detailsPage/trafficEngineering/fanInstallGanttChart2';

  import integrateLineEcharts from '@/components/indexmap/detailsPage/trafficEngineering/integrateLineEcharts';
  import integrateLineTables from '@/components/indexmap/detailsPage/trafficEngineering/integrateLineTables';
  import integrateLineGanttChart1 from '@/components/indexmap/detailsPage/trafficEngineering/integrateLineGanttChart1';
  import integrateLineGanttChart2 from '@/components/indexmap/detailsPage/trafficEngineering/integrateLineGanttChart2';

  import sendLineEcharts from '@/components/indexmap/detailsPage/trafficEngineering/sendLineEcharts';
  import sendLineGanttChart from '@/components/indexmap/detailsPage/trafficEngineering/sendLineGanttChart';

  import boosterStationEcharts from '@/components/indexmap/detailsPage/trafficEngineering/boosterStationEcharts';
  import boosterStationGanttChart from '@/components/indexmap/detailsPage/trafficEngineering/boosterStationGanttChart';
  import boosterStationGisMap from '@/components/indexmap/detailsPage/trafficEngineering/boosterStationGisMap';
    export default {
        data() {
            return {
              activeName: '2',
              popData:"",
              clientHeight:document.body.clientHeight
            };
        },
        methods: {
          handleClick(tab, event) {
            console.log(tab, event);
          }
        },
      created(){
        this.popData = this.$route.query.mapData?JSON.parse(this.$route.query.mapData):this.$route.query.mapData;
      },
        mounted: function () {
          //var test=this.$route.query.mapData?JSON.parse(this.$route.query.mapData):this.$route.query.mapData
        },
      watch:{
        '$route':function (to,from) {
          var _this=this;
          //var query=router.query;
          if(JSON.parse(to.query.mapData).fdProid !=JSON.parse(from.query.mapData).fdProid){
            this.popData=JSON.parse(to.query.mapData);
            this.activeName="";
            setTimeout(function () {
              _this.activeName="2";
            },10);
          }
        }
      },
      components: {
        "engineer-comment":engineerComment,
        "engineer-echarts":engineerEcharts,
        "engineer-tables":engineerTables,
        "gantt-chart":ganttChart,
        "gis-map":gisMap,
        "fan-echarts":fanEcharts,
        "fan-tables":fanTables,
        "fan-gantt-chart1":fanGanttChart1,
        "fan-gantt-chart2":fanGanttChart2,
        "fan-gis-map":fanGisMap,
        "fan-construction-tables":fanConstructionTables,
        "fan-install-tables":fanInstallTables,
        "fan-install-target-tables":fanInstallTargetTables,
        "fan-install-echarts":fanInstallEcharts,
        "fan-install-gantt-chart1":fanInstallGanttChart1,
        "fan-install-gantt-chart2":fanInstallGanttChart2,
        "integrate-line-echarts":integrateLineEcharts,
        "integrate-line-tables":integrateLineTables,
        "integrate-line-gantt-chart1":integrateLineGanttChart1,
        "integrate-line-gantt-chart2":integrateLineGanttChart2,
        "send-line-echarts":sendLineEcharts,
        "send-line-gantt-chart":sendLineGanttChart,
        "booster-station-echarts":boosterStationEcharts,
        "booster-station-gantt-chart":boosterStationGanttChart,
        "booster-station-gis-map":boosterStationGisMap,
        "install-gis-map":installGisMap
      }
    }
</script>

<style >
  .detailsContent{
    margin-left: 20px;
  }
  .detailsContent .el-tabs__item {
    font-size: 17px;
  }
  .detailsContent .el-tabs__active-bar {
    width: 69px !important;
  }
</style>
