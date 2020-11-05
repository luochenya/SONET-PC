<template>
  <div class="Registered">
    <div class="Registered_box response">
      <img
        class="Registered_box_logo"
        src="@/assets/img/header_logo_min.png"
        alt=""
      />
      <div class="Registered_box_right">
        <div class="Registered_box_right_content">
          <img
            class="Registered_box_right_content_logo"
            src="@/assets/img/img_logo_min.png"
            alt=""
          />
          <h2>註冊成為Dolfan會員</h2>
          <input
            type="text"
            placeholder="請輸入Email帳戶"
            @input="emailChange()"
            v-model="dataForm.email"
          />
          <div class="Registered_box_right_content_input">
            <input
              type="text"
              placeholder="請填寫驗證碼"
              v-model="dataForm.code"
            />
            <button v-if="!calssStatus" >
              獲取
            </button>
            <button v-if="calssStatus" @click="getCode()" class="active">
              獲取
            </button>
          </div>
          <input
            type="password"
            placeholder="輸入密碼"
            v-model="dataForm.password"
          />
          <input
            type="password"
            placeholder="請再次輸入密碼"
            v-model="dataForm.password_confirmation"
          />
          <input
            type="text"
            placeholder="請輸入暱稱"
            v-model="dataForm.nick_name"
          />
          <div
            class="Registered_box_right_content_checkout"
            @click="checkoutStatus = !checkoutStatus"
          >
            <div>
              <img v-if="checkoutStatus" src="@/assets/img/checkout.png" alt="" />
            </div>
            本人同意 Dolfan的 <i @click="privacyPolicyClick()">隱私政策</i>與<i @click="TermsClick()">使用條款</i>
          </div>
          <button
            class="Registered_box_right_content_button"
            @click="login()"
          >
            註冊
          </button>
          <!-- <div class="Registered_box_right_content_div">
            <span></span>
            <p>或</p>
            <img src="@/assets/img/dottedLine.png" alt="" />
          </div>
          <div class="Registered_box_right_content_icon">
            <img src="@/assets/img/fbIcon.png" alt="" />
            <img src="@/assets/img/ggIcon.png" alt="" />
          </div> -->
          <!-- <p
            class="Registered_box_right_content_p"
            @click="toForgetPassword()"
          >
            忘記密碼？
          </p> -->
        </div>
        <div class="Registered_box_right_registered">
          已有帳戶，
          <em @click="toLogin()">返回登入</em>
        </div>
        <div class="Registered_box_right_download">
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
import { POST_SendEmailConfirmation, POST_Create, GET_GetUserInfo } from "@/api/api";
export default {
  name: "Registered",
  components: {
    Bottom,
    Pupop
  },
  data() {
    return {
      dataForm: {
        email: "",
        code: "",
        password: "",
        password_confirmation: "",
        nick_name: ""
      },
      checkoutStatus: false,
      pupopStatus: false,
      calssStatus: false
    };
  },
  methods: {
    emailChange() {
      if (this.dataForm.email) {
        this.calssStatus = true;
      } else {
        this.calssStatus = false;
      }
    },
    // 关闭弹窗
    pupopClose() {
      this.pupopStatus = false;
    },
    // 获取验证码
    getCode() {
      // 判断不能为空
      if (!this.dataForm.email) {
        return this.$message({
          duration: 1500,
          message: "郵箱不能為空！",
          type: "warning"
        });
      }
      // 判断正则格式
      let emailVerification = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      if (!emailVerification.test(this.dataForm.email)) {
        return this.$message({
          duration: 1500,
          message: "郵箱格式錯誤！",
          type: "error"
        });
      }
      let form = {
        email: this.dataForm.email
      };
      POST_SendEmailConfirmation(form).then(res => {
        if (res.code == 200) {
          this.pupopStatus = true;
        }
      });
    },
    // 注册成功并登录
    login() {
      // 邮箱为空
      if (!this.dataForm.email) {
        return this.$message({
          duration: 1500,
          message: "郵箱不能為空！",
          type: "warning"
        });
      }
      // 密码为空
      if (!this.dataForm.password) {
        return this.$message({
          duration: 1500,
          message: "密碼不能為空！",
          type: "warning"
        });
      }
      // 确认密码为空
      if (this.dataForm.password != this.dataForm.password_confirmation) {
        return this.$message({
          duration: 1500,
          message: "確認密碼與密碼不一致！",
          type: "warning"
        });
      }
      // 昵称为空
      if (!this.dataForm.nick_name) {
        return this.$message({
          duration: 1500,
          message: "暱稱不能為空！",
          type: "warning"
        });
      }
      // 验证码为空
      if (!this.dataForm.code) {
        return this.$message({
          duration: 1500,
          message: "驗證碼不能為空！",
          type: "warning"
        });
      }
      if (!this.checkoutStatus) {
        return this.$message({
          duration: 1500,
          message: "請閱讀隱私政策！",
          type: "warning"
        });
      }
      POST_Create(this.dataForm).then(res => {
        if (res.code == 200) {
          sessionStorage.setItem("tokenType", res.data.token_type + " ");
          sessionStorage.setItem(
            "token",
            res.data.token_type + " " + res.data.token
          );
          // 获取个人信息
          GET_GetUserInfo().then(res => {
            if (res.code == 200) {
              sessionStorage.setItem("userInfo", JSON.stringify(res.data));
            }
          });
          this.$router.push({
            path: "/Home",
            query: {
              registered: true
            }
          });
          this.$message({
            duration: 1500,
            message: "註冊成功！",
            type: "success"
          });
        } else if (res.code == 401) {
          this.$message({
            duration: 1500,
            message: "驗證碼錯誤！",
            type: "error"
          });
        }
      });
    },
    // 跳转登录
    toLogin() {
      this.$router.push("/Login");
    },
    // 前往忘记密码
    toForgetPassword() {
      this.$router.push("/ForgetPassword");
    },
    // 使用条款点击
    TermsClick(e) {
      e = e || window.event;
      if (e.stopPropagation) {
        //W3C阻止冒泡方法
        e.stopPropagation();
      } else {
        e.cancelBubble = true; //IE阻止冒泡方法
      }
      window.open("http://sonet.twczw.website/privacy.html");
    },
    // 隐私政策点击
    privacyPolicyClick(e) {
      e = e || window.event;
      if (e.stopPropagation) {
        //W3C阻止冒泡方法
        e.stopPropagation();
      } else {
        e.cancelBubble = true; //IE阻止冒泡方法
      }
      window.open("http://sonet.twczw.website/privacy.html");
    }
  }
};
</script>

<style lang="scss" scoped>
.Registered {
  width: 100%;
  padding-bottom: 200px;
  min-height: 1080px;
  background: rgba(29, 179, 206, 0.03);
  position: relative;
  .Registered_box {
    min-height: 920px;
    display: flex;
    justify-content: center;
    position: relative;
    .Registered_box_logo {
      position: absolute;
      left: 0;
      top: 36px;
    }
    .Registered_box_right {
      margin-top: 200px;
      width: 378px;
      .Registered_box_right_content {
        width: 100%;
        padding: 32px 48px 14px;
        background: #ffffff;
        box-shadow: 0px 4px 4px -3px rgba(0, 0, 0, 0.15);
        border-radius: 10px 10px 0px 0px;
        border: 1px solid rgba(155, 161, 169, 0.5);
        text-align: center;
        .Registered_box_right_content_logo {
          width: 156px;
          height: 42px;
        }
        h2 {
          margin: 14px 0 22px;
          font-size: 19px;
          font-weight: 500;
          color: #585858;
          line-height: 26px;
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
        .Registered_box_right_content_button {
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
        .Registered_box_right_content_input {
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
        .Registered_box_right_content_div {
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
        .Registered_box_right_content_icon {
          display: flex;
          justify-content: center;
          img {
            cursor: pointer;
            width: 48px;
            height: 48px;
            margin: 0 15px;
          }
        }
        .Registered_box_right_content_p {
          margin-top: 18px;
          cursor: pointer;
          font-size: 14px;
          font-weight: 400;
          color: #c64040;
          line-height: 20px;
        }
        .Registered_box_right_content_checkout {
          cursor: pointer;
          margin: 7px 0;
          font-size: 14px;
          font-weight: 400;
          color: #585858;
          line-height: 22px;
          display: flex;
          align-items: center;
          div {
            margin-right: 6px;
            width: 20px;
            height: 20px;
            background: #ffffff;
            border-radius: 3px;
            border: 1px solid #1db3ce;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          i {
            color: #1db3ce;
            text-decoration: underline;
          }
        }
      }
      .Registered_box_right_registered {
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
      .Registered_box_right_download {
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
