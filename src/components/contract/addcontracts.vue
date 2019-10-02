<template>

  <div class="contract">
    <!-- 商务合同 -->
    <div class="contractinfo" id="contractinfo">
      <div class="contract-tops">商务合同新增</div>
      <div class="table-list" v-loading="Loadings" element-loading-text="拼命加载中"  element-loading-spinner="el-icon-loading"   element-loading-background="rgba(0, 0, 0, 0.8)" :style="{height: contractHeight+'px'}">
        <el-table
          :data="addList"
          :empty-text="textMsg"
          border
          :header-cell-style="getRowClass"
          style="width: 100%; margin-bottom: 50px;">
          <el-table-column  prop="fdName"  label="项目名称"  align="center" fixed="left"   width="220">
            <template slot-scope="scope">
              <el-select v-model="scope.row.fdName" filterable placeholder="请输入项目名称..." @change="nameChange()" clearable>
                <el-option  v-for="item in fdnameList"  :key="item.label"  :label="item.label"  :value="item.label"></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="项目基本信息" align="center">
            <el-table-column
              prop="fdEngineeringArea"
              label="所属工程大区"
              align="center"        
              :show-overflow-tooltip="true"
              width="120">
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
              width="100">
            </el-table-column>
          </el-table-column>
          <el-table-column label="标段基本信息" align="center">
            <el-table-column
              prop="fdContractTypeDivideTotalPropertyName"
              label="类别划分"
              align="center"
              width="140">
              <template slot-scope="scope">
                <el-select size="mini" v-model="scope.row.fdContractTypeDivideTotalPropertyName" placeholder="请选择" @change="cateGory(addList[0].fdProId, scope.row.fdContractTypeDivideTotalPropertyName)"  clearable>
                  <el-option v-for="item in cateList" :key="item.value" :label="item.label"  :value="item.value + ',' + item.label"></el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column
              prop="fdContractTypeDivideParentPropertyName"
              label="标段名称"
              align="center"
              :show-overflow-tooltip="true"
              width="180">
              <template slot-scope="scope">
                <el-select size="mini" v-model="scope.row.fdContractTypeDivideParentPropertyName" placeholder="请选择" @change="bidsName(addList[0].fdProId, scope.row.fdContractTypeDivideParentPropertyName)"  clearable>
                  <el-option v-for="item in sectionList" :key="item.value" :label="item.label"  :value="item.value +','+ item.label">
                    <span style="float: left">{{ item.label}}</span>
                  </el-option>
                </el-select>
              </template>
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
              width="150">
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
              width="150">
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
                    <el-date-picker  size="mini" v-model="scope.row.fdCfbAppointTimeStartworking"  type="date" format="yyyy/MM/dd" value-format="yyyy-MM-dd" :picker-options="pickerBeginDateBefore" @change="Deviation()"   placeholder="选择日期"></el-date-picker>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="fdCfbAppointTimeEndworking"
                  label="完工/离场"
                  align="center"
                  width="155">
                  <template slot-scope="scope">
                    <el-date-picker  size="mini" v-model="scope.row.fdCfbAppointTimeEndworking"  type="date" format="yyyy/MM/dd" value-format="yyyy-MM-dd"  :picker-options="pickerBeginDateAfter" @change="Deviation()"   placeholder="选择日期"></el-date-picker>
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
                    <span class="white" :style="{background:colors}">
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
                    <span class="white" :style="{background:colord}">
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
                  <span class="white" :style="{background:Biascolors}">
                        {{scope.row.fdCfbApplyforBiasTime}}
                       <!-- {{count ? count : ''}} -->
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
                    <el-date-picker  size="mini" v-model="scope.row.fdSkillResourceHandinPlanTime"  type="date" format="yyyy/MM/dd" value-format="yyyy-MM-dd" :picker-options="pickerBeginDateBefore4" @change="Deviation()" placeholder="选择日期"></el-date-picker>
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
                  <span class="white" :style="{background:Handcolors}">
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
                    <el-date-picker  size="mini" v-model="scope.row.fdProRepertoireHandinPlanTime"  type="date" format="yyyy/MM/dd" value-format="yyyy-MM-dd" :picker-options="pickerBeginDateBefore5" @change="Deviation()" placeholder="选择日期"></el-date-picker>
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
                  <span class="white" :style="{background:Repertcolors}">
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
                  <span class="white" :style="{background:Markcolors}">
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
                    <el-date-picker  size="mini" v-model="scope.row.fdStartMarkPlanTime"  type="date" format="yyyy/MM/dd" value-format="yyyy-MM-dd" :picker-options="pickerBeginDateBefore7" @change="Deviation()"  placeholder="选择日期"></el-date-picker>
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
                  <span class="white" :style="{background:StartMarkcolors}">
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
                  <span class="white" :style="{background:fixcolors}">
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
                      <span class="btn btn-primary mr10 btn-sm pointer" @click="uploadSure(scope.row.fdProId, addList[0].fdContractTypeDivideParentPropertyName.split(',')[0])" >上传</span>
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
                      <span class="btn btn-primary mr10 btn-sm pointer" @click="uploadAcc(scope.row.fdProId, addList[0].fdContractTypeDivideParentPropertyName.split(',')[0])" >上传</span>
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
                      <span class="btn btn-primary mr10 btn-sm pointer" @click="uploadResource(scope.row.fdProId, addList[0].fdContractTypeDivideParentPropertyName.split(',')[0])" >上传</span>
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
                <template slot-scope="scope"><el-input size="mini" v-model.number="scope.row.fdWinthebiddingMoney" @change="checkNo(scope.row.fdWinthebiddingMoney)" maxlength="10"    clearable></el-input></template>
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
                <template slot-scope="scope"><el-input size="mini"  v-model.number="scope.row.fdUserPhone" @change="checkTel(scope.row.fdUserPhone)" maxlength="11"  clearable></el-input></template>
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
              prop=""
              label="SAP采购订单号"
              align="center"
              :show-overflow-tooltip="true"
              width="120">
              <template slot-scope="scope">
                  <div v-for="(item, index) in moneyList" :key="index">
                    <el-input size="mini" v-model="item.fdPurchaseOrderNumber" clearable></el-input>
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
                prop=""
                label=""
                align="center"
                :show-overflow-tooltip="true"
                width="130">
                <template slot-scope="scope">
                  <div v-for="(item, index) in moneyList" :key="index">
                    <el-select v-model="item.fdProLocation" size="mini" placeholder="请选择区域"   clearable>
                      <el-option v-for="item in projectList" :key="item.value" :label="item.label"  :value="item.value"> <span style="float: left">{{ item.value}}</span></el-option>
                    </el-select>
                  </div> 
                </template>
              </el-table-column>
              <el-table-column
                prop=""
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
                prop=""
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
                prop=""
                label=""
                align="center"
                :show-overflow-tooltip="true"
                width="155">
                <template slot-scope="scope">
                  <div v-for="(item, index) in moneyList" :key="index">
                    <el-date-picker v-model="item.fdSignAContractate" type="year" format="yyyy 年" value-format="yyyy" size="mini"  placeholder="选择年" ></el-date-picker>
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                prop=""
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
              prop=""
              label="合同名称"
              align="center"
              width="200">
              <template slot-scope="scope">
                  <div v-for="(item, index) in moneyList" :key="index" class="contracts">
                    <el-input class="inputs" size="mini"  v-model="item.fdContractName" clearable></el-input>
                    <span v-if="index == 0" class="addtab" @click="addTables(index)"><img src="../common/img/add.png"></span>
                    <span v-else class="addtab" @click="delTables(index)"><img src="../common/img/remove.png"></span>
                  </div>    
              </template>
            </el-table-column>
            <el-table-column
              prop=""
              label="合同金额"
              align="center"
              width="150">
              <template slot-scope="scope">
                  <div v-for="(item, index) in moneyList" :key="index">
                    <el-input size="mini" v-model.number="item.fdContractMoney" @change="checkNo(item.fdContractMoney)" maxlength="10" clearable></el-input>
                  </div> 
              </template>
            </el-table-column>
            <el-table-column
              prop=""
              label="oa评审发起时间"
              align="center"
              width="155">
              <template slot-scope="scope">
                  <div v-for="(item, index) in moneyList" :key="index">
                      <el-date-picker  size="mini" v-model="item.fdOAReviewStartTime"  type="date" format="yyyy/MM/dd" value-format="yyyy-MM-dd"  placeholder="选择日期"></el-date-picker>
                  </div>   
              </template>
            </el-table-column>
            <el-table-column
              prop=""
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
              prop=""
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
              prop=""
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
              prop=""
              label="合同相对人"
              align="center"
              :show-overflow-tooltip="true"
              width="120">
               <template slot-scope="scope">
                 <div v-for="(item, index) in moneyList" :key="index">
                    <el-input size="mini" v-model="item.fdContractCorrespondingPerson"  clearable></el-input>
                 </div>
               </template>
            </el-table-column>
            <el-table-column
              prop=""
              label="付款条件"
              align="center"
              :show-overflow-tooltip="true"
              width="120">
               <template slot-scope="scope">
                 <div v-for="(item, index) in moneyList" :key="index">
                    <el-input size="mini" v-model="item.fdContractPaymentClause" clearable></el-input>
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
                  <el-input size="mini" v-model.number="scope.row.fdContractTotalManey" @change="checkNo(scope.row.fdContractTotalManey)" maxlength="10" clearable></el-input>
               </template>
            </el-table-column>
            <el-table-column
              prop="fdContractDeposit"
              label="质保金"
              align="center"
              :show-overflow-tooltip="true"
              width="150">
               <template slot-scope="scope"><el-input size="mini" v-model.number="scope.row.fdContractDeposit" @change="checkNo(scope.row.fdContractDeposit)" maxlength="10" clearable></el-input></template>
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
                prop=""
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
                <template slot-scope="scope">
                </template>
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
              prop=""
              label="累积已付款金额"
              align="center"
              :show-overflow-tooltip="true"
              width="150">
            </el-table-column>
            <el-table-column
              prop=""
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
              <template slot-scope="scope"><el-input size="mini" v-model.number="scope.row.fdContractExcuteAddupMoaiManey" @change="checkNo(scope.row.fdContractExcuteAddupMoaiManey)" maxlength="11" clearable ></el-input></template>
            </el-table-column>
            <el-table-column
              prop="fdContractExcuteNotPayment"
              label="未付金额"
              align="center"
              :show-overflow-tooltip="true"
              width="150">
              <template slot-scope="scope"><el-input size="mini" v-model.number="scope.row.fdContractExcuteNotPayment" @change="checkNo(scope.row.fdContractExcuteNotPayment)" maxlength="11" clearable ></el-input></template>
            </el-table-column>
            <el-table-column
              prop="fdContractExcuteStayMoaiManey"
              label="待开票金额"
              align="center"
              :show-overflow-tooltip="true"
              width="150">
              <template slot-scope="scope"><el-input size="mini" v-model.number="scope.row.fdContractExcuteStayMoaiManey" @change="checkNo(scope.row.fdContractExcuteStayMoaiManey)" maxlength="11" clearable ></el-input></template>
            </el-table-column>
            <el-table-column
              prop=""
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
        <el-button type="primary" size="medium" @click="Addsaves()">保存</el-button>
        <el-button type="primary" size="medium" @click="Addcancels()">取消</el-button>
      </div>
    </div>

    <!-- 所有查看详情弹框 -->
    <div>
      <add-tender v-if="modelFlag.showModel"></add-tender>
    </div>
  </div>
</template>

<script>
import Tendering from './dialogs/tendering'  // 弹框(可编辑)
export default {
  name: 'contract',
  components:{
    'add-tender': Tendering,
  },
  computed:{
    // 招标申请的偏差时间
    count() {
      // if(this.addList[0].fdCfbApplyforPlanTime && this.addList[0].fdCfbApplyforRealityTime){
      //   let a = new Date(this.addList[0].fdCfbApplyforPlanTime.replace(/-/g, "/"));
      //   let b = new Date(this.addList[0].fdCfbApplyforRealityTime.replace(/-/g, "/"));
      //   let days = b.getTime() - a.getTime();
      //   let time = parseInt(days / (1000 * 60 * 60 * 24));
      //   if(time < 0) {
      //     this.Biascolors = 'skyblue';
      //     return '提前' + Math.abs(time) + '天';
      //   }else if(time > 0) {
      //     this.Biascolors = 'red';
      //     return '滞后' + time + '天';
      //   }else{
      //     this.Biascolors = 'green';
      //     return '正常';
      //   }
      // }
    }

  },
  data() {
    let that=this;
    return {
      msg: '',
      userSearchLoading: false,  // 项目名称加载
      Loadings: false, // loading加载
      total: 0,
      pagesize: 7,
      currentPage: 1,
      colord: 'red',
      colors: 'red',
      Biascolors: 'red',
      Handcolors: 'red',
      Repertcolors: 'red',
      Markcolors: 'red',
      StartMarkcolors: 'red',
      fixcolors: 'red',
      textMsg: '暂无数据',
      contractHeight:0,
      monthData:{ 
        oneplan1:'',
        oneplan2:'',
        oneplan3:'',
        oneplan4:'',
        oneplan5:'',
        oneplan6:'',
        oneplan7:'',
        oneplan8:'',
        oneplan9:'',
        oneplan10:'',
        oneplan11:'',
        oneplan12:'',
        acts1:'',
        acts2:'',
        acts3:'',
        acts4:'',
        acts5:'',
        acts5:'',
        acts6:'',
        acts7:'',
        acts8:'',
        acts9:'',
        acts10:'',
        acts11:'',
        acts12:'',
        mons1: '',
        mons2: '',
        mons3: '',
        mons4: '',
        mons5: '',
        mons6: '',
        mons7: '',
        mons8: '',
        mons9: '',
        mons10: '',
        mons11: '',
        mons12: '',
      },
      modelFlag: { // 弹框信息
        title: '',
        showModel: false,
        type: '',
        con1: '',  // 招标范围
        con2: '',  // 本周进展
        con3: '',  // 履约分析
        con4: '',  // 备注
      },
      moneyList: [  // 添加单元格 数据
        {
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
          fdContractPaymentClause: '',  // 付款条件
        }
      ],
      addList: [
        {
          fdProId: '', // 项目id
          fdName: '', // 项目名称
          fdEngineeringArea: '', // 所属工程大区
          fdProCapacity: '', // 项目容量
          fdPackageModel: '', // 承发包模式
          Project: '', // 项目经理
          fdContractTypeDivideTotalPropertyName: '', // 类别划分
          fdContractTypeDivideParentPropertyName: '', // 标段名称
          fdSectionNameChildidProperty: '', // 招标范围
          fdContractManager: '',  // 合同经理
          fdForMiningEngineer: '', // 招采工程师
          Factur: '', // 造价工程师
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
          fdStartMarkBiasTime: '', // 开标 偏差时间
          fdTofixMarkPlanTime: '', // 定标 计划时间
          fdTofixMarkRealityTime: '',  // 定标 实际时间
          fdTofixMarkBiasTime: '', // 定标  偏差时间
          fdResourceFortherecordSite: '', // 资料备案所在地
          fdCfbResourceAccessory: '', // 招标资料
          fdBidResourceAccessory: '', // 投标资料
          fdTofixMarkResourceAccessory: '', // 定标资料
          fdSendWinthebiddingInformtime: '', // 发出中标通知书时间
          fdWinthebiddingMoney: '', // 中标金额（元）
          fdWinthebiddingUnit: '', // 中标单位
          fdWinthebiddingUser: '', // 中标单位联系人
          fdUserPhone: '', // 联系方式
          fdThisweekEvolve: '', // 本周进展
          fdContractDeposit: '',  // 质保金
          fdContractQualityDate: '', // 质量保证期
          fdContractExecuteCondition: '',  // 合同执行状态
          fdContractAgreementAnalyze: '', // 履约分析
          fdContractExcuteAddupPayment: '',  // 累积已付款金额
          fdContractExcuteAddupMoaiManey: '', // 累积开票金额
          fdContractExcuteNotPayment: '',  // 未付金额
          fdContractExcuteStayMoaiManey: '', // 待开票金额
          fdContractExcuteRemark: '', // 备注
        }
      ],
      fdnameList: [],  // 项目名称列表
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
      projectList: [ // 项目列表
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
      cateList: [], // 类别划分
      sectionList: [],  // 标段名称
      opening2: '',
      inform: '',
      Tendetails: '',  // 招标范围查看详情
      // 上传文件定义
      fileList1: [], // 招标资料上传的文件
      fileList2: [], // 投标资料上传的文件
      fileList3: [], // 定标资料上传的文件
      remotelist: [],
      states: [],  // 存储所有项目名称及项目基本信息
      itemID: '',  // 项目id
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
        //     if(that.tableData.time2){
        //       return time.getTime() > Date.now() || time.getTime() > new Date(that.tableData.time2).getTime();
        //     }else{
        //       return time.getTime() > Date.now();
        //     }
        // }
      },
      pickerBeginDateAfter:{
          // disabledDate(time) {
          //   if(that.tableData.time1){
          //     var newtime=time.getFullYear()+"-"+((time.getMonth()+1)<10?("0"+(time.getMonth()+1)):(time.getMonth()+1))+'-'+time.getDate();
          //     if(that.tableData.time1===newtime){
          //       return false;
          //     }
          //     return time.getTime() > Date.now() || time.getTime() < new Date(that.tableData.time1).getTime();
          //   }else{
          //     return time.getTime() > Date.now();
          //   }
          // }
      },
      pickerBeginDateBefore1:{
        // disabledDate(time) {
        //     if(that.tableData.file2){
        //       return time.getTime() > Date.now() || time.getTime() > new Date(that.tableData.file2).getTime();
        //     }else{
        //       return time.getTime() > Date.now();
        //     }
        // }
      },
      pickerBeginDateAfter1:{
          // disabledDate(time) {
          //   if(that.tableData.file1){
          //     var newtime=time.getFullYear()+"-"+((time.getMonth()+1)<10?("0"+(time.getMonth()+1)):(time.getMonth()+1))+'-'+time.getDate();
          //     if(that.tableData.file1===newtime){
          //       return false;
          //     }
          //     return time.getTime() > Date.now() || time.getTime() < new Date(that.tableData.file1).getTime();
          //   }else{
          //     return time.getTime() > Date.now();
          //   }
          // }
      },
      pickerBeginDateBefore2:{
        // disabledDate(time) {
        //     if(that.tableData.shi2){
        //       return time.getTime() > Date.now() || time.getTime() > new Date(that.tableData.shi2).getTime();
        //     }else{
        //       return time.getTime() > Date.now();
        //     }
        // }
      },
      pickerBeginDateAfter2:{
          // disabledDate(time) {
          //   if(that.tableData.shi1){
          //     var newtime=time.getFullYear()+"-"+((time.getMonth()+1)<10?("0"+(time.getMonth()+1)):(time.getMonth()+1))+'-'+time.getDate();
          //     if(that.tableData.shi1===newtime){
          //       return false;
          //     }
          //     return time.getTime() > Date.now() || time.getTime() < new Date(that.tableData.shi1).getTime();
          //   }else{
          //     return time.getTime() > Date.now();
          //   }
          // }
      },
      pickerBeginDateBefore3:{
        // disabledDate(time) {
        //     if(that.tableData.shen2){
        //       return time.getTime() > Date.now() || time.getTime() > new Date(that.tableData.shen2).getTime();
        //     }else{
        //       return time.getTime() > Date.now();
        //     }
        // }
      },
      pickerBeginDateAfter3:{
          // disabledDate(time) {
          //   if(that.tableData.shen1){
          //     var newtime=time.getFullYear()+"-"+((time.getMonth()+1)<10?("0"+(time.getMonth()+1)):(time.getMonth()+1))+'-'+time.getDate();
          //     if(that.tableData.shen1===newtime){
          //       return false;
          //     }
          //     return time.getTime() > Date.now() || time.getTime() < new Date(that.tableData.shen1).getTime();
          //   }else{
          //     return time.getTime() > Date.now();
          //   }
          // }
      },
      pickerBeginDateBefore4:{
        // disabledDate(time) {
        //     if(that.tableData.ziliao2){
        //       return time.getTime() > Date.now() || time.getTime() > new Date(that.tableData.ziliao2).getTime();
        //     }else{
        //       return time.getTime() > Date.now();
        //     }
        // }
      },
      pickerBeginDateAfter4:{
          // disabledDate(time) {
          //   if(that.tableData.fdSkillResourceHandinPlanTime){
          //     var newtime=time.getFullYear()+"-"+((time.getMonth()+1)<10?("0"+(time.getMonth()+1)):(time.getMonth()+1))+'-'+time.getDate();
          //     if(that.tableData.fdSkillResourceHandinPlanTime===newtime){
          //       return false;
          //     }
          //     return time.getTime() > Date.now() || time.getTime() < new Date(that.tableData.fdSkillResourceHandinPlanTime).getTime();
          //   }else{
          //     return time.getTime() > Date.now();
          //   }
          // }
      },
      pickerBeginDateBefore5:{
        // disabledDate(time) {
        //     if(that.tableData.list2){
        //       return time.getTime() > Date.now() || time.getTime() > new Date(that.tableData.list2).getTime();
        //     }else{
        //       return time.getTime() > Date.now();
        //     }
        // }
      },
      pickerBeginDateAfter5:{
          // disabledDate(time) {
          //   if(that.tableData.list1){
          //     var newtime=time.getFullYear()+"-"+((time.getMonth()+1)<10?("0"+(time.getMonth()+1)):(time.getMonth()+1))+'-'+time.getDate();
          //     if(that.tableData.list1===newtime){
          //       return false;
          //     }
          //     return time.getTime() > Date.now() || time.getTime() < new Date(that.tableData.list1).getTime();
          //   }else{
          //     return time.getTime() > Date.now();
          //   }
          // }
      },
      pickerBeginDateBefore6:{
        // disabledDate(time) {
        //     if(that.tableData.fa2){
        //       return time.getTime() > Date.now() || time.getTime() > new Date(that.tableData.fa2).getTime();
        //     }else{
        //       return time.getTime() > Date.now();
        //     }
        // }
      },
      pickerBeginDateAfter6:{
          // disabledDate(time) {
          //   if(that.tableData.fa1){
          //     var newtime=time.getFullYear()+"-"+((time.getMonth()+1)<10?("0"+(time.getMonth()+1)):(time.getMonth()+1))+'-'+time.getDate();
          //     if(that.tableData.fa1===newtime){
          //       return false;
          //     }
          //     return time.getTime() > Date.now() || time.getTime() < new Date(that.tableData.fa1).getTime();
          //   }else{
          //     return time.getTime() > Date.now();
          //   }
          // }
      },
      pickerBeginDateBefore7:{
        // disabledDate(time) {
        //     if(that.tableData.kai2){
        //       return time.getTime() > Date.now() || time.getTime() > new Date(that.tableData.kai2).getTime();
        //     }else{
        //       return time.getTime() > Date.now();
        //     }
        // }
      },
      pickerBeginDateAfter7:{
          // disabledDate(time) {
          //   if(that.tableData.kai1){
          //     var newtime=time.getFullYear()+"-"+((time.getMonth()+1)<10?("0"+(time.getMonth()+1)):(time.getMonth()+1))+'-'+time.getDate();
          //     if(that.tableData.kai1===newtime){
          //       return false;
          //     }
          //     return time.getTime() > Date.now() || time.getTime() < new Date(that.tableData.kai1).getTime();
          //   }else{
          //     return time.getTime() > Date.now();
          //   }
          // }
      },
      pickerBeginDateBefore8:{
        // disabledDate(time) {
        //     if(that.tableData.calibration2){
        //       return time.getTime() > Date.now() || time.getTime() > new Date(that.tableData.calibration2).getTime();
        //     }else{
        //       return time.getTime() > Date.now();
        //     }
        // }
      },
      pickerBeginDateAfter8:{
          // disabledDate(time) {
          //   if(that.tableData.calibration1){
          //     var newtime=time.getFullYear()+"-"+((time.getMonth()+1)<10?("0"+(time.getMonth()+1)):(time.getMonth()+1))+'-'+time.getDate();
          //     if(that.tableData.calibration1===newtime){
          //       return false;
          //     }
          //     return time.getTime() > Date.now() || time.getTime() < new Date(that.tableData.calibration1).getTime();
          //   }else{
          //     return time.getTime() > Date.now();
          //   }
          // }
      }
    }
  },
  created() {
    this.remoteName();
  },
  mounted() {
    this.contractHeight = document.getElementById("contractinfo").offsetHeight - 100;
  },
  methods:{
    // 项目名称搜索列表
    remoteName() {
      this.$http.post('/engineer/businessContract/getAllProContractInfo', {
          pageNum: 7,
          pageSize: 1,
          splitPage: false
      })
      .then(res => {
        //  console.log(res);
        // 类别划分
         res.data.data.typeList.forEach((item)  => {
            let obj = {
              value: '',
              label: ''
            }
            obj.value = item.fdContractTypeDivideParent;
            obj.label = item.fdContractTypeDivideTotalPropertyName;
            this.cateList.push(obj);
         });
         this.states = res.data.data.proContractInfoList;
         this.fdnameList = this.states.map(item => {
           return { value: item.fdProId, label: item.fdName };
         });
        //  console.log(this.fdnameList);
       })
      .catch(err => {
        this.userSearchLoading = false;
      })
    },
    // 项目名称远程搜索
    // remoteMethod(query) {
    //   if (query !== '') {
    //     this.userSearchLoading = true;
    //     setTimeout(() => {
    //       this.userSearchLoading = false;
    //       this.fdnameList = this.remotelist.filter(item => {
    //         return item.label.indexOf(query) > -1;
    //       });
    //     }, 400);
      
    //   }else{
    //     this.fdnameList = [];
    //   }
    // },
    nameChange(){
      for(var i=0; i<this.states.length; i++) {
        if(this.addList[0].fdName == this.states[i].fdName){
          // 所属工程大区
          if(this.states[i].fdEngineeringArea == 1) {
            this.addList[0].fdEngineeringArea = '工程一区';
          }else if(this.states[i].fdEngineeringArea == 2) {
            this.addList[0].fdEngineeringArea = '工程二区';
          }else if(this.states[i].fdEngineeringArea == 3) {
            this.addList[0].fdEngineeringArea = '工程三区';
          }else if(this.states[i].fdEngineeringArea == 4) {
            this.addList[0].fdEngineeringArea = '工程四区';
          }
          this.addList[0].fdProCapacity = this.states[i].fdProCapacity;  // 项目容量
          // 承发包模式
          if(this.states[i].fdPackageModel == 1) {
            this.addList[0].fdPackageModel = '合资合作';
          }else if(this.states[i].fdPackageModel == 2) {
            this.addList[0].fdPackageModel = '平行发包';
          }else if(this.states[i].fdPackageModel == 3) {
            this.addList[0].fdPackageModel = 'PC总承包';
          }else if(this.states[i].fdPackageModel == 4) {
            this.addList[0].fdPackageModel = 'EPC总承包';
          }else if(this.states[i].fdPackageModel == 5) {
            this.addList[0].fdPackageModel = '施工总承包';
          }
          this.addList[0].fdPostName = this.states[i].fdPostName; // 项目经理
          // this.states[i].proManegerList.forEach((item) => {
          //   if(item.fdGropPost == 9){
          //     this.addList[0].fdPostName = item.fdPostName; // 项目经理
          //   }
          // })
          this.addList[0].fdProId = this.states[i].fdProId;  // 项目id
        }
      }
    },
    // 保存
    Addsaves() {
      var _this = this;
      // 所属工程大区
      if(_this.addList[0].fdEngineeringArea == '工程一区') {
        _this.addList[0].fdEngineeringArea = 1;
      }else if(_this.addList[0].fdEngineeringArea == '工程二区') {
        _this.addList[0].fdEngineeringArea = 2;
      }else if(_this.addList[0].fdEngineeringArea == '工程三区') {
        _this.addList[0].fdEngineeringArea = 3;
      }else if(_this.addList[0].fdEngineeringArea == '工程四区') {
        _this.addList[0].fdEngineeringArea = 4;
      }
      // 承发包模式
      if(_this.addList[0].fdPackageModel == '合资合作') {
        _this.addList[0].fdPackageModel = 1;
      }else if(_this.addList[0].fdPackageModel == '平行发包') {
        _this.addList[0].fdPackageModel = 2;
      }else if(_this.addList[0].fdPackageModel == 'PC总承包') {
        _this.addList[0].fdPackageModel = 3;
      }else if(_this.addList[0].fdPackageModel == 'EPC总承包') {
        _this.addList[0].fdPackageModel = 4;
      }else if(_this.addList[0].fdPackageModel == '施工总承包') {
        _this.addList[0].fdPackageModel = 5;
      }

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
      var named = _this.addList[0].fdContractTypeDivideParentPropertyName.split(',')[1]; // 标段名称
      let params ={
        fdProId: _this.addList[0].fdProId,
        fdSectionNameChildId: _this.addList[0].fdContractTypeDivideParentPropertyName.split(',')[0], // 标段id
        fdContractTypeDivideParentPropertyName: named, // 标段名称
        fdName: _this.addList[0].fdName,  // 项目名称
        fdEngineeringArea: _this.addList[0].fdEngineeringArea,  // 所属工程大区
        fdProCapacity: _this.addList[0].fdProCapacity,  // 项目容量
        fdPackageModel: _this.addList[0].fdPackageModel,  // 承发包模式
        fdPostName: _this.addList[0].fdPostName,  // 项目经理
        fdContractTypeDivideTotalPropertyName: _this.addList[0].fdContractTypeDivideTotalPropertyName.split(',')[1],  // 类别划分
        fdSectionNameChildidProperty: _this.modelFlag.con1,  // 招标范围
        fdContractManager: _this.addList[0].fdContractManager,  // 合同经理
        fdForMiningEngineer: _this.addList[0].fdForMiningEngineer,   // 招采工程师
        fdCostEngineer: _this.addList[0].fdCostEngineer,  // 造价工程师
        fdPurchaseWay: _this.addList[0].fdPurchaseWay,  // 采购方式
        fdCfbAgencyInstitution: _this.addList[0].fdCfbAgencyInstitution,  // 招标代理机构
        fdCfbAppointTimeStartworking: _this.addList[0].fdCfbAppointTimeStartworking, // 招标计划约定时间 开工/进场
        fdCfbAppointTimeEndworking: _this.addList[0].fdCfbAppointTimeEndworking,  // 招标计划约定时间  完工/离场
        fdCfbFileAppointTimeStartworking: _this.addList[0].fdCfbFileAppointTimeStartworking,   // 招标文件约定时间 开工/进场
        fdCfbFileAppointTimeEndworking: _this.addList[0].fdCfbFileAppointTimeEndworking,   // 招标文件约定时间  完工/离场
        fdSiteRoadworkStartworking: _this.addList[0].fdSiteRoadworkStartworking,  // 现场施工时间  开工/进场
        fdSiteRoadworkEndworking: _this.addList[0].fdSiteRoadworkEndworking,  // 现场施工时间 完工/离场
        fdCfbPlanHandinPlanTime: _this.addList[0].fdCfbPlanHandinPlanTime,  // 招标计划提报 计划时间
        fdCfbApplyforPlanTime: _this.addList[0].fdCfbApplyforPlanTime,  // 招标申请 计划时间
        fdCfbApplyforRealityTime: _this.addList[0].fdCfbApplyforRealityTime,  // 招标申请  实际时间
        fdSkillResourceHandinPlanTime: _this.addList[0].fdSkillResourceHandinPlanTime,  // 技术资料提报 计划时间
        fdSkillResourceHandinRealityTime: _this.addList[0].fdSkillResourceHandinRealityTime,  // 技术资料提报  实际时间
        fdProRepertoireHandinPlanTime: _this.addList[0].fdProRepertoireHandinPlanTime,  // 工程量清单提报 计划时间
        fdProRepertoireHandinRealityTime: _this.addList[0].fdProRepertoireHandinRealityTime, // 工程量清单提报  实际时间
        fdLaunchMarkPlanTime: _this.addList[0].fdLaunchMarkPlanTime,  // 发标  计划时间
        fdLaunchMarkRealityTime: _this.addList[0].fdLaunchMarkRealityTime,  // 发标  实际时间
        fdStartMarkPlanTime: _this.addList[0].fdStartMarkPlanTime,  // 开标 计划时间
        fdStartMarkRealityTime: _this.addList[0].fdStartMarkRealityTime, // 开标 实际时间
        fdTofixMarkPlanTime: _this.addList[0].fdTofixMarkPlanTime,  // 定标  计划时间
        fdTofixMarkRealityTime: _this.addList[0].fdTofixMarkRealityTime,  // 定标  实际时间
        fdResourceFortherecordSite: _this.addList[0].fdResourceFortherecordSite,  // 资料备案所在地
        fdSendWinthebiddingInformtime: _this.addList[0].fdSendWinthebiddingInformtime,  // 发出中标通知书时间
        fdWinthebiddingMoney: _this.addList[0].fdWinthebiddingMoney,  // 中标金额（元）
        fdWinthebiddingUnit: _this.addList[0].fdWinthebiddingUnit,  // 中标单位
        fdWinthebiddingUser: _this.addList[0].fdWinthebiddingUser,  // 中标单位联系人
        fdUserPhone: _this.addList[0].fdUserPhone,  // 联系方式
        fdContractTotalManey: this.addList[0].fdContractTotalManey,  // 合同金额(总)
        fdContractDeposit: _this.addList[0].fdContractDeposit,  // 质保金
        fdContractQualityDate: _this.addList[0].fdContractQualityDate,  // 质量保证期
        // fdContractExcuteAddupPayment: _this.addList[0].payments,  // 累积已付款金额
        fdContractExcuteAddupMoaiManey: _this.addList[0].fdContractExcuteAddupMoaiManey,  // 累积开票金额
        fdContractExcuteNotPayment: _this.addList[0].fdContractExcuteNotPayment, // 未付金额
        fdContractExcuteStayMoaiManey: _this.addList[0].fdContractExcuteStayMoaiManey,  // 待开票金额
        fdContractExecuteCondition: this.addList[0].fdContractExecuteCondition,  // 合同执行状态
        moneyList: _this.moneyList,  // 添加单元格里  数据
        fdThisweekEvolve: _this.modelFlag.con2,  // 本周进展
        fdContractAgreementAnalyze: _this.modelFlag.con3,  // 履约分析
        fdContractExcuteRemark: _this.modelFlag.con4,  // 备注
        excuteList: _this.excuteList, // 1-12月份数据
      
      }
      // console.log(params)
      if(_this.addList[0].fdContractTypeDivideParentPropertyName == ""){
        this.$message('请选择类别划分和标段名称，再保存');
        return false;
      }
      this.$http.post('/engineer/businessContract/insertContractsMoneyInfo', params)
      .then(res => {
        // console.log(res);
        if(res.data.status == 200){
          this.$router.push({name: 'contracts'});
          this.$message('保存成功');
        }else if(res.data.status == 303){
          this.$message('此标段已存在，请重新选择');
        }else{
          this.$message('保存失败');
        }
      })
    },
    // 取消
    Addcancels() {
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
    // 标段名称
    cateGory(idx, con){
      this.sectionList = [];
      this.$http.post('/engineer/businessContract/queryContractTypeChild',{
          fdContractTypeDivideParent: con.split(',')[0],
          fdProId: idx
        })
      .then(res =>{
        // console.log(res.data.data);
        // 标段名称
        res.data.data.forEach((item)  => {
          let obj = {
            value: '',
            label: ''
          }
          obj.value = item.fdSectionNameChildId;
          obj.label = item.fdContractTypeDivideParentPropertyName;
          this.sectionList.push(obj);
        });
      })
    },
    // 三级联动 标段名称/招标范围
    bidsName(id, con) {
      this.$http.post('/engineer/businessContract/queryContractTypeChildProperty',{
        fdSectionNameChildId: con.split(',')[0],
        fdProId: id
      })
      .then(res =>{
        this.modelFlag.con1 = res.data.data.fdSectionNameChildidProperty;// 修改
      })
    },
    // 手机号验证
    checkTel(value){
      let reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
      if (value) {
        if (new RegExp(reg).test(value) == false) {
          setTimeout(() => {
            this.addList[0].fdUserPhone = '';  // 联系方式
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
      //       if(this.addList[0].fdWinthebiddingMoney){
      //         this.addList[0].fdWinthebiddingMoney = '';
      //         this.$message('请输入数值');
      //       }if(this.addList[0].fdContractTotalManey){
      //         this.addList[0].fdContractTotalManey = '';
      //         this.$message('请输入数值');
      //       }
      //     }, 200);
      //   }
      // }
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
    // 计算偏差时间
    Deviation() {
      // 招标计划偏差时间  开工/进场
      if(this.addList[0].fdCfbAppointTimeStartworking && this.addList[0].fdSiteRoadworkStartworking){
        let a = new Date(this.addList[0].fdCfbAppointTimeStartworking.replace(/-/g, "/"));
        let b = new Date(this.addList[0].fdSiteRoadworkStartworking.replace(/-/g, "/"));
        let days = b.getTime() - a.getTime();
        let time = parseInt(days / (1000 * 60 * 60 * 24));
        if(time < 0) {
          this.colors = 'skyblue';
          this.addList[0].fdCfbBiasTimeStartworking = '提前' + Math.abs(time) + '天';
        }else if(time > 0) {
          this.colors = 'red';
          this.addList[0].fdCfbBiasTimeStartworking = '滞后' + time + '天';
        }else{
          this.colors = 'green';
          this.addList[0].fdCfbBiasTimeStartworking = '正常';
        }
      }
      // 招标计划偏差时间  完工/离场
      if(this.addList[0].fdCfbAppointTimeEndworking && this.addList[0].fdSiteRoadworkEndworking){
        let a = new Date(this.addList[0].fdCfbAppointTimeEndworking.replace(/-/g, "/"));
        let b = new Date(this.addList[0].fdSiteRoadworkEndworking.replace(/-/g, "/"));
        let days = b.getTime() - a.getTime();
        let time = parseInt(days / (1000 * 60 * 60 * 24));
        if(time < 0) {
          this.colord = 'skyblue';
          this.addList[0].fdCfbBiasTimeEndworking = '提前' + Math.abs(time) + '天';
        }else if(time > 0) {
          this.colord = 'red';
          this.addList[0].fdCfbBiasTimeEndworking = '滞后' + time + '天';
        }else{
          this.colord = 'green';
          this.addList[0].fdCfbBiasTimeEndworking = '正常';
        }
      }
      // 招标申请偏差时间
      if(this.addList[0].fdCfbApplyforPlanTime && this.addList[0].fdCfbApplyforRealityTime){
        let a = new Date(this.addList[0].fdCfbApplyforPlanTime.replace(/-/g, "/"));
        let b = new Date(this.addList[0].fdCfbApplyforRealityTime.replace(/-/g, "/"));
        let days = b.getTime() - a.getTime();
        let time = parseInt(days / (1000 * 60 * 60 * 24));
        if(time < 0) {
          this.Biascolors = 'skyblue';
          this.addList[0].fdCfbApplyforBiasTime = '提前' + Math.abs(time) + '天';
        }else if(time > 0) {
          this.Biascolors = 'red';
          this.addList[0].fdCfbApplyforBiasTime = '滞后' + time + '天';
        }else{
          this.Biascolors = 'green';
          this.addList[0].fdCfbApplyforBiasTime = '正常';
        }
      }
      // 技术资料提报偏差时间
      if(this.addList[0].fdSkillResourceHandinPlanTime && this.addList[0].fdSkillResourceHandinRealityTime) {
        let a = new Date(this.addList[0].fdSkillResourceHandinPlanTime.replace(/-/g, "/"));
        let b = new Date(this.addList[0].fdSkillResourceHandinRealityTime.replace(/-/g, "/"));
        let days = b.getTime() - a.getTime();
        let time = parseInt(days / (1000 * 60 * 60 * 24));
        if(time < 0) {
          this.Handcolors = 'skyblue';
          this.addList[0].fdSkillResourceHandinBiasTime = '提前' + Math.abs(time) + '天';
        }else if(time > 0) {
          this.Handcolors = 'red';
          this.addList[0].fdSkillResourceHandinBiasTime = '滞后' + time + '天';
        }else{
          this.Handcolors = 'green';
          this.addList[0].fdSkillResourceHandinBiasTime = '正常';
        }
      }
      // 工程量清单偏差时间
      if(this.addList[0].fdProRepertoireHandinPlanTime && this.addList[0].fdProRepertoireHandinRealityTime) {
        let a = new Date(this.addList[0].fdProRepertoireHandinPlanTime.replace(/-/g, "/"));
        let b = new Date(this.addList[0].fdProRepertoireHandinRealityTime.replace(/-/g, "/"));
        let days = b.getTime() - a.getTime();
        let time = parseInt(days / (1000 * 60 * 60 * 24));
        if(time < 0) {
          this.Repertcolors = 'skyblue';
          this.addList[0].fdProRepertoireHandinBiasTime = '提前' + Math.abs(time) + '天';
        }else if(time > 0) {
          this.Repertcolors = 'red';
          this.addList[0].fdProRepertoireHandinBiasTime = '滞后' + time + '天';
        }else{
          this.Repertcolors = 'green';
          this.addList[0].fdProRepertoireHandinBiasTime = '正常';
        }
      }
      //发标偏差时间
      if(this.addList[0].fdLaunchMarkPlanTime && this.addList[0].fdLaunchMarkRealityTime) {
        let a = new Date(this.addList[0].fdLaunchMarkPlanTime.replace(/-/g, "/"));
        let b = new Date(this.addList[0].fdLaunchMarkRealityTime.replace(/-/g, "/"));
        let days = b.getTime() - a.getTime();
        let time = parseInt(days / (1000 * 60 * 60 * 24));
        if(time < 0) {
          this.Markcolors = 'skyblue';
          this.addList[0].fdLaunchMarkBiasTime = '提前' + Math.abs(time) + '天';
        }else if(time > 0) {
          this.Markcolors = 'red';
          this.addList[0].fdLaunchMarkBiasTime = '滞后' + time + '天';
        }else{
          this.Markcolors = 'green';
          this.addList[0].fdLaunchMarkBiasTime = '正常';
        }
      }
      //开标偏差时间
      if(this.addList[0].fdStartMarkPlanTime && this.addList[0].fdStartMarkRealityTime) {
        let a = new Date(this.addList[0].fdStartMarkPlanTime.replace(/-/g, "/"));
        let b = new Date(this.addList[0].fdStartMarkRealityTime.replace(/-/g, "/"));
        let days = b.getTime() - a.getTime();
        let time = parseInt(days / (1000 * 60 * 60 * 24));
        if(time < 0) {
          this.StartMarkcolors = 'skyblue';
          this.addList[0].fdStartMarkBiasTime = '提前' + Math.abs(time) + '天';
        }else if(time > 0) {
          this.StartMarkcolors = 'red';
          this.addList[0].fdStartMarkBiasTime = '滞后' + time + '天';
        }else{
          this.StartMarkcolors = 'green';
          this.addList[0].fdStartMarkBiasTime = '正常';
        }
      }
      //定标偏差时间
      if(this.addList[0].fdTofixMarkPlanTime && this.addList[0].fdTofixMarkRealityTime) {
        let a = new Date(this.addList[0].fdTofixMarkPlanTime.replace(/-/g, "/"));
        let b = new Date(this.addList[0].fdTofixMarkRealityTime.replace(/-/g, "/"));
        let days = b.getTime() - a.getTime();
        let time = parseInt(days / (1000 * 60 * 60 * 24));
        if(time < 0) {
          this.fixcolors = 'skyblue';
          this.addList[0].fdTofixMarkBiasTime = '提前' + Math.abs(time) + '天';
        }else if(time > 0) {
          this.fixcolors = 'red';
          this.addList[0].fdTofixMarkBiasTime = '滞后' + time + '天';
        }else{
          this.fixcolors = 'green';
          this.addList[0].fdTofixMarkBiasTime = '正常';
        }
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
    },
    // 招标资料上传
    uploadSure(index,  idx){
      var _this = this;
      if(index == "" && idx == ""){
        this.$message('请选择项目基本信息、类别划分和标段名称，再保存');
        return false;
      }
      let fd = new FormData();
      fd.append('file', document.getElementById("upfile").files[0]); //传文件
      fd.append('fdProId', index); //传项目id
      fd.append('fdSectionNameChildId', idx); //传标段id
      fd.append('fdFileType', 1); // 招标资料
      if(document.getElementById("upfile").files[0] == "" || document.getElementById("upfile").files[0] == undefined) return;
      this.$http.post('/engineer/businessContract/upload', fd).then((res) => {
        if(res.data.status == 200) {
          _this.$message('上传成功');
        }
      })
      return false;
    },
    // 投标资料上传
    uploadAcc(index,  idx){
      var _this = this;
      if(index == "" && idx == ""){
        this.$message('请选择项目基本信息、类别划分和标段名称，再保存');
        return false;
      }
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
      if(index == "" && idx == ""){
        this.$message('请选择项目基本信息、类别划分和标段名称，再保存');
        return false;
      }
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
