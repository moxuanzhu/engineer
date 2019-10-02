<template>
      <el-menu default-active="1" class="el-menu-vertical-demo" @select="selectMenu" @open="handleOpen" @close="handleClose" background-color="#456182" text-color="#fff" active-text-color="#ffd04b">
        <el-menu-item index="1" >
          <div class="logmenu"></div>
          <span style="margin-left: 10px;">操作日志</span>
        </el-menu-item>
        <!--<el-submenu index="1">
          <template slot="title">
            <div class="logmenu"></div>
            <span style="margin-left: 10px;">操作日志</span>
          </template>
        &lt;!&ndash;  <el-submenu index="1-1">
            <template slot="title">操作日志1</template>
            <el-menu-item index="1-1-1">操作日志1-1</el-menu-item>
          </el-submenu>&ndash;&gt;
        </el-submenu>-->
      </el-menu>
</template>

<script>
    export default {
        data() {
            return {};
        },
        methods: {
          selectMenu(key, keyPath){
            console.log(key, keyPath);
            if(key==="1"){
              this.$router.push("/main/log/operateLog");
            }
          },
          handleOpen(key, keyPath) {
            console.log(key, keyPath);
          },
          handleClose(key, keyPath) {
            console.log(key, keyPath);
          }
        },
        mounted: function () {

        }
    }
</script>

<style scoped>
.logmenu{
  float:left;
  width: 16px;
  height: 21px;
  margin-top: 18px;
  background: url("./img/rzhi.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
</style>
