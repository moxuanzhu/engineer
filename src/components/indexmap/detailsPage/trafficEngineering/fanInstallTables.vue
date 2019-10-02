<template>
  <div class="engineerTables">
    <div class="leftTableBorder">
      <div class="TableHeader">
        <span class="headerContentLeft"> 设备到货总览</span>
      </div>
      <div class="tableContent">
          <equipment-echarts></equipment-echarts>
      </div>
    </div>
    <div class="rightTableBorder">
      <div class="TableHeader">
        <span class="headerContentLeft"> 设备到货统计表</span>
        <div class="headerContentRightDiv">
          <span class="headerContentRightSpan" @click="showConstructionModel">总览</span>
        </div>
      </div>
      <div class="tableContent">
       <equipment-table ref="equipmentTable"></equipment-table>
      </div>
    </div>
  </div>
</template>

<script>
  import equipmentEcharts from './equipmentEcharts'
  import equipmentTable from './equipmentTable'
    export default {
      components:{ equipmentTable },
      components: {
        "equipment-echarts":equipmentEcharts,
        "equipment-table":equipmentTable
      },
      data(){
          return {
            dialogVisible:false
          };
      },
      methods: {
        showConstructionModel(){
         this.$refs.equipmentTable.pandect();
        }
      },
      mounted: function () {

      }
    }
</script>

<style >
  .engineerTables .leftTableBorder{
    width: 48%;
    border: 1px solid #EAF0F4;
    float: left
  }
  .engineerTables .rightTableBorder{
    width: 48%;
    border: 1px solid #EAF0F4;
    float: left;
    margin-left:3%;
  }
  .engineerTables .TableHeader{
    height: 50px;
    background-color:#F9FAFB;
    position: relative;
  }
  .engineerTables .headerContentLeft{
    position: absolute;
    font-size: larger;
    font-weight: bold;
    margin-top: 12px;
    margin-left: 13px;
  }
  .engineerTables .headerContentRightDiv{
    position: absolute;
    width: 70px;
    height: 50px;
    right: 0px;
    border-left:1px solid #EAF0F4;
    cursor:pointer;
  }
  .engineerTables .headerContentRightDiv:hover{
    position: absolute;
    background-color: #5eB2FF;
    color: white;
    width: 70px;
    height: 50px;
    right: 0px;
    border-left:1px solid #EAF0F4;
    cursor:pointer;
  }
  .engineerTables .headerContentRightSpan{
    position: absolute;
    font-size: larger;
    font-weight: bold;
    margin-top: 14px;
    margin-left: 20px;
  }
  .engineerTables .tableContent{
    width: 100%;
    height: 443px;
    border: 1px solid #EAF0F4;
    position: relative;
  }
  .engineerTables .tableContentInner{
    width: 100%;
    height: 443px;
    overflow-y:auto;
  }
  .engineerTables .lczTable{
    width: 100%;
    border:1px solid #EAF0F4;
  }
  .engineerTables .lczTable th,.lczTable td{
    height: 48px;
    border:1px solid #EAF0F4;
    text-align: center;
  }
  .engineerTables .lczTable th:nth-child(1),.lczTable th:nth-child(2),
  .engineerTables .lczTable th:nth-child(3),.lczTable th:nth-child(4){
    width: 22%;
  }
  .engineerTables .lczTable th:nth-child(5){
    width: 12%;
  }
  .engineerTables .lczTable th:nth-child(5):hover{
    background-color: #5eB2FF;
    color: white;
    cursor: pointer;
     width: 12%;
   }
  .engineerTables .tableContentBottm{
    position:absolute;
    right:26px;
    bottom:12px;
  }

  .engineerTables .el-table .success-row {
    background: #FBF0F1;
  }
  .engineerTables .tableContent .el-date-editor.el-input, .el-date-editor.el-input__inner{
    width: 100% !important;
  }
</style>
