<template>
  <div class="integrateLineTables">
    <div class="TableBorder">
      <div class="TableHeader">
        <span class="headerContentLeft"> 集电线路工程日历记录表</span>
      </div>
      <div class="tableContent">
        <div class="tableContentInner">
          <table class="lczTable">
            <thead>
            <tr>
              <th>塔基编号</th>
              <th>所属线路</th>
              <th>基础开挖</th>
              <th>基础浇筑</th>
              <th>塔材组立</th>
              <th @click="addLine"> 添加</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item,index) in constructionList" :key="index">
              <td>
                <el-input v-model="item.fdTowerNumber" size="mini" placeholder="请输入内容" style="width: 75%"></el-input>
              </td>
              <td>
                <el-select v-model="item.fdTowerSubordinateLine" size="mini" placeholder="请选择" class="aaa">
                  <el-option v-for="item1 in lineList" :key="item1" :label="item1" :value="item1" class="bbb">
                  </el-option>
                </el-select>
              </td>
              <td>
                <el-date-picker
                  v-model="item.fdFoundationExcavationDate"
                  type="date"
                  size="mini"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期">
                </el-date-picker>
              </td>
              <td>
                <el-date-picker
                  v-model="item.fdFoundationPouringDate"
                  type="date"
                  size="mini"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期">
                </el-date-picker>
              </td>
              <td>
                <el-date-picker
                  v-model="item.fdPagodaDate"
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
    </div>
  </div>
</template>
<script>
    export default {
        data() {
            return {
              constructionSize:7,
              constructionCurrentPage:1,
              constructionTotal:0,
              constructionList:[
                {
                  fdTowerNumber:"",
                  fdTowerSubordinateLine:"",
                  fdFoundationExcavationDate:"",
                  fdFoundationPouringDate:"",
                  fdPagodaDate:"",
                  
                }
              ],
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
            };
        },
        methods: {
          addLine(){
            var json={
              fdTowerNumber:"",
              fdTowerSubordinateLine:"",
              fdFoundationExcavationDate:"",
              fdFoundationPouringDate:"",
              fdPagodaDate:"",  
            };
            this.constructionList.push(json);
          },
          undateRow(item){
            var _this=this;
            if(!item.fdTowerId){
              var params={
              fdProid:'167',
              fdTowerNumber:item.fdTowerNumber,
              fdTowerSubordinateLine:item.fdTowerSubordinateLine,
              fdFoundationExcavationDate:item.fdFoundationExcavationDate,
              fdFoundationPouringDate:item.fdFoundationPouringDate,
              fdPagodaDate:item.fdPagodaDate,  
              fdStageName:5
              };
              this.$http.post('/engineer/addTheTowerTable', params)
                .then(res => {
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
              var params={
              fdProid:'167',
              fdTowerNumber:item.fdTowerNumber,
              fdTowerSubordinateLine:item.fdTowerSubordinateLine,
              fdFoundationExcavationDate:item.fdFoundationExcavationDate,
              fdFoundationPouringDate:item.fdFoundationPouringDate,
              fdPagodaDate:item.fdPagodaDate,  
              fdStageName:5,
              fdTowerId:item.fdTowerId
              };
              this.$http.post('/engineer/updateTheTowerTable', params)
                .then(res => {
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
              fdTowerId:item.fdTowerId
            };
            var _this=this;
            this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.$http.post('/engineer/deleteTheTowerTable', params)
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
              fdProid:'167',
              pageSize:this.constructionSize,
              pageNum:this.constructionCurrentPage,
              //splitPage:true
            }
             this.$http.post('/engineer/selectTheTowerTable', params)
              .then(res => {
                _this.constructionList=res.data.data.list;
                _this.constructionTotal=res.data.data.total;
              }).catch(err => {
              console.log("数据请求失败")
            })
          },
        },
        mounted: function () {
          this.getConstructionList();
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
  .integrateLineTables .TableBorder{
    border: 1px solid #EAF0F4;
  }
  .integrateLineTables .TableHeader{
    height: 50px;
    background-color:#F9FAFB;
    position: relative;
  }
  .integrateLineTables .headerContentLeft{
    position: absolute;
    font-size: larger;
    font-weight: bold;
    margin-top: 12px;
    margin-left: 13px;
  }
  .integrateLineTables .tableContent{
    width: 100%;
    height: 443px;
    border: 1px solid #EAF0F4;
    position: relative;
  }
  .integrateLineTables .tableContentInner{
    width: 100%;
    height: 390px;
    overflow-y:auto;
  }
  .integrateLineTables .lczTable{
    width: 100%;
    border:1px solid #EAF0F4;
    overflow: auto;
    
  }
  .integrateLineTables .lczTable th,.lczTable td{
    width: 18%;
    height: 48px;
    border:1px solid #EAF0F4;
    text-align: center;
  }
  .integrateLineTables .lczTable th:nth-child(1),.lczTable th:nth-child(2),
  .integrateLineTables .lczTable th:nth-child(3),.lczTable th:nth-child(4){
    width: 18%;
  }
  .integrateLineTables .lczTable th:nth-child(5){
    width: 18%;
  }
  .integrateLineTables .lczTable th:nth-child(6):hover{
    background-color: #5eB2FF;
    color: white;
    cursor: pointer;
    width: 18%;
   }
  .integrateLineTables .tableContentBottm{
    position:absolute;
    right:26px;
    bottom:12px;
  }
  .integrateLineTables .el-input--mini .el-input__inner {
    text-align: center;
    height: 28px;
    line-height: 28px;
  }
  .integrateLineTables .el-table .success-row {
    background: #FBF0F1;
  }
  .integrateLineTables .tableContent .el-date-editor.el-input, .el-date-editor.el-input__inner{
    width: 75% !important;
  }
</style>
<style scoped>
  .el-select-dropdown__item {
      margin-left: 50px
  }
</style>

