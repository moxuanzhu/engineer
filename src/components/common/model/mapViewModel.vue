<template>
    <div class="mapSation">
      <div class="item" title="未开工" style="margin-top:7px;">
        <span class="span1"></span>未开工
      </div>
      <div class="item" title="建设中">
        <span class="span2"></span>建设中
      </div>
      <div class="item" title="倒送电">
        <span class="span3"></span>倒送电
      </div>
      <div class="item" title="移交生产">
        <span class="span4"></span>移交生产
      </div>
      <div class="item" title="竣工验收">
        <span class="span5"></span>竣工验收
      </div>
    </div>
</template>

<script>
    export default {
        name: "map-view-model",
      data() {
        return {

        };
      },
      methods:{

      },
      mounted: function() {

      }
    }
</script>

<style scoped>
  .mapSation{
    width:150px; height:160px;font-family: "微软雅黑";background: rgb(245, 242, 242,0.7)!important;
    color: #000;
  }
  .item{height:30px;line-height: 30px;}
  .item span{display: inline-block;width:35px;height:10px;border-radius: 1px;margin-left:20px;margin-right:10px;}
  .span1{background-color: #a4a4a4}
  .span2{background-color: #dd8a3c}
  .span3{background-color: #498ce3}
  .span4{background-color: #6d72ce}
  .span5{background-color: #6cc281}


</style>
