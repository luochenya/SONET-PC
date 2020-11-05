<template>
  <div class="ForgetPassword">
    <div class="ForgetPassword_div response">
      <img
        class="ForgetPassword_div_logo"
        src="@/assets/img/header_logo_min.png"
        alt=""
      />
      <div class="ForgetPassword_box">
        <div class="ForgetPassword_box_content">
          <img
            class="ForgetPassword_box_content_logo"
            src="@/assets/img/ForgetPassword.png"
            alt=""
          />
          <h1>忘記Dolfan密碼</h1>
          <h2>請輸入您的電子信箱，方便我們寄送驗證碼給您</h2>
          <input type="text" placeholder="請輸入您的電子信箱" v-model="email" />
          <div class="ForgetPassword_box_content_input">
            <input type="text" placeholder="請填寫驗證碼" v-model="code" />
            <button v-if="!email">
              獲取
            </button>
            <button v-if="email" @click="getCode()" class="active">
              獲取
            </button>
          </div>
          <button
            class="ForgetPassword_box_content_button"
            @click="toResetPassword()"
          >
            下一步
          </button>
        </div>
        <div class="ForgetPassword_box_registered">
          <em @click="toLogin()">返回登入</em>
        </div>
        <div class="ForgetPassword_box_download">
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
        <h1>驗證碼寄出</h1>
        <h2>驗證碼已寄至您的信箱，請前往收信</h2>
      </template>
    </Pupop>
  </div>
</template>

<script>
import Bottom from "@/components/Bottom.vue";
import Pupop from "@/components/Pupop.vue";
import { POST_ForgotPassword, POST_VerificationCode } from "@/api/api";
export default {
  name: "ForgetPassword",
  components: {
    Bottom,
    Pupop
  },
  data() {
    return {
      email: this.$route.query.email ? this.$route.query.email : "",
      code: this.$route.query.code ? this.$route.query.code : "",
      pupopStatus: false
    };
  },
  methods: {
    // 关闭弹窗
    pupopClose() {
      this.pupopStatus = false;
    },
    // 获取验证码
    getCode() {
      // 判断不能为空
      if (!this.email) {
        return this.$message({
          duration: 1500,
          message: "郵箱不能為空！",
          type: "warning"
        });
      }
      // 判断正则格式
      let emailVerification = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      if (!emailVerification.test(this.email)) {
        return this.$message({
          duration: 1500,
          message: "郵箱格式錯誤！",
          type: "warning"
        });
      }
      let form = {
        email: this.email
      };
      POST_ForgotPassword(form).then(res => {
        if (res.code == 200) {
          this.pupopStatus = true;
        }
      });
    },
    // 返回登陆
    toLogin() {
      this.$router.push("/Login");
    },
    // 下一步
    toResetPassword() {
      if (!this.email) {
        return this.$message({
          duration: 1500,
          message: "郵箱不能為空！",
          type: "warning"
        });
      }
      if (!this.code) {
        return this.$message({
          duration: 1500,
          message: "驗證碼不能為空！",
          type: "warning"
        });
      }
      let form = {
        email: this.email,
        code: this.code
      };
      POST_VerificationCode(form).then(res => {
        if (res.code == 200) {
          this.$router.push({
            path: "/ResetPassword",
            query: {
              email: this.email,
              code: this.code
            }
          });
        } else {
          return this.$message({
            duration: 1500,
            message: "驗證碼錯誤！",
            type: "error"
          });
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.ForgetPassword {
  width: 100%;
  min-height: 1080px;
  background: rgba(29, 179, 206, 0.03);
  position: relative;
  .ForgetPassword_div {
    display: flex;
    justify-content: center;
    position: relative;
    .ForgetPassword_div_logo {
      position: absolute;
      left: 0;
      top: 36px;
    }
    .ForgetPassword_box {
      margin-top: 200px;
      width: 378px;
      .ForgetPassword_box_content {
        width: 100%;
        padding: 25px 48px 44px;
        background: #ffffff;
        box-shadow: 0px 4px 4px -3px rgba(0, 0, 0, 0.15);
        border-radius: 10px 10px 0px 0px;
        border: 1px solid rgba(155, 161, 169, 0.5);
        text-align: center;
        .ForgetPassword_box_content_logo {
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
        .ForgetPassword_box_content_button {
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
        .ForgetPassword_box_content_input {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
          input {
            margin-bottom: 0;
            padding: 0 24px;
            width: 70%;
            height: 38px;
            background: #f6f7f8;
            border-radius: 19px;
            border: 1px solid #c0cad3;
          }
          button {
            width: 25%;
            height: 38px;
            background: rgba(29, 179, 206, 0.3);
            border-radius: 19px;
            font-size: 16px;
            font-weight: 500;
            color: #ffffff;
            line-height: 22px;
          }
          .active {
            background: rgba(29, 179, 206, 1);
          }
        }
        .ForgetPassword_box_content_div {
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
        .ForgetPassword_box_content_icon {
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
        .ForgetPassword_box_content_p {
          cursor: pointer;
          font-size: 14px;
          font-weight: 400;
          color: #c64040;
          line-height: 20px;
        }
      }
      .ForgetPassword_box_registered {
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
      .ForgetPassword_box_download {
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
