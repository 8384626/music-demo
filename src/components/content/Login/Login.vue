<template>
  <transition name="LoginMove">
    <div class="login">
      <div class="login-close" @click="closeForm">
        <img src="~assets/img/navbar/close.svg" alt />
      </div>
      <div class="login-login">
        <img src="~assets/img/navbar/wyy-login.svg" alt />
      </div>
      <div class="login-forom">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="8px"
          class="demo-ruleForm"
        >
          <el-form-item prop="name">
            <el-input
              v-model="ruleForm.name"
              placeholder="请输入手机号码"
            ></el-input>
          </el-form-item>
          <el-form-item prop="pass">
            <el-input
              type="password"
              v-model="ruleForm.pass"
              autocomplete="off"
              placeholder="请输入密码"
            ></el-input>
          </el-form-item>
          <el-form-item class="form-button">
            <el-button type="danger" @click="submitForm">登录</el-button>
            <el-button>注册</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </transition>
</template>

<script>
import { requestLogin,getUserSongList } from "network/login.js";


export default {
  data() {
    return {
      ruleForm: {
        name: "",
        pass: "",
      },
      rules: {
        name: [
          { required: true, message: "请输入手机号码", trigger: "blur" },
          { min: 8, max: 12, message: "请输入正确的手机号码", trigger: "blur" },
        ],
        pass: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 16, message: "请输入正确的密码", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    // 提交表单数据
    submitForm() {
      this.$refs.ruleForm.validate((valid) => {
        if (!valid) return;
        this.Login({ phone: this.ruleForm.name, password: this.ruleForm.pass });
      });
    },
    // 关闭表单
    closeForm(){
      this.$store.commit('showLogin');
      this.$refs.ruleForm.resetFields();
    },
    // 调用网络请求
    Login(data) {
      requestLogin(data).then((res) => {
        if (res.code !== 200) return this.$message.error(res.msg);
        this.$store.commit("showLogin");
        this.$store.commit('addUserInfo', res);
        getUserSongList(res.profile.userId).then(res =>{
          this.$store.commit('addSonglist',res.playlist)
        })
        sessionStorage.setItem("cookie", res.cookie)
        // docCookies.setItem(cookie,res.cookie)
        // document.cookie =`cookie=${res.cookie}`
        this.$message.success("登录成功");
        this.ruleForm.name=''
        this.ruleForm.pass=''
      });
    },
  },
};
</script>

<style scoped>
.login {
  position: relative;
  width: 400px;
  height: 500px;
  border-radius: 20px;
  padding: 10px 20px;
  background-color: #eeeded;

}
.login-close {
  position: absolute;
  top: 10px;
  right: 20px;
}
.login-close img {
  width: 30px;
  height: 30px;
}
.login-login {
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
}
.login-login img {
  width: 250px;
  height: 250px;
  vertical-align: middle;
}
/* 设置表单区域 */
.login-forom {
  display: flex;
  justify-content: center;
  align-content: center;
  widows: 100%;
  height: 100%;
}
.demo-ruleForm {
  position: absolute;
  top: 55%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.form-button {
  margin-top: 5px;
  text-align: center;
}

/* 设置动画 */
.LoginMove-enter-active,
.LoginMove-leave-active {
  transition: opacity 0.2s ease-out;
}

.LoginMove-enter,
.LoginMove-leave-to {
  opacity: 0;
}
</style>