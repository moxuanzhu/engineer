<template>

  <div class="contract">
    <!-- 商务合同 -->
    <div class="contractinfo" id="contractinfo">
      <div class="contract-tops">商务合同编辑</div>
      <div class="table-list" v-loading="Loadings" element-loading-text="拼命加载中"  element-loading-spinner="el-icon-loading"   element-loading-background="rgba(0, 0, 0, 0.8)" :style="{height: contractHeight+'px'}">
        <el-table
          :data="rowList"
          :empty-text="textMsg"
          border
          :header-cell-style="getRowClass"
          style="width: 100%; margin-bottom: 50px;">
          <el-table-column  prop="fdName"  label="项目名称"  align="center" fixed="left"  :show-overflow-tooltip="true"  width="220"></el-table-column>
          <el-table-column label="项目基本信息" align="center">
            <el-table-column
              prop="fdEngineeringArea"
              label="所属工程大区"
              align="center"        
              :show-overflow-tooltip="true"
              width="105">
            </el-table-column>
            <el-table-column
              prop="fdProCapacity"
              label="项目容量"
              align="center"
              :show-overflow-tooltip="true"        
              width="80">
            </el-table-column>
            <el-table-column
              prop="fdPackageModel"
              label="承发包模式"
              align="center"
              :show-overflow-tooltip="true"
              width="140">
            </el-table-column>
            <el-table-column
              prop="fdPostName"
              label="项目经理"
              align="center"
              :show-overflow-tooltip="true"        
              width="80">
            </el-table-column>
          </el-table-column>
          <el-table-column label="标段基本信息" align="center">
            <el-table-column
              prop="fdContractTypeDivideTotalPropertyName"
              label="类别划分"
              align="center"
              width="180">
            </el-table-column>
            <el-table-column
              prop="fdContractTypeDivideParentPropertyName"
              label="标段名称"
              align="center"
              :show-overflow-tooltip="true"
              width="180">
            </el-table-column>
            <el-table-column
              prop=""
              label="招标范围"
              align="center"
              :show-overflow-tooltip="true"
              width="120">
              <template slot-scope="scope"><el-button type="primary" size="mini" @click="Details('looks')" >查看详情</el-button></template>
            </el-table-column>
            <el-table-column
              prop="fdContractManager"
              label="合同经理"
              align="center"
              :show-overflow-tooltip="true"        
              width="150">
              <template slot-scope="scope"><el-input size="mini" v-model="scope.row.fdContractManager" clearable ></el-input></template>
            </el-table-column>
            <el-table-column
              prop="fdForMiningEngineer"
              label="招采工程师"
              align="center"
              :show-overflow-tooltip="true"
              width="150">
              <template slot-scope="scope"><el-input size="mini" v-model="scope.row.fdForMiningEngineer" clearable ></el-input></template>
            </el-table-column>
            <el-table-column
              prop="fdCostEngineer"
              label="造价工程师"
              align="center"
              :show-overflow-tooltip="true"
              width="150">
              <template slot-scope="scope"><el-input size="mini" v-model="scope.row.fdCostEngineer" clearable ></el-input></template>
            </el-table-column>
            <el-table-column
              prop="fdPurchaseWay"
              label="采购方式"
              align="center"
              :show-overflow-tooltip="true"
              width="140">
              <template slot-scope="scope">
                <el-select size="mini" v-model="scope.row.fdPurchaseWay" placeholder="请选择"  clearable>
                  <el-option v-for="item in purchase" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column
              prop="fdCfbAgencyInstitution"
              label="招标代理机构"
              align="center"
              :show-overflow-tooltip="true"
              width="140">
              <template slot-scope="scope">
                <el-select size="mini" v-model="scope.row.fdCfbAgencyInstitution"  placeholder="请选择"  clearable>
                  <el-option v-for="item in agency" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column label="工期计划" align="center">
              <el-table-column label="招标计划约定时间" align="center">
                <el-table-column
                  prop="fdCfbAppointTimeStartworking"
                  label="开工/进场"
                  align="center"
                  width="155">
                  <template slot-scope="scope">
                    <el-date-picker  size="mini" v-model="scope.row.fdCfbAppointTimeStartworking"  type="date" format="yyyy/MM/dd" value-format="yyyy-MM-dd" :picker-options="pickerBeginDateBefore" @change="Deviation()"  placeholder="选择日期"></el-date-picker>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="fdCfbAppointTimeEndworking"
                  label="完工/离场"
                  align="center"
                  width="155">
                  <template slot-scope="scope">
                    <el-date-picker  size="mini" v-model="scope.row.fdCfbAppointTimeEndworking"  type="date" format="yyyy/MM/dd" value-format="yyyy-MM-dd"  :picker-options="pickerBeginDateAfter" @change="Deviation()"  placeholder="选择日期"></el-date-picker>
                  </template>
                </el-table-column>
              </el-table-column>
              <el-table-column label="招标文件约定时间" align="center">
                <el-table-column
                  prop="fdCfbFileAppointTimeStartworking"
                  label="开工/进场"
                  align="center"
                  width="155">
                  <template slot-scope="scope">
                    <el-date-picker  size="mini" v-model="scope.row.fdCfbFileAppointTimeStartworking"  type="date" format="yyyy/MM/dd" value-format="yyyy-MM-dd" :picker-options="pickerBeginDateBefore1"  placeholder="选择日期"></el-date-picker>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="fdCfbFileAppointTimeEndworking"
                  label="完工/离场"
                  align="center"
                  width="155">
                  <template slot-scope="scope">
                    <el-date-picker  size="mini" v-model="scope.row.fdCfbFileAppointTimeEndworking"  type="date" format="yyyy/MM/dd" value-format="yyyy-MM-dd" :picker-options="pickerBeginDateAfter1"  placeholder="选择日期"></el-date-picker>
                  </template>
                </el-table-column>
              </el-table-column>
              <el-table-column label="现场施工时间" align="center">
                <el-table-column
                  prop="fdSiteRoadworkStartworking"
                  label="开工/进场"
                  align="center"
                  width="155">
                  <template slot-scope="scope">
                    <el-date-picker  size="mini" v-model="scope.row.fdSiteRoadworkStartworking"  type="date" format="yyyy/MM/dd" value-format="yyyy-MM-dd" :picker-options="pickerBeginDateBefore2" @change="Deviation()" placeholder="选择日期"></el-date-picker>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="fdSiteRoadworkEndworking"
                  label="完工/离场"
                  align="center"
                  width="155">
                  <template slot-scope="scope">
                    <el-date-picker  size="mini" v-model="scope.row.fdSiteRoadworkEndworking"  type="date" format="yyyy/MM/dd" value-format="yyyy-MM-dd" :picker-options="pickerBeginDateAfter2" @change="Deviation()" placeholder="选择日期"></el-date-picker>
                  </template>
                </el-table-column>
              </el-table-column>
              <el-table-column label="招标计划偏差时间" align="center">
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
            <el-table-column label="招标计划提报" align="center">
              <el-table-column
                prop="fdCfbPlanHandinPlanTime"
                label="计划时间"
                align="center"
                width="155">
                <template slot-scope="scope">
                    <el-date-picker  size="mini" v-model="scope.row.fdCfbPlanHandinPlanTime"  type="date" format="yyyy/MM/dd" value-format="yyyy-MM-dd"  placeholder="选择日期"></el-date-picker>
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column label="招标申请" align="center">
              <el-table-column
                prop="fdCfbApplyforPlanTime"
                label="计划时间"
                align="center"
                width="155">
                <template slot-scope="scope">
                    <el-date-picker  size="mini" v-model="scope.row.fdCfbApplyforPlanTime"  type="date" format="yyyy/MM/dd" value-format="yyyy-MM-dd" :picker-options="pickerBeginDateBefore3" @change="Deviation()" placeholder="选择日期"></el-date-picker>
                </template>
              </el-table-column>
              <el-table-column
                prop="fdCfbApplyforRealityTime"
                label="实际时间"
                align="center"
                width="155">
                <template slot-scope="scope">
                    <el-date-picker  size="mini" v-model="scope.row.fdCfbApplyforRealityTime"  type="date" format="yyyy/MM/dd" value-format="yyyy-MM-dd" :picker-options="pickerBeginDateAfter3" @change="Deviation()" placeholder="选择日期"></el-date-picker>
                </template>
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
            <el-table-column label="技术资料提报" align="center">
              <el-table-column
                prop="fdSkillResourceHandinPlanTime"
                label="计划时间"
                align="center"
                width="155">
                <template slot-scope="scope">
                    <el-date-picker  size="mini" v-model="scope.row.fdSkillResourceHandinPlanTime"  type="date" format="yyyy/MM/dd" value-format="yyyy-MM-dd" :picker-options="pickerBeginDateBefore4" @change="Deviation()"  placeholder="选择日期"></el-date-picker>
                </template>
              </el-table-column>
              <el-table-column
                prop="fdSkillResourceHandinRealityTime"
                label="实际时间"
                align="center"
                width="155">
                <template slot-scope="scope">
                    <el-date-picker  size="mini" v-model="scope.row.fdSkillResourceHandinRealityTime"  type="date" format="yyyy/MM/dd" value-format="yyyy-MM-dd" :picker-options="pickerBeginDateAfter4" @change="Deviation()" placeholder="选择日期"></el-date-picker>
                </template>
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
            <el-table-column label="工程量清单提报" align="center">
              <el-table-column
                prop="fdProRepertoireHandinPlanTime"
                label="计划时间"
                align="center"
                width="155">
                <template slot-scope="scope">
                    <el-date-picker  size="mini" v-model="scope.row.fdProRepertoireHandinPlanTime"  type="date" format="yyyy/MM/dd" value-format="yyyy-MM-dd" :picker-options="pickerBeginDateBefore5" @change="Deviation()"  placeholder="选择日期"></el-date-picker>
                </template>
              </el-table-column>
              <el-table-column
                prop="fdProRepertoireHandinRealityTime"
                label="实际时间"
                align="center"
                width="155">
                <template slot-scope="scope">
                    <el-date-picker  size="mini" v-model="scope.row.fdProRepertoireHandinRealityTime"  type="date" format="yyyy/MM/dd" value-format="yyyy-MM-dd" :picker-options="pickerBeginDateAfter5" @change="Deviation()" placeholder="选择日期"></el-date-picker>
                </template>
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
            <el-table-column label="发标" align="center">
              <el-table-column
                prop="fdLaunchMarkPlanTime"
                label="计划时间"
                align="center"
                width="155">
                <template slot-scope="scope">
                    <el-date-picker  size="mini" v-model="scope.row.fdLaunchMarkPlanTime"  type="date" format="yyyy/MM/dd" value-format="yyyy-MM-dd"  :picker-options="pickerBeginDateBefore6" @change="Deviation()" placeholder="选择日期"></el-date-picker>
                </template>
              </el-table-column>
              <el-table-column
                prop="fdLaunchMarkRealityTime"
                label="实际时间"
                align="center"
                width="155">
                <template slot-scope="scope">
                    <el-date-picker  size="mini" v-model="scope.row.fdLaunchMarkRealityTime"  type="date" format="yyyy/MM/dd" value-format="yyyy-MM-dd" :picker-options="pickerBeginDateAfter6" @change="Deviation()" placeholder="选择日期"></el-date-picker>
                </template>
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
            <el-table-column label="开标" align="center">
              <el-table-column
                prop="fdStartMarkPlanTime"
                label="计划时间"
                align="center"
                width="155">
                <template slot-scope="scope">
                    <el-date-picker  size="mini" v-model="scope.row.fdStartMarkPlanTime"  type="date" format="yyyy/MM/dd" value-format="yyyy-MM-dd" :picker-options="pickerBeginDateBefore7" @change="Deviation()" placeholder="选择日期"></el-date-picker>
                </template>
              </el-table-column>
              <el-table-column
                prop="fdStartMarkRealityTime"
                label="实际时间"
                align="center"
                width="155">
                <template slot-scope="scope">
                    <el-date-picker  size="mini" v-model="scope.row.fdStartMarkRealityTime"  type="date" format="yyyy/MM/dd" value-format="yyyy-MM-dd" :picker-options="pickerBeginDateAfter7" @change="Deviation()" placeholder="选择日期"></el-date-picker>
                </template>
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
            <el-table-column label="定标" align="center">
              <el-table-column
                prop="fdTofixMarkPlanTime"
                label="计划时间"
                align="center"
                width="155">
                <template slot-scope="scope">
                    <el-date-picker  size="mini" v-model="scope.row.fdTofixMarkPlanTime"  type="date" format="yyyy/MM/dd" value-format="yyyy-MM-dd" :picker-options="pickerBeginDateBefore8" @change="Deviation()" placeholder="选择日期"></el-date-picker>
                </template>
              </el-table-column>
              <el-table-column
                prop="fdTofixMarkRealityTime"
                label="实际时间"
                align="center"
                width="155">
                <template slot-scope="scope">
                    <el-date-picker  size="mini" v-model="scope.row.fdTofixMarkRealityTime"  type="date" format="yyyy/MM/dd" value-format="yyyy-MM-dd" :picker-options="pickerBeginDateAfter8" @change="Deviation()" placeholder="选择日期"></el-date-picker>
                </template>
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
                method     
                width="140">
                <template slot-scope="scope">
                  <el-select size="mini" v-model="scope.row.fdResourceFortherecordSite"  placeholder="请选择"  clearable>
                    <el-option v-for="item in locaList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                  </el-select>
                </template>
            </el-table-column>
            <el-table-column
                prop=""
                label="招标资料"
                align="center"
                :show-overflow-tooltip="true"        
                width="220">
                <template slot-scope="scope">
                  <form id="form1" action="" method="post" enctype="multipart/form-data">
                      <input type="file" name="upfile" id="upfile"  accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" />
                      <span class="btn btn-primary mr10 btn-sm pointer" @click="uploadSure(scope.row.fdProId, scope.row.fdSectionNameChildId)" >上传</span>
                  </form>
                </template>
            </el-table-column>
            <el-table-column
                prop=""
                label="投标资料"
                align="center"
                :show-overflow-tooltip="true"        
                width="220">
                <template slot-scope="scope">
                  <form id="form1" action="" method="post" enctype="multipart/form-data">
                      <input type="file" name="upfiles" id="upfiles"  accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" />
                      <span class="btn btn-primary mr10 btn-sm pointer" @click="uploadAcc(scope.row.fdProId, scope.row.fdSectionNameChildId)" >上传</span>
                  </form>
                </template>
            </el-table-column>
            <el-table-column
                prop=""
                label="定标资料"
                align="center"
                :show-overflow-tooltip="true"        
                width="220">
                 <template slot-scope="scope">
                   <form id="form1" action="" method="post" enctype="multipart/form-data">
                      <input type="file" name="upfiled" id="upfiled"  accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" />
                      <span class="btn btn-primary mr10 btn-sm pointer" @click="uploadResource(scope.row.fdProId, scope.row.fdSectionNameChildId)" >上传</span>
                  </form>
                </template>
            </el-table-column>
            <el-table-column
                prop="fdSendWinthebiddingInformtime"
                label="发出中标通知书时间"
                align="center"
                :show-overflow-tooltip="true"        
                width="155">
                <template slot-scope="scope">
                    <el-date-picker  size="mini" v-model="scope.row.fdSendWinthebiddingInformtime"  type="date" format="yyyy/MM/dd" value-format="yyyy-MM-dd"  placeholder="选择日期"></el-date-picker>
                </template>
            </el-table-column>
            <el-table-column
                prop="fdWinthebiddingMoney"
                label="中标金额（元）"
                align="center"
                :show-overflow-tooltip="true"        
                width="150">
                <template slot-scope="scope"><el-input size="mini" v-model.number="scope.row.fdWinthebiddingMoney" maxlength="10"  @change="checkNo(scope.row.fdWinthebiddingMoney)"  clearable></el-input></template>
            </el-table-column>
            <el-table-column
                prop="fdWinthebiddingUnit"
                label="中标单位"
                align="center"
                :show-overflow-tooltip="true"        
                width="150">
                <template slot-scope="scope"><el-input size="mini" v-model="scope.row.fdWinthebiddingUnit"    clearable></el-input></template>
            </el-table-column>
            <el-table-column
                prop="fdWinthebiddingUser"
                label="中标单位联系人"
                align="center"
                :show-overflow-tooltip="true"        
                width="130">
                <template slot-scope="scope"><el-input size="mini" v-model="scope.row.fdWinthebiddingUser"   clearable></el-input></template>
            </el-table-column>
            <el-table-column
                prop="fdUserPhone"
                label="联系方式"
                align="center"
                :show-overflow-tooltip="true"        
                width="145">
                <template slot-scope="scope"><el-input size="mini"  v-model.number="scope.row.fdUserPhone"  @change="checkTel(scope.row.fdUserPhone)" maxlength="11"  clearable></el-input></template>
            </el-table-column>
            <el-table-column
                prop="fdThisweekEvolve"
                label="本周进展"
                align="center"
                :show-overflow-tooltip="true"        
                width="120">
                <template slot-scope="scope"><el-button type="primary" size="mini" @click="Details('progress')" >查看详情</el-button></template>
            </el-table-column>
          </el-table-column>
          <el-table-column label="合同台账" align="center">
            <el-table-column
              prop="fdPurchaseOrderNumber"
              label="SAP采购订单号"
              align="center"
              :show-overflow-tooltip="true"
              width="120">
              <template slot-scope="scope">
                 <div v-for="(item, index) in moneyList" :key="index">
                    <el-input size="mini" v-model="item.fdPurchaseOrderNumber" clearable ></el-input>
                 </div> 
              </template>
            </el-table-column>
            <el-table-column label="合同编号" align="center">
              <el-table-column
                prop=""
                label=""
                align="center"
                :show-overflow-tooltip="true"
                width="90">
                <template slot-scope="scope">
                  <div v-for="(item, index) in moneyList" :key="index">
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
                  <div v-for="(item, index) in moneyList" :key="index">
                    <el-select v-model="item.fdProLocation" size="mini" placeholder="请选择区域"  clearable>
                      <el-option v-for="item in itemList" :key="item.value" :label="item.label"  :value="item.value"> <span style="float: left">{{ item.value}}</span></el-option>
                    </el-select>
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
                  <div v-for="(item, index) in moneyList" :key="index">
                    <el-input size="mini" v-model="item.fdProNameLogogram"  clearable></el-input>
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
                  <div v-for="(item, index) in moneyList" :key="index">
                    <el-select v-model="item.fdContractType" size="mini" placeholder="请选择合同类型"   clearable>
                      <el-option v-for="item in bargainList" :key="item.value" :label="item.label"  :value="item.value"> <span style="float: left">{{ item.value}}</span></el-option>
                    </el-select>
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
                  <div v-for="(item, index) in moneyList" :key="index">
                    <el-date-picker v-model="item.fdSignAContractate" type="year" size="mini" format="yyyy 年" value-format="yyyy"  placeholder="选择年" ></el-date-picker>
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                prop="fdSignAContractateNextProperty"
                label=""
                align="center"
                :show-overflow-tooltip="true"
                width="130">
                <template slot-scope="scope" class="tract">
                  <div v-for="(item, index) in moneyList" :key="index">
                    <el-input size="mini" v-model="item.fdSignAContractateNextProperty"  clearable><i slot="prefix" style="color: #000;">-</i></el-input>
                  </div>
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column
              prop="fdContractName"
              label="合同名称"
              align="center"
              width="300">
              <template slot-scope="scope">
                 <div v-for="(item, index) in moneyList" :key="index" class="contracts">
                    <el-input class="inputs" size="mini"  v-model="item.fdContractName" clearable></el-input>
                    <span v-if="index == 0" class="addtab" @click="addTables(index)"><img src="../common/img/add.png"></span>
                    <span v-else class="addtab" @click="delTables(index)"><img src="../common/img/remove.png"></span>
                 </div>    
              </template>
            </el-table-column>
            <el-table-column
              prop="fdContractMoney"
              label="合同金额"
              align="center"
              width="150">
              <template slot-scope="scope">
                <div v-for="(item, index) in moneyList" :key="index">
                  <el-input size="mini" v-model.number="item.fdContractMoney" @change="checkNo(item.fdContractMoney)"  maxlength="11" clearable></el-input>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="fdOAReviewStartTime"
              label="oa评审发起时间"
              align="center"
              width="155">
              <template slot-scope="scope">
                <div v-for="(item, index) in moneyList" :key="index">
                  <el-date-picker  size="mini" v-model="item.fdOAReviewStartTime"  type="date" format="yyyy/MM/dd" value-format="yyyy-MM-dd"   placeholder="选择日期"></el-date-picker>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="fdOAReviewEndTime"
              label="oa评审结束时间"
              align="center"
              width="155">
              <template slot-scope="scope">
                <div v-for="(item, index) in moneyList" :key="index">
                  <el-date-picker  size="mini" v-model="item.fdOAReviewEndTime"  type="date" format="yyyy/MM/dd" value-format="yyyy-MM-dd"  placeholder="选择日期"></el-date-picker> 
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="fdSignAContractTime"
              label="合同签订时间"
              align="center"
              width="155">
              <template slot-scope="scope">
                <div v-for="(item, index) in moneyList" :key="index">
                  <el-date-picker  size="mini" v-model="item.fdSignAContractTime"  type="date" format="yyyy/MM/dd" value-format="yyyy-MM-dd"  placeholder="选择日期"></el-date-picker>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="fdContractDateOfFilingTime"
              label="归档日期"
              align="center"
              width="155">
              <template slot-scope="scope">
                <div v-for="(item, index) in moneyList" :key="index">
                  <el-date-picker  size="mini" v-model="item.fdContractDateOfFilingTime"  type="date" format="yyyy/MM/dd" value-format="yyyy-MM-dd"  placeholder="选择日期"></el-date-picker>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="fdContractCorrespondingPerson"
              label="合同相对人"
              align="center"
              :show-overflow-tooltip="true"
              width="120">
               <template slot-scope="scope">
                <div v-for="(item, index) in moneyList" :key="index">
                  <el-input size="mini" v-model="item.fdContractCorrespondingPerson" clearable></el-input>
                </div>
               </template>
            </el-table-column>
            <el-table-column
              prop="fdContractPaymentClause"
              label="付款条件"
              align="center"
              :show-overflow-tooltip="true"
              width="120">
              <template slot-scope="scope">
                <div v-for="(item, index) in moneyList" :key="index">
                  <el-input size="mini" v-model="item.fdContractPaymentClause" ></el-input>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="fdContractTotalManey"
              label="合同金额(总)"
              align="center"
              :show-overflow-tooltip="true"
              width="150">
              <template slot-scope="scope">
                <el-input size="mini" v-model.number="scope.row.fdContractTotalManey"  maxlength="10" @change="checkNo(scope.row.fdContractTotalManey)" clearable></el-input>
              </template>
            </el-table-column>
            <el-table-column
              prop="fdContractDeposit"
              label="质保金"
              align="center"
              :show-overflow-tooltip="true"
              width="150">
               <template slot-scope="scope"><el-input size="mini" v-model.number="scope.row.fdContractDeposit"  maxlength="11" clearable></el-input></template>
            </el-table-column>
            <el-table-column
              prop="fdContractQualityDate"
              label="质量保证期"
              align="center"
              :show-overflow-tooltip="true"
              width="155">
               <template slot-scope="scope">
                 <el-date-picker  size="mini" v-model="scope.row.fdContractQualityDate"  type="date" format="yyyy/MM/dd" value-format="yyyy-MM-dd"  placeholder="选择日期"></el-date-picker>
               </template>
            </el-table-column>
            <el-table-column label="合同执行进展分析" align="center">
              <el-table-column
                prop="fdContractExecuteCondition"
                label="合同执行状态"
                align="center"
                width="140">
                <template slot-scope="scope">
                  <el-select v-model="scope.row.fdContractExecuteCondition" size="mini" placeholder="请选择合同执行情况"   clearable>
                    <el-option v-for="item in statusList" :key="item.value" :label="item.label"  :value="item.value"></el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column
                prop="fdContractAgreementAnalyze"
                label="履约分析"
                align="center"
                width="120">
                <template slot-scope="scope"><el-button type="primary" size="mini" @click="Details('analysis')" >查看详情</el-button></template>
              </el-table-column>
            </el-table-column>
          </el-table-column>
          <el-table-column label="合同执行资金支付情况" align="center">
            <el-table-column label="2018/1" align="center">
              <el-table-column
                prop=""
                label="计划付款"
                align="center"
                width="150">
                <template slot-scope="scope"><el-input size="mini" v-model.number="monthData.oneplan1" @change="checkNo(monthData.oneplan1)" maxlength="10" clearable></el-input></template>
              </el-table-column>
              <el-table-column
                prop=""
                label="开票金额"
                align="center"
                width="150">
                <template slot-scope="scope"><el-input size="mini" v-model.number="monthData.acts1" @change="checkNo(monthData.acts1)" maxlength="10" clearable></el-input></template>
              </el-table-column>
              <el-table-column
                prop=""
                label="实际付款"
                align="center"
                width="150">
                <template slot-scope="scope"><el-input size="mini" v-model.number="monthData.mons1" @change="checkNo(monthData.mons1)" maxlength="10"  clearable></el-input></template>
              </el-table-column>
              <el-table-column
                prop=""
                label="预实率"
                align="center"
                width="90">
                <!-- <template slot-scope="scope">
                  {{count6 ? count6 : ''}}
                </template> -->
              </el-table-column>
            </el-table-column>
            <el-table-column label="2018/2" align="center">
              <el-table-column
                prop=""
                label="计划付款"
                align="center"
                width="150">
                <template slot-scope="scope"><el-input size="mini" v-model.number="monthData.oneplan2" @change="checkNo(monthData.oneplan2)" maxlength="10" clearable></el-input></template>
              </el-table-column>
              <el-table-column
                prop=""
                label="开票金额"
                align="center"
                width="150">
                <template slot-scope="scope"><el-input size="mini" v-model.number="monthData.acts2" @change="checkNo(monthData.acts2)" maxlength="10" clearable></el-input></template>
              </el-table-column>
              <el-table-column
                prop=""
                label="实际付款"
                align="center"
                width="150">
                <template slot-scope="scope"><el-input size="mini" v-model.number="monthData.mons2" @change="checkNo(monthData.mons2)" maxlength="10" clearable></el-input></template>
              </el-table-column>
              <el-table-column
                prop=""
                label="预实率"
                align="center"
                width="90">
              </el-table-column>
            </el-table-column>
            <el-table-column label="2018/3" align="center">
              <el-table-column
                prop=""
                label="计划付款"
                align="center"
                width="150">
                <template slot-scope="scope"><el-input size="mini" v-model.number="monthData.oneplan3" @change="checkNo(monthData.oneplan3)" maxlength="10" clearable></el-input></template>
              </el-table-column>
              <el-table-column
                prop=""
                label="开票金额"
                align="center"
                width="150">
                <template slot-scope="scope"><el-input size="mini" v-model.number="monthData.acts3" @change="checkNo(monthData.acts3)" maxlength="10" clearable></el-input></template>
              </el-table-column>
              <el-table-column
                prop=""
                label="实际付款"
                align="center"
                width="150">
                <template slot-scope="scope"><el-input size="mini" v-model.number="monthData.mons3" @change="checkNo(monthData.mons3)" maxlength="10" clearable></el-input></template>
              </el-table-column>
              <el-table-column
                prop=""
                label="预实率"
                align="center"
                width="90">
              </el-table-column>
            </el-table-column>
            <el-table-column label="2018/4" align="center">
              <el-table-column
                prop=""
                label="计划付款"
                align="center"
                width="150">
                <template slot-scope="scope"><el-input size="mini" v-model.number="monthData.oneplan4" @change="checkNo(monthData.oneplan4)" maxlength="10" clearable ></el-input></template>
              </el-table-column>
              <el-table-column
                prop=""
                label="开票金额"
                align="center"
                width="150">
                <template slot-scope="scope"><el-input size="mini" v-model.number="monthData.acts4" @change="checkNo(monthData.acts4)" maxlength="10" clearable></el-input></template>
              </el-table-column>
              <el-table-column
                prop=""
                label="实际付款"
                align="center"
                width="150">
                <template slot-scope="scope"><el-input size="mini" v-model.number="monthData.mons4" @change="checkNo(monthData.mons4)" maxlength="10" clearable></el-input></template>
              </el-table-column>
              <el-table-column
                prop=""
                label="预实率"
                align="center"
                width="90">
              </el-table-column>
            </el-table-column>
            <el-table-column label="2018/5" align="center">
              <el-table-column
                prop=""
                label="计划付款"
                align="center"
                width="150">
                <template slot-scope="scope"><el-input size="mini" v-model.number="monthData.oneplan5" @change="checkNo(monthData.oneplan5)" maxlength="10" clearable></el-input></template>
              </el-table-column>
              <el-table-column
                prop=""
                label="开票金额"
                align="center"
                width="150">
                <template slot-scope="scope"><el-input size="mini" v-model.number="monthData.acts5" @change="checkNo(monthData.acts5)" maxlength="10" clearable></el-input></template>
              </el-table-column>
              <el-table-column
                prop=""
                label="实际付款"
                align="center"
                width="150">
                <template slot-scope="scope"><el-input size="mini" v-model.number="monthData.mons5" @change="checkNo(monthData.mons5)" maxlength="10" clearable></el-input></template>
              </el-table-column>
              <el-table-column
                prop=""
                label="预实率"
                align="center"
                width="90">
              </el-table-column>
            </el-table-column>
            <el-table-column label="2018/6" align="center">
              <el-table-column
                prop=""
                label="计划付款"
                align="center"
                width="150">
                <template slot-scope="scope"><el-input size="mini" v-model.number="monthData.oneplan6" @change="checkNo(monthData.oneplan6)" maxlength="10" clearable></el-input></template>
              </el-table-column>
              <el-table-column
                prop=""
                label="开票金额"
                align="center"
                width="150">
                <template slot-scope="scope"><el-input size="mini" v-model.number="monthData.acts6" @change="checkNo(monthData.acts6)" maxlength="10" clearable></el-input></template>
              </el-table-column>
              <el-table-column
                prop=""
                label="实际付款"
                align="center"
                width="150">
                <template slot-scope="scope"><el-input size="mini" v-model.number="monthData.mons6" @change="checkNo(monthData.mons6)" maxlength="10" clearable></el-input></template>
              </el-table-column>
              <el-table-column
                prop=""
                label="预实率"
                align="center"
                width="90">
              </el-table-column>
            </el-table-column>
            <el-table-column label="2018/7" align="center">
              <el-table-column
                prop=""
                label="计划付款"
                align="center"
                width="150">
                <template slot-scope="scope"><el-input size="mini" v-model.number="monthData.oneplan7" @change="checkNo(monthData.oneplan7)" maxlength="10" clearable></el-input></template>
              </el-table-column>
              <el-table-column
                prop=""
                label="开票金额"
                align="center"
                width="150">
                <template slot-scope="scope"><el-input size="mini" v-model.number="monthData.acts7" @change="checkNo(monthData.acts7)" maxlength="10" clearable></el-input></template>
              </el-table-column>
              <el-table-column
                prop=""
                label="实际付款"
                align="center"
                width="150">
                <template slot-scope="scope"><el-input size="mini" v-model.number="monthData.mons7" @change="checkNo(monthData.mons7)" maxlength="10" clearable></el-input></template>
              </el-table-column>
              <el-table-column
                prop=""
                label="预实率"
                align="center"
                width="90">
              </el-table-column>
            </el-table-column>
            <el-table-column label="2018/8" align="center">
              <el-table-column
                prop=""
                label="计划付款"
                align="center"
                width="150">
                <template slot-scope="scope"><el-input size="mini" v-model.number="monthData.oneplan8" @change="checkNo(monthData.oneplan8)" maxlength="10" clearable></el-input></template>
              </el-table-column>
              <el-table-column
                prop=""
                label="开票金额"
                align="center"
                width="150">
                <template slot-scope="scope"><el-input size="mini" v-model.number="monthData.acts8" @change="checkNo(monthData.acts8)" maxlength="10" clearable></el-input></template>
              </el-table-column>
              <el-table-column
                prop=""
                label="实际付款"
                align="center"
                width="150">
                <template slot-scope="scope"><el-input size="mini" v-model.number="monthData.mons8" @change="checkNo(monthData.mons8)" maxlength="10" clearable></el-input></template>
              </el-table-column>
              <el-table-column
                prop=""
                label="预实率"
                align="center"
                width="90">
              </el-table-column>
            </el-table-column>
            <el-table-column label="2018/9" align="center">
              <el-table-column
                prop=""
                label="计划付款"
                align="center"
                width="150">
                <template slot-scope="scope"><el-input size="mini" v-model.number="monthData.oneplan9" @change="checkNo(monthData.oneplan9)" maxlength="10" clearable></el-input></template>
              </el-table-column>
              <el-table-column
                prop=""
                label="开票金额"
                align="center"
                width="150">
                <template slot-scope="scope"><el-input size="mini" v-model.number="monthData.acts9" @change="checkNo(monthData.acts9)" maxlength="10" clearable></el-input></template>
              </el-table-column>
              <el-table-column
                prop=""
                label="实际付款"
                align="center"
                width="150">
                <template slot-scope="scope"><el-input size="mini" v-model.number="monthData.mons9" @change="checkNo(monthData.mons9)" maxlength="10" clearable></el-input></template>
              </el-table-column>
              <el-table-column
                prop=""
                label="预实率"
                align="center"
                width="90">
              </el-table-column>
            </el-table-column>
            <el-table-column label="2018/10" align="center">
              <el-table-column
                prop=""
                label="计划付款"
                align="center"
                width="150">
                <template slot-scope="scope"><el-input size="mini" v-model.number="monthData.oneplan10" @change="checkNo(monthData.oneplan10)" maxlength="10" clearable="" ></el-input></template>
              </el-table-column>
              <el-table-column
                prop="acts10"
                label="开票金额"
                align="center"
                width="150">
                <template slot-scope="scope"><el-input size="mini" v-model.number="monthData.acts10" @change="checkNo(monthData.acts10)"  maxlength="10" clearable=""></el-input></template>
              </el-table-column>
              <el-table-column
                prop="mons10"
                label="实际付款"
                align="center"
                width="150">
                <template slot-scope="scope"><el-input size="mini" v-model.number="monthData.mons10" @change="checkNo(monthData.mons10)" maxlength="10" clearable="" ></el-input></template>
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
                prop=""
                label="计划付款"
                align="center"
                width="150">
                <template slot-scope="scope"><el-input size="mini" v-model.number="monthData.oneplan11" @change="checkNo(monthData.oneplan11)" maxlength="10" clearable></el-input></template>
              </el-table-column>
              <el-table-column
                prop=""
                label="开票金额"
                align="center"
                width="150">
                <template slot-scope="scope"><el-input size="mini" v-model.number="monthData.acts11" @change="checkNo(monthData.acts11)" maxlength="10" clearable></el-input></template>
              </el-table-column>
              <el-table-column
                prop=""
                label="实际付款"
                align="center"
                width="150">
                <template slot-scope="scope"><el-input size="mini" v-model.number="monthData.mons11" @change="checkNo(monthData.mons11)" maxlength="10" clearable></el-input></template>
              </el-table-column>
              <el-table-column
                prop=""
                label="预实率"
                align="center"
                width="90">
              </el-table-column>
            </el-table-column>
            <el-table-column label="2018/12" align="center">
              <el-table-column
                prop=""
                label="计划付款"
                align="center"
                width="150">
                <template slot-scope="scope"><el-input size="mini" v-model.number="monthData.oneplan12" @change="checkNo(monthData.oneplan12)" maxlength="10" clearable></el-input></template>
              </el-table-column>
              <el-table-column
                prop=""
                label="开票金额"
                align="center"
                width="150">
                <template slot-scope="scope"><el-input size="mini" v-model.number="monthData.acts12" @change="checkNo(monthData.acts12)" maxlength="10" clearable></el-input></template>
              </el-table-column>
              <el-table-column
                prop=""
                label="实际付款"
                align="center"
                width="150">
                <template slot-scope="scope"><el-input size="mini" v-model.number="monthData.mons12" @change="checkNo(monthData.mons12)" maxlength="10" clearable ></el-input></template>
              </el-table-column>
              <el-table-column
                prop=""
                label="预实率"
                align="center"
                width="90">
              </el-table-column>
            </el-table-column>
            <el-table-column
              prop="fdContractExcuteAddupPayment"
              label="累积已付款金额"
              align="center"
              :show-overflow-tooltip="true"
              width="150">
            </el-table-column>
            <el-table-column
              prop="fdGrandTotalPayRatio"
              label="累计支付比例"
              align="center"
              :show-overflow-tooltip="true"
              width="150">
            </el-table-column>
            <el-table-column
              prop="fdContractExcuteAddupMoaiManey"
              label="累积开票金额"
              align="center"
              :show-overflow-tooltip="true"
              width="150">
              <template slot-scope="scope"><el-input size="mini" v-model.number="scope.row.fdContractExcuteAddupMoaiManey"  maxlength="11" clearable ></el-input></template>
            </el-table-column>
            <el-table-column
              prop="fdContractExcuteNotPayment"
              label="未付金额"
              align="center"
              :show-overflow-tooltip="true"
              width="150">
              <template slot-scope="scope"><el-input size="mini" v-model.number="scope.row.fdContractExcuteNotPayment"  maxlength="11" clearable ></el-input></template>
            </el-table-column>
            <el-table-column
              prop="fdContractExcuteStayMoaiManey"
              label="待开票金额"
              align="center"
              :show-overflow-tooltip="true"
              width="150">
              <template slot-scope="scope"><el-input size="mini" v-model.number="scope.row.fdContractExcuteStayMoaiManey"  maxlength="11" clearable ></el-input></template>
            </el-table-column>
            <el-table-column
              prop="fdContractExcuteRemark"
              label="备注"
              align="center"
              :show-overflow-tooltip="true"
              width="100">
              <template slot-scope="scope"><el-button type="primary" size="mini" @click="Details('remarks')" >查看详情</el-button></template>
            </el-table-column>
          </el-table-column>
        </el-table>
      </div>
      <div class="blocks">
        <el-button type="primary" size="medium" @click="Saves()">保存</el-button>
        <el-button type="primary" size="medium" @click="Cancels()">取消</el-button>
      </div>
    </div>

    <!-- 所有查看详情弹框 -->
    <div>
      <looks-tender v-if="modelFlag.showModel"></looks-tender>
    </div>
  </div>
</template>

<script>
import Tendering from './dialogs/tendering'  // 弹框(可编辑)
export default {
  name: 'contract',
  components:{
    'looks-tender': Tendering,
  },
  computed:{
  },
  data() {
    let that=this;
    return {
      Loadings: false, // loading加载
      msg: '',
      total: 0,
      pagesize: 7,
      currentPage: 1,
      fixcolors: 'red',
      textMsg: '暂无数据',
      sections: '',  // 标段名称
      contractHeight:0,
      rowData:this.$route.query.row?JSON.parse(this.$route.query.row):this.$route.query.row,
      monthData:{ 
        oneplan1:this.$route.query.row?JSON.parse(this.$route.query.row).oneplan1:"",
        oneplan2:this.$route.query.row?JSON.parse(this.$route.query.row).oneplan2:"",
        oneplan3:this.$route.query.row?JSON.parse(this.$route.query.row).oneplan3:"",
        oneplan4:this.$route.query.row?JSON.parse(this.$route.query.row).oneplan4:"",
        oneplan5:this.$route.query.row?JSON.parse(this.$route.query.row).oneplan5:"",
        oneplan6:this.$route.query.row?JSON.parse(this.$route.query.row).oneplan6:"",
        oneplan7:this.$route.query.row?JSON.parse(this.$route.query.row).oneplan7:"",
        oneplan8:this.$route.query.row?JSON.parse(this.$route.query.row).oneplan8:"",
        oneplan9:this.$route.query.row?JSON.parse(this.$route.query.row).oneplan9:"",
        oneplan10:this.$route.query.row?JSON.parse(this.$route.query.row).oneplan10:"",
        oneplan11:this.$route.query.row?JSON.parse(this.$route.query.row).oneplan11:"",
        oneplan12:this.$route.query.row?JSON.parse(this.$route.query.row).oneplan12:"",
        acts1:this.$route.query.row?JSON.parse(this.$route.query.row).acts1:"",
        acts2:this.$route.query.row?JSON.parse(this.$route.query.row).acts2:"",
        acts3:this.$route.query.row?JSON.parse(this.$route.query.row).acts3:"",
        acts4:this.$route.query.row?JSON.parse(this.$route.query.row).acts4:"",
        acts5:this.$route.query.row?JSON.parse(this.$route.query.row).acts5:"",
        acts6:this.$route.query.row?JSON.parse(this.$route.query.row).acts6:"",
        acts7:this.$route.query.row?JSON.parse(this.$route.query.row).acts7:"",
        acts8:this.$route.query.row?JSON.parse(this.$route.query.row).acts8:"",
        acts9:this.$route.query.row?JSON.parse(this.$route.query.row).acts9:"",
        acts10:this.$route.query.row?JSON.parse(this.$route.query.row).acts10:"",
        acts11:this.$route.query.row?JSON.parse(this.$route.query.row).acts11:"",
        acts12:this.$route.query.row?JSON.parse(this.$route.query.row).acts12:"",
        mons1: this.$route.query.row?JSON.parse(this.$route.query.row).mons1:"",
        mons2: this.$route.query.row?JSON.parse(this.$route.query.row).mons2:"",
        mons3: this.$route.query.row?JSON.parse(this.$route.query.row).mons3:"",
        mons4: this.$route.query.row?JSON.parse(this.$route.query.row).mons4:"",
        mons5: this.$route.query.row?JSON.parse(this.$route.query.row).mons5:"",
        mons6: this.$route.query.row?JSON.parse(this.$route.query.row).mons6:"",
        mons7: this.$route.query.row?JSON.parse(this.$route.query.row).mons7:"",
        mons8: this.$route.query.row?JSON.parse(this.$route.query.row).mons8:"",
        mons9: this.$route.query.row?JSON.parse(this.$route.query.row).mons9:"",
        mons10: this.$route.query.row?JSON.parse(this.$route.query.row).mons10:"",
        mons11: this.$route.query.row?JSON.parse(this.$route.query.row).mons11:"",
        mons12: this.$route.query.row?JSON.parse(this.$route.query.row).mons12:""
      },
      modelFlag: { // 弹框信息
        title: '',
        showModel: false,
        type: '',
        con1: this.$route.query.row?JSON.parse(this.$route.query.row).fdSectionNameChildidProperty:"",  // 招标范围
        con2: this.$route.query.row?JSON.parse(this.$route.query.row).fdThisweekEvolve:"",  // 本周进展
        con3: this.$route.query.row?JSON.parse(this.$route.query.row).fdContractAgreementAnalyze:"",  // 履约分析
        con4: this.$route.query.row?JSON.parse(this.$route.query.row).fdContractExcuteRemark:"",  // 备注
      },
      rowData:{},
      moneyList: [],  // 添加单元格数据
      rowList: [],
      locaList: [ // 资料备案所在地
        {
          value: '华北分公司',
          label: '华北分公司'
        }, 
        {
          value: '华东分公司',
          label: '华东分公司'
        }, 
        {
          value: '南方分公司',
          label: '南方分公司'
        },
        {
          value: '西北分公司',
          label: '西北分公司'
        }
      ],
      statusList: [ // 合同执行状态
        {
          value: '正常',
          label: '正常'
        }, 
        {
          value: '合同条款约定不完整',
          label: '合同条款约定不完整'
        }, 
        {
          value: '存在纠纷',
          label: '存在纠纷'
        },
        {
          value: '合同解除',
          label: '合同解除'
        }
      ],
      itemList: [ // 项目列表
        {
          value: 'HB-华北',
          label: 'HB-'
        }, 
        {
          value: 'HD-华东',
          label: 'HD-'
        }, 
        {
          value: 'NF-南方',
          label: 'NF-'
        },
        {
          value: 'XB-西北',
          label: 'XB-'
        }
      ],
      bargainList: [ // 合同列表
        {
          value: 'FW-服务',
          label: 'FW-'
        }, 
        {
          value: 'JS-技术',
          label: 'JS-'
        }, 
        {
          value: 'SG-施工',
          label: 'SG-'
        },
        {
          value: 'SB-设备',
          label: 'SB-'
        },
        {
          value: 'KF-开发',
          label: 'KF-'
        }
      ],
      pattern: [ // 承发包模式
        {
          value: '1',
          label: '合资合作'
        }, 
        {
          value: '2',
          label: '平行发包'
        }, 
        {
          value: '3',
          label: 'PC总承包'
        },
        {
          value: '4',
          label: 'EPC总承包'
        },
        {
          value: '5',
          label: '施工总承包'
        }
      ],
      purchase: [ // 采购方式
        {
          value: '询比价',
          label: '询比价'
        }, 
        {
          value: '公开招标',
          label: '公开招标'
        }, 
        {
          value: '邀请招标',
          label: '邀请招标'
        },
        {
          value: '单一来源',
          label: '单一来源'
        },
        {
          value: '竞争性谈判',
          label: '竞争性谈判'
        }
      ],
      agency: [ // 招标代理机构
        {
          value: '中机',
          label: '中机'
        }, 
        {
          value: '天工开物',
          label: '天工开物'
        },
        {
          value: '国信',
          label: '国信'
        }
      ],
      // cateList: this.$route.query.sortcate, // 类别划分
      sectionList: [],  // 标段名称
      Tendetails: '',  // 招标范围查看详情
      // 上传文件定义
      fileList1: [], // 招标资料上传的文件
      fileList2: [], // 投标资料上传的文件
      fileList3: [], // 定标资料上传的文件
      obj: {
        fdContractProid:'',
        fdProId: '', // 项目id
        fdSectionNameChildId: '',  // 标段ID
        fdName: '', // 项目名称
        fdEngineeringArea: '', // 所属工程大区
        fdProCapacity: '', // 项目容量
        fdPackageModel: '', // 承发包模式
        fdPostName: '', // 项目经理
        fdContractTypeDivideTotalPropertyName: '', // 类别划分
        fdContractTypeDivideParentPropertyName: '', // 标段名称
        fdSectionNameChildidProperty: '', // 招标范围
        fdContractManager: '',  // 合同经理
        fdForMiningEngineer: '', // 招采工程师
        fdCostEngineer: '', // 造价工程师
        fdPurchaseWay: '', // 采购方式
        fdCfbAgencyInstitution: '', // 招标代理机构
        fdCfbAppointTimeStartworking: '', // 招标计划约定时间 开场/进场
        fdCfbAppointTimeEndworking: '', // 招标计划约定时间 完工/离场
        fdCfbFileAppointTimeStartworking: '', // 招标文件约定时间 开工/进场
        fdCfbFileAppointTimeEndworking: '', // 招标文件约定时间 完工/离场
        fdSiteRoadworkStartworking: '', // 现场施工时间  开工/进场
        fdSiteRoadworkEndworking: '', //现场施工时间  完工/离场
        fdCfbBiasTimeStartworking: '', // 招标计划偏差时间  开工/进场
        fdCfbBiasTimeEndworking: '',  // 招标计划偏差时间  完工/离场
        fdCfbPlanHandinPlanTime: '', // 招标计划提报  计划时间
        fdCfbApplyforPlanTime: '', // 招标申请 计划时间
        fdCfbApplyforRealityTime: '', // 招标申请 实际时间
        fdCfbApplyforBiasTime: '',  // 招标申请 偏差时间
        fdSkillResourceHandinPlanTime: '', // 技术资料提报 计划时间
        fdSkillResourceHandinRealityTime: '', // 技术资料提报  实际时间
        fdSkillResourceHandinBiasTime: '', // 技术资料提报 偏差时间
        fdProRepertoireHandinPlanTime: '', // 工程量清单提报  计划时间
        fdProRepertoireHandinRealityTime: '', // 工程量清单提报  实际时间
        fdProRepertoireHandinBiasTime: '', // 工程量清单提报  偏差时间
        fdLaunchMarkPlanTime: '', // 发标  计划时间
        fdLaunchMarkRealityTime: '',  // 发标 实际时间
        fdLaunchMarkBiasTime: '', // 发标  偏差时间
        fdStartMarkPlanTime: '', // 开标  计划时间
        fdStartMarkRealityTime: '', // 开标 实际时间
        fdStartMarkBiasTime: '', // 开标 偏差时
        fdTofixMarkPlanTime: '', // 定标 计划时间
        fdTofixMarkRealityTime: '',  // 定标 实际时间
        fdTofixMarkBiasTime: '', // 定标  偏差时间
        fdResourceFortherecordSite: '', // fdResourceFortherecordSite
        fdCfbResourceAccessory: '', // 招标资料
        fdBidResourceAccessory: '', // 投标资料
        fdTofixMarkResourceAccessory: '', // 定标资料
        fdSendWinthebiddingInformtime: '', // 发出中标通知书时间
        fdWinthebiddingMoney: '', // 中标金额（元）
        fdWinthebiddingUnit: '', // 中标单位
        fdWinthebiddingUser: '', // 中标单位联系人
        fdUserPhone: '', // 联系方式
        fdThisweekEvolve: '', // 本周进展
        fdPurchaseOrderNumber: '', // SAP采购订单号
        fdProLocation: '', // 合同编号下的选择区域
        fdProNameLogogram: '',  // 
        fdContractType: '', // 
        fdSignAContractate: '', // 
        fdSignAContractateNextProperty: '', // 
        fdContractName: '',  // 合同名称
        fdContractMoney: '', // 合同金额
        fdOAReviewStartTime: '', // oa评审发起时间
        fdOAReviewEndTime: '', // oa评审结束时间
        fdSignAContractTime: '', // 合同签订时间
        fdContractDateOfFilingTime: '', // 归档日期
        fdContractCorrespondingPerson: '', // 合同相对人
        fdContractTotalManey: '', // 合同金额(总)
        fdContractPaymentClause: '',  // 付款条件
        fdContractDeposit: '',  // 质保金
        fdContractQualityDate: '', // 质量保证期
        fdContractExecuteCondition: '',  // 合同执行状态
        fdContractAgreementAnalyze: '', // 履约分析
        // fdContractExcuteAddupPayment: '',  // 累积已付款金额
        fdGrandTotalPayRatio:'', // 累积支付比例
        fdContractExcuteAddupMoaiManey: '', // 累积开票金额
        fdContractExcuteNotPayment: '',  // 未付金额
        fdContractExcuteStayMoaiManey: '', // 待开票金额
        fdContractExcuteRemark: '', // 备注
      },
      excuteList: [
        {
          fdContractExcuteDateid: 1, // id
          fdContractExcutePlanPayment: '', // 计划付款
          fdContractExcuteInvoiceManeger: '', // 开票金额
          fdContractExcuteRealityPayment: '', // 实际付款
        },
        {
          fdContractExcuteDateid: 2, // id
          fdContractExcutePlanPayment: '', // 计划付款
          fdContractExcuteInvoiceManeger: '', // 开票金额
          fdContractExcuteRealityPayment: '', // 实际付款
        },
        {
          fdContractExcuteDateid: 3, // id
          fdContractExcutePlanPayment: '', // 计划付款
          fdContractExcuteInvoiceManeger: '', // 开票金额
          fdContractExcuteRealityPayment: '', // 实际付款
        },
        {
          fdContractExcuteDateid: 4, // id
          fdContractExcutePlanPayment: '', // 计划付款
          fdContractExcuteInvoiceManeger: '', // 开票金额
          fdContractExcuteRealityPayment: '', // 实际付款
        },
        {
          fdContractExcuteDateid: 5, // id
          fdContractExcutePlanPayment: '', // 计划付款
          fdContractExcuteInvoiceManeger: '', // 开票金额
          fdContractExcuteRealityPayment: '', // 实际付款
        },
        {
          fdContractExcuteDateid: 6, // id
          fdContractExcutePlanPayment: '', // 计划付款
          fdContractExcuteInvoiceManeger: '', // 开票金额
          fdContractExcuteRealityPayment: this.mons6, // 实际付款
        },
        {
          fdContractExcuteDateid: 7, // id
          fdContractExcutePlanPayment: '', // 计划付款
          fdContractExcuteInvoiceManeger: '', // 开票金额
          fdContractExcuteRealityPayment: '', // 实际付款
        },
        {
          fdContractExcuteDateid: 8, // id
          fdContractExcutePlanPayment: this.oneplan8, // 计划付款
          fdContractExcuteInvoiceManeger: this.acts8, // 开票金额
          fdContractExcuteRealityPayment: this.mons8, // 实际付款
        },
        {
          fdContractExcuteDateid: 9, // id
          fdContractExcutePlanPayment: this.oneplan9, // 计划付款
          fdContractExcuteInvoiceManeger: this.acts9, // 开票金额
          fdContractExcuteRealityPayment: this.mons9, // 实际付款
        },
        {
          fdContractExcuteDateid: 10, // id
          fdContractExcutePlanPayment: '', // 计划付款
          fdContractExcuteInvoiceManeger: this.acts10, // 开票金额
          fdContractExcuteRealityPayment: this.mons10, // 实际付款
        },
        {
          fdContractExcuteDateid: 11, // id
          fdContractExcutePlanPayment: '', // 计划付款
          fdContractExcuteInvoiceManeger: '', // 开票金额
          fdContractExcuteRealityPayment: '', // 实际付款
        },
        {
          fdContractExcuteDateid: 12, // id
          fdContractExcutePlanPayment: '', // 计划付款
          fdContractExcuteInvoiceManeger: '', // 开票金额
          fdContractExcuteRealityPayment: '', // 实际付款
        }
      ],  // 1-12月份数据
      pickerBeginDateBefore:{
        // disabledDate(time) {
        //     if(that.rowList[0].fdCfbAppointTimeEndworking){
        //       return time.getTime() > Date.now() || time.getTime() > new Date(that.rowList[0].fdCfbAppointTimeEndworking).getTime();
        //     }else{
        //       return time.getTime() > Date.now();
        //     }
        // }
      },
      pickerBeginDateAfter:{
          // disabledDate(time) {
          //   if(that.rowList[0].fdCfbAppointTimeStartworking){
          //     var newtime=time.getFullYear()+"-"+((time.getMonth()+1)<10?("0"+(time.getMonth()+1)):(time.getMonth()+1))+'-'+time.getDate();
          //     if(that.rowList[0].fdCfbAppointTimeStartworking===newtime){
          //       return false;
          //     }
          //     return time.getTime() > Date.now() || time.getTime() < new Date(that.rowList[0].fdCfbAppointTimeStartworking).getTime();
          //   }else{
          //     return time.getTime() > Date.now();
          //   }
          // }
      },
      pickerBeginDateBefore1:{
        // disabledDate(time) {
        //     if(that.rowList[0].fdCfbFileAppointTimeEndworking){
        //       return time.getTime() > Date.now() || time.getTime() > new Date(that.rowList[0].fdCfbFileAppointTimeEndworking).getTime();
        //     }else{
        //       return time.getTime() > Date.now();
        //     }
        // }
      },
      pickerBeginDateAfter1:{
          // disabledDate(time) {
          //   if(that.rowList[0].fdCfbFileAppointTimeEndworking){
          //     var newtime=time.getFullYear()+"-"+((time.getMonth()+1)<10?("0"+(time.getMonth()+1)):(time.getMonth()+1))+'-'+time.getDate();
          //     if(that.rowList[0].fdCfbFileAppointTimeEndworking===newtime){
          //       return false;
          //     }
          //     return time.getTime() > Date.now() || time.getTime() < new Date(that.rowList[0].fdCfbFileAppointTimeEndworking).getTime();
          //   }else{
          //     return time.getTime() > Date.now();
          //   }
          // }
      },
      pickerBeginDateBefore2:{
        // disabledDate(time) {
        //     if(that.rowList[0].fdSiteRoadworkEndworking){
        //       return time.getTime() > Date.now() || time.getTime() > new Date(that.rowList[0].fdSiteRoadworkEndworking).getTime();
        //     }else{
        //       return time.getTime() > Date.now();
        //     }
        // }
      },
      pickerBeginDateAfter2:{
          // disabledDate(time) {
          //   if(that.rowList[0].fdSiteRoadworkStartworking){
          //     var newtime=time.getFullYear()+"-"+((time.getMonth()+1)<10?("0"+(time.getMonth()+1)):(time.getMonth()+1))+'-'+time.getDate();
          //     if(that.rowList[0].fdSiteRoadworkStartworking===newtime){
          //       return false;
          //     }
          //     return time.getTime() > Date.now() || time.getTime() < new Date(that.rowList[0].fdSiteRoadworkStartworking).getTime();
          //   }else{
          //     return time.getTime() > Date.now();
          //   }
          // }
      },
      pickerBeginDateBefore3:{
        // disabledDate(time) {
        //     if(that.rowList[0].fdCfbApplyforRealityTime){
        //       return time.getTime() > Date.now() || time.getTime() > new Date(that.rowList[0].fdCfbApplyforRealityTime).getTime();
        //     }else{
        //       return time.getTime() > Date.now();
        //     }
        // }
      },
      pickerBeginDateAfter3:{
          // disabledDate(time) {
          //   if(that.rowList[0].fdCfbApplyforPlanTime){
          //     var newtime=time.getFullYear()+"-"+((time.getMonth()+1)<10?("0"+(time.getMonth()+1)):(time.getMonth()+1))+'-'+time.getDate();
          //     if(that.rowList[0].fdCfbApplyforPlanTime===newtime){
          //       return false;
          //     }
          //     return time.getTime() > Date.now() || time.getTime() < new Date(that.rowList[0].fdCfbApplyforPlanTime).getTime();
          //   }else{
          //     return time.getTime() > Date.now();
          //   }
          // }
      },
      pickerBeginDateBefore4:{
        // disabledDate(time) {
        //     if(that.rowList[0].fdSkillResourceHandinRealityTime){
        //       return time.getTime() > Date.now() || time.getTime() > new Date(that.rowList[0].fdSkillResourceHandinRealityTime).getTime();
        //     }else{
        //       return time.getTime() > Date.now();
        //     }
        // }
      },
      pickerBeginDateAfter4:{
          // disabledDate(time) {
          //   if(that.rowList[0].fdSkillResourceHandinPlanTime){
          //     var newtime=time.getFullYear()+"-"+((time.getMonth()+1)<10?("0"+(time.getMonth()+1)):(time.getMonth()+1))+'-'+time.getDate();
          //     if(that.rowList[0].fdSkillResourceHandinPlanTime===newtime){
          //       return false;
          //     }
          //     return time.getTime() > Date.now() || time.getTime() < new Date(that.rowList[0].fdSkillResourceHandinPlanTime).getTime();
          //   }else{
          //     return time.getTime() > Date.now();
          //   }
          // }
      },
      pickerBeginDateBefore5:{
        // disabledDate(time) {
        //     if(that.rowList[0].fdProRepertoireHandinRealityTime){
        //       return time.getTime() > Date.now() || time.getTime() > new Date(that.rowList[0].fdProRepertoireHandinRealityTime).getTime();
        //     }else{
        //       return time.getTime() > Date.now();
        //     }
        // }
      },
      pickerBeginDateAfter5:{
          // disabledDate(time) {
          //   if(that.rowList[0].fdProRepertoireHandinPlanTime){
          //     var newtime=time.getFullYear()+"-"+((time.getMonth()+1)<10?("0"+(time.getMonth()+1)):(time.getMonth()+1))+'-'+time.getDate();
          //     if(that.rowList[0].fdProRepertoireHandinPlanTime===newtime){
          //       return false;
          //     }
          //     return time.getTime() > Date.now() || time.getTime() < new Date(that.rowList[0].fdProRepertoireHandinPlanTime).getTime();
          //   }else{
          //     return time.getTime() > Date.now();
          //   }
          // }
      },
      pickerBeginDateBefore6:{
        // disabledDate(time) {
        //     if(that.rowList[0].fdLaunchMarkRealityTime){
        //       return time.getTime() > Date.now() || time.getTime() > new Date(that.rowList[0].fdLaunchMarkRealityTime).getTime();
        //     }else{
        //       return time.getTime() > Date.now();
        //     }
        // }
      },
      pickerBeginDateAfter6:{
          // disabledDate(time) {
          //   if(that.rowList[0].fdLaunchMarkPlanTime){
          //     var newtime=time.getFullYear()+"-"+((time.getMonth()+1)<10?("0"+(time.getMonth()+1)):(time.getMonth()+1))+'-'+time.getDate();
          //     if(that.rowList[0].fdLaunchMarkPlanTime===newtime){
          //       return false;
          //     }
          //     return time.getTime() > Date.now() || time.getTime() < new Date(that.rowList[0].fdLaunchMarkPlanTime).getTime();
          //   }else{
          //     return time.getTime() > Date.now();
          //   }
          // }
      },
      pickerBeginDateBefore7:{
        // disabledDate(time) {
        //     if(that.rowList[0].fdLaunchMarkRealityTime){
        //       return time.getTime() > Date.now() || time.getTime() > new Date(that.rowList[0].fdLaunchMarkRealityTime).getTime();
        //     }else{
        //       return time.getTime() > Date.now();
        //     }
        // }
      },
      pickerBeginDateAfter7:{
          // disabledDate(time) {
          //   if(that.rowList[0].fdStartMarkPlanTime){
          //     var newtime=time.getFullYear()+"-"+((time.getMonth()+1)<10?("0"+(time.getMonth()+1)):(time.getMonth()+1))+'-'+time.getDate();
          //     if(that.rowList[0].fdStartMarkPlanTime===newtime){
          //       return false;
          //     }
          //     return time.getTime() > Date.now() || time.getTime() < new Date(that.rowList[0].fdStartMarkPlanTime).getTime();
          //   }else{
          //     return time.getTime() > Date.now();
          //   }
          // }
      },
      pickerBeginDateBefore8:{
        // disabledDate(time) {
        //     if(that.rowList[0].fdTofixMarkRealityTime){
        //       return time.getTime() > Date.now() || time.getTime() > new Date(that.rowList[0].fdTofixMarkRealityTime).getTime();
        //     }else{
        //       return time.getTime() > Date.now();
        //     }
        // }
      },
      pickerBeginDateAfter8:{
          // disabledDate(time) {
          //   if(that.rowList[0].fdTofixMarkPlanTime){
          //     var newtime=time.getFullYear()+"-"+((time.getMonth()+1)<10?("0"+(time.getMonth()+1)):(time.getMonth()+1))+'-'+time.getDate();
          //     if(that.rowList[0].fdTofixMarkPlanTime===newtime){
          //       return false;
          //     }
          //     return time.getTime() > Date.now() || time.getTime() < new Date(that.rowList[0].fdTofixMarkPlanTime).getTime();
          //   }else{
          //     return time.getTime() > Date.now();
          //   }
          // }
      }
    }
  },
  mounted() {
    this.contractHeight = document.getElementById("contractinfo").offsetHeight - 100;
    // console.log(JSON.parse(this.$route.query.row));
    this.obj.fdContractProid = this.$route.query.row?JSON.parse(this.$route.query.row).fdContractProid:"";
    this.obj.fdProId = this.$route.query.row?JSON.parse(this.$route.query.row).fdProId:"";
    this.obj.fdSectionNameChildId = this.$route.query.row?JSON.parse(this.$route.query.row).fdSectionNameChildId:"";
    this.obj.fdName = this.$route.query.row?JSON.parse(this.$route.query.row).fdName:"";
    this.obj.fdEngineeringArea = this.$route.query.row?JSON.parse(this.$route.query.row).fdEngineeringArea:"";
    this.obj.fdProCapacity = this.$route.query.row?JSON.parse(this.$route.query.row).fdProCapacity:"";
    this.obj.fdPackageModel = this.$route.query.row?JSON.parse(this.$route.query.row).fdPackageModel:"";
    this.obj.fdPostName = this.$route.query.row?JSON.parse(this.$route.query.row).fdPostName:"";
    this.obj.fdContractTypeDivideTotalPropertyName = this.$route.query.row?JSON.parse(this.$route.query.row).fdContractTypeDivideTotalPropertyName:"";
    this.obj.fdContractTypeDivideParentPropertyName = this.$route.query.row?JSON.parse(this.$route.query.row).fdContractTypeDivideParentPropertyName:"";
    this.obj.fdSectionNameChildidProperty = this.$route.query.row?JSON.parse(this.$route.query.row).fdSectionNameChildidProperty:"";
    this.obj.fdContractManager = this.$route.query.row?JSON.parse(this.$route.query.row).fdContractManager:"";
    this.obj.fdForMiningEngineer = this.$route.query.row?JSON.parse(this.$route.query.row).fdForMiningEngineer:"";
    this.obj.fdCostEngineer = this.$route.query.row?JSON.parse(this.$route.query.row).fdCostEngineer:"";
    this.obj.fdPurchaseWay = this.$route.query.row?JSON.parse(this.$route.query.row).fdPurchaseWay:"";
    this.obj.fdCfbAgencyInstitution = this.$route.query.row?JSON.parse(this.$route.query.row).fdCfbAgencyInstitution:"";
    this.obj.fdCfbAppointTimeStartworking = this.$route.query.row?JSON.parse(this.$route.query.row).fdCfbAppointTimeStartworking:"";
    this.obj.fdCfbAppointTimeEndworking = this.$route.query.row?JSON.parse(this.$route.query.row).fdCfbAppointTimeEndworking:"";
    this.obj.fdCfbFileAppointTimeStartworking = this.$route.query.row?JSON.parse(this.$route.query.row).fdCfbFileAppointTimeStartworking:"";
    this.obj.fdCfbFileAppointTimeEndworking = this.$route.query.row?JSON.parse(this.$route.query.row).fdCfbFileAppointTimeEndworking:"";
    this.obj.fdSiteRoadworkStartworking = this.$route.query.row?JSON.parse(this.$route.query.row).fdSiteRoadworkStartworking:"";
    this.obj.fdSiteRoadworkEndworking = this.$route.query.row?JSON.parse(this.$route.query.row).fdSiteRoadworkEndworking:"";
    this.obj.fdCfbBiasTimeStartworking = this.$route.query.row?JSON.parse(this.$route.query.row).fdCfbBiasTimeStartworking:"";
    this.obj.fdCfbBiasTimeEndworking = this.$route.query.row?JSON.parse(this.$route.query.row).fdCfbBiasTimeEndworking:"";
    this.obj.fdCfbPlanHandinPlanTime = this.$route.query.row?JSON.parse(this.$route.query.row).fdCfbPlanHandinPlanTime:"";
    this.obj.fdCfbApplyforPlanTime = this.$route.query.row?JSON.parse(this.$route.query.row).fdCfbApplyforPlanTime:"";
    this.obj.fdCfbApplyforRealityTime = this.$route.query.row?JSON.parse(this.$route.query.row).fdCfbApplyforRealityTime:"";
    this.obj.fdCfbApplyforBiasTime = this.$route.query.row?JSON.parse(this.$route.query.row).fdCfbApplyforBiasTime:"";
    this.obj.fdSkillResourceHandinPlanTime = this.$route.query.row?JSON.parse(this.$route.query.row).fdSkillResourceHandinPlanTime:"";
    this.obj.fdSkillResourceHandinRealityTime = this.$route.query.row?JSON.parse(this.$route.query.row).fdSkillResourceHandinRealityTime:"";
    this.obj.fdSkillResourceHandinBiasTime = this.$route.query.row?JSON.parse(this.$route.query.row).fdSkillResourceHandinBiasTime:"";
    this.obj.fdProRepertoireHandinPlanTime = this.$route.query.row?JSON.parse(this.$route.query.row).fdProRepertoireHandinPlanTime:"";
    this.obj.fdProRepertoireHandinRealityTime =this.$route.query.row?JSON.parse(this.$route.query.row).fdProRepertoireHandinRealityTime:"";
    this.obj.fdProRepertoireHandinBiasTime = this.$route.query.row?JSON.parse(this.$route.query.row).fdProRepertoireHandinBiasTime:"";
    this.obj.fdLaunchMarkPlanTime = this.$route.query.row?JSON.parse(this.$route.query.row).fdLaunchMarkPlanTime:"";
    this.obj.fdLaunchMarkRealityTime = this.$route.query.row?JSON.parse(this.$route.query.row).fdLaunchMarkRealityTime:"";
    this.obj.fdLaunchMarkBiasTime = this.$route.query.row?JSON.parse(this.$route.query.row).fdLaunchMarkBiasTime:"";
    this.obj.fdStartMarkPlanTime = this.$route.query.row?JSON.parse(this.$route.query.row).fdStartMarkPlanTime:"";
    this.obj.fdStartMarkRealityTime = this.$route.query.row?JSON.parse(this.$route.query.row).fdStartMarkRealityTime:"";
    this.obj.fdStartMarkBiasTime = this.$route.query.row?JSON.parse(this.$route.query.row).fdStartMarkBiasTime:"";
    this.obj.fdTofixMarkPlanTime = this.$route.query.row?JSON.parse(this.$route.query.row).fdTofixMarkPlanTime:"";
    this.obj.fdTofixMarkRealityTime = this.$route.query.row?JSON.parse(this.$route.query.row).fdTofixMarkRealityTime:"";
    this.obj.fdTofixMarkBiasTime = this.$route.query.row?JSON.parse(this.$route.query.row).fdTofixMarkBiasTime:"";
    this.obj.fdResourceFortherecordSite = this.$route.query.row?JSON.parse(this.$route.query.row).fdResourceFortherecordSite:"";
    this.obj.fdCfbResourceAccessory = this.$route.query.row?JSON.parse(this.$route.query.row).fdCfbResourceAccessory:"";
    this.obj.fdBidResourceAccessory = this.$route.query.row?JSON.parse(this.$route.query.row).fdBidResourceAccessory:"";
    this.obj.fdTofixMarkResourceAccessory = this.$route.query.row?JSON.parse(this.$route.query.row).fdTofixMarkResourceAccessory:"";
    this.obj.fdSendWinthebiddingInformtime = this.$route.query.row?JSON.parse(this.$route.query.row).fdSendWinthebiddingInformtime:"";
    this.obj.fdWinthebiddingMoney = this.$route.query.row?JSON.parse(this.$route.query.row).fdWinthebiddingMoney:"";
    this.obj.fdWinthebiddingUnit = this.$route.query.row?JSON.parse(this.$route.query.row).fdWinthebiddingUnit:"";
    this.obj.fdWinthebiddingUser = this.$route.query.row?JSON.parse(this.$route.query.row).fdWinthebiddingUser:"";
    this.obj.fdUserPhone = this.$route.query.row?JSON.parse(this.$route.query.row).fdUserPhone:"";
    this.obj.fdThisweekEvolve = this.$route.query.row?JSON.parse(this.$route.query.row).fdThisweekEvolve:"";
    this.obj.fdPurchaseOrderNumber = this.$route.query.row?JSON.parse(this.$route.query.row).fdPurchaseOrderNumber:"";
    this.obj.fdProLocation = this.$route.query.row?JSON.parse(this.$route.query.row).fdProLocation:"";
    this.obj.fdProNameLogogram = this.$route.query.row?JSON.parse(this.$route.query.row).fdProNameLogogram:"";
    this.obj.fdContractType = this.$route.query.row?JSON.parse(this.$route.query.row).fdContractType:"";
    this.obj.fdSignAContractate = this.$route.query.row?JSON.parse(this.$route.query.row).fdSignAContractate:"";
    this.obj.fdSignAContractateNextProperty = this.$route.query.row?JSON.parse(this.$route.query.row).fdSignAContractateNextProperty:"";
    this.obj.fdContractName = this.$route.query.row?JSON.parse(this.$route.query.row).fdContractName:"";
    this.obj.fdContractMoney = this.$route.query.row?JSON.parse(this.$route.query.row).fdContractMoney:"";
    this.obj.fdOAReviewStartTime = this.$route.query.row?JSON.parse(this.$route.query.row).fdOAReviewStartTime:"";
    this.obj.fdOAReviewEndTime = this.$route.query.row?JSON.parse(this.$route.query.row).fdOAReviewEndTime:"";
    this.obj.fdSignAContractTime = this.$route.query.row?JSON.parse(this.$route.query.row).fdSignAContractTime:"";
    this.obj.fdContractDateOfFilingTime = this.$route.query.row?JSON.parse(this.$route.query.row).fdContractDateOfFilingTime:"";
    this.obj.fdContractCorrespondingPerson = this.$route.query.row?JSON.parse(this.$route.query.row).fdContractCorrespondingPerson:"";
    this.obj.fdContractTotalManey = this.$route.query.row?JSON.parse(this.$route.query.row).fdContractTotalManey:"";
    this.obj.fdContractPaymentClause = this.$route.query.row?JSON.parse(this.$route.query.row).fdContractPaymentClause:"";
    this.obj.fdContractDeposit = this.$route.query.row?JSON.parse(this.$route.query.row).fdContractDeposit:"";
    this.obj.fdContractQualityDate = this.$route.query.row?JSON.parse(this.$route.query.row).fdContractQualityDate:"";
    this.obj.fdContractExecuteCondition = this.$route.query.row?JSON.parse(this.$route.query.row).fdContractExecuteCondition:"";
    this.obj.fdContractAgreementAnalyze = this.$route.query.row?JSON.parse(this.$route.query.row).fdContractAgreementAnalyze:"";
    this.obj.fdContractExcuteAddupPayment = this.$route.query.row?JSON.parse(this.$route.query.row).fdContractExcuteAddupPayment:"";
    this.obj.fdContractExcuteNotPayment = this.$route.query.row?JSON.parse(this.$route.query.row).fdContractExcuteNotPayment:"";
    this.obj.fdContractExcuteStayMoaiManey = this.$route.query.row?JSON.parse(this.$route.query.row).fdContractExcuteStayMoaiManey:"";
    this.obj.fdContractExcuteRemark = this.$route.query.row?JSON.parse(this.$route.query.row).fdContractExcuteRemark:"";
    this.obj.fdGrandTotalPayRatio = this.$route.query.row?JSON.parse(this.$route.query.row).fdGrandTotalPayRatio:"";
    this.obj.fdContractExcuteAddupMoaiManey = this.$route.query.row?JSON.parse(this.$route.query.row).fdContractExcuteAddupMoaiManey:"";
    this.moneyList = this.$route.query.row?JSON.parse(this.$route.query.row).moneyList:"";
    this.rowList.push(this.obj);
    for(var i = 0;i<this.rowList.length;i++){
      // 定标
      if(this.rowList[i].fdTofixMarkBiasTime){
        if(this.rowList[i].fdTofixMarkBiasTime.indexOf('滞后') != -1){
          this.rowList[i].fixcolors = 'red';
        }else if(this.rowList[i].fdTofixMarkBiasTime.indexOf('提前') != -1){
          this.rowList[i].fixcolors = 'skyblue';
        }else if(this.rowList[i].fdTofixMarkBiasTime.indexOf('正常') != -1){
          this.rowList[i].fixcolors = 'green';
        }else{
          this.rowList[i].fixcolors = 'green';
        }
      }
      // 开标
      if(this.rowList[i].fdStartMarkBiasTime){
        if(this.rowList[i].fdStartMarkBiasTime.indexOf('滞后') != -1){
          this.rowList[i].StartMarkcolors = 'red';
        }else if(this.rowList[i].fdStartMarkBiasTime.indexOf('提前') != -1){
          this.rowList[i].StartMarkcolors = 'skyblue';
        }else if(this.rowList[i].fdStartMarkBiasTime.indexOf('正常') != -1){
          this.rowList[i].StartMarkcolors = 'green';
        }else{
          this.rowList[i].StartMarkcolors = 'green';
        }
      }

      // 发标
      if(this.rowList[i].fdLaunchMarkBiasTime){
        if(this.rowList[i].fdLaunchMarkBiasTime.indexOf('滞后') != -1){
          this.rowList[i].Markcolors = 'red';
        }else if(this.rowList[i].fdLaunchMarkBiasTime.indexOf('提前') != -1){
          this.rowList[i].Markcolors = 'skyblue';
        }else if(this.rowList[i].fdLaunchMarkBiasTime.indexOf('正常') != -1){
          this.rowList[i].Markcolors = 'green';
        }else{
          this.rowList[i].Markcolors = 'green';
        }
      }

      // 工程量清单提报
      if(this.rowList[i].fdProRepertoireHandinBiasTime){
        if(this.rowList[i].fdProRepertoireHandinBiasTime.indexOf('滞后') != -1){
          this.rowList[i].Repertcolors = 'red';
        }else if(this.rowList[i].fdProRepertoireHandinBiasTime.indexOf('提前') != -1){
          this.rowList[i].Repertcolors = 'skyblue';
        }else if(this.rowList[i].fdProRepertoireHandinBiasTime.indexOf('正常') != -1){
          this.rowList[i].Repertcolors = 'green';
        }else{
          this.rowList[i].Repertcolors = 'green';
        }
      }

      // 技术资料提报
      if(this.rowList[i].fdSkillResourceHandinBiasTime){
        if(this.rowList[i].fdSkillResourceHandinBiasTime.indexOf('滞后') != -1){
          this.rowList[i].Handcolors = 'red';
        }else if(this.rowList[i].fdSkillResourceHandinBiasTime.indexOf('提前') != -1){
          this.rowList[i].Handcolors = 'skyblue';
        }else if(this.rowList[i].fdSkillResourceHandinBiasTime.indexOf('正常') != -1){
          this.rowList[i].Handcolors = 'green';
        }else{
          this.rowList[i].Handcolors = 'green';
        }
      }

      // 招标申请
      if(this.rowList[i].fdCfbApplyforBiasTime){
        if(this.rowList[i].fdCfbApplyforBiasTime.indexOf('滞后') != -1){
          this.rowList[i].Biascolors = 'red';
        }else if(this.rowList[i].fdCfbApplyforBiasTime.indexOf('提前') != -1){
          this.rowList[i].Biascolors = 'skyblue';
        }else if(this.rowList[i].fdCfbApplyforBiasTime.indexOf('正常') != -1){
          this.rowList[i].Biascolors = 'green';
        }else{
          this.rowList[i].Biascolors = 'green';
        }
      }

      // 招标计划偏差时间 开工进场
      if(this.rowList[i].fdCfbBiasTimeStartworking){
        if(this.rowList[i].fdCfbBiasTimeStartworking.indexOf('滞后') != -1){
          this.rowList[i].colors = 'red';
        }else if(this.rowList[i].fdCfbBiasTimeStartworking.indexOf('提前') != -1){
          this.rowList[i].colors = 'skyblue';
        }else if(this.rowList[i].fdCfbBiasTimeStartworking.indexOf('正常') != -1){
          this.rowList[i].colors = 'green';
        }else{
          this.rowList[i].colors = 'green';
        }
      }

      // 招标计划偏差时间 完工离场
      if(this.rowList[i].fdCfbBiasTimeEndworking){
        if(this.rowList[i].fdCfbBiasTimeEndworking.indexOf('滞后') != -1){
          this.rowList[i].colord = 'red';
        }else if(this.rowList[i].fdCfbBiasTimeEndworking.indexOf('提前') != -1){
          this.rowList[i].colord = 'skyblue';
        }else if(this.rowList[i].fdCfbBiasTimeEndworking.indexOf('正常') != -1){
          this.rowList[i].colord = 'green';
        }else{
          this.rowList[i].colord = 'green';
        }
      }
    }
  },
  methods:{
    // 保存
    Saves() {
      var _this = this;
      _this.excuteList.forEach((item) => {
        if(item.fdContractExcuteDateid == 1){
          item.fdContractExcutePlanPayment = _this.monthData.oneplan1; // 计划付款
          item.fdContractExcuteInvoiceManeger = _this.monthData.acts1, // 开票金额
          item.fdContractExcuteRealityPayment = _this.monthData.mons1; // 实际付款
        }if(item.fdContractExcuteDateid == 2){
          item.fdContractExcutePlanPayment = _this.monthData.oneplan2; // 计划付款
          item.fdContractExcuteInvoiceManeger = _this.monthData.acts2, // 开票金额
          item.fdContractExcuteRealityPayment = _this.monthData.mons2; // 实际付款
        }if(item.fdContractExcuteDateid == 3){
          item.fdContractExcutePlanPayment = _this.monthData.oneplan3; // 计划付款
          item.fdContractExcuteInvoiceManeger = _this.monthData.acts3, // 开票金额
          item.fdContractExcuteRealityPayment = _this.monthData.mons3; // 实际付款
        }if(item.fdContractExcuteDateid == 4){
          item.fdContractExcutePlanPayment = _this.monthData.oneplan4; // 计划付款
          item.fdContractExcuteInvoiceManeger = _this.monthData.acts4, // 开票金额
          item.fdContractExcuteRealityPayment = _this.monthData.mons4; // 实际付款
        }if(item.fdContractExcuteDateid == 5){
          item.fdContractExcutePlanPayment = _this.monthData.oneplan5; // 计划付款
          item.fdContractExcuteInvoiceManeger = _this.monthData.acts5, // 开票金额
          item.fdContractExcuteRealityPayment = _this.monthData.mons5; // 实际付款
        }if(item.fdContractExcuteDateid == 6){
          item.fdContractExcutePlanPayment = _this.monthData.oneplan6; // 计划付款
          item.fdContractExcuteInvoiceManeger = _this.monthData.acts6, // 开票金额
          item.fdContractExcuteRealityPayment = _this.monthData.mons6; // 实际付款
        }if(item.fdContractExcuteDateid == 7){
          item.fdContractExcutePlanPayment = _this.monthData.oneplan7; // 计划付款
          item.fdContractExcuteInvoiceManeger = _this.monthData.acts7, // 开票金额
          item.fdContractExcuteRealityPayment = _this.monthData.mons7; // 实际付款
        }if(item.fdContractExcuteDateid == 8){
          item.fdContractExcutePlanPayment = _this.monthData.oneplan8; // 计划付款
          item.fdContractExcuteInvoiceManeger = _this.monthData.acts8, // 开票金额
          item.fdContractExcuteRealityPayment = _this.monthData.mons8; // 实际付款
        }if(item.fdContractExcuteDateid == 9){
          item.fdContractExcutePlanPayment = _this.monthData.oneplan9; // 计划付款
          item.fdContractExcuteInvoiceManeger = _this.monthData.acts9, // 开票金额
          item.fdContractExcuteRealityPayment = _this.monthData.mons9; // 实际付款
        }if(item.fdContractExcuteDateid == 10){
          item.fdContractExcutePlanPayment = _this.monthData.oneplan10; // 计划付款
          item.fdContractExcuteInvoiceManeger = _this.monthData.acts10, // 开票金额
          item.fdContractExcuteRealityPayment = _this.monthData.mons10; // 实际付款
        }if(item.fdContractExcuteDateid == 11){
          item.fdContractExcutePlanPayment = _this.monthData.oneplan11; // 计划付款
          item.fdContractExcuteInvoiceManeger = _this.monthData.acts11, // 开票金额
          item.fdContractExcuteRealityPayment = _this.monthData.mons11; // 实际付款
        }if(item.fdContractExcuteDateid == 12){
          item.fdContractExcutePlanPayment = _this.monthData.oneplan12; // 计划付款
          item.fdContractExcuteInvoiceManeger = _this.monthData.acts12, // 开票金额
          item.fdContractExcuteRealityPayment = _this.monthData.mons12; // 实际付款
        }
      });
      // 承发包模式
      if(_this.rowList[0].fdPackageModel == '合资合作') {
        _this.rowList[0].fdPackageModel = 1;
      }else if(_this.rowList[0].fdPackageModel == '平行发包') {
        _this.rowList[0].fdPackageModel = 2;
      }else if(_this.rowList[0].fdPackageModel == 'PC总承包') {
        _this.rowList[0].fdPackageModel = 3;
      }else if(_this.rowList[0].fdPackageModel == 'EPC总承包') {
        _this.rowList[0].fdPackageModel = 4;
      }else if(_this.rowList[0].fdPackageModel == '施工总承包') {
        _this.rowList[0].fdPackageModel = 5;
      }

      // 所属工程大区
      if(_this.rowList[0].fdEngineeringArea == '工程一区') {
        _this.rowList[0].fdEngineeringArea = 1;
      }else if(_this.rowList[0].fdEngineeringArea == '工程二区') {
        _this.rowList[0].fdEngineeringArea = 2;
      }else if(_this.rowList[0].fdEngineeringArea == '工程三区') {
        _this.rowList[0].fdEngineeringArea = 3;
      }else if(_this.rowList[0].fdEngineeringArea == '工程四区') {
        _this.rowList[0].fdEngineeringArea = 4;
      }
      
      let params = {
        fdContractProid:_this.rowList[0].fdContractProid,
        fdProId: _this.rowList[0].fdProId,
        fdName: _this.rowList[0].fdName, // 项目名称
        fdEngineeringArea: _this.rowList[0].fdEngineeringArea,  // 所属工程大区
        fdProCapacity: _this.rowList[0].fdProCapacity,  // 项目容量
        fdPackageModel: _this.rowList[0].fdPackageModel,  // 承发包模式
        fdPostName: _this.rowList[0].fdPostName,  // 项目经理
        fdSectionNameChildId: _this.rowList[0].fdSectionNameChildId, // 标段id
        fdContractTypeDivideParentPropertyName: _this.rowList[0].fdContractTypeDivideParentPropertyName, // 标段名称
        fdContractTypeDivideTotalPropertyName: _this.rowList[0].fdContractTypeDivideTotalPropertyName,  // 类别划分
        fdSectionNameChildidProperty: _this.modelFlag.con1,  // 招标范围
        fdContractManager: _this.rowList[0].fdContractManager, // 合同经理
        fdForMiningEngineer: _this.rowList[0].fdForMiningEngineer,  // 招采工程师
        fdCostEngineer: _this.rowList[0].fdCostEngineer,  // 造价工程师
        fdPurchaseWay: _this.rowList[0].fdPurchaseWay,  // 采购方式
        fdCfbAgencyInstitution: _this.rowList[0].fdCfbAgencyInstitution,  // 招标代理机构
        fdCfbAppointTimeStartworking:_this.rowList[0].fdCfbAppointTimeStartworking, // 招标计划约定时间 开工/进场
        fdCfbAppointTimeEndworking: _this.rowList[0].fdCfbAppointTimeEndworking,  // 招标计划约定时间  完工/离场
        fdCfbFileAppointTimeStartworking: _this.rowList[0].fdCfbFileAppointTimeStartworking,   // 招标文件约定时间 开工/进场
        fdCfbFileAppointTimeEndworking: _this.rowList[0].fdCfbFileAppointTimeEndworking,   // 招标文件约定时间  完工/离场
        fdSiteRoadworkStartworking: _this.rowList[0].fdSiteRoadworkStartworking,  // 现场施工时间  开工/进场
        fdSiteRoadworkEndworking: _this.rowList[0].fdSiteRoadworkEndworking,  // 现场施工时间 完工/离场
        fdCfbPlanHandinPlanTime: _this.rowList[0].fdCfbPlanHandinPlanTime,  // 招标计划提报 计划时间
        fdCfbApplyforPlanTime: _this.rowList[0].fdCfbApplyforPlanTime,  // 招标申请 计划时间
        fdCfbApplyforRealityTime: _this.rowList[0].fdCfbApplyforRealityTime,  // 招标申请  实际时间
        fdSkillResourceHandinPlanTime: _this.rowList[0].fdSkillResourceHandinPlanTime,  // 技术资料提报 计划时间
        fdSkillResourceHandinRealityTime: _this.rowList[0].fdSkillResourceHandinRealityTime,  // 技术资料提报  实际时间
        fdProRepertoireHandinPlanTime: _this.rowList[0].fdProRepertoireHandinPlanTime,  // 工程量清单提报 计划时间
        fdProRepertoireHandinRealityTime: _this.rowList[0].fdProRepertoireHandinRealityTime, // 工程量清单提报  实际时间
        fdLaunchMarkPlanTime: _this.rowList[0].fdLaunchMarkPlanTime,  // 发标  计划时间
        fdLaunchMarkRealityTime: _this.rowList[0].fdLaunchMarkRealityTime,  // 发标  实际时间
        fdStartMarkPlanTime: _this.rowList[0].fdStartMarkPlanTime,  // 开标 计划时间
        fdStartMarkRealityTime: _this.rowList[0].fdStartMarkRealityTime, // 开标 实际时间
        fdTofixMarkPlanTime: _this.rowList[0].fdTofixMarkPlanTime,  // 定标  计划时间
        fdTofixMarkRealityTime: _this.rowList[0].fdTofixMarkRealityTime,  // 定标  实际时间
        fdResourceFortherecordSite: _this.rowList[0].fdResourceFortherecordSite,  // 资料备案所在地
        fdSendWinthebiddingInformtime: _this.rowList[0].fdSendWinthebiddingInformtime,  // 发出中标通知书时间
        fdWinthebiddingMoney: _this.rowList[0].fdWinthebiddingMoney,  // 中标金额（元）
        fdWinthebiddingUnit: _this.rowList[0].fdWinthebiddingUnit,  // 中标单位
        fdWinthebiddingUser: _this.rowList[0].fdWinthebiddingUser,  // 中标单位联系人
        fdUserPhone: _this.rowList[0].fdUserPhone,  // 联系方式
        fdThisweekEvolve: _this.modelFlag.con2,  // 本周进展
        fdContractTotalManey: _this.rowList[0].fdContractTotalManey,  // 合同金额(总)
        fdContractDeposit: _this.rowList[0].fdContractDeposit,  // 质保金
        fdContractQualityDate: _this.rowList[0].fdContractQualityDate,  // 质量保证期
        fdContractExecuteCondition: _this.rowList[0].fdContractExecuteCondition,  // 合同执行状态
        fdContractAgreementAnalyze: _this.modelFlag.con3,  // 履约分析
        // fdContractExcuteAddupPayment: _this.rowList[0].payments,  // 累积已付款金额
        fdContractExcuteAddupMoaiManey: _this.rowList[0].fdContractExcuteAddupMoaiManey,  // 累积开票金额
        fdContractExcuteNotPayment: _this.rowList[0].fdContractExcuteNotPayment, // 未付金额
        fdContractExcuteStayMoaiManey: _this.rowList[0].fdContractExcuteStayMoaiManey,  // 待开票金额
        moneyList: _this.moneyList,  // 添加单元格数据
        fdContractExcuteRemark: _this.modelFlag.con4,  // 备注
        excuteList: this.excuteList, // 1-12月份数据
      }
      console.log(params);
      this.$http.post('/engineer/businessContract/updateProContractInfo', params)
      .then(res => {
        // console.log(res);
        if(res.status == 200) {
          this.$message('修改成功');
          this.$router.push({name: 'contracts'});
        }
      })
    },
    // 取消
    Cancels() {
      this.$router.push({name: 'contracts'});  // 仅展示表格页面
    },
     // 添加单元格
    addTables(index) {
      let ovj = {
        fdPurchaseOrderNumber: '', // SAP采购订单号
        fdProLocation: '', // 合同编号下的选择区域
        fdProNameLogogram: '',  // 
        fdContractType: '', // 
        fdSignAContractate: '', // 
        fdSignAContractateNextProperty: '', // 
        fdContractName: '',  // 合同名称
        fdContractMoney: '', // 合同金额
        fdOAReviewStartTime: '', // oa评审发起时间
        fdOAReviewEndTime: '', // oa评审结束时间
        fdSignAContractTime: '', // 合同签订时间
        fdContractDateOfFilingTime: '', // 归档日期
        fdContractCorrespondingPerson: '', // 合同相对人
        fdContractTotalManey: '', // 合同金额(总)
        fdContractPaymentClause: '',  // 付款条件
      }
      this.moneyList.push(ovj);
    },
    // 删除单元格
    delTables(index) {
      this.moneyList.splice(index, 1);
    },
    // 手机号验证
    checkTel(value){
      let reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
      if (value) {
        if (new RegExp(reg).test(value) == false) {
          setTimeout(() => {
            this.rowList[0].fdUserPhone = '';  // 联系方式
            this.$message('请输入正确的11位手机号码');
          },200)
        }
      }
    },
    // 输入数值 验证
    checkNo(value){
      // let reg = /^[1-9]\d*$/;
      // if (value) {
      //   if (value > 9999999999 || new RegExp(reg).test(value) == false) {
      //     setTimeout(() => {
      //       if(this.rowList[0].fdWinthebiddingMoney){
      //         this.rowList[0].fdWinthebiddingMoney = '';
      //         this.$message('请输入数值');
      //       }if(this.rowList[0].fdContractTotalManey){
      //         this.rowList[0].fdContractTotalManey = '';
      //         this.$message('请输入数值');
      //       }
      //     }, 200);
      //   }
      // }
    },
    // 计算偏差时间
    Deviation() {
      // 招标计划偏差时间  开工/进场
      if(this.rowList[0].fdCfbAppointTimeStartworking && this.rowList[0].fdSiteRoadworkStartworking){
        let a = new Date(this.rowList[0].fdCfbAppointTimeStartworking.replace(/-/g, "/"));
        let b = new Date(this.rowList[0].fdSiteRoadworkStartworking.replace(/-/g, "/"));
        let days = b.getTime() - a.getTime();
        let time = parseInt(days / (1000 * 60 * 60 * 24));
        if(time < 0) {
          this.rowList[0].colors = 'skyblue';
          this.rowList[0].fdCfbBiasTimeStartworking = '提前' + Math.abs(time) + '天';
        }else if(time > 0) {
          this.rowList[0].colors = 'red';
          this.rowList[0].fdCfbBiasTimeStartworking = '滞后' + time + '天';
        }else{
          this.rowList[0].colors = 'green';
          this.rowList[0].fdCfbBiasTimeStartworking = '正常';
        }
      }
      // 招标计划偏差时间  完工/离场
      if(this.rowList[0].fdCfbAppointTimeEndworking && this.rowList[0].fdSiteRoadworkEndworking){
        let a = new Date(this.rowList[0].fdCfbAppointTimeEndworking.replace(/-/g, "/"));
        let b = new Date(this.rowList[0].fdSiteRoadworkEndworking.replace(/-/g, "/"));
        let days = b.getTime() - a.getTime();
        let time = parseInt(days / (1000 * 60 * 60 * 24));
        if(time < 0) {
          this.rowList[0].colord = 'skyblue';
          this.rowList[0].fdCfbBiasTimeEndworking = '提前' + Math.abs(time) + '天';
        }else if(time > 0) {
          this.rowList[0].colord = 'red';
          this.rowList[0].fdCfbBiasTimeEndworking = '滞后' + time + '天';
        }else{
          this.rowList[0].colord = 'green';
          this.rowList[0].fdCfbBiasTimeEndworking = '正常';
        }
      }
      // 招标申请偏差时间
      if(this.rowList[0].fdCfbApplyforPlanTime && this.rowList[0].fdCfbApplyforRealityTime){
        let a = new Date(this.rowList[0].fdCfbApplyforPlanTime.replace(/-/g, "/"));
        let b = new Date(this.rowList[0].fdCfbApplyforRealityTime.replace(/-/g, "/"));
        let days = b.getTime() - a.getTime();
        let time = parseInt(days / (1000 * 60 * 60 * 24));
        if(time < 0) {
          this.rowList[0].Biascolors = 'skyblue';
          this.rowList[0].fdCfbApplyforBiasTime = '提前' + Math.abs(time) + '天';
        }else if(time > 0) {
          this.rowList[0].Biascolors = 'red';
          this.rowList[0].fdCfbApplyforBiasTime = '滞后' + time + '天';
        }else{
          this.rowList[0].Biascolors = 'green';
          this.rowList[0].fdCfbApplyforBiasTime = '正常';
        }
      }
      // 技术资料提报偏差时间
      if(this.rowList[0].fdSkillResourceHandinPlanTime && this.rowList[0].fdSkillResourceHandinRealityTime) {
        let a = new Date(this.rowList[0].fdSkillResourceHandinPlanTime.replace(/-/g, "/"));
        let b = new Date(this.rowList[0].fdSkillResourceHandinRealityTime.replace(/-/g, "/"));
        let days = b.getTime() - a.getTime();
        let time = parseInt(days / (1000 * 60 * 60 * 24));
        if(time < 0) {
          this.rowList[0].Handcolors = 'skyblue';
          this.rowList[0].fdSkillResourceHandinBiasTime = '提前' + Math.abs(time) + '天';
        }else if(time > 0) {
          this.rowList[0].Handcolors = 'red';
          this.rowList[0].fdSkillResourceHandinBiasTime = '滞后' + time + '天';
        }else{
          this.rowList[0].Handcolors = 'green';
          this.rowList[0].fdSkillResourceHandinBiasTime = '正常';
        }
      }
      // 工程量清单偏差时间
      if(this.rowList[0].fdProRepertoireHandinPlanTime && this.rowList[0].fdProRepertoireHandinRealityTime) {
        let a = new Date(this.rowList[0].fdProRepertoireHandinPlanTime.replace(/-/g, "/"));
        let b = new Date(this.rowList[0].fdProRepertoireHandinRealityTime.replace(/-/g, "/"));
        let days = b.getTime() - a.getTime();
        let time = parseInt(days / (1000 * 60 * 60 * 24));
        if(time < 0) {
          this.rowList[0].Repertcolors = 'skyblue';
          this.rowList[0].fdProRepertoireHandinBiasTime = '提前' + Math.abs(time) + '天';
        }else if(time > 0) {
          this.rowList[0].Repertcolors = 'red';
          this.rowList[0].fdProRepertoireHandinBiasTime = '滞后' + time + '天';
        }else{
          this.rowList[0].Repertcolors = 'green';
          this.rowList[0].fdProRepertoireHandinBiasTime = '正常';
        }
      }
      //发标偏差时间
      if(this.rowList[0].fdLaunchMarkPlanTime && this.rowList[0].fdLaunchMarkRealityTime) {
        let a = new Date(this.rowList[0].fdLaunchMarkPlanTime.replace(/-/g, "/"));
        let b = new Date(this.rowList[0].fdLaunchMarkRealityTime.replace(/-/g, "/"));
        let days = b.getTime() - a.getTime();
        let time = parseInt(days / (1000 * 60 * 60 * 24));
        if(time < 0) {
          this.rowList[0].Markcolors = 'skyblue';
          this.rowList[0].fdLaunchMarkBiasTime = '提前' + Math.abs(time) + '天';
        }else if(time > 0) {
          this.rowList[0].Markcolors = 'red';
          this.rowList[0].fdLaunchMarkBiasTime = '滞后' + time + '天';
        }else{
          this.rowList[0].Markcolors = 'green';
          this.rowList[0].fdLaunchMarkBiasTime = '正常';
        }
      }
      //开标偏差时间
      if(this.rowList[0].fdStartMarkPlanTime && this.rowList[0].fdStartMarkRealityTime) {
        let a = new Date(this.rowList[0].fdStartMarkPlanTime.replace(/-/g, "/"));
        let b = new Date(this.rowList[0].fdStartMarkRealityTime.replace(/-/g, "/"));
        let days = b.getTime() - a.getTime();
        let time = parseInt(days / (1000 * 60 * 60 * 24));
        if(time < 0) {
          this.rowList[0].StartMarkcolors = 'skyblue';
          this.rowList[0].fdStartMarkBiasTime = '提前' + Math.abs(time) + '天';
        }else if(time > 0) {
          this.rowList[0].StartMarkcolors = 'red';
          this.rowList[0].fdStartMarkBiasTime = '滞后' + time + '天';
        }else{
          this.rowList[0].StartMarkcolors = 'green';
          this.rowList[0].fdStartMarkBiasTime = '正常';
        }
      }
      //定标偏差时间
      if(this.rowList[0].fdTofixMarkPlanTime && this.rowList[0].fdTofixMarkRealityTime) {
        let a = new Date(this.rowList[0].fdTofixMarkPlanTime.replace(/-/g, "/"));
        let b = new Date(this.rowList[0].fdTofixMarkRealityTime.replace(/-/g, "/"));
        let days = b.getTime() - a.getTime();
        let time = parseInt(days / (1000 * 60 * 60 * 24));
        if(time < 0) {
          this.rowList[0].fixcolors = 'skyblue';
          this.rowList[0].fdTofixMarkBiasTime = '提前' + Math.abs(time) + '天';
        }else if(time > 0) {
          this.rowList[0].fixcolors = 'red';
          this.rowList[0].fdTofixMarkBiasTime = '滞后' + time + '天';
        }else{
          this.rowList[0].fixcolors = 'green';
          this.rowList[0].fdTofixMarkBiasTime = '正常';
        }
      }

    },
    // 招标资料上传
    uploadSure(index,  idx){
      var _this = this;
      let fd = new FormData();
      fd.append('file', document.getElementById("upfile").files[0]); //传文件
      fd.append('fdProId', index); //传项目id
      fd.append('fdSectionNameChildId', idx); //传标段id
      fd.append('fdFileType', 1); // 招标资料
      if(document.getElementById("upfile").files[0] == "" || document.getElementById("upfile").files[0] == undefined) return;
      this.$http.post('/engineer/businessContract/upload', fd).then((res) => {
        // console.log(res);
        if(res.data.status == 200) {
          _this.$message('上传成功');
        }
      })
      return false;
    },
    // 投标资料上传
    uploadAcc(index,  idx){
      var _this = this;
      let fd = new FormData();
      fd.append('file', document.getElementById("upfiles").files[0]); //传文件
      fd.append('fdProId', index); //传项目id
      fd.append('fdSectionNameChildId', idx); //传标段id
      fd.append('fdFileType', 2); // 招标资料
      if(document.getElementById("upfiles").files[0] == "" || document.getElementById("upfiles").files[0] == undefined) return;
      this.$http.post('/engineer/businessContract/upload', fd).then((res) => {
        if(res.data.status == 200) {
          _this.$message('上传成功');
        }
      })
      return false;
    },
    // 定标资料上传
    uploadResource(index,  idx){
      var _this = this;
      let fd = new FormData();
      fd.append('file', document.getElementById("upfiled").files[0]); //传文件
      fd.append('fdProId', index); //传项目id
      fd.append('fdSectionNameChildId', idx); //传标段id
      fd.append('fdFileType', 3); // 招标资料
      if(document.getElementById("upfiled").files[0] == "" || document.getElementById("upfiled").files[0] == undefined) return;
      this.$http.post('/engineer/businessContract/upload', fd).then((res) => {
        if(res.data.status == 200) {
          _this.$message('上传成功');
        }
      })
      return false;
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
    // 查看详情
    Details(type) {
      if(type == "looks"){ // 招标范围
        this.modelFlag.title = '招标范围详情';
        this.modelFlag.showModel = true;
        this.modelFlag.type = type;
        this.msg=this.modelFlag.con1;
      }else if(type == "analysis"){ // 履约分析
        this.modelFlag.title = '履约分析详情';
        this.modelFlag.showModel = true;
        this.modelFlag.type = type;
        this.msg=this.modelFlag.con3;
      }else if(type == "remarks"){ // 备注
        this.modelFlag.title = '备注详情';
        this.modelFlag.showModel = true;
        this.modelFlag.type = type;  
        this.msg=this.modelFlag.con4;
      }else if(type == "progress"){ // 本周进展
        this.modelFlag.title = '本周进展详情';
        this.modelFlag.showModel = true;
        this.modelFlag.type = type; 
        this.msg=this.modelFlag.con2;
      }
    }
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
