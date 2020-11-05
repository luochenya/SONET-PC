<template>
  <div class="ChangePassword_content">
    <div class="ChangePassword_contents">
      <HeaderMenu />
      <div class="ChangePassword_content_content">
        <h1>變更密碼</h1>
        <div class="ChangePassword_content_content_box">
          <div>
            <p>當前密碼</p>
            <input
              v-model="dataForm.old_password"
              type="password"
              placeholder="請輸入當前密碼"
            />
          </div>
          <div>
            <p>新密碼</p>
            <input
              v-model="dataForm.password"
              type="password"
              placeholder="新密碼不可用當前密碼"
            />
          </div>
          <div>
            <p>請再次輸入新密碼</p>
            <input
              v-model="dataForm.password_confirmation"
              type="password"
              placeholder="請再次輸入新密碼"
            />
          </div>
          <p class="ChangePassword_content_content_box_title">
            {{titleStatus}}
          </p>
          <button class="ChangePassword_content_content_box_button" @click="changePassword()">
            修改密碼
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderMenu from "@/components/HeaderMenu";
import { POST_ChangePassword } from "@/api/api.js";
export default {
  name: "ChangePassword_content",
  components: {
    HeaderMenu
  },
  data() {
    return {
      titleStatus: "",
      dataForm: {
        old_password: "",
        password: "",
        password_confirmation: ""
      }
    };
  },
  methods: {
    changePassword() {
      if (this.dataForm.password.length < 6) {
        return (this.titleStatus = "請輸入至少6位數的密碼");
      } else {
        this.titleStatus = "";
      }
      if (this.dataForm.password != this.dataForm.password_confirmation) {
        return (this.titleStatus = "新密碼與舊密碼不一致");
      } else {
        this.titleStatus = "";
      }
      POST_ChangePassword(this.dataForm).then(res => {
        if (res.code == 200) {
          this.$message({
            duration: 1500,
            message: "密碼修改成功，請重新登錄",
            type: "success"
          });
          // 清空token
          sessionStorage.removeItem("token");
          // 跳转登录
          this.$router.push("Login");
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.ChangePassword_content {
  width: 766px;
  height: 1018px;
  position: relative;
  overflow: hidden;
  .ChangePassword_contents {
    position: absolute;
    left: 0;
    top: 0;
    right: -17px;
    bottom: 0;
    overflow-x: hidden;
    overflow-y: scroll;
    .ChangePassword_content_content {
      margin-top: 10px;
      width: 100%;
      min-height: 875px;
      background: #fff;
      h1 {
        height: 63px;
        padding-left: 90px;
        border-bottom: 1px solid #f6f7f8;
        font-size: 20px;
        font-weight: bold;
        color: #000000;
        line-height: 63px;
      }
      .ChangePassword_content_content_box {
        width: 100%;
        padding: 6px 174px 30px 90px;
        text-align: center;
        div {
          p {
            text-align: left;
            padding: 24px 0 6px 15px;
            font-size: 16px;
            font-weight: bold;
            color: #585858;
            line-height: 22px;
          }
          input {
            padding: 0 30px;
            width: 100%;
            height: 40px;
            background: #f6f7f8;
            border-radius: 20px;
            font-size: 14px;
            font-weight: bold;
            color: #000000;
            line-height: 20px;
            letter-spacing: 1px;
          }
          input::-webkit-input-placeholder {
            /* WebKit browsers */
            font-size: 14px;
            font-weight: 400;
            color: #9ba1a9;
            line-height: 20px;
          }
          input::-moz-placeholder {
            /* Mozilla Firefox 19+ */
            font-size: 14px;
            font-weight: 400;
            color: #9ba1a9;
            line-height: 20px;
          }
          input:-ms-input-placeholder {
            /* Internet Explorer 10+ */
            font-size: 14px;
            font-weight: 400;
            color: #9ba1a9;
            line-height: 20px;
          }
        }
        .ChangePassword_content_content_box_title {
          text-align: left;
          padding-left: 15px;
          margin-top: 20px;
          font-size: 15px;
          font-weight: bold;
          color: #c64040;
          line-height: 21px;
        }
        .ChangePassword_content_content_box_button {
          margin: 70px auto 0;
          width: 290px;
          height: 56px;
          background: #1db3ce;
          box-shadow: 0px 6px 24px -8px rgba(29, 179, 206, 0.5);
          border-radius: 28px;
          font-size: 14px;
          font-weight: bold;
          color: #ffffff;
          line-height: 20px;
        }
      }
    }
  }
}
</style>
