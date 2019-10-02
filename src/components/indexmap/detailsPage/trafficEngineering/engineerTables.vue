<template>
  <div class="engineerTables">
    <div class="leftTableBorder">
      <div class="TableHeader">
        <span class="headerContentLeft"> 道路未施工原因记录表</span>
        <div class="headerContentRightDiv">
          <span class="headerContentRightSpan" @click="showUnConstructionModel">总览</span>
        </div>
      </div>
      <div class="tableContent">
        <div class="tableContentInner">
          <el-table
            :data="unConstructionList"
            border
            :row-class-name="tableRowClassName"
            style="width: 100%"
          >
            <el-table-column
              prop="yearMonthDate"
              :show-overflow-tooltip="true"
              width="100"
              label="年月">
            </el-table-column>
            <el-table-column
              prop="fdDay"
              :show-overflow-tooltip="true"
              width="100"
              label="日">
            </el-table-column>
            <el-table-column
              prop="fdReasonExplanation"
              :show-overflow-tooltip="true"
              label="原因说明">
            </el-table-column>
          </el-table>
        </div>
        <div class="tableContentBottm">
          <el-pagination
            @size-change="unConstructionHandleSizeChange"
            @current-change="unConstructionHandleCurrentChange"
            :current-page="unConstructionCurrentPage"
            :page-sizes="[7, 10, 15]"
            :page-size="unConstructionSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="unConstructionTotal">
          </el-pagination>
        </div>
      </div>
    </div>
    <div class="rightTableBorder">
      <div class="TableHeader">
        <span class="headerContentLeft"> 风机平台施工记录表</span>
        <div class="headerContentRightDiv">
          <span class="headerContentRightSpan" @click="showConstructionModel">总览</span>
        </div>
      </div>
      <div class="tableContent">
        <div class="tableContentInner">
          <table class="lczTable">
            <thead>
            <tr>
              <th>风机编号</th>
              <th>所属线路</th>
              <th>贯通时间</th>
              <th>具备开挖条件</th>
              <th @click="addLine"> 添加</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item,index) in constructionList" :key="index">
              <td>
                <el-input v-model="item.fdFanNumber" size="mini" placeholder="请输入内容"></el-input>
              </td>
              <td>
                <el-select v-model="item.fdSubordinateLine" size="mini" placeholder="请选择">
                  <el-option v-for="item1 in lineList" :key="item1" :label="item1" :value="item1">
                  </el-option>
                </el-select>
              </td>
              <td>
                <el-date-picker
                  v-model="item.fdThroughTime"
                  type="date"
                  size="mini"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期">
                </el-date-picker>
              </td>
              <td>
                <el-date-picker
                  v-model="item.fdExcavation"
                  type="date"
                  size="mini"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期">
                </el-date-picker>
              </td>
              <td>
                <i style="cursor: pointer" class="el-icon-check" @click="undateRow(item)"></i>
                <i style="cursor: pointer;margin-left: 13px;" class="el-icon-delete"  @click="deleteRow(item,index)"></i>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
        <div class="tableContentBottm">
          <el-pagination
            @size-change="constructionHandleSizeChange"
            @current-change="constructionHandleCurrentChange"
            :current-page="constructionCurrentPage"
            :page-sizes="[7, 10, 15]"
            :page-size="constructionSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="constructionTotal">
          </el-pagination>
        </div>
      </div>
    </div>
    <div>
      <div>
        <un-construction-model v-if="unConstructionModelAttr.showModel"></un-construction-model>
      </div>
       <div>
         <construction-model v-if="constructionModelAttr.showModel"></construction-model>
       </div>
       <div>
         <reason-model v-if="reasonModelAttr.showModel"></reason-model>
       </div>
    </div>
  </div>
</template>

<script>
  import unConstructionModel from '@/components/indexmap/detailsPage/trafficEngineering/models/unConstructionModel';
  import constructionModel from '@/components/indexmap/detailsPage/trafficEngineering/models/constructionModel';
  import reasonModel from '@/components/indexmap/detailsPage/trafficEngineering/models/reasonModel';
    export default {
      components: {
        "un-construction-model":unConstructionModel,
        "construction-model":constructionModel,
        "reason-model":reasonModel
      },
        data() {
            return {
              unConstructionSize:7,
              unConstructionCurrentPage:1,
              unConstructionTotal:0,
              unConstructionList:[],
              unConstructionModelAttr:{
                showModel:false,
                title:"总览-道路未施工记录表"
              },
              reasonModelAttr:{
                showModel:this.$route.query.showModel,
                title:"工程量补录"
              },
              constructionSize:7,
              constructionCurrentPage:1,
              constructionTotal:0,
              constructionList:[
                {
                  fdFanNumber:"",
                  fdSubordinateLine:"",
                  fdThroughTime:"",
                  fdExcavation:""
                }
              ],
              constructionModelAttr:{
                showModel:false,
                title:"总览-施工记录表"
              },
              lineList:[
                "A  线",
                "B  线",
                "C  线",
                "D  线",
                "E  线",
                "F  线",
                "G  线",
                "H  线",
                "I  线",
                "J  线",
                "K  线"
              ],
              //unconstructionReason:this.$parent.$parent.$parent.unconstructionReason,
            };
        },
        methods: {
          addLine(){
            var date = new Date();
            var seperator1 = "-";
            var year = date.getFullYear();
            var month = date.getMonth() + 1;
            var strDate = date.getDate();
            if (month >= 1 && month <= 9) {
                month = "0" + month;
            }
            if (strDate >= 0 && strDate <= 9) {
                strDate = "0" + strDate;
            }
            var currentdate = year + seperator1 + month + seperator1 + strDate;

            var json={
              fdFanNumber:"",
              fdSubordinateLine:"",
              fdThroughTime:"",
              fdExcavation:"",
              yearMonthDate:currentdate,
            };
            this.constructionList.push(json);
          },
          undateRow(item){
            //console.log(item,'cc')
            var _this=this;
            if(!item.fdFanid){
              item.fdProid=this.$parent.$parent.$parent.popData.fdProid;
              //proview/
              // this.$http.post('/proview/addConstructionRecord', item)
              this.$http.post('/engineer/addConstructionRecord', item)
                .then(res => {
                  //console.log(res,'aa1')
                  if(res){
                    _this.$notify({
                      title: '成功',
                      message: '新增成功',
                      type: 'success'
                    });
                    _this.getConstructionList();
                  }else {
                    _this.$notify.error({
                      title: '错误',
                      message: '新增失败'
                    });
                  }
                }).catch(err => {
                _this.$notify.error({
                  title: '错误',
                  message: '新增失败'
                });
                console.log("数据请求失败")
              })
            }else{
              this.$http.post('/engineer/updateConstructionRecord', item)
                .then(res => {
                  //console.log(res,'aa2')
                  if(res){
                    _this.$notify({
                      title: '成功',
                      message: '更新成功',
                      type: 'success'
                    });
                    _this.getConstructionList();
                  }else {
                    _this.$notify.error({
                      title: '错误',
                      message: '更新失败'
                    });
                  }
                }).catch(err => {
                _this.$notify.error({
                  title: '错误',
                  message: '更新失败'
                });
                console.log("数据请求失败")
              })
            }
          },
          deleteRow(item,index){
            var params={
              fdFanid:item.fdFanid
            };
            var _this=this;
            this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.$http.post('/engineer/delConstructionRecord', params)
                .then(res => {
                  this.$notify({
                    title: '成功',
                    message: '删除成功',
                    type: 'success'
                  });
                  _this.getConstructionList();
                }).catch(err => {
                this.$notify.error({
                  title: '错误',
                  message: '删除失败'
                });
              })
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消删除'
              });
            });
          },
          showUnConstructionModel(){
            this.unConstructionModelAttr.showModel=true;
          },
          showConstructionModel(){
            this.constructionModelAttr.showModel=true;
          },
          tableRowClassName({row, rowIndex}) {
             if (row.fdCauseState === 2) {
              return 'success-row';
            }
            return '';
          },
          unConstructionHandleSizeChange: function (val) {
            var _this = this;
            _this.unConstructionSize = val;
            _this.getUnConstructionList();
          },
          unConstructionHandleCurrentChange: function (val) {
            var _this = this;
            _this.unConstructionCurrentPage = val;
            _this.getUnConstructionList();
          },
          getUnConstructionList(){   //查询后回显详情
        
            var _this=this;
            var params={
              fdProid:this.$parent.$parent.$parent.popData.fdProid,
              fdStageid:this.$parent.$parent.$parent.activeName,
              pageSize:this.unConstructionSize,
              pageNum:this.unConstructionCurrentPage,
              splitPage:true
            }
            //proview/
           // this.$http.post('/proview/getConditionsPro', params)
             this.$http.post('/engineer/getRoadNonConstruction', params)
            
              .then(res => {
                 //console.log(res,'ress')
                _this.unConstructionList=res.data.data.list;
                _this.unConstructionTotal=res.data.data.total;
              }).catch(err => {
              console.log("数据请求失败")
            })
          },
          constructionHandleSizeChange: function (val) {
            var _this = this;
            _this.constructionSize = val;
            _this.getConstructionList();
          },
          constructionHandleCurrentChange: function (val) {
            var _this = this;
            _this.constructionCurrentPage = val;
            _this.getConstructionList();
          },
          getConstructionList(){   //查询后回显详情
            var _this=this;
            var params={
              fdProid:this.$parent.$parent.$parent.popData.fdProid,
              pageSize:this.constructionSize,
              pageNum:this.constructionCurrentPage,
              splitPage:true
            }
            //proview/
           // this.$http.post('/proview/selectConstructionRecord', params)
             this.$http.post('/engineer/selectConstructionRecord', params)
              .then(res => {
                _this.constructionList=res.data.data.list;
                //_this.loadings=false;
                _this.constructionTotal=res.data.data.total;
              }).catch(err => {
              console.log("数据请求失败")
            })
          },
        },
        mounted: function () {
          this.getConstructionList();
          this.getUnConstructionList();
        },
      watch:{
        '$route':function (router) {
          var query=router.query;
          if(query.showModel){
            this.reasonModelAttr.showModel=query.showModel;
          }
        }
      }
    }
</script>

<style >
  .engineerTables{}
  .engineerTables .leftTableBorder{
    width: 48%;
    border: 1px solid #EAF0F4;
    float: left
  }
  .engineerTables .rightTableBorder{
    width: 48%;
    border: 1px solid #EAF0F4;
    float: left;
    margin-left:3%;
  }
  .engineerTables .TableHeader{
    height: 50px;
    background-color:#F9FAFB;
    position: relative;
  }
  .engineerTables .headerContentLeft{
    position: absolute;
    font-size: larger;
    font-weight: bold;
    margin-top: 12px;
    margin-left: 13px;
  }
  .engineerTables .headerContentRightDiv{
    position: absolute;
    width: 70px;
    height: 50px;
    right: 0px;
    border-left:1px solid #EAF0F4;
    cursor:pointer;
  }
  .engineerTables .headerContentRightDiv:hover{
    position: absolute;
    background-color: #5eB2FF;
    color: white;
    width: 70px;
    height: 50px;
    right: 0px;
    border-left:1px solid #EAF0F4;
    cursor:pointer;
  }
  .engineerTables .headerContentRightSpan{
    position: absolute;
    font-size: larger;
    font-weight: bold;
    margin-top: 14px;
    margin-left: 20px;
  }
  .engineerTables .tableContent{
    width: 100%;
    height: 443px;
    border: 1px solid #EAF0F4;
    position: relative;
  }
  .engineerTables .tableContentInner{
    width: 100%;
    height: 390px;
    overflow-y:auto;
  }
  .engineerTables .lczTable{
    width: 100%;
    border:1px solid #EAF0F4;
    overflow: auto;
    
  }
  .engineerTables .lczTable th,.lczTable td{
    height: 48px;
    border:1px solid #EAF0F4;
    text-align: center;
  }
  .engineerTables .lczTable th:nth-child(1),.lczTable th:nth-child(2),
  .engineerTables .lczTable th:nth-child(3),.lczTable th:nth-child(4){
    width: 22%;
  }
  .engineerTables .lczTable th:nth-child(5){
    width: 12%;
  }
  .engineerTables .lczTable th:nth-child(5):hover{
    background-color: #5eB2FF;
    color: white;
    cursor: pointer;
     width: 12%;
   }
  .engineerTables .tableContentBottm{
    position:absolute;
    right:26px;
    bottom:12px;
  }

  .engineerTables .el-table .success-row {
    background: #FBF0F1;
  }
  .engineerTables .tableContent .el-date-editor.el-input, .el-date-editor.el-input__inner{
    width: 100% !important;
  }
</style>
