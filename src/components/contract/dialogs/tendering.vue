<template>
  <div>
  <!-- 模态框 -->
    <div class="dijitDialog" id="addMapModalDialog" v-bind:style="{top: modal_top+'px', left: modal_left+'px'}" style="width: 1100px; height: 509px; position: fixed; opacity: 1; z-index: 2000;background-color: #fff">
      <div v-if="progressMask" class="progressMask"><span class="maskInfo">正在请求数据...</span></div>
      <!-- title -->
      <div id="addMapdragbar" style="width: 1100px;border-bottom:0px;" class="dijitDialogTitleBar" >
        <span class="dijitDialogTitle">{{ title }}</span>
        <span  @click="close('event')"><img src="../../common/img/dell.png" alt=""></span>
      </div>
      <!-- content -->
      <div class="dijitDialogPaneContent formCss" style="padding: 0px; width:1100px; height:414px;">
        <div style="width:1100px;height:435px; overflow-y:scroll;margin-top: 10px;">
          <el-input type="textarea" autosize  placeholder="请输入内容" v-model="textcon"></el-input>
        </div>
      </div>
      <!-- buttonBar -->
      <div style="height: 50px;" class="dijitDialogButtonBar">
        <div class="hob-ser" style="margin-right: 10px;margin-top: 12px;">
          <el-button  size="mini" plain @click="sure()">确定</el-button>
          <el-button  size="mini" plain @click="close('event')">取消</el-button>
        </div>
      </div>
    </div>
    <!-- 遮罩层 -->
    <div class="dijitDialogUnderlayWrapper" style="display: block; top: 0px; left: 0px; z-index: 1049;">
      <div class="dijitDialogUnderlay" v-bind:style="{height: client_height+'px', width: client_width+'px'}"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: '查看详情(可编辑)',
  data() {
    return {
      textcon: this.$parent.msg, // 查看详情内容
      client_width: document.body.clientWidth,
      client_height: document.body.clientHeight,
      modal_top: '',
      modal_left: '',
      progressMask: false,
      title: this.$parent.modelFlag.title,//弹出框表头
      type: this.$parent.modelFlag.type,   //弹出框类型
    }
  },
  mounted() {
    this.modal_top = (document.body.clientHeight - document.getElementById("addMapModalDialog").offsetHeight)/2
    this.modal_left = (document.body.clientWidth - document.getElementById("addMapModalDialog").offsetWidth)/2
    window.addEventListener('resize', this.handleResize);

  },
  methods: {
    handleResize (event) {
        this.client_width = document.body.clientWidth
        this.client_height = document.body.clientHeight
        this.modal_top = (document.body.clientHeight - document.getElementById("addMapModalDialog").offsetHeight)/2
        this.modal_left = (document.body.clientWidth - document.getElementById("addMapModalDialog").offsetWidth)/2
    }, 
    // 确定
    sure(){
      // 招标范围
      if(this.type == 'looks'){ // 招标范围
        this.$parent.modelFlag.con1 = this.textcon;
        this.$parent.modelFlag.showModel = false;  // 关闭弹框
      }if(this.type == 'progress') {  // 本周进展
        this.$parent.modelFlag.con2 = this.textcon;
        this.$parent.modelFlag.showModel = false;  // 关闭弹框
      }if(this.type == 'analysis') {  // 履约分析
        this.$parent.modelFlag.con3 = this.textcon;
        this.$parent.modelFlag.showModel = false;  // 关闭弹框
      }if(this.type == 'remarks') {  // 备注
        this.$parent.modelFlag.con4 = this.textcon;
        this.$parent.modelFlag.showModel = false;  // 关闭弹框
      }
    },
    // 关闭弹出框
    close(type){
        if(type=="event"){
          this.$parent.modelFlag.showModel = false;
        }
    }
  }
}
</script>

<style scoped>
@import '../css/index.css'
</style>
