<template>
  <div class="Header">
    <div class="Header_box response">
      <div class="Header_box_left">
        <img
          class="Header_box_left_img"
          src="@/assets/img/header_logo.png"
          alt=""
        />
        <!-- <div class="Header_box_left_input">
          <input type="text" placeholder="大家都在搜：周興哲《小時候的我們》" />
          <img src="@/assets/img/header_search.png" alt="" />
        </div> -->
      </div>
      <div class="Header_box_right">
        <div>
          <img
            v-if="$route.path == '/Home'"
            src="@/assets/img/header_home_selected.png"
            alt=""
          />
          <img
            v-else
            @click="toroute('/Home')"
            src="@/assets/img/header_home.png"
            alt=""
          />
        </div>
        <div>
          <img src="@/assets/img/header_searchs.png" alt="" />
        </div>
        <div>
          <img src="@/assets/img/header_chat.png" alt="" />
        </div>
        <div>
          <img src="@/assets/img/header_shopping.png" alt="" />
        </div>
        <div>
          <img class="user_selected" src="@/assets/img/header_user_selected.png" alt="" />
          <img class="user" src="@/assets/img/header_user.png" alt="" />
          <p>
            <span></span>
            <button>創建FC</button>
            <button @click="dropOut()">登出帳號</button>
          </p>
        </div>
        <div>
          繁中
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
  methods: {
    toroute(route) {
      this.$router.push(route);
    },
    // 退出登录
    dropOut() {
      // 清空token
      sessionStorage.removeItem("token");
      // 跳转登录
      this.$router.push("Login");
    }
  }
};
</script>

<style lang="scss" scoped>
.Header {
  z-index: 10;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 84px;
  background: #ffffff;
  box-shadow: 0px 1px 20px 0px rgba(0, 0, 0, 0.1);
  .Header_box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .Header_box_left {
      display: flex;
      .Header_box_left_img {
        width: 119px;
        height: 32px;
      }
      .Header_box_left_input {
        margin-left: 26px;
        width: 358px;
        height: 40px;
        border-radius: 20px;
        background: #ffffff;
        border: 1px solid #1db3ce;
        position: relative;
        input {
          padding: 0 64px 0 24px;
          width: 100%;
          height: 100%;
          position: absolute;
          left: 0;
          top: 0;
          font-size: 14px;
          font-weight: 400;
          color: #9ba1a9;
          line-height: 20px;
        }
        img {
          cursor: pointer;
          position: absolute;
          top: 8px;
          right: 16px;
          width: 24px;
          height: 24px;
        }
      }
    }
    .Header_box_right {
      display: flex;
      div {
        cursor: pointer;
        margin-left: 44px;
        font-size: 14px;
        font-weight: 400;
        color: #585858;
        line-height: 24px;
        letter-spacing: 4px;
        position: relative;
        img {
          width: 24px;
          height: 24px;
        }
        p {
          display: none;
          position: absolute;
          top: 35px;
          left: 50%;
          transform: translate(-50%, 0);
          width: 170px;
          padding: 8px 3px;
          border-radius: 2px;
          background: rgba(0, 0, 0, 0.9);
          box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.2);
          button {
            display: block;
            width: 100%;
            height: 40px;
            font-size: 14px;
            font-weight: 400;
            color: #ffffff;
            line-height: 40px;
          }
          button:hover {
            background: rgba(255, 255, 255, 0.2);
          }
          span {
            position: absolute;
            left: 50%;
            top: -11px;
            transform: translate(-50%, 0);
            width: 0;
            height: 0;
            border-width: 0 11px 11px;
            border-style: solid;
            border-color: transparent transparent rgba(0, 0, 0, 0.9);
          }
        }
        .user_selected {
          display: none;
        }
      }
      div:hover {
        p {
          display: block;
        }
        .user_selected {
          display: block;
        }
        .user {
          display: none;
        }
      }
    }
  }
}
</style>
