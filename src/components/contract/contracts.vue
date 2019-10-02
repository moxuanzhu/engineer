<template>
  <div class="contract">
    <!-- 商务合同 -->
    <div class="contractinfo" id="contractinfo">
      <div class="contract-topd">
        <div class="conleft">
            项目名称:
            <p class="searchcon"><el-input v-model="tractname"  placeholder="请选择项目名称..." size="small" @keyup.enter.native="enterToSearch"  clearable></el-input></p>
            标段名称:
            <p class="searchcon">
              <el-input v-model="tractbids"  placeholder="请选择标段名称..." @keyup.enter.native="enterToSearch" size="small"  clearable></el-input>
              <!-- <el-cascader expand-trigger="hover" :options="sectionList" v-model="tractbids" clearable @keyup.enter.native="enterToSearch"  placeholder="请选择标段名称..."></el-cascader> -->
            </p>
            招采工程师:
            <p class="searchcon"><el-input v-model="tractinvit"  placeholder="请选择招采工程师..." size="small"  @keyup.enter.native="enterToSearch" clearable></el-input></p>
            <el-button type="primary" @click="getSearch">搜索</el-button>
            <el-button  @click="resetSearch">重置</el-button><br>
            合同经理:
            <p class="searchcon"><el-input v-model="tractman"  placeholder="请选择合同经理..." size="small"  @keyup.enter.native="enterToSearch" clearable></el-input></p> 
            所属工程大区:
            <p class="searchcons">
              <el-select size="small" v-model="tractengineer" placeholder="请选择所属工程大区..."   clearable>
                  <el-option v-for="item in regionList" :key="item.value" :label="item.label"  :value="item.value"></el-option>
              </el-select>
            </p>
            <!-- 更多筛选条件 -->
            <!-- <contract-filter @childByValue="childByValue"></contract-filter> -->
        </div>
        <div class="conright">
           <el-button type="primary" plain @click="Addtract()" size="mini">新增标段</el-button>
           <!-- <el-button type="primary" plain>导出Excel</el-button>
           <el-button type="primary" plain>导出PDF</el-button> -->
        </div>
      </div>
      <div class="table-list" v-loading="Loadings" element-loading-text="拼命加载中"  element-loading-spinner="el-icon-loading"   element-loading-background="rgba(0, 0, 0, 0.8)" :style="{height: contractsHeight+'px'}">
        <el-table
          :data="contractList"
          :empty-text="textMsg"
          border
          height="62vh"
          :header-cell-style="getRowClass"
          style="width: 100%; margin-bottom: 50px;">
          <el-table-column   prop="fdName"  label="项目名称"  align="center"  fixed="left"  :show-overflow-tooltip="true"  width="220"></el-table-column>
          <el-table-column label="项目基本信息" align="center">
            <el-table-column
              prop="fdEngineeringArea"
              label="所属工程大区"
              align="center"        
              :show-overflow-tooltip="true"
              v-if="flagData.flag1"
              width="105">
            </el-table-column>
            <el-table-column
              prop="fdProCapacity"
              label="项目容量"
              align="center"
              :show-overflow-tooltip="true"  
              v-if="flagData.flag2"      
              width="80">
            </el-table-column>
            <el-table-column
              prop="fdPackageModel"
              label="承发包模式"
              align="center"
              :show-overflow-tooltip="true"
              v-if="flagData.flag3"
              width="140">
            </el-table-column>
            <el-table-column
              prop="fdPostName"
              label="项目经理"
              align="center"
              :show-overflow-tooltip="true"   
              v-if="flagData.flag4"     
              width="80">
            </el-table-column>
          </el-table-column>
          <el-table-column label="标段基本信息" align="center">
            <el-table-column
              prop="fdContractTypeDivideTotalPropertyName"
              label="类别划分"
              align="center"
              v-if="flagData.flag5"
              width="140">
            </el-table-column>
            <el-table-column
              prop="fdContractTypeDivideParentPropertyName"
              label="标段名称"
              align="center"
              :show-overflow-tooltip="true"
              v-if="flagData.flag6"
              width="140">
            </el-table-column>
            <el-table-column
              prop="fdSectionNameChildidProperty"
              label="招标范围"
              align="center"
              :show-overflow-tooltip="true"
              v-if="flagData.flag7"
              width="120">
              <template slot-scope="scope"><el-button type="primary" size="mini" @click="Details(scope.row.fdProId, 'looks', scope.row.fdSectionNameChildidProperty)" >查看详情</el-button></template>
            </el-table-column>
            <el-table-column
              prop="fdContractManager"
              label="合同经理"
              align="center"
              :show-overflow-tooltip="true"  
              v-if="flagData.flag8"      
              width="80">
            </el-table-column>
            <el-table-column
              prop="fdForMiningEngineer"
              label="招采工程师"
              align="center"
              :show-overflow-tooltip="true"
              v-if="flagData.flag9"
              width="95">
            </el-table-column>
            <el-table-column
              prop="fdCostEngineer"
              label="造价工程师"
              align="center"
              :show-overflow-tooltip="true"
              v-if="flagData.flag10"
              width="95">
            </el-table-column>
            <el-table-column
              prop="fdPurchaseWay"
              label="采购方式"
              align="center"
              :show-overflow-tooltip="true"
              v-if="flagData.flag11"
              width="140">
            </el-table-column>
            <el-table-column
              prop="fdCfbAgencyInstitution"
              label="招标代理机构"
              align="center"
              :show-overflow-tooltip="true"
              v-if="flagData.flag12"
              width="140">
            </el-table-column>
            <el-table-column label="工期计划" align="center">
              <el-table-column label="招标计划约定时间" align="center" v-if="flagData.flag13">
                <el-table-column
                  prop="fdCfbAppointTimeStartworking"
                  label="开工/进场"
                  align="center"
                  width="155">
                  <template slot-scope="scope">{{scope.row.fdCfbAppointTimeStartworking?scope.row.fdCfbAppointTimeStartworking.replace(/\-/g, '/'):""}}</template>
                </el-table-column>
                <el-table-column
                  prop="fdCfbAppointTimeEndworking"
                  label="完工/离场"
                  align="center"
                  width="155">
                  <template slot-scope="scope">{{scope.row.fdCfbAppointTimeEndworking?scope.row.fdCfbAppointTimeEndworking.replace(/\-/g, '/'): ""}}</template>
                </el-table-column>
              </el-table-column>
              <el-table-column label="招标文件约定时间" align="center" v-if="flagData.flag14">
                <el-table-column
                  prop="fdCfbFileAppointTimeStartworking"
                  label="开工/进场"
                  align="center"
                  width="155">
                  <template slot-scope="scope">{{scope.row.fdCfbFileAppointTimeStartworking?scope.row.fdCfbFileAppointTimeStartworking.replace(/\-/g, '/'): ""}}</template>
                </el-table-column>
                <el-table-column
                  prop="fdCfbFileAppointTimeEndworking"
                  label="完工/离场"
                  align="center"
                  width="155">
                  <template slot-scope="scope">{{scope.row.fdCfbFileAppointTimeEndworking?scope.row.fdCfbFileAppointTimeEndworking.replace(/\-/g, '/'): ""}}</template>
                </el-table-column>
              </el-table-column>
              <el-table-column label="现场施工时间" align="center" v-if="flagData.flag15">
                <el-table-column
                  prop="fdSiteRoadworkStartworking"
                  label="开工/进场"
                  align="center"
                  width="155">
                  <template slot-scope="scope">{{scope.row.fdSiteRoadworkStartworking?scope.row.fdSiteRoadworkStartworking.replace(/\-/g, '/'):""}}</template>
                </el-table-column>
                <el-table-column
                  prop="fdSiteRoadworkEndworking"
                  label="完工/离场"
                  align="center"
                  width="155">
                  <template slot-scope="scope">{{scope.row.fdSiteRoadworkEndworking?scope.row.fdSiteRoadworkEndworking.replace(/\-/g, '/'): ""}}</template>
                </el-table-column>
              </el-table-column>
              <el-table-column label="招标计划偏差时间" align="center" v-if="flagData.flag16">
                <el-table-column
                  prop="fdCfbBiasTimeStartworking"
                  label="开工/进场"
                  :show-overflow-tooltip="true"
                  align="center"
                  width="135">
                  <template slot-scope="scope">
                    <span class="white" :style="{background:scope.row.colors}">
                       {{scope.row.fdCfbBiasTimeStartworking}}
                    </span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="fdCfbBiasTimeEndworking"
                  label="完工/离场"
                   align="center"
                  :show-overflow-tooltip="true"
                  width="135">
                  <template slot-scope="scope">
                    <span class="white" :style="{background:scope.row.colord}">
                       {{scope.row.fdCfbBiasTimeEndworking}}
                    </span>
                  </template>
                </el-table-column>
              </el-table-column>
            </el-table-column>
          </el-table-column>
          <el-table-column label="招标基本信息" align="center">
            <el-table-column label="招标计划提报" align="center" v-if="flagData.flag17">
              <el-table-column
                prop="fdCfbPlanHandinPlanTime"
                label="计划时间"
                align="center"
                width="155">
                <template slot-scope="scope">{{scope.row.fdCfbPlanHandinPlanTime?scope.row.fdCfbPlanHandinPlanTime.replace(/\-/g, '/'):""}}</template>
              </el-table-column>
            </el-table-column>
            <el-table-column label="招标申请" align="center" v-if="flagData.flag18">
              <el-table-column
                prop="fdCfbApplyforPlanTime"
                label="计划时间"
                align="center"
                width="155">
                <template slot-scope="scope">{{scope.row.fdCfbApplyforPlanTime?scope.row.fdCfbApplyforPlanTime.replace(/\-/g, '/'):""}}</template>
              </el-table-column>
              <el-table-column
                prop="fdCfbApplyforRealityTime"
                label="实际时间"
                align="center"
                width="155">
                <template slot-scope="scope">{{scope.row.fdCfbApplyforRealityTime?scope.row.fdCfbApplyforRealityTime.replace(/\-/g, '/'):""}}</template>
              </el-table-column>
              <el-table-column
                prop="fdCfbApplyforBiasTime"
                label="偏差时间"
                align="center"
                width="135">
                <template slot-scope="scope">
                  <span class="white" :style="{background:scope.row.Biascolors}">
                       {{scope.row.fdCfbApplyforBiasTime}}
                  </span>
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column label="技术资料提报" align="center" v-if="flagData.flag19">
              <el-table-column
                prop="fdSkillResourceHandinPlanTime"
                label="计划时间"
                align="center"
                width="155">
                <template slot-scope="scope">{{scope.row.fdSkillResourceHandinPlanTime?scope.row.fdSkillResourceHandinPlanTime.replace(/\-/g, '/'):""}}</template>
              </el-table-column>
              <el-table-column
                prop="fdSkillResourceHandinRealityTime"
                label="实际时间"
                align="center"
                width="155">
                <template slot-scope="scope">{{scope.row.fdSkillResourceHandinRealityTime?scope.row.fdSkillResourceHandinRealityTime.replace(/\-/g, '/'):""}}</template>
              </el-table-column>
              <el-table-column
                prop="fdSkillResourceHandinBiasTime"
                label="偏差时间"
                align="center"
                width="135">
                <template slot-scope="scope">
                  <span class="white" :style="{background:scope.row.Handcolors}">
                       {{scope.row.fdSkillResourceHandinBiasTime}}
                  </span>
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column label="工程量清单提报" align="center" v-if="flagData.flag20">
              <el-table-column
                prop="fdProRepertoireHandinPlanTime"
                label="计划时间"
                align="center"
                width="155">
                <template slot-scope="scope">{{scope.row.fdProRepertoireHandinPlanTime?scope.row.fdProRepertoireHandinPlanTime.replace(/\-/g, '/'):""}}</template>
              </el-table-column>
              <el-table-column
                prop="fdProRepertoireHandinRealityTime"
                label="实际时间"
                align="center"
                width="155">
                <template slot-scope="scope">{{scope.row.fdProRepertoireHandinRealityTime?scope.row.fdProRepertoireHandinRealityTime.replace(/\-/g, '/'):""}}</template>
              </el-table-column>
              <el-table-column
                prop="fdProRepertoireHandinBiasTime"
                label="偏差时间"
                align="center"
                width="135">
                <template slot-scope="scope">
                  <span class="white" :style="{background:scope.row.Repertcolors}">
                       {{scope.row.fdProRepertoireHandinBiasTime}}
                  </span>
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column label="发标" align="center" v-if="flagData.flag21">
              <el-table-column
                prop="fdLaunchMarkPlanTime"
                label="计划时间"
                align="center"
                width="155">
                <template slot-scope="scope">{{scope.row.fdLaunchMarkPlanTime?scope.row.fdLaunchMarkPlanTime.replace(/\-/g, '/'):""}}</template>
              </el-table-column>
              <el-table-column
                prop="fdLaunchMarkRealityTime"
                label="实际时间"
                align="center"
                width="155">
                <template slot-scope="scope">{{scope.row.fdLaunchMarkRealityTime?scope.row.fdLaunchMarkRealityTime.replace(/\-/g, '/'):""}}</template>
              </el-table-column>
              <el-table-column
                prop="fdLaunchMarkBiasTime"
                label="偏差时间"
                align="center"
                width="135">
                <template slot-scope="scope">
                  <span class="white" :style="{background:scope.row.Markcolors}">
                       {{scope.row.fdLaunchMarkBiasTime}}
                  </span>
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column label="开标" align="center" v-if="flagData.flag22">
              <el-table-column
                prop="fdStartMarkPlanTime"
                label="计划时间"
                align="center"
                width="155">
                <template slot-scope="scope">{{scope.row.fdStartMarkPlanTime?scope.row.fdStartMarkPlanTime.replace(/\-/g, '/'):""}}</template>
              </el-table-column>
              <el-table-column
                prop="fdStartMarkRealityTime"
                label="实际时间"
                align="center"
                width="155">
                <template slot-scope="scope">{{scope.row.fdStartMarkRealityTime?scope.row.fdStartMarkRealityTime.replace(/\-/g, '/'):""}}</template>
              </el-table-column>
              <el-table-column
                prop="fdStartMarkBiasTime"
                label="偏差时间"
                align="center"
                width="135">
                <template slot-scope="scope">
                  <span class="white" :style="{background:scope.row.StartMarkcolors}">
                       {{scope.row.fdStartMarkBiasTime}}
                  </span>
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column label="定标" align="center" v-if="flagData.flag23">
              <el-table-column
                prop="fdTofixMarkPlanTime"
                label="计划时间"
                align="center"
                width="155">
                <template slot-scope="scope">{{scope.row.fdTofixMarkPlanTime?scope.row.fdTofixMarkPlanTime.replace(/\-/g, '/'):""}}</template>
              </el-table-column>
              <el-table-column
                prop="fdTofixMarkRealityTime"
                label="实际时间"
                align="center"
                width="155">
                <template slot-scope="scope">{{scope.row.fdTofixMarkRealityTime?scope.row.fdTofixMarkRealityTime.replace(/\-/g, '/'):""}}</template>
              </el-table-column>
              <el-table-column
                prop="fdTofixMarkBiasTime"
                label="偏差时间"
                align="center"
                width="135">
                <template slot-scope="scope">
                   <span class="white" :style="{background:scope.row.fixcolors}">
                       {{scope.row.fdTofixMarkBiasTime}}
                  </span>
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column
                prop="fdResourceFortherecordSite"
                label="资料备案所在地"
                align="center"
                :show-overflow-tooltip="true"
                v-if="flagData.flag24"     
                width="140">
            </el-table-column>
            <el-table-column
                prop="fdCfbResourceAccessory"
                label="招标资料"
                align="center"
                :show-overflow-tooltip="true"
                v-if="flagData.flag25"     
                width="180">
                <template slot-scope="scope">
                  <el-button size="mini" type="primary"  plain @click="downsFile">查看附件</el-button>
                </template>
            </el-table-column>
            <el-table-column
                prop="fdBidResourceAccessory"
                label="投标资料"
                align="center"
                :show-overflow-tooltip="true" 
                v-if="flagData.flag26"       
                width="180">
                <template slot-scope="scope">
                  <el-button size="mini" type="primary"  plain @click="downsFile">查看附件</el-button>
                </template>
            </el-table-column>
            <el-table-column
                prop="fdTofixMarkResourceAccessory"
                label="定标资料"
                align="center"
                :show-overflow-tooltip="true"
                v-if="flagData.flag27"        
                width="180">
                 <template slot-scope="scope">
                   <el-button size="mini" type="primary"  plain @click="downsFile">查看附件</el-button>
                </template>
            </el-table-column>
            <el-table-column
                prop="fdSendWinthebiddingInformtime"
                label="发出中标通知书时间"
                align="center"
                :show-overflow-tooltip="true"
                v-if="flagData.flag28"    
                width="155">
                <template slot-scope="scope">{{scope.row.fdSendWinthebiddingInformtime?scope.row.fdSendWinthebiddingInformtime.replace(/\-/g, '/'):""}}</template>
            </el-table-column>
            <el-table-column
                prop="fdWinthebiddingMoney"
                label="中标金额（元）"
                align="center"
                :show-overflow-tooltip="true"
                v-if="flagData.flag29"       
                width="130">
            </el-table-column>
            <el-table-column
                prop="fdWinthebiddingUnit"
                label="中标单位"
                align="center"
                :show-overflow-tooltip="true"
                v-if="flagData.flag30"   
                width="150">
            </el-table-column>
            <el-table-column
                prop="fdWinthebiddingUser"
                label="中标单位联系人"
                align="center"
                :show-overflow-tooltip="true"
                v-if="flagData.flag31"      
                width="130">
            </el-table-column>
            <el-table-column
                prop="fdUserPhone"
                label="联系方式"
                align="center"
                :show-overflow-tooltip="true"
                v-if="flagData.flag32"    
                width="145">
            </el-table-column>
            <el-table-column
                prop="fdThisweekEvolve"
                label="本周进展"
                align="center"
                :show-overflow-tooltip="true"
                v-if="flagData.flag33"     
                width="120">
                <template slot-scope="scope"><el-button type="primary" size="mini" @click="Details(scope.row.fdProId, 'progress', scope.row.fdThisweekEvolve)" >查看详情</el-button></template>
            </el-table-column>
          </el-table-column>
          <el-table-column label="合同台账" align="center">
            <el-table-column
              prop="fdPurchaseOrderNumber"
              label="SAP采购订单号"
              align="center"
              :show-overflow-tooltip="true"
              v-if="flagData.flag34"
              width="120">
              <template slot-scope="scope">
                <div v-for="(item, index) in contractList[scope.$index].moneyList" :key="index">
                  <el-input class="inputs" size="mini"  v-model="item.fdPurchaseOrderNumber" readonly></el-input>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="合同编号" align="center" v-if="flagData.flag35">
              <el-table-column
                prop=""
                label=""
                align="center"
                :show-overflow-tooltip="true"
                width="90">
                <template slot-scope="scope">
                  <div v-for="(item, index) in contractList[scope.$index].moneyList" :key="index">
                    TR-GC-
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                prop="fdProLocation"
                label=""
                align="center"
                :show-overflow-tooltip="true"
                width="130">
                <template slot-scope="scope">
                  <div v-for="(item, index) in contractList[scope.$index].moneyList" :key="index">
                    <el-input class="inputs" size="mini"  v-model="item.fdProLocation" readonly></el-input>
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                prop="fdProNameLogogram"
                label=""
                align="center"
                :show-overflow-tooltip="true"
                width="90">
                <template slot-scope="scope">
                  <div v-for="(item, index) in contractList[scope.$index].moneyList" :key="index">
                    <el-input class="inputs" size="mini"  v-model="item.fdProNameLogogram" readonly></el-input>
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                prop="fdContractType"
                label=""
                align="center"
                :show-overflow-tooltip="true"
                width="140">
                <template slot-scope="scope">
                  <div v-for="(item, index) in contractList[scope.$index].moneyList" :key="index">
                    <el-input class="inputs" size="mini"  v-model="item.fdContractType" readonly></el-input>
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                prop="fdSignAContractate"
                label=""
                align="center"
                :show-overflow-tooltip="true"
                width="155">
                <template slot-scope="scope">
                  <div v-for="(item, index) in contractList[scope.$index].moneyList" :key="index">
                    <el-input class="inputs" size="mini"  v-model="item.fdSignAContractate" readonly></el-input>
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                prop="fdSignAContractateNextProperty"
                label=""
                align="center"
                :show-overflow-tooltip="true"
                width="130">
                <template slot-scope="scope">
                  <div v-for="(item, index) in contractList[scope.$index].moneyList" :key="index">
                    <el-input class="inputs" size="mini"  v-model="item.fdSignAContractateNextProperty" readonly></el-input>
                  </div>
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column
              prop="fdContractName"
              label="合同名称"
              align="center"
              v-if="flagData.flag36"
              width="300">
              <template slot-scope="scope">
                  <div v-for="(item, index) in contractList[scope.$index].moneyList" :key="index">
                    <el-input class="inputs" size="mini"  v-model="item.fdContractName" readonly></el-input>
                  </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="fdContractMoney"
              label="合同金额"
              align="center"
              v-if="flagData.flag37"
              width="100">
              <template slot-scope="scope">
                  <div v-for="(item, index) in contractList[scope.$index].moneyList" :key="index">
                    <el-input class="inputs" size="mini"  v-model="item.fdContractMoney" readonly></el-input>
                  </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="fdOAReviewStartTime"
              label="oa评审发起时间"
              align="center"
              v-if="flagData.flag38"
              width="155">
              <template slot-scope="scope">
                  <div v-for="(item, index) in contractList[scope.$index].moneyList" :key="index">
                    <el-date-picker  size="mini" v-model="item.fdOAReviewStartTime"  type="date" format="yyyy/MM/dd" value-format="yyyy-MM-dd" readonly   placeholder="选择日期"></el-date-picker>
                  </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="fdOAReviewEndTime"
              label="oa评审结束时间"
              align="center"
              v-if="flagData.flag39"
              width="155">
              <template slot-scope="scope">
                  <div v-for="(item, index) in contractList[scope.$index].moneyList" :key="index">
                    <el-date-picker  size="mini" v-model="item.fdOAReviewEndTime"  type="date" format="yyyy/MM/dd" value-format="yyyy-MM-dd" readonly   placeholder="选择日期"></el-date-picker>
                  </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="fdSignAContractTime"
              label="合同签订时间"
              align="center"
              v-if="flagData.flag40"
              width="155">
              <template slot-scope="scope">
                  <div v-for="(item, index) in contractList[scope.$index].moneyList" :key="index">
                    <el-date-picker  size="mini" v-model="item.fdSignAContractTime"  type="date" format="yyyy/MM/dd" value-format="yyyy-MM-dd" readonly   placeholder="选择日期"></el-date-picker>
                  </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="fdContractDateOfFilingTime"
              label="归档日期"
              align="center"
              v-if="flagData.flag41"
              width="155">
              <template slot-scope="scope">
                  <div v-for="(item, index) in contractList[scope.$index].moneyList" :key="index">
                    <el-date-picker  size="mini" v-model="item.fdContractDateOfFilingTime"  type="date" format="yyyy/MM/dd" value-format="yyyy-MM-dd" readonly   placeholder="选择日期"></el-date-picker>
                  </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="fdContractCorrespondingPerson"
              label="合同相对人"
              align="center"
              :show-overflow-tooltip="true"
              v-if="flagData.flag42"
              width="120">
              <template slot-scope="scope">
                  <div v-for="(item, index) in contractList[scope.$index].moneyList" :key="index">
                    <el-input class="inputs" size="mini"  v-model="item.fdContractCorrespondingPerson" readonly></el-input>
                  </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="fdContractPaymentClause"
              label="付款条件"
              align="center"
              :show-overflow-tooltip="true"
              v-if="flagData.flag43"
              width="120">
              <template slot-scope="scope">
                  <div v-for="(item, index) in contractList[scope.$index].moneyList" :key="index">
                    <el-input class="inputs" size="mini"  v-model="item.fdContractPaymentClause" readonly></el-input>
                  </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="fdContractTotalManey"
              label="合同金额(总)"
              align="center"
              :show-overflow-tooltip="true"
              v-if="flagData.flag44"
              width="120">
            </el-table-column>
            <el-table-column
              prop="fdContractDeposit"
              label="质保金"
              align="center"
              :show-overflow-tooltip="true"
              v-if="flagData.flag45"
              width="120">
            </el-table-column>
            <el-table-column
              prop="fdContractQualityDate"
              label="质量保证期"
              align="center"
              :show-overflow-tooltip="true"
              v-if="flagData.flag46"
              width="120">
              <template slot-scope="scope">{{scope.row.fdContractQualityDate?scope.row.fdContractQualityDate.replace(/\-/g, '/'):""}}</template>
            </el-table-column>
            <el-table-column label="合同执行进展分析" align="center" v-if="flagData.flag47">
              <el-table-column
                prop="fdContractExecuteCondition"
                label="合同执行状态"
                align="center"
                width="140">
              </el-table-column>
              <el-table-column
                prop="fdContractAgreementAnalyze"
                label="履约分析"
                align="center"
                width="120">
                <template slot-scope="scope"><el-button type="primary" size="mini" @click="Details(scope.row.fdProId, 'analysis', scope.row.fdContractAgreementAnalyze)" >查看详情</el-button></template>
              </el-table-column>
            </el-table-column>
          </el-table-column>
          <el-table-column label="合同执行资金支付情况" align="center">
            <el-table-column label="2018/1" align="center">
              <el-table-column
                prop="oneplan1"
                label="计划付款"
                align="center"
                width="130">
               <template slot-scope="scope">{{scope.row.oneplan1}}</template>
              </el-table-column>
              <el-table-column
                prop="acts1"
                label="开票金额"
                align="center"
                width="130">
              </el-table-column>
              <el-table-column
                prop="mons1"
                label="实际付款"
                align="center"
                width="130">
              </el-table-column>
              <el-table-column
                prop="rates1"
                label="预实率"
                align="center"
                width="90">
              </el-table-column>
            </el-table-column>
            <el-table-column label="2018/2" align="center">
              <el-table-column
                prop="oneplan2"
                label="计划付款"
                align="center"
                width="130">
              </el-table-column>
              <el-table-column
                prop="acts2"
                label="开票金额"
                align="center"
                width="130">
              </el-table-column>
              <el-table-column
                prop="mons2"
                label="实际付款"
                align="center"
                width="130">
              </el-table-column>
              <el-table-column
                prop="rates2"
                label="预实率"
                align="center"
                width="90">
              </el-table-column>
            </el-table-column>
            <el-table-column label="2018/3" align="center">
              <el-table-column
                prop="oneplan3"
                label="计划付款"
                align="center"
                width="130">
              </el-table-column>
              <el-table-column
                prop="acts3"
                label="开票金额"
                align="center"
                width="130">
              </el-table-column>
              <el-table-column
                prop="mons3"
                label="实际付款"
                align="center"
                width="130">
              </el-table-column>
              <el-table-column
                prop="rates3"
                label="预实率"
                align="center"
                width="90">
              </el-table-column>
            </el-table-column>
            <el-table-column label="2018/4" align="center">
              <el-table-column
                prop="oneplan4"
                label="计划付款"
                align="center"
                width="130">
              </el-table-column>
              <el-table-column
                prop="acts4"
                label="开票金额"
                align="center"
                width="130">
              </el-table-column>
              <el-table-column
                prop="mons4"
                label="实际付款"
                align="center"
                width="130">
              </el-table-column>
              <el-table-column
                prop="rates4"
                label="预实率"
                align="center"
                width="90">
              </el-table-column>
            </el-table-column>
            <el-table-column label="2018/5" align="center">
              <el-table-column
                prop="oneplan5"
                label="计划付款"
                align="center"
                width="130">
              </el-table-column>
              <el-table-column
                prop="acts5"
                label="开票金额"
                align="center"
                width="130">
              </el-table-column>
              <el-table-column
                prop="mons5"
                label="实际付款"
                align="center"
                width="130">
              </el-table-column>
              <el-table-column
                prop="rates5"
                label="预实率"
                align="center"
                width="90">
              </el-table-column>
            </el-table-column>
            <el-table-column label="2018/6" align="center">
              <el-table-column
                prop="oneplan6"
                label="计划付款"
                align="center"
                width="130">
              </el-table-column>
              <el-table-column
                prop="acts6"
                label="开票金额"
                align="center"
                width="130">
              </el-table-column>
              <el-table-column
                prop="mons6"
                label="实际付款"
                align="center"
                width="130">
              </el-table-column>
              <el-table-column
                prop="rates6"
                label="预实率"
                align="center"
                width="90">
              </el-table-column>
            </el-table-column>
            <el-table-column label="2018/7" align="center">
              <el-table-column
                prop="oneplan7"
                label="计划付款"
                align="center"
                width="130">
              </el-table-column>
              <el-table-column
                prop="acts7"
                label="开票金额"
                align="center"
                width="130">
              </el-table-column>
              <el-table-column
                prop="mons7"
                label="实际付款"
                align="center"
                width="130">
              </el-table-column>
              <el-table-column
                prop="rates7"
                label="预实率"
                align="center"
                width="90">
              </el-table-column>
            </el-table-column>
            <el-table-column label="2018/8" align="center">
              <el-table-column
                prop="oneplan8"
                label="计划付款"
                align="center"
                width="130">
              </el-table-column>
              <el-table-column
                prop="acts8"
                label="开票金额"
                align="center"
                width="130">
              </el-table-column>
              <el-table-column
                prop="mons8"
                label="实际付款"
                align="center"
                width="130">
              </el-table-column>
              <el-table-column
                prop="rates8"
                label="预实率"
                align="center"
                width="90">
              </el-table-column>
            </el-table-column>
            <el-table-column label="2018/9" align="center">
              <el-table-column
                prop="oneplan9"
                label="计划付款"
                align="center"
                width="130">
              </el-table-column>
              <el-table-column
                prop="acts9"
                label="开票金额"
                align="center"
                width="130">
              </el-table-column>
              <el-table-column
                prop="mons9"
                label="实际付款"
                align="center"
                width="130">
              </el-table-column>
              <el-table-column
                prop="rates9"
                label="预实率"
                align="center"
                width="90">
              </el-table-column>
            </el-table-column>
            <el-table-column label="2018/10" align="center">
              <el-table-column
                prop="oneplan10"
                label="计划付款"
                align="center"
                width="130">
              </el-table-column>
              <el-table-column
                prop="acts10"
                label="开票金额"
                align="center"
                width="130">
              </el-table-column>
              <el-table-column
                prop="mons10"
                label="实际付款"
                align="center"
                width="130">
              </el-table-column>
              <el-table-column
                prop="rates10"
                label="预实率"
                align="center"
                width="90">
              </el-table-column>
            </el-table-column>
            <el-table-column label="2018/11" align="center">
              <el-table-column
                prop="oneplan11"
                label="计划付款"
                align="center"
                width="130">
              </el-table-column>
              <el-table-column
                prop="acts11"
                label="开票金额"
                align="center"
                width="130">
              </el-table-column>
              <el-table-column
                prop="mons11"
                label="实际付款"
                align="center"
                width="130">
              </el-table-column>
              <el-table-column
                prop="rates11"
                label="预实率"
                align="center"
                width="90">
              </el-table-column>
            </el-table-column>
            <el-table-column label="2018/12" align="center">
              <el-table-column
                prop="oneplan12"
                label="计划付款"
                align="center"
                width="130">
              </el-table-column>
              <el-table-column
                prop="acts12"
                label="开票金额"
                align="center"
                width="130">
              </el-table-column>
              <el-table-column
                prop="mons12"
                label="实际付款"
                align="center"
                width="130">
              </el-table-column>
              <el-table-column
                prop="rates12"
                label="预实率"
                align="center"
                width="90">
              </el-table-column>
            </el-table-column>
            <el-table-column
              prop="fdContractExcuteAddupPayments"
              label="累积已付款金额"
              align="center"
              :show-overflow-tooltip="true"
              v-if="flagData.flag48"
              width="120">
            </el-table-column>
            <el-table-column
              prop="fdGrandTotalPayRatio"
              label="累计支付比例"
              align="center"
              :show-overflow-tooltip="true"
              v-if="flagData.flag49"
              width="150">
            </el-table-column>
            <el-table-column
              prop="fdContractExcuteAddupMoaiManey"
              label="累积开票金额"
              align="center"
              :show-overflow-tooltip="true"
              v-if="flagData.flag50"
              width="115">
            </el-table-column>
            <el-table-column
              prop="fdContractExcuteNotPayment"
              label="未付金额"
              align="center"
              :show-overflow-tooltip="true"
              v-if="flagData.flag51"
              width="90">
            </el-table-column>
            <el-table-column
              prop="fdContractExcuteStayMoaiManey"
              label="待开票金额"
              align="center"
              :show-overflow-tooltip="true"
              v-if="flagData.flag52"
              width="100">
            </el-table-column>
            <el-table-column
              prop="fdContractExcuteRemark"
              label="备注"
              align="center"
              :show-overflow-tooltip="true"
              v-if="flagData.flag53"
              width="100">
              <template slot-scope="scope"><el-button type="primary" size="mini" @click="Details(scope.row.fdProId, 'remarks', scope.row.fdContractExcuteRemark)" >查看详情</el-button></template>
            </el-table-column>
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            align="center"
            width="100">
            <template slot-scope="scope">
              <el-button type="text" size="mini" @click="Edittract(scope)">编辑</el-button>
              <el-button type="text" size="mini" @click="Deltract(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <div class="block">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[7, 10, 15]"
            :page-size="pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
          </el-pagination>
        </div>
      </div>
        
    </div>

    <!-- 所有查看详情弹框 -->
    <div>
      <looks-tender v-if="modelFlag.showModel"></looks-tender>
    </div>
  </div>
</template>

<script>
import Filters from './infoFilter/infofilter' // 高级筛选
import Tenderings from './dialogs/tenderings'  // 弹框(仅显示)
export default {
  name: 'contracts',
  components:{
    'contract-filter': Filters,
    'looks-tender': Tenderings,
  },
  data() {
    return {
      Loadings: false, // loading加载
      textMsg: '暂无数据',
      total: 0,
      pagesize: 7,
      currentPage: 1,
      tractname: '', // 搜索的项目名称
      tractbids: '', // 搜索的标段名称
      tractinvit: '', // 搜索的招采工程师
      tractman: '', // 搜索的合同经理
      tractengineer: '', // 搜索的所属工程大区
      contractsHeight: 0,
      modelFlag: { // 弹框信息
        title: '',
        showModel: false,
        type: '',
        idx:'' ,
        con: '',  // 弹框内容
        id1: '',  // 合同1-12月id
        id2: '',  // OA评审id
      },
      regionList:[
        {
          value: '1',
          label: '工程一区'
        },
        {
          value: '2',
          label: '工程二区'
        },
        {
          value: '3',
          label: '工程三区'
        },
        {
          value: '4',
          label: '工程四区'
        }
      ],
      sectionList: [
        {
          value: '施工类',
          label: '施工类',
          children: [
            {
              value: '施工总承包工程',
              label: '施工总承包工程'
            }, 
            {
              value: '道路及吊装平台',
              label: '道路及吊装平台'
            },
            {
              value: '供水工程',
              label: '供水工程'
            },
            {
              value: '施工电源工程',
              label: '施工电源工程'
            },
            {
              value: '消防工程',
              label: '消防工程'
            },
            {
              value: '联合接地',
              label: '联合接地'
            },
            {
              value: '环保、水保工程',
              label: '环保、水保工程'
            },
            {
              value: '送出线路工程',
              label: '送出线路工程'
            },
            {
              value: '其他',
              label: '其他'
            }
          ]
        }, 
        {
          value: '服务类',
          label: '服务类',
          children: [
            {
              value: '工程监理',
              label: '工程监理'
            }, 
            {
              value: '高强螺栓检测',
              label: '高强螺栓检测'    
            }, 
            {
              value: '大体积混凝土钻芯取样技术服务',
              label: '大体积混凝土钻芯取样技术服务',
            },
            {
              value: '桩基础检测',
              label: '桩基础检测'
            }, 
            {
              value: '电缆检测',
              label: '电缆检测',
            },
            {
              value: '风机基础沉降观测',
              label: '风机基础沉降观测',
            },
            {
              value: '环保监理监测',
              label: '环保监理监测',
            },
            {
              value: '水保监理监测',
              label: '水保监理监测',
            },
             {
              value: '其他',
              label: '其他',
            }
          ]
        }, 
        {
          value: '技术',
          label: '技术',
          children: [
            {
              value: '勘察',
              label: '勘察'
            }, 
            {
              value: '测绘',
              label: '测绘'
            }, 
            {
              value: '设计',
              label: '设计'
            }
          ]
        },
        {
          value: '设备材料类',
          label: '设备材料类',
          children: [
            {
              value: '塔架',
              label: '塔架'
            }, 
            {
              value: '锚栓组件',
              label: '锚栓组件'
            }, 
            {
              value: '箱式变压器',
              label: '箱式变压器'
            },
            {
              value: '主变压器',
              label: '主变压器'
            },
            {
              value: '无功补偿设备',
              label: '无功补偿设备'
            },
            {
              value: '高、低压开关柜设备、站用变压器及35kV系统接地变+小电阻',
              label: '高、低压开关柜设备、站用变压器及35kV系统接地变+小电阻'
            },
            {
              value: 'GIS或户外设备',
              label: 'GIS或户外设备'
            },
            {
              value: '综合自动化系统',
              label: '综合自动化系统'
            },
            {
              value: '风功率预测设备',
              label: '风功率预测设备'
            },
            {
              value: '电缆及电缆附件',
              label: '电缆及电缆附件'
            },
          ]
        }
      ],
      contractList: [
        // {
        //   fdProId: 1,
        //   fdName: '工程可视化数字平台',
        //   fdEngineeringArea: '工程一区',
        //   fdProCapacity: '500M',
        //   fdGroupPost: '项目经理',
        //   fdContractManager: '王乐乐',
        //   fdForMiningEngineer: '李二三',
        //   fdCostEngineer: '王小明',
        //   fdContractTypeDivideTotalPropertyName: '施工类',
        //   fdContractTypeDivideParentPropertyName: '螺栓及',
        //   fdPackageModel: '施工总承包',
        //   fdPurchaseWay: '询比价',
        //   fdCfbAgencyInstitution: '中机',
        //   fdCfbAppointTimeStartworking: '2018-12-03',
        //   fdCfbAppointTimeEndworking: '2018-01-12',
        //   fdCfbFileAppointTimeStartworking: '2019-10-03',
        //   fdCfbFileAppointTimeEndworking: '2019-08-02',
        //   fdSiteRoadworkStartworking: '2017-02-30',
        //   fdProRepertoireHandinPlanTime: '2017-02-30', 
        //   fdProRepertoireHandinRealityTime: '2017-02-30', 
        //   fdProRepertoireHandinBiasTime: '2017-02-30', 
        //   fdSiteRoadworkEndworking: '2014-2-15',
        //   fdSiteRoadworkStartworking: '2016-03-21',
        //   fdSiteRoadworkEndworking: '2014-03-12',
        //   fdCfbBiasTimeStartworking: '2014-03-12',
        //   fdCfbBiasTimeEndworking: '2015-02-26',
        //   fdCfbPlanHandinPlanTime: '2018-02-13',
        //   fdCfbApplyforPlanTime: '2014-04-13',
        //   fdCfbApplyforRealityTime: '2014-02-14',
        //   fdCfbApplyforBiasTime: '2054-11-23',
        //   fdSkillResourceHandinPlanTime: '2014-04-12',
        //   fdSkillResourceHandinRealityTime: '2015-03-12',
        //   fdSkillResourceHandinBiasTime: '2017-03-12',
        //   fdLaunchMarkPlanTime: '2013-03-19',
        //   fdLaunchMarkRealityTime: '2017-09-31',
        //   fdLaunchMarkBiasTime: '2015-01-15',
        //   fdStartMarkPlanTime: '2019-02-12',
        //   fdStartMarkRealityTime: '2018-02-19',
        //   fdStartMarkBiasTime: '2019-09-16',
        //   fdTofixMarkPlanTime: '2019-09-16',
        //   fdTofixMarkRealityTime:'2019-09-16', 
        //   fdTofixMarkBiasTime:'2019-09-16',
        //   fdResourceFortherecordSite: '西北分公司',
        //   fdWinthebiddingMoney: '200',
        //   fdSendWinthebiddingInformtime: '2019-01-15',
        //   fdWinthebiddingUnit: '北京科技有限公司',
        //   fdWinthebiddingUser: '张洋洋',
        //   fdUserPhone: '18830984319',
        //   fdThisweekEvolve: '本周进展',
        //   fdProLocation: 'HB-华北',
        //   fdProNameLogogram: 'HB',
        //   fdContractType: 'SB-设备',
        //   fdSignAContractate: '2011',
        //   fdContractDeposit: '24456',
        //   fdContractQualityDate: '2015-03-10',
        //   fdContractExecuteCondition: '合同解除',
        //   fdContractAgreementAnalyze: '履约分析',
        //   fdContractExcuteAddupPayment: '100',
        //   fdContractExcuteAddupMoaiManey: '200',
        //   fdContractExcuteNotPayment: '500',
        //   fdContractExcuteStayMoaiManey: '2457',
        //   fdContractExcuteRemark: '备注信息',
        //   fdSectionNameChildidProperty: '招标范围',
        //   moneyList:[
        //     {
        //       id: 0,
        //       fdContractPaymentClause: '无',
        //       fdContractTotalManey: '2415',
        //       fdContractCorrespondingPerson: '张七',
        //       fdPurchaseOrderNumber: '76543',
        //       fdContractName: '工程可视化数字平台dwadwadwadawdwadwadwadwa',
        //       fdContractMoney: '23465',
        //       fdOAReviewStartTime: '2019-04-14',
        //       fdOAReviewEndTime: '2018-04-20',
        //       fdSignAContractTime: '2014-02-14',
        //       fdContractDateOfFilingTime: '2015-01-35'
        //     },
        //     {
        //       id: 1,
        //       fdContractPaymentClause: '无',
        //       fdContractTotalManey: '2415',
        //       fdContractCorrespondingPerson: '张七',
        //       fdPurchaseOrderNumber: '76543',
        //       fdContractName: '工程可视化数字平台dwadwadwadawdwadwadwadwa',
        //       fdContractMoney: '23465',
        //       fdOAReviewStartTime: '2019-04-14',
        //       fdOAReviewEndTime: '2018-04-20',
        //       fdSignAContractTime: '2014-02-14',
        //       fdContractDateOfFilingTime: '2015-01-35'
        //     },
        //     {
        //       id: 2,
        //       fdContractPaymentClause: '无',
        //       fdContractTotalManey: '2415',
        //       fdContractCorrespondingPerson: '张七',
        //       fdPurchaseOrderNumber: '76543',
        //       fdContractName: '工程可视化数字平台dwadwadwadawdwadwadwadwa',
        //       fdContractMoney: '23465',
        //       fdOAReviewStartTime: '2019-04-14',
        //       fdOAReviewEndTime: '2018-04-20',
        //       fdSignAContractTime: '2014-02-14',
        //       fdContractDateOfFilingTime: '2015-01-35'
        //     },
        //   ],

        // },
        // {
        //   fdProId: 2,
        //   fdName: '工程可视化数字平台',
        //   fdEngineeringArea: '工程一区',
        //   fdProCapacity: '500M',
        //   fdGroupPost: '项目经理',
        //   fdContractManager: '王乐乐',
        //   fdForMiningEngineer: '李二三',
        //   fdCostEngineer: '王小明',
        //   fdContractTypeDivideTotalPropertyName: '施工类',
        //   fdContractTypeDivideParentPropertyName: '螺栓及',
        //   fdPackageModel: '施工总承包',
        //   fdPurchaseWay: '询比价',
        //   fdCfbAgencyInstitution: '中机',
        //   fdCfbAppointTimeStartworking: '2018-12-03',
        //   fdCfbAppointTimeEndworking: '2018-01-12',
        //   fdCfbFileAppointTimeStartworking: '2019-10-03',
        //   fdCfbFileAppointTimeEndworking: '2019-08-02',
        //   fdSiteRoadworkStartworking: '2017-02-30',
        //   fdProRepertoireHandinPlanTime: '2017-02-30', 
        //   fdProRepertoireHandinRealityTime: '2017-02-30', 
        //   fdProRepertoireHandinBiasTime: '2017-02-30', 
        //   fdSiteRoadworkEndworking: '2014-2-15',
        //   fdSiteRoadworkStartworking: '2016-03-21',
        //   fdSiteRoadworkEndworking: '2014-03-12',
        //   fdCfbBiasTimeStartworking: '2014-03-12',
        //   fdCfbBiasTimeEndworking: '2015-02-26',
        //   fdCfbPlanHandinPlanTime: '2018-02-13',
        //   fdCfbApplyforPlanTime: '2014-04-13',
        //   fdCfbApplyforRealityTime: '2014-02-14',
        //   fdCfbApplyforBiasTime: '2054-11-23',
        //   fdSkillResourceHandinPlanTime: '2014-04-12',
        //   fdSkillResourceHandinRealityTime: '2015-03-12',
        //   fdSkillResourceHandinBiasTime: '2017-03-12',
        //   fdLaunchMarkPlanTime: '2013-03-19',
        //   fdLaunchMarkRealityTime: '2017-09-31',
        //   fdLaunchMarkBiasTime: '2015-01-15',
        //   fdStartMarkPlanTime: '2019-02-12',
        //   fdStartMarkRealityTime: '2018-02-19',
        //   fdStartMarkBiasTime: '2019-09-16',
        //   fdTofixMarkPlanTime: '2019-09-16',
        //   fdTofixMarkRealityTime:'2019-09-16', 
        //   fdTofixMarkBiasTime:'2019-09-16',
        //   fdResourceFortherecordSite: '西北分公司',
        //   fdWinthebiddingMoney: '200',
        //   fdSendWinthebiddingInformtime: '2019-01-15',
        //   fdWinthebiddingUnit: '北京科技有限公司',
        //   fdWinthebiddingUser: '张洋洋',
        //   fdUserPhone: '18830984319',
        //   fdThisweekEvolve: '本周进展',
        //   fdProLocation: 'HB-华北',
        //   fdProNameLogogram: 'HB',
        //   fdContractType: 'SB-设备',
        //   fdSignAContractate: '2011',
        //   fdContractDeposit: '24456',
        //   fdContractQualityDate: '2015-03-10',
        //   fdContractExecuteCondition: '合同解除',
        //   fdContractAgreementAnalyze: '履约分析',
        //   fdContractExcuteAddupPayment: '100',
        //   fdContractExcuteAddupMoaiManey: '200',
        //   fdContractExcuteNotPayment: '500',
        //   fdContractExcuteStayMoaiManey: '2457',
        //   fdContractExcuteRemark: '备注信息',
        //   fdSectionNameChildidProperty: '招标范围',
        //   moneyList:[
        //     {
        //       id: 0,
        //       fdContractPaymentClause: '无',
        //       fdContractTotalManey: '2415',
        //       fdContractCorrespondingPerson: '张七',
        //       fdPurchaseOrderNumber: '76543',
        //       fdContractName: '工程可视化数字平台dwadwadwadawdwadwadwadwa',
        //       fdContractMoney: '23465',
        //       fdOAReviewStartTime: '2019-04-14',
        //       fdOAReviewEndTime: '2018-04-20',
        //       fdSignAContractTime: '2014-02-14',
        //       fdContractDateOfFilingTime: '2015-01-35'
        //     }
        //   ],

        // },
        // {
        //   fdProId: 3,
        //   fdName: '工程可视化数字平台',
        //   fdEngineeringArea: '工程一区',
        //   fdProCapacity: '500M',
        //   fdGroupPost: '项目经理',
        //   fdContractManager: '王乐乐',
        //   fdForMiningEngineer: '李二三',
        //   fdCostEngineer: '王小明',
        //   fdContractTypeDivideTotalPropertyName: '施工类',
        //   fdContractTypeDivideParentPropertyName: '螺栓及',
        //   fdPackageModel: '施工总承包',
        //   fdPurchaseWay: '询比价',
        //   fdCfbAgencyInstitution: '中机',
        //   fdCfbAppointTimeStartworking: '2018-12-03',
        //   fdCfbAppointTimeEndworking: '2018-01-12',
        //   fdCfbFileAppointTimeStartworking: '2019-10-03',
        //   fdCfbFileAppointTimeEndworking: '2019-08-02',
        //   fdSiteRoadworkStartworking: '2017-02-30',
        //   fdProRepertoireHandinPlanTime: '2017-02-30', 
        //   fdProRepertoireHandinRealityTime: '2017-02-30', 
        //   fdProRepertoireHandinBiasTime: '2017-02-30', 
        //   fdSiteRoadworkEndworking: '2014-2-15',
        //   fdSiteRoadworkStartworking: '2016-03-21',
        //   fdSiteRoadworkEndworking: '2014-03-12',
        //   fdCfbBiasTimeStartworking: '2014-03-12',
        //   fdCfbBiasTimeEndworking: '2015-02-26',
        //   fdCfbPlanHandinPlanTime: '2018-02-13',
        //   fdCfbApplyforPlanTime: '2014-04-13',
        //   fdCfbApplyforRealityTime: '2014-02-14',
        //   fdCfbApplyforBiasTime: '2054-11-23',
        //   fdSkillResourceHandinPlanTime: '2014-04-12',
        //   fdSkillResourceHandinRealityTime: '2015-03-12',
        //   fdSkillResourceHandinBiasTime: '2017-03-12',
        //   fdLaunchMarkPlanTime: '2013-03-19',
        //   fdLaunchMarkRealityTime: '2017-09-31',
        //   fdLaunchMarkBiasTime: '2015-01-15',
        //   fdStartMarkPlanTime: '2019-02-12',
        //   fdStartMarkRealityTime: '2018-02-19',
        //   fdStartMarkBiasTime: '2019-09-16',
        //   fdTofixMarkPlanTime: '2019-09-16',
        //   fdTofixMarkRealityTime:'2019-09-16', 
        //   fdTofixMarkBiasTime:'2019-09-16',
        //   fdResourceFortherecordSite: '西北分公司',
        //   fdWinthebiddingMoney: '200',
        //   fdSendWinthebiddingInformtime: '2019-01-15',
        //   fdWinthebiddingUnit: '北京科技有限公司',
        //   fdWinthebiddingUser: '张洋洋',
        //   fdUserPhone: '18830984319',
        //   fdThisweekEvolve: '本周进展',
        //   fdProLocation: 'HB-华北',
        //   fdProNameLogogram: 'HB',
        //   fdContractType: 'SB-设备',
        //   fdSignAContractate: '2011',
        //   fdContractDeposit: '24456',
        //   fdContractQualityDate: '2015-03-10',
        //   fdContractExecuteCondition: '合同解除',
        //   fdContractAgreementAnalyze: '履约分析',
        //   fdContractExcuteAddupPayment: '100',
        //   fdContractExcuteAddupMoaiManey: '200',
        //   fdContractExcuteNotPayment: '500',
        //   fdContractExcuteStayMoaiManey: '2457',
        //   fdContractExcuteRemark: '备注信息',
        //   fdSectionNameChildidProperty: '招标范围',
        //   moneyList:[
        //   ],

        // },
        // {
        //   fdProId: 3,
        //   fdName: '工程可视化数字平台',
        //   fdEngineeringArea: '工程一区',
        //   fdProCapacity: '500M',
        //   fdGroupPost: '项目经理',
        //   fdContractManager: '王乐乐',
        //   fdForMiningEngineer: '李二三',
        //   fdCostEngineer: '王小明',
        //   fdContractTypeDivideTotalPropertyName: '施工类',
        //   fdContractTypeDivideParentPropertyName: '螺栓及',
        //   fdPackageModel: '施工总承包',
        //   fdPurchaseWay: '询比价',
        //   fdCfbAgencyInstitution: '中机',
        //   fdCfbAppointTimeStartworking: '2018-12-03',
        //   fdCfbAppointTimeEndworking: '2018-01-12',
        //   fdCfbFileAppointTimeStartworking: '2019-10-03',
        //   fdCfbFileAppointTimeEndworking: '2019-08-02',
        //   fdSiteRoadworkStartworking: '2017-02-30',
        //   fdProRepertoireHandinPlanTime: '2017-02-30', 
        //   fdProRepertoireHandinRealityTime: '2017-02-30', 
        //   fdProRepertoireHandinBiasTime: '2017-02-30', 
        //   fdSiteRoadworkEndworking: '2014-2-15',
        //   fdSiteRoadworkStartworking: '2016-03-21',
        //   fdSiteRoadworkEndworking: '2014-03-12',
        //   fdCfbBiasTimeStartworking: '2014-03-12',
        //   fdCfbBiasTimeEndworking: '2015-02-26',
        //   fdCfbPlanHandinPlanTime: '2018-02-13',
        //   fdCfbApplyforPlanTime: '2014-04-13',
        //   fdCfbApplyforRealityTime: '2014-02-14',
        //   fdCfbApplyforBiasTime: '2054-11-23',
        //   fdSkillResourceHandinPlanTime: '2014-04-12',
        //   fdSkillResourceHandinRealityTime: '2015-03-12',
        //   fdSkillResourceHandinBiasTime: '2017-03-12',
        //   fdLaunchMarkPlanTime: '2013-03-19',
        //   fdLaunchMarkRealityTime: '2017-09-31',
        //   fdLaunchMarkBiasTime: '2015-01-15',
        //   fdStartMarkPlanTime: '2019-02-12',
        //   fdStartMarkRealityTime: '2018-02-19',
        //   fdStartMarkBiasTime: '2019-09-16',
        //   fdTofixMarkPlanTime: '2019-09-16',
        //   fdTofixMarkRealityTime:'2019-09-16', 
        //   fdTofixMarkBiasTime:'2019-09-16',
        //   fdResourceFortherecordSite: '西北分公司',
        //   fdWinthebiddingMoney: '200',
        //   fdSendWinthebiddingInformtime: '2019-01-15',
        //   fdWinthebiddingUnit: '北京科技有限公司',
        //   fdWinthebiddingUser: '张洋洋',
        //   fdUserPhone: '18830984319',
        //   fdThisweekEvolve: '本周进展',
        //   fdProLocation: 'HB-华北',
        //   fdProNameLogogram: 'HB',
        //   fdContractType: 'SB-设备',
        //   fdSignAContractate: '2011',
        //   fdContractDeposit: '24456',
        //   fdContractQualityDate: '2015-03-10',
        //   fdContractExecuteCondition: '合同解除',
        //   fdContractAgreementAnalyze: '履约分析',
        //   fdContractExcuteAddupPayment: '100',
        //   fdContractExcuteAddupMoaiManey: '200',
        //   fdContractExcuteNotPayment: '500',
        //   fdContractExcuteStayMoaiManey: '2457',
        //   fdContractExcuteRemark: '备注信息',
        //   fdSectionNameChildidProperty: '招标范围',
        //   moneyList:[
        //   ],

        // },
        // {
        //   fdProId: 3,
        //   fdName: '工程可视化数字平台',
        //   fdEngineeringArea: '工程一区',
        //   fdProCapacity: '500M',
        //   fdGroupPost: '项目经理',
        //   fdContractManager: '王乐乐',
        //   fdForMiningEngineer: '李二三',
        //   fdCostEngineer: '王小明',
        //   fdContractTypeDivideTotalPropertyName: '施工类',
        //   fdContractTypeDivideParentPropertyName: '螺栓及',
        //   fdPackageModel: '施工总承包',
        //   fdPurchaseWay: '询比价',
        //   fdCfbAgencyInstitution: '中机',
        //   fdCfbAppointTimeStartworking: '2018-12-03',
        //   fdCfbAppointTimeEndworking: '2018-01-12',
        //   fdCfbFileAppointTimeStartworking: '2019-10-03',
        //   fdCfbFileAppointTimeEndworking: '2019-08-02',
        //   fdSiteRoadworkStartworking: '2017-02-30',
        //   fdProRepertoireHandinPlanTime: '2017-02-30', 
        //   fdProRepertoireHandinRealityTime: '2017-02-30', 
        //   fdProRepertoireHandinBiasTime: '2017-02-30', 
        //   fdSiteRoadworkEndworking: '2014-2-15',
        //   fdSiteRoadworkStartworking: '2016-03-21',
        //   fdSiteRoadworkEndworking: '2014-03-12',
        //   fdCfbBiasTimeStartworking: '2014-03-12',
        //   fdCfbBiasTimeEndworking: '2015-02-26',
        //   fdCfbPlanHandinPlanTime: '2018-02-13',
        //   fdCfbApplyforPlanTime: '2014-04-13',
        //   fdCfbApplyforRealityTime: '2014-02-14',
        //   fdCfbApplyforBiasTime: '2054-11-23',
        //   fdSkillResourceHandinPlanTime: '2014-04-12',
        //   fdSkillResourceHandinRealityTime: '2015-03-12',
        //   fdSkillResourceHandinBiasTime: '2017-03-12',
        //   fdLaunchMarkPlanTime: '2013-03-19',
        //   fdLaunchMarkRealityTime: '2017-09-31',
        //   fdLaunchMarkBiasTime: '2015-01-15',
        //   fdStartMarkPlanTime: '2019-02-12',
        //   fdStartMarkRealityTime: '2018-02-19',
        //   fdStartMarkBiasTime: '2019-09-16',
        //   fdTofixMarkPlanTime: '2019-09-16',
        //   fdTofixMarkRealityTime:'2019-09-16', 
        //   fdTofixMarkBiasTime:'2019-09-16',
        //   fdResourceFortherecordSite: '西北分公司',
        //   fdWinthebiddingMoney: '200',
        //   fdSendWinthebiddingInformtime: '2019-01-15',
        //   fdWinthebiddingUnit: '北京科技有限公司',
        //   fdWinthebiddingUser: '张洋洋',
        //   fdUserPhone: '18830984319',
        //   fdThisweekEvolve: '本周进展',
        //   fdProLocation: 'HB-华北',
        //   fdProNameLogogram: 'HB',
        //   fdContractType: 'SB-设备',
        //   fdSignAContractate: '2011',
        //   fdContractDeposit: '24456',
        //   fdContractQualityDate: '2015-03-10',
        //   fdContractExecuteCondition: '合同解除',
        //   fdContractAgreementAnalyze: '履约分析',
        //   fdContractExcuteAddupPayment: '100',
        //   fdContractExcuteAddupMoaiManey: '200',
        //   fdContractExcuteNotPayment: '500',
        //   fdContractExcuteStayMoaiManey: '2457',
        //   fdContractExcuteRemark: '备注信息',
        //   fdSectionNameChildidProperty: '招标范围',
        //   moneyList:[
        //   ],

        // },
      ],
      cateList: [],  // 类别划分
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

      }
    }
  },
  mounted() {
    this.contractsHeight = document.getElementById("contractinfo").offsetHeight - 113;
    this.tractData(); // 表格数据
  },
  methods: {
    tractData() {
        this.$http.post('/engineer/businessContract/getAllContractProInfo', {
          pageNum: this.currentPage,
          pageSize: this.pagesize,
          splitPage: true
        })
        .then(res => {
          // console.log(res)
          if(res.data.status == 200){
            this.contractList = res.data.data.pageInfo.list;
            this.total = res.data.data.pageInfo.total;
            // this.Loadings = false;

            // 2018/1 -12
            for(var x = 0; x< this.contractList.length; x++) {
              for(var y =0; y< this.contractList[x].excuteList.length; y++) {
                if(this.contractList[x].excuteList[y].fdContractExcuteDateid == 1) {
                  this.contractList[x].oneplan1 = this.contractList[x].excuteList[y].fdContractExcutePlanPayment; // 计划付款
                  this.contractList[x].acts1 = this.contractList[x].excuteList[y].fdContractExcuteInvoiceManeger; // 开票金额
                  this.contractList[x].mons1 = this.contractList[x].excuteList[y].fdContractExcuteRealityPayment; // 实际付款
                  this.contractList[x].rates1 = this.contractList[x].excuteList[y].fdContractExcutePlanRealityPayment; // 预实率
                }if(this.contractList[x].excuteList[y].fdContractExcuteDateid == 2) {
                  this.contractList[x].oneplan2 = this.contractList[x].excuteList[y].fdContractExcutePlanPayment; // 计划付款
                  this.contractList[x].acts2 = this.contractList[x].excuteList[y].fdContractExcuteInvoiceManeger; // 开票金额
                  this.contractList[x].mons2 = this.contractList[x].excuteList[y].fdContractExcuteRealityPayment; // 实际付款
                  this.contractList[x].rates2 = this.contractList[x].excuteList[y].fdContractExcutePlanRealityPayment; // 预实率
                }if(this.contractList[x].excuteList[y].fdContractExcuteDateid == 3) {
                  this.contractList[x].oneplan3 = this.contractList[x].excuteList[y].fdContractExcutePlanPayment; // 计划付款
                  this.contractList[x].acts3 = this.contractList[x].excuteList[y].fdContractExcuteInvoiceManeger; // 开票金额
                  this.contractList[x].mons3 = this.contractList[x].excuteList[y].fdContractExcuteRealityPayment; // 实际付款
                  this.contractList[x].rates3 = this.contractList[x].excuteList[y].fdContractExcutePlanRealityPayment; // 预实率
                }if(this.contractList[x].excuteList[y].fdContractExcuteDateid == 4) {
                  this.contractList[x].oneplan4 = this.contractList[x].excuteList[y].fdContractExcutePlanPayment; // 计划付款
                  this.contractList[x].acts4 = this.contractList[x].excuteList[y].fdContractExcuteInvoiceManeger; // 开票金额
                  this.contractList[x].mons4 = this.contractList[x].excuteList[y].fdContractExcuteRealityPayment; // 实际付款
                  this.contractList[x].rates4 = this.contractList[x].excuteList[y].fdContractExcutePlanRealityPayment; // 预实率
                }if(this.contractList[x].excuteList[y].fdContractExcuteDateid == 5) {
                  this.contractList[x].oneplan5 = this.contractList[x].excuteList[y].fdContractExcutePlanPayment; // 计划付款
                  this.contractList[x].acts5 = this.contractList[x].excuteList[y].fdContractExcuteInvoiceManeger; // 开票金额
                  this.contractList[x].mons5 = this.contractList[x].excuteList[y].fdContractExcuteRealityPayment; // 实际付款
                  this.contractList[x].rates5 = this.contractList[x].excuteList[y].fdContractExcutePlanRealityPayment; // 预实率
                }if(this.contractList[x].excuteList[y].fdContractExcuteDateid == 6) {
                  this.contractList[x].oneplan6 = this.contractList[x].excuteList[y].fdContractExcutePlanPayment; // 计划付款
                  this.contractList[x].acts6 = this.contractList[x].excuteList[y].fdContractExcuteInvoiceManeger; // 开票金额
                  this.contractList[x].mons6 = this.contractList[x].excuteList[y].fdContractExcuteRealityPayment; // 实际付款
                  this.contractList[x].rates6 = this.contractList[x].excuteList[y].fdContractExcutePlanRealityPayment; // 预实率
                }if(this.contractList[x].excuteList[y].fdContractExcuteDateid == 7) {
                  this.contractList[x].oneplan7 = this.contractList[x].excuteList[y].fdContractExcutePlanPayment; // 计划付款
                  this.contractList[x].acts7 = this.contractList[x].excuteList[y].fdContractExcuteInvoiceManeger; // 开票金额
                  this.contractList[x].mons7 = this.contractList[x].excuteList[y].fdContractExcuteRealityPayment; // 实际付款
                  this.contractList[x].rates7 = this.contractList[x].excuteList[y].fdContractExcutePlanRealityPayment; // 预实率
                }if(this.contractList[x].excuteList[y].fdContractExcuteDateid == 8) {
                  this.contractList[x].oneplan8 = this.contractList[x].excuteList[y].fdContractExcutePlanPayment; // 计划付款
                  this.contractList[x].acts8 = this.contractList[x].excuteList[y].fdContractExcuteInvoiceManeger; // 开票金额
                  this.contractList[x].mons8 = this.contractList[x].excuteList[y].fdContractExcuteRealityPayment; // 实际付款
                  this.contractList[x].rates8 = this.contractList[x].excuteList[y].fdContractExcutePlanRealityPayment; // 预实率
                }if(this.contractList[x].excuteList[y].fdContractExcuteDateid == 9) {
                  this.contractList[x].oneplan9 = this.contractList[x].excuteList[y].fdContractExcutePlanPayment; // 计划付款
                  this.contractList[x].acts9 = this.contractList[x].excuteList[y].fdContractExcuteInvoiceManeger; // 开票金额
                  this.contractList[x].mons9 = this.contractList[x].excuteList[y].fdContractExcuteRealityPayment; // 实际付款
                  this.contractList[x].rates9 = this.contractList[x].excuteList[y].fdContractExcutePlanRealityPayment; // 预实率
                }if(this.contractList[x].excuteList[y].fdContractExcuteDateid == 10) {
                  this.contractList[x].oneplan10 = this.contractList[x].excuteList[y].fdContractExcutePlanPayment; // 计划付款
                  this.contractList[x].acts10 = this.contractList[x].excuteList[y].fdContractExcuteInvoiceManeger; // 开票金额
                  this.contractList[x].mons10 = this.contractList[x].excuteList[y].fdContractExcuteRealityPayment; // 实际付款
                  this.contractList[x].rates10 = this.contractList[x].excuteList[y].fdContractExcutePlanRealityPayment; // 预实率
                }if(this.contractList[x].excuteList[y].fdContractExcuteDateid == 11) {
                  this.contractList[x].oneplan11 = this.contractList[x].excuteList[y].fdContractExcutePlanPayment; // 计划付款
                  this.contractList[x].acts11 = this.contractList[x].excuteList[y].fdContractExcuteInvoiceManeger; // 开票金额
                  this.contractList[x].mons11 = this.contractList[x].excuteList[y].fdContractExcuteRealityPayment; // 实际付款
                  this.contractList[x].rates11 = this.contractList[x].excuteList[y].fdContractExcutePlanRealityPayment; // 预实率
                }if(this.contractList[x].excuteList[y].fdContractExcuteDateid == 12) {
                  this.contractList[x].oneplan12 = this.contractList[x].excuteList[y].fdContractExcutePlanPayment; // 计划付款
                  this.contractList[x].acts12 = this.contractList[x].excuteList[y].fdContractExcuteInvoiceManeger; // 开票金额
                  this.contractList[x].mons12 = this.contractList[x].excuteList[y].fdContractExcuteRealityPayment; // 实际付款
                  this.contractList[x].rates12 = this.contractList[x].excuteList[y].fdContractExcutePlanRealityPayment; // 预实率
                }
              }
            }
          
            // 所属工程大区
            for(var i = 0; i< this.contractList.length; i++){
              if(this.contractList[i].fdEngineeringArea == 1) {
                this.contractList[i].fdEngineeringArea = '工程一区';
              }else if(this.contractList[i].fdEngineeringArea == 2) {
                this.contractList[i].fdEngineeringArea = '工程二区';
              }else if(this.contractList[i].fdEngineeringArea == 3) {
                this.contractList[i].fdEngineeringArea = '工程三区';
              }else if(this.contractList[i].fdEngineeringArea == 4) {
                this.contractList[i].fdEngineeringArea = '工程四区';
              }
            }

            // 承发包模式
            for(var i = 0; i< this.contractList.length; i++){
              if(this.contractList[i].fdPackageModel == 1) {
                this.contractList[i].fdPackageModel = '合资合作';
              }else if(this.contractList[i].fdPackageModel == 2) {
                this.contractList[i].fdPackageModel = '平行发包';
              }else if(this.contractList[i].fdPackageModel == 3) {
                this.contractList[i].fdPackageModel = 'PC总承包';
              }else if(this.contractList[i].fdPackageModel == 4) {
                this.contractList[i].fdPackageModel = 'EPC总承包';
              }else if(this.contractList[i].fdPackageModel == 5) {
                this.contractList[i].fdPackageModel = '施工总承包';
              }
            }

            for(var i = 0; i< this.contractList.length; i++){
              if(this.contractList[i].fdCfbBiasTimeStartworking){
                if(this.contractList[i].fdCfbBiasTimeStartworking.indexOf('滞后') != -1){
                  this.contractList[i].colors = 'red';
                }else if(this.contractList[i].fdCfbBiasTimeStartworking.indexOf('提前') != -1){
                  this.contractList[i].colors = 'skyblue';
                }else if(this.contractList[i].fdCfbBiasTimeStartworking.indexOf('正常') != -1){
                  this.contractList[i].colors = 'green';
                }else{
                  this.contractList[i].colors = 'green';
                }
              }
              if(this.contractList[i].fdCfbBiasTimeEndworking){
                if(this.contractList[i].fdCfbBiasTimeEndworking.indexOf('滞后') != -1){
                  this.contractList[i].colord = 'red';
                }else if(this.contractList[i].fdCfbBiasTimeEndworking.indexOf('提前') != -1){
                  this.contractList[i].colord = 'skyblue';
                }else if(this.contractList[i].fdCfbBiasTimeEndworking.indexOf('正常') != -1){
                  this.contractList[i].colord = 'green';
                }else{
                  this.contractList[i].colord = 'green';
                }
              }

              // 招标申请 偏差时间
              if(this.contractList[i].fdCfbApplyforBiasTime){
                if(this.contractList[i].fdCfbApplyforBiasTime.indexOf('滞后') != -1){
                  this.contractList[i].Biascolors = 'red';
                }else if(this.contractList[i].fdCfbApplyforBiasTime.indexOf('提前') != -1){
                  this.contractList[i].Biascolors = 'skyblue';
                }else if(this.contractList[i].fdCfbApplyforBiasTime.indexOf('正常') != -1){
                  this.contractList[i].Biascolors = 'green';
                }else{
                  this.contractList[i].Biascolors = 'green';
                }
              }

              // 技术资料提报 偏差时间
              if(this.contractList[i].fdSkillResourceHandinBiasTime){
                if(this.contractList[i].fdSkillResourceHandinBiasTime.indexOf('滞后') != -1){
                  this.contractList[i].Handcolors = 'red';
                }else if(this.contractList[i].fdSkillResourceHandinBiasTime.indexOf('提前') != -1){
                  this.contractList[i].Handcolors = 'skyblue';
                }else if(this.contractList[i].fdSkillResourceHandinBiasTime.indexOf('正常') != -1){
                  this.contractList[i].Handcolors = 'green';
                }else{
                  this.contractList[i].Handcolors = 'green';
                }
              }

              //工程量清单提报 偏差时间
              if(this.contractList[i].fdProRepertoireHandinBiasTime){
                if(this.contractList[i].fdProRepertoireHandinBiasTime.indexOf('滞后') != -1){
                  this.contractList[i].Repertcolors = 'red';
                }else if(this.contractList[i].fdProRepertoireHandinBiasTime.indexOf('提前') != -1){
                  this.contractList[i].Repertcolors = 'skyblue';
                }else if(this.contractList[i].fdProRepertoireHandinBiasTime.indexOf('正常') != -1){
                  this.contractList[i].Repertcolors = 'green';
                }else{
                  this.contractList[i].Repertcolors = 'green';
                }
              }
              //发标 偏差时间
              if(this.contractList[i].fdLaunchMarkBiasTime){
                if(this.contractList[i].fdLaunchMarkBiasTime.indexOf('滞后') != -1){
                  this.contractList[i].Markcolors = 'red';
                }else if(this.contractList[i].fdLaunchMarkBiasTime.indexOf('提前') != -1){
                  this.contractList[i].Markcolors = 'skyblue';
                }else if(this.contractList[i].fdLaunchMarkBiasTime.indexOf('正常') != -1){
                  this.contractList[i].Markcolors = 'green';
                }else{
                  this.contractList[i].Markcolors = 'green';
                }
              }

              //开标 偏差时间
              if(this.contractList[i].fdStartMarkBiasTime){
                if(this.contractList[i].fdStartMarkBiasTime.indexOf('滞后') != -1){
                  this.contractList[i].StartMarkcolors = 'red';
                }else if(this.contractList[i].fdStartMarkBiasTime.indexOf('提前') != -1){
                  this.contractList[i].StartMarkcolors = 'skyblue';
                }else if(this.contractList[i].fdStartMarkBiasTime.indexOf('正常') != -1){
                  this.contractList[i].StartMarkcolors = 'green';
                }else{
                  this.contractList[i].StartMarkcolors = 'green';
                }
              }
              // 定标偏差时间
              if(this.contractList[i].fdTofixMarkBiasTime){
                if(this.contractList[i].fdTofixMarkBiasTime.indexOf('滞后') != -1){
                  this.contractList[i].fixcolors = 'red';
                }else if(this.contractList[i].fdTofixMarkBiasTime.indexOf('提前') != -1){
                  this.contractList[i].fixcolors = 'skyblue';
                }else if(this.contractList[i].fdTofixMarkBiasTime.indexOf('正常') != -1){
                  this.contractList[i].fixcolors = 'green';
                }else{
                  this.contractList[i].fixcolors = 'green';
                }
              }

            }
            // 项目经理
            // for(var i = 0; i< this.contractList.length; i++){
            //   for(var j = 0; j<this.contractList[i].proManegerList.length; j++) {
            //     if(this.contractList[i].proManegerList[j].fdGropPost == 9){
            //       this.contractList[i].fdGroupPost = this.contractList[i].proManegerList[j].fdPostName;
            //     }
            //   }
            // }

            
          } 
        })
    },
    // 查看详情
    Details(id, type, content) {
      if(type == "looks"){ // 招标范围
        this.modelFlag.title = '招标范围详情';
        this.modelFlag.showModel = true;
        this.modelFlag.type = type;
        this.modelFlag.con = content;
        this.modelFlag.idx = id;
      }else if(type == "analysis"){ // 履约分析
        this.modelFlag.title = '履约分析详情';
        this.modelFlag.showModel = true;
        this.modelFlag.type = type;
        this.modelFlag.con = content;
        this.modelFlag.idx = id; 
      }else if(type == "remarks"){ // 备注
        this.modelFlag.title = '备注详情';
        this.modelFlag.showModel = true;
        this.modelFlag.type = type;
        this.modelFlag.con = content;
        this.modelFlag.idx = id;
      }else if(type == "progress"){ // 本周进展
        this.modelFlag.title = '本周进展详情';
        this.modelFlag.showModel = true;
        this.modelFlag.type = type;
        this.modelFlag.con = content;
        this.modelFlag.idx = id;   
      }
    },
    // 回车事件
    enterToSearch (ev) {
        ev.keyCode === 13 && this.getSearch();
    },
    // 搜索
    getSearch() {
        this.$http.post('/engineer/businessContract/getByProNameQueryProContractInfo', {
          pageNum: 1,
          pageSize: 7,
          splitPage: true,
          fdName: this.tractname, // 项目名称
          fdContractTypeDivideParentPropertyName: this.tractbids, // 标段名称
          fdForMiningEngineer: this.tractinvit,  // 招采工程师
          fdContractManager: this.tractman,  // 合同经理
          fdEngineeringArea: this.tractengineer,  // 所属工程大区
        }).then(res => {
          //  console.log(res);
           this.contractList = res.data.data.pageInfo.list;
           this.total = res.data.data.pageInfo.total;
           let arr = res.data.data.typeList;  // 类别划分
           
          // 所属工程大区
          for(var i = 0; i< this.contractList.length; i++){
            if(this.contractList[i].fdEngineeringArea == 1) {
              this.contractList[i].fdEngineeringArea = '工程一区';
            }else if(this.contractList[i].fdEngineeringArea == 2) {
              this.contractList[i].fdEngineeringArea = '工程二区';
            }else if(this.contractList[i].fdEngineeringArea == 3) {
              this.contractList[i].fdEngineeringArea = '工程三区';
            }else if(this.contractList[i].fdEngineeringArea == 4) {
              this.contractList[i].fdEngineeringArea = '工程四区';
            }
          }

          // 承发包模式
          for(var i = 0; i< this.contractList.length; i++){
            if(this.contractList[i].fdPackageModel == 1) {
              this.contractList[i].fdPackageModel = '合资合作';
            }else if(this.contractList[i].fdPackageModel == 2) {
              this.contractList[i].fdPackageModel = '平行发包';
            }else if(this.contractList[i].fdPackageModel == 3) {
              this.contractList[i].fdPackageModel = 'PC总承包';
            }else if(this.contractList[i].fdPackageModel == 4) {
              this.contractList[i].fdPackageModel = 'EPC总承包';
            }else if(this.contractList[i].fdPackageModel == 5) {
              this.contractList[i].fdPackageModel = '施工总承包';
            }
          }

          // 2018/1 -12
          for(var x = 0; x< this.contractList.length; x++) {
            for(var y =0; y< this.contractList[x].excuteList.length; y++) {
              if(this.contractList[x].excuteList[y].fdContractExcuteDateid == 1) {
                this.contractList[x].oneplan1 = this.contractList[x].excuteList[y].fdContractExcutePlanPayment; // 计划付款
                this.contractList[x].acts1 = this.contractList[x].excuteList[y].fdContractExcuteInvoiceManeger; // 开票金额
                this.contractList[x].mons1 = this.contractList[x].excuteList[y].fdContractExcuteRealityPayment; // 实际付款
                this.contractList[x].rates1 = this.contractList[x].excuteList[y].fdContractExcutePlanRealityPayment; // 预实率
              }if(this.contractList[x].excuteList[y].fdContractExcuteDateid == 2) {
                this.contractList[x].oneplan2 = this.contractList[x].excuteList[y].fdContractExcutePlanPayment; // 计划付款
                this.contractList[x].acts2 = this.contractList[x].excuteList[y].fdContractExcuteInvoiceManeger; // 开票金额
                this.contractList[x].mons2 = this.contractList[x].excuteList[y].fdContractExcuteRealityPayment; // 实际付款
                this.contractList[x].rates2 = this.contractList[x].excuteList[y].fdContractExcutePlanRealityPayment; // 预实率
              }if(this.contractList[x].excuteList[y].fdContractExcuteDateid == 3) {
                this.contractList[x].oneplan3 = this.contractList[x].excuteList[y].fdContractExcutePlanPayment; // 计划付款
                this.contractList[x].acts3 = this.contractList[x].excuteList[y].fdContractExcuteInvoiceManeger; // 开票金额
                this.contractList[x].mons3 = this.contractList[x].excuteList[y].fdContractExcuteRealityPayment; // 实际付款
                this.contractList[x].rates3 = this.contractList[x].excuteList[y].fdContractExcutePlanRealityPayment; // 预实率
              }if(this.contractList[x].excuteList[y].fdContractExcuteDateid == 4) {
                this.contractList[x].oneplan4 = this.contractList[x].excuteList[y].fdContractExcutePlanPayment; // 计划付款
                this.contractList[x].acts4 = this.contractList[x].excuteList[y].fdContractExcuteInvoiceManeger; // 开票金额
                this.contractList[x].mons4 = this.contractList[x].excuteList[y].fdContractExcuteRealityPayment; // 实际付款
                this.contractList[x].rates4 = this.contractList[x].excuteList[y].fdContractExcutePlanRealityPayment; // 预实率
              }if(this.contractList[x].excuteList[y].fdContractExcuteDateid == 5) {
                this.contractList[x].oneplan5 = this.contractList[x].excuteList[y].fdContractExcutePlanPayment; // 计划付款
                this.contractList[x].acts5 = this.contractList[x].excuteList[y].fdContractExcuteInvoiceManeger; // 开票金额
                this.contractList[x].mons5 = this.contractList[x].excuteList[y].fdContractExcuteRealityPayment; // 实际付款
                this.contractList[x].rates5 = this.contractList[x].excuteList[y].fdContractExcutePlanRealityPayment; // 预实率
              }if(this.contractList[x].excuteList[y].fdContractExcuteDateid == 6) {
                this.contractList[x].oneplan6 = this.contractList[x].excuteList[y].fdContractExcutePlanPayment; // 计划付款
                this.contractList[x].acts6 = this.contractList[x].excuteList[y].fdContractExcuteInvoiceManeger; // 开票金额
                this.contractList[x].mons6 = this.contractList[x].excuteList[y].fdContractExcuteRealityPayment; // 实际付款
                this.contractList[x].rates6 = this.contractList[x].excuteList[y].fdContractExcutePlanRealityPayment; // 预实率
              }if(this.contractList[x].excuteList[y].fdContractExcuteDateid == 7) {
                this.contractList[x].oneplan7 = this.contractList[x].excuteList[y].fdContractExcutePlanPayment; // 计划付款
                this.contractList[x].acts7 = this.contractList[x].excuteList[y].fdContractExcuteInvoiceManeger; // 开票金额
                this.contractList[x].mons7 = this.contractList[x].excuteList[y].fdContractExcuteRealityPayment; // 实际付款
                this.contractList[x].rates7 = this.contractList[x].excuteList[y].fdContractExcutePlanRealityPayment; // 预实率
              }if(this.contractList[x].excuteList[y].fdContractExcuteDateid == 8) {
                this.contractList[x].oneplan8 = this.contractList[x].excuteList[y].fdContractExcutePlanPayment; // 计划付款
                this.contractList[x].acts8 = this.contractList[x].excuteList[y].fdContractExcuteInvoiceManeger; // 开票金额
                this.contractList[x].mons8 = this.contractList[x].excuteList[y].fdContractExcuteRealityPayment; // 实际付款
                this.contractList[x].rates8 = this.contractList[x].excuteList[y].fdContractExcutePlanRealityPayment; // 预实率
              }if(this.contractList[x].excuteList[y].fdContractExcuteDateid == 9) {
                this.contractList[x].oneplan9 = this.contractList[x].excuteList[y].fdContractExcutePlanPayment; // 计划付款
                this.contractList[x].acts9 = this.contractList[x].excuteList[y].fdContractExcuteInvoiceManeger; // 开票金额
                this.contractList[x].mons9 = this.contractList[x].excuteList[y].fdContractExcuteRealityPayment; // 实际付款
                this.contractList[x].rates9 = this.contractList[x].excuteList[y].fdContractExcutePlanRealityPayment; // 预实率
              }if(this.contractList[x].excuteList[y].fdContractExcuteDateid == 10) {
                this.contractList[x].oneplan10 = this.contractList[x].excuteList[y].fdContractExcutePlanPayment; // 计划付款
                this.contractList[x].acts10 = this.contractList[x].excuteList[y].fdContractExcuteInvoiceManeger; // 开票金额
                this.contractList[x].mons10 = this.contractList[x].excuteList[y].fdContractExcuteRealityPayment; // 实际付款
                this.contractList[x].rates10 = this.contractList[x].excuteList[y].fdContractExcutePlanRealityPayment; // 预实率
              }if(this.contractList[x].excuteList[y].fdContractExcuteDateid == 11) {
                this.contractList[x].oneplan11 = this.contractList[x].excuteList[y].fdContractExcutePlanPayment; // 计划付款
                this.contractList[x].acts11 = this.contractList[x].excuteList[y].fdContractExcuteInvoiceManeger; // 开票金额
                this.contractList[x].mons11 = this.contractList[x].excuteList[y].fdContractExcuteRealityPayment; // 实际付款
                this.contractList[x].rates11 = this.contractList[x].excuteList[y].fdContractExcutePlanRealityPayment; // 预实率
              }if(this.contractList[x].excuteList[y].fdContractExcuteDateid == 12) {
                this.contractList[x].oneplan12 = this.contractList[x].excuteList[y].fdContractExcutePlanPayment; // 计划付款
                this.contractList[x].acts12 = this.contractList[x].excuteList[y].fdContractExcuteInvoiceManeger; // 开票金额
                this.contractList[x].mons12 = this.contractList[x].excuteList[y].fdContractExcuteRealityPayment; // 实际付款
                this.contractList[x].rates12 = this.contractList[x].excuteList[y].fdContractExcutePlanRealityPayment; // 预实率
              }
            }
          }

          for(var i = 0; i< this.contractList.length; i++){
              if(this.contractList[i].fdCfbBiasTimeStartworking){
                if(this.contractList[i].fdCfbBiasTimeStartworking.indexOf('滞后') != -1){
                  this.contractList[i].colors = 'red';
                }else if(this.contractList[i].fdCfbBiasTimeStartworking.indexOf('提前') != -1){
                  this.contractList[i].colors = 'skyblue';
                }else if(this.contractList[i].fdCfbBiasTimeStartworking.indexOf('正常') != -1){
                  this.contractList[i].colors = 'green';
                }else{
                  this.contractList[i].colors = 'green';
                }
              }
              if(this.contractList[i].fdCfbBiasTimeEndworking){
                if(this.contractList[i].fdCfbBiasTimeEndworking.indexOf('滞后') != -1){
                  this.contractList[i].colord = 'red';
                }else if(this.contractList[i].fdCfbBiasTimeEndworking.indexOf('提前') != -1){
                  this.contractList[i].colord = 'skyblue';
                }else if(this.contractList[i].fdCfbBiasTimeEndworking.indexOf('正常') != -1){
                  this.contractList[i].colord = 'green';
                }else{
                  this.contractList[i].colord = 'green';
                }
              }

              // 招标申请 偏差时间
              if(this.contractList[i].fdCfbApplyforBiasTime){
                if(this.contractList[i].fdCfbApplyforBiasTime.indexOf('滞后') != -1){
                  this.contractList[i].Biascolors = 'red';
                }else if(this.contractList[i].fdCfbApplyforBiasTime.indexOf('提前') != -1){
                  this.contractList[i].Biascolors = 'skyblue';
                }else if(this.contractList[i].fdCfbApplyforBiasTime.indexOf('正常') != -1){
                  this.contractList[i].Biascolors = 'green';
                }else{
                  this.contractList[i].Biascolors = 'green';
                }
              }

              // 技术资料提报 偏差时间
              if(this.contractList[i].fdSkillResourceHandinBiasTime){
                if(this.contractList[i].fdSkillResourceHandinBiasTime.indexOf('滞后') != -1){
                  this.contractList[i].Handcolors = 'red';
                }else if(this.contractList[i].fdSkillResourceHandinBiasTime.indexOf('提前') != -1){
                  this.contractList[i].Handcolors = 'skyblue';
                }else if(this.contractList[i].fdSkillResourceHandinBiasTime.indexOf('正常') != -1){
                  this.contractList[i].Handcolors = 'green';
                }else{
                  this.contractList[i].Handcolors = 'green';
                }
              }

              //工程量清单提报 偏差时间
              if(this.contractList[i].fdProRepertoireHandinBiasTime){
                if(this.contractList[i].fdProRepertoireHandinBiasTime.indexOf('滞后') != -1){
                  this.contractList[i].Repertcolors = 'red';
                }else if(this.contractList[i].fdProRepertoireHandinBiasTime.indexOf('提前') != -1){
                  this.contractList[i].Repertcolors = 'skyblue';
                }else if(this.contractList[i].fdProRepertoireHandinBiasTime.indexOf('正常') != -1){
                  this.contractList[i].Repertcolors = 'green';
                }else{
                  this.contractList[i].Repertcolors = 'green';
                }
              }
              //发标 偏差时间
              if(this.contractList[i].fdLaunchMarkBiasTime){
                if(this.contractList[i].fdLaunchMarkBiasTime.indexOf('滞后') != -1){
                  this.contractList[i].Markcolors = 'red';
                }else if(this.contractList[i].fdLaunchMarkBiasTime.indexOf('提前') != -1){
                  this.contractList[i].Markcolors = 'skyblue';
                }else if(this.contractList[i].fdLaunchMarkBiasTime.indexOf('正常') != -1){
                  this.contractList[i].Markcolors = 'green';
                }else{
                  this.contractList[i].Markcolors = 'green';
                }
              }

              //开标 偏差时间
              if(this.contractList[i].fdStartMarkBiasTime){
                if(this.contractList[i].fdStartMarkBiasTime.indexOf('滞后') != -1){
                  this.contractList[i].StartMarkcolors = 'red';
                }else if(this.contractList[i].fdStartMarkBiasTime.indexOf('提前') != -1){
                  this.contractList[i].StartMarkcolors = 'skyblue';
                }else if(this.contractList[i].fdStartMarkBiasTime.indexOf('正常') != -1){
                  this.contractList[i].StartMarkcolors = 'green';
                }else{
                  this.contractList[i].StartMarkcolors = 'green';
                }
              }
              // 定标偏差时间
              if(this.contractList[i].fdTofixMarkBiasTime){
                if(this.contractList[i].fdTofixMarkBiasTime.indexOf('滞后') != -1){
                  this.contractList[i].fixcolors = 'red';
                }else if(this.contractList[i].fdTofixMarkBiasTime.indexOf('提前') != -1){
                  this.contractList[i].fixcolors = 'skyblue';
                }else if(this.contractList[i].fdTofixMarkBiasTime.indexOf('正常') != -1){
                  this.contractList[i].fixcolors = 'green';
                }else{
                  this.contractList[i].fixcolors = 'green';
                }
              }

          }
          // 类别划分
          // arr.forEach((item)  => {
          //   let obj = {
          //     value: '',
          //     label: ''
          //   }
          //   obj.value = item.fdContractTypeDivideParent;
          //   obj.label = item.fdContractTypeDivideTotalPropertyName;
          //   this.cateList.push(obj);
          // });
        })
    },
    // 重置
    resetSearch() {
      this.tractname = '';
      this.tractbids = '';
      this.tractinvit = '';
      this.tractman = '';
      this.tractengineer = '';
      this.$http.post('/engineer/businessContract/getByProNameQueryProContractInfo', {
          pageNum: 1,
          pageSize: 7,
          splitPage: true,
          fdName: '', // 项目名称
          fdContractTypeDivideParentPropertyName: '', // 标段名称
          fdForMiningEngineer: '',  // 招采工程师
          fdContractManager: '',  // 合同经理
          fdEngineeringArea: '',  // 所属工程大区
        }).then(res => {
          //  console.log(res);
           this.contractList = res.data.data.pageInfo.list;
           this.total = res.data.data.pageInfo.total;
           
          // 所属工程大区
          for(var i = 0; i< this.contractList.length; i++){
            if(this.contractList[i].fdEngineeringArea == 1) {
              this.contractList[i].fdEngineeringArea = '工程一区';
            }else if(this.contractList[i].fdEngineeringArea == 2) {
              this.contractList[i].fdEngineeringArea = '工程二区';
            }else if(this.contractList[i].fdEngineeringArea == 3) {
              this.contractList[i].fdEngineeringArea = '工程三区';
            }else if(this.contractList[i].fdEngineeringArea == 4) {
              this.contractList[i].fdEngineeringArea = '工程四区';
            }
          }

          // 承发包模式
          for(var i = 0; i< this.contractList.length; i++){
            if(this.contractList[i].fdPackageModel == 1) {
              this.contractList[i].fdPackageModel = '合资合作';
            }else if(this.contractList[i].fdPackageModel == 2) {
              this.contractList[i].fdPackageModel = '平行发包';
            }else if(this.contractList[i].fdPackageModel == 3) {
              this.contractList[i].fdPackageModel = 'PC总承包';
            }else if(this.contractList[i].fdPackageModel == 4) {
              this.contractList[i].fdPackageModel = 'EPC总承包';
            }else if(this.contractList[i].fdPackageModel == 5) {
              this.contractList[i].fdPackageModel = '施工总承包';
            }
          }

          // 2018/1 -12
          for(var x = 0; x< this.contractList.length; x++) {
            for(var y =0; y< this.contractList[x].excuteList.length; y++) {
              if(this.contractList[x].excuteList[y].fdContractExcuteDateid == 1) {
                this.contractList[x].oneplan1 = this.contractList[x].excuteList[y].fdContractExcutePlanPayment; // 计划付款
                this.contractList[x].acts1 = this.contractList[x].excuteList[y].fdContractExcuteInvoiceManeger; // 开票金额
                this.contractList[x].mons1 = this.contractList[x].excuteList[y].fdContractExcuteRealityPayment; // 实际付款
                this.contractList[x].rates1 = this.contractList[x].excuteList[y].fdContractExcutePlanRealityPayment; // 预实率
              }if(this.contractList[x].excuteList[y].fdContractExcuteDateid == 2) {
                this.contractList[x].oneplan2 = this.contractList[x].excuteList[y].fdContractExcutePlanPayment; // 计划付款
                this.contractList[x].acts2 = this.contractList[x].excuteList[y].fdContractExcuteInvoiceManeger; // 开票金额
                this.contractList[x].mons2 = this.contractList[x].excuteList[y].fdContractExcuteRealityPayment; // 实际付款
                this.contractList[x].rates2 = this.contractList[x].excuteList[y].fdContractExcutePlanRealityPayment; // 预实率
              }if(this.contractList[x].excuteList[y].fdContractExcuteDateid == 3) {
                this.contractList[x].oneplan3 = this.contractList[x].excuteList[y].fdContractExcutePlanPayment; // 计划付款
                this.contractList[x].acts3 = this.contractList[x].excuteList[y].fdContractExcuteInvoiceManeger; // 开票金额
                this.contractList[x].mons3 = this.contractList[x].excuteList[y].fdContractExcuteRealityPayment; // 实际付款
                this.contractList[x].rates3 = this.contractList[x].excuteList[y].fdContractExcutePlanRealityPayment; // 预实率
              }if(this.contractList[x].excuteList[y].fdContractExcuteDateid == 4) {
                this.contractList[x].oneplan4 = this.contractList[x].excuteList[y].fdContractExcutePlanPayment; // 计划付款
                this.contractList[x].acts4 = this.contractList[x].excuteList[y].fdContractExcuteInvoiceManeger; // 开票金额
                this.contractList[x].mons4 = this.contractList[x].excuteList[y].fdContractExcuteRealityPayment; // 实际付款
                this.contractList[x].rates4 = this.contractList[x].excuteList[y].fdContractExcutePlanRealityPayment; // 预实率
              }if(this.contractList[x].excuteList[y].fdContractExcuteDateid == 5) {
                this.contractList[x].oneplan5 = this.contractList[x].excuteList[y].fdContractExcutePlanPayment; // 计划付款
                this.contractList[x].acts5 = this.contractList[x].excuteList[y].fdContractExcuteInvoiceManeger; // 开票金额
                this.contractList[x].mons5 = this.contractList[x].excuteList[y].fdContractExcuteRealityPayment; // 实际付款
                this.contractList[x].rates5 = this.contractList[x].excuteList[y].fdContractExcutePlanRealityPayment; // 预实率
              }if(this.contractList[x].excuteList[y].fdContractExcuteDateid == 6) {
                this.contractList[x].oneplan6 = this.contractList[x].excuteList[y].fdContractExcutePlanPayment; // 计划付款
                this.contractList[x].acts6 = this.contractList[x].excuteList[y].fdContractExcuteInvoiceManeger; // 开票金额
                this.contractList[x].mons6 = this.contractList[x].excuteList[y].fdContractExcuteRealityPayment; // 实际付款
                this.contractList[x].rates6 = this.contractList[x].excuteList[y].fdContractExcutePlanRealityPayment; // 预实率
              }if(this.contractList[x].excuteList[y].fdContractExcuteDateid == 7) {
                this.contractList[x].oneplan7 = this.contractList[x].excuteList[y].fdContractExcutePlanPayment; // 计划付款
                this.contractList[x].acts7 = this.contractList[x].excuteList[y].fdContractExcuteInvoiceManeger; // 开票金额
                this.contractList[x].mons7 = this.contractList[x].excuteList[y].fdContractExcuteRealityPayment; // 实际付款
                this.contractList[x].rates7 = this.contractList[x].excuteList[y].fdContractExcutePlanRealityPayment; // 预实率
              }if(this.contractList[x].excuteList[y].fdContractExcuteDateid == 8) {
                this.contractList[x].oneplan8 = this.contractList[x].excuteList[y].fdContractExcutePlanPayment; // 计划付款
                this.contractList[x].acts8 = this.contractList[x].excuteList[y].fdContractExcuteInvoiceManeger; // 开票金额
                this.contractList[x].mons8 = this.contractList[x].excuteList[y].fdContractExcuteRealityPayment; // 实际付款
                this.contractList[x].rates8 = this.contractList[x].excuteList[y].fdContractExcutePlanRealityPayment; // 预实率
              }if(this.contractList[x].excuteList[y].fdContractExcuteDateid == 9) {
                this.contractList[x].oneplan9 = this.contractList[x].excuteList[y].fdContractExcutePlanPayment; // 计划付款
                this.contractList[x].acts9 = this.contractList[x].excuteList[y].fdContractExcuteInvoiceManeger; // 开票金额
                this.contractList[x].mons9 = this.contractList[x].excuteList[y].fdContractExcuteRealityPayment; // 实际付款
                this.contractList[x].rates9 = this.contractList[x].excuteList[y].fdContractExcutePlanRealityPayment; // 预实率
              }if(this.contractList[x].excuteList[y].fdContractExcuteDateid == 10) {
                this.contractList[x].oneplan10 = this.contractList[x].excuteList[y].fdContractExcutePlanPayment; // 计划付款
                this.contractList[x].acts10 = this.contractList[x].excuteList[y].fdContractExcuteInvoiceManeger; // 开票金额
                this.contractList[x].mons10 = this.contractList[x].excuteList[y].fdContractExcuteRealityPayment; // 实际付款
                this.contractList[x].rates10 = this.contractList[x].excuteList[y].fdContractExcutePlanRealityPayment; // 预实率
              }if(this.contractList[x].excuteList[y].fdContractExcuteDateid == 11) {
                this.contractList[x].oneplan11 = this.contractList[x].excuteList[y].fdContractExcutePlanPayment; // 计划付款
                this.contractList[x].acts11 = this.contractList[x].excuteList[y].fdContractExcuteInvoiceManeger; // 开票金额
                this.contractList[x].mons11 = this.contractList[x].excuteList[y].fdContractExcuteRealityPayment; // 实际付款
                this.contractList[x].rates11 = this.contractList[x].excuteList[y].fdContractExcutePlanRealityPayment; // 预实率
              }if(this.contractList[x].excuteList[y].fdContractExcuteDateid == 12) {
                this.contractList[x].oneplan12 = this.contractList[x].excuteList[y].fdContractExcutePlanPayment; // 计划付款
                this.contractList[x].acts12 = this.contractList[x].excuteList[y].fdContractExcuteInvoiceManeger; // 开票金额
                this.contractList[x].mons12 = this.contractList[x].excuteList[y].fdContractExcuteRealityPayment; // 实际付款
                this.contractList[x].rates12 = this.contractList[x].excuteList[y].fdContractExcutePlanRealityPayment; // 预实率
              }
            }
          }
          for(var i = 0; i< this.contractList.length; i++){
              if(this.contractList[i].fdCfbBiasTimeStartworking){
                if(this.contractList[i].fdCfbBiasTimeStartworking.indexOf('滞后') != -1){
                  this.contractList[i].colors = 'red';
                }else if(this.contractList[i].fdCfbBiasTimeStartworking.indexOf('提前') != -1){
                  this.contractList[i].colors = 'skyblue';
                }else if(this.contractList[i].fdCfbBiasTimeStartworking.indexOf('正常') != -1){
                  this.contractList[i].colors = 'green';
                }else{
                  this.contractList[i].colors = 'green';
                }
              }
              if(this.contractList[i].fdCfbBiasTimeEndworking){
                if(this.contractList[i].fdCfbBiasTimeEndworking.indexOf('滞后') != -1){
                  this.contractList[i].colord = 'red';
                }else if(this.contractList[i].fdCfbBiasTimeEndworking.indexOf('提前') != -1){
                  this.contractList[i].colord = 'skyblue';
                }else if(this.contractList[i].fdCfbBiasTimeEndworking.indexOf('正常') != -1){
                  this.contractList[i].colord = 'green';
                }else{
                  this.contractList[i].colord = 'green';
                }
              }

              // 招标申请 偏差时间
              if(this.contractList[i].fdCfbApplyforBiasTime){
                if(this.contractList[i].fdCfbApplyforBiasTime.indexOf('滞后') != -1){
                  this.contractList[i].Biascolors = 'red';
                }else if(this.contractList[i].fdCfbApplyforBiasTime.indexOf('提前') != -1){
                  this.contractList[i].Biascolors = 'skyblue';
                }else if(this.contractList[i].fdCfbApplyforBiasTime.indexOf('正常') != -1){
                  this.contractList[i].Biascolors = 'green';
                }else{
                  this.contractList[i].Biascolors = 'green';
                }
              }

              // 技术资料提报 偏差时间
              if(this.contractList[i].fdSkillResourceHandinBiasTime){
                if(this.contractList[i].fdSkillResourceHandinBiasTime.indexOf('滞后') != -1){
                  this.contractList[i].Handcolors = 'red';
                }else if(this.contractList[i].fdSkillResourceHandinBiasTime.indexOf('提前') != -1){
                  this.contractList[i].Handcolors = 'skyblue';
                }else if(this.contractList[i].fdSkillResourceHandinBiasTime.indexOf('正常') != -1){
                  this.contractList[i].Handcolors = 'green';
                }else{
                  this.contractList[i].Handcolors = 'green';
                }
              }

              //工程量清单提报 偏差时间
              if(this.contractList[i].fdProRepertoireHandinBiasTime){
                if(this.contractList[i].fdProRepertoireHandinBiasTime.indexOf('滞后') != -1){
                  this.contractList[i].Repertcolors = 'red';
                }else if(this.contractList[i].fdProRepertoireHandinBiasTime.indexOf('提前') != -1){
                  this.contractList[i].Repertcolors = 'skyblue';
                }else if(this.contractList[i].fdProRepertoireHandinBiasTime.indexOf('正常') != -1){
                  this.contractList[i].Repertcolors = 'green';
                }else{
                  this.contractList[i].Repertcolors = 'green';
                }
              }
              //发标 偏差时间
              if(this.contractList[i].fdLaunchMarkBiasTime){
                if(this.contractList[i].fdLaunchMarkBiasTime.indexOf('滞后') != -1){
                  this.contractList[i].Markcolors = 'red';
                }else if(this.contractList[i].fdLaunchMarkBiasTime.indexOf('提前') != -1){
                  this.contractList[i].Markcolors = 'skyblue';
                }else if(this.contractList[i].fdLaunchMarkBiasTime.indexOf('正常') != -1){
                  this.contractList[i].Markcolors = 'green';
                }else{
                  this.contractList[i].Markcolors = 'green';
                }
              }

              //开标 偏差时间
              if(this.contractList[i].fdStartMarkBiasTime){
                if(this.contractList[i].fdStartMarkBiasTime.indexOf('滞后') != -1){
                  this.contractList[i].StartMarkcolors = 'red';
                }else if(this.contractList[i].fdStartMarkBiasTime.indexOf('提前') != -1){
                  this.contractList[i].StartMarkcolors = 'skyblue';
                }else if(this.contractList[i].fdStartMarkBiasTime.indexOf('正常') != -1){
                  this.contractList[i].StartMarkcolors = 'green';
                }else{
                  this.contractList[i].StartMarkcolors = 'green';
                }
              }
              // 定标偏差时间
              if(this.contractList[i].fdTofixMarkBiasTime){
                if(this.contractList[i].fdTofixMarkBiasTime.indexOf('滞后') != -1){
                  this.contractList[i].fixcolors = 'red';
                }else if(this.contractList[i].fdTofixMarkBiasTime.indexOf('提前') != -1){
                  this.contractList[i].fixcolors = 'skyblue';
                }else if(this.contractList[i].fdTofixMarkBiasTime.indexOf('正常') != -1){
                  this.contractList[i].fixcolors = 'green';
                }else{
                  this.contractList[i].fixcolors = 'green';
                }
              }

          }
        })
    },
    // 新增
    Addtract() {
      this.$router.push({name: 'contractd'});  // 可编辑表格页面
    },
    // 编辑
    Edittract(row) {
      // for(var i=0;i<this.cateList.length;i++){
      //   if(this.contractList[row.$index].fdContractTypeDivideTotalPropertyName==this.cateList[i].label){
      //     this.contractList[row.$index].fdContractTypeDivideParent=this.cateList[i].value;
      //     break;
      //   }
      // }
      this.$router.push({path: '/main/contract', query: {row: JSON.stringify(this.contractList[row.$index])}});  // 可编辑表格页面
    },
    // 删除
    Deltract(row) {
      this.$confirm('确定要删除吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.post('/engineer/businessContract/deleteContractSectionInfo', {
            fdProId: row.fdProId,  // 项目id
            fdSectionNameChildId: row.fdSectionNameChildId,  // 标段id
            fdContractProid: row.fdContractProid
          })
          .then(res => {
            // console.log(res);
            if(res.status == 200) {
              this.tractData();
              this.$message('删除成功');
            }else{
              this.$message('删除失败');
            }
          })
        }).catch(() => {

        });
    },
    // 查看附件
    downsFile() {
      this.$message('正在建设中...');
    },
    // 表头颜色
    getRowClass({ row, column, rowIndex, columnIndex }) {
				if ((rowIndex === 0) && (columnIndex === 0 || columnIndex === 1)) { // 项目名称
					return 'background: rgb(232, 238, 248)';
				}if ((rowIndex === 1) && (columnIndex === 0 || columnIndex === 1 || columnIndex === 2 || columnIndex === 3)) { // 项目基本信息
					return 'background: rgb(232, 238, 248)';
				}if ((rowIndex === 0) && (columnIndex === 3)) { // 招标基本信息
					return 'background: rgb(232, 248, 245)';
				}if ((rowIndex === 1) && (columnIndex === 13 ||columnIndex === 14 || columnIndex === 15 ||columnIndex === 16||columnIndex === 17 || columnIndex === 18 ||columnIndex === 19 ||columnIndex === 20 || columnIndex === 21 ||columnIndex === 22 ||columnIndex === 23 || columnIndex === 24 ||columnIndex === 25 ||columnIndex === 26 || columnIndex === 27 ||columnIndex === 28 ||columnIndex === 29 )) {
					return 'background: rgb(232, 248, 245)'; // 招标基本信息
				}if ((rowIndex ===2 ) && (columnIndex === 4 || columnIndex === 5 || columnIndex === 6 || columnIndex === 7 || columnIndex === 8|| columnIndex === 9 || columnIndex === 10 || columnIndex === 11 || columnIndex === 12|| columnIndex === 13 || columnIndex === 14 || columnIndex === 15|| columnIndex === 16 || columnIndex === 17 || columnIndex === 18|| columnIndex === 19 || columnIndex === 20 || columnIndex === 21|| columnIndex === 22)) {
					return 'background: rgb(232, 248, 245)'; // 招标基本信息
				}if ((rowIndex === 0) && (columnIndex === 4)) { // 合同台账
					return 'background: rgb(252, 242, 228)';
				}if ((rowIndex ===1 ) && (columnIndex === 30 || columnIndex === 31|| columnIndex === 32|| columnIndex === 33|| columnIndex === 34|| columnIndex === 35|| columnIndex === 36|| columnIndex === 37|| columnIndex === 38|| columnIndex === 39|| columnIndex === 40|| columnIndex === 41|| columnIndex === 42|| columnIndex === 43)) {
					return 'background: rgb(252, 242, 228)'; // 合同台账
				}if ((rowIndex ===2 ) && (columnIndex === 23 || columnIndex === 24 || columnIndex === 25|| columnIndex === 26 ||columnIndex === 27||columnIndex === 28||columnIndex === 29||columnIndex === 30)) {
					return 'background: rgb(252, 242, 228)'; // 合同台账
				}if ((rowIndex === 0) && (columnIndex === 5 || columnIndex === 6)) { // 合同资金支付情况
					return 'background: rgb(252, 236, 232)';
				}if ((rowIndex ===1 ) && (columnIndex === 44 || columnIndex === 45|| columnIndex === 46|| columnIndex === 47|| columnIndex === 48|| columnIndex === 49|| columnIndex === 50|| columnIndex === 51|| columnIndex === 52|| columnIndex === 53|| columnIndex === 54|| columnIndex === 55|| columnIndex === 56|| columnIndex === 57|| columnIndex === 58|| columnIndex === 59|| columnIndex === 60|| columnIndex === 61)) {
					return 'background: rgb(252, 236, 232)'; // 合同资金支付情况
				}if ((rowIndex ===2 ) && (columnIndex === 31 || columnIndex === 32|| columnIndex === 33 ||columnIndex === 34||columnIndex === 35||columnIndex === 36||columnIndex === 37|| columnIndex === 38 || columnIndex === 39|| columnIndex === 40 ||columnIndex === 41||columnIndex === 42||columnIndex === 43||columnIndex === 44|| columnIndex === 45 || columnIndex === 46|| columnIndex === 47 ||columnIndex === 48||columnIndex === 49||columnIndex === 50||columnIndex === 51|| columnIndex === 52|| columnIndex === 53 ||columnIndex === 54||columnIndex === 55||columnIndex === 56||columnIndex === 57|| columnIndex === 58 || columnIndex === 59|| columnIndex === 60 ||columnIndex === 61||columnIndex === 62||columnIndex === 63||columnIndex === 64|| columnIndex === 65 || columnIndex === 66|| columnIndex === 67 ||columnIndex === 68||columnIndex === 69||columnIndex ===70||columnIndex === 71|| columnIndex === 72 ||columnIndex === 73||columnIndex === 74||columnIndex ===75||columnIndex === 76||columnIndex ===77||columnIndex === 78)) {
					return 'background: rgb(252, 236, 232)'; // 合同资金支付情况
				}else {
					return ''
				}
    },
    // 筛选组件
    childByValue(childValue) {
      this.flagData = childValue;
      // console.log(this.flagData);
    },
    handleSizeChange(val) {
      this.pagesize = val;
      this.tractData();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.tractData();
    },
  }
}
</script>

<style scoped>
@import './css/index.css';
.white{
  display: inline-block;
  color: #fff;
  width: 105px;
  margin-left: 0;
}
</style>
