<template>
  <div class="map_pop">
    <div class="address_title">
      <div class="left no_line" :title="popData.fdAddress">地址：{{popData.fdAddress}}</div>
      <div class="right no_line btn_wea">天气：{{cityName}} I {{todayWeather.temperature }} {{todayWeather.weather}}</div>
    </div>
    <div class="progress_wrap">
      <div class="progress_left">
        <div class="circle">
          <el-progress type="circle" :percentage="parseInt((popData.fdProgressRate?popData.fdProgressRate.toFixed(2) * 100:0))" :stroke-width="8" color="#67a6e0"></el-progress>
        </div>
        <div class="name_project">{{popData.fdName}}+{{popData.fdProCapacity?popData.fdProCapacity.toFixed(2):0}}MW</div>
        <!--<div class="time_project">{{popData.fdBeginTime}} - {{popData.fdEndTime}}</div>-->
      </div>
      <div class="progress_right">
        <div class="progress_item">
          <div class="label">交通工程:</div>
          <div class="content">
            <el-tooltip v-if="popData.fdTrafficState==1"  content="正常" placement="bottom" effect="light" >
              <el-progress :percentage="parseInt((popData.fdTrafficProgressRate.toFixed(2) * 100))" color="#26d2ac" :stroke-width="10" ></el-progress>
            </el-tooltip>
            <el-tooltip v-if="popData.fdTrafficState==2" content="滞后" placement="bottom" effect="light" >
             <el-progress  :percentage="parseInt((popData.fdTrafficProgressRate.toFixed(2) * 100))" color="#ff6366" :stroke-width="10"></el-progress>
            </el-tooltip>
            <el-tooltip v-if="popData.fdTrafficState==3" content="预警" placement="bottom" effect="light">
              <el-progress  :percentage="parseInt((popData.fdTrafficProgressRate.toFixed(2) * 100))" color="#f3c840" :stroke-width="10"></el-progress>
             </el-tooltip>
          </div>
        </div>
        <div class="progress_item">
          <div class="label">风机基础:</div>
          <div class="content">
            <el-tooltip v-if="popData.fdWtBaseState==1" content="正常" placement="bottom" effect="light">
               <el-progress  :percentage="parseInt((popData.fdWtBaseProgressRate.toFixed(2) * 100))" color="#26d2ac" :stroke-width="10"></el-progress>
            </el-tooltip>
            <el-tooltip v-if="popData.fdWtBaseState==2" content="滞后" placement="bottom" effect="light">
              <el-progress  :percentage="parseInt((popData.fdWtBaseProgressRate.toFixed(2) * 100))" color="#ff6366" :stroke-width="10"></el-progress>
            </el-tooltip>
            <el-tooltip v-if="popData.fdWtBaseState==3" content="预警" placement="bottom" effect="light">
              <el-progress  :percentage="parseInt((popData.fdWtBaseProgressRate.toFixed(2) * 100))" color="#f3c840" :stroke-width="10"></el-progress>
            </el-tooltip>
            <!--<el-progress :percentage="80" color="#26d2ac" :stroke-width="10"></el-progress>-->
          </div>
        </div>
        <div class="progress_item">
          <div class="label">风机安装:</div>
          <div class="content">
            <el-tooltip v-if="popData.fdWtState==1" content="正常" placement="bottom" effect="light">
               <el-progress  :percentage="parseInt((popData.fdWtProgressRate.toFixed(2) * 100))" color="#26d2ac" :stroke-width="10"></el-progress>
            </el-tooltip>
            <el-tooltip v-if="popData.fdWtState==2" content="滞后" placement="bottom" effect="light">
              <el-progress  :percentage="parseInt((popData.fdWtProgressRate.toFixed(2) * 100))" color="#ff6366" :stroke-width="10"></el-progress>
              </el-tooltip>
            <el-tooltip v-if="popData.fdWtState==3" content="预警" placement="bottom" effect="light">
              <el-progress  :percentage="parseInt((popData.fdWtProgressRate.toFixed(2) * 100))" color="#f3c840" :stroke-width="10"></el-progress>
             </el-tooltip>
            <!--<el-progress :percentage="80" color="#ff6366" :stroke-width="10"></el-progress>-->
          </div>
        </div>
        <div class="progress_item">
          <div class="label">集电线路:</div>
          <div class="content">
            <el-tooltip v-if="popData.fdICState==1" content="正常" placement="bottom" effect="light">
               <el-progress  :percentage="parseInt((popData.fdIcProgressRate.toFixed(2) * 100))" color="#26d2ac" :stroke-width="10"></el-progress>
            </el-tooltip>
            <el-tooltip v-if="popData.fdICState==2" content="滞后" placement="bottom" effect="light">
             <el-progress  :percentage="parseInt((popData.fdIcProgressRate.toFixed(2) * 100))" color="#ff6366" :stroke-width="10"></el-progress>
            </el-tooltip>
            <el-tooltip v-if="popData.fdICState==3" content="预警" placement="bottom" effect="light">
              <el-progress  :percentage="parseInt((popData.fdIcProgressRate.toFixed(2) * 100))" color="#f3c840" :stroke-width="10"></el-progress>
            </el-tooltip>
            <!--<el-progress :percentage="80" color="#f3c840" :stroke-width="10"></el-progress>-->
          </div>
        </div>
        <div class="progress_item">
          <div class="label">升压站:</div>
          <div class="content">
            <el-tooltip v-if="popData.fdBoosterStationsState==1" content="正常" placement="bottom" effect="light">
              <el-progress  :percentage="parseInt((popData.fdBoosterStationsProgressRate.toFixed(2) * 100))" color="#26d2ac" :stroke-width="10"></el-progress>
            </el-tooltip>
            <el-tooltip v-if="popData.fdBoosterStationsState==2" content="滞后" placement="bottom" effect="light">
              <el-progress  :percentage="parseInt((popData.fdBoosterStationsProgressRate.toFixed(2) * 100))" color="#ff6366" :stroke-width="10"></el-progress>
               </el-tooltip>
            <el-tooltip v-if="popData.fdBoosterStationsState==3" content="预警" placement="bottom" effect="light">
              <el-progress  :percentage="parseInt((popData.fdBoosterStationsProgressRate.toFixed(2) * 100))" color="#f3c840" :stroke-width="10"></el-progress>
              </el-tooltip>
            <!--<el-progress :percentage="80" color="#26d2ac" :stroke-width="10"></el-progress>-->
          </div>
        </div>
        <div class="progress_item">
          <div class="label">送出线路:</div>
          <div class="content">
            <el-tooltip v-if="popData.fdSendLineState==1" content="正常" placement="bottom" effect="light">
               <el-progress  :percentage="parseInt((popData.fdSendLineProgressRate.toFixed(2) * 100))" color="#26d2ac" :stroke-width="10"></el-progress>
            </el-tooltip>
            <el-tooltip v-if="popData.fdSendLineState==2" content="滞后" placement="bottom" effect="light">
             <el-progress  :percentage="parseInt((popData.fdSendLineProgressRate.toFixed(2) * 100))" color="#ff6366" :stroke-width="10"></el-progress>
             </el-tooltip>
            <el-tooltip v-if="popData.fdSendLineState==3" content="预警" placement="bottom" effect="light">
              <el-progress  :percentage="parseInt((popData.fdSendLineProgressRate.toFixed(2) * 100))" color="#f3c840" :stroke-width="10"></el-progress>
             </el-tooltip>
            <!--<el-progress :percentage="80" color="#26d2ac" :stroke-width="10"></el-progress>-->
          </div>
        </div>
      </div>
    </div>
    <div class="detail_wrap">
      <div class="detail_item_wrap">
        <div class="detail_item">
          <div class="left">项目类型：</div>
          <div class="right">{{mold[popData.fdProjectType-1]}}</div>
        </div>
        <div class="detail_item">
          <div class="left">项目类别：</div>
          <div class="right">{{classification[popData.fdProjectClass-1]}}</div>
        </div>
        <div class="detail_item">
          <div class="left">项目地形：</div>
          <div class="right">{{projectterrain[popData.fdProjectTerrain-1]}}</div>
        </div>
      </div>
      <div class="detail_item_wrap">
        <div class="detail_item">
          <div class="left">风资源区域：</div>
          <div class="right">{{resourcearea[popData.fdWindResourceArea-1]}}</div>
        </div>
        <div class="detail_item">
          <div class="left">承发包模式：</div>
          <div class="right">{{contracting[popData.fdPackageModel-1]}}</div>
        </div>
        <div class="detail_item">
          <div class="left">工程经理：</div>
          <div class="right">{{popData.fdPostName}}</div>
        </div>
      </div>
      <!--<div class="detail_item_wrap detail_item_wrap_one">
        <div class="detail_item">
          <div class="left">风机机型: </div>
          <div class="right">&nbsp;{{popData.fdFanType}}</div>
        </div>
      </div>
      <div class="detail_item_wrap detail_item_wrap_one">
        <div class="detail_item">
          <div class="left">轮毂高度: </div>
          <div class="right">&nbsp;{{popData.fdProfileHeight}}</div>
        </div>
      </div>-->
    </div>
    <div style="text-align: center;">
      <!--<button style="background-color: #39aef9;height: 35px; margin-top: 5px;">查看详情</button>-->
      <el-button type="primary"  size="mini" style="background-color: #0072c6;height: 27px; margin-top: 5px;" @click="goDetails">查看详情</el-button>
    </div>
    <img src="./img/close.png" class="close_btn" @click="close"/>
    <map-weather class="weather" @child-info="getTodayWeather"></map-weather>
  </div>
</template>
<script>
  import Weather from '@/components/common/weather';
  import {VIEW_API_PATH} from '../../axios/index'
  export default {
    components: {
      "map-weather": Weather,
    },
    data() {
      return {
        cityName:"",
        popData:{},
        todayWeather:{},
        construction:[  //建设状态(建设程度)
          "建设中",
          "未开工",
          "倒送电",
          "移交生产",
          "竣工验收"
        ],
        gineeringArea:[  //工程大区
          "工程一区",
          "工程二区",
          "工程三区",
          "工程四区"
        ],
        mold:[      //项目类型
          "风电项目",
          "光伏项目",
          "分散式风电项目",
          "分布式光伏项目",
          "海上风电项目",
          "屋顶光伏项目"
        ],
        resourcearea:[      //风资源区域
          "Ⅰ类",
          "Ⅱ类",
          "Ⅲ类",
          "Ⅳ类"
        ],
        subordinate:[//所属公司
          "华北分公司",
          "西北分公司",
          "华东分公司",
          "南方分公司"
        ],
        thebasetype:[   //基础类型
        "PH基础",
        "锚栓式基础",
        "梁板式基础",
        "桩承台基础",
        "高台柱式基础",
        "重力式拓展基础",
        "预制装配式基础",
        "浮筒式无张力基础",
        "混合塔架抬高式基础",
        ],
        contourheight:[   //轮廓高度
            "钢塔75m",
            "钢塔80m",
            "钢塔85m",
            "钢塔90m",
            "钢塔95m",
            "钢塔100m",
            "钢塔105m",
            "钢塔110m",
            "钢塔115m",
            "钢塔120m",
            "钢塔125m",
            "钢塔130m",
            "钢塔135m",
            "钢塔140m",
            "柔塔120m",
            "柔塔125m",
            "柔塔130m",
            "柔塔135m",
            "柔塔140m",
            "柔塔145m",
            "混塔100m",
            "混塔110m",
            "混塔120m",
            "混塔140m",
            "混塔160m",
            "混塔168m",
            "分片式钢塔120m",
            "分片式钢塔130m",
            "分片式钢塔140m",
            "分片式钢塔150m"
        ],
        classification:[  //项目类别
          "新建项目",
          "结转项目",
          "扩建项目",
        ],
        projectterrain:[    //项目地形
          "山地",
          "丘陵",
          "平原",
          "海上",
          "林地",
          "基本农田",
          "荒地",
          "滩涂",
          "草原",
          "鱼塘",
          "山地+丘陵",
          "平原+丘陵",
          "林地+草地",
          "林地+基本农田",
          "林地+荒地",
          "基本农田+荒地",
          "基本农田+草原",
          "平原+林地",
          "平原+基本农田",
        ],
        contracting:[ //承发包模式
          "施工总承包",
          "EPC总承包",
          "PC总承包",
          "平行发包",
          "合资合作"
        ],
      };
    },
    props:{

    },
    methods:{
      goDetails(){
        this.$router.push({path:"/main/details",query:{mapData:JSON.stringify(this.popData)}});
      },
      weatherValiad(text){
        if(typeof text !=undefined && typeof text != null){
          if(text.indexOf("省")!= -1){
            return this.weatherValiad(text.split("省")[1]);
          }else if(text.indexOf("自治区")!= -1){
            return this.weatherValiad(text.split("自治区")[1]);
          }else if(text.indexOf("市")!= -1){
            return text.split("市")[0];
          }else if(text.indexOf("特别行政区")!= -1){
            return text.split("特别行政区")[0];
          }else if(text.indexOf("地区")!= -1){
            return text.split("地区")[0];
          }else if(text.indexOf("自治州")!= -1){
            return text.split("自治州")[0];
          }else if(text.indexOf("县")!= -1){
            return text.split("县")[0];
          }else if(text.indexOf("乡")!= -1){
            return text.split("乡")[0];
          }else if(text.indexOf("镇")!= -1){
            return text.split("镇")[0];
          }else if(text.indexOf("区")!= -1){
            return text.split("区")[0];
          }else if(text.indexOf("村")!= -1){
            return text.split("村")[0];
          }else{
            return text;
          }
        }else{
          alert("没有获取到地址，无法获取天气情况");
          return null;
        }
      },
      getTodayWeather(data){
        this.todayWeather=data;
      },
      close(){
        this.$parent.close();
      },
    },
    created(){
      var data=JSON.parse(JSON.stringify(this.$parent.popData))
      if(data && data.fdBeginTime){
        var da=new Date(data.fdBeginTime);
        data.fdBeginTime=da.getFullYear()+"/"+(da.getMonth()+1)+'/'+da.getDate();
      }
      if(data && data.fdEndTime){
        var da=new Date(data.fdEndTime);
        data.fdEndTime=da.getFullYear()+"/"+(da.getMonth()+1)+'/'+da.getDate();
      }
      if(data && data.fdAddress){
        this.cityName=this.weatherValiad(data.fdAddress)
      }
      this.popData=data;
    },
    mounted: function() {
      //天气划出划过展示
      $('.btn_wea').hover(function(){
        $('.weather').stop().fadeIn();
      },function(){
        $('.weather').stop().fadeOut();
      })
    }
  };
</script>
<style scoped>
.map_pop{font-size:14px;position: relative;}
.no_line{overflow: hidden;text-overflow:ellipsis;white-space: nowrap;}
.map_pop{margin-left:100px;width:689px;height:427px;background: url("img/pop_bg.png") no-repeat;z-index: 2000;}
.address_title{height: 36px;line-height: 36px;color: #e1e1e2;font-size:14px;overflow: hidden;}
.address_title .left{float:left;height:36px;line-height: 36px;color: #e1e1e2;width: 40%;text-indent: 1em;}
.address_title .right{cursor:pointer;float:left;height:36px;line-height: 36px;color: #e1e1e2;width: 40%;margin-left:20%;}
.progress_wrap{margin-top:20px;height:180px;overflow: hidden;clear: both;}
.progress_wrap .progress_left{float:left;height:160px;width:40%;text-align: center}
.progress_wrap .progress_right{float:left;height:160px;width:60%;}
.circle{position: relative;}
 .circle /deep/ .el-progress__text{color:#e1e1e2;font-size:20px!important;}
.name_project{color:#f3c840;font-size:14px;margin-top:5px;text-align: center;}
.time_project{color:#e1e1e2;font-size:14px;margin-top:5px;}
.progress_item{height:20px;line-height: 20px;margin-top:9px;}
  .progress_item .label{float:left;width:20%;color:#e1e1e2;}
.progress_item .content{float:left;width:80%;}
/deep/ .el-progress__text{font-size:14px!important;color:#f7f7f8;}
/deep/ .el-progress-bar__outer{background-color: #bdbdbd}
.detail_wrap{height:120px;width:90%;margin-left:5%;border: 1px solid #b3cdda;margin-top:15px;border-radius: 5px;}
.detail_item_wrap{overflow: hidden;margin-top:26px;padding-left: 20px;}
.detail_item{float:left;width:33.3%;height:20px;line-height: 20px;color: #e1e1e2;}
.detail_item .left{float:left;height:20px;line-height: 20px;}
.detail_item .right{float:left;height:20px;line-height: 20px;}
.detail_item_wrap_one .detail_item{float: none;width: 100%;text-align: left}
.detail_item_wrap_one .detail_item .left{width:10%;}
.close_btn{position: absolute;top:-9px;right:-12px;cursor: pointer;}
.weather{position: absolute;top:-214px;right:80px;display: none;}
</style>
