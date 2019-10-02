<template>
  <div class="header">
    <div class="left">
      <div class="logo">
        <img src="./img/logo.png">
      </div>
      <div class="deliver"></div>
      <div class="logotext">
        <img src="./img/biaoti.png">
      </div>
    </div>
    <!-- <div class="middle_item" :class="tabFlag?'active':''">首页</div> -->
    <div class="middle">
      <el-menu default-active="1" class="el-menu-demo" id="homepage" mode="horizontal" background-color="" ext-color="#d5e9f5" active-text-color="d5e9f5">
        <el-menu-item index="1" :class="{main:isMain}" @click="goMain">进度管理</el-menu-item>
      </el-menu>
    </div>
    <div class="middle middles">
      <el-menu default-active="1" class="el-menu-demo" id="homepage" mode="horizontal" background-color="" ext-color="#d5e9f5" active-text-color="d5e9f5">
        <el-menu-item index="1" :class="{business:isBusiness}"  @click="business">商务合同</el-menu-item>
      </el-menu>
    </div>

    <div class="middle middles">
      <el-menu default-active="1" class="el-menu-demo" id="homepage" mode="horizontal" background-color="" ext-color="#d5e9f5" active-text-color="d5e9f5">
        <el-menu-item index="1" :class="{engineerManage:isEngineerManage}"  @click="goEngineerManage">车辆月报</el-menu-item>
      </el-menu>
    </div>
    <div class="right">
      <div class="right_item">
        <el-menu mode="horizontal" menu-trigger="true" id="passstyle" style="height:68px" text-color="#d5e9f5"  class="el-menu-demo" active-text-color="none" default-active="3">
          <el-menu-item index="1"><img @click="exit" src="./img/returns.png"></el-menu-item>
        </el-menu>
      </div>
      <div class="right_item sett" @click="goLogPage">
        <el-menu mode="horizontal" id="passstyle" style="height:68px" class="el-menu-demo" active-text-color="none" default-active="2">
          <el-menu-item index="1"><img src="./img/settings.png"></el-menu-item>
        </el-menu>
      </div>
      <div class="right_item sett messageclass" @click="mmessagebtn">
        <el-menu mode="horizontal" id="passstyle" style="height:68px" class="el-menu-demo" active-text-color="none" default-active="2">
          <el-menu-item index="1">
            <el-badge :value="fileList.table.length" :hidden="shows" :max="100" class="item">
              <img src="./img/tixing.png">
              <!-- <i class="el-icon-message"></i> -->
            </el-badge>
          </el-menu-item>
        </el-menu>

      </div>
      <div class="right_item user" @click="message">
        <el-menu mode="horizontal" id="userstyle" style="height:68px" text-color="#d5e9f5" active-text-color="none" class="el-menu-demo" default-active="1">
          <el-submenu index="1">
            <template slot="title">
              <span><img src="./img/user.png"></span>
              {{userform.username}}
            </template>
            <!-- <el-menu-item index="1-1"><i class="el-icon-edit"></i>个人信息</el-menu-item> -->
            <el-menu-item index="1-2" style="color:#409eff !important;" @click="password"><i class="el-icon-edit"></i>修改密码</el-menu-item>
          </el-submenu>
        </el-menu>
      </div>
      <div class="right_item weat">
        <!-- 天气框 -->
        <div  class="wathcer" style="display: inline-block;z-index: 999">
          <div class="todys">
            <span><img src="./img/dt.png"></span>
            <span>{{citys}}</span>
            <span>|</span>
            <span>{{today.temperature}}&nbsp;&nbsp;{{today.weather}}</span>
          </div>
          <map-weathers class="weaters" @child-info="child" @city="city"></map-weathers>
        </div>
      </div>
    </div>
    <div class="messagestyle"  @mouseleave="leave" v-if="reminder">
      <div class="messagese">
        <div @click="detail(item)" v-for="(item,index) in fileList.table" :key="index">
          <p>&lt;交通工程>工程量补入&gt;</p>
          <p><span>{{item.fdName}}</span><span>{{item.yearMonthDate}}</span></p>
        </div>
      </div>
    </div>
    <!-- 个人信息修改 -->
    <el-dialog title="个人信息" :visible.sync="centerDialogVisible" width="500px">
      <el-form :model="userform" class="forms" size="small" style="width:400px;">
        <el-form-item label="姓名:" :label-width="formLabelWidth">
          <el-input v-model="userform.username" auto-complete="off" clearable :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="OA账号:" :label-width="formLabelWidth">
          <el-input v-model="userform.tel" auto-complete="off" clearable :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="邮箱:" :label-width="formLabelWidth">
          <el-input v-model="userform.email" auto-complete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="手机:" :label-width="formLabelWidth">
          <el-input v-model="userform.phone" auto-complete="off" clearable></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" size="small" @click="information">修改信息</el-button>
      </div>
    </el-dialog>
    <!--个修改密码弹框"-->
    <el-dialog title="修改密码" :visible.sync="changepswfalg" close-on-press-escape width="500px">
      <el-form :model="addform" :rules="rules" ref="addform" size="small" style="width:400px;">
        <el-form-item label="原密码:" :label-width="formLabelWidth" prop="oripassword">
          <el-input v-model="addform.oripassword" auto-complete="off" type="password" clearable></el-input>
        </el-form-item>
        <el-form-item label="新密码:" :label-width="formLabelWidth" prop="newpassword">
          <el-input v-model="addform.newpassword" auto-complete="off" type="password" clearable></el-input>
        </el-form-item>
        <el-form-item label="确认密码:" :label-width="formLabelWidth" prop="repeatPwd">
          <el-input v-model="addform.repeatPwd" auto-complete="off" type="password" clearable></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" align="center">
        <el-button type="primary" size="small" @click="editPass('addform')">确认修改</el-button>
      </div>
    </el-dialog>

  </div>
</template>
<script>
  import weathers from '@/components/common/weathers';
  export default {
    name: 'Header',
    components: {
      "map-weathers": weathers,
    },
    data() {
      return {
        isMain:true,
        isBusiness:false,
        isEngineerManage:false,
        shows:false,
        fileList:{
          table:[]
        },
        reminder:false,
        formLabelWidth: '120px',
        centerDialogVisible: false,//信息修改弹出框
        changepswfalg:false,      //账户密码修改弹出框
        tabFlag:false,
        today:{},         //今天
        citys:"", //当前城市
        userform:{   //修改信息的
          username:"", //个人信息
          tel:"",   //OA账号
          email:"",//邮箱
          phone:"" //手机号
        },
        addform:{
          oripassword:"", //旧密码
          newpassword:"",//新密码
          repeatPwd:""//确认新密码
        },
        rules:{
          oripassword:[
            { required: true, message: '请选择此项', trigger: 'blur' }
          ],
          newpassword:[
            { required: true, message: '请选择此项', trigger: 'blur' },
            { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
          ],
          repeatPwd:[
            { required: true, message: '请选择此项', trigger: 'blur' },
            { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
          ],
        }
      }
    },
    created() {
      this.userform.username=sessionStorage.getItem("nickname");
      this.getList()
    },
    computed: {
      timeString:function(){
        var ndate = new Date();
        var yy = ndate.getFullYear();
        var mon = ndate.getMonth()+1
        var day = ndate.getDate();
        if(mon<10){
          mon = '0' +mon
        }
        if(day<10){
          day = '0' +day
        }
        return yy + '/' + mon + '/' +day
      },
    },
    methods: {
      getList(){
        var _this = this;
        _this.fileList.table = [];
        var params = {}
        _this.$http.post('/engineer/selectCollection', params)
          .then(res => {
            console.log()
            if(res.data.status==200){
              _this.fileList.table = res.data.data;
              if(_this.fileList.table.length <= 0){
                _this.shows=true;
              }
            }else{
              this.$message({
                message: '后台接口报错',
                type: 'warning'
              });
            }
          }).catch(err => {
          // alert('失败')
        })
      },
      detail(item){

        this.$router.push({path:"/main/details",query:{mapData:JSON.stringify(item),showModel:true}});
      },
      leave(){
        this.reminder=false;
      },
      mmessagebtn(){   //当鼠标点击划入提示未填报的时候;
        this.reminder=true;

      },
      goLogPage(){
        this.isMain = false
        this.isBusiness = false
        this.isEngineerManage = false
        this.reminder=false;
        this.tabFlag=false;
        //默认跳转操作日志
        this.$router.push({path:"/main/log/operateLog"});
      },
      editPass(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if(this.addform.newpassword!=this.addform.repeatPwd){
              this.$message.error('两次输入密码不一致，请确认密码！');
              return false;
            }else{
              this.newword();
            }
          } else {
            console.log('error submit!!');
            // this.$refs[formName].resetFields();
            return false;
          }
        });
      },
      newword(){
        var params = {
          oldPwd:this.addform.oripassword,
          newPwd:this.addform.newpassword,
          repeatPwd:this.addform.repeatPwd,
        }
        this.$http.post('/permission/changePwd', params)
          .then(res => {
            if (res.data.state == 1) {
              this.changepswfalg = false;
              this.$message({
                message: '密码修改成功，请重新登录',
                type: 'success'
              });
              this.$router.push({name: 'Login'})
            } else {
              this.$message.error("原密码输入错误，请重新输入");
            }
          }).catch(err => {
          // alert('失败')
        })
      },
      password(formName){
        this.addform.oripassword="";
        this.addform.newpassword="";
        this.addform.repeatPwd="";
        this.changepswfalg = true;
      },
      information(){    //修改信息确定按钮
        this.centerDialogVisible = false;
      },
      message(){    //信息修改
        this.reminder=false
        this.centerDialogVisible = false;
        // this.userform.tel = "开开心心";
        // this.userform.email = "liufukuan6@163.com";
        // this.userform.phone = "17600175771";
        //  var params = {

        // }

        // this.$axios.post('', params)
        //   .then(res => {
        //     if (res.data.state == 1) {
        //     } else {
        //       this.$message.error(res.data.message);
        //     }
        //   }).catch(err => {
        //   // alert('失败')
        // })
      },
      exit(){
        this.reminder=false;
        this.$confirm('确定要退出吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: ''
        }).then(() => {
          this.$http.get('/logout',{
            params: { 'appip':4}
          })
          // this.$http.get('logout',{})
            .then((response)=> {
              if(response.data.state==1){
                this.$router.push("/login",{});
              }else{
                this.$message.error("退出失败！")
              }
            }).catch( (error)=> {
            // _this.$message.error('添加失败');
          });
        }).catch(() => {

        });
      },
      weath(){
        //  $('.weathers').stop().fadeIn()
        $('.todys').hover(function(){
          $('.weathers').stop().fadeIn();
        },function(){
          $('.weathers').stop().fadeOut();
        })
      },
      child(row){
        this.today=row;


      },
      city(row){
        this.citys=row
      },
      goMain(){
        var _this  = this;
        _this.tabFlag = true;
        _this.isMain = true
        _this.isBusiness = false
        _this.isEngineerManage = false
        this.$router.push({name: 'SuperMap'})
      },
      business(){
        this.isMain = false
        this.isBusiness = true
        this.isEngineerManage = false
        this.$router.push({name: 'contracts'})
      },
      goEngineerManage(){
        this.isMain = false
        this.isBusiness = false
        this.isEngineerManage = true
        this.$router.push({name: 'engineerManage'})
      },
      goList(){
        var _this  = this;
        _this.tabFlag = false;
        this.$router.push({name: 'List'})
      }
    },
    mounted(){
      // this.goMain();
      this.weath();
    }
  }
</script>
<style>
  /* 误删  当点击弹出框出现的时候，给body标签添加padding-right:17px;动态添加，所以必须在这里添加这样一行代码，须知 */
  body{
    padding-right:0px !important;
  }
  .el-menu--horizontal .el-menu--popup-bottom-start{
    background:#fff !important;
    top:5px;
  }
  .el-menu--horizontal .el-menu--popup{
    min-width:100px !important;
  }
  .el-menu--horizontal .el-submenu__title{
    height:68px !important;
    padding-top: 4px;
  }
  .el-menu--horizontal .el-menu-item{
    background:#fff !important;
  }
  .el-menu--horizontal{
    width: 100px !important;
  }
  .el-menu--horizontal li,
  .el-menu--horizontal li div{
    height:68px;
  }
  .el-menu--horizontal > .el-submenu .el-submenu__title:hover{
    background:#005291 !important;
  }
  .el-menu{
    background:none;
    border-bottom:none;
  }
  .el-badge__content{
    top:15px !important;
  }
</style>
<style scoped>
  .header {
    padding-left: 20px;
    height:70px;
    background: url("./img/group6.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    overflow: hidden;
  }
  .left {
    float: left;
    height: 70px;
    display: table-cell;
    vertical-align: middle;
  }
  .left div {
    float: left;
  }
  .deliver {
    margin-left: 10px;
    margin-right: 10px;
    display: inline-block;
    margin-top: 10px;
  }
  .logo{
    margin-top:13px;
    cursor: pointer;
  }
  .logotext {
    font-size: 18px;
    margin-top:13px;
    line-height: 44px;
  }
  .logotext img{
  }
  .right {
    float: right;
    margin-right: 20px;
  }
  .right div:nth-child(1){
    /* padding-left: 40px; */
  }
  .right div.sett{
    /* margin-right:40px; */
    /* padding-left: 10px; */
  }
  .right .right_item {
    float: right;
    cursor: pointer;
  }
  .right .right_item.user {
    vertical-align: middle;
    font-size: 14px;
    text-align: center;
    color:rgba(213,233,245,1);
    position:relative;
  }
  .right .right_item.weat{
    font-size:14px;
    margin: 0px;
    margin-top: 24px;
    margin-right:18px;
  }
  .right .right_item .wathcer{
    border: none;
    color: #fff;
  }
  .right .right_item .wathcer div{
    border: none;
  }
  .right .right_item .wathcer div:nth-child(2){
    display: none;
  }
  .right .right_item .wathcer div span:nth-child(3){
    margin: 0px 8px;
  }
  .right .right_item .wathcer div span:nth-child(1){
    margin-right: 4px;
  }
  .right .right_item.user img {
    vertical-align: middle;
  }
  .right .right_item.user span {
    margin-top: -20px;
  }
  .middle{
    height:68px;
    float:left;
    margin-left:20px;
  }
  .middles{
    margin-left:0px;
  }
  .middle .middle_item{
    font-size: 16px;
    line-height:71.5px;
    float:left;
    padding-right: 20px;
    padding-left: 20px;
    cursor: pointer;
    color:rgba(213,233,245,1);
  }
  .middle div:nth-child(1){
    padding: 0px;
    border-bottom: 2px solid rgba(213,233,245,1);
  }
  .middle .middle_item.active{
    height:70px;
    color:rgba(213,233,245,1);
  }
  .red {
    color: #df9966;
  }
  .weaters{
    z-index: 999;
    position: absolute;
    right: 50px;
    top: 56px;
  }
  .el-dialog__wrapper{
    width: 100%;
  }
  .el-dialog__wrapper .el-dialog__header{
    text-align:left !important;
    /* text-aign:left; */
  }
  .dialog-footer{
    text-align:center;
  }
  .el-menu .el-submenu__title{
    height:68px !important;
  }
  .el-menu{
    width:100px;
    background-color:none !important;
  }
  .el-menu .el-menu-item{
    width:100px !important;
    border-top:1px dashed #ccc;
  }
  #userstyle .el-submenu{
    width:130px !important;
    background: url("./img/group6_r1_c2.png") !important;
  }
  #passstyle .el-menu-item{
    width:50px !important;
    height:68px;
    border-top:none;
    background:#1473B0 !important;
    background: url("./img/group6_r1_c2.png") !important;
    padding:0 0 !important;
  }
  #passstyle{
    width:50px !important;
  }
  #passstyle .el-menu-item i{
    padding-top:8px !important;
    color:rgb(213, 233, 245);
  }
  #passstyle img{
    text-align:center;
    margin-top:10px;
    margin-left:12px;
  }
  #passstyle .el-menu-item:hover{
    background:#005291 !important;
  }
  .messageclass{
    z-index: 999;
    position: relative;
  }
  .messagestyle{
    width:300px;
    height:200px;
    padding: 0 10px;
    background:#fff;
    position:absolute;
    right:64px;
    top:74px;
    z-index:99990;
    border-radius:4px;
    border: 1px solid #e4e7ed;
    box-shadow:0 2px 12px 0 rgba(0, 0, 0, 0.1);
  }
  .messagese{
    height:180px;
    margin:9px -1px;
    overflow:auto;
  }
  .messagese div{
    border-top:1px solid #ccc;
  }
  .messagese div:hover{
    background:#ccc
  }
  .messagese div:nth-child(1){
    margin-top:10px;
  }
  .messagese div p{
    height:25px;
    line-height:25px;
    margin:0px;
    font-size:16px;
  }
  .messagese div p:nth-child(1){
    color:#333333;
  }
  .messagese div p:nth-child(2){
    display:flex;
    justify-content: space-between;
    font-size:14px;
  }
  #passstyle i{
    font-size:24px;
    color:#fff;
  }
  #homepage{
    margin-top:0.3px;
  }
  #homepage .el-menu-item{
    height: 70px !important;
    background: url("./img/dhbg.png") !important;
  }
  #homepage .el-menu-item{
    padding-top:3px;
    text-align:center;
    font-size: 16px;
    color:#d5e9f5;
    border:none;
  }
  #homepage .main{
    background:#005291 !important;
    border-bottom:2px solid #fff;
  }
  #homepage .business{
    background:#005291 !important;
    border-bottom:2px solid #fff;
  }
  #homepage .engineerManage{
    background:#005291 !important;
    border-bottom:2px solid #fff;
  }
</style>
