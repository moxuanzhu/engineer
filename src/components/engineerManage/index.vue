<template>
  <div class="manage_car">

    <div class="search">
      <el-form :inline="true"  class="demo-form-inline">
        <el-form-item label="项目名称:">
          <el-input  placeholder="请输入项目名称" v-model="search.name"></el-input>
        </el-form-item>

        <el-form-item label="月报时间:">
          <el-date-picker
            type="month"
            v-model="search.time"
            value-format="yyyy-MM"
            @change="getList()"
            :picker-options="selectPickerOptions"
            placeholder="选择月报月份">
          </el-date-picker>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="getList">查询</el-button>
        </el-form-item>

        <el-form-item>
          <el-button type="" @click="resetlist">重置</el-button>
        </el-form-item>

        <el-form-item style="float:right;margin-right:20px;">
          <el-button type="primary" @click="addBtnopen">新增项目车辆信息</el-button>
          <el-button type="primary" @click="exportExcel">导出excel</el-button>
        </el-form-item>

      </el-form>
    </div>

    <div class="manage_list">
      <div class="carReport">
        <div class="manage_title">
          <span>车辆月度报表&nbsp;{{search.time}}月</span>
        </div>

        <div class="list_wrap">
          <el-table
            :data="tableData"
            height="400"
            stripe
            border
          >
            <el-table-column
              prop="proName"
              label="项目名称"
              fixed
              :show-overflow-tooltip="true"
              width="150">
            </el-table-column>

            <el-table-column
              label="所属工程大区"
              width="120">
              <template slot-scope="scope">
                <span v-if="scope.row.proBigArea==item.id" v-for="item in EngineerIntervalList" :key="item.id">{{item.value}}</span>
              </template>
            </el-table-column>

            <el-table-column
              prop="driverName"
              width="80"
              label="司机姓名">
            </el-table-column>

            <el-table-column
              prop="driverPhone"
              label="电话"
              width="120">
            </el-table-column>

            <el-table-column
              label="司机类型"
              width="100">
              <template slot-scope="scope">
                <span v-if="scope.row.driverType==item.value" v-for="item in driverType" :key="item.value">{{item.label}}</span>
              <!--<el-select  placeholder="请选择司机类型" v-model="scope.row.driverType">-->
                <!--&lt;!&ndash;<el-option :label="item.label" :value="item.value" v-for="item in driverType"></el-option>&ndash;&gt;-->
                <!--<span v-if="scope.row.driverType==1">内部员工</span>-->
                <!--<span v-if="scope.row.driverType==2">外聘员工</span>-->
              <!--</el-select>-->
              </template>
            </el-table-column>

            <el-table-column
              width="100"
              label="车型">
              <template slot-scope="scope">
                <!--<el-select  placeholder="请选择车型" v-model="scope.row.carType">-->
                  <!--<el-option :label="item.label" :value="item.value" v-for="item in bordType"></el-option>-->
                <!--</el-select>-->
                <span v-if="scope.row.carType==item.value" v-for="item in bordType" :key='item.label'>{{item.label}}</span>
              </template>
            </el-table-column>

            <el-table-column
              width="70"
              label="排气量">
              <template slot-scope="scope">
                <!--<el-select  placeholder="请选择排气量" v-model="scope.row.carGas">-->
                  <!--<el-option :label="item.label" :value="item.value" v-for="item in carType"></el-option>-->
                <!--</el-select>-->
                <span v-if="scope.row.carGas==item.value"  v-for="item in carType" :key="item.value">{{item.label}}</span>
              </template>
            </el-table-column>

            <el-table-column
              label="车牌号"
              width="90">
              <template slot-scope="scope">
                <!--<el-input  placeholder="请输入内容" v-model="scope.row.carNumber"></el-input>-->
                <span>{{scope.row.carNumber}}</span>
              </template>
            </el-table-column>

            <el-table-column
              label="里程起数(公里)">
              <template slot-scope="scope">
                <el-tooltip class="item" effect="dark" :content="scope.row.carCourseStart+''" placement="top-start">
                  <el-input  placeholder="请输入内容" v-model="scope.row.carCourseStart" :disabled="inputShow"></el-input>
                </el-tooltip>
              </template>
            </el-table-column>

            <el-table-column
              label="里程止数(公里)">
              <template slot-scope="scope">
                <el-tooltip class="item" effect="dark" :content="scope.row.carCourseEnd+''" placement="top-start">
                  <el-input placeholder="请输入内容" v-model="scope.row.carCourseEnd" :disabled="inputShow"></el-input>
                </el-tooltip>
              </template>
            </el-table-column>

            <el-table-column
              label="本月里程数(公里)"
              prop="monthTotalCourse">
            </el-table-column>

            <el-table-column
              label="燃油费(元)">
              <template slot-scope="scope">
                <el-tooltip class="item" effect="dark" :content="scope.row.carGasMoney+''" placement="top-start">
                  <el-input  placeholder="请输入内容" v-model="scope.row.carGasMoney" :disabled="inputShow"></el-input>
                </el-tooltip>
              </template>
            </el-table-column>

            <el-table-column
              label="百公里油耗(XL/100公里)"
              prop="gascut">
            </el-table-column>

            <el-table-column
              label="月油价(元/L)">
              <template slot-scope="scope">
                <el-tooltip class="item" effect="dark" :content="scope.row.gasMonthMoney+''" placement="top-start">
                  <el-input  placeholder="请输入内容" v-model="scope.row.gasMonthMoney" :disabled="inputShow"></el-input>
                </el-tooltip>
              </template>
            </el-table-column>

            <el-table-column
              label="备注"
              width="180">
              <template slot-scope="scope">
                <el-tooltip class="item" effect="dark" :content="scope.row.content+''" placement="top-start">
                  <el-input placeholder="请输入内容" v-model="scope.row.content" :disabled="inputShow"></el-input>
                </el-tooltip>
              </template>
            </el-table-column>

            <el-table-column
              label="操作"
              fixed="right"
              width="100">
              <template slot-scope="scope">
                <span class="saveBtn" @click="savebtn(scope.row)">保存 </span>
                <span class="delBtn" @click="deletebtn(scope.row)">删除</span>
              </template>
            </el-table-column>

          </el-table>

          <div class="page_block">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page.sync="pageNum"
              :page-sizes="[5, 10, 15, 20]"
              :page-size="10"
              layout="total, sizes, prev, pager, next, jumper"
              :total="totolSize">
            </el-pagination>
          </div>
        </div>
      </div>

      <div class="eachrts_wrap">
        <div class="carReport">
          <div class="manage_title">
            百公里油耗分析图&nbsp;{{search.time}}月
          </div>
          <div id="carShow" ref="echartscar"></div>
        </div>
      </div>
    </div>

    <el-dialog title="新增项目车辆信息" :visible.sync="dialogFormVisible" width="600px">
      <div class="dialog_wrap">
        <el-form size="small" :model="addObj" :rules="rules" ref="formName">
          <el-form-item label="项目名称" :label-width="formLabelWidth" prop="projectName" >
            <el-select  filterable placeholder="请选择" class="dialog_wh" v-model="addObj.projectName" @change="getDriver(addObj.projectName)">
              <el-option
                v-for="item in allprojectList"
                :key="item.fdProid"
                :label="item.fdName"
                :value="item.fdProid">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="工程大区" :label-width="formLabelWidth" prop="region">
            <el-input auto-complete="off" class="dialog_wh" v-model="addObj.region" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="司机姓名" :label-width="formLabelWidth" prop="driverName">
            <el-select  placeholder="请选择司机名称" class="dialog_wh" v-model="addObj.driverName" @change="getDriverTel(addObj.driverName)">
              <el-option :label="item.fdPostName" :value="item.fdPostName" v-for="item in drivernameList" :key='item.fdPostName'></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="司机电话" :label-width="formLabelWidth" prop="driverTel">
            <el-select  class="dialog_wh" v-model="addObj.driverTel" :disabled="true">
              <el-option :label="item.fdPostTelephone" :value="item.fdPostTelephone" v-for="item in drivernameList" :key='item.fdPostTelephone'></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="司机类型" :label-width="formLabelWidth" prop="drivertype">
            <el-select  placeholder="请选择司机类型" class="dialog_wh" v-model="addObj.drivertype">
              <el-option :label="item.label" :value="item.value" v-for="item in driverType" :key='item.label'></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="车型" :label-width="formLabelWidth" prop="cartype">
            <el-select  placeholder="请选择车型" class="dialog_wh" v-model="addObj.cartype">
              <el-option :label="item.label" :value="item.value" v-for="item in bordType" :key='item.label'></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="排气量" :label-width="formLabelWidth" prop="exhaust">
            <el-select  placeholder="请选择活车型" class="dialog_wh" v-model="addObj.exhaust">
              <el-option :label="item.label" :value="item.value" v-for="item in carType" :key="item.label"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="牌号" :label-width="formLabelWidth" prop="license">
            <el-input auto-complete="off" class="dialog_wh" v-model="addObj.license"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeDiolog('formName')">取 消</el-button>
        <el-button type="primary" @click="addCarList('formName')">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { format } from "../../utils";
export default {
  data() {
    return {
      // 搜索条件
      search: {
        name: "",
        time: ""
      },
      dialogFormVisible: false, //弹出框
      formLabelWidth: "100px", //label宽度
      driverType: [
        {
          label: "内部员工",
          value: "1"
        },
        {
          label: "外聘员工",
          value: "2"
        }
      ], //司机类型
      bordType: [
        {
          label: "日产奇骏",
          value: "1"
        },
        {
          label: "大众途观",
          value: "2"
        },
        {
          label: "大众途观L",
          value: "3"
        },
        {
          label: "东风皮卡",
          value: "4"
        },
        {
          label: "现代途胜",
          value: "5"
        },
        {
          label: "现代ix35",
          value: "6"
        },
        {
          label: "丰田CRV",
          value: "7"
        },
        {
          label: "丰田RAV4",
          value: "8"
        },
        {
          label: "丰田汉兰达",
          value: "9"
        },
        {
          label: "丰田普拉多",
          value: "10"
        },
        {
          label: "哈弗H5",
          value: "11"
        },
        {
          label: "福特锐界",
          value: "12"
        },
        {
          label: "起亚狮跑",
          value: "13"
        },
        {
          label: "起亚索兰托",
          value: "14"
        },
        {
          label: "大众帕萨特",
          value: "15"
        },
        {
          label: "雷诺科雷傲",
          value: "16"
        },
        {
          label: "三菱欧德兰",
          value: "17"
        },
        {
          label: "起亚途达",
          value: "18"
        },
        {
          label: "别克GL8",
          value: "19"
        },
        {
          label: "别克昂科威",
          value: "20"
        }
      ], //车型列表
      carType: [
        {
          label: "1.6T",
          value: "1"
        },
        {
          label: "1.8T",
          value: "2"
        },
        {
          label: "2.0T",
          value: "3"
        },
        {
          label: "2.2T",
          value: "4"
        },
        {
          label: "2.4T",
          value: "5"
        },
        {
          label: "2.8T",
          value: "6"
        },
        {
          label: "3.0T",
          value: "7"
        },
        {
          label: "2.0",
          value: "8"
        },
        {
          label: "2.4",
          value: "9"
        },
        {
          label: "2.5",
          value: "10"
        },
        {
          label: "3.0",
          value: "11"
        },
        {
          label: "3.5",
          value: "12"
        },
        {
          label: "4.0",
          value: "13"
        },
        {
          label: "4.6",
          value: "14"
        }
      ], //车辆类型
      addObj: {
        projectName: "", //项目名称
        region: "", //工程大区
        driverName: "", //司机姓名
        driverTel: "", //司机电话
        drivertype: "", //司机类型
        cartype: "", //车辆型号
        exhaust: "", //排气量
        license: "" //牌照
      }, //添加的obj
      rules: {
        projectName: [
          //{ required: true, message: '该项不允许为空', trigger: 'change' }
        ],
        region: [{ required: true, message: "该项不允许为空", trigger: "change" }],
        driverName: [
          { required: true, message: "该项不允许为空", trigger: "change" }
        ],
        driverTel: [{ required: true, message: "该项不允许为空", trigger: "change" }],
        drivertype: [
          { required: true, message: "该项不允许为空", trigger: "change" }
        ],
        cartype: [{ required: true, message: "该项不允许为空", trigger: "change" }],
        exhaust: [{ required: true, message: "该项不允许为空", trigger: "change" }],
        license: [{ required: true, message: "该项不允许为空", trigger: "change" }]
      }, //验证规则
      EngineerIntervalList: [
        {
          id: 1,
          value: '工程一区'
        },
        {
          id: 2,
          value: '工程二区'
        },
        {
          id: 3,
          value: '工程三区'
        },
        {
          id: 4,
          value: '工程四区'
        }
      ],
      allprojectList: [], //全部项目信息
      drivernameList: [], //司机姓名list
      tableData: [],
      value: "",
      input: "",
      pageSize: 10, //每页几个
      pageNum: 1, //当前页
      totolSize: 0, //总条数
      echartsData: [],
      echartsXData: [],
      selectPickerOptions: {
        disabledDate(time) {
          return (
            format(time.getTime(), "yyyy-mm") >
            format(new Date().getTime(), "yyyy-mm")
          );
        }
      }
    };
  },
  computed: {
    // 计算属性的 getter
    searchMonth() {
      return format(new Date().getTime(), "yyyy-mm");
    },
    inputShow() {
      return this.search.time != this.searchMonth;
    }
  },
  created() {
    //this.getEchartsData();
  },
  mounted: function() {
    var _this = this;
    //初始化搜索时间
    _this.search.time = _this.searchMonth;
    //获取所有项目的列表
    _this.getAllProject();
    //获取初始化列表
    _this.getList();
  },
  methods: {
    exportExcel() {
      let params = {
        proName: this.search.name,
        carDate: this.search.time
      }
      this.$http.post("/engineer/carJournal/exportCarMonthExcel", params, {
          responseType: 'blob'
      }).then(res => {
          let blob = new Blob([res.data], {
              type: 'application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
          })
          if (window.navigator.msSaveOrOpenBlob) {
              navigator.msSaveBlob(blob);
          } else {
              let elink = document.createElement('a');
              elink.download = "车辆月度报表.xls";
              elink.style.display = 'none';
              elink.href = URL.createObjectURL(blob);
              document.body.appendChild(elink);
              elink.click();
              document.body.removeChild(elink);
          }
      }).catch(err => {
          console.warn(err);
      });

    },
    structureMethod(data) {
      var dataArr = [];
      if (data.length > 0) {
        var size = 0;
        for (var i = 0; i < data.length; i++) {
          var arr = [];
          for (var k = 0; k < size; k++) {
            arr.push("-");
          }
          for (var j = 0; j < data[i].length; j++) {
            size += 1;
            arr.push({
              value: data[i][j].gascut,
              drname: data[i][j].driverName,
              tel: data[i][j].driverPhone,
              proName: data[i][j].proName
            });
            //  arr.push(data[i][j].gascut);
          }
          dataArr.push(arr);
        }
      }
      return dataArr;
    },
    handleSizeChange(val) {
      var _this = this;
      _this.pageSize = val;
      this.getList();
    },
    handleCurrentChange(val) {
      var _this = this;
      _this.pageNum = val;
      this.getList();
    },
    //修改保存
    savebtn(row) {
      var _this = this;
      var params = row;
      params.MonthTotalCourse = params.carCourseEnd - params.carCourseStart;
      if (params.gasMonthMoney == 0) {
        _this.prompt("月油价不允许为0!", 'warning')
        return false;
      }
      if (params.MonthTotalCourse == 0) {
        _this.prompt("本月里程数计算为0，请重新新输入", 'warning')
        return false;
      }
      if (Number(row.carCourseEnd) < Number(row.carCourseStart) ) {
        _this.prompt("里程止数须大于里程起数", 'warning');
        return false;
      }
      params.gascut =
        params.carGasMoney /
        params.gasMonthMoney /
        params.MonthTotalCourse *
        100;

      _this.$http
        .post("/engineer/carJournal/updateVoiture", params)
        .then(res => {
          _this.prompt("数据更新成功", 'success');
          _this.getList();
        })
        .catch(err => {
          console.log("数据请求失败");
        });
    },
    //删除功能
    deletebtn(row) {
      var _this = this;
      _this
        .$confirm("删除后不可恢复，是否确定删除?", "温馨提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(() => {
          var params = {
            carId: row.carId
          };
          _this.$http
            .post("/engineer/carJournal/deleteVoiture", params)
            .then(res => {
              _this.prompt("删除成功", 'success');
              _this.getList();
            })
            .catch(err => {
              console.log("数据请求失败");
            });
        })
        .catch(() => {});
    },
    //获取全部信息列表
    getAllProject() {
      let _this = this;
      var params = {};
      _this.$http
        .post("/engineer/getConditionsPro", params)
        .then(res => {
          let data = res.data.data;
          _this.allprojectList = data;
        })
        .catch(err => {
          console.log("数据请求失败");
        });
    },
    //重置列表
    resetlist() {
      var _this = this;
      _this.search.name = "";
      _this.search.time = _this.searchMonth;
      _this.getList();
    },
    // 新增按钮打开
    addBtnopen() {
      var _this = this;
      _this.dialogFormVisible = true;
    },
    // 获取列表
    getList() {
      let _this = this;
      var params = {
        pageSize: _this.pageSize,
        pageNum: _this.pageNum,
        proName: _this.search.name,
        carDate: _this.search.time
      };
      _this.$http
        .post("/engineer/carJournal/selectCarInfor", params)
        .then(res => {
          _this.getEcharts();
          let data = res.data.data;
          _this.totolSize = Number(res.data.data.totalCount);
          _this.tableData = res.data.data.carInfo;
        })
        .catch(err => {
          console.log("数据请求失败");
        });
    },
    // 获取电话
    getDriverTel(row) {
      var _this = this;
      for (var i = 0; i < _this.drivernameList.length; i++) {
        if (row == _this.drivernameList[i].fdPostName) {
          _this.addObj.driverTel = _this.drivernameList[i].fdPostTelephone;
        }
      }
    },
    //新增项目
    addCarList(formName) {
      var _this = this;
      _this.$refs[formName].validate(valid => {
        if (valid) {
          var params = {
            carCourseEnd: 0,
            carCourseStart: 0,
            carGas: _this.addObj.exhaust,
            carGasMoney: 0,
            carNumber: _this.addObj.license,
            carType: _this.addObj.cartype,
            content: "",
            driverName: _this.addObj.driverName,
            driverPhone: _this.addObj.driverTel,
            driverType: _this.addObj.drivertype,
            gasMonthMoney: 0,
            gascut: 0,
            monthTotalCourse: 0,
            proId: _this.addObj.projectName
          };
          _this.$http
            .post("/engineer/carJournal/insertVoiture", params)
            .then(res => {
              _this.dialogFormVisible = false;
              _this.$refs["formName"].resetFields();
              _this.getList();
            })
            .catch(err => {
              console.log("数据请求失败");
            });
        } else {
          console.log("提交出错，是重试");
          return false;
        }
      });
    },
    //取消弹框
    closeDiolog(formName) {
      var _this = this;
      _this.dialogFormVisible = false;
      _this.$refs["formName"].resetFields();
    },
    getDriver(row) {
      var _this = this;
      _this.addObj.driverName = "";
      _this.addObj.driverTel = "";
      _this.addObj.drivertype = "";
      _this.addObj.exhaust = "";
      _this.addObj.license = "";
      _this.addObj.cartype = "";
      var params = {
        fdProid: row
      };
      _this.$http
        .post("/engineer/carJournal/getProCarByProId", params)
        .then(res => {
          let data = res.data.data;
          _this.drivernameList = data;
          _this.addObj.region = _this.drivernameList[0].fdRegionNameCn;
        })
        .catch(err => {
          console.log("数据请求失败");
        });
    },
    getEcharts() {
      var _this = this;
      var params = {
        fdCreateTime: _this.search.time
      };
      _this.$http
        .post("/engineer/queryFuelConsumption", params)
        .then(res => {
          _this.echartsXData = res.data.data[res.data.data.length - 1];
          var data = res.data.data.splice(res.data.data.length - 1, 1);
          _this.echartsData = _this.structureMethod(res.data.data);
          var option = {
            legend: {
              data: [
                "1.6T",
                "1.8T",
                "2.0T",
                "2.2T",
                "2.4T",
                "2.8T",
                "3.0T",
                "2.0",
                "2.4",
                "2.5",
                "3.0",
                "3.5",
                "4.0",
                "4.6"
              ]
            },
            tooltip: {
              trigger: "item", //是否节点触发
              padding: 5,
              formatter: function(params) {
                var drname = params.data.drname;
                var tel = params.data.tel;
                var regon = params.data.proName;
                return (
                  " 车 牌 号: " +
                  params.name +
                  "<br/>" +
                  "所属项目:" +
                  regon +
                  "<br/>" +
                  "司机姓名:" +
                  drname +
                  "<br/>" +
                  "联系方式:" +
                  tel +
                  "<br/>"
                );
              }
            },
            xAxis: [
              {
                type: "category",
                //data :  ["牌照1","牌照2","牌照3","牌照4","牌照5","牌照6","牌照7","牌照8","牌照9","牌照10","牌照11","牌照12","牌照13","牌照14","牌照15","牌照16"]
                data: this.echartsXData
              }
            ],
            yAxis: [
              {
                type: "value"
              }
            ],
            dataZoom: [
              {
                type: "slider", //图表下方的伸缩条
                show: true, //是否显示
                realtime: true, //拖动时，是否实时更新系列的视图
                start: 0, //伸缩条开始位置（1-100），可以随时更改
                end: 100 //伸缩条结束位置（1-100），可以随时更改
              }
            ],
            series: [
              {
                name: "1.6T",
                type: "bar",
                stack: "总量",
                color: "#56A1D5",
                itemStyle: {
                  normal: { label: { show: true, position: "top" } }
                },
                data: this.echartsData[0]
              },
              {
                name: "1.8T",
                type: "bar",
                stack: "总量",
                color: "#63c3e5",
                itemStyle: {
                  normal: { label: { show: true, position: "top" } }
                },
                data: this.echartsData[1]
              },
              {
                name: "2.0T",
                type: "bar",
                stack: "总量",
                color: "#87dde1",
                itemStyle: {
                  normal: { label: { show: true, position: "top" } }
                },
                data: this.echartsData[2]
              },
              {
                name: "2.2T",
                type: "bar",
                stack: "总量",
                color: "#aee4bb",
                itemStyle: {
                  normal: { label: { show: true, position: "top" } }
                },
                data: this.echartsData[3]
              },
              {
                name: "2.4T",
                type: "bar",
                stack: "总量",
                color: "#F9DB71",
                itemStyle: {
                  normal: { label: { show: true, position: "top" } }
                },
                data: this.echartsData[4]
              },
              {
                name: "2.8T",
                type: "bar",
                stack: "总量",
                color: "#F2A385",
                itemStyle: {
                  normal: { label: { show: true, position: "top" } }
                },
                data: this.echartsData[5]
              },
              {
                name: "3.0T",
                type: "bar",
                stack: "总量",
                color: "#EA7A94",
                itemStyle: {
                  normal: { label: { show: true, position: "top" } }
                },
                data: this.echartsData[6]
              },
              {
                name: "2.0",
                type: "bar",
                stack: "总量",
                color: "#DA95CE",
                itemStyle: {
                  normal: { label: { show: true, position: "top" } }
                },
                data: this.echartsData[7]
              },
              {
                name: "2.4",
                type: "bar",
                stack: "总量",
                color: "#E0BFEF",
                itemStyle: {
                  normal: { label: { show: true, position: "top" } }
                },
                data: this.echartsData[8]
              },
              {
                name: "2.5",
                type: "bar",
                stack: "总量",
                color: "#ea7a94",
                itemStyle: {
                  normal: { label: { show: true, position: "top" } }
                },
                data: this.echartsData[9]
              },
              {
                name: "3.0",
                type: "bar",
                stack: "总量",
                color: "#9B98EF",
                itemStyle: {
                  normal: { label: { show: true, position: "top" } }
                },
                data: this.echartsData[10]
              },
              {
                name: "3.5",
                type: "bar",
                stack: "总量",
                color: "#817BE3",
                itemStyle: {
                  normal: { label: { show: true, position: "top" } }
                },
                data: this.echartsData[11]
              },
              {
                name: "4.0",
                type: "bar",
                stack: "总量",
                color: "#9EBFFA",
                itemStyle: {
                  normal: { label: { show: true, position: "top" } }
                },
                data: this.echartsData[12]
              },
              {
                name: "4.6",
                type: "bar",
                stack: "总量",
                color: "#F5CEFC",
                itemStyle: {
                  normal: { label: { show: true, position: "top" } }
                },
                data: this.echartsData[13]
              }
            ]
          };

          let leftmyChart = this.$echarts.init(this.$refs["echartscar"]);
          leftmyChart.setOption(option);
        })
        .catch(err => {
          console.log("数据请求失败");
        });
    }
  }
};
</script>

<style lang='less'>
.manage_car {
  width: 100%;
  height: 100%;
  overflow: auto;
  .carReport {
    margin: 10px;
    border: 1px solid #ebeef5;
  }
  .search {
    margin-top: 10px;
    border-radius: 4px;
    width: 98%;
    margin-left: 1%;
    height: 50px;
    background-color: #fff;
    border: 1px solid #279de8;
    padding-top: 5px;
    padding-left: 20px;
  }
  .manage_list {
    margin-top: 10px;
    width: 98%;
    margin-left: 1%;
    background-color: #fff;
    border: 1px solid #279de8;
  }
  .list_wrap {
    width: 98%;
    margin: 10px;
  }
  .manage_title {
    width: 100%;
    margin: 0 auto;
    font-size: 14px;
    font-weight: bold;
    padding: 0 10px;
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #f9fafb;
    background-color: #f9fafb;
  }
  .page_block {
    display: flex;
    justify-content: flex-end;
    margin-top: 10px;
  }
  .el-table th.is-leaf,
  .el-table /deep/ td {
    border-bottom: 1px solid #ccc;
  }
  #carShow {
    width: 100%;
    height: 500px;
    background: #fff;
    margin: 30px;
  }
  .eachrst_title {
    clear: both;
    width: 98%;
    margin: 0 auto;
    font-size: 16px;
    font-weight: bold;
    height: 40px;
    line-height: 40px;
  }
  .el-table .cell {
    font-size: 12px;
    text-align: center;
  }
  .el-input {
    font-size: 12px;
  }
  .el-form-item__content {
    line-height: 40px;
  }
  .el-input__inner {
    height: 30px;
    text-align: center;
  }
  .el-button {
    padding: 7px 17px;
  }
  .el-button + .el-button {
    margin-left: 0;
  }
  .saveBtn{
    color: #409EFF;
    cursor: pointer;
  }
  .delBtn{
    color: #F66C6C;
    cursor: pointer;
    margin-left: 10px;
  }
  .dialog_wrap{
    height:300px;
    overflow-y: scroll
  }
  .dialog_wh{
    width: 300px
  }
}
</style>
