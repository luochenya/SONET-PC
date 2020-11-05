<template>
  <div class="ResetPassword">
    <div class="ResetPassword_box response">
      <img
        class="ResetPassword_box_logo"
        src="@/assets/img/header_logo_min.png"
        alt=""
      />
      <div class="ResetPassword_box_div">
        <img
          class="ResetPassword_box_div_return"
          @click="toForgetPassword()"
          src="@/assets/img/btn_return.png"
          alt=""
        />
        <div class="ResetPassword_box_div_content">
          <img
            class="ResetPassword_box_div_content_logo"
            src="@/assets/img/ResetPassword.png"
            alt=""
          />
          <h1>重設密碼</h1>
          <h2>請輸入至少6位數的密碼</h2>
          <input type="password" placeholder="請輸入新密碼" v-model="dataForm.password" />
          <input type="password" placeholder="請再次輸入密碼" v-model="dataForm.password_confirmation" />
          <button @click="nextStep()">下一步</button>
        </div>
        <div class="ResetPassword_box_div_registered">
          <em @click="toLogin()">返回登入</em>
        </div>
        <div class="ResetPassword_box_div_download">
          <p>應用下載</p>
          <div>
            <img src="@/assets/img/appleIcon.png" alt="" />
            <p>
              Download on the
              <em>App Store</em>
            </p>
          </div>
          <div>
            <img src="@/assets/img/glogoIcon.png" alt="" />
            <p>
              GET IT ON
              <em>Google Play</em>
            </p>
          </div>
        </div>
      </div>
    </div>
    <Bottom />
    <Pupop v-if="pupopStatus" @submit="pupopClose">
      <template slot="body">
        <h1>密碼更新成功</h1>
        <h2>請您至登入頁面輸入新密碼，重新登入</h2>
      </template>
    </Pupop>
  </div>
</template>

<script>
import Bottom from "@/components/Bottom.vue";
import Pupop from "@/components/Pupop.vue";
import { POST_ForgotChangePassword } from "@/api/api";
export default {
  name: "ResetPassword",
  components: {
    Bottom,
    Pupop
  },
  data() {
    return {
      dataForm: {
        email: this.$route.query.email,
        code: this.$route.query.code,
        password: "",
        password_confirmation: ""
      },
      pupopStatus: false
    };
  },
  methods: {
    // 关闭弹窗
    pupopClose() {
      this.pupopStatus = false;
      this.$router.push("/Login");
    },
    // 下一步
    nextStep() {
      if (!this.dataForm.password) {
        return this.$message({
          duration: 1500,
          message: "密碼不能為空",
          type: "warning"
        });
      }
      if (!this.dataForm.password_confirmation) {
        return this.$message({
          duration: 1500,
          message: "確認密碼不能為空",
          type: "warning"
        });
      }
      if (this.dataForm.password != this.dataForm.password_confirmation) {
        return this.$message({
          duration: 1500,
          message: "兩個密碼不一致！",
          type: "warning"
        });
      }
      POST_ForgotChangePassword(this.dataForm).then(res => {
        if (res.code == 200) {
          this.pupopStatus = true;
        }
      });
    },
    // 返回上一页（跳转忘记密码）
    toForgetPassword() {
      this.$router.push({
        path: "/ForgetPassword",
        query: {
          email: this.dataForm.email,
          code: this.dataForm.code
        }
      });
    },
    // 跳转登录
    toLogin() {
      this.$router.push("/Login");
    }
  }
};
</script>

<style lang="scss" scoped>
.ResetPassword {
  width: 100%;
  min-height: 1080px;
  position: relative;
  background: rgba(29, 179, 206, 0.03);
  .ResetPassword_box {
    position: relative;
    display: flex;
    justify-content: center;
    .ResetPassword_box_logo {
      position: absolute;
      left: 0;
      top: 36px;
    }
    .ResetPassword_box_div {
      margin-top: 200px;
      width: 378px;
      position: relative;
      .ResetPassword_box_div_return {
        cursor: pointer;
        position: absolute;
        left: 26px;
        top: 22px;
        width: 16px;
        height: 16px;
      }
      .ResetPassword_box_div_content {
        width: 100%;
        padding: 25px 48px 44px;
        background: #ffffff;
        box-shadow: 0px 4px 4px -3px rgba(0, 0, 0, 0.15);
        border-radius: 10px 10px 0px 0px;
        border: 1px solid rgba(155, 161, 169, 0.5);
        text-align: center;
        .ResetPassword_box_div_content_logo {
          width: 88px;
          height: 88px;
        }
        h1 {
          margin: 9px 0 12px;
          font-size: 19px;
          font-weight: 500;
          color: #000000;
          line-height: 26px;
        }
        h2 {
          margin-bottom: 22px;
          font-size: 14px;
          font-weight: 400;
          color: #585858;
          line-height: 20px;
          height: 40px;
        }
        input {
          margin-bottom: 12px;
          padding: 0 24px;
          width: 100%;
          height: 38px;
          background: #f6f7f8;
          border-radius: 19px;
          border: 1px solid #c0cad3;
        }
        input::-webkit-input-placeholder {
          font-size: 14px;
          font-weight: 400;
          color: #9ba1a9;
          line-height: 20px;
        }
        input::-moz-placeholder {
          font-size: 14px;
          font-weight: 400;
          color: #9ba1a9;
          line-height: 20px;
        } /* firefox 19+ */
        input:-ms-input-placeholder {
          font-size: 14px;
          font-weight: 400;
          color: #9ba1a9;
          line-height: 20px;
        } /* Internet Explorer 10+ */
        input:-moz-placeholder {
          font-size: 14px;
          font-weight: 400;
          color: #9ba1a9;
          line-height: 20px;
        } /* firefox 14-18 */
        button {
          margin-top: 8px;
          width: 100%;
          height: 38px;
          background: #1db3ce;
          border-radius: 19px;
          font-size: 16px;
          font-weight: 500;
          color: #ffffff;
          line-height: 22px;
        }
        .ResetPassword_box_div_content_div {
          margin: 18px 0 20px;
          display: flex;
          align-items: center;
          span {
            width: 124px;
            height: 1px;
            background: #9ba1a9;
          }
          p {
            margin: 0 7px;
          }
          img {
            width: 126px;
            height: 2px;
          }
        }
        .ResetPassword_box_div_content_icon {
          margin-bottom: 18px;
          display: flex;
          justify-content: center;
          img {
            cursor: pointer;
            width: 48px;
            height: 48px;
            margin: 0 15px;
          }
        }
        .ResetPassword_box_div_content_p {
          cursor: pointer;
          font-size: 14px;
          font-weight: 400;
          color: #c64040;
          line-height: 20px;
        }
      }
      .ResetPassword_box_div_registered {
        margin-top: 10px;
        width: 100%;
        height: 66px;
        background: #ffffff;
        box-shadow: 0px 4px 4px -3px rgba(0, 0, 0, 0.15);
        border-radius: 0px 0px 10px 10px;
        border: 1px solid rgba(155, 161, 169, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #585858;
        line-height: 20px;
        em {
          cursor: pointer;
          color: #c64040;
        }
      }
      .ResetPassword_box_div_download {
        padding: 30px 27px 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
        p {
          padding: 30xp 0 18px;
          width: 100%;
          text-align: center;
          font-size: 14px;
          font-weight: 400;
          color: #585858;
          line-height: 20px;
        }
        div {
          margin-top: 18px;
          cursor: pointer;
          width: 152px;
          height: 56px;
          background: #000000;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          img {
            margin-left: 8px;
            margin-right: 2px;
            width: 28px;
            height: 28px;
          }
          p {
            text-align: left;
            font-size: 12px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #ffffff;
            line-height: 17px;
            em {
              display: block;
              font-size: 18px;
              font-family: PingFangSC-Medium, PingFang SC;
              font-weight: 500;
              color: #ffffff;
              line-height: 28px;
            }
          }
        }
      }
    }
  }
}
</style>
