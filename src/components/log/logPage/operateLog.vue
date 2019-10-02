<template>
<div class="operate" id="operate"  :style="{height:operateHeight+'px'}">
  <!--搜索头部-->
  <div class="operateHeder">
    <div style="margin-top: 21px;position: absolute;margin-left: 15px;">
      <span class="demonstration">起止时间：</span>
      <el-date-picker v-model="params.fdStartDate" @change="queryOperateLog" :picker-options="startPickerOptions" size="mini" format="yyyy/MM/dd" value-format="yyyy-MM-dd" type="date" placeholder="选择日期">
      </el-date-picker>
      <span class="demonstration">至</span>
      <el-date-picker v-model="params.fdEndDate" @change="queryOperateLog" :picker-options="endPickerOptions" size="mini" format="yyyy/MM/dd" value-format="yyyy-MM-dd" type="date" placeholder="选择日期">
      </el-date-picker>
      <span class="demonstration" style="margin-left: 20px;">用户类型：</span>
      <el-select v-model="params.fdUserType" @change="queryOperateLog" size="mini" placeholder="请选择">
        <el-option v-for="(item,index) in options1" :key="index" :label="item.label" :value="index">
        </el-option>
      </el-select>
      <span class="demonstration" style="margin-left: 20px;">操作类型：</span>
      <el-select v-model="params.fdOperationType" @change="queryOperateLog" size="mini" placeholder="请选择">
        <el-option v-for="(item,index) in options" :key="index" :label="item" :value="index">
        </el-option>
      </el-select>
      <span class="demonstration" style="margin-left: 20px;">用户名：</span>
      <el-input v-model="params.fdUserName"  @keyup.enter.native="queryOperateLog" size="mini" placeholder="请输入内容"></el-input>
      <el-button type="primary" style="margin-left: 25px;" size="mini"   @click="queryOperateLog">查询</el-button>
      <button class="reset" @click="resetMethod">重置</button>
    </div>
  </div>
  <!--正文内容-->
    <div class="maps" style="clear: both;" :style="{height:operateHeight-90+'px'}">
      <div v-loading="loadings"  element-loading-text="拼命加载中"  element-loading-spinner="el-icon-loading"   element-loading-background="rgba(0, 0, 0, 0.8)">
        <div class="list" id="listbody">
          <!--<div class="export">
            <el-button type="primary" icon="el-icon-upload2" size="mini" >导出</el-button>
          </div>-->
          <div  :style="{height:operateHeight-100+'px'}" style="position: relative;">
            <div class="visual" :style="{height:operateHeight-132+'px'}">
              <el-table
                :data="areaList"
                :empty-text="resMsg"
                style="width: 100%"
              >
                <el-table-column
                  prop="fdUserName"
                  :show-overflow-tooltip="true"
                  min-width="15%"
                  label="用户名">
                </el-table-column>
                <el-table-column
                  prop="fdRolename"
                  :show-overflow-tooltip="true"
                  min-width="15%"
                  label="用户类型">
                </el-table-column>
                <el-table-column
                  prop="fdOperationDate"
                  :show-overflow-tooltip="true"
                  min-width="15%"
                  label="操作时间">
                </el-table-column>

                <el-table-column
                  prop="fdOperationType"
                  :show-overflow-tooltip="true"
                  min-width="15%"
                  label="操作类型">
                  <template slot-scope="scope">
                    <div>
                      {{scope.row.fdOperationType?options[scope.row.fdOperationType]:""}}
                    </div>
                  </template>
                </el-table-column>

                <el-table-column
                  prop="fdOperationDescribe"
                  :show-overflow-tooltip="true"
                  min-width="40%"
                  label="操作描述">
                </el-table-column>
              </el-table>
            </div>
            <div class="block">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="params.pageNum"
                :page-sizes="[7, 10, 15]"
                :page-size="params.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
              </el-pagination>
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
          let that=this;
            return {
              loadings:false,
              operateHeight:0,
              currentPage: 1,
              size: 7,
              total: 0,
              resMsg:"暂无数据",
              areaList:[],
              options:[
                "全部",
                "删除",
                "修改",
                "新增"
              ],
              options1:[],
              params:{
                fdStartDate:"",
                fdEndDate:"",
                fdUserName:"",
                fdAppid:4,
                fdUserType:"",
                fdOperationType:0,
                pageNum:1,
                pageSize:7,
                splitPage:true
              },
              startPickerOptions:{
                disabledDate(time) {
                  if(that.params.fdEndDate){
                    return time.getTime() > Date.now() || time.getTime() > new Date(that.params.fdEndDate).getTime();
                  }else{
                    return time.getTime() > Date.now();
                  }
                }
              },
              endPickerOptions:{
                disabledDate(time) {
                  if(that.params.fdStartDate){
                    var newtime=time.getFullYear()+"-"+((time.getMonth()+1)<10?("0"+(time.getMonth()+1)):(time.getMonth()+1))+'-'+time.getDate();
                    if(that.params.fdStartDate===newtime){
                      return false;
                    }
                    return time.getTime() > Date.now() || time.getTime() < new Date(that.params.fdStartDate).getTime();
                  }else{
                    return time.getTime() > Date.now();
                  }
                }
              },
            };
        },
        methods: {
          resetMethod(){
            this.params={
              fdStartDate:"",
                fdAppid:4,
                fdEndDate:"",
                fdUserName:"",
                fdUserType:"",
                fdOperationType:0,
                pageNum:1,
                pageSize:7,
                splitPage:true
            };
            this.queryOperateLog();
          },
          handleSizeChange: function (val) {
            var _this = this;
            _this.params.pageSize = val;
            _this.queryOperateLog();
          },
          handleCurrentChange: function (val) {
            var _this = this;
            _this.params.pageNum = val;
            _this.queryOperateLog();
          },
          queryOperateLog(){
            var _this=this;
            _this.loadings=true;
            this.$http.post('/permission/selectLog', this.params)
             //this.$http.post('selectLog', this.params)
              .then(res => {
                if(res){
                  _this.areaList=res.data.data.list;
                  for(var i=0;i<_this.areaList.length;i++){
                    if(_this.areaList[i].fdRolename==null){
                      _this.areaList[i].fdRolename="无"
                    }else{
                      _this.areaList[i];
                    }
                  }
                  _this.loadings=false;
                  _this.total=res.data.data.total;
                  if( _this.areaList.length==0){
                    _this.resMsg="暂无数据";
                  }
                }else{
                  _this.loadings=false;
                  _this.areaList=[];
                  _this.resMsg="数据请求失败";
                  console.log("数据请求失败")
                }

              }).catch(err => {
               _this.loadings=false;
               _this.areaList=[];
               _this.resMsg="数据请求失败";
              console.log("数据请求失败")
            })
          },
        },
        mounted: function () {
          this.operateHeight=document.getElementById("bgerbody").offsetHeight-80;
          this.queryOperateLog();
          console.log(this.operateHeight);
        }
    }
</script>

<style >
  .innerCss{
    margin-top: 5px;margin-bottom: 5px;margin-left: 1px
  }
  .operateHeder{
    height: 70px;
    width: 100%;
    background-color: white;
  }
  .maps{
    width:100%;
    margin-top: 10px;
  }
  .operate{
    width:99.4%;
    height: 100%;
    padding: 10px;
    margin: 9px 5px;
    background: url("../../indexmap/image/group41.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    position: relative;
    overflow: hidden;
  }
  .list{
    width: 100%;
    height:100%;
    background:#fff;
  }
  .export{
    width: 100%;
    height:60px;
    text-align: right;
    line-height: 60px;
  }
  .visual{
    width:100%;
    /* height:87%; */
    overflow-y:auto;
  }
  .export button{
    background-color: #39aef9;
    margin-right: 22px;
    height: 35px;
    margin-top: 15px;
  }
  .block {
    position:absolute;
    right:26px;
    bottom:12px;
    /* float: right;
    margin-top: 15px; */
  }
  .el-table /deep/ th.is-leaf{
    background:#f0f0f0;
  }
  .buttonCss {
    float: left;
    border: 1px solid #39aef9;
    width: 51px;
    height: 25px;
    border-radius: 4px;
    text-align: center;
    margin-left: 8px;
    cursor: pointer;
  }
  .delButtonCss {
    float: left;
    border: 1px solid rgb(195,211,234);
    width: 51px;
    height: 25px;
    border-radius: 4px;
    text-align: center;
    margin-left: 8px;
    cursor: pointer;
  }
  .operateHeder .el-date-editor.el-input,.operateHeder .el-date-editor.el-input__inner{
    width: 150px;
  }
  .operateHeder .el-select{
    display: inline-block;
    position: relative;
    width: 100px
  }
  .operateHeder .el-input{
    position: relative;
    font-size: 14px;
    display: inline-block;
    width: 100px;
  }
  .reset {
    width: 50px;
    border:none;
    background: none;
    border-radius: 5px;
    cursor:pointer
  }
</style>
