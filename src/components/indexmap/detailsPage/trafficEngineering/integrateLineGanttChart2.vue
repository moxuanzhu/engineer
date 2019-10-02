<template>
<div class="integrateLineGanttChart2">
  <div class="title">
    <span> 
      集电线路工程日历及工期甘特图分析表
    </span>
  </div>
  <div style="height: 40px;width: 100%;">
    <div style="height: 40px;width: 49%;float: left;text-align: left;">
      <span style="    font-size: larger;margin-top: 12px;display: block;margin-left: 10px;">
        所填工程量为道路施工
      </span>
    </div>
    <div style="height: 40px;width: 49%;float: left;text-align: right;font-size:larger;">
      <input type="button" style="background-color: #C0C0C0;" class="myCicle"/>
      已作废计划
      <input type="button" style="background-color: #E5ECF9;" class="myCicle"/>
      进行计划
      <input type="button" style="background-color: #32A4FD;" class="myCicle"/>
      提前
      <input type="button" style="background-color: #91D050;" class="myCicle"/>
      正常
      <input type="button" style="background-color: #FC5536;" class="myCicle"/>
      滞后
      <input type="button" style="background-color: #FFC327;" class="myCicle"/>
      预警
    </div>
  </div>
  <div class="gantt">
    <el-table
      :data="ganttData"
      :header-cell-style="{textAlign:'center'}"
      height="450"
      ref="dataTable"
      style="width: 100%">
      <el-table-column
        fixed
        prop="fistClum"
        label=""
        width="150">
      </el-table-column>
      <el-table-column  v-for="(item,index) in othersClum"   :key="index" :label="item.firstLable">
        <el-table-column
          v-for="(item1,index1) in item.chrildren"
          :key="index1"
          :label="item1.clumlable"
          width="120">
          <template slot-scope="scope">
            <div  v-if="scope.row.othersClum[index].chrildren[index1].colorNum == '0'" :id="'f'+scope.$index+'s'+index+'t'+index1" style="background-color: #C0C0C0;position: relative;height: 30px;">
              <span class="title_black">{{scope.row.othersClum[index].chrildren[index1].value}}</span>
            </div>
            <div v-if="scope.row.othersClum[index].chrildren[index1].colorNum == '1'" :id="'f'+scope.$index+'s'+index+'t'+index1"  style="background-color: #E5ECF9;position: relative;height: 30px;">
              <span class="title_black">{{scope.row.othersClum[index].chrildren[index1].value}}</span>
            </div>
            <el-popover v-if="scope.row.othersClum[index].chrildren[index1].colorNum=='2'" placement="top-start" trigger="hover" :content="scope.row.othersClum[index].chrildren[index1].showText">
              <div  slot="reference" :id="'f'+scope.$index+'s'+index+'t'+index1" style="background-color: #32A4FD;position: relative;height: 30px;">
                <span class="title_white">{{scope.row.othersClum[index].chrildren[index1].value}}</span>
              </div>
            </el-popover>

            <el-popover v-if="scope.row.othersClum[index].chrildren[index1].colorNum=='3'" placement="top-start"   trigger="hover" :content="scope.row.othersClum[index].chrildren[index1].showText">
            <div  slot="reference" :id="'f'+scope.$index+'s'+index+'t'+index1" style="background-color: #91D050;position: relative;height: 30px;">
              <span class="title_white">{{scope.row.othersClum[index].chrildren[index1].value}}</span>
            </div>
            </el-popover>
            <el-popover v-if="scope.row.othersClum[index].chrildren[index1].colorNum=='4'" placement="top-start"   trigger="hover" :content="scope.row.othersClum[index].chrildren[index1].showText">
            <div  slot="reference" :id="'f'+scope.$index+'s'+index+'t'+index1" style="background-color: #FC5536;position: relative;height: 30px;">
              <span class="title_white">{{scope.row.othersClum[index].chrildren[index1].value}}</span>
            </div>
            </el-popover>
            <el-popover v-if="scope.row.othersClum[index].chrildren[index1].colorNum=='5'" placement="top-start"   trigger="hover" :content="scope.row.othersClum[index].chrildren[index1].showText">
            <div  slot="reference" :id="'f'+scope.$index+'s'+index+'t'+index1" style="background-color: #FFC327;position: relative;height: 30px;">
              <span class="title_white">{{scope.row.othersClum[index].chrildren[index1].value}}</span>
            </div>
            </el-popover>
            <div v-if="scope.row.othersClum[index].chrildren[index1].colorNum=='6' && scope.row.type !='plan'" :id="'f'+scope.$index+'s'+index+'t'+index1"  style="position: relative;height: 30px;">
              <span class="title_white">{{scope.row.othersClum[index].chrildren[index1].value}}</span>
            </div>
          </template>
        </el-table-column>
      </el-table-column>
    </el-table>
  </div>
  <div>
    <gantt-chart-model v-if="ganttChartModelAttr.showModel"></gantt-chart-model>
  </div>
</div>
</template>

<script>
  import ganttChartModel from '@/components/indexmap/detailsPage/trafficEngineering/models/ganttChartModel';
  import { format, timestamps } from '../../../../utils'

    export default {
      components: {
        "gantt-chart-model":ganttChartModel,
      },
        data() {
          console.log()
            return {
              fdProid: this.$parent.$parent.$parent.activeName,
              fdStageName: JSON.parse(this.$route.query.mapData).fdProid,
              ganttChartModelAttr:{
                showModel:false,
                title:"原因记录",
                yearMonthDate:"",
                fdStageid: '',
                fdProid:'',
                fdWorkid:""
              },
              othersClum:[],
              ganttData:[],
            };
        },
        methods: {
          chengenum(item,item1,item2){
            let _this=this;
            var time = item.row.othersClum[item1].firstLable + '-' + item.column.label
            if (time == format(new Date().getTime(), 'yyyy-mm-dd')) {
              this.prompt('此时间段不可编辑', 'warning')
              return
            }
            var id='f'+item.$index+'s'+item1+'t'+item2;
            if(!document.getElementById("input"+id)){
              var obj=document.getElementById(id);
              obj.innerHTML="";
              var input=document.createElement("input");
              input.setAttribute("type","text");
              input.setAttribute("id","input"+id);
              //input.setAttribute("autofocus","autofocus");
              input.value=this.ganttData[item.$index].othersClum[item1].chrildren[item2].value;
              input.style.width="100%";
              input.style.height="100%";
              input.style.backgroundColor="inherit";
              input.style.border="0px";
              input.style.color="white";

              var inputid="input"+id;
              setTimeout(function () {
                document.getElementById(inputid).focus();
              },10);
              $('#'+id).on('blur','#'+inputid,function () {
                _this.chengenum1(item,item1,item2);
              });
              obj.appendChild(input);
            }
          },
          chengenum1(item,item1,item2){
            let _this=this;
            var id='f'+item.$index+'s'+item1+'t'+item2;
            var inputid="input"+id;
            if(document.getElementById(inputid)){
              var obj=document.getElementById(id);
              var inputValue=document.getElementById(inputid).value;
              this.ganttData[item.$index].othersClum[item1].chrildren[item2].value=inputValue;
              obj.innerHTM="";
              obj.innerHTML="<span style='margin-top: 4px; position: absolute;color: white;'>"+inputValue+"</span>";
              if(inputValue ){
                var date=this.ganttData[item.$index].othersClum[item1].firstLable+ "-"+(parseInt(this.ganttData[item.$index].othersClum[item1].chrildren[item2].clumlable)>9? this.ganttData[item.$index].othersClum[item1].chrildren[item2].clumlable:"0"+ this.ganttData[item.$index].othersClum[item1].chrildren[item2].clumlable);
                var param={
                  fdStageid:this.$parent.$parent.$parent.activeName,
                  //fdProid:this.$parent.$parent.$parent.popData.fdProid,
                  fdProid:167,
                  //fdScheduleid: this.ganttData[item.$index].othersClum[item1].chrildren[item2].fdScheduleid,
                  fdRoadType:this.ganttData[item.$index].fdRoadType,
                  yearMonthDate:date,
                  fdWorkload:inputValue,
                  fdGisData:"",
                  fdWorkid:this.ganttData[item.$index].othersClum[item1].chrildren[item2].id
                };
                this.$http.post('/engineer/insertRoadPresentation', param)
                  .then(res => {
                    if(res.data.status==200){
                      _this.$notify({
                        title: '成功',
                        message: '保存成功',
                        type: 'success'
                      });
                      _this.getGanntDataList();
                    }else{
                      _this.$notify.error({
                        title: '错误',
                        message: '保存失败'
                      });
                    }
                  }).catch(err => {
                  _this.$notify.error({
                    title: '错误',
                    message: '保存失败'
                  });
                  console.log("数据请求失败")
                })
              }
              if( inputValue=="0"){
                this.ganttChartModelAttr.showModel=true;
                this.ganttChartModelAttr.yearMonthDate=this.ganttData[item.$index].othersClum[item1].firstLable+"-"+this.ganttData[item.$index].othersClum[item1].chrildren[item2].clumlable;
                this.ganttChartModelAttr.fdStageid=this.$parent.$parent.$parent.activeName;
                this.ganttChartModelAttr.fdProid=this.$parent.$parent.$parent.popData.fdProid;
                this.ganttChartModelAttr.fdWorkid=this.ganttData[item.$index].othersClum[item1].chrildren[item2].id;
              }
            }
          },
          constructData(startDate,endDate){
            var monthList=this.getMonthList(startDate,endDate);//根据起止日期计算月份
            console.log(monthList);
            var othersClum=[];
            for(var i=0;i<monthList.length;i++){
              var json=monthList[i];
              var iDays=this.getDateDiff(json.startD,json.endD);
              var startDay=parseInt(json.startD.split("-")[2]);
              var chrildren=[];
              for(var j=0;j<=iDays;j++){
                var dayJson={
                  clumlable:startDay+"",
                  value:"",
                  colorNum:"6",
                  showText:""
                };
                chrildren.push(dayJson);
                startDay+=1;
              }
              var monthJson={
                firstLable:json.firstLable,
                chrildren:chrildren
              };
              othersClum.push(monthJson);
            }
            var rowJson={
              fistClum:"计划工期一",
              othersClum:othersClum
            };
            console.log(rowJson);
            return rowJson;
          },
          getMonthList(startDate,endDate){
            startDate = startDate.split("-");
            endDate = endDate.split("-");
            //获取年,月数
            var year1 = parseInt(startDate[0]) ,
              month1 = parseInt(startDate[1]) ,
              date1 = parseInt(startDate[2]) ,
              year2 = parseInt(endDate[0]) ,
              month2 = parseInt(endDate[1]) ,
              date2 = parseInt(endDate[2]) ,
              //通过年,月差计算月份差
              months = (year2 - year1) * 12 + (month2-month1) + 1;
              var yearAndMonthList=[];
              for(var i=0;i<months;i++){
                var yearAndMonth={firstLable:"",startD:"",endD:""};
                if(months==1){
                  yearAndMonth.firstLable=year1+"-"+(month1>9?month1:"0"+month1);
                  yearAndMonth.startD=year1+"-"+(month1>9?month1:"0"+month1)+"-"+(date1>9?date1:"0"+date1);
                  yearAndMonth.endD=year1+"-"+(month1>9?month1:"0"+month1)+"-"+(date2>9?date2:"0"+date2);
                }else if(i==0){
                  yearAndMonth.firstLable=year1+"-"+(month1>9?month1:"0"+month1);
                  yearAndMonth.startD=year1+"-"+(month1>9?month1:"0"+month1)+"-"+(date1>9?date1:"0"+date1);
                  var days=this.getDateByMonth(year1,month1);
                  yearAndMonth.endD=year1+"-"+(month1>9?month1:"0"+month1)+"-"+days;
                }else if(i==months-1){
                  yearAndMonth.firstLable=year1+"-"+(month1>9?month1:"0"+month1);
                  yearAndMonth.startD=year1+"-"+(month1>9?month1:"0"+month1)+"-01";
                 // var days=this.getDateByMonth(year1,month1);
                  yearAndMonth.endD=year1+"-"+(month1>9?month1:"0"+month1)+"-"+(date2>9?date2:"0"+date2);
                }else{
                  yearAndMonth.firstLable=year1+"-"+(month1>9?month1:"0"+month1);
                  yearAndMonth.startD=year1+"-"+(month1>9?month1:"0"+month1)+"-01";
                  var days=this.getDateByMonth(year1,month1);
                  yearAndMonth.endD=year1+"-"+(month1>9?month1:"0"+month1)+"-"+days;
                }
                yearAndMonthList.push(yearAndMonth);
                month1+=1;
                if(month1>12){
                  year1+=1;
                  month1=1;
                }
              }
              return yearAndMonthList;
          },
          getDateDiff(sDate1,  sDate2){
            var  aDate,  oDate1,  oDate2,  iDays
            aDate  =  sDate1.split("-")
            oDate1  =  new  Date(aDate[1]  +  '-'  +  aDate[2]  +  '-'  +  aDate[0])    //转换为12-18-2006格式
            aDate  =  sDate2.split("-")
            oDate2  =  new  Date(aDate[1]  +  '-'  +  aDate[2]  +  '-'  +  aDate[0])
            iDays  =  parseInt(Math.abs(oDate1  -  oDate2)  /  1000  /  60  /  60  /24)    //把相差的毫秒数转换为天数
            return iDays;
          },
          getDateByMonth(year,month){
            month = parseInt(month,10);  //parseInt(number,type)这个函数后面如果不跟第2个参数来表示进制的话，默认是10进制。
            var temp = new Date(year,month,0);
            return temp.getDate();
          },
          putData(data,box){
            var ganttD=[];
            if(data.length==0){
              return ganttD;
            }
            for(var i=0;i<data.length;i++){
              if(data[i].type==="plan"){
                var rowData=this.putPlanData(data[i],JSON.parse(JSON.stringify(box)));
                ganttD.push(rowData);
              }else{
                var rowData=this.putPracticalData(data[i],JSON.parse(JSON.stringify(box)));
                ganttD.push(rowData);
              }
            }
            return ganttD;
          },
          putPlanData(data,box){
            box.fistClum=data.name;
            box.type=data.type;
            for(var i=0;i<box.othersClum.length;i++){
              var json=box.othersClum[i];
              for(var j=0;j<box.othersClum[i].chrildren.length;j++){
                var iDate=box.othersClum[i].firstLable+"-"+(parseInt(box.othersClum[i].chrildren[j].clumlable)>9?box.othersClum[i].chrildren[j].clumlable:"0"+box.othersClum[i].chrildren[j].clumlable);

                for(var k=0;k<data.times.length;k++){
                  data.times[k].startDate = format(data.times[k].fdPlanStartTime, 'yyyy-mm-dd')
                  data.times[k].endDate = format(data.times[k].fdPlanEndTime, 'yyyy-mm-dd')
                  if(data.status){//进行中
                    if(data.times[k].startDate==iDate){
                      box.othersClum[i].chrildren[j].value="进行中";
                      box.othersClum[i].chrildren[j].colorNum="1";
                    }else if(timestamps(iDate) > timestamps(data.times[k].startDate) && timestamps(iDate) <= timestamps(data.times[k].endDate)){
                      box.othersClum[i].chrildren[j].colorNum="1";
                    }
                  }else{//已作废
                    if(data.times[k].startDate==iDate){
                      box.othersClum[i].chrildren[j].value="已作废";
                      box.othersClum[i].chrildren[j].colorNum="0";
                    }else if(timestamps(iDate) > timestamps(data.times[k].startDate) && timestamps(iDate) <= timestamps(data.times[k].endDate)){
                      box.othersClum[i].chrildren[j].colorNum="0";
                    }

                  }
                }


              }
            }
            return box;
          },
          putPracticalData(data,box){
            box.fistClum=data.number+"("+data.line+")";
            box.type=data.type;
            if(data.type=="work"){
              for(var i=0;i<box.othersClum.length;i++){
                var json=box.othersClum[i];
                for(var j=0;j<box.othersClum[i].chrildren.length;j++){
                  var iDate=box.othersClum[i].firstLable+"-"+(parseInt(box.othersClum[i].chrildren[j].clumlable)>9?box.othersClum[i].chrildren[j].clumlable:"0"+box.othersClum[i].chrildren[j].clumlable);
                  //data.startDate= new Date(data.fdPlanStartTime ).getFullYear()+"-"+(new Date(data.fdPlanStartTime ).getMonth() + 1>9?new Date(data.fdPlanStartTime ).getMonth() + 1:"0"+(new Date(data.fdPlanStartTime ).getMonth() + 1))+"-"+(new Date(data.fdPlanStartTime ).getDate()>9?new Date(data.fdPlanStartTime ).getDate():"0"+new Date(data.fdPlanStartTime ).getDate());
                  // data.endDate=new Date(data.fdPlanEndTime).getFullYear()+"-"+(new Date(data.fdPlanEndTime).getMonth() + 1>9?new Date(data.fdPlanEndTime).getMonth() + 1:"0"+(new Date(data.fdPlanEndTime).getMonth() + 1))+"-"+(new Date(data.fdPlanEndTime).getDate()>9?new Date(data.fdPlanEndTime).getDate():"0"+new Date(data.fdPlanEndTime ).getDate());
                  if(timestamps(iDate) >= timestamps(data.startDate) && timestamps(iDate) <= timestamps(data.endDate)){
                    box.othersClum[i].chrildren[j].colorNum="3";
                    box.othersClum[i].chrildren[j].showText="正常进行"+data.normal+"天";
                  }
                }
              }
            }

            return box;
          },
          getStartAndEndTime(data){
            var json={startDate:"",endDate:""};
            for(var i=0;i<data.length;i++){
              if(data[i].type=="plan"){
                for(var j=0;j<data[i].times.length;j++){
                  data[i].times[j].startDate = format(data[i].times[j].fdPlanStartTime, 'yyyy-mm-dd')
                  data[i].times[j].endDate = format(data[i].times[j].fdPlanEndTime, 'yyyy-mm-dd')
                  if(!json.startDate || timestamps(json.startDate) > timestamps(data[i].times[j].startDate)){
                    json.startDate=data[i].times[j].startDate;
                  }
                  if(!json.endDate || timestamps(json.endDate) < timestamps(data[i].times[j].endDate)){
                    json.endDate=data[i].times[j].endDate;
                  }
                }
              }
            }
            return json;
          },
          getMinDate(data){
            var date="";
            for(var i=0;i<data.length;i++){
              if(!date || new Date(date).getTime() > new Date(data[i].yearMonthDate).getTime()){
                date=data[i].yearMonthDate;
              }
            }
            return date;
          },
          getMaxDate(data){
            var date="";
            for(var i=0;i<data.length;i++){
              if(!date || new Date(date).getTime() < new Date(data[i].yearMonthDate).getTime()){
                date=data[i].yearMonthDate;
              }
            }
            return date;
          },
          putShowText(data){
            for(var i=0;i<data.length;i++){
              if(data[i].type=="work"){
                let startDate = format(data[i].startDate, 'yyyy-mm-dd')
                let endDate = format(data[i].endDate, 'yyyy-mm-dd')
                //进行少天
                var normal=this.getDateDiff(startDate,endDate);
                data[i].normal=normal+1;
              }
            }
            return data;
          },
          getGanntDataList(){
            var _this=this;
            // this.$http.post('/engineer/getCollectorAnalyzeGanttChart', {fdStageName: '5',fdProid: '171'})
            this.$http.post('/engineer/getCollectorAnalyzeGanttChart', {fdStageName: _this.fdStageName, fdProid: _this.fdProid})
              .then(res => {
                //获取后台给出的数据中最早的开始时间和最晚的结束时间
                var planList=res.data.data[0].planData;
                var dataList=res.data.data[0].date;
                var json=_this.getStartAndEndTime(planList);
                //开始时间提前五天
                let today = timestamps(json.startDate) - 1000 * 60 * 60 * 24 * 5
                json.startDate = format(today, 'yyyy-mm-dd')
                //结束时间延迟5天
                let today1 = timestamps(json.endDate) + 1000 * 60 * 60 * 24 * 5
                json.endDate = format(today1, 'yyyy-mm-dd')
                //根据起止时间构造二维表数据结构
                var box=_this.constructData( json.startDate, json.endDate);
                console.log(box)
                //根据后台数据计算每个表格的提示信息
                var data=_this.putShowText(dataList);
                planList.push({number:"风机编号",line:"所属线路",type:"workHeader"});
                for(var i=0;i<data.length;i++){
                  planList.push(data[i]);
                }
                //将后台数据根据日期填入上面生成的二维表数据结构中
                _this.ganttData=_this.putData(planList,box);
                //构造二维表动态表头
                _this.othersClum=JSON.parse(JSON.stringify(_this.ganttData.length==0?box.othersClum:_this.ganttData[0].othersClum));
                console.log(_this.ganttData);
              }).catch(err => {
              console.log("数据请求失败")
            })
          },
        },
      created(){
        this.getGanntDataList();
      }
    }
</script>

<style lang='less'>
  .integrateLineGanttChart2{
    width: 99%;
    height: 100%;
    border: 1px solid #EAF0F4;
    .title{
      height: 50px;
      background-color:#F9FAFB;
      position: relative;
    }
    .title span{
      position: absolute;
      font-size: larger;
      font-weight: bold;
      margin-top: 12px;
      margin-left: 13px;
    }
    .bacColor317eb0{
      background: #317eb0;
    }
    .title_black{
      margin-top: 4px; 
      position: absolute;
      color: black
    }
    .title_white{
      margin-top: 4px; 
      position: absolute;
      color: white
    }
    .el-table .cell {
      padding-left: 0px ;
      padding-right: 0px ;
    }

    .el-table td {
      padding:0px;
      height: 30px;
    }
    .myCicle{
      width: 12px;
      height: 12px;
      border: 0px;
      border-radius: 50%;
      margin-top: 12px;
    }
  }
</style>
