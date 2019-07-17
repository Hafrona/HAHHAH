<template>
  <div class="lgf">
    <el-form
      :model="user"
      status-icon
      :rules="rules"
      ref="form"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item prop="username" label-width="0px">
        <el-input type="username" v-model="user.username" auto-complete="off" placeholder="用户名/手机"></el-input>
      </el-form-item>
      <el-form-item prop="password" label-width="0px">
        <el-input type="password" v-model="user.password" auto-complete="off" placeholder="密码" @keyup.enter.native="UpUser"></el-input>
      </el-form-item>
      <el-form-item label-width="0px">
        <el-button type="primary" style="width:370px" @click="UpUser">登陆</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "用户名不能为空", trigger: "blur" }
        ],
        password: [{ required: true, message: "密码不能为空", trigger: "blur" }]
      }
    };
  },
  methods: {
    UpUser() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$store.dispatch("user/login",this.user)
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.lgf {
  padding: 10px;
  box-sizing: 0;
  .el-form-item {
    margin-top: 15px;
    padding: 5px;
  }
}
</style>

