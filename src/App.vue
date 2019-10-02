<template>
  <div id="app" style="height:100%;">
    <router-view/>
  </div>
</template>

<script>
// import '@/assets/css/index.css'
import '../theme/index.css'
export default {
  name: 'App'
}
</script>

<style>
#app {
  height:100%;
}
/*body {*/
  /*background:url("./assets/img/pg.png") no-repeat;*/
  /*background-size: 100% 100%;*/
/*}*/
.el-table--enable-row-hover .el-table__body tr:hover>td{
  background-color: #d9edf9;
}
</style>
