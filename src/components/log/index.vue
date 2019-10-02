<template>
<div style="width: 100%;height: 100%">
  <div class="logLeft">
    <log-left-menu></log-left-menu>
  </div>
  <div class="logRight">
    <router-view ></router-view>
  </div>
</div>
</template>

<script>
  import logLeftMenu from '@/components/log/logLeftMenu';
    export default {
        data() {
            return {};
        },
        methods: {},
        mounted: function () {

        },
      components: {
        "log-left-menu": logLeftMenu,
      },
    }
</script>

<style scoped>
.logLeft{
  height: 100%;
  width: 15%;
  float: left;
}
.logRight{
  height: 100%;
  width: 85%;
  float: left;
  border: 0px;
}
</style>
