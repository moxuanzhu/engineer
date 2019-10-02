<template>
  <div class="weather">
    <div class="weather_itemone weather_item " v-for="item in weathers" v-bind:style="{background:'url('+item.humi_high+')'}">
        <div class="time">{{item.date}}</div>
        <div class="time">{{item.temperature}}</div>
        <div style="visibility: hidden;">item.days</div>
        <div class="weather_type">{{item.weather}}</div>
        <div class="tenper">{{item.wind}}</div>
         <!-- <div class="wind_level">{{item.wind}}</div> -->
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        cityName: this.$parent.cityName,
        weathers:[],
        today:{},      //获取当天的天气情况
      };
    },
    props:{

    },
    methods:{
      weate(row){
        console.log(row)
        var _this=this;
        // var url='http://api.k780.com/?app=weather.future&weaid='+ row +'&appkey=33878&sign=b48d8df92d37190cac80fdfc709aed33&format=json&jsoncallback=data';
        var url='http://api.map.baidu.com/telematics/v3/weather?location='+row+'&output=json&ak=MhuuVxziXcOqWUAZ5vVEd4GBUdnZj0yO';
        $.ajax({
          type          : 'get',
          async         : false,
          url           : url,
          dataType      : 'jsonp',
          jsonp         : 'callback',
          jsonpCallback : 'data',
          success       : function(data){
            var brr ;
            var arr = data.results[0].weather_data;
            if(arr){
              brr = arr.slice(0,4);
            }else{
              alert("无法获取当前地区天气信息，请稍后重试");
              return;
            }
            _this.today = data.results[0].weather_data[0];
            var todys=brr[0].date.slice(0,2);
            for(var i=0;i<brr.length;i++){
              if(brr[i]){
                brr[0].date=todys;
              }
              if(brr[i].weather.indexOf("雨")>=0){
                brr[i].humi_high="static/images/yu.png"
              }else if(brr[i].weather.indexOf("雪")>=0){
                brr[i].humi_high="static/images/xue.png"
              }else if(brr[i].weather.indexOf("雾")>=0){
                brr[i].humi_high="static/images/wu.png"
              }else if(brr[i].weather.indexOf("阴")>=0){
                brr[i].humi_high="static/images/yin.png"
              }else if(brr[i].weather.indexOf("云")>=0){
                brr[i].humi_high="static/images/duoyun.png"
              }else{//默认晴天
                brr[i].humi_high="static/images/qing.png"
                brr[i].weather="晴天";
              }


            }
            _this.weathers = brr;
            _this.$emit("child-info",_this.today)

          },
          error:function(){
            alert('fail');
          }
        });
      },
    },
    mounted: function() {
      var _this=this;
      if(_this.cityName){
        _this.weate(_this.cityName);
      }

    }
  };
</script>
<style scoped>
.weather{width:439px;height:216px;background: url("img/weather_bg.png") no-repeat;color: #fff;font-size: 12px;}
.weather div:nth-child(1){
  margin-left: 5px!important;
}
.yin{background: url("img/yin.png") no-repeat!important;}
.qing{background: url("img/qing.png") no-repeat!important;}
.yu{background: url("img/yu.png") no-repeat!important;}
.xue{background: url("img/xue.png") no-repeat!important;}
.yun{background: url("img/duoyun.png") no-repeat!important;}
.wu{background: url("img/wu.png") no-repeat!important;}
.weather_itemone{float:left;width:107px;height:195px;background: url("img/qing.png") no-repeat;margin-top:5px;margin-left:1px!important;}
.weather_item{float:left;width:106.5px;height:195px;background: url("img/qing.png") no-repeat;margin-top:5px;margin-left:16px;}
.time{height:20px;line-height: 10px;text-align: center;margin-top:10px;}
.weather_type{height:20px;line-height: 20px;text-align: center;margin-top:42px;font-size: 12px;}
.tenper{height:20px;line-height: 20px;text-align: center;margin-top:5px;}
.wind_level{height:20px;line-height: 20px;text-align: center;margin-top:0px;}
</style>

