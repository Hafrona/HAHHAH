<template>
  <div class="regr">
    <el-form
      :model="form"
      status-icon
      :rules="rules"
      ref="form"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label-width="0px" prop="username">
        <el-input type="username" v-model="form.username" auto-complete="off" placeholder="手机"></el-input>
      </el-form-item>
      <div style="margin-top: 15px;">
        <el-input placeholder="验证码" v-model="form.captcha">
          <el-button slot="append" @click.native="handleSendCaptcha">发送验证码</el-button>
        </el-input>
      </div>
      <el-form-item label-width="0px" prop="username">
        <el-input type="username" v-model="form.nickname" auto-complete="off" placeholder="你的名字"></el-input>
      </el-form-item>
      <el-form-item label-width="0px" prop="password">
        <el-input type="password" v-model="form.password" auto-complete="off" placeholder="密码"></el-input>
      </el-form-item>
      <el-form-item label-width="0px" prop="checkPassword">
        <el-input
          type="password"
          v-model="form.checkPassword"
          auto-complete="off"
          placeholder="确认密码"
        ></el-input>
      </el-form-item>
      <el-form-item label-width="0px">
        <el-button type="primary" style="width:370px" @click="handleRegSubmit">登陆</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.form.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      form: {
        username: "", // 登录用户名/手机
        password: "", // 登录密码
        checkPassword: "", // 确认密码
        nickname: "", // 昵称
        captcha: "" // 手机验证码
      },
      rules: {
        username: [
          {
            required: true,
            message: "手机号码不能为空",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur"
          }
        ],
        checkPassword: [
          // validator: 自定义的验证函数
          { validator: validatePass, trigger: "blur" }
        ],
        nickname: [
          {
            required: true,
            message: "请输入昵称",
            trigger: "blur"
          }
        ],
        captcha: [
          {
            required: true,
            message: "请输入验证码",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    //发送验证码
    handleSendCaptcha() {
      let phoneNumber = this.form.username;
      if (!phoneNumber.trim()) {
        this.$message.warning("手机号码不能为空");
        return;
      }
      this.$axios({
        url: "/captchas",
        method: "post",
        data: {
          tel: phoneNumber
        }
      }).then(res => {
        //弹框提示
        this.$alert(res.data.code, "提示", {
          confirmButtonText: "确定",
          callback: action => {
            this.$message({
              type: "success",
              message: `发送成功`
            });
          }
        })
      })
    },
    //登陆
    handleRegSubmit() {
      this.$refs.form.validate(valid =>{
        if(valid){
          //props是除了checkPassword以外的所有数据
          const {checkPassword, ...props}=this.form
          console.log(props)
          this.$axios({
            url:'/accounts/register',
            method:"post",
            data:props
          }).then(res =>{
            this.$store.commit("user/setuserInfo",res.data)
            this.$router.back()
          })
        }
      })
    }
  }
};
</script>

<style lang="less" scoped>
.regr {
  padding: 15px;
  .el-form-item {
    margin-top: 15px;
  }
}
</style>

