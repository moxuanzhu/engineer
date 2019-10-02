<template>
  <div>
    <!-- 模态框 -->
    <div class="dijitDialog" id="addMapModalDialog" v-bind:style="{top: modal_top+'px', left: modal_left+'px'}" style="width: 475px; height: 310px; position: fixed; opacity: 1; z-index: 11000;background-color: #fff">
      <div v-if="progressMask" class="progressMask"><span class="maskInfo">正在请求数据...</span></div>
      <!-- title -->
      <div id="addMapdragbar" style="width: 475px;border-bottom:0px;background: #5EB2FF;" class="dijitDialogTitleBar" >
        <span class="dijitDialogTitle" style="color: white;">{{ title }}</span>
      </div>
      <!-- content -->
      <div class="dijitDialogPaneContent formCss" style="padding: 0px; width:475px; height:214px;">
        <div style="width:475px;height:213px; overflow-y:scroll;margin-top: 10px;">
          <span style="margin-left: 10px;color: red;font-size: 14px;">请对未录入工程量的日期做补录！</span>
          <div style="width: 200px;height: 40px;margin-top: 10px;">
            <div style="float: left;width: 80px;text-align: right;line-height: 25px"> 未录入日期 ：</div>
            <div style="float: left;width:120px;">
              <span style="line-height: 25px;">{{unconstructionItem.yearMonthDate}}</span>
            </div>
          </div>
          <div style="width: 200px;height: 40px;margin-left: 230px;float: left;margin-top: -40px;">
            <div style="float: left;width: 80px;text-align: right;line-height: 25px" > 工程量(km) ：</div>
            <div style="float: left;width:120px;">
              <el-input v-model="param.date" size="mini" placeholder="请输入内容"></el-input>
            </div>
          </div>
          <div style="width: 450px;height: 100px;margin-top: 10px;">
            <div style="float: left;width: 80px;text-align: right">  原因： </div>
            <div style="float: left;width:360px; ">
              <textarea v-model="param.reason" style="width: 90%; height: 100px;" ></textarea>
            </div>
          </div>
        </div>
      </div>
      <!-- buttonBar -->
      <div style="height: 50px;text-align: center;" class="dijitDialogButtonBar">
        <div class="hob-ser" style="margin-right: 10px;margin-top: 6px;">
          <el-button  size="mini" plain @click="sure">保存</el-button>
          <el-button  size="mini" plain @click="close">关闭</el-button>
        </div>
      </div>
    </div>
    <div>
      <!--<inner-model v-if="innerModel.showinnerModel"></inner-model>-->
    </div>
    <!-- 浮层 -->
    <div class="dijitDialogUnderlayWrapper" style="display: block; top: 0px; left: 0px; z-index: 10000;">
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
        title:this.$parent.reasonModelAttr.title,//弹出框表头
        client_width : document.body.clientWidth,
        client_height : document.body.clientHeight,
        modal_top : '',
        modal_left : '',
        progressMask:false,
        param:{
          date:"",
          reason:""
        },
      }
    },
    beforeDestroy (){
      window.removeEventListener('resize', this.handleResize)
    },
    created(){
      var _this = this
      _this.unconstructionItem = JSON.parse(_this.$route.query.mapData)
      console.log(_this.unconstructionItem,'ac')
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
      handleResize (event) {
        this.client_width = document.body.clientWidth
        this.client_height = document.body.clientHeight
        this.modal_top = (document.body.clientHeight - document.getElementById("addMapModalDialog").offsetHeight)/2
        this.modal_left = (document.body.clientWidth - document.getElementById("addMapModalDialog").offsetWidth)/2
      },
      sure(){
        var _this = this
        var Workload = _this.param.date
        var ReasonExplanation = _this.param.reason
        var params = {
          fdWorkid:_this.unconstructionItem.fdWorkid,
          fdWorkload:_this.param.date,
          fdReasonExplanation:_this.param.reason
        }
        if(Workload !=='' && ReasonExplanation !==''){
           _this.$http.post('/engineer/updateRoadPresentation', params)
          .then(res => {
          if (res.data.state == 1 ) {
                _this.$parent.reasonModelAttr.showModel = false;
                _this.$message({
                  type: 'success',
                  message: '补录成功!'
                })
                _this.close();
              } else {
                _this.$message({
                  type: 'warning',
                  message: '补录失败!'
                })
             }
          })
        }
      },
      close() {  //重置
        this.$parent.reasonModelAttr.showModel = false;    //关闭弹出框
        this.$parent.$parent.$parent.$parent.unconstructionReason=false;
        this.$route.query.showModel=false;
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
  .dijitDialogButtonBar .hob-ser button:nth-child(1){
    display: inline-block;
    width: 71px;
    height: 39px;
    background:#39aef9;
    color: #fff;
  }
  .dijitDialogButtonBar .hob-ser button:nth-child(2){
    display: inline-block;
    width: 71px;
    height: 39px;
    background:#FFFFFF;
    color: #000000;
  }
  .dijitDialogButtonBar .hob-ser span{
    cursor:pointer;
    display: inline-block;
  }

  .dijitDialogButtonBar .hob-ser .rests{
    margin-left: 12px;
    cursor:pointer
  }
</style>
