<template>
	<div class="login">
     <!--<iframe src="http://www.jq22.com/demo/jquery-cloud-141217202931/" style="height:100%;width:100%;border:0 none;"></iframe>-->

    <iframe src="static/bg/index.html" style="height:100%;width:100%;border:0 none;"></iframe>

      <div class="logo"></div>
      <div class="main animated bounceInDown">
        <div class="form_wrap">
          <div class="error">
            <p  v-if="errflag"><i class="el-icon-warning"></i>&nbsp;{{error_text}}</p>
          </div>
          <div class="user">
            <input placeholder="请输入账户" autocomplete="off" v-model="ruleForm.loginName" @keyup.enter="submitForm">
          </div>
          <div class="pwd">
            <input placeholder="请输入密码" autocomplete="off" type="password" v-model="ruleForm.password" @keyup.enter="submitForm">
          </div>
          <div class="check">
            <img src="./img/norem.png" v-if="!reflag" @click="reflag = !reflag" style="vertical-align: middle!important;">
            <img src="./img/rem.png" v-if="reflag" @click="reflag = !reflag" style="vertical-align: middle!important;">
            &nbsp;<span style="color:#1385CC">记住密码</span>
          </div>
          <div class="submit" @click="submitForm">
            登 录
          </div>
        </div>
      </div>
    <div class="bottom_text">Copyright &copy;北京天润新能投资有限公司 版权所有 v2.0.0</div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        reflag:false,
        ruleForm: {
          loginName: '',
          password: ''
        },
        errflag:false,
        error_text:""
      };
    },
    mounted:function(){
      // this.drawMap();
    },
    methods: {
      submitForm() {
        var _this = this;
        if(_this.ruleForm.loginName&&_this.ruleForm.password){

          this.$http.get('/login', {
            params: { 'username':_this.ruleForm.loginName,'password':_this.ruleForm.password,'appid':4}
          })
            .then(res => {
              if (res.data.state == 1) {
                sessionStorage.setItem('nickname',res.data.nickname);
                this.$router.push("/main/superMap");
              } else {
                _this.errflag = true
                _this.error_text = res.data.message;
              }
            }).catch(err => {
            _this.errflag = true
            _this.error_text = '用户名或密码错误';
          })
        }else{
          if(!_this.ruleForm.loginName){
            _this.errflag = true
            _this.error_text = '用户名不允许为空'
          }else if(!_this.ruleForm.password){
            _this.errflag = true
            _this.error_text = '密码不允许为空'
          }else{
            _this.errflag = true
            _this.error_text = '用户名或者密码不正确'
          }
        }

      },
    }
  };
</script>
<style scoped>
  .error p{
    height:30px;
    line-height: 30px;
    background: #ff867c;
    color:#fff;
    width:260px;
    text-indent: 5px;
    border-radius: 4px;
}
  .error{height:30px;}
  input::-webkit-input-placeholder{
    color:#3a6087;
  }
  input::-moz-placeholder{   /* Mozilla Firefox 19+ */
    color:#3a6087;
  }
  input:-moz-placeholder{    /* Mozilla Firefox 4 to 18 */
    color:#3a6087;
  }
  input:-ms-input-placeholder{  /* Internet Explorer 10-11 */
    color:#3a6087;
  }
.login{position:relative;width:100%;height:100%;}
.logo{width:140px;height:50px;background: url("img/logo.png") no-repeat;position: absolute;left:50px;top:40px;}
.main{width:446px;height:429px;position: absolute;left:50%;top:50%;margin-left:-223px;margin-top:-218px;background: url("img/bg_main.png") no-repeat;}
.form_wrap{margin-top:150px;padding-left:103px;}
input{padding-left:5px;height:35px;outline: 0 none;width:225px;border-radius:0px 6px 6px 0px;background-color:transparent;border:0px solid #1385cc;color: #3a6087!important;}
.user{margin-top:10px;padding-left:36px;background-image: url("img/user.png");background-repeat:no-repeat;background-position: 10px center;border:1px solid #1385cc;width:263px;border-radius: 6px;color:#fff;}
.pwd{margin-top:15px;padding-left:36px;background-image: url("img/pwd.png");background-repeat:no-repeat;background-position: 10px center;border:1px solid #1385cc;width:263px;border-radius: 6px;color:#fff;}
.check{color: #fff;margin-top:15px;cursor: pointer;height:14px;line-height: 14px;}
.submit{height:35px;line-height: 35px;color:#fff;background-color: #1c83d6;width:260px;border-radius: 4px;text-align: center;cursor: pointer;margin-top:15px;}
  .bottom_text{
    position: absolute;
    bottom:20px;
    width:100%;
    text-align:center;
    color:#aaa;
    font-size:12px;
  }
</style>
