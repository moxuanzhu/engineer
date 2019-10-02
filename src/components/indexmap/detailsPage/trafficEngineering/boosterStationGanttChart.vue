<template>
<div style="width: 99%;height: 100%;border: 1px solid #EAF0F4;">
  <div style="height: 50px;background-color:#F9FAFB;position: relative; ">
    <span style="position: absolute;font-size: larger;font-weight: bold;margin-top: 12px;margin-left: 13px;"> 工程量与工期甘特图</span>
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
      height="350"
      :header-cell-style="{textAlign:'center'}"
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
              <span style="margin-top: 4px; position: absolute;color: black;">{{scope.row.othersClum[index].chrildren[index1].value}}</span>
            </div>
            <div v-if="scope.row.othersClum[index].chrildren[index1].colorNum == '1'" :id="'f'+scope.$index+'s'+index+'t'+index1"  style="background-color: #E5ECF9;position: relative;height: 30px;">
              <span style="margin-top: 4px; position: absolute;color: black;">{{scope.row.othersClum[index].chrildren[index1].value}}</span>
            </div>
            <el-popover v-if="scope.row.othersClum[index].chrildren[index1].colorNum=='2'" placement="top-start" trigger="hover" :content="scope.row.othersClum[index].chrildren[index1].showText">
              <div  slot="reference" :id="'f'+scope.$index+'s'+index+'t'+index1" @click="chengenum(scope,index,index1)" style="background-color: #32A4FD;position: relative;height: 30px;">
                <span style="margin-top: 4px; position: absolute;color: white;">{{scope.row.othersClum[index].chrildren[index1].value}}</span>
              </div>
            </el-popover>

            <el-popover v-if="scope.row.othersClum[index].chrildren[index1].colorNum=='3'" placement="top-start"   trigger="hover" :content="scope.row.othersClum[index].chrildren[index1].showText">
            <div  slot="reference" :id="'f'+scope.$index+'s'+index+'t'+index1" @click="chengenum(scope,index,index1)" style="background-color: #91D050;position: relative;height: 30px;">
              <span style="margin-top: 4px; position: absolute;color: white;">{{scope.row.othersClum[index].chrildren[index1].value}}</span>
            </div>
            </el-popover>
            <el-popover v-if="scope.row.othersClum[index].chrildren[index1].colorNum=='4'" placement="top-start"   trigger="hover" :content="scope.row.othersClum[index].chrildren[index1].showText">
            <div  slot="reference" :id="'f'+scope.$index+'s'+index+'t'+index1" @click="chengenum(scope,index,index1)" style="background-color: #FC5536;position: relative;height: 30px;">
              <span style="margin-top: 4px; position: absolute;color: white;">{{scope.row.othersClum[index].chrildren[index1].value}}</span>
            </div>
            </el-popover>
            <el-popover v-if="scope.row.othersClum[index].chrildren[index1].colorNum=='5'" placement="top-start"   trigger="hover" :content="scope.row.othersClum[index].chrildren[index1].showText">
            <div  slot="reference" :id="'f'+scope.$index+'s'+index+'t'+index1" @click="chengenum(scope,index,index1)" style="background-color: #FFC327;position: relative;height: 30px;">
              <span style="margin-top: 4px; position: absolute;color: white;">{{scope.row.othersClum[index].chrildren[index1].value}}</span>
            </div>
            </el-popover>
            <div v-if="scope.row.othersClum[index].chrildren[index1].colorNum=='6' && scope.row.type !='plan'" @click="chengenum(scope,index,index1)" :id="'f'+scope.$index+'s'+index+'t'+index1"  style="position: relative;height: 30px;">
              <span style="margin-top: 4px; position: absolute;color: white;">{{scope.row.othersClum[index].chrildren[index1].value}}</span>
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
            return {
              ganttChartModelAttr:{
                showModel:false,
                title:"原因记录",
                yearMonthDate:"",
                fdStageid:"",
                fdProid:"",
                fdWorkid:""
              },
              othersClum:[],
              ganttData:[],
            };
        },
        methods: {
          chengenum(item,item1,item2){
            let _this=this;
           /* var editorTime = item.row.othersClum[item1].firstLable + '-' + item.column.label
            if (editorTime !== format(new Date().getTime(), 'yyyy-mm-dd')) {
              this.prompt('只能编辑当天数据', 'warning')
              return
            }*/
            var id='f'+item.$index+'s'+item1+'t'+item2;
            if(!document.getElementById("input"+id) && this.ganttData[item.$index].valType !="0"){
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
              input.style.color="black";

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
              if(this.ganttData[item.$index].valType=="1"){
                var val=inputValue.replace(/[^1-9]/g,'')
                if(inputValue !=val){
                  _this.$notify.error({
                    title: '错误',
                    message: '输入值非法,只能是正整数'
                  });
                  return;
                }
              }
              var inp = inputValue.substr(0, 2)
              var inv = inputValue.replace(/[^\d.]/g,"")
              if(inv == inputValue && inp !=='00'){
              var inputValue = inputValue.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3')
               var date=this.ganttData[item.$index].othersClum[item1].firstLable+ "-"+(parseInt(this.ganttData[item.$index].othersClum[item1].chrildren[item2].clumlable)>9? this.ganttData[item.$index].othersClum[item1].chrildren[item2].clumlable:"0"+ this.ganttData[item.$index].othersClum[item1].chrildren[item2].clumlable);
                var param={
                  fdStageid:this.$parent.$parent.$parent.activeName,
                  fdProid:this.$parent.$parent.$parent.popData.fdProid,
                  //fdProid:168,
                  //fdScheduleid: this.ganttData[item.$index].othersClum[item1].chrildren[item2].fdScheduleid,
                  //fdRoadType:this.ganttData[item.$index].fdRoadType,
                  yearMonthDate:date,
                  fdWorkload:inputValue,
                  //fdGisData:"",
                  fdWorkid:this.ganttData[item.$index].othersClum[item1].chrildren[item2].id
                };
                if(this.ganttData[item.$index].valType=="3"){
                  param.fdBuryingId=this.ganttData[item.$index].othersClum[item1].chrildren[item2].id;
                  param.fdBurying=inputValue;
                }else if(this.ganttData[item.$index].valType=="4"){
                  param.fdOverheadLineId=this.ganttData[item.$index].othersClum[item1].chrildren[item2].id;
                  param.fdOverheadLine=inputValue;
                }else if(this.ganttData[item.$index].valType=="1"){
                  param.fdPagodaArrivalId=this.ganttData[item.$index].othersClum[item1].chrildren[item2].id;
                  param.fdPagodaArrival=inputValue;
                }else if(this.ganttData[item.$index].valType=="2"){
                  param.fdTightenLineId=this.ganttData[item.$index].othersClum[item1].chrildren[item2].id;
                  param.fdTightenLine=inputValue;
                }
                this.$http.post('/engineer/insertGanttChartInput', param)
                  .then(res => {
                    console.log(res,'resss')
                    if(res.data.status==200 ){
                      if(res.data.data.success){
                        _this.$notify({
                          title: '成功',
                          message: res.data.data.success,
                          type:  'success'
                        });
                      }else if(res.data.data.Error){
                        _this.$notify.error({
                          title: '错误',
                          message: res.data.data.Error
                        });
                      }
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
              }else if(inputValue !== ''){
                _this.$notify.error({
                  title: '错误',
                  message: '输入值非法,只能是数字'
                });
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
                  data.times[k].startDate= new Date(data.times[k].fdPlanStartTime ).getFullYear()+"-"+(new Date(data.times[k].fdPlanStartTime ).getMonth() + 1>9?new Date(data.times[k].fdPlanStartTime ).getMonth() + 1:"0"+(new Date(data.times[k].fdPlanStartTime ).getMonth() + 1))+"-"+(new Date(data.times[k].fdPlanStartTime ).getDate()>9?new Date(data.times[k].fdPlanStartTime ).getDate():"0"+new Date(data.times[k].fdPlanStartTime ).getDate());
                  data.times[k].endDate=new Date(data.times[k].fdPlanEndTime).getFullYear()+"-"+(new Date(data.times[k].fdPlanEndTime).getMonth() + 1>9?new Date(data.times[k].fdPlanEndTime).getMonth() + 1:"0"+(new Date(data.times[k].fdPlanEndTime).getMonth() + 1))+"-"+(new Date(data.times[k].fdPlanEndTime).getDate()>9?new Date(data.times[k].fdPlanEndTime).getDate():"0"+new Date(data.times[k].fdPlanEndTime ).getDate());
                  if(data.status){//进行中
                    if(data.times[k].startDate==iDate){
                      box.othersClum[i].chrildren[j].value="进行中";
                      box.othersClum[i].chrildren[j].colorNum="1";
                    }else if(new Date(iDate).getTime()>new Date(data.times[k].startDate).getTime() && new Date(iDate).getTime()<=new Date(data.times[k].endDate).getTime()){
                      box.othersClum[i].chrildren[j].colorNum="1";
                    }
                  }else{//已作废
                    if(data.times[k].startDate==iDate){
                      box.othersClum[i].chrildren[j].value="已作废";
                      box.othersClum[i].chrildren[j].colorNum="0";
                    }else if(new Date(iDate).getTime()>new Date(data.times[k].startDate).getTime() && new Date(iDate).getTime()<=new Date(data.times[k].endDate).getTime()){
                      box.othersClum[i].chrildren[j].colorNum="0";
                    }

                  }
                }


              }
            }
            return box;
          },
          putPracticalData(data,box){
            box.fistClum=data.name;
            if(data.valType){
              box.valType=data.valType;
            }else{
              box.valType="0";
            }
            box.type=data.type;
            box.fdRoadType=data.fdRoadType;
              for(var j=0;j<box.othersClum.length;j++){
                for(var k=0;k<box.othersClum[j].chrildren.length;k++){
                  var iDate=box.othersClum[j].firstLable+"-"+(parseInt(box.othersClum[j].chrildren[k].clumlable)>9?box.othersClum[j].chrildren[k].clumlable:"0"+box.othersClum[j].chrildren[k].clumlable);

                  for(var z=0;z<data.works.length;z++){

                    for(var i=0;i<data.works[z].dataList.length;i++){
                      var dayD=data.works[z];
                      dayD.startDate=new Date(dayD.startDate).getFullYear()+"-"+(new Date(dayD.startDate).getMonth() + 1>9?new Date(dayD.startDate).getMonth() + 1:"0"+(new Date(dayD.startDate).getMonth() + 1))+"-"+(new Date(dayD.startDate).getDate()>9?new Date(dayD.startDate).getDate():"0"+new Date(dayD.startDate).getDate());
                      dayD.endDate=new Date(dayD.endDate).getFullYear()+"-"+(new Date(dayD.endDate).getMonth() + 1>9?new Date(dayD.endDate).getMonth() + 1:"0"+(new Date(dayD.endDate).getMonth() + 1))+"-"+(new Date(dayD.endDate).getDate()>9?new Date(dayD.endDate).getDate():"0"+new Date(dayD.endDate).getDate());
                      var dayDate=""
                      if(dayD.dataList[i].fdFoundationExcavationDate){
                        dayDate=dayD.dataList[i].fdFoundationExcavationDate;
                        if(dayDate==iDate){
                          box.othersClum[j].chrildren[k].value=dayD.dataList[i].fdTowerNumber;
                          //box.othersClum[j].chrildren[k].id=dayD.dataList[i].fdWorkid;
                          box.othersClum[j].chrildren[k].fdScheduleid=dayD.fdScheduleid;
                        }
                      }else if(dayD.dataList[i].fdFoundationPouringDate){
                        dayDate=dayD.dataList[i].fdFoundationPouringDate;
                        if(dayDate==iDate){
                          box.othersClum[j].chrildren[k].value=dayD.dataList[i].fdTowerNumber;
                          //box.othersClum[j].chrildren[k].id=dayD.dataList[i].fdWorkid;
                          box.othersClum[j].chrildren[k].fdScheduleid=dayD.fdScheduleid;
                        }
                      }else if(dayD.dataList[i].fdPagodaDate){
                        dayDate=dayD.dataList[i].fdPagodaDate;
                        if(dayDate==iDate){
                          box.othersClum[j].chrildren[k].value=dayD.dataList[i].fdTowerNumber;
                         // box.othersClum[j].chrildren[k].id=dayD.dataList[i].fdWorkid;
                          box.othersClum[j].chrildren[k].fdScheduleid=dayD.fdScheduleid;
                        }
                      }else if(dayD.dataList[i].fdBuryingDate){
                        dayDate=dayD.dataList[i].fdBuryingDate;
                        if(dayDate==iDate){
                          box.othersClum[j].chrildren[k].value=dayD.dataList[i].fdBurying;
                          box.othersClum[j].chrildren[k].id=dayD.dataList[i].fdBuryingId;
                          box.othersClum[j].chrildren[k].fdScheduleid=dayD.fdScheduleid;
                        }
                      }else if(dayD.dataList[i].fdOverheadLineDate){
                        dayDate=dayD.dataList[i].fdOverheadLineDate;
                        if(dayDate==iDate){
                          box.othersClum[j].chrildren[k].value=dayD.dataList[i].fdOverheadLine;
                          box.othersClum[j].chrildren[k].id=dayD.dataList[i].fdOverheadLineId;
                          box.othersClum[j].chrildren[k].fdScheduleid=dayD.fdScheduleid;
                        }
                      }else if(dayD.dataList[i].fdPagodaArrivalDate){
                        dayDate=dayD.dataList[i].fdPagodaArrivalDate;
                        if(dayDate==iDate){
                          box.othersClum[j].chrildren[k].value=dayD.dataList[i].fdPagodaArrival;
                          box.othersClum[j].chrildren[k].id=dayD.dataList[i].fdPagodaArrivalId;
                          box.othersClum[j].chrildren[k].fdScheduleid=dayD.fdScheduleid;
                        }
                      }else if(dayD.dataList[i].fdTightenLineDate){
                        dayDate=dayD.dataList[i].fdTightenLineDate;
                        if(dayDate==iDate){
                          box.othersClum[j].chrildren[k].value=dayD.dataList[i].fdTightenLine;
                          box.othersClum[j].chrildren[k].id=dayD.dataList[i].fdTightenLineId;
                          box.othersClum[j].chrildren[k].fdScheduleid=dayD.fdScheduleid;
                        }
                      }


                      if(new Date(iDate).getTime()>=new Date(dayDate).getTime() && new Date(iDate).getTime()<new Date(dayD.startDate).getTime()){
                        box.othersClum[j].chrildren[k].colorNum="2";
                        box.othersClum[j].chrildren[k].showText="提前 ： 提前"+data.works[z].advance+"天";
                      }else if(new Date(iDate).getTime()>=new Date(dayD.startDate).getTime() && new Date(iDate).getTime()<=new Date(new Date(dayD.endDate) - 1000 * 60 * 60 * 24 * 20).getTime()){
                        box.othersClum[j].chrildren[k].colorNum="3";
                        box.othersClum[j].chrildren[k].showText="正常 ： 正常进行"+data.works[z].normal+"天";
                      }else if(new Date(iDate).getTime()<=new Date(dayD.endDate).getTime() &&
                        new Date(iDate).getTime()>new Date(new Date(dayD.endDate) - 1000 * 60 * 60 * 24 * 20).getTime()
                        && new Date(iDate).getTime()>=new Date(new Date(dayD.startDate)).getTime()){
                        box.othersClum[j].chrildren[k].colorNum="5";
                        box.othersClum[j].chrildren[k].showText="预警 ： 剩余"+data.works[z].warning+"天";
                      }else if(new Date(iDate).getTime()>new Date(dayD.endDate).getTime() &&new Date(iDate).getTime()<=new Date(dayDate).getTime()){
                        box.othersClum[j].chrildren[k].colorNum="4";
                        box.othersClum[j].chrildren[k].showText="滞后 ： 滞后"+data.works[z].lagging+"天";
                      }
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
                  if(!json.startDate || new Date(json.startDate).getTime() > new Date(data[i].times[j].fdPlanStartTime ).getTime()){
                    json.startDate=new Date(data[i].times[j].fdPlanStartTime ).getFullYear()+"-"+(new Date(data[i].times[j].fdPlanStartTime ).getMonth() + 1>9?new Date(data[i].times[j].fdPlanStartTime ).getMonth() + 1:"0"+(new Date(data[i].times[j].fdPlanStartTime ).getMonth() + 1))+"-"+(new Date(data[i].times[j].fdPlanStartTime ).getDate()>9?new Date(data[i].times[j].fdPlanStartTime ).getDate():"0"+new Date(data[i].times[j].fdPlanStartTime ).getDate());
                  }
                  if(!json.endDate || new Date(json.endDate).getTime() < new Date(data[i].times[j].fdPlanEndTime).getTime()){
                    json.endDate=new Date(data[i].times[j].fdPlanEndTime ).getFullYear()+"-"+(new Date(data[i].times[j].fdPlanEndTime ).getMonth() + 1>9?new Date(data[i].times[j].fdPlanEndTime ).getMonth() + 1:"0"+(new Date(data[i].times[j].fdPlanEndTime ).getMonth() + 1))+"-"+(new Date(data[i].times[j].fdPlanEndTime ).getDate()>9?new Date(data[i].times[j].fdPlanEndTime ).getDate():"0"+new Date(data[i].times[j].fdPlanEndTime ).getDate());
                  }
                }
              }
            }
            return json;
          },
          getMinDate(data){
            var date="";
            for(var i=0;i<data.length;i++){
              if(data[i].fdFoundationExcavationDate){
                if(!date || new Date(date).getTime() > new Date(data[i].fdFoundationExcavationDate).getTime()){
                  date=data[i].fdFoundationExcavationDate;
                }
              }else if(data[i].fdFoundationPouringDate){
                if(!date || new Date(date).getTime() > new Date(data[i].fdFoundationPouringDate).getTime()){
                  date=data[i].fdFoundationPouringDate;
                }
              }else if(data[i].fdPagodaDate){
                if(!date || new Date(date).getTime() > new Date(data[i].fdPagodaDate).getTime()){
                  date=data[i].fdPagodaDate;
                }
              }else if(data[i]. fdBuryingDate){
                if(!date || new Date(date).getTime() > new Date(data[i]. fdBuryingDate).getTime()){
                  date=data[i]. fdBuryingDate;
                }
              }else if(data[i].fdOverheadLineDate){
                if(!date || new Date(date).getTime() > new Date(data[i].fdOverheadLineDate).getTime()){
                  date=data[i].fdOverheadLineDate;
                }
              }else if(data[i].fdPagodaArrivalDate){
                if(!date || new Date(date).getTime() > new Date(data[i].fdPagodaArrivalDate).getTime()){
                  date=data[i].fdPagodaArrivalDate;
                }
              }else if(data[i].fdTightenLineDate){
                if(!date || new Date(date).getTime() > new Date(data[i].fdTightenLineDate).getTime()){
                  date=data[i].fdTightenLineDate;
                }
              }
            }
            return date;
          },
          getMaxDate(data){
            var date="";
            for(var i=0;i<data.length;i++){
              if(data[i].fdFoundationExcavationDate){
                if(!date || new Date(date).getTime() < new Date(data[i].fdFoundationExcavationDate).getTime()){
                  date=data[i].fdFoundationExcavationDate;
                }
              }else if(data[i].fdFoundationPouringDate){
                if(!date || new Date(date).getTime() < new Date(data[i].fdFoundationPouringDate).getTime()){
                  date=data[i].fdFoundationPouringDate;
                }
              }else if(data[i].fdPagodaDate){
                if(!date || new Date(date).getTime() < new Date(data[i].fdPagodaDate).getTime()){
                  date=data[i].fdPagodaDate;
                }
              }else if(data[i].fdBuryingDate ){
                if(!date || new Date(date).getTime() < new Date(data[i].fdBuryingDate ).getTime()){
                  date=data[i].fdBuryingDate ;
                }
              }else if(data[i].fdOverheadLineDate){
                if(!date || new Date(date).getTime() < new Date(data[i].fdOverheadLineDate).getTime()){
                  date=data[i].fdOverheadLineDate;
                }
              }else if(data[i].fdPagodaArrivalDate){
                if(!date || new Date(date).getTime() < new Date(data[i].fdPagodaArrivalDate).getTime()){
                  date=data[i].fdPagodaArrivalDate;
                }
              }else if(data[i].fdTightenLineDate){
                if(!date || new Date(date).getTime() < new Date(data[i].fdTightenLineDate).getTime()){
                  date=data[i].fdTightenLineDate;
                }
              }
            }
            return date;
          },
          putShowText(data){
            for(var i=0;i<data.length;i++){
              if(data[i].type=="work"){
                for(var j=0;j<data[i].works.length;j++){
                  var startDate=new Date(data[i].works[j].startDate).getFullYear()+"-"+(new Date(data[i].works[j].startDate).getMonth() + 1>9?new Date(data[i].works[j].startDate).getMonth() + 1:"0"+(new Date(data[i].works[j].startDate).getMonth() + 1))+"-"+(new Date(data[i].works[j].startDate).getDate()>9?new Date(data[i].works[j].startDate).getDate():"0"+new Date(data[i].works[j].startDate).getDate());
                  var endDate=new Date(data[i].works[j].endDate).getFullYear()+"-"+(new Date(data[i].works[j].endDate).getMonth() + 1>9?new Date(data[i].works[j].endDate).getMonth() + 1:"0"+(new Date(data[i].works[j].endDate).getMonth() + 1))+"-"+(new Date(data[i].works[j].endDate).getDate()>9?new Date(data[i].works[j].endDate).getDate():"0"+new Date(data[i].works[j].endDate).getDate());
                  var today = new Date(endDate);
                  var minDate=this.getMinDate(data[i].works[j].dataList);
                  var maxDate=this.getMaxDate(data[i].works[j].dataList);
                  var endDateBefor20="";
                  //提前多少天
                  var advance=this.getDateDiff(minDate,startDate);
                  //滞后多少天
                  var lagging=this.getDateDiff(endDate,maxDate);
                  //预警天数
                  var warning="";
                  //正常剩余天数
                  var normal="";

                  if(new Date(startDate).getTime()>today.getTime()- 1000 * 60 * 60 * 24 * 20){
                    endDateBefor20=startDate;
                  }else{
                    today=new Date(today.getTime()- 1000 * 60 * 60 * 24 * 20);
                    endDateBefor20=today.getFullYear()+"-"+((today.getMonth()+1)<10?("0"+(today.getMonth()+1)):(today.getMonth()+1))+'-'+today.getDate();
                  }
                 //计算预警天数
                  if(new Date(maxDate).getTime()<=new Date(endDateBefor20).getTime()){
                    warning=this.getDateDiff(endDateBefor20,endDate);
                  }else if(new Date(maxDate).getTime()>=new Date(endDateBefor20).getTime() && new Date(maxDate).getTime()<=new Date(endDate).getTime()){
                    warning=this.getDateDiff(maxDate,endDate);
                  }else if(new Date(maxDate).getTime()>=new Date(endDate).getTime()){
                    warning="0";
                  }
                 //计算正常进行的天数
                  if(new Date(maxDate).getTime()<=new Date(startDate).getTime()){
                    normal="0";
                  }else if(new Date(maxDate).getTime()>=new Date(startDate).getTime() && new Date(maxDate).getTime()<=new Date(endDateBefor20).getTime()){
                    normal=this.getDateDiff(startDate,maxDate);
                  }else if(new Date(maxDate).getTime()>=new Date(endDateBefor20).getTime()){
                    normal=this.getDateDiff(startDate,endDateBefor20);
                  }
                  data[i].works[j].advance=advance;
                  data[i].works[j].lagging=lagging;
                  data[i].works[j].warning=warning;
                  data[i].works[j].normal=normal;
                }
              }
            }
            return data;
          },
          getGanntDataList(){
            var _this=this;
            this.$http.post('/engineer/getCollectorGanttChart', {fdStageName:this.$parent.$parent.$parent.activeName,fdProid:this.$parent.$parent.$parent.popData.fdProid})
              .then(res => {
                console.log(res);
                //获取后台给出的数据中最早的开始时间和最晚的结束时间
                var planList=res.data.data[0];
                var dataList=res.data.data[1];
                var json=_this.getStartAndEndTime(planList);
                //开始时间提前五天
                var today = new Date(json.startDate);
                today=new Date(today.getTime()- 1000 * 60 * 60 * 24 * 5);
                json.startDate=today.getFullYear()+"-"+((today.getMonth()+1)<10?("0"+(today.getMonth()+1)):(today.getMonth()+1))+'-'+today.getDate();
                //结束时间延迟5天
                var today1 = new Date(json.endDate);
                today1=new Date(today1.getTime()+ 1000 * 60 * 60 * 24 * 5);
                json.endDate=today1.getFullYear()+"-"+((today1.getMonth()+1)<10?("0"+(today1.getMonth()+1)):(today1.getMonth()+1))+'-'+today1.getDate();
                //根据起止时间构造二维表数据结构
                var box=_this.constructData( json.startDate, json.endDate);
                console.log(box)
                //根据后台数据计算每个表格的提示信息
                var data=_this.putShowText(dataList);
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
        mounted: function () {

        },
      created(){
        this.getGanntDataList();
      }
    }
</script>

<style >
  .bacColor317eb0{
    background: #317eb0;
  }
  .gantt{}
  .gantt .el-table .cell {
    padding-left: 0px ;
    padding-right: 0px ;
  }

  .gantt .el-table td {
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
</style>
