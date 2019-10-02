<template>
  <div>
    <!-- 模态框 -->
    <div class="dijitDialog" id="addMapModalDialog" v-bind:style="{top: modal_top+'px', left: modal_left+'px'}" style="width: 1100px; height: 509px; position: fixed; opacity: 1; z-index: 2000;background-color: #fff">
      <div v-if="progressMask" class="progressMask"><span class="maskInfo">正在请求数据...</span></div>
      <!-- title -->
      <div id="addMapdragbar" style="width: 1100px;border-bottom:0px;" class="dijitDialogTitleBar" >
        <span class="dijitDialogTitle">{{ title }}</span>
        <span>{{addform.names}}</span>
        <span @click="close('event','addform')"><img src="../img/dell.png" alt=""></span>
      </div>
      <!-- content -->
      <div class="dijitDialogPaneContent formCss" style="padding: 0px; width:1100px; height:414px;">
        <div style="width:1100px;height:435px; overflow-y:scroll;margin-top: 10px;">
            <el-form class="form" :model="addform" :inline="true" :disabled="!showDetailStatus" label-position="right"  ref="addform">

              <el-form-item label="项目名称:" :label-width="formLabelWidth">
                  <el-input class="headbos" :disabled="disab" v-model="addform.names" auto-complete="off" size="mini" placeholder="请输入"></el-input>
              </el-form-item>

              <el-form-item label="项目公司:" :label-width="formLabelWidth">
                <el-input class="headbos" :disabled="disab" v-model="addform.company" size="mini" auto-complete="off" placeholder="请输入"></el-input>
              </el-form-item>

              <el-form-item label="项目场址:" :label-width="formLabelWidth" class="city">
                 <el-cascader class="xmcz scity" :options="options" v-model="addform.citys" change-on-select size="mini" filterable></el-cascader>
              </el-form-item>

              <el-form-item :label-width="formLabelWidth" class="city">
              <el-tooltip :content="addform.country?addform.country:''" placement="top-start">
                <el-input class="burg" :disabled="disab" v-model="addform.country" auto-complete="off" placeholder="请输入" size="mini"></el-input>
                </el-tooltip>
              </el-form-item>

              <el-form-item label="进站回路:" :label-width="formLabelWidth" prop="homeloops">
                <el-select   :disabled="disab" v-model="addform.homeloops" clearable size="mini" placeholder="请选择">
                  <el-option v-for="item in homeloop" :key="item.value" :label="item.lable" :value="item.value"></el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="项目容量(MW):" :label-width="formLabelWidth">
                <el-input v-model="addform.capacity" auto-complete="off" placeholder="请输入" size="mini"></el-input>
              </el-form-item>

              <el-form-item label="所属公司:" :label-width="formLabelWidth">
                <el-select   :disabled="disab" v-model="addform.kaleidoscope" size="mini" placeholder="请选择">
                  <el-option v-for="item in subordinate" :key="item.value" :label="item.lable" :value="item.value"></el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="所属工程大区:" :label-width="formLabelWidth">
                <el-select  :disabled="disab" v-model="addform.region" placeholder="请选择" size="mini">
                  <el-option v-for="item in macrocell" :key="item.value" :label="item.lable" :value="item.value"></el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="项目类型:" :label-width="formLabelWidth">
                <el-select :disabled="disab" v-model="addform.genre" placeholder="请选择" size="mini">
                  <el-option v-for="item in mold" :key="item.value" :label="item.lable" :value="item.value"></el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="承发包模式:" :label-width="formLabelWidth">
                <el-select :disabled="disab" v-model="addform.pattern" placeholder="请选择" size="mini">
                  <el-option v-for="item in contracting" :key="item.value" :label="item.lable" :value="item.value"></el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="建设状态:" :label-width="formLabelWidth">
                <el-select v-model="addform.status" placeholder="请选择" size="mini">
                  <el-option v-for="item in construction"  :key="item.value" :label="item.lable" :value="item.value"></el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="项目类别:" :label-width="formLabelWidth">
                <el-select v-model="addform.sort" placeholder="请选择" size="mini">
                  <el-option v-for="item in classification" :key="item.value" :label="item.lable" :value="item.value"></el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="项目地形:" :label-width="formLabelWidth">
                <el-select :disabled="disab" v-model="addform.terrain" placeholder="请选择" size="mini">
                  <el-option v-for="item in projectterrain" :key="item.value" :label="item.lable" :value="item.value"></el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="风资源区域:" :label-width="formLabelWidth">
                <el-select :disabled="disab" v-model="addform.resource" placeholder="请选择" size="mini">
                  <el-option v-for="item in resourcearea" :key="item.value" :label="item.lable" :value="item.value"></el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="升压站电压等级:" :label-width="formLabelWidth">
                <el-select :disabled="disab" v-model="addform.voltage" placeholder="请选择" size="mini">
                  <el-option v-for="item in voltageclasses" :key="item.value" :label="item.lable" :value="item.value"></el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="升压站建筑面积(㎡):" :label-width="formLabelWidth">
                <el-input :disabled="disab" v-model="addform.structure" auto-complete="off" placeholder="请输入" size="mini"></el-input>
              </el-form-item>

              <el-form-item label="升压站经度:" :label-width="formLabelWidth">
                <el-tooltip :content="addform.longitude?addform.longitude:''" placement="top-end">
                <el-input :disabled="disab" v-model="addform.longitude" auto-complete="off" placeholder="请输入" size="mini"></el-input>
                </el-tooltip>
              </el-form-item>

               <el-form-item label="升压站纬度:" :label-width="formLabelWidth">
                 <el-tooltip :content="addform.latitude?addform.latitude:''" placement="top-end">
                <el-input :disabled="disab" v-model="addform.latitude" auto-complete="off" placeholder="请输入" size="mini"></el-input>
                </el-tooltip>
              </el-form-item>

              <el-form-item label="进场道路长度(KM):" :label-width="formLabelWidth">
                <el-input :disabled="disab" v-model="addform.enterthearena" auto-complete="off" placeholder="请输入" size="mini"></el-input>
              </el-form-item>

              <el-form-item label="是否需要爆破:" :label-width="formLabelWidth">
                <el-select :disabled="disab" v-model="addform.explode" placeholder="请选择" size="mini">
                  <el-option v-for="item in blasting" :key="item.value" :label="item.lable" :value="item.value"></el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="主变容量(MVA):" :label-width="formLabelWidth">
                <el-select :disabled="disab" v-model="addform.transformer" placeholder="请选择" size="mini">
                  <el-option v-for="item in maintransformer" :key="item.value" :label="item.lable" :value="item.value"></el-option>
                </el-select>
              </el-form-item>

               <el-form-item label="箱变容量(kVA):" :label-width="formLabelWidth">
                <el-select :disabled="disab" v-model="addform.substation" placeholder="请选择" size="mini">
                  <el-option v-for="item in boxtype" :key="item.value" :label="item.lable" :value="item.value"></el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="送出线路长度(KM):" :label-width="formLabelWidth">
                <el-input :disabled="disab" v-model="addform.sendout" auto-complete="off" placeholder="请输入" size="mini"></el-input>
              </el-form-item>

              <el-form-item label="建设主体:" :label-width="formLabelWidth">
                <el-select :disabled="disab" v-model="addform.mainbody" placeholder="请选择" size="mini">
                  <el-option v-for="item in constructionmainbody" :key="item.value" :label="item.lable" :value="item.value"></el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="是否跨越:" :label-width="formLabelWidth">
                <el-select :disabled="disab" v-model="addform.domain" placeholder="请选择" size="mini">
                  <el-option v-for="item in  crossdomain" :key="item.value" :label="item.lable" :value="item.value"></el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="接入方式:" :label-width="formLabelWidth">
                <el-select :disabled="disab" v-model="addform.inter" placeholder="请选择" size="mini">
                  <el-option v-for="item in interventions" :key="item.value" :label="item.lable" :value="item.value"></el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="集电线路长度(KM):" :label-width="formLabelWidth">
                <el-input :disabled="disab" v-model="addform.currentcollection" auto-complete="off" placeholder="请输入" size="mini"></el-input>
              </el-form-item>

              <el-form-item label="设计类型:" :label-width="formLabelWidth">
                <el-select v-model="addform.design" placeholder="请选择" size="mini">
                  <el-option v-for="item in designtyle" :key="item.value" :label="item.lable" :value="item.value"></el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="导线回路:" :label-width="formLabelWidth">
                <el-select :disabled="disab" v-model="addform.bribe" placeholder="请选择" size="mini">
                  <el-option v-for="item in lineabribe" :key="item.value" :label="item.lable" :value="item.value"></el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="电缆材质:" :label-width="formLabelWidth">
                <el-select v-model="addform.material" placeholder="请选择" size="mini">
                  <el-option v-for="item in cablematerial" :key="item.value" :label="item.lable" :value="item.value"></el-option>
                </el-select>
              </el-form-item>

              <div v-if="showDetailStatus">

                  <el-form-item label="建安费总价(万元):" :label-width="formLabelWidth">
                    <el-input v-model="addform.takeafee" auto-complete="off" placeholder="请输入" size="mini"></el-input>
                  </el-form-item>

                  <el-form-item label="交通工程(万元):" :label-width="formLabelWidth">
                    <el-input v-model="addform.engineering" auto-complete="off" placeholder="请输入" size="mini"></el-input>
                  </el-form-item>

                  <el-form-item label="集电线路(万元):" :label-width="formLabelWidth">
                    <el-input v-model="addform.electrical" auto-complete="off" placeholder="请输入" size="mini"></el-input>
                  </el-form-item>

                  <el-form-item label="风机基础(万元):" :label-width="formLabelWidth">
                    <el-input v-model="addform.thefanbase" auto-complete="off" placeholder="请输入" size="mini"></el-input>
                  </el-form-item>

                  <el-form-item label="升压站(万元):" :label-width="formLabelWidth">
                    <el-input v-model="addform.station" auto-complete="off" placeholder="请输入" size="mini"></el-input>
                  </el-form-item>

                  <el-form-item label="风机安装(万元):" :label-width="formLabelWidth">
                    <el-input v-model="addform.thefaninstallation" auto-complete="off" placeholder="请输入" size="mini"></el-input>
                  </el-form-item>

                  <el-form-item label="送出线路(万元):" :label-width="formLabelWidth">
                    <el-input v-model="addform.sendoutline" auto-complete="off" placeholder="请输入" size="mini"></el-input>
                  </el-form-item>
              </div>
                    <div class="framework work"  style="margin-top:10px">
                     <table>
                       <thead>
                         <tr>
                           <th>基础类型</th>
                           <th>风机机型</th>
                           <th>轮毂高度</th>
                           <th>数量</th>
                           <th><img src="../img/add.png" @click="addRow('baseInfo')"></th>
                         </tr>
                       </thead>
                       <tbody>
                         <tr v-for="(item,index) in addform.proBaseInfoList">
                           <td>
                            <el-select v-model="item.fdBasicType" style="width:260px;" placeholder="请选择" >
                              <el-option v-for="item1 in thebasetype" :key="item1.value" :label="item1.lable" :value="item1.value"></el-option>
                            </el-select>
                           </td>
                           <td>
                            <el-select v-model="item.fdFanType" style="width:260px;" plaaddform.ceholder="请选择">
                              <el-option v-for="item1 in thefanmodel" :key="item1.value" :label="item1.lable" :value="item1.value"></el-option>
                            </el-select>
                           </td>
                           <td>
                            <el-select v-model="item.fdHubHeight" style="width:260px;" placeholder="请选择">
                              <el-option v-for="item1 in contourheight" :key="item1.value" :label="item1.lable" :value="item1.value"></el-option>
                            </el-select>
                           </td>
                           <td>
                            <el-input auto-complete="off" v-model="item.fdFanNumber" placeholder="请输入"></el-input>
                           </td>
                           <td>
                              <img src="../img/remove.png" @click="delRow(index,'baseInfo')">
                           </td>
                         </tr>

                       </tbody>
                     </table>
                  </div>
                  <hr />
                <div class="framework mini work">
                  <table>
                    <thead>
                    <tr>
                      <th style="width:300px">组织岗位</th>
                      <th>姓名</th>
                      <th>联系方式</th>
                      <th><img src="../img/add.png" @click="addRow('project')"></th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(item,index) in addform.proArchList">
                      <td>
                        <el-select v-model="item.fdGroupPost" placeholder="请选择" style="width: 100%">
                          <el-option v-for="item1 in organizationalpositions" :key="item1.value" :label="item1.lable" :value="item1.value"></el-option>
                        </el-select>
                      </td>
                      <td>
                        <el-input auto-complete="off" v-model="item.fdPostName" placeholder="请输入"></el-input>
                      </td>
                      <td>
                        <el-input auto-complete="off" v-model="item.fdPostTelephone" placeholder="请输入"></el-input>
                      </td>
                      <td>
                        <img src="../img/remove.png" @click="delRow(index,'project')">
                      </td>
                    </tr>
                    </tbody>
                  </table>
                </div>
                 <hr />
                <div class="framework work">
                  <table>
                    <thead>
                    <tr>
                      <th>单位分类</th>
                      <th>单位名称</th>
                      <th>联系人</th>
                      <th>联系方式</th>
                      <th><img src="../img/add.png" @click="addRow('unit')"></th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(item,index) in addform.unitList">
                      <td>
                        <el-select v-model="item.fdUnitType" placeholder="请选择" >
                          <el-option v-for="item1 in unitclassification" :key="item1.value" :label="item1.lable" :value="item1.value"></el-option>
                        </el-select>
                      </td>
                      <td>
                          <el-input style="width:500px;" v-model="item.fdUnitName" auto-complete="off" placeholder="请输入"></el-input>
                      </td>
                      <td>
                        <el-input v-model="item.fdLinkman" auto-complete="off" placeholder="请输入"></el-input>
                      </td>
                      <td>
                        <el-input v-model="item.fdUnitTelephone" auto-complete="off" placeholder="请输入"></el-input>
                      </td>
                      <td>
                        <img src="../img/remove.png" @click="delRow(index,'unit')">
                      </td>
                    </tr>

                    </tbody>
                  </table>
                </div>
            </el-form>
        </div>
      </div>
      <!-- buttonBar -->
      <div style="height: 50px;" class="dijitDialogButtonBar">
        <div class="hob-ser" style="margin-right: 10px;margin-top: 12px;">
          <el-button v-if="showDetailStatus" size="mini" plain @click="sure('addform')">确定</el-button>
          <el-button v-if="showDetailStatus" size="mini" plain @click="close('event','addform')">取消</el-button>
          <span v-if="showDetailStatus" class="rests" @click="close('addform','addform')">重置</span>
        </div>
      </div>
    </div>
    <div>
      <!--<inner-model v-if="innerModel.showinnerModel"></inner-model>-->
    </div>
    <!-- 浮层 -->
    <div class="dijitDialogUnderlayWrapper" style="display: block; top: 0px; left: 0px; z-index: 1049;">
      <div class="dijitDialogUnderlay" v-bind:style="{height: client_height+'px', width: client_width+'px'}"></div>
    </div>
  </div>
</template>
<style scoped>
  select,input[type="text"],textarea{
    width:200px;
  }

</style>
<script>
import '@/assets/js/city-data.js'
  function isIE() { //ie?
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    var isIE = (!!window.ActiveXObject || "ActiveXObject" in window) //判断是否IE浏览器
    var isEdge = userAgent.indexOf("Edge") > -1 && !isIE;
    if(isIE || isEdge){
      return true;
    }else {
      return false;
    }
  }
  export default{
    data(){
      return {
        title:this.$parent.modelAttr.title,//弹出框表头
        type:this.$parent.modelAttr.type,   //弹出框类型
        iDstate:this.$parent.modelAttr.iDstate,   //状态码
        showDetailStatus:true,
        id:this.$parent.modelAttr.rowId,    //弹出框id
        client_width : document.body.clientWidth,
        client_height : document.body.clientHeight,
        modal_top : '',
        modal_left : '',
        disab:false,
        progressMask:false,
        flag:false,
        formLabelWidth:"135px",
        options:CityInfo,
        addform:{
          citys:[],
          kaleidoscope:"",   //所属公司
          company:"",         //项目公司
          names:"",           //项目名称
          region:"",         //工程大区
          genre:"",           //项目类型
          capacity:"",        //项目容量
          homeloops:"",       //近战回路
          pattern:"",         //承发包模式
          site:"",            //项目场址
          status:"",          //建设状态
          sort:"",            //项目类别
          terrain:"",         //项目地形
          resource:"",        //风资源区域
          voltage:"",         //升压站电压等级
          structure:"",       //升压站建筑面积
          longitude:"",       //升压站经度
          latitude:"",        //升压站纬度
          enterthearena:"",   //进场道路长度
          sendout:"",         //送出线路长度
          currentcollection:"", //集电线路长度
          explode:"",         //是否需要爆破
          transformer:"",     //主变容量
          substation:"",      //箱变容量
          mainbody:"",        //建设主体
          domain:"",          //是否跨域
          inter:"",           //介入方式
          design:"",          //设计类型
          bribe:"",           //线路回路
          material:"",        //电缆材料
          takeafee:"",        //建安费总价
          engineering:"",     //交通工程
          electrical:"",      //集电线路
          thefanbase:"",      //风机基础
          station:"",         //升压站
          thefaninstallation:"",  //风机安装
          sendoutline:"",     //送出线路
          proBaseInfoList:[
              {
                fdBasicType:"",          //基础类型
                fdFanType:"",        //风机机型
                fdHubHeight:"",       //轮廓高度
                fdFanNumber:"",        //数量
              }
            ],
          proArchList:[
              {
                fdGroupPost:"",  //组织岗位
                fdPostName:"",            //姓名
                fdPostTelephone:"",         //联系方式
              }
            ],
          unitList:[
              {
                fdUnitType:"",            //单位分类
                fdUnitName:"",     //单位名称
                fdLinkman:"",         //联系人
                fdUnitTelephone:"",      //联系方式
              }
            ],
        },
        subordinate:[//所属公司
            {
              lable:"华北分公司",
              value:"1"
            },{
              lable:"西北分公司",
              value:"2"
            },{
              lable:"华东分公司",
              value:"3"
            },{
              lable:"南方分公司",
              value:"4"
            }
          ],
        macrocell:[   //工程大区
            {
              lable:"工程一区",
              value:"1"
            },{
              lable:"工程二区",
              value:"2"
            },{
              lable:"工程三区",
              value:"3"
            },{
              lable:"工程四区",
              value:"4"
            }
          ],
          mold:[      //项目类型
            {
              lable:"风电项目",
              value:"1"
            },{
              lable:"光伏项目",
              value:"2"
            },{
              lable:"分散式风电项目",
              value:"3"
            },{
              lable:"分布式光伏项目",
              value:"4"
            },{
              lable:"海上风电项目",
              value:"5"
            },{
              lable:"屋顶光伏项目",
              value:"6"
            }
          ],
          contracting:[ //承发包模式
            {
              lable:"施工总承包",
              value:"1"
            },{
              lable:"EPC总承包",
              value:"2"
            },{
              lable:"PC总承包",
              value:"3"
            },{
              lable:"平行发包",
              value:"4"
            },{
              lable:"合资合作",
              value:"5"
            }
          ],
          construction:[  //建设状态
            {
              lable:"未开工",
              value:"1"
            },{
              lable:"建设中",
              value:"2"
            },{
              lable:"倒送电",
              value:"3"
            },{
              lable:"移交生产",
              value:"4"
            },{
              lable:"竣工验收",
              value:"5"
            }],
          classification:[  //项目类别
            {
              lable:"新建项目",
              value:"1"
            },{
              lable:"结转项目",
              value:"2"
            },{
              lable:"扩建项目",
              value:"3"
            }],
          projectterrain:[    //项目地形
            {
              lable:"山地",
              value:"1"
            },{
              lable:"丘陵",
              value:"2"
            },{
              lable:"平原",
              value:"3"
            },{
              lable:"海上",
              value:"4"
            },{
              lable:"林地",
              value:"5"
            },{
              lable:"基本农田",
              value:"6"
            },{
              lable:"荒地",
              value:"7"
            },{
              lable:"滩涂",
              value:"8"
            },{
              lable:"草原",
              value:"9"
            },{
              lable:"鱼塘",
              value:"10"
            },{
              lable:"山地+丘陵",
              value:"11"
            },{
              lable:"平原+丘陵",
              value:"12"
            },{
              lable:"林地+草地",
              value:"13"
            },{
              lable:"林地+基本农田",
              value:"14"
            },{
              lable:"林地+荒地",
              value:"15"
            },{
              lable:"基本农田+荒地",
              value:"16"
            },{
              lable:"基本农田+草原",
              value:"17"
            },{
              lable:"平原+林地",
              value:"18"
            },{
              lable:"平原+基本农田",
              value:"19"
            }],
          resourcearea:[      //风资源区域
            {
              lable:"Ⅰ类",
              value:"1"
            },{
              lable:"Ⅱ类",
              value:"2"
            },{
              lable:"Ⅲ类",
              value:"3"
            },{
              lable:"Ⅳ类",
              value:"4"
            }],
          voltageclasses:[    //升压站电压等级
            {
              lable:"10kV",
              value:"1"
            },{
              lable:"35kV",
              value:"2"
            },{
              lable:"66kV",
              value:"3"
            },{
              lable:"110KV",
              value:"4"
            },{
              lable:"220kV",
              value:"5"
            }
          ],
          blasting:[    //是否需要爆破
            {
              lable:"是",
              value:"1"
            },{
              lable:"否",
              value:"2"
            }
          ],
          maintransformer:[   //主变容量
            {
              lable:"开关站无主变",
              value:"1"
            },{
              lable:"50",
              value:"2"
            },{
              lable:"80",
              value:"3"
            },{
              lable:"82",
              value:"4"
            },{
              lable:"100",
              value:"5"
            },{
              lable:"140",
              value:"6"
            },{
              lable:"150",
              value:"7"
            },{
              lable:"200",
              value:"8"
            },{
              lable:"250",
              value:"9"
            },{
              lable:"300",
              value:"10"
            }
          ],
          boxtype:[   //箱变容量
            {
              lable:"1650",
              value:"1"
            },{
              lable:"2200",
              value:"2"
            },{
              lable:"2750",
              value:"3"
            },{
              lable:"3300",
              value:"4"
            },{
              lable:"4600",
              value:"5"
            },{
              lable:"2150+3200",
              value:"6"
            },{
              lable:"2200+3300",
              value:"7"
            }
          ],
          constructionmainbody:[    //建设主体
            {
              lable:"自建",
              value:"1"
            },{
              lable:"国网建设",
              value:"2"
            }
          ],
          crossdomain:[   //是否跨域
            {
              lable:"是",
              value:"1"
            },{
              lable:"否",
              value:"2"
            }
          ],
          interventions:[   //介入方式
            {
              lable:"T接",
              value:"1"
            },{
              lable:"π接",
              value:"2"
            },{
              lable:"常规",
              value:"3"
            }
          ],
          designtyle:[  //设计类型
            {
              lable:"地埋",
              value:"1"
            },{
              lable:"架空",
              value:"2"
            },{
              lable:"地埋+架空",
              value:"3"
            }
          ],
          lineabribe:[    //线路回路
            {
              lable:"双回",
              value:"1"
            },{
              lable:"单回",
              value:"2"
            }
          ],
          cablematerial:[   //电缆材质
            {
              lable:"铝芯",
              value:"1"
            },{
              lable:"铜芯",
              value:"2"
            },{
              lable:"铝合金",
              value:"3"
            }
          ],
          thebasetype:[   //基础类型
            {
              lable:"PH基础",
              value:"1"
            },{
              lable:"锚栓式基础",
              value:"2"
            },{
              lable:"梁板式基础",
              value:"3"
            },{
              lable:"桩承台基础",
              value:"4"
            },{
              lable:"高台柱式基础",
              value:"5"
            },{
              lable:"重力式拓展基础",
              value:"6"
            },{
              lable:"预制装配式基础",
              value:"7"
            },{
              lable:"浮筒式无张力基础",
              value:"8"
            },{
              lable:"混合塔架抬高式基础",
              value:"9"
            }
          ],
          homeloop:[
            {
              lable:"一回",
              value:"1"
            },
             {
              lable:"二回",
              value:"2"
            },
             {
              lable:"三回",
              value:"3"
            },
             {
              lable:"四回",
              value:"4"
            },
             {
              lable:"五回",
              value:"5"
            },
             {
              lable:"六回",
              value:"6"
            },
             {
              lable:"七回",
              value:"7"
            },
             {
              lable:"八回",
              value:"8"
            },
             {
              lable:"九回",
              value:"9"
            },
             {
              lable:"十回",
              value:"10"
            },
             {
              lable:"十一回",
              value:"11"
            },
             {
              lable:"十二回",
              value:"12"
            },
             {
              lable:"十三回",
              value:"13"
            },
             {
              lable:"十四回",
              value:"14"
            },
             {
              lable:"十五回",
              value:"15"
            }
          ],
          thefanmodel:[   //风机机型
            {
              lable:"GW82/1500",
              value:"1"
            },{
              lable:"GW87/1500",
              value:"2"
            },{
              lable:"GW93/1500",
              value:"3"
            },{
              lable:"GW115/2000",
              value:"4"
            },{
              lable:"GW115/2500",
              value:"5"
            },{
              lable:"GW121/2000",
              value:"6"
            },{
              lable:"GW121/2500",
              value:"7"
            },{
              lable:"GW121/2750",
              value:"8"
            },{
              lable:"GW130/2500",
              value:"9"
            },{
              lable:"GW131/2000",
              value:"10"
            },{
              lable:"GW131/2200",
              value:"11"
            },{
              lable:"GW131/2500",
              value:"12"
            },{
              lable:"GW136/3000",
              value:"13"
            },{
              lable:"GW136/4200",
              value:"14"
            },{
              lable:"GW140/2500",
              value:"15"
            },{
              lable:"GW140/3000",
              value:"16"
            },{
              lable:"GW155/3000",
              value:"17"
            },{
              lable:"GW155/3300",
              value:"18"
            }
          ],
          contourheight:[   //轮廓高度
            {
              lable:"钢塔75m",
              value:"1"
            },{
              lable:"钢塔80m",
              value:"2"
            },{
              lable:"钢塔85m",
              value:"3"
            },{
              lable:"钢塔90m",
              value:"4"
            },{
              lable:"钢塔95m",
              value:"5"
            },{
              lable:"钢塔100m",
              value:"6"
            },{
              lable:"钢塔105m",
              value:"7"
            },{
              lable:"钢塔110m",
              value:"8"
            },{
              lable:"钢塔115m",
              value:"9"
            },{
              lable:"钢塔120m",
              value:"10"
            },{
              lable:"钢塔125m",
              value:"11"
            },{
              lable:"钢塔130m",
              value:"12"
            },{
              lable:"钢塔135m",
              value:"13"
            },{
              lable:"钢塔140m",
              value:"14"
            },{
              lable:"柔塔120m",
              value:"15"
            },{
              lable:"柔塔125m",
              value:"16"
            },{
              lable:"柔塔130m",
              value:"17"
            },{
              lable:"柔塔135m",
              value:"18"
            },{
              lable:"柔塔140m",
              value:"19"
            },{
              lable:"柔塔145m",
              value:"20"
            },{
              lable:"混塔100m",
              value:"21"
            },{
              lable:"混塔110m",
              value:"22"
            },{
              lable:"混塔120m",
              value:"23"
            },{
              lable:"混塔140m",
              value:"24"
            },{
              lable:"混塔160m",
              value:"25"
            },{
              lable:"混塔168m",
              value:"26"
            },{
              lable:"分片式钢塔120m",
              value:"27"
            },{
              lable:"分片式钢塔130m",
              value:"28"
            },{
              lable:"分片式钢塔140m",
              value:"29"
            },{
              lable:"分片式钢塔150m",
              value:"30"
            }
          ],
          organizationalpositions:[   //组织岗位
            {
              lable:"司机",
              value:"13"
            },{
              lable:"财务经理",
              value:"8"
            },{
              lable:"工程经理",
              value:"9"
            },{
              lable:"开发经理",
              value:"10"
            },{
              lable:"技术经理",
              value:"11"
            },{
              lable:"档案专责",
              value:"12"
            },{
              lable:"合同经理",
              value:"1"
            },{
              lable:"招采工程师",
              value:"2"
            },{
              lable:"造价工程师",
              value:"3"
            },{
              lable:"土建工程师",
              value:"4"
            },{
              lable:"电气工程师",
              value:"5"
            },{
              lable:"安全工程师",
              value:"6"
            },{
              lable:"质量工程师",
              value:"7"
            }
          ],
          unitclassification:[
            {
              lable:"设计单位",
              value:"1"
            },{
              lable:"监理单位",
              value:"2"
            },{
              lable:"地勘单位",
              value:"3"
            },{
              lable:"施工单位",
              value:"4"
            },
          ],
          proBaseInfoList:[{}],
          proArchList:[{}],
          unitList:[{}],
      }
    },
    beforeDestroy (){
      window.removeEventListener('resize', this.handleResize)
    },
    created(){
     if(typeof this.type){
        if(this.type=="update"){
          this.showDetail(this.id);
        }else if(this.type=="detail"){
          //隐藏字段
          this.showDetailStatus=false;
          this.showDetail(this.id);
        }
     }
    },
    mounted (){
     /* //模态框拖拽
      var dragModal = function (box, bar) {
        var oWin = document.getElementById(box);
        var oH2 = document.getElementById(bar);
        //var oH2 = oWin.getElementsByTagName("h1")[0];
        var bDrag = false;
        var disX = 0;
        var disY = 0;
        oH2.onmousedown = function (event)
        {
          var event = event || window.event;
          bDrag = true;
          disX = event.clientX - oWin.offsetLeft;
          disY = event.clientY - oWin.offsetTop;
          this.setCapture && this.setCapture();
          return false
        };
        oH2.onmousemove = function (event)
        {
          if (!bDrag) return;
          var event = event || window.event;
          var iL = event.clientX - disX;
          var iT = event.clientY - disY;
          var maxL = document.documentElement.clientWidth - oWin.offsetWidth;
          var maxT = document.documentElement.clientHeight - oWin.offsetHeight;
          iL = iL < 0 ? 0 : iL;
          iL = iL > maxL ? maxL : iL;
          iT = iT < 0 ? 0 : iT;
          iT = iT > maxT ? maxT : iT;

          oWin.style.marginTop = oWin.style.marginLeft = 0;
          oWin.style.left = iL + "px";
          oWin.style.top = iT + "px";
          return false
        };
        oH2.onmouseup = window.onblur = oH2.onlosecapture = function ()
        {
          bDrag = false;
          oH2.releaseCapture && oH2.releaseCapture();
        };
      }

      dragModal('addMapModalDialog', 'addMapdragbar');
      */

      this.modal_top = (document.body.clientHeight - document.getElementById("addMapModalDialog").offsetHeight)/2
      this.modal_left = (document.body.clientWidth - document.getElementById("addMapModalDialog").offsetWidth)/2
      window.addEventListener('resize', this.handleResize)
    },
    props:{
      /* transformCurrentMatterId:{
       type:String,
       default:""
       }*/
    },

    methods:{
      showDetail(id){
        var _this=this;
         this.$http.post('/engineer/getDetails',{fdProid:id,fdNumber:this.iDstate})
        // this.$http.post('getDetails',{fdProid:id,fdNumber:this.iDstate,})
          .then((res)=> {
            var st=res.data.data.fdAddress;
            if(st){
              if(st.indexOf("县")!= -1){
                _this.addform.country=st.split("县")[1];
              }else if(st.indexOf("区")!= -1){
               _this.addform.country=st.split("区")[_this.addform.country=st.split("区").length-1];
              }else if(st.indexOf("旗")!= -1){
               _this.addform.country=st.split("旗")[1];
              }else if(st.indexOf("市")!= -1){
               _this.addform.country=st.split("市")[2];
              }else if(st.indexOf("岛")!= -1){
               _this.addform.country=st.split("岛")[1];
              }else if(st.indexOf("域")!= -1){
               _this.addform.country=st.split("域")[1];
              }else if(st.indexOf("特别行政区")!= -1){
               _this.addform.country=st.split("特别行政区")[1];
              }
            }
            _this.addform.citys=[Number(res.data.data.fdProvinceCode),Number(res.data.data.fdCityCode),Number(res.data.data.fdDistrictCode)];
            _this.addform.kaleidoscope=res.data.data.fdAffiliatedCompany?String(res.data.data.fdAffiliatedCompany):"";   //所属公司
            _this.addform.homeloops=res.data.data.fdIntakeCircuit?String(res.data.data.fdIntakeCircuit):"",
            _this.addform.company=res.data.data.fdProCompany;         //项目公司
            _this.addform.names=res.data.data.fdName;           //项目名称
            _this.addform.region=res.data.data.fdEngineeringArea?String(res.data.data.fdEngineeringArea):"";         //工程大区
            _this.addform.genre=res.data.data.fdProjectType?String(res.data.data.fdProjectType):"";          //项目类型
            _this.addform.capacity=res.data.data.fdProCapacity;        //项目容量
            _this.addform.pattern=res.data.data.fdPackageModel?String(res.data.data.fdPackageModel):"";         //承发包模式
            _this.addform.site=res.data.data.fdAddress;            //项目场址
            _this.addform.status=res.data.data.buildLevel?String(res.data.data.buildLevel):"";          //建设状态
            _this.addform.sort=res.data.data.fdProjectClass?String(res.data.data.fdProjectClass):"";            //项目类别
            _this.addform.terrain=res.data.data.fdProjectTerrain;         //（项目地形
            _this.addform.resource=res.data.data.fdWindResourceArea?String(res.data.data.fdWindResourceArea):"";        //风资源区域
            _this.addform.voltage=res.data.data.fdBoosterStationGrade?String(res.data.data.fdBoosterStationGrade):"";         //升压站电压等级
            _this.addform.structure=res.data.data.fdBoosterStationAcreage;       //升压站建筑面积
            _this.addform.longitude=res.data.data.fdLongitude;       //升压站经度
            _this.addform.latitude=res.data.data.fdLatitude;        //升压站纬度
            _this.addform.enterthearena= res.data.data.fdRouteLength;   //进场道路长度
            _this.addform.sendout=res.data.data.fdSendLine;         //送出线路长度
            _this.addform.currentcollection=res.data.data.fdPowerLine; //集电线路长度
            _this.addform.explode=res.data.data.fdBlast?String(res.data.data.fdBlast):"";         //是否需要爆破
            _this.addform.transformer=String(res.data.data.fdMainCapacity);     //主变容量
            _this.addform.substation=res.data.data.fdBoxCapacity?String(res.data.data.fdBoxCapacity):"";      //箱变容量
            _this.addform.mainbody=res.data.data.fdMainSubject?String(res.data.data.fdMainSubject):"";        //建设主体
            _this.addform.domain=res.data.data.fdStrideAcross?String(res.data.data.fdStrideAcross):"";          //是否跨域
            _this.addform.inter=res.data.data.fdAccessMode?String(res.data.data.fdAccessMode):"";           //介入方式
            _this.addform.design=res.data.data.fdDesignType?String(res.data.data.fdDesignType):"";          //设计类型
            _this.addform.bribe=res.data.data.fdCircuit?String(res.data.data.fdCircuit):"";           //线路回路
            _this.addform.material=res.data.data.fdCableMaterial;        //电缆材料
            _this.addform.takeafee=res.data.data.fdJiananTotalFee;        //建安费总价
            _this.addform.engineering=res.data.data.fdTrafficProFee;     //交通工程
            _this.addform.electrical=res.data.data.fdCollectorLineFee;      //集电线路
            _this.addform.thefanbase=res.data.data.fdFanBaseFee;      //风机基础
            _this.addform.station=res.data.data.fdBoostStationFee;         //升压站
            _this.addform.thefaninstallation=res.data.data.fdFanInstallationFee;  //风机安装
            _this.addform.sendoutline=res.data.data.fdSendLineFee;     //送出线路
            if(res.data.data.tbFanTypeEntity.length>0){
              _this.addform.proBaseInfoList=res.data.data.tbFanTypeEntity;    //项目基本信息
            }
            if(res.data.data.tbProFrameworkEntity.length>0){
              _this.addform.proArchList=res.data.data.tbProFrameworkEntity;//项目部架构
            }
            if(res.data.data.tbBuildUnitEntity.length>0){
              _this.addform.unitList=res.data.data.tbBuildUnitEntity;//参建单位表
            }
          }).catch( (error)=> {
          console.log(error);
        });
      },
      addRow(name){
        if(!this.showDetailStatus){
            return;
        }
        var json={};
        if(name==="baseInfo"){
           json={
             fdBasicType:"",          //基础类型
             fdFanType:"",        //风机机型
             fdHubHeight:"",       //轮廓高度
             fdFanNumber:"",        //数量
          };
          this.addform.proBaseInfoList.push(json);
        }else if(name==="project"){
           json= {
             fdGroupPost:"",  //组织岗位
             fdPostName:"",            //姓名
             fdPostTelephone:"",         //联系方式
           };
          this.addform.proArchList.push(json);
        }else if(name==="unit"){
           json={
             fdUnitType:"",            //单位分类
             fdUnitName:"",     //单位名称
             fdLinkman:"",         //联系人
             fdUnitTelephone:"",      //联系方式
           };
          this.addform.unitList.push(json);
        }
      },
      delRow(index,name){
        if(!this.showDetailStatus){
            return;
        }
        if(name==="baseInfo"){
          this.addform.proBaseInfoList.splice(index,1);
        }else if(name==="project"){
          this.addform.proArchList.splice(index,1);
        }else if(name==="unit"){
          this.addform.unitList.splice(index,1);
        }
      },
      handleResize (event) {
        this.client_width = document.body.clientWidth
        this.client_height = document.body.clientHeight
        this.modal_top = (document.body.clientHeight - document.getElementById("addMapModalDialog").offsetHeight)/2
        this.modal_left = (document.body.clientWidth - document.getElementById("addMapModalDialog").offsetWidth)/2
      },
      close(type,formName){
        if(type=="event"){
          this.$parent.modelAttr.showModels = false;    //关闭弹出框
        }
      }
    },
    components:{

    }

  }
</script>
<style >
 .dijitDialogTitleBar{
    display: flex;
    justify-content: space-between;
    height:45px;
    background:#EEEEEE;
    line-height:37px;
    font-size:16px;
    border:none;
    border-radius: 4px 4px 0px 0px;
  }
  .dijitDialogTitleBar span:nth-child(3){
    cursor:pointer;
    margin-right:15px;
  }
  .dijitDialogCloseIcon{
    top:11px;
  }
  .dijitDialogCloseIcon:hover{
    top:11px;
  }
  .dijitDialogTitleBar span{
    color:#797979;
  }
  .dijitDialogPaneContent{
    border:none;
  }
  .dijitDialog{
    border:none;
    border-radius: 4px;
  }
  .formCss  .el-form-item{
    /* margin-right:30px; */
    /* margin-left:30px; */
    margin-right:0px;
    margin-bottom:10px;
  }
  .formCss  .el-form-item__content div input{
     width:130px;
    /* display:block; */
  }
  .formCss form div label{
    font-size: 12px;
    margin-bottom:0px !important;
    line-height:40px;
  }
  hr{
    margin:20px;
  }
  .framework{
   /* height: 300px;*/
    margin: 0 30px;
  }
  .framework table{
    width: 100%;
    margin-bottom: 30px;
  }
  .framework table tr th{
    border:1px solid #ccc;
  }
  .framework table thead{
    background: #F0f0f0;
    color: #676767;
  }
  .framework table tr{
    height: 39px;
    line-height: 39px;
    font-size: 30px;
  }
  .framework table th{
    text-align: center;
  }
  .framework table th:nth-child(5){
    width: 45px;
    background: #fff;
    border: none;
  }
  .framework table th:nth-child(1){
    border-right: none;
  }
  .framework table th:nth-child(2){
    border-left: none;
    border-right: none;
  }
  .framework table th:nth-child(3){
    border-left: none;
    border-right: none;
  }
  .framework table th:nth-child(4){
    border-left: none;
  }
  .framework table th img{
    width: 20px;
    height: 20px
  }
  .mini table th:nth-child(4){
    width: 45px;
    background: #fff;
    border: none;
    border-left: 1px solid #ccc;
    border-top: none;
    border-right: none;
    border-bottom: none;
  }
  .mini table td:nth-child(4){
    text-align: center;
  }
  .framework tbody td img{
    width: 20px;
    height: 20px;
  }
  .work tbody td img{
    display:none;
  }
  .work th img{
    display:none;
  }
  .framework tbody th div{
    width: 170px;
  }
  .framework tbody td:nth-child(5){
    width: 45px;
    text-align: center;
  }
  .dijitDialogButtonBar{
    border-radius:0px 0px 4px 4px;
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
   .city .el-form-item__content .town{
    width:460px !important;
  }
   .city .el-form-item__content .town input{
    width:460px !important;
  }
  .city .el-form-item__content .burg{
    width:130px !important;
  }
   .city .el-form-item__content .burg input{
    width:130px !important;
  }
  .headbos input{
    width:398px !important;
  }
  .form input{
    background:#fff !important;
    cursor:default !important;
  }
  .form .el-input__inner{
    color:#606266 !important;
  }
  .xmcz{
     cursor:default !important;
  }
  .xmcz span{
    color:#606266 !important;
    cursor:default !important;
  }
  .form .el-input__suffix{
    display:none;
    /* #606266 */
  }
  .dijitDialogTitle{
    font-size:16px;
    margin-left:15px;
  }
  .scity input{
     width:265px !important;
  }
</style>
