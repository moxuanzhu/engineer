<template>
  <div class="filterinfo">
    <el-popover
      id="popovers"
      placement="bottom"
      :width="screenWidth"
      trigger="manual"
      v-model="visible">
       <div>
          <p class="one">
            <span class="titled">项目基本信息:</span>
            <span class="povercon">
              <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
              <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
              </el-checkbox-group>
            </span>
          </p>
          <p class="one">
            <span class="titled">标段基本信息:</span>
            <span class="povercon">
              <el-checkbox :indeterminate="isIndeterminate1" v-model="checkAll1" @change="handleCheckAllChange1">全选</el-checkbox>
              <el-checkbox-group v-model="checkedCities1" @change="handleCheckedCitiesChange1">
                <el-checkbox v-for="city in cities1" :label="city" :key="city">{{city}}</el-checkbox>
              </el-checkbox-group>
            </span>
          </p>
          <p class="one">
            <span class="titled">招标基本信息:</span>
            <span class="povercon">
              <el-checkbox :indeterminate="isIndeterminate2" v-model="checkAll2" @change="handleCheckAllChange2">全选</el-checkbox>
              <el-checkbox-group v-model="checkedCities2" @change="handleCheckedCitiesChange2">
                <el-checkbox v-for="city in cities2" :label="city" :key="city">{{city}}</el-checkbox>
              </el-checkbox-group>
            </span>
          </p>
          <p class="one">
            <span class="titled">合同台账:</span>
            <span class="povercon">
              <el-checkbox :indeterminate="isIndeterminate3" v-model="checkAll3" @change="handleCheckAllChange3">全选</el-checkbox>
              <el-checkbox-group v-model="checkedCities3" @change="handleCheckedCitiesChange3">
                <el-checkbox v-for="city in cities3" :label="city" :key="city">{{city}}</el-checkbox>
              </el-checkbox-group>
            </span>
          </p>
          <p class="one">
            <span class="titled">合同执行资金支付情况:</span>
            <span class="povercon">
              <el-checkbox :indeterminate="isIndeterminate4" v-model="checkAll4" @change="handleCheckAllChange4">全选</el-checkbox>
              <el-checkbox-group v-model="checkedCities4" @change="handleCheckedCitiesChange4">
                <el-checkbox v-for="city in cities4" :label="city" :key="city">{{city}}</el-checkbox>
              </el-checkbox-group>
            </span>
          </p>
          <div style="height: 50px;" class="dijitDialogButtonBar">
            <div class="hob-ser" style="margin-right: 10px;margin-top: 12px;">
              <el-button  size="mini" plain @click="sure()">确定</el-button>
              <el-button  size="mini" plain @click="cancels()">取消</el-button>
              <span class="rests" @click="resets()">重置</span>
            </div>
          </div>
       </div>
       <a href="javascript:;" slot="reference" @click="visible = !visible">更多筛选条件<i :class="visible == true ? 'el-select__caret el-input__icon el-icon-arrow-down' : 'el-select__caret el-input__icon el-icon-arrow-up'"></i></a>
    </el-popover>
  </div>
</template>

<script>
const infoOptions = ['所属工程大区', '项目容量', '承发包模式', '项目经理'];
const infoOptions1 = ['类别划分', '标段名称', '招标范围', '合同经理', '招采工程师', '造价工程师', '采购方式', '招标代理机构', '招标计划约定时间', '招标文件约定时间', '现场施工时间', '招标文件偏差时间'];
const infoOptions2 = ['招标计划提报', '招标申请', '技术资料提报', '工程量清单提报', '发标', '开标', '定标', '资料备案所在地', '招标资料', '投标资料', '定标资料', '发出中标通知书时间', '中标金额', '中标单位', '中标单位联系人', '联系方式', '本周进展'];
const infoOptions3 = ['SAP采购订单号', '合同编号', '合同名称', '合同金额', 'OA评审发起时间', 'OA评审结束时间', '合同签订时间', '归档日期', '合同相对人', '合同金额(总)', '付款条件', '质保金', '质量保证期', '合同执行进展分析'];
const infoOptions4 = ['累积已付款金额', '累计支付比例', '累积开票金额', '未付金额', '待开票金额', '备注'];
export default {
  name:'infofilter',
  data() {
    return{
      visible: false, // 弹框显示隐藏
      screenWidth: window.screen.width -10,
      flagData: {
        flag1: true, // 所属工程大区
        flag2: true, // 项目容量
        flag3: true, // 承发包模式
        flag4: true, // 项目经理
        flag5: true, // 类别划分
        flag6: true, // 标段名称
        flag7: true, // 招标范围
        flag8: true, // 合同经理
        flag9: true, // 招采工程师
        flag10: true, // 造价工程师
        flag11: true, // 采购方式
        flag12: true, // 招标代理机构
        flag13: true, // 招标计划约定时间
        flag14: true, // 招标文件约定时间
        flag15: true, // 现场施工时间
        flag16: true, // 招标计划偏差时间
        flag17: true, // 招标计划提报
        flag18: true, // 招标申请
        flag19: true, // 技术资料提报
        flag20: true, // 工程量清单提报
        flag21: true, // 发标
        flag22: true, // 开标
        flag23: true, // 定标
        flag24: true, // 资料备案所在地
        flag25: true, // 招标资料
        flag26: true, // 投标资料
        flag27: true, // 定标资料
        flag28: true, // 发出中标通知书时间
        flag29: true, // 中标金额(元)
        flag30: true, // 中标单位
        flag31: true, // 中标单位联系人
        flag32: true, // 联系方式
        flag33: true, // 本周进展
        flag34: true, // SAP采购订单号
        flag35: true, // 合同编号
        flag36: true, // 合同名称
        flag37: true, // 合同金额
        flag38: true, // OA评审发起时间
        flag39: true, // OA评审结束时间
        flag40: true, // 合同签订时间
        flag41: true, // 归档日期
        flag42: true, // 合同相对人
        flag43: true, // 付款条件
        flag44: true, // 合同金额(总)
        flag45: true, // 质保金
        flag46: true, // 质量保证期
        flag47: true, // 合同执行进展分析
        flag48: true, // 累积已付款金额
        flag49: true, // 累计支付比例
        flag50: true, // 累积开票金额
        flag51: true, // 未付金额
        flag52: true, // 待开票金额
        flag53: true, // 备注
      },
      // 项目基本信息
      checkAll: false, 
      cities: infoOptions, // 项目基本信息
      isIndeterminate: false, // 全选 项目基本信息 是否选中
      checkedCities: [], // 项目基本信息 选中的内容
      // 标段基本信息
      checkAll1: false,
      cities1: infoOptions1, // 标段基本信息
      isIndeterminate1: false, // 全选 标段基本信息
      checkedCities1: [], // 标段基本信息 选中的内容
      // 招标基本信息
      checkAll2: false,
      cities2: infoOptions2, // 标段基本信息
      isIndeterminate2: false, // 全选 招标基本信息
      checkedCities2: [], // 招标基本信息 选中的内容
      // 合同台账
      checkAll3: false,
      cities3: infoOptions3, // 标段基本信息
      isIndeterminate3: false, // 全选 招标基本信息
      checkedCities3: [], // 招标基本信息 选中的内容
      // 合同执行资金支付情况
      checkAll4: false,
      cities4: infoOptions4, // 标段基本信息
      isIndeterminate4: false, // 全选 招标基本信息
      checkedCities4: [], // 招标基本信息 选中的内容
    }
  },
  methods:{
    // 确定
    sure() {
      if(this.checkedCities.indexOf('所属工程大区') != -1) {
        this.flagData.flag1 = false;
      }if(this.checkedCities.indexOf('项目容量') != -1) {
        this.flagData.flag2 = false;
      }if(this.checkedCities.indexOf('承发包模式') != -1) {
        this.flagData.flag3 = false;
      }if(this.checkedCities.indexOf('项目经理') != -1) {
        this.flagData.flag4 = false;
      }if(this.checkedCities1.indexOf('类别划分') != -1) {
        this.flagData.flag5 = false;
      }if(this.checkedCities1.indexOf('标段名称') != -1) {
        this.flagData.flag6 = false;
      }if(this.checkedCities1.indexOf('招标范围') != -1) {
        this.flagData.flag7 = false;
      }if(this.checkedCities1.indexOf('合同经理') != -1) {
        this.flagData.flag8 = false;
      }if(this.checkedCities1.indexOf('招采工程师') != -1) {
        this.flagData.flag9 = false;
      }if(this.checkedCities1.indexOf('造价工程师') != -1) {
        this.flagData.flag10 = false;
      }if(this.checkedCities1.indexOf('采购方式') != -1) {
        this.flagData.flag11 = false;
      }if(this.checkedCities1.indexOf('招标代理机构') != -1) {
        this.flagData.flag12 = false;
      }if(this.checkedCities1.indexOf('招标计划约定时间') != -1) {
        this.flagData.flag13 = false;
      }if(this.checkedCities1.indexOf('招标文件约定时间') != -1) {
        this.flagData.flag14 = false;
      }if(this.checkedCities1.indexOf('现场施工时间') != -1) {
        this.flagData.flag15 = false;
      }if(this.checkedCities1.indexOf('招标文件偏差时间') != -1) {
        this.flagData.flag16 = false;
      }if(this.checkedCities2.indexOf('招标计划提报') != -1) {
        this.flagData.flag17 = false;
      }if(this.checkedCities2.indexOf('招标申请') != -1) {
        this.flagData.flag18 = false;
      }if(this.checkedCities2.indexOf('技术资料提报') != -1) {
        this.flagData.flag19 = false;
      }if(this.checkedCities2.indexOf('工程量清单提报') != -1) {
        this.flagData.flag20 = false;
      }if(this.checkedCities2.indexOf('发标') != -1) {
        this.flagData.flag21 = false;
      }if(this.checkedCities2.indexOf('开标') != -1) {
        this.flagData.flag22 = false;
      }if(this.checkedCities2.indexOf('定标') != -1) {
        this.flagData.flag23 = false;
      }if(this.checkedCities2.indexOf('资料备案所在地') != -1) {
        this.flagData.flag24 = false;
      }if(this.checkedCities2.indexOf('招标资料') != -1) {
        this.flagData.flag25 = false;
      }if(this.checkedCities2.indexOf('投标资料') != -1) {
        this.flagData.flag26 = false;
      }if(this.checkedCities2.indexOf('定标资料') != -1) {
        this.flagData.flag27 = false;
      }if(this.checkedCities2.indexOf('发出中标通知书时间') != -1) {
        this.flagData.flag28 = false;
      }if(this.checkedCities2.indexOf('中标金额') != -1) {
        this.flagData.flag29 = false;
      }if(this.checkedCities2.indexOf('中标单位') != -1) {
        this.flagData.flag30 = false;
      }if(this.checkedCities2.indexOf('中标单位联系人') != -1) {
        this.flagData.flag31 = false;
      }if(this.checkedCities2.indexOf('联系方式') != -1) {
        this.flagData.flag32 = false;
      }if(this.checkedCities2.indexOf('本周进展') != -1) {
        this.flagData.flag33 = false;
      }if(this.checkedCities3.indexOf('SAP采购订单号') != -1) {
        this.flagData.flag34 = false;
      }if(this.checkedCities3.indexOf('合同编号') != -1) {
        this.flagData.flag35 = false;
      }if(this.checkedCities3.indexOf('合同名称') != -1) {
        this.flagData.flag36 = false;
      }if(this.checkedCities3.indexOf('合同金额') != -1) {
        this.flagData.flag37 = false;
      }if(this.checkedCities3.indexOf('OA评审发起时间') != -1) {
        this.flagData.flag38 = false;
      }if(this.checkedCities3.indexOf('OA评审结束时间') != -1) {
        this.flagData.flag39 = false;
      }if(this.checkedCities3.indexOf('合同签订时间') != -1) {
        this.flagData.flag40 = false;
      }if(this.checkedCities3.indexOf('归档日期') != -1) {
        this.flagData.flag41 = false;
      }if(this.checkedCities3.indexOf('合同相对人') != -1) {
        this.flagData.flag42 = false;
      }if(this.checkedCities3.indexOf('合同金额(总)') != -1) {
        this.flagData.flag43 = false;
      }if(this.checkedCities3.indexOf('付款条件') != -1) {
        this.flagData.flag44 = false;
      }if(this.checkedCities3.indexOf('质保金') != -1) {
        this.flagData.flag45 = false;
      }if(this.checkedCities3.indexOf('质量保证期') != -1) {
        this.flagData.flag46 = false;
      }if(this.checkedCities3.indexOf('合同执行进展分析') != -1) {
        this.flagData.flag47 = false;
      }if(this.checkedCities4.indexOf('累积已付款金额') != -1) {
        this.flagData.flag48 = false;
      }if(this.checkedCities4.indexOf('累计支付比例') != -1) {
        this.flagData.flag49 = false;
      }if(this.checkedCities4.indexOf('累积开票金额') != -1) {
        this.flagData.flag50 = false;
      }if(this.checkedCities4.indexOf('未付金额') != -1) {
        this.flagData.flag51 = false;
      }if(this.checkedCities4.indexOf('待开票金额') != -1) {
        this.flagData.flag52 = false;
      }if(this.checkedCities4.indexOf('备注') != -1) {
        this.flagData.flag53 = false;
      }
      this.$emit('childByValue', this.flagData); // 传父组件数据
      this.visible = false;  // 关闭弹框内容
    },
    // 取消
    cancels() {
      this.visible = false;
      this.resets();
    },
    // 重置
    resets() { 
      this.isIndeterminate = false; // 取消选中
      this.isIndeterminate1 = false; // 取消选中
      this.isIndeterminate2 = false; // 取消选中
      this.isIndeterminate3 = false; // 取消选中
      this.isIndeterminate4 = false; // 取消选中
      this.checkedCities = [];  // 项目基本信息
      this.checkedCities1 = []; // 标段基本信息
      this.checkedCities2 = []; // 招标基本信息
      this.checkedCities3 = []; // 合同台账
      this.checkedCities4 = []; // 合同执行资金支付情况
    },
    // 项目基本信息
    handleCheckAllChange(val) {
      this.checkedCities = val ? infoOptions : [];
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.cities.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
    },
    // 标段基本信息
    handleCheckAllChange1(val) {
      this.checkedCities1 = val ? infoOptions1 : [];
      this.isIndeterminate1 = false;
    },
    handleCheckedCitiesChange1(value) {
      let checkedCount = value.length;
      this.checkAll1 = checkedCount === this.cities1.length;
      this.isIndeterminate1 = checkedCount > 0 && checkedCount < this.cities1.length;
    },
    // 招标基本信息
    handleCheckAllChange2(val) {
      this.checkedCities2 = val ? infoOptions2 : [];
      this.isIndeterminate2 = false;
    },
    handleCheckedCitiesChange2(value) {
      let checkedCount = value.length;
      this.checkAll2 = checkedCount === this.cities2.length;
      this.isIndeterminate2 = checkedCount > 0 && checkedCount < this.cities2.length;
    },
    // 合同台账
    handleCheckAllChange3(val) {
      this.checkedCities3 = val ? infoOptions3 : [];
      this.isIndeterminate3 = false;
    },
    handleCheckedCitiesChange3(value) {
      let checkedCount = value.length;
      this.checkAll3 = checkedCount === this.cities3.length;
      this.isIndeterminate3 = checkedCount > 0 && checkedCount < this.cities3.length;
    },
    // 合同执行资金支付情况
    handleCheckAllChange4(val) {
      this.checkedCities4 = val ? infoOptions4 : [];
      this.isIndeterminate4 = false;
    },
    handleCheckedCitiesChange4(value) {
      let checkedCount = value.length;
      this.checkAll4 = checkedCount === this.cities4.length;
      this.isIndeterminate4 = checkedCount > 0 && checkedCount < this.cities4.length;
    }
  }
}
</script>

<style scoped>
.filterinfo{
  width: 100%;
  position: absolute;
  top: 19.5%;
  left: 40%;
}
.filterinfo a{
  color: #666;
  font-size: 13px;
}
.filterinfo a:hover{
  color:#409EFF;
  text-decoration: none;
}
.filterinfo .el-popover /deep/ {
  width: 100%;
}
.el-popover .el-checkbox-group /deep/{
  margin-left: 25px;
}
.one{
  display: flex;
  border-bottom: 1px dotted #ddd;
}
.one .titled{
  width: 120px;
  /* margin-right: 20px; */
}
.one .povercon{
  display: flex;
  width: 1178px;
}

/* 按钮 */
.dijitDialogButtonBar{
    border-radius:0px 0px 4px 4px;
    display: flex;
    justify-content: center;
}
.dijitDialogButtonBar .hob-ser button{
  display: inline-block;
  width: 55px;
  height: 25px;
  padding: 6px 15px;
}
.dijitDialogButtonBar .hob-ser button:nth-child(1){
  margin-left: 0px;
  background:#39aef9;
  color: #fff;
}
.dijitDialogButtonBar .hob-ser span{
  cursor:pointer;
  display: inline-block;
}

.dijitDialogButtonBar .hob-ser .rests{
  margin-left: 12px;
  cursor:pointer
}
</style>
