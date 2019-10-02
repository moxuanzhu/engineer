<template>
<div>
    <!-- 总工程量/计划预期 -->
  <div class="leftEcharts" style="width: 30%;border: 1px solid #EAF0F4;float: left">
    
     <!-- 南丁格尔玫瑰图1 -->
    <div style="height:100vh;width:100%;">
        <div style="font-size: larger;font-weight: bold;color:#58616E;border-bottom:2px solid #EAF0F4; padding:12px 0 12px 20px;">土建</div>
        <div id="leftEchertsTop" style="width:100%;height:46vh;" ref="leftEchertsTop"></div>
        <!-- 南丁格尔玫瑰图2 -->
        <div style="font-size: larger;font-weight: bold;color:#58616E;border-bottom:1px solid #F2F2F2; padding:0px 0 14px 20px ;">电气</div>
        <div id="leftEchertsBottom" style="width:100%;height:54vh;padding-top:2px;" ref="leftEchertsBottom"></div>
    </div>
    
    </div>
		<!-- 升压站施工记录表 -->
    <div class="tabs" style="width: 66%;float: left;margin-left:3%;border-top: 2px solid #EAF0F4;">
			<div style="width:100%;height: 50px;background-color:#F9FAFB;position: relative; border-left: 1px solid #EAF0F4;border-right: 1px solid #EAF0F4;">
					<span style="width:100%;position: absolute;font-size: larger;font-weight: bold;margin-top: 12px;margin-left: 13px;color:#58616E;"> 
							升压站施工记录表
							<span style="position: absolute;right:2%;"><el-button size="mini" @click="submits">提交</el-button></span>
					</span>
			</div>

			<div class="line_wrap">
					<!-- 表头 -->
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
					<!-- 土建部分 -->
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
							<div class="dataone" v-for="(item, index) in civiList" :key="index">
									<div class="dataitem">
									<el-date-picker
											v-model="item.boosterstartDate"
											type="date"
											size="mini"
											class="datachose"
											format="yyyy/MM/dd" 
											value-format="yyyy-MM-dd"
											placeholder="选择日期">
									</el-date-picker>
									</div>
									<div class="dataitem">
									<el-date-picker
											v-model="item.boosterendDate"
											type="date"
											size="mini"
											class="datachose"
											format="yyyy/MM/dd" 
											value-format="yyyy-MM-dd"
											placeholder="选择日期">
									</el-date-picker>
									</div>
							</div>
							</div>
					</div>
					<!-- 电器部分 -->
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
							<!--主变安装-->
							<div class="dataone" v-for="(item, index) in electricList" :key="index">
									<div class="dataitem">
									<el-date-picker
											v-model="item.electricstartDate"
											type="date"
											size="mini"
											class="datachose"
											placeholder="选择日期">
									</el-date-picker>
									</div>
									<div class="dataitem">
									<el-date-picker
											v-model="item.electricendDate"
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

</div>
</template>

<script>
export default {
    data() {
			return {
				birvalue1:10,  //南丁格尔玫瑰图
				birvalue2:20,
				birvalue3:10,
				birvalue4:20,  
				birvalue5:10,
				birvalue6:20,
				
				grappie:'0%',//南丁格尔玫瑰图圆心百分比

				fontId:this.$parent.$parent.$parent.popData.fdProid,
				percent1:5,   //百分比
				percent2:10,
				percent3:20,
				percent4:5,   //百分比
				percent5:10,
				percent6:20,
				percent7:10,
				graptate:'0%',//南丁格尔玫瑰图圆心百分比

				// 升压站施工记录表
				// 土建部分
				civiList:[
						{
						boosterstartDate: '',  // 升压站场平
						boosterendDate: ''
						},
						{
						boosterstartDate: '',  // 主变基础
						boosterendDate: ''
						},
						{
						boosterstartDate: '',  // 电气楼基础
						boosterendDate: ''
						},
						{
						boosterstartDate: '',  // 综合楼基础
						boosterendDate: ''
						},
						{
						boosterstartDate: '',  // SVG基础
						boosterendDate: ''
						},
						{
						boosterstartDate: '',  // 水泵房基础
						boosterendDate: ''
						},
						{
						boosterstartDate: '',  // 事故油地
						boosterendDate: ''
						},
						{
						boosterstartDate: '',  // 架构基础
						boosterendDate: ''
						},
						{
						boosterstartDate: '',  // 围墙基础
						boosterendDate: ''
						},
						{
						boosterstartDate: '',  // 主体结构
						boosterendDate: ''
						},
						{
						boosterstartDate: '',  // 装修
						boosterendDate: ''
						},
						{
						boosterstartDate: '',  // 院墙大门
						boosterendDate: ''
						},
						{
						boosterstartDate: '',  // 站内道路及绿化
						boosterendDate: ''
						}
				],
				// 电器部分
				electricList: [
						{
								electricstartDate: '',  // 主变安装
								electricendDate: ''
						},
						{
								electricstartDate: '',  // SVG安装
								electricendDate: ''
						},
						{
								electricstartDate: '',  // 接地变及场变安装
								electricendDate: ''
						},
						{
								electricstartDate: '',  // GIS安装
								electricendDate: ''
						},
						{
								electricstartDate: '',  // 避雷针安装
								electricendDate: ''
						},
						{
								electricstartDate: '',  // 高压开关柜安装
								electricendDate: ''
						},
						{
								electricstartDate: '',  // 综自保护系统安装
								electricendDate: ''
						}
				]
			}
    },
		methods:{
			// 南丁格尔玫瑰图
			leftEchertsTop(){
				this.optiontop = {
						tooltip : {
								trigger: 'item',
								formatter: "{a} <br/>{b} : {c} ({d}%)"
						},
						legend:[
								{
								type:'plain',//图例多时使用scroll
								itemWidth: 10,
								itemHeight: 10,
								top:'1%',
								x: 'center',
								data:['基础浇筑','主体结构','站内道路及绿化']
								},
								{
								
								itemWidth: 10,
								itemHeight: 10,
								top:'8%',
								x: 'center',
								data:['院墙大门','升压站场平','装修']

								}
					
						],
						calculable : true,
						graphic:{//饼图圆心百分比位置
										type:'text',
										left:'center',
										top:'48%',
										style:{
												text:this.grappie,
												fontSize:12,
												color:"#797979",
										}
						},
						series : [
								{
										center: ['50%', '50%'], // 第一项是横坐标，第二项是纵坐标                 
										type:'pie',
										radius : [30, 100],//第一项是内半径，第二项是外半径
										roseType : 'area',//radius圆心的数据百分比
									
										label : {
												normal : {
														show:true,
														formatter: '{d}%',
														textStyle : {
														fontWeight : 'normal',
														fontSize : 12,
														
														}
												}
										}, 
										data: [
												{value:this.birvalue1, name:'升压站场平',itemStyle:{normal:{color:'#38A2DA'}}},
												{value:this.birvalue2, name:'基础浇筑',itemStyle:{normal:{color:'#33C7E9'}}},
												{value:this.birvalue3, name:'主体结构',itemStyle:{normal:{color:'#9EE6B7'}}},
												{value:this.birvalue4, name:'装修',itemStyle:{normal:{color:'#FFDB5C'}}},
												{value:this.birvalue5, name:'站内道路及绿化',itemStyle:{normal:{color:'#FB7293'}}},
												{value:this.birvalue6, name:'院墙大门',itemStyle:{normal:{color:'#8378FA'}}}
											
										]
								}
						]
				};
			},
			leftEchertsBottom(){
						this.optionbottom = {
						tooltip : {
								trigger: 'item',
								formatter: "{a} <br/>{b} : {c} ({d}%)"
						},
						legend:[
								{
								type:'plain',//图例多时使用scroll
								itemWidth: 10,
								itemHeight: 10,
								top:'1%',
								x: 'center',
								data:['SVG安装','GIS安装','避雷器安装','高压开光柜安装']
								},
								{
								x: 'center',
								itemWidth: 10,
								itemHeight: 10,
								top:'8%',
								data:['主变安装','综自保护系统安装','接地变及场变安装']
								}
					
						],
						calculable : true,
						graphic:{//饼图圆心百分比位置
										type:'text',
										left:'center',
										top:'48%',
										style:{
												text:this.graptate,
												fontSize:12,
												color:"#797979",
										}
						},
						series : [
								{
										center: ['50%', '50%'], // 第一项是横坐标，第二项是纵坐标                 
										type:'pie',
										radius : [30, 100],//第一项是内半径，第二项是外半径
										roseType : 'area',//radius圆心的数据百分比
									
										label : {
												normal : {
														show:true,
														formatter: '{d}%',
														textStyle : {
														fontWeight : 'normal',
														fontSize : 12,
														
														}
												}
										}, 
										data:[
												{value:this.percent1, name:'主变安装',itemStyle:{normal:{color:'#38A2DA'}}},
												{value:this.percent2, name:'SVG安装',itemStyle:{normal:{color:'#33C7E9'}}},
												{value:this.percent3, name:'接地变及场变安装',itemStyle:{normal:{color:'#9EE6B7'}}},
												{value:this.percent4, name:'GIS安装',itemStyle:{normal:{color:'#FFDB5C'}}},
												{value:this.percent5, name:'避雷器安装',itemStyle:{normal:{color:'#FF9F7F'}}},
												{value:this.percent6, name:'综自保护系统安装',itemStyle:{normal:{color:'#FB7293'}}},
												{value:this.percent7, name:'高压开光柜安装',itemStyle:{normal:{color:'#8378FA'}}}
										]
								}
						]
				};
			},
			
			echartsShow1(){
					let leftmyChart = this.$echarts.init(this.$refs['leftEchertsTop']);
					leftmyChart.setOption(this.optiontop);
			},
			echartsShow2(){
					let leftmyChart = this.$echarts.init(this.$refs['leftEchertsBottom']);
					leftmyChart.setOption(this.optionbottom);
			},
			
			pieChart(){        // 土建
					var params={
									fdProid:this.fontId
							}
					this.$http.post('/engineer/tbCollectorzwq/queryCollectorEchartsData', params)
					.then(res => {
								//console.log(res);
							
					}).catch(err => {
					})
			},
			lightingale(){        //电气
					var params={
									// proId:167
									fdProid:this.fontId
							}
					this.$http.post('/engineer/ProgressOverview/barChartModule', params)
					.then(res => {
							// console.log(res.data.data);
							// if(res.data.status == 200){
							//     this.bargraphdata = res.data.data.splitDay; // x轴日期
							//     this.histogram1 = res.data.data.selectVaneHoistingCount;   // 风机吊装
							//     this.histogram2 = res.data.data.selectFoundationPourings;  // 箱变基础
							//     this.histogram3 = res.data.data.selectBoxVariableInstallation;  // 箱变安装
							//     let Dox=res.data.data.averFanNumber; //水平线
							//     if(this.bargraphdata){
							//         for(var i=0;i<this.bargraphdata.length;i++){
							//             this.histogramx.push(Dox);   //水平线
							//         }
							//     }
							// }
					}).catch(err => {
					})
			},

			// 提交
      submits() {
        console.log(this.civiList);  // 土建部分
        console.log(this.electricList); // 电器部分
        // this.$http.post('/engineer/提交')

      }  
		}, 
		mounted(){
				this.pieChart();        //获取南丁玫瑰图数据
				this.leftEchertsTop();
				this.echartsShow1();

				this.lightingale();    //获取南丁玫瑰图数据
				this.leftEchertsBottom();
				this.echartsShow2();

		},

		watch:{
				birvalue1(){
						this.leftEchertsTop();
						this.echartsShow1();
				},
				percent1(){
						this.leftEchertsBottom();
						this.echartsShow2();
				}  
		},

      
} 
</script>
<style scoped lang="less">
.leftEcharts {
    display: flex;
    justify-content: space-between;
}


// 升压站施工记录表
.html, body{
    overflow: auto;
}

.line_wrap{
    font-family: "微软雅黑", Arial, "宋体", verdana;
    .datachose{width:100%;border:0;}
    line-height:30px;
    width: 100%;
    text-align: center;

	// 表头
	.title{
		.colum{width:25%;border:1px solid #ebeef5;height:60px;float:left;border-left:0;  line-height:60px; background: #F9FAFB;}
		.colum1{width:20%;border-left: 1px solid #ebeef5;}
		.colum2{width:30%}
		.colum:last-child{
			border-right:1px solid #ebeef5;width:50%;
			.columtitle{height:30px;line-height: 30px;border-bottom: 1px solid #ebeef5;}
			.data{overflow: hidden;width:100%;
				.dataitem{float:left;border-right:1px solid #ebeef5;width:50%;height:30px;line-height:30px;}
				.dataitem:last-child{border-right: 0;}
			}
		}
	}

	// 土建部分
	.civil_wrap{
		.colum{width:25%;border:1px solid #ebeef5;height:390px;float:left;border-left:0;line-height:390px;border-top:0;}
		.colum1{width:20%; border-left: 1px solid #ebeef5; background: #f5f7fa;}
		.colum2{width:30%;
			.second1{border-bottom:1px solid #ebeef5;height:30px;line-height:30px;background: #f5f7fa;}
			.second2{
				.title{float:left;width:25%;height:240px;line-height:240px;border-right:1px solid #ebeef5;border-bottom:1px solid #ebeef5;background: #f5f7fa;}
				.second2_wrap{float:left;width:75%;height:240px;line-height:240px;border-bottom:1px solid #ebeef5;background: #f5f7fa;}
				.second2_wrap_item{height:30px;line-height:30px;border-bottom:1px solid #ebeef5;background: #f5f7fa;}
			}
			.second3{clear: both;border-bottom:1px solid #ebeef5;height:30px;line-height:30px;background: #f5f7fa;}
		}
		.colum:last-child{
			border-right:1px solid #ebeef5;width:50%;
			.dataone{overflow: hidden;width:100%;
				.dataitem{float:left;border-right:1px solid #ebeef5;width:50%;height:30px;line-height:30px;border-bottom:1px solid #ebeef5;}
				.dataitem:last-child{border-right: 0;}
			}
		}
	}


	// 电器部分
	.ele_wrap{clear: both;
		.colum{width:25%;border:1px solid #ebeef5;height:210px;float:left;border-left:0;line-height:210px;border-top:0;}
		.colum1{width:20%; border-left: 1px solid #ebeef5;background: #f5f7fa;}
		.colum2{width:30%;background: #f5f7fa;
			.second1{border-bottom:1px solid #ebeef5;height:30px;line-height:30px;}
		}
		.colum:last-child{
			border-right:1px solid #ebeef5;width:50%;
			.dataone{overflow: hidden;width:100%;
				.dataitem{float:left;border-right:1px solid #ebeef5;width:50%;height:30px;line-height:30px;border-bottom:1px solid #ebeef5;}
				.dataitem:last-child{border-right: 0;}
			}
		}
	}




}
</style>
