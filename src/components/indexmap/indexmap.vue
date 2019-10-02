<template>
  <div class="bos" id="mapsBody">
      <!-- 搜索 -->
    <div id="searchDiv"  class="grabble lcztrans">
          <!-- 搜索框 -->
          <div class="seek" style="display:inline-block;">
            <div style="margin-top: 10px;">
              项目名称:
              <p class="search6">
                <el-input
                  placeholder="请输入项目名称..."
                  @keyup.enter.native="nameer"
                  v-model="projects">
                </el-input>
              </p>
              年份:
              <p class="search2" @click="yearss">
                <el-date-picker
                  v-model="annual"
                  @change="yearBtn"
                  type="year"
                  placeholder="请选择...">
                </el-date-picker>
              </p>
              片区:
              <p class="search1" @click="search(0)" >
                <el-input
                  placeholder="请选择..."
                  size="small"
                  v-model="epc">
                </el-input>
              <div class="pears">
                <el-input placeholder="输入关键字进行过滤" v-model="filterText" clearable></el-input>
                <el-tree
                  :data="forget"
                  show-checkbox
                  @check-change="jiedian"
                  node-key="fdRegionid"
                  :filter-node-method="filterNode"
                  :props="defaultProps" ref="tree2">
                </el-tree>
                <div class="hob-ser">
                  <el-button size="mini" plain @click="lcsucc">确定</el-button>
                  <el-button size="mini" plain @click="seek">取消</el-button>
                  <span class="rests" @click="rests1">重置</span>
                </div>
              </div>
             </p>
              建设程度:
              <p class="search3" @click="search(1)">
                <el-input
                  placeholder="请选择..."
                  size="small"
                  v-model="chengdu">
                </el-input>
              <div class="pears2">
                <div class="save">
                  <el-checkbox-group
                    v-model="checkedCities1" @change="jianshechengd">
                    <el-checkbox v-for="(city,index) in cities" :label="index+1" :key="index">{{city}}</el-checkbox>
                  </el-checkbox-group>
                </div>
                <div class="hob-ser">
                  <el-button size="mini" plain @click="construction">确定</el-button>
                  <el-button size="mini" plain @click="seek1">取消</el-button>
                  <span @click="rests2">重置&nbsp;</span>
                </div>
              </div>
              </p>
              <p class="search7"><button @click="demand">查询</button></p>
              <p class="search8"><button @click="reset">重置</button></p>
              <p class="search4" @click="search(2)" style="visibility: hidden;">高级筛选<i class="el-icon-arrow-down el-icon--right"></i>
              <div class="pears3">
                <div class="save">
                  222
                </div>
                <div class="hob-ser">
                  <el-button size="small" round @click="seek2">确定</el-button>
                  <el-button size="small" round @click="seek2">取消</el-button>
                  <span>重置</span>
                </div>
              </div>
            </p>
            </div>

          </div>
    </div>
      <el-button type="success" class="showSearch" :style="{left:showSearchIconLeft+'px'}" v-if="showSearch" @click="showSearchMethod"></el-button>
      <el-button type="success" class="hiddenSearch" :style="{left:showSearchIconLeft+'px'}" v-if="!showSearch" @click="showSearchMethod"></el-button>



    <!-- 地图模块 -->
   <div class="maps"  :style="{height:mapsBodyHeight+'px'}" style="clear: both;">
     <p class="search5" :style="{top:switchIcon+'px'}">
       <el-button type="success" class="left" v-if="!remflag" @click="btner"></el-button>
       <el-button type="success" class="left_no" v-if="remflag" @click="btner"></el-button>
     </p>
        <div class="mapapi" v-if="lists" >
          <!-- 地图模块 -->
          <div id="map" style="width: 100%;height: 100%;" v-loading="loading"  element-loading-text="拼命加载中"  element-loading-spinner="el-icon-loading"   element-loading-background="rgba(0, 0, 0, 0.5)"></div>
          <!-- 地图侧拉框 -->
          <div style="100%">
            <div class="fonwe being1"  @click="fonwer(0)">
              <p>
                <span>
                  工程一区
                </span>
              </p>
              <p>
               <ul>
                 <li>项目容量</li>
                 <li><em>{{district.fdSize?district.fdSize:"--"}}</em>&nbsp;MW</li>
                 <li>项目个数</li>
                 <li><em>{{district.fdNumber?district.fdNumber:"--"}}</em></li>
               </ul>
              </p>
            </div>
            <div class="fonwe being2"  @click="fonwer(1)">
              <p>
                <span>
                  工程二区
                </span>
              </p>
              <p>
                <ul>
                  <li>项目容量</li>
                  <li><em>{{district.fdSize?district.fdSize:"--"}}</em>&nbsp;MW</li>
                  <li>项目个数</li>
                  <li><em>{{district.fdNumber?district.fdNumber:"--"}}</em></li>
               </ul>
              </p>
            </div>
            <div class="fonwe being3"  @click="fonwer(2)">
              <p>
                <span>
                  工程三区
                </span>
              </p>
              <p>
                <ul>
                  <li>项目容量</li>
                  <li><em>{{district.fdSize?district.fdSize:"--"}}</em>&nbsp;MW</li>
                  <li>项目个数</li>
                  <li><em>{{district.fdNumber?district.fdNumber:"--"}}</em></li>
               </ul>
              </p>
            </div>
            <div class="fonwe being4"  @click="fonwer(3)">
              <p>
                <span>
                  工程四区
                </span>
              </p>
              <p>
                <ul>
                  <li>项目容量</li>
                  <li><em>{{district.fdSize?district.fdSize:"--"}}</em>&nbsp;MW</li>
                  <li>项目个数</li>
                  <li><em>{{district.fdNumber?district.fdNumber:"--"}}</em></li>
               </ul>
              </p>
            </div>
            <div class="fonwe being5"  @click="fonwer(4)">
              <p>
                <span>
                  工程总区
                </span>
              </p>
              <p>
                <ul>
                  <li>项目容量</li>
                  <li><em>{{district.fdSize?district.fdSize:"--"}}</em>&nbsp;MW</li>
                  <li>项目个数</li>
                  <li><em>{{district.fdNumber?district.fdNumber:"--"}}</em></li>
               </ul>
              </p>
            </div>
            </div>
          </div>
      <map-index-list ref="mapList" v-if="!lists"></map-index-list>
     <map-view-model v-if="lists" style="background-color: rgba(245,243,240);position: absolute;margin-top: -176px;margin-left: 12px;z-index: 9999;"></map-view-model>
    </div>
    <!-- 详情弹出框 -->
    <map-pop  v-if="test" class="map-pop"></map-pop>

  </div>
</template>
<script>
 import mapPop from '@/components/common/mapPop';
 import weathers from '@/components/common/weathers';
 import indexList from "@/components/indexmap/indexlist";
 import mapViewModel from '@/components/common/model/mapViewModel';
 import {VIEW_API_PATH,DM_PATH} from '../../axios/index';
  export default {
    components: {
      "map-pop": mapPop,
      "map-weathers": weathers,
      "map-view-model":mapViewModel,
      "map-index-list":indexList,
    },
    data() {
      return {
        showSearch:false,
        loading: true,
        switchIcon:18,
        mapsBodyHeight:0,
        showSearchIconLeft:0,
        checkedCities1:[],    //建设程度
        cities: ['未开工', '建设中', '倒送电', '移交生产','竣工验收'],  //默认展示建设程度信息
        remflag:false,     //搜索显示隐藏按钮
        lists:true,          //展示
        annual:"",            //搜索年度
        districts:"",         //搜索五大片区id
        projects:"",          //搜索输入项目名称
        filterText: '',       //搜索片区查询
        datadtes:[],          //片区回显数字
        epc:"",               //片区input
        epcarr:[],            //片区回显汉字
        forget: [],           //搜索片区回显
        chengdu:"",           //程度input回显
        defaultProps: {
          children: 'children',
          label: 'fdRegionNameCn'
        },
        district:{}, //片区容量个数回显
        test:false,
        popData:{},
        oinfo_id:"",
        oName:"",
        areaList:[],
        map:null,
        vLayer:null,
      };
    },
    methods: {
      showSearchMethod(){
        this.showSearch=!this.showSearch;
        if(this.showSearch){
          document.getElementById("searchDiv").style.height="60px";
          this.mapsBodyHeight=this.mapsBodyHeight-70;
        }else{
          document.getElementById("searchDiv").style.height="0px";
          this.mapsBodyHeight=this.mapsBodyHeight+70;
        }
      },
      getChinaData(){
        var _this = this;
        var url = this.$pathUrl.chinaPart;
        this.$http.get(url)
          .then(res => {
            var data = res.data.features;
            if(data){
              var geojsonParse = new SuperMap.Format.GeoJSON();
              for(var i = 0; i < data.length; ++i) {
                var features = geojsonParse.read(data[i]);
                features[0].style = {
                  fillColor: "#fff",
                  strokeColor: "#269DE9",
                  strokeWidth: 3,
                  fillOpacity: 0
                };
                _this.vLayer.addFeatures(features);
              }
            }
          }).catch(err => {
          console.log("数据请求失败")
        })
    /*    this.$http.get(url,{isJson:true},r =>{
          var data = r.features;
          if(data){
            var geojsonParse = new SuperMap.Format.GeoJSON();
            for(var i = 0; i < data.length; ++i) {
              var features = geojsonParse.read(data[i]);
              features[0].style = {
                fillColor: "#fff",
                strokeColor: "#ac9f6c",
                strokeWidth: 3,
                fillOpacity: 0
              };
              _this.vLayer.addFeatures(features);
            }
          }
        })*/
      },
      jianshechengd(){
        var arr=[];
        for(var i=0;i<this.checkedCities1.length;i++){
          arr.push(this.cities[this.checkedCities1[i]-1]);
        }
        this.chengdu=arr.join(",");
      },
      rests1(){             //片区重置
        this.datadtes = [];
        this.districts = "";
        this.filterText="";
        this.$refs.tree2.setCheckedKeys([]);
      },
      rests2(){             //建设程度重置
        this.chengdu=""
        this.checkedCities1 = []    //建设程度设置为空
      },
      yearBtn(){
        this.demand();
      },
      nameer(){
        this.demand();
      },
      yearss(){
          $('.pears').stop().fadeOut();
           $('.pears2').stop().fadeOut();
           $('.pears3').stop().fadeOut();
      },
      demand(){
        if(!this.lists){
          this.$refs.mapList.tableDataList();
        }else{
          $('.fonwe').removeClass('on')
          this.tableDataArrShow();
        }
      },
      reset(){    //重
       $('.fonwe').removeClass('on')
        this.districts="",          //区域id
        this.annual="",             //年
        this.checkedCities1=[],     //建设程度
        this.projects="";           //项目名称
        this.datadtes=[];           //片区选中设置为空
         this.chengdu="";
        if(!this.lists){
          this.$refs.tree2.setCheckedKeys([]);
          this.$refs.mapList.tableDataList();
        }else{
          this.$refs.tree2.setCheckedKeys([]);
          this.tableDataArrShow();   //地图展示数据id
        }

      },
      defs(){
        alert("211111")
      },
      lcsucc(){     //查询片区按钮
          this.filterText="";
          this.demand();
          $('.pears').stop().fadeOut();
      },
      jiedian(data, checked, deep){     //tree失去焦点拿到当前id  节点本身是否被选中、节点的子树中是否有被选中的节点
        if(checked==true){
          this.datadtes.push(data.fdRegionid)
          this.epcarr.push(data.fdRegionNameCn)
        }else{
          var arr=[],brr=[];
          for(var i=0;i<this.datadtes.length;i++){
            if(this.datadtes[i]!=data.fdRegionid){
              arr.push(this.datadtes[i])
            }
          }
          for(var i=0;i<this.epcarr.length;i++){
            if(this.epcarr[i]!=data.fdRegionNameCn){
              brr.push(this.epcarr[i])
            }
          }
          this.datadtes=arr;
          this.epcarr = brr;
        }
          this.districts = this.datadtes.join(",");
          this.epc = this.epcarr.join(",");

      },
      construction(){             //建设程度
           this.demand();
           $('.pears2').stop().fadeOut();
      },
      search(row){     //搜索弹出框
        if(row==0){
           $('.pears').stop().fadeToggle();
           $('.pears2').stop().fadeOut();
           $('.pears3').stop().fadeOut();
           $('.fonwe').removeClass('on')
          this.test=false;
        }else if(row==1){
          $('.pears2').stop().fadeToggle();
          $('.pears').stop().fadeOut();
          $('.pears3').stop().fadeOut();
          $('.fonwe').removeClass('on')
          this.test=false;
        }else if(row==2){
          $('.fonwe').removeClass('on')
           $('.pears3').stop().fadeToggle();
           $('.pears').stop().fadeOut();
           $('.pears2').stop().fadeOut();
          this.test=false;
         }
      },
      btner(){          //显示隐藏搜索框
        var _this = this;
        _this.close();
          _this.remflag = !_this.remflag;
          $('.pears2').stop().fadeOut();
          $('.pears').stop().fadeOut();
          $('.pears3').stop().fadeOut();
          $('.fonwe').stop().fadeOut();
          _this.$refs.tree2.setCheckedKeys([]);
          if(_this.remflag){
           // _this.map.destroy();
           _this.reset();
            _this.lists = false;
          }else{
            //_this.tableDataArrShow();
            _this.lists = true;
             _this.loading=true;
             _this.reset();
          }
      },
      filterNode(value, data){
        if (!value) return true;
        console.log(data)
        return data.fdRegionNameCn.indexOf(value) !== -1;
      },
      findwet(){         //片区回显详情
        var _this = this;
        var params={
              isTree:true,
              appid:4
            }
            this.$http.post('/permission/getRegion',params)
          //  this.$http.post('getRegion',params)
            .then(res => {
              let Do=res.data.data;
              _this.forget = Do;
            }).catch(err => {
            console.log("数据请求失败")
          })
      },
      fonwer(row){                  //地图侧边栏显示隐藏
        var rows=row+1;
        if(rows==5){
              rows="";
           }
        // this.projects = "";         //当点击地图侧边栏的时候项目名称为空
        // this.annual = "";           //当前年份为空
        // this.checkedCities1 = [];   // 当前为空
        var _this=this;
        if($(".fonwe").eq(row).hasClass("on")){
           $('.fonwe').eq(row).removeClass('on').addClass('out').siblings().removeClass('out');
         }else{
           $('.fonwe').eq(row).addClass('on').removeClass('out').siblings().removeClass('on');
            _this.totalareaCapacity(row);
            _this.particulars(rows);   //地图展示数据id
         }
      },
      totalareaCapacity(row){     //五大片区详情坐标回显
        var arr=row+1;
         if(arr==5){
          arr=null
         }
         console.log(arr)
        var _this=this;
        var params={
                fdRegionid: arr    //区域id
              }
        //proview/
           this.$http.post('/engineer/getSubRegion', params)      //项目容量与项目个数接口
          // this.$http.post('getSubRegion', params)      //项目容量与项目个数接口
            .then(res => {
              let Do=res.data.data;
              if(res.status==200){
                _this.district=Do;
              }
            }).catch(err => {
            console.log("数据请求失败")
          })
          $('.pears').stop().fadeOut();
          $('.pears2').stop().fadeOut();
          $('.pears3').stop().fadeOut();
          this.test=false;
      },
      particulars(row){   //片区地图展示详情id
        var _this=this;
        var params={
                fdRegionid:row,          //区域id
                yearDate:null,               //年
                fdBuildLevel:[],   //建设程度
                fdName:""                //项目名称
              }
             this.$http.post('/engineer/getConditionsPro', params)
            // this.$http.post('getConditionsPro', params)
              .then(res => {
                let Do=res.data.data;
                _this.areaList=Do;
                if(_this.map){
                  console.log("销毁地图");
                  _this.map.destroy();
                }
                setTimeout(function () {
                  _this.drawMap()
                },1)

              }).catch(err => {
              console.log("数据请求失败")
            })
      },
      tableDataArrShow(){   //查询后回显详情
        var _this=this;
        var ww = new Date(this.annual),
            year="";
            year= ww.getFullYear(); //年
        var params={
                fdRegionid:_this.districts,          //区域id
                yearDate:year,               //年
                fdBuildLevel:_this.checkedCities1,   //建设程度
                fdName:_this.projects                //项目名称
              }
              //
             this.$http.post('/engineer/getConditionsPro', params)
            // this.$http.post('getConditionsPro', params)
              .then(res => {
                let Do=res.data.data;
                _this.areaList=Do;
                if(_this.map){
                  console.log("销毁地图");
                  _this.map.destroy();
                }
                setTimeout(function () {
                  _this.drawMap()
                },1)

              }).catch(err => {
              console.log("数据请求失败")
            })
      },
      seek(){
        $('.pears').stop().fadeToggle();
        this.filterText="";
      },
      seek1(){
        $('.pears2').stop().fadeToggle();
      },
      seek2(){
        $('.pears3').stop().fadeToggle();
      },
      drawMap(row){
        var _this = this;
        var  baiduLayer, markers,markerlayer, marker,dataAdded = false;
        _this.map = new SuperMap.Map("map", {
//            限制最小缩放比例
          minZoom:3,
          maxZoom:50,
          restrictedExtent:new SuperMap.Bounds(-179,-90,179,90), //控制地图的白色展示
          controls: [
            new SuperMap.Control.Navigation(),
           /* new SuperMap.Control.Zoom(),*/
             new SuperMap.Control.LayerSwitcher({isImperialUnits:false,defaultPosition: new SuperMap.Pixel(40,60)})
          ],
          allOverlays: true
        });
        baiduLayer = new SuperMap.Layer.Tianditu();
        baiduLayer.layerType = 'img';
        markerlayer = new SuperMap.Layer.Tianditu();
        markerlayer.layerType = "img";
        markerlayer.isLabel = true;
        _this.map.addControl(new SuperMap.Control.MousePosition());
        markers = new SuperMap.Layer.Markers("Markers");
        _this.vLayer = new SuperMap.Layer.Vector("vector");
        _this.map.addLayers([baiduLayer, markers, markerlayer,_this.vLayer]);
        _this.getChinaData();
        var mapArr = _this.areaList;  //坐标赋值
        if(mapArr){
          for(var i=0;i<mapArr.length;i++){
            if(mapArr[i].fdLongitude && mapArr[i].fdLatitude){
                //console.log(mapArr[i].fdProid +"&&"+mapArr[i].fdLongitude+"&"+mapArr[i].fdLatitude)
                addData(mapArr[i].fdLongitude,mapArr[i].fdLatitude,mapArr[i].fdName,mapArr[i].fdProid,mapArr[i].buildLevel,);
            }
          }
        }

        //添加数据
        function addData(lon,lat,name,id,state) {
          var size = new SuperMap.Size(27, 35);
          var offset = new SuperMap.Pixel(-(size.w / 2), -size.h);
          var icon
          if(state==1){
            icon = new SuperMap.Icon('./static/images/state1.png', size, offset);
          }else if(state==2){
            icon = new SuperMap.Icon('./static/images/state2.png', size, offset);
          }else if(state==3){
            icon = new SuperMap.Icon('./static/images/state3.png', size, offset);
          }else if(state==4){
            icon = new SuperMap.Icon('./static/images/state4.gif', size, offset);
          }else if(state==5){
            icon = new SuperMap.Icon('./static/images/state5.gif', size, offset);
          }else{
            icon = new SuperMap.Icon('./static/images/state1.png', size, offset);
          }
          marker = new SuperMap.Marker(new SuperMap.LonLat(lon, lat), icon);
          marker.info = {
            "name":name,
            "id":id,
            "state":state,
          };



          marker.events.on({
            "mouseover": openInfoWin,
            "mouseout": closeInfoWin,
            "click": clickOpenInfoWin,
            "touchstart": openInfoWin,    //假如要在移动端的浏览器也实现点击弹框，则在注册touch类事件
            "scope": marker
          });
          markers.addMarker(marker);

        }



        //打开对应的信息框
        var infowin = null;

        function openInfoWin() {
          var marker = this;
          var lonlat = marker.getLonLat();
          var size = new SuperMap.Size(0, 33);
          var offset = new SuperMap.Pixel(11, -30);
          var icon = new SuperMap.Icon("./static/images/marker.png", size, offset);
          var popup = new SuperMap.Popup.FramedCloud("popwin",
            new SuperMap.LonLat(lonlat.lon, lonlat.lat),
            null,
             marker.info.name,
            icon,
            true);
          infowin = popup;
          _this.map.addPopup(popup);
        }


        function clickOpenInfoWin(){
          $('.pears').stop().fadeOut();
          $('.pears2').stop().fadeOut();
          $('.pears3').stop().fadeOut();
          var marker = this;
          _this.oinfo_id=marker.info.id;
          _this.iDshow();
        }

        //关闭信息框
        function closeInfoWin() {
          if (infowin) {
            try {
              infowin.hide();
              infowin.destroy();
            }
            catch (e) {
            }
          }
        }

        _this.map.setCenter(new SuperMap.LonLat(116, 34), 4);
        _this.loading=false;
      },
      iDshow(){
        var _this=this;
        var params={
          fdProid:_this.oinfo_id,
        }
         this.$http.post('/engineer/getDetails', params)
        // this.$http.post('getDetails', params)
          .then(res => {
            _this.popData=res.data.data
            _this.oName=res.data.data.fdName;
            _this.open();
          }).catch(err => {
          console.log("数据请求失败")
        })
      },
      close(){
        this.test=false;
      },
      open(){
        this.test=true;
      },
    },
    mounted:function(){
      var _this=this;
       _this.mapsBodyHeight=document.getElementById("bgerbody").offsetHeight-75;
       _this.showSearchIconLeft=(document.getElementById("mapsBody").offsetWidth-96)/2;
        _this.findwet();
         // _this.drawMap();
        _this.tableDataArrShow();

    },
    watch: {
      filterText(val) {
        this.$refs.tree2.filter(val);
      }
    },
  }
</script>
<style scoped>
  .bos{
    height: 904px;
    position: relative;
  }
  .maps{
    /* height: 93%; */
    margin-top:-5px;
    position: relative;
  }
  .grabble{
    width: 99%;
    height: 0px;
    line-height: 32px;
    background: #fff;
    margin:9px;
    padding:0px 0px;
    border-radius: 3px;
  }
  .grabble .seek{
    width: 99%;
    height: 100%;
    padding-left: 10px;
    position: relative;
  }
  .grabble .seek p{
    display: inline-block;
    text-align: center;
    margin-top: 5px;
    margin-left: 5px;
  }
  .grabble /deep/ .search1{
    height: 30px;
    width: 120px;
    margin-right:20px;
    border-radius: 5px;
    cursor: pointer;
    color: #ccc;
  }
  .grabble /deep/ .search2{
    width: 130px;
    height: 30px;
    margin-right:20px;
    cursor: pointer;
  }
  .grabble /deep/ .search2 input{
    height: 32px;
    line-height:32px;
    padding-left: 38px;
  }
  .grabble /deep/ .search2 i{
     margin-top: -5px;
  }
  .grabble /deep/ .search2 div{
    width: 120px;
    height: 32px;
  }
  .grabble .search6 /deep/ span{
    color: #136899;
  }
  .grabble /deep/ .search6{
      height: 30px;
      width: 150px;
      cursor: pointer;
      margin-right:24px;
  }
  .grabble /deep/ .search3{
    width: 120px;
    height: 30px;
    margin-right:10px;
    border-radius: 5px;
    cursor: pointer;
    color: #ccc;
  }
  .grabble /deep/ .search4{
    width: 120px;
    height: 30px;
    position: absolute;
    right: 20px;
    top: 0px;
    color:#A3C4D7;
    border-radius: 5px;
    cursor: pointer;
  }
  .search5{
    display: inline-block;
    position: absolute;
    left: 18px;
    z-index: 2000;
    cursor: pointer;
  }
  .search5 /deep/ .left{
    width: 40px;
    height: 40px;
    border: none;
    background: url("./image/hoeat2.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }
   .search5 /deep/ .left_no{
    width: 40px;
    height: 40px;
    border: none;
    background: url("./image/seat1.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }
  .showSearch{
    position: absolute;
    left: 48%;
   /* margin-top: -15px;*/
    z-index: 1500;
    cursor: pointer;
    width: 96px;
    height: 20px;
    border: none;
    background: url("./image/up.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }
  .hiddenSearch{
    position: absolute;
    left: 48%;
    z-index: 1500;
    cursor: pointer;
    width: 96px;
    height: 20px;
    border: none;
    background: url("./image/down.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }
  .search5 /deep/ .el-button.is-circle{
    border-radius: none;
  }
  .grabble .seek .search6 /deep/ input{
    height: 32px;
    line-height:32px;
    border-radius: 4px;
  }
  .grabble .seek .search6 /deep/ input:hover{
    border-radius: 4px;
  }
  .grabble .seek .search7 button{
    width: 50px;
    border:none;
    border-radius: 4px;
    color: #fff;
    background: #39aef9;
    cursor:pointer
  }
  .grabble .seek .search8 button{
    width: 50px;
    border:none;
    background: none;
    border-radius: 5px;
    cursor:pointer
  }
  .grabble .seek span:nth-child(6){
    width: 170px;
  }
  .pears{
    display: none;
    width: 355px;
    height: 331px;
    border-radius: 4px;
    background: #fff;
    position: absolute;
    left: 470px;
    top: 59px;
    z-index: 9999;
    border: 1px solid #e4e7ed;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  }
  .pears .el-tree /deep/ .el-tree-node__content{

  }
  .save{
    width: 100%;
    height: 153px !important;
    /* margin-top: 16px !important; */
  }
  .pears2{
    display: none;
    width: 200px;
    height: 220px;
    border-radius: 4px;
    position: absolute;
    left: 683px;
    top: 59px;
    z-index: 9999;
    border: 1px solid #e4e7ed;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    background: #fff;
  }
  .pears2 /deep/ .save{
    height: auto !important;
    margin-top: 8px;
  }
  .pears2 /deep/ .el-checkbox{
    margin-top:8px;
    margin-left: 18px;
  }
  .pears2 .hob-ser{
    text-align: center;
    margin-top:12px;
  }
  .pears2 .hob-ser button{
    display: inline-block;
    width: 55px;
    height: 25px;
    padding: 6px 15px;
  }
  .pears2 .hob-ser button:nth-child(1){
    margin-left: 0px;
    background:#39aef9;
    color: #fff;
  }
  .pears2 /deep/ .el-checkbox-group{
    width: 150px;
    line-height:10px;
    margin-left: 13px;
  }
  .pears2 .hob-ser span{
    cursor:pointer;
    display: inline-block;
    margin-left: 12px;
  }
  .pears2 .hob-ser span:nth-child(2){
    margin-left:10px;
  }
  .pears3{
    display: none;
    width: 190px;
    height: 207px;
    background: url("./image/bgbacnk.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    position: absolute;
    right: -3px;
    top: 34px;
    z-index: 9999;
  }
  .pears3 .hob-ser{
    text-align: center;
  }
  .pears3 .hob-ser button{
    width: 55px;
    height: 25px;
    padding: 6px 15px;
    background: none;
    color: #ccc;
  }
  .pears3 .hob-ser button:nth-child(1){
    margin-left:20px;
  }
  .pears3 .hob-ser span{
    color: #fff;

  }
  .pears /deep/ .el-input{
    width: 92%;
    margin-top: 8px;
    margin-left: 14px;
  }
  .pears .el-input /deep/ input::-webkit-input-placeholder{
    color:#606266;
  }
  .pears /deep/ .el-tree{
    overflow-y:auto;
    width: 92%;
    height: 238px;
    margin-left: 14px;
    color: #606266 !important;
  }
  .pears /deep/ .el-tree-node:focus{
    background-color: none;
  }
  .pears .hob-ser{
    width: 90%;
    margin-left: 14px;
    margin-top: 3px;
    text-align: center;
  }
  .pears .hob-ser /deep/ .rests{
    margin-left: 12px;
    cursor:pointer
  }
  .pears .hob-ser /deep/ button:nth-child(1){
    margin-left: 0px;
    background:#39aef9;
    color: #fff;
  }
  .pears .hob-ser /deep/ button span{
    display: inline-block;
    width: 40px;
    text-align: center;
  }
  .mapapi{
    width:99.4%;
    height: 100%;
    padding: 4px;
    margin:9px 5px;
    background: url("./image/group41.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    position: relative;
    overflow: hidden;
  }
  .footer{
    width: 100%;
    text-align: center;
  }
  .footer span{
    margin-left: 10px;
    color:#21548C;
    text-decoration:underline;
  }
  .footer button{
    width: 60px;
    height: 30px;
    border-radius: 3px;
    background: none;
    border:1px solid #ccc;
  }
  .footer button:hover{
    background:#21548C;
    color: #fff;
  }
  .footer button:nth-child(2){
    margin-left: 10px;
  }
  .fonwe{
    width: 140px;
    height:16%;
    min-height:83px;
    position: absolute;
    right: -103px;
    cursor:pointer;
    background:url("./image/groups.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    z-index: 2000;
  }
  .fonwe p:nth-child(1){
    float: left;
    width: 30%;
    height: 100%;
    display:inline-block;
    text-align: center;
    align-items: center;
    margin-left: -5px;
    position: relative;
  }
  .being1{
    top:6%;
  }
  .being2{
    top:23%;
  }
  .being3{
    top:40%;
  }
  .being4{
    top:57%;
  }
  .being5{
    top:74%;
  }
  .fonwe p span{
    writing-mode:tb-rl;
    -webkit-writing-mode: vertical-rl;
    writing-mode: vertical-rl;
    position: absolute;
    top:0px;
    bottom:0px;
    right: 22%;
    margin:auto;
    color: #fff;
    letter-spacing: 4px;
  }
  .fonwe p:nth-child(2){
    width: 73%;
    height: 100%;
    display: inline-block;
    color: #fff;
    text-align:center;
  }
  .fonwe p /deep/ ul{
    height: 95%;
    text-align: center;
      position: absolute;
    right: 0px;
    bottom: 0px;
    left: 30px;
    top: 0px;
    margin: auto;
  }
  .fonwe p /deep/ ul li{
    height:20%;
    /* margin-top:11%; */
  }
  .fonwe p /deep/ ul li em{
    font-size:16px;
  }
   .fonwe p /deep/ ul li:nth-child(1){
    margin-top:6.5%;
  }
    .fonwe p /deep/ ul li:nth-child(odd){
     letter-spacing:4px;
  }
  .fonwe p /deep/ ul li:nth-child(even){
     margin: 2% 0%;
     color: #3AF0E7
  }
  .on{animation:myout 1s;animation-fill-mode:forwards}
  .out{animation:myin 1s;animation-fill-mode:forwards}
  @keyframes myout
      {
        from {right: -103px;}
        to {right: 0px;}
      }
    @keyframes myin
    {
      from {right:0px;}
      to {right: -103px;}
    }

  /*地图弹框*/
  .map-pop{position: absolute!important;left:50%;margin-left:-355px!important;bottom: 39%;}

  .lcztrans{
    height:0px;
    transition:height 1s;
    -webkit-transition:height 1s; /* Safari */
  }


</style>
