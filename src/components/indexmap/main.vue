<template>
  <div class="bger" id="bgerbody">
    <engi-header></engi-header>
    <div class="elecContent clearfix" :style="{height:bgerBodyHeight+'px'}">
      <router-view class="content"></router-view>
    </div>
  </div>
</template>
<script>
  import Header from '@/components/header/header';
  export default {
    components: {
      "engi-header": Header,
    },
    data() {
      return {
        bgerBodyHeight:0,
      };
    },
    methods: {

    },
    mounted:function(){
       this.bgerBodyHeight=document.getElementById("bgerbody").offsetHeight-70;
       console.log(this.bgerBodyHeight)
    }
  };
</script>
<style scoped>
.bger{
  width: 100%;
  height: 100%;
  background: url("../../assets/img/pg.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  }
  .elecContent{
    height: 87%;
  }
</style>
