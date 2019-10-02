<template>
  <div class="studio">
      <div class="maps" style="clear: both;">
          <div class="mapapi" v-loading="loadings" element-loading-text="拼命加载中"  element-loading-spinner="el-icon-loading"   element-loading-background="rgba(0, 0, 0, 0.8)">
            <div class="list" id="listbody">
              <div class="add">
                <el-button type="primary" icon="el-icon-plus" size="mini" @click="goAddModel('','add')">新增</el-button>
              </div>
              <div class="visual" :style="{height:listbodyHeight+'px'}">
                   <el-table
                    :data="areaList"
                    style="width: 100%"
                    >
                    <el-table-column
                      prop="fdName"
                      :show-overflow-tooltip="true"
                      label="项目名称">
                    </el-table-column>
                     <el-table-column
                       prop="fdProCapacity"
                       :show-overflow-tooltip="true"
                       label="项目容量">
                     </el-table-column>
                    <el-table-column
                      prop="fdBeginTime"
                      :show-overflow-tooltip="true"
                      label="开工年份">
                      <template slot-scope="scope">
                        <div>
                          {{scope.row.fdBeginTime?new Date(scope.row.fdBeginTime).getFullYear():""}}
                        </div>
                      </template>
                    </el-table-column>

                    <el-table-column
                      prop="fdEngineeringArea"
                      :show-overflow-tooltip="true"
                      label="所属片区">
                      <template slot-scope="scope">
                        <div>
                          {{scope.row.fdEngineeringArea?gineeringArea[scope.row.fdEngineeringArea-1]:""}}
                        </div>
                      </template>
                    </el-table-column>

                    <el-table-column
                      prop="buildLevel"
                      :show-overflow-tooltip="true"
                      label="建设程度">
                      <template slot-scope="scope">
                        <div>
                          {{scope.row.buildLevel?construction[scope.row.buildLevel-1]:""}}
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="fdProjectType"
                      :show-overflow-tooltip="true"
                      label="项目类型">
                      <template slot-scope="scope">
                          <div>
                            {{scope.row.fdProjectType?mold[scope.row.fdProjectType-1]:""}}
                          </div>
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="fdProjectClass"
                      :show-overflow-tooltip="true"
                      label="项目分类">
                      <template slot-scope="scope">
                        <div>
                          {{scope.row.fdProjectClass?classification[scope.row.fdProjectClass-1]:""}}
                        </div>
                      </template>
                    </el-table-column>

                    <el-table-column
                      prop="fdProjectTerrain"
                      :show-overflow-tooltip="true"
                      label="项目地形">
                      <template slot-scope="scope">
                        <div>
                          {{scope.row.fdProjectTerrain?projectterrain[scope.row.fdProjectTerrain-1]:""}}
                        </div>
                      </template>
                    </el-table-column>

                     <el-table-column
                       prop="fdPackageModel"
                       :show-overflow-tooltip="true"
                       label="承发包模式">
                       <template slot-scope="scope">
                         <div>
                           {{scope.row.fdPackageModel?contracting[scope.row.fdPackageModel-1]:""}}
                         </div>
                       </template>
                     </el-table-column>
                     <!--
                     <el-table-column
                       prop="tbFanTypeEntity"
                       :show-overflow-tooltip="true"
                       label="基础类型">
                       <template slot-scope="scope">
                         <div>
                           {{scope.row.tbFanTypeEntity[0]?thebasetype[scope.row.tbFanTypeEntity[0].fdBasicType-1]:""}}
                         </div>
                       </template>
                     </el-table-column>
                     &lt;!&ndash;<el-table-column
                       prop="mast"tbFanTypeEntity
                       :show-overflow-tooltip="true"
                       label="塔筒">
                     </el-table-column>&ndash;&gt;
                     <el-table-column
                       prop="tbFanTypeEntity"
                       :show-overflow-tooltip="true"
                       label="轮毂高度">
                       <template slot-scope="scope">
                         <div>
                           {{scope.row.tbFanTypeEntity[0]?contourheight[scope.row.tbFanTypeEntity[0].fdHubHeight-1]:""}}
                         </div>
                       </template>
                     </el-table-column>-->
                     <el-table-column
                       prop="fdWindResourceArea"
                       :show-overflow-tooltip="true"
                       label="风资源区域">
                       <template slot-scope="scope">
                         <div>
                           {{scope.row.fdWindResourceArea?resourcearea[scope.row.fdWindResourceArea-1]:""}}
                         </div>
                       </template>
                     </el-table-column>
                    <el-table-column
                      label="操作"
                      :show-overflow-tooltip="true"
                      width="220">
                      <template slot-scope="scope">
                        <!--
                        <el-button
                          @click.native.prevent="goAddModel(scope, 'detail')"
                          type="text"
                          size="small">
                          详情
                        </el-button>
                        <el-button
                          @click.native.prevent="goAddModel(scope, 'update')"
                          type="text"
                          size="small">
                          编辑
                        </el-button>
                        <el-button
                          @click.native.prevent="deleteRow(scope.$index)"
                          type="text"
                          :disabled="true"
                          size="small">
                          删除
                        </el-button>-->
                        <div class="buttonCss" @click="goAddModel(scope, 'detail')">
                          <span style="color:#39aef9;font-size: smaller;">详情</span>
                        </div>
                        <div class="buttonCss" @click="goAddModel(scope, 'update')">
                          <span style="color:#39aef9;font-size: smaller;">编辑</span>
                        </div>
                        <div  style="pointer-events: none;" class="delButtonCss" @click="deleteRow(scope.$index)">
                          <span style="color:rgb(195,211,234);font-size: smaller;">删除</span>
                        </div>
                      </template>
                    </el-table-column>
                  </el-table>
                  <div class="block">
                  <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[7, 10, 15]"
                    :page-size="size"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
                  </el-pagination>
                </div>
              </div>
            </div>
          </div>
      </div>
    <div>
      <add-model v-if="modelAttr.showModel"></add-model>
      <add-models v-if="modelAttr.showModels"></add-models>
    </div>
  </div>
</template>
<script>
  import addModel from '@/components/common/model/addModel';
  import addModels from '@/components/common/model/addModels';
  export default {
    components: {
      "add-model":addModel,
      "add-models":addModels,
    },
    data() {
      return {
        loadings:true,
        listbodyHeight:0,
        modelAttr:{
          title:"",
          showModel:false,
          showModels:false,
          type:"",
          rowId:"",
          iDstate:""
        },
        currentPage: 1,
        size: 7,
        total: 0,
        districts:"",       //片区id
        annual:"",          //年份
        checkedCities1:"",  //建设程度
        projects:"",        //项目名称
        areaList:[],
        pageNum:1,
        pageSize:10,
        construction:[  //建设状态(建设程度)
          "未开工",
          "建设中",
          "倒送电",
          "移交生产",
          "竣工验收"
           ],
        gineeringArea:[  //工程大区
          "工程一区",
          "工程二区",
          "工程三区",
          "工程四区"
           ],
        mold:[      //项目类型
          "风电项目",
          "光伏项目",
          "分散式风电项目",
          "分布式光伏项目",
          "海上风电项目",
          "屋顶光伏项目"
        ],
        resourcearea:[      //风资源区域
          "Ⅰ类",
          "Ⅱ类",
          "Ⅲ类",
          "Ⅳ类"
          ],
        subordinate:[//所属公司
         "华北分公司",
          "西北分公司",
          "华东分公司",
          "南方分公司"
        ],
        thebasetype:[   //基础类型
          "PH基础",
          "锚栓式基础",
          "重力式拓展基础",
          "梁板式基础",
          "高台柱式基础",
          "桩承台基础",
          "浮筒式无张力基础",
          "预制装配式基础",
          "混合塔架抬高式基础"
        ],
        contourheight:[   //轮廓高度
            "钢塔75m",
            "钢塔80m",
            "钢塔85m",
            "钢塔90m",
            "钢塔95m",
            "钢塔100m",
            "钢塔105m",
            "钢塔110m",
            "钢塔115m",
            "钢塔120m",
            "钢塔125m",
            "钢塔130m",
            "钢塔135m",
            "钢塔140m",
            "柔塔120m",
            "柔塔125m",
            "柔塔130m",
            "柔塔135m",
            "柔塔140m",
            "柔塔145m",
            "混塔100m",
            "混塔110m",
            "混塔120m",
            "混塔140m",
            "混塔160m",
            "混塔168m",
            "分片式钢塔120m",
            "分片式钢塔130m",
            "分片式钢塔140m",
            "分片式钢塔150m"
        ],
        classification:[  //项目类别
          "新建项目",
          "结转项目",
          "扩建项目",
          ],
        projectterrain:[    //项目地形
          "山地",
          "丘陵",
          "平原",
          "海上",
          "林地",
          "基本农田",
          "荒地",
           "滩涂",
           "草原",
           "鱼塘",
           "山地+丘陵",
          "平原+丘陵",
           "林地+草地",
          "林地+基本农田",
           "林地+荒地",
           "基本农田+荒地",
           "基本农田+草原",
           "平原+林地",
           "平原+基本农田",
           ],
        contracting:[ //承发包模式
         "施工总承包",
         "EPC总承包",
         "PC总承包",
         "平行发包",
         "合资合作"
        ],
      };
    },
    methods: {
      deleteRow(index){
        var _this=this;
        this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
           this.$http.post('/engineer/delPro', {fdProid:this.areaList[index].fdProid})
          // this.$http.post('delPro', {fdProid:this.areaList[index].fdProid})
            .then(res => {
              this.$notify({
                title: '成功',
                message: '删除成功',
                type: 'success'
              });
              _this.tableDataList();
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
      tableDataList(){   //查询后回显详情
        var _this=this;
        var params={
          fdRegionid:_this.$parent.districts,          //区域id
          yearDate:this.$parent.annual?new Date(this.$parent.annual).getFullYear():"",               //年
          fdBuildLevel:_this.$parent.checkedCities1,   //建设程度
          fdName:_this.$parent.projects ,               //项目名称
          pageSize:this.size,
          pageNum:this.currentPage,
          splitPage:true
        }
        //proview/
         this.$http.post('/engineer/getConditionsPro', params)
        // this.$http.post('getConditionsPro', params)
          .then(res => {
            let Do=res.data.data.list;
            for(var i=0;i<Do.length;i++){
              if(Do[i]){
                Do[i].fdProCapacity=Do[i].fdProCapacity+"MW";
              }else{
                Do[i];
                return
              }
            }
            _this.areaList=Do;
            _this.loadings=false;
            _this.total=res.data.data.total;
          }).catch(err => {
          console.log("数据请求失败")
        })
      },

      goAddModel(index,type){
        if(type=="add"){
            this.modelAttr.title="新增";
            this.modelAttr.showModel=true;
            this.modelAttr.type=type;
        }else if(type=="update"){
            this.modelAttr.title="编辑";
            this.modelAttr.showModel=true;
            this.modelAttr.type=type;
            this.modelAttr.rowId=index.row.fdProid;
            this.modelAttr.iDstate=1;
        }else if(type=="detail"){
           this.modelAttr.title="查看详情";
           this.modelAttr.showModels=true;
           this.modelAttr.type=type;
           this.modelAttr.rowId=index.row.fdProid;
           this.modelAttr.iDstate=1;
        }

      },
      handleSizeChange: function (val) {
        var _this = this;
        _this.size = val;
        _this.tableDataList();
      },
      handleCurrentChange: function (val) {
        var _this = this;
        _this.currentPage = val;
        _this.tableDataList();
      },
    },
    mounted:function(){
      this.listbodyHeight=document.getElementById("listbody").offsetHeight-110;
      console.log(this.listbodyHeight);
      this.tableDataList();
    }
  };
</script>
<style scoped>
.studio{
  height:100%;
}
.maps{
  width:100%;
  height: 100%;
}
.mapapi{
    width:99.4%;
    height: 100%;
    padding: 4px;
    margin: 9px 5px;
    background: url("./image/group41.png");
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
  .add{
    width: 100%;
    height:60px;
    line-height: 60px;
  }
   .visual{
    width:100%;
    /* height:87%; */
    overflow-y:auto;
  }
  .add button{
    background-color: #39aef9;
    margin-left: 60px;
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
</style>
