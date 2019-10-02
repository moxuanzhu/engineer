<template>
  <div>
    <!-- 模态框 -->
    <div class="dijitDialog" id="addMapModalDialog" v-bind:style="{top: modal_top+'px', left: modal_left+'px'}" style="width: 620px; height: 430px; position: fixed; opacity: 1; z-index: 2000;background-color: #fff">
      <div v-if="progressMask" class="progressMask"><span class="maskInfo">正在请求数据...</span></div>
      <!-- title -->
      <div id="addMapdragbar" style="width: 620px;border-bottom:0px;background: #5EB2FF;" class="dijitDialogTitleBar" >
        <span class="dijitDialogTitle" style="color: white;">{{ title }}</span>
      </div>
      <!-- content -->
      <div class="dijitDialogPaneContent formCss" style="padding: 0px; width:620px; height:334px;">
        <div style="width:620px;height:333px; overflow-y:scroll;margin-top: 10px;">
          <div style="height: 40px;">
            <span style="margin-left: 10px;font-size: larger;" >日期筛选:</span>
            <el-date-picker v-model="yearMonthDate" @change="getUnConstructionList" format="yyyy-MM" value-format="yyyy-MM" style="margin-left: 10px;" type="month" size="mini" placeholder="选择日期">
          </el-date-picker>
          </div>
          <div>
            <el-table :data="unConstructionList" :row-class-name="tableRowClassName"  height="250" border style="width: 100%">
              <el-table-column prop="yearMonthDate" label="年月" width="150">
              </el-table-column>
              <el-table-column prop="fdDay" label="日" width="150">
              </el-table-column>
              <el-table-column prop="fdReasonExplanation" label="原因说明">
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
      <!-- buttonBar -->
      <div style="height: 50px;text-align: center;" class="dijitDialogButtonBar">
        <div class="hob-ser" style="margin-right: 10px;margin-top: 6px;">
          <el-button  size="mini" plain @click="close">关闭</el-button>
        </div>
      </div>
    </div>
    <div>
      <!--<inner-model v-if="innerModel.showinnerModel"></inner-model>-->
    </div>
    <!-- 浮层 -->
    <div class="dijitDialogUnderlayWrapper" style="display: block; top: 0px; left: 0px; z-index: 1049;">
      <div class="dijitDialogUnderlay" v-bind:style="{height: client_height+'px', width: client_width+'px'}"></div>
    </div>
  </div>
</template>
<style scoped>
  select,input[type="text"],textarea{
    width:200px;
  }
</style>
<script>
import '@/assets/js/city-data.js'
  function isIE() { //ie?
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    var isIE = (!!window.ActiveXObject || "ActiveXObject" in window) //判断是否IE浏览器
    var isEdge = userAgent.indexOf("Edge") > -1 && !isIE;
    if(isIE || isEdge){
      return true;
    }else {
      return false;
    }
  }
  export default{
    data(){
      return {
        title:this.$parent.unConstructionModelAttr.title,//弹出框表头
        client_width : document.body.clientWidth,
        client_height : document.body.clientHeight,
        modal_top : '',
        modal_left : '',
        progressMask:false,
        unConstructionList:[],
        unConstructionCurrentPage:"1",
        unConstructionSize:"7",
        yearMonthDate:"",


      }
    },
    beforeDestroy (){
      window.removeEventListener('resize', this.handleResize)
    },
    created(){
      this.getUnConstructionList();
    },
    mounted (){
      

      //模态框拖拽
     /* var dragModal = function (box, bar) {
        var oWin = document.getElementById(box);
        var oH2 = document.getElementById(bar);
        //var oH2 = oWin.getElementsByTagName("h1")[0];
        var bDrag = false;
        var disX = 0;
        var disY = 0;
        oH2.onmousedown = function (event)
        {
          var event = event || window.event;
          bDrag = true;
          disX = event.clientX - oWin.offsetLeft;
          disY = event.clientY - oWin.offsetTop;
          this.setCapture && this.setCapture();
          return false
        };
        oH2.onmousemove = function (event)
        {
          if (!bDrag) return;
          var event = event || window.event;
          var iL = event.clientX - disX;
          var iT = event.clientY - disY;
          var maxL = document.documentElement.clientWidth - oWin.offsetWidth;
          var maxT = document.documentElement.clientHeight - oWin.offsetHeight;
          iL = iL < 0 ? 0 : iL;
          iL = iL > maxL ? maxL : iL;
          iT = iT < 0 ? 0 : iT;
          iT = iT > maxT ? maxT : iT;

          oWin.style.marginTop = oWin.style.marginLeft = 0;
          oWin.style.left = iL + "px";
          oWin.style.top = iT + "px";
          return false
        };
        oH2.onmouseup = window.onblur = oH2.onlosecapture = function ()
        {
          bDrag = false;
          oH2.releaseCapture && oH2.releaseCapture();
        };
      }

      dragModal('addMapModalDialog','addMapdragbar')*/

      this.modal_top = (document.body.clientHeight - document.getElementById("addMapModalDialog").offsetHeight)/2
      this.modal_left = (document.body.clientWidth - document.getElementById("addMapModalDialog").offsetWidth)/2
      window.addEventListener('resize', this.handleResize)
    },
    props:{

    },

    methods:{
       tableRowClassName({row, rowIndex}) {
         //console.log(row,'row')
             if (row.fdCauseState === 2) {
              return 'success-row';
            }
            return '';
       },
      handleResize (event) {
        this.client_width = document.body.clientWidth
        this.client_height = document.body.clientHeight
        this.modal_top = (document.body.clientHeight - document.getElementById("addMapModalDialog").offsetHeight)/2
        this.modal_left = (document.body.clientWidth - document.getElementById("addMapModalDialog").offsetWidth)/2
      },
      close() {  //重置
        this.$parent.unConstructionModelAttr.showModel = false;    //关闭弹出框
      },
      getUnConstructionList(){   //查询后回显详情
        var _this=this;
        var params={
          yearMonthDate:this.yearMonthDate,
          fdProid:this.$parent.$parent.$parent.$parent.popData.fdProid,
          fdStageid:2
        }
        //proview/
        // this.$http.post('/proview/getConditionsPro', params)
        this.$http.post('/engineer/getRoadNonConstruction', params)
          .then(res => {
            _this.unConstructionList=res.data.data;
          }).catch(err => {
          console.log("数据请求失败")
        })
      },
    },
    components:{

    }

  }
</script>
<style >
  .dijitDialogTitleBar{
    display: flex;
    justify-content: space-between;
    height:45px;
    background:#EEEEEE;
    font-size:16px;
    line-height:37px;
    border:none;
    border-radius: 4px 4px 0px 0px;
  }
  .dijitDialogTitleBar span:nth-child(3){
    cursor:pointer;
    margin-right:15px;
  }
  .dijitDialogCloseIcon{
    top:11px;
  }
  .dijitDialogCloseIcon:hover{
    top:11px;
  }
  .dijitDialogTitleBar span{
    color:#797979;
  }
  .dijitDialogPaneContent{
    border:none;
  }
  .dijitDialog{
    border:none;
    border-radius: 4px;
  }
  .formCss  .el-form-item{
    /* margin-right:30px; */
    /* margin-left:30px; */
    margin-right:0px;
    margin-bottom:12px;
  }
  .formCss  .el-form-item__content div input{
     width:130px;
    /* display:block; */
  }
  .formCss form div label{
    font-size: 12px;
    margin-bottom:0px !important;
    line-height:40px;
  }
  hr{
    margin:20px;
  }
  .framework{
   /* height: 300px;*/
    margin: 0 30px;
  }
  .framework table{
    width: 100%;
    margin-bottom: 30px;
  }
  .framework table tr th{
    border:1px solid #ccc;
  }
  .framework table thead{
    background: #F0f0f0;
    color: #676767;
  }
  .framework table tr{
    height: 39px;
    line-height: 39px;
    font-size: 30px;
  }
  .framework table th{
    /* padding-left:10px; */
    text-align: center;
  }
  .framework table th:nth-child(5){
    width: 45px;
    text-align:center;
    padding-left:0px;
    background: #fff;
    border: none;
  }
  .framework table th:nth-child(1){
    border-right: none;
  }
  .framework table th:nth-child(2){
    border-left: none;
    border-right: none;
  }
  .framework table th:nth-child(3){
    border-left: none;
    border-right: none;
  }
  .framework table th:nth-child(4){
    border-left: none;
  }
  .framework table th img{
    width: 20px;
    height: 20px
  }
  .mini table th:nth-child(4){
    width: 45px;
    background: #fff;
    border: none;
    border-left: 1px solid #ccc;
    border-top: none;
    border-right: none;
    border-bottom: none;
  }
  .mini table td:nth-child(4){
    text-align: center;
  }
  .framework tbody td img{
    width: 20px;
    height: 20px
  }
  .framework tbody th div{
    width: 170px;
  }
  .framework tbody td:nth-child(5){
    width: 45px;
    text-align: center;
  }
  .dijitDialogButtonBar{
    border-radius:0px 0px 4px 4px;
  }
  .dijitDialogButtonBar .hob-ser button{
    display: inline-block;
    width: 71px;
    height: 39px;
    background:#39aef9;
    color: #fff;
  }
  .dijitDialogButtonBar .hob-ser span{
    cursor:pointer;
    display: inline-block;
  }

  .dijitDialogButtonBar .hob-ser .rests{
    margin-left: 12px;
    cursor:pointer
  }
   .city .el-form-item__content .town{
    width:460px !important;
  }
   .city .el-form-item__content .town input{
    width:460px !important;
  }
  .scity input{
     width:265px !important;
  }
  .city .el-form-item__content .burg{
    width:130px !important;
  }
   .city .el-form-item__content .burg input{
    width:130px !important;
  }
  .headbos input{
    width:398px !important;
  }
  .dijitDialogTitle{
    font-size:16px;
    margin-left:15px;
  }
    .el-table .success-row {
    background: #FBF0F1;
  }
</style>
