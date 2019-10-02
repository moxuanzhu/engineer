<template>
  <div>
    <div class="line_wrap">
      <div class="title">
        <div class="colum1 colum">分项</div>
        <div class="colum2 colum">作业名称</div>
        <div class="colum3 colum">
          <div class="columtitle">日期</div>
          <div class="data">
            <div class="dataitem">开始时间</div>
            <div class="dataitem">结束时间</div>
          </div>
        </div>
      </div>

      <div class="civil_wrap">
        <div class="colum1 colum">土建部分</div>
        <div class="colum2 colum">
          <div class="second1">升压站场平</div>
          <div class="second2">
            <div class="title">基础浇筑</div>
            <div class="second2_wrap">
              <div class="second2_wrap_item">主变基础</div>
              <div class="second2_wrap_item">电气楼基础</div>
              <div class="second2_wrap_item">综合楼基础</div>
              <div class="second2_wrap_item">SVG基础</div>
              <div class="second2_wrap_item">水泵房基础</div>
              <div class="second2_wrap_item">事故油池</div>
              <div class="second2_wrap_item">架构基础</div>
              <div class="second2_wrap_item">围墙基础</div>
            </div>
          </div>
          <div class="second3">主体结构</div>
          <div class="second3">装修</div>
          <div class="second3">院墙大门</div>
          <div class="second3">站内道路及绿化</div>
        </div>
        <div class="colum3 colum">
          <!--升压站场平-->
          <div class="dataone" v-for="i in 13">
            <div class="dataitem">
              <el-date-picker
                v-model="value1"
                type="date"
                size="mini"
                class="datachose"
                placeholder="选择日期">
              </el-date-picker>
            </div>
            <div class="dataitem">
              <el-date-picker
                v-model="value1"
                type="date"
                size="mini"
                class="datachose"
                placeholder="选择日期">
              </el-date-picker>
            </div>
          </div>
        </div>
      </div>

      <div class="ele_wrap">
        <div class="colum1 colum">电器部分</div>
        <div class="colum2 colum">
          <div class="second1">主变安装</div>
          <div class="second1">SVG安装</div>
          <div class="second1">接地变及场变安装</div>
          <div class="second1">GIS安装</div>
          <div class="second1">避雷针安装</div>
          <div class="second1">高压开关柜安装</div>
          <div class="second1">综自保护系统安装</div>
        </div>
        <div class="colum3 colum">
          <!--升压站场平-->
          <div class="dataone" v-for="i in 7">
            <div class="dataitem">
              <el-date-picker
                v-model="value1"
                type="date"
                size="mini"
                class="datachose"
                placeholder="选择日期">
              </el-date-picker>
            </div>
            <div class="dataitem">
              <el-date-picker
                v-model="value1"
                type="date"
                size="mini"
                class="datachose"
                placeholder="选择日期">
              </el-date-picker>
            </div>



          </div>
        </div>
      </div>

    </div>

  </div>
</template>
<script>

  export default {
    components: {
    },
    data() {
      return {
        value1: '',
      };
    },
    mounted:function(){

    },
    methods: {

    }
  };
</script>
<style scoped lang="less">
  .html, body{
    overflow: auto;
  }
  .line_wrap{
    font-family: "微软雅黑", Arial, "宋体", verdana;
    .datachose{width:100%;border:0;}
    line-height:30px;
    width:800px;
    text-align: center;
    .title{
      .colum{width:25%;border:1px solid #aaa;height:60px;float:left;border-left:0;  line-height:60px;}
      .colum1{width:20%}
      .colum2{width:30%}
      .colum:last-child{
        border-right:1px solid #aaa;width:50%;
        .columtitle{height:30px;line-height: 30px;border-bottom: 1px solid #aaa;}
        .data{overflow: hidden;width:100%;
          .dataitem{float:left;border-right:1px solid #aaa;width:50%;height:30px;line-height:30px;}
          .dataitem:last-child{border-right: 0;}
        }
      }
    }

    .civil_wrap{
      .colum{width:25%;border:1px solid #aaa;height:390px;float:left;border-left:0;line-height:390px;border-top:0;}
      .colum1{width:20%}
      .colum2{width:30%;
        .second1{border-bottom:1px solid #aaa;height:30px;line-height:30px;}
        .second2{
          .title{float:left;width:25%;height:240px;line-height:240px;border-right:1px solid #aaa;border-bottom:1px solid #aaa;}
          .second2_wrap{float:left;width:75%;height:240px;line-height:240px;border-bottom:1px solid #aaa;}
          .second2_wrap_item{height:30px;line-height:30px;border-bottom:1px solid #aaa;}
        }
        .second3{clear: both;border-bottom:1px solid #aaa;height:30px;line-height:30px;}
      }
      .colum:last-child{
        border-right:1px solid #aaa;width:50%;
        .dataone{overflow: hidden;width:100%;
          .dataitem{float:left;border-right:1px solid #aaa;width:50%;height:30px;line-height:30px;border-bottom:1px solid #aaa;}
          .dataitem:last-child{border-right: 0;}
        }
      }
    }



    .ele_wrap{clear: both;
      .colum{width:25%;border:1px solid #aaa;height:210px;float:left;border-left:0;line-height:210px;border-top:0;}
      .colum1{width:20%}
      .colum2{width:30%;
        .second1{border-bottom:1px solid #aaa;height:30px;line-height:30px;}
      }
      .colum:last-child{
        border-right:1px solid #aaa;width:50%;
        .dataone{overflow: hidden;width:100%;
          .dataitem{float:left;border-right:1px solid #aaa;width:50%;height:30px;line-height:30px;border-bottom:1px solid #aaa;}
          .dataitem:last-child{border-right: 0;}
        }
      }
    }




  }
</style>
