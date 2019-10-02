<template>
  <div class="fanConstructionTables">
    <div class="tableHeader">风机安装施工记录表</div>
    <div class="tableContent">
      <div class="tableContentInner">
        <el-table :data="fanConstructionList" :empty-text="emptytMsg" style="width: 99%"  height="400" :row-class-name="tableRowClassName">
          
          <el-table-column fixed label="风机编号" width="150">
            <template slot-scope="props">
              <el-input size="mini" placeholder="请输入内容" v-model="props.row.fdFanNumber" :disabled="true"></el-input>
            </template>
          </el-table-column>

          <el-table-column fixed label="所属线路" width="150">
            <template slot-scope="props">
              <el-select size="mini" placeholder="请选择" v-model="props.row.fdSubordinateLine" :disabled="true" >
              </el-select>
            </template>
          </el-table-column>

          <el-table-column label="轮毂高度" width="129">
            <template slot-scope="props">
              <el-select v-model="props.row.fdHubHeight" size="mini" placeholder="请选择" clearable>
                <el-option v-for="item in hubHeightOptions" :key="item.id" :value="item.text"></el-option>
              </el-select>
            </template>
          </el-table-column>

          <el-table-column label="塔筒吊装底段" width="270">
            <el-table-column label="开始时间" width="135">
              <template slot-scope="props">
                <el-date-picker
                  v-model="props.row.fdTowerBottomHoistingStartTime"
                  type="date"
                  size="mini"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期">
                </el-date-picker>
              </template>
            </el-table-column>
            <el-table-column label="完成时间" width="135">
              <template slot-scope="props">
                <el-date-picker
                  v-model="props.row.fdTowerBottomHoistingEndTime"
                  type="date"
                  size="mini"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期">
                </el-date-picker>
              </template>
            </el-table-column>
          </el-table-column>

          <el-table-column label="塔筒吊装顶段" width="270">
            <el-table-column label="开始时间" width="135">
              <template slot-scope="props">
                <el-date-picker
                  v-model="props.row.fdTowerTopHoistingStartTime"
                  type="date"
                  size="mini"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期">
                </el-date-picker>
              </template>
            </el-table-column>
            <el-table-column label="完成时间" width="135">
              <template slot-scope="props">
                <el-date-picker
                  v-model="props.row.fdTowerTopHoistingEndTime"
                  type="date"
                  size="mini"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期">
                </el-date-picker>
              </template>
            </el-table-column>
          </el-table-column>

          <el-table-column label="机组吊装" width="135">
            <template slot-scope="props">
                <el-date-picker
                  v-model="props.row.fdUnitHoistingTime"
                  type="date"
                  size="mini"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期">
                </el-date-picker>
              </template>
          </el-table-column>

          <el-table-column label="叶片吊装" width="135">
            <template slot-scope="props">
              <el-date-picker
                v-model="props.row.fdVaneHoistingTime"
                type="date"
                size="mini"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                placeholder="选择日期">
              </el-date-picker>
            </template>
          </el-table-column>

          <el-table-column prop="singleStageHoistingPeriod" label="单台吊装工期"></el-table-column>

          <el-table-column label="风机调试" width="270">
            <el-table-column label="静态调试" width="135">
              <template slot-scope="props">
              <el-date-picker
                v-model="props.row.fdFanDebugStatic"
                type="date"
                size="mini"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                placeholder="选择日期">
              </el-date-picker>
            </template>
            </el-table-column>
            <el-table-column prop="name" label="动态调试" width="135">
              <template slot-scope="props">
              <el-date-picker
                v-model="props.row.fdFanDebugDynamic"
                type="date"
                size="mini"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                placeholder="选择日期">
              </el-date-picker>
            </template>
            </el-table-column>
          </el-table-column>

          <el-table-column label="箱变基础" width="270">
            <el-table-column label="基础浇筑" width="135">
              <template slot-scope="props">
              <el-date-picker
                v-model="props.row.fdFoundationPourings"
                type="date"
                size="mini"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                placeholder="选择日期">
              </el-date-picker>
            </template>
            </el-table-column>
            <el-table-column label="箱变安装" width="135">
              <template slot-scope="props">
              <el-date-picker
                v-model="props.row.fdBoxVariableInstallation"
                type="date"
                size="mini"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                placeholder="选择日期">
              </el-date-picker>
            </template>
            </el-table-column>
          </el-table-column>

          <el-table-column prop="singleConstructionPeriod" label="单台施工工期"></el-table-column>
          
          <el-table-column label="操作" width="60" fixed="right">
            <template slot-scope="props">
              <i style="cursor: pointer;" class="el-icon-check" @click="save(props.row)"></i>
            </template>
          </el-table-column>
        </el-table>
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
</template>

<script>
import { hubHeightOptions } from '../../../../utils/json'
import { format } from '../../../../utils'
  export default {
    name: 'fanConstructionTables',
    data() {
      return {
        projectId: '',
        emptytMsg: '暂无数据',
        constructionCurrentPage: 1, //当前页数
        constructionSize: 7, //每页显示条目
        constructionTotal: 0,
        fanConstructionList: [],
        hubHeightOptions: hubHeightOptions
      }
    },
    mounted: function() {
      this.projectId = JSON.parse(this.$route.query.mapData).fdProid;
      this.getFanConstructionList()
    },
    methods: {
      tableRowClassName({row, rowIndex}) {
        for (var value in row) {
          if (row[value] == '' || row[value] == null) {
            // return 'warning-row';
          }
        }
      },
      getFanConstructionList() {
        let params = {
          fdProid: this.projectId,
          pageNum: this.constructionCurrentPage,
          pageSize: this.constructionSize,
          splitPage: true
        }
        this.$http.post('/engineer/getFanConstructionByProId', params)
          .then((res) => {
            res && res.data.status == 200 ? (this.constructionTotal = res.data.data.total,this.fanConstructionList = res.data.data.list) : this.prompt('获取数据失败', 'error')
          }, (err) => {
            this.prompt(err.message, 'error')
          })
      },
      constructionHandleSizeChange(val) {
        this.constructionSize = val
        this.getFanConstructionList()
      },
      constructionHandleCurrentChange(val) {
        this.constructionCurrentPage = val
        this.getFanConstructionList()
      },
      save(data) {
        let params = Object.assign({}, data, {
          yearMonthDate:format(new Date().getTime(), 'yyyy-mm-dd'),
          fdProid: this.projectId
        })
        this.$http.post('/engineer/updateFanHoisting', params)
          .then((res) => {
            res && res.data.status == 200 ? (this.prompt('保存成功', 'success'),this.getFanConstructionList()) : this.prompt('获取数据失败', 'error')
          }, (err) => {
            this.prompt(err.message, 'error')
          })
      }
    }
  };
</script>

<style lang='less'>
  .fanConstructionTables{
    width: 99%;
    height: 100%;
    border: 1px solid #EAF0F4;
    .el-table .warning-row {
      background: oldlace;
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
    .tableHeader{
      height: 50px;
      line-height: 50px;
      font-weight: bold;
      padding-left: 13px;
      background-color:#F9FAFB;
    }
    .tableContentBottm{
      display: flex;
      justify-content: flex-end;
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
    .tableContentBottm{
      padding: 10px 0;
    }
  }
</style>
