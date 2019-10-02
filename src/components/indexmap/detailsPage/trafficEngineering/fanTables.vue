<template>
  <div class="fanTables">
    <div class="rightTableBorder">
      <div class="TableHeader">
        <span class="headerContentLeft"> 风机基础工程施工记录表</span>
      </div>
      <div class="tableContent">
        <el-table :data="constructionList" :empty-text="emptytMsg" height="443" border align="center">
          
          <el-table-column fixed label="风机编号" min-width="125px">
            <template slot-scope="props">
              <el-input v-model="props.row.fdFanNumber" size="mini" placeholder="请输入内容" :disabled="true"></el-input>            
            </template>
          </el-table-column>

          <el-table-column fixed label="所属线路" min-width="125px">
            <template slot-scope="props">
              <el-select v-model="props.row.fdSubordinateLine" size="mini" placeholder="请选择" :disabled="true" clearable>
                <el-option v-for="item1 in lineList" :key="item1" :label="item1" :value="item1">
                </el-option>
              </el-select>
            </template>
          </el-table-column>

          <el-table-column label="风机机型" min-width="125px">
            <template slot-scope="props">
              <el-select v-model="props.row.fdSubordinateLine222" size="mini" placeholder="请选择" clearable>
                <el-option v-for="item1 in lineList1" :key="item1" :label="item1" :value="item1"></el-option>
              </el-select>
            </template>
          </el-table-column>

          <el-table-column label="基础类型" min-width="125px">
            <template slot-scope="props">
              <el-select v-model="props.row.fdBasicType" size="mini" placeholder="请选择" clearable>
                <el-option v-for="item1 in lineList2" :key="item1" :label="item1" :value="item1"></el-option>
              </el-select>
            </template>
          </el-table-column>

          <el-table-column label="基坑开挖" min-width="135">
            <template slot-scope="props">
              <el-date-picker
                v-model="props.row.fdPitExcavation"
                type="date"
                size="mini"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                placeholder="选择日期">
              </el-date-picker>
            </template>
          </el-table-column>

          <el-table-column label="地基处理" min-width="135">
            <template slot-scope="props">
              <el-date-picker
                v-model="props.row.fdFoundationTreatment"
                type="date"
                size="mini"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                placeholder="选择日期">
              </el-date-picker>
            </template>
          </el-table-column>

          <el-table-column label="垫层浇筑" min-width="135">
            <template slot-scope="props">
              <el-date-picker
                v-model="props.row.fdCushionPouring"
                type="date"
                size="mini"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                placeholder="选择日期">
              </el-date-picker>
            </template>
          </el-table-column>

          <el-table-column label="钢筋绑扎" min-width="135">
            <template slot-scope="props">
              <el-date-picker
                v-model="props.row.fdBarBinding"
                type="date"
                size="mini"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                placeholder="选择日期">
              </el-date-picker>
            </template>
          </el-table-column>

          <el-table-column label="模板安装" min-width="135">
            <template slot-scope="props">
              <el-date-picker
                v-model="props.row.fdTemplatesInstalling"
                type="date"
                size="mini"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                placeholder="选择日期">
              </el-date-picker>
            </template>
          </el-table-column>

          <el-table-column label="基础浇筑" min-width="135">
            <template slot-scope="props">
              <el-date-picker
                v-model="props.row.fdFoundationPouring"
                type="date"
                size="mini"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                placeholder="选择日期">
              </el-date-picker>
            </template>
          </el-table-column>

          <el-table-column label="操作" width="60" fixed="right">
            <template slot-scope="props">
              <i style="cursor: pointer;" class="el-icon-check" @click="undateRow(item)"></i>
            </template>
          </el-table-column>

        </el-table>    
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
       <!-- <div>
         <reason-model v-if="reasonModelAttr.showModel"></reason-model>
       </div> -->
    </div>
  </div>
</template>

<script>
 
  //import reasonModel from '@/components/indexmap/detailsPage/trafficEngineering/models/reasonModel';
    export default {
      components: {
       // "reason-model":reasonModel
      },
        data() {
            return {
              // reasonModelAttr:{
              //   showModel:this.$parent.$parent.$parent.unconstructionItem?true:false,
              //   title:"工程量补录"
              // },
              emptytMsg: '暂无数据',
              constructionSize:7,
              constructionCurrentPage:1,
              constructionTotal:0,
              constructionList:[
                {
                  fdFanNumber:"",
                  fdSubordinateLine:"",
                  fdSubordinateLine2222222:"",
                  fdBasicType:"",
                  fdFoundationPouring:"",
                  fdTemplatesInstalling:"",
                  fdPitExcavation:"",
                  fdBarBinding:"",
                  fdFoundationTreatment:"",
                  fdCushionPouring:""
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
               lineList1:[
                "GW82/1500",
                "GW87/1500",
                "GW93/1500",
                "GW115/2000",
                "GW115/2500",
                "GW121/2000",
                "GW121/2500",
                "GW121/2750",
                "GW130/2500",
                "GW131/2000",
                "GW131/2200",
                "GW131/2500",
                "GW136/3000",
                "GW136/4200",
                "GW140/2500",
                "GW140/3000",
                "GW155/3000",
                "GW155/3300",
              ],
               lineList2:[
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
            };
        },
        methods: {
          undateRow(item){
            var _this=this;
              
              var params = {
                fdFanid:item.fdFanid,
                fdProid:item.fdProid,
                fdWindfieldid:item.fdWindfieldid,
                fdFanNumber:item.fdFanNumber,
                fdSubordinateLine:item.fdSubordinateLine,
                fdThroughTime:item.fdThroughTime,
                fdExcavation:item.fdExcavation,
                fdBasicType:item.fdBasicType,
                fdFoundationPouring:item.fdFoundationPouring,
                fdTemplatesInstalling:item.fdTemplatesInstalling,
                fdPitExcavation:item.fdPitExcavation,
                fdBarBinding:item.fdBarBinding,
                fdFoundationTreatment:item.fdFoundationTreatment,
                fdCushionPouring:item.fdCushionPouring,
                //fdFanid:item.fdFanid,
              }
              this.$http.post('/engineer/updateConstructionRecord', params)
                .then(res => {
                  //console.log(res.data,'123')
                  if(res.data.data.status == 200){
                    _this.$notify({
                      title: '成功',
                      message: '编辑成功',
                      type: 'success'
                    });
                    _this.getFanTableList();
                  }else if(res.data.data.status == 500){
                    _this.$notify.error({
                      title: '错误',
                      message: '编辑失败,修改风机日期无效，不在现进行分段计划内'
                    });
                  }
                }).catch(err => {
                _this.$notify.error({
                  title: '错误',
                  message: '编辑失败'
                });
                console.log("数据请求失败")
              })
          },
          constructionHandleSizeChange: function (val) {
            var _this = this;
            _this.constructionSize = val;
            _this.getFanTableList();
          },
          constructionHandleCurrentChange: function (val) {
            var _this = this;
            _this.constructionCurrentPage = val;
            _this.getFanTableList();
          },
          getFanTableList(){   //查询后回显详情
            var _this=this;
            var params={
              fdProid:this.$parent.$parent.$parent.popData.fdProid,
              pageSize:this.constructionSize,
              pageNum:this.constructionCurrentPage,
              splitPage:true
            }
             this.$http.post('/engineer/selectConstructionRecord', params)
              .then(res => {
                _this.constructionList=res.data.data.list;
              
                _this.constructionTotal=res.data.data.total;
              }).catch(err => {
              console.log("数据请求失败")
            })
          },
        },
        mounted: function () {
          this.getFanTableList();
        },
      watch:{
      }
    }
</script>

<style lang="less">
  .fanTables{
    .leftTableBorder{
      width: 48%;
      border: 1px solid #EAF0F4;
      float: left
    }
    .rightTableBorder{
      width: 99%;
      border: 1px solid #EAF0F4;
      float: left;
      margin-left:0%;
    }
    .TableHeader{
      height: 50px;
      background-color:#F9FAFB;
      position: relative;
    }
    .headerContentLeft{
      position: absolute;
      font-size: larger;
      font-weight: bold;
      margin-top: 12px;
      margin-left: 13px;
    }
    .tableContent{
      width: 100%;
      height: 443px;
      border: 1px solid #EAF0F4;
      position: relative;
    }
    .tableContentInner{
      width: 100%;
      height: 443px;
      overflow-y:auto;
    }
    .tableContentBottm{
      position:absolute;
      right:26px;
      bottom:12px;
    }
    .el-table .cell{
      padding: 0 3px 0 3px
    }
    .el-table thead.is-group th{
      background-color: #fff;
      text-align: center;
    }
    .el-table th, .el-table td{
      text-align: center;
      padding: 10px 0;
    }
    .el-date-editor.el-input{
      width: 128px;
    }
    .el-input--mini .el-input__inner{
      width: 100%;
    }   
    .el-icon-check:hover{
      color: #409EFF
    }
    .el-table--border td:first-child .cell{
      padding-left: 3px;
    }
    // .el-input--suffix .el-input__inner{
    //   padding-right: 28px;
    // }
  }
  
</style>
