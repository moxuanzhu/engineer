<template>
  <div class="engineerComment" >
    <el-tabs value="trafficEngineer" @tab-click="handleClick" v-if="projectProcess">
      <el-tab-pane :label="item.label" :name="item.name" :disabled="item.disabled" v-for="item in projectProcess" :key="item.name">
        <!--content-->
        <div class="engineerCommentContent">
          <div class="engineerCommentContentInnerPosition">
            <span class="dateScreen">日期筛选:</span>
            <el-date-picker v-model="time" @change="getWeeks('changMonth')" style="margin-left: 10px;" format="yyyy-MM" value-format="yyyy-MM" type="month" size="mini" placeholder="选择日期">
            </el-date-picker>
          </div>
          <!--手风琴面板-->
          <div class="engineerCommentContentInnerPosition">
            <el-collapse v-model="active" accordion @change="getWeekDate">
              <el-collapse-item v-for="(week,index) in weeksList" :key="week" :style="{backgroundColor:colorList[weekDataList[index].degree-1]}" style="border: 1px solid #EAF0F4;" :title="week" :name="index+1+''" >
                <div style="position: relative;" :style="{maxHeight:panelHeight+'px'}">
                  <div class="accordionOutter">
                    <div class="accordionInnerBox">
                      <span class="accordionInnerBoxSpan">目前进展</span>
                      <div class="accordionInnerBoxDiv">
                        <textarea v-model="weekDataList[index].currentProgress" class="accordionInnerBoxArea"></textarea>
                      </div>
                    </div>
                    <div class="accordionInnerBox">
                      <span class="accordionInnerBoxSpan">困难程度</span>
                      <div class="accordionInnerBoxDiv">
                        <el-select  v-model="weekDataList[index].degree" placeholder="请选择">
                          <el-option v-for="(item,index1) in options" :key="(index1+1)+''" :label="item" :value="(index1+1)+''">
                          </el-option>
                        </el-select>
                      </div>
                    </div>
                    <div class="accordionInnerBox">
                      <span class="accordionInnerBoxSpan">问题</span>
                      <div class="accordionInnerBoxDiv">
                        <textarea v-model="weekDataList[index].problem" class="accordionInnerBoxArea"></textarea>
                      </div>
                    </div>
                    <div class="accordionInnerBox">
                      <span class="accordionInnerBoxSpan">解决方案</span>
                      <div class="accordionInnerBoxDiv">
                        <textarea v-model="weekDataList[index].solution"  class="accordionInnerBoxArea"></textarea>
                      </div>
                    </div>
                    <div class="accordionInnerBox2">
                      <el-button class="accordionInnerBox2Button" size="mini" plain @click="save(weekDataList[index])">保存</el-button>
                    </div>
                    <div class="accordionUser" >
                      <!-- <span>{{weekDataList[index].createdBy}} {{weekDataList[index].year}}-{{weekDataList[index].month}}-{{weekDataList[index].day}} </span> -->
                      <span>{{weekDataList[index].createdBy}}</span>
                      <span v-if="weekDataList[index].crateTime" class="createTime">{{weekDataList[index].crateTime.split(" ")[0]}} </span>
                      <span class="accordionUserComment" @click="showOrHiddenComment(weekDataList[index])">评论 ( {{weekDataList[index].commentCount}} )</span>
                    </div>
                    <!--评论面板-->
                    <div v-if="showComment" class="commentPanal">
                      <div class="commentPanalContent" >
                        <!--循环渲染-->
                        <div class="commentPanalContentRow" v-if="commentList" v-for="item in commentList" :key="item.comId">
                          <div class="commentPanalContentRowLeft" >
                              <div v-if="!item.comName">
                                <span class="commentator">{{item.commentName}}: </span>
                                <span class="commentator_content">{{item.messageContent}}</span>
                              </div>
                              <div v-if="item.comName">
                                <span class="commentator">{{item.commentName}}</span>回复<span class="commentator">{{item.comName}}: </span>
                                <span class="commentator_content">{{item.messageContent}}</span>
                              </div>
                          </div>
                          <div class="commentPanalContentRowRight" >
                            <span class="ReplyCommenter">{{item.crateTime}}</span>
                            <span class="ReplyCommenter_text" @click="Reply(item)">回复</span>
                          </div>
                        </div>
                      </div>
                      <!--分页组件-->
                      <div>
                        <!-- :total="weekDataList[index].commentCount" -->
                        <el-pagination
                          @size-change="commentHandleSizeChange(weekDataList[index],$event)"
                          @current-change="commentHandleCurrentChange(weekDataList[index],$event)"
                          :current-page="commentCurrentPage"
                          :page-sizes="[5, 10, 15]"
                          :page-size="commentSize"
                          layout="total, sizes, prev, pager, next, jumper"
                          :total="parseInt(weekDataList[index].commentCount)">
                        </el-pagination>
                      </div>
                      <!--回复框-->
                      <div class="publish_wrap">
                        <textarea ref="commentPanalContentArea" class="commentPanalContentArea" :placeholder= "Respondent" v-model="commentPanalContent"></textarea>
                      </div>
                      <el-button class="accordionInnerBox2Button fr" size="mini" plain @click="Publish(weekDataList[index])">发表</el-button>
                    </div>
                  </div>

                </div>
              </el-collapse-item>

            </el-collapse>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
    export default {
      data() {
        return {
          projectProcess: [
            {
              name: 'collaborative',
              label: '问题协同记录表',
              disabled: true
            },
            {
              name: 'trafficEngineer',
              label: '交通工程',
              disabled: false
            },
            {
              name: 'fanFoundation',
              label: '风机基础',
              disabled: false
            },
            {
              name: 'fanInstallation',
              label: '风机安装',
              disabled: false
            },
            {
              name: 'collectorLine',
              label: '集电线路',
              disabled: false
            },
            {
              name: 'sendOutLine',
              label: '送出线路',
              disabled: false
            },
            {
              name: 'boosterStation',
              label: '升压站',
              disabled: false
            }
          ],
          stageId: 1,
          Respondent: '',
          commentPanalContent: '',
          comPid: 0,
          testSelect:"",
          active:"1",
          time:"",
          itemId: '',
          options:[
            "普通",
            "紧急",
            "严重"
          ],
          showComment:false,
          commentSize:5,
          commentCurrentPage:1,
          commentTotal:0,
          panelHeight:350,
          colorList:[
            "#A0D468",
            "#FFCE55",
            "#E75B8D"
          ],
          weeksList:[],
          weekDataList:[],
          commentList:[],
        };
      },
      mounted: function () {
        this.itemId = JSON.parse(this.$route.query.mapData).fdProid
        this.time = this.formatDateTime(new Date())
        this.getWeeks();
      },
      methods: {
        notify(message, type) {
          type ? (type == 'success' ? this.$message({message,type}) : this.$message.error(message)) : this.$message({message,type})
        },

        formatDateTime(date) {
          let y = date.getFullYear();  
          let m = date.getMonth() + 1;
          return y + '-' + (m < 10 ? ('0' + m) : m);  
        },

        getWeeks(type){
          type == 'changMonth' ? this.showComment = false : ''
          var params = {
            datea: this.time,
            itemId: this.itemId,
            stageId: this.stageId
          }
          if(this.time !== null){
             this.$http.post('/engineer/discussComment/splitMonthList', params)
            .then(res => {
              res.data.status == 200 ? (this.weeksList=res.data.data.splitMonthList,this.weekDataList=res.data.data.problems) : this.notify('数据加载失败', 'error')
            }).catch(err => {
            this.notify(err.message, 'error')
            })
          }
        },

        getWeekDate(){
          if(this.active){
            var startDate=this.weeksList[parseInt(this.active)].split(" ")[2];
            var endDate=this.weeksList[parseInt(this.active)].split(" ")[6];
            this.showComment=false;
            this.panelHeight=350;
          }
        },

        handleClick (tab, event) {
          this.stageId = tab.index
          this.getWeeks()
        },
        
        Reply(data) {
          this.Respondent = '回复:' + data.commentName;
          this.$refs.commentPanalContentArea.map((item, index) => {
            item.focus()
          })
          this.comPid = data.commentById
        },

        showOrHiddenComment(data){
          // if (!data.problem) {
          //   this.$message('暂无问题')
          //   return
          // }
          this.showComment=!this.showComment
          this.getCommentList(data);
          this.panelHeight = this.showComment ? this.panelHeight+300 : this.panelHeight-300
        },
        commentHandleSizeChange: function (data, val) {
          var _this = this;
          _this.commentSize = val
          _this.getCommentList(data);
        },
        commentHandleCurrentChange: function (data, val) {
          var _this = this;
          _this.commentCurrentPage = val
          _this.getCommentList(data);
        },
        getCommentList(data){   //查询后回显详情
          var params={
            problemId:data.problemId,
            start:this.commentCurrentPage,
            end:this.commentSize,
          }
          this.$http.post('/engineer/discussComment/selectComments', params)
            .then(res => {
              res.data.status == 200 ? this.commentList = res.data.data : ''
            }).catch(err => {
              this.notify(err.message, 'error')
              console.log("数据请求失败")
          })
        },
        save(item){
          if (!item.currentProgress) {
            !item.currentProgress ? this.$message('请填写目前进度') : ''
            return
          }
          if (!item.problem) {
            !item.problem ? this.$message('请填写问题') : ''
            return
          }
          if (!item.solution) {
            !item.solution ? this.$message('请填写解决方案') : ''
            return
          }
          
          var params = {
            datea:this.weeksList[parseInt(this.active)-1].split(" ")[0].split("【")[1],
            itemId:this.itemId,//项目id
            currentProgress:item.currentProgress,
            problem:item.problem,
            solution:item.solution,
            degree:item.degree,
            problemId:item.problemId,
            stageId: this.stageId
          };
          this.$http.post('/engineer/discussComment/insertWorkProblem', params)
            .then(res => {
              res.data.status == 200 ? this.notify('保存成功', 'success') : this.notify('保存失败', 'error')
            }).catch(err => {
            this.notify('保存失败', 'error')
          })
        },
        Publish(data) {
          if (!this.commentPanalContent) {
            this.$message('请填写发表内容')
            return
          }
          let params = {
            problemId: data.problemId,
            messageContent: this.commentPanalContent,
            comPid: this.Respondent.length ? this.comPid : -1
          }
          this.$http.post("/engineer/discussComment/insertComments", params)
            .then(res => {
              if (res.data.status == 200) {
                this.Respondent = this.commentPanalContent = '',
                this.getCommentList(data),
                this.getWeeks(),
                this.notify('发表成功', 'success')
              } else {
                this.notify('发表失败', 'error')
              }
            }).catch(err => {
              this.notify(err.message, 'error')
              console.log("数据请求失败")
          })
        },

        /* getWeeks(){
          var date = new Date(this.time.split("-")[0],this.time.split("-")[1],0);
          var w = date.getDay();
          //获取这个月有多少天
          var days = date.getDate();
          if(w==0){
            w=7;
          };
          //一个月有多少周
          var weeks=Math.ceil((days + 7 - w) / 7);
          var day ;
          var today = new Array("星期日","星期一","星期二","星期三","星期四","星期五","星期六"); //创建星期数组
          var dateArr=[];
          var weeksArr=["第一周","第二周","第三周","第四周","第五周","第六周"];
          for(var i=1;i<=weeks;i++){
            var start="";
            var end="";
            var fullDate="";
            if(i==1){
              day = new Date(Date.parse((this.time+"-01").replace(/-/g, '/')));
              start=weeksArr[i-1]+" 【 "+ day.getFullYear()+"-"+((day.getMonth()+1)<10?("0"+(day.getMonth()+1)):(day.getMonth()+1))+"-"+(day.getDate()<10?("0"+day.getDate()):day.getDate())+" "+today[day.getDay()]+" ";
              if(day.getDay()==0){
                day.setDate(day.getDate());
              }else{
                day.setDate(day.getDate()+7-day.getDay());
              }
              end=" 至 "+ day.getFullYear()+"-"+((day.getMonth()+1)<10?("0"+(day.getMonth()+1)):(day.getMonth()+1))+"-"+(day.getDate()<10?("0"+day.getDate()):day.getDate())+" "+today[day.getDay()]+" 】";
            }else if(i>1 && i <weeks){
              day.setDate(day.getDate()+1);
              start=weeksArr[i-1]+" 【 "+ day.getFullYear()+"-"+((day.getMonth()+1)<10?("0"+(day.getMonth()+1)):(day.getMonth()+1))+"-"+(day.getDate()<10?("0"+day.getDate()):day.getDate())+" "+today[day.getDay()]+" ";
              day.setDate(day.getDate()+6);
              end=" 至 "+ day.getFullYear()+"-"+((day.getMonth()+1)<10?("0"+(day.getMonth()+1)):(day.getMonth()+1))+"-"+(day.getDate()<10?("0"+day.getDate()):day.getDate())+" "+today[day.getDay()]+" 】";
            }else{
              day.setDate(day.getDate()+1);
              start=weeksArr[i-1]+" 【 "+ day.getFullYear()+"-"+((day.getMonth()+1)<10?("0"+(day.getMonth()+1)):(day.getMonth()+1))+"-"+(day.getDate()<10?("0"+day.getDate()):day.getDate())+" "+today[day.getDay()]+" ";
              day = new Date(Date.parse((this.time+"-"+days).replace(/-/g, '/')));
              end=" 至 "+ day.getFullYear()+"-"+((day.getMonth()+1)<10?("0"+(day.getMonth()+1)):(day.getMonth()+1))+"-"+(day.getDate()<10?("0"+day.getDate()):day.getDate())+" "+today[day.getDay()]+" 】";
            }
            fullDate=start+end;
            dateArr.push(fullDate);
          }
          this.weeksList=dateArr;
        },*/
      }
    }
</script>

<style >
  .engineerComment .el-tabs__header {
    margin-left: 15px
  }
  /* .engineerComment .el-tabs__item {
    font-size: 14px
  } */
  .engineerComment .dateScreen {
    font-size: 15px;
  }
  .engineerComment .createTime {
    padding: 0 15px 0 6px;
  }
  .engineerComment{
    width: 99%;
    height: 100%;
    border: 1px solid #EAF0F4;
  }
  .engineerComment .el-collapse-item__header {
    background-color: inherit;
    color: #FFFFFF;
    padding: 0 20px
  }
  .engineerCommentContentInnerPosition{
    margin: 20px 15px 0;
  }
  .accordionOutter{
    margin-left: 5%;
    width: 90%;
    height: 300px;
    margin-top:20px;
  }
  .accordionInnerBox{
    display: flex;
    margin-top: 5px;
  }
  .accordionInnerBoxSpan{
    display: block;
    width: 6%;
    min-width: 65px;
    padding-right: 10px;
    text-align: right;
  }
  .accordionInnerBoxDiv{
    width: 94%;
  }
  .accordionInnerBoxArea{
    height: 60px;
    width: 100%;
    border: 1px solid #dcdfe6;
    padding: 5px;
  }
  .accordionInnerBox2{
    padding: 5px 0;
    text-align: right;
    border-bottom: 1px solid #EAF0F4;
  }
  .accordionInnerBox2Button{
    width: 60px;
    height: 30px;
    color: white;
    background-color: #169BD5;
  }
  .accordionUser{
    padding: 10px 0;
    text-align: right;
  }
  .accordionUserComment{
    color:#169BD5;
    cursor: pointer;
    border-bottom: 1px solid #169BD5
  }
  .accordionUserComment:hover{
    color: #409EFF;
  }
  .commentPanal{
    max-height: 300px;
  }
  .commentPanalContent{
    /* max-height: 160px; */
    padding: 5px 0;
    overflow: auto;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    overflow: auto;
  }
  .commentPanalContentRow{
    display: flex;
    justify-content: space-between;
    /* height: 30px; */
  }
  .commentPanalContentRowLeft{
    max-width: 800px;
    min-width: 500px;
    /* height: 30px; */
  }
  .commentPanalContentRowRight{
    min-width: 180px;
    max-width: 20%;
    height: 30px;
    text-align: right;
  }
  .commentPanalContentArea{
    width: 100%;
    height: 80px;
    padding: 5px;
  }
  .engineerComment .commentator{
    color: #169BD5
  }
  .engineerComment .el-select{
    margin-bottom: 5px
  }
  .engineerComment .ReplyCommenter{
    padding-right: 20px;
  }
  .engineerComment .commentator_content{
    padding-left: 5px;
  }
  .engineerComment .ReplyCommenter_text {
    cursor: pointer;
  }
  .engineerComment .ReplyCommenter_text:hover{
    color: #169BD5
  }
  .engineerComment fr{
    float: right;
  }
  .engineerComment .publish_wrap{
    margin: 15px 0 5px 0
  }
  .engineerComment .el-collapse-item__content{
    padding-bottom: 40px
  }
</style>
