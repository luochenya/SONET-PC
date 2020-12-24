<template>
  <div class="Login">
    <div class="Login_box response">
      <div class="Login_box_left">
        <img src="@/assets/img/img_logo.png" alt="" />
        <h1>立即登入，展開您的繽紛追星之旅吧！</h1>
      </div>
      <div class="Login_box_right">
        <div class="Login_box_right_content">
          <img
            class="Login_box_right_content_logo"
            src="@/assets/img/img_logo_min.png"
            alt=""
          />
          <h2>歡迎進入Dolfan的世界</h2>
          <input
            type="text"
            placeholder="請輸入Email帳戶"
            v-model="dataForm.email"
          />
          <input
            type="password"
            placeholder="輸入密碼"
            v-model="dataForm.password"
          />
          <button @click="loginClick()">登入</button>
          <div class="Login_box_right_content_div">
            <span></span>
            <p>或</p>
            <img src="@/assets/img/dottedLine.png" alt="" />
          </div>
          <fb-signin-button
            :params="fbSignInParams"
            @success="onSignInSuccess"
            @error="onSignInError"
          >
            <button class="Login_box_right_content_buttonFB">
              <!-- <img src="@/assets/img/fbIcon.png" alt="" /> -->
              <img src="@/assets/img/fbIcon1.png" alt="" />
              使用Facebook帳號登入
            </button>
          </fb-signin-button>
          <button
            class="Login_box_right_content_buttonGG google-signin-button"
            v-google-signin-button="clientId"
          >
            <!-- <img src="@/assets/img/ggIcon.png" alt="" /> -->
            <img src="@/assets/img/ggIcon1.png" alt="" />
            使用Google帳號登入
          </button>
          <!-- <div class="Login_box_right_content_icon">
            <fb-signin-button
              :params="fbSignInParams"
              @success="onSignInSuccess"
              @error="onSignInError"
            >
              <img src="@/assets/img/fbIcon.png" alt="" />
            </fb-signin-button>
            <img
              v-google-signin-button="clientId"
              class="google-signin-button"
              src="@/assets/img/ggIcon.png"
              alt=""
            />
          </div> -->
          <p class="Login_box_right_content_p" @click="toForgetPassword()">
            忘記密碼？
          </p>
        </div>
        <div class="Login_box_right_registered">
          還沒有帳戶？
          <em @click="toRegistered()">註冊</em>
        </div>
        <div class="Login_box_right_download">
          <p>應用下載</p>
          <div>
            <img src="@/assets/img/appleIcon1.png" alt="" />
            <!-- <img src="@/assets/img/appleIcon.png" alt="" />
            <p>
              Download on the
              <em>App Store</em>
            </p> -->
          </div>
          <div>
            <img src="@/assets/img/glogoIcon1.png" alt="" />
            <!-- <img src="@/assets/img/glogoIcon.png" alt="" />
            <p>
              GET IT ON
              <em>Google Play</em>
            </p> -->
          </div>
        </div>
      </div>
    </div>
    <Bottom />
  </div>
</template>

<script>
import Bottom from "@/components/Bottom.vue";
import GoogleSignInButton from "vue-google-signin-button-directive";
import jsonwebtoken from "jsonwebtoken";
import { POST_Login, POST_ThirdPartyLogin, GET_GetUserInfo } from "@/api/api";
export default {
  name: "Login",
  components: {
    Bottom
  },
  directives: {
    GoogleSignInButton
  },
  data() {
    return {
      fbSignInParams: {
        // scope: "email,user_likes",
        return_scopes: true
      },
      clientId:
        "1013532850136-tnqg9pau20ninqts0e70efq7ar6o2528.apps.googleusercontent.com",
      // 測試谷歌ID
      // "763411011541-2k3ndn3e9h1plo1ivcep0ckj9p46d5sk.apps.googleusercontent.com",
      dataForm: {
        email: "",
        password: ""
      }
    };
  },
  methods: {
    // fb登录成功
    onSignInSuccess(response) {
      let form = {
        open_id: response.authResponse.userID,
        type: "facebook"
      };
      POST_ThirdPartyLogin(form).then(res => {
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
              if (res.data.is_set_user_category == false) {
                this.$router.push({
                  path: "/Home",
                  query: {
                    registered: true
                  }
                });
              } else {
                this.$router.push("/Home");
              }
            }
          });
        }
      });
    },
    // fb登录报错
    onSignInError(error) {
      console.log(error);
    },
    // 谷歌登录成功
    OnGoogleAuthSuccess(idToken) {
      var jwt = require("jsonwebtoken");
      var form = jwt.decode(idToken);
      let data = {
        open_id: form.sub,
        type: "google",
        nick_name: form.name,
        email: form.email
      };
      POST_ThirdPartyLogin(data).then(res => {
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
              if (res.data.is_set_user_category == false) {
                this.$router.push({
                  path: "/Home",
                  query: {
                    registered: true
                  }
                });
              } else {
                this.$router.push("/Home");
              }
            }
          });
        }
      });
    },
    // 谷歌登录报错
    OnGoogleAuthFail(error) {
      console.log(error);
    },
    // 前往注册
    toRegistered() {
      this.$router.push("/Registered");
    },
    // 前往忘记密码
    toForgetPassword() {
      this.$router.push("/ForgetPassword");
    },
    // 登录
    loginClick() {
      POST_Login(this.dataForm).then(res => {
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
              if (res.data.is_set_user_category == false) {
                this.$router.push({
                  path: "/Home",
                  query: {
                    registered: true
                  }
                });
              } else {
                this.$router.push("/Home");
              }
            }
          });
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.Login {
  width: 100%;
  min-height: 1080px;
  background: rgba(29, 179, 206, 0.03);
  position: relative;
  .Login_box {
    width: 100%;
    min-height: 860px;
    display: flex;
    justify-content: center;
    .Login_box_left {
      margin-top: 300px;
      img {
        width: 227px;
        height: 61px;
      }
      h1 {
        font-size: 29px;
        font-weight: 500;
        color: #000000;
        line-height: 41px;
        letter-spacing: 1px;
      }
    }
    .Login_box_right {
      margin-top: 200px;
      margin-left: 100px;
      width: 378px;
      .Login_box_right_content {
        width: 100%;
        padding: 32px 48px 14px;
        background: #ffffff;
        box-shadow: 0px 4px 4px -3px rgba(0, 0, 0, 0.15);
        border-radius: 10px 10px 0px 0px;
        border: 1px solid rgba(155, 161, 169, 0.5);
        text-align: center;
        .Login_box_right_content_logo {
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
        .Login_box_right_content_div {
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
        .Login_box_right_content_buttonFB {
          padding-left: 13px;
          width: 100%;
          height: 40px;
          // background: #3656a3;
          background: #2553B4;
          box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.24), 0px 0px 2px 0px rgba(0, 0, 0, 0.12);
          font-size: 14px;
          font-weight: 500;
          color: #FFFFFF;
          line-height: 20px;
          border-radius: 2px;
          display: flex;
          align-items: center;
          img {
            margin-right: 27px;
          }
        }
        .Login_box_right_content_buttonGG {
          padding-left: 11px;
          margin-bottom: 18px;
          width: 100%;
          height: 38px;
          // background: #3e82f6;
          background: #FFFFFF;
          box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.24), 0px 0px 2px 0px rgba(0, 0, 0, 0.12);
          border-radius: 2px;
          display: flex;
          align-items: center;
          font-size: 14px;
          font-weight: 500;
          color: rgba(0, 0, 0, 0.54);
          line-height: 20px;
          img {
            margin-right: 24px;
          }
        }
        .Login_box_right_content_p {
          cursor: pointer;
          font-size: 14px;
          font-weight: 400;
          color: #c64040;
          line-height: 20px;
        }
      }
      .Login_box_right_registered {
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
      .Login_box_right_download {
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
          // width: 152px;
          // height: 56px;
          // background: #000000;
          // border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          img {
            width: 100%;
          }
          // img {
          //   margin-left: 8px;
          //   margin-right: 2px;
          //   width: 28px;
          //   height: 28px;
          // }
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
