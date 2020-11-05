<template>
  <div class="LeftMenu">
    <div class="LeftMenu_box">
      <div class="LeftMenu_menu" v-for="(item, index) in dataList" :key="index">
        <h1>{{ item.title }}</h1>
        <p
          :class="$route.path == items.route ? 'active' : ''"
          @click="goToRouter(items.route)"
          v-for="(items, index) in item.contentList"
          :key="index"
        >
          <img :src="items.imgUrl" alt="" />
          {{ items.text }}
        </p>
      </div>
    </div>
    <div class="LeftMenu_close" @click="dropOut()">
      <img src="@/assets/img/notice_icon16.png" alt="" />
      登出帳號
    </div>
  </div>
</template>

<script>
export default {
  name: "LeftMenu",
  data() {
    return {
      dataList: [
        {
          title: "訊息中心",
          contentList: [
            {
              imgUrl: require("@/assets/img/notice_icon.png"),
              text: "通知設定",
              route: "/NotificationSettings"
            },
            {
              imgUrl: require("@/assets/img/notice_icon1.png"),
              text: "系統公告",
              route: "/SystemNotification"
            }
          ]
        },
        {
          title: "基本功能",
          contentList: [
            {
              imgUrl: require("@/assets/img/notice_icon2.png"),
              text: "帳號設定",
              route: "/AccountSettings"
            },
            {
              imgUrl: require("@/assets/img/notice_icon3.png"),
              text: "變更密碼",
              route: "/ChangePassword"
            },
            {
              imgUrl: require("@/assets/img/notice_icon4.png"),
              text: "偏好設定",
              route: "/Preferences"
            },
            {
              imgUrl: require("@/assets/img/notice_icon5.png"),
              text: "使用Q&A",
              route: "/UseQA"
            }
          ]
        },
        {
          title: "電商功能",
          contentList: [
            {
              imgUrl: require("@/assets/img/notice_icon6.png"),
              text: "點數記錄",
              route: "/PointsRecord"
            },
            {
              imgUrl: require("@/assets/img/notice_icon7.png"),
              text: "購物記錄",
              route: ""
            },
            {
              imgUrl: require("@/assets/img/notice_icon8.png"),
              text: "點數商品",
              route: ""
            },
            {
              imgUrl: require("@/assets/img/notice_icon9.png"),
              text: "二手商品",
              route: ""
            },
            {
              imgUrl: require("@/assets/img/notice_icon10.png"),
              text: "電子票夾",
              route: ""
            },
            {
              imgUrl: require("@/assets/img/notice_icon11.png"),
              text: "禮物發送",
              route: "/GiftSending"
            },
            {
              imgUrl: require("@/assets/img/notice_icon12.png"),
              text: "邀請碼發送",
              route: "/SendInvitationCode"
            }
          ]
        },
        {
          title: "訂閱收藏",
          contentList: [
            {
              imgUrl: require("@/assets/img/notice_icon13.png"),
              text: "訂閱管理",
              route: "/SubscriptionManagement"
            },
            {
              imgUrl: require("@/assets/img/notice_icon14.png"),
              text: "動態收藏",
              route: ""
            },
            {
              imgUrl: require("@/assets/img/notice_icon15.png"),
              text: "轉蛋收藏",
              route: ""
            }
          ]
        }
      ]
    };
  },
  methods: {
    // 路由跳转
    goToRouter(path) {
      if (path == this.$route.path) {
        return false;
      }
      this.$router.push(path);
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
.LeftMenu {
  height: 1018px;
  width: 240px;
  background: #ffffff;
  position: relative;
  overflow: hidden;
  .LeftMenu_box {
    position: absolute;
    left: 0;
    top: 0;
    right: -17px;
    bottom: 66px;
    overflow-x: hidden;
    overflow-y: scroll;
  }
  .LeftMenu_menu {
    padding: 22px 0;
    border-bottom: 1px solid #f6f7f8;
    h1 {
      padding-left: 72px;
      font-size: 15px;
      font-weight: bold;
      color: #000000;
      line-height: 21px;
      margin-bottom: 12px;
    }
    p {
      cursor: pointer;
      padding-left: 72px;
      display: flex;
      align-items: center;
      height: 40px;
      font-size: 16px;
      font-weight: 400;
      color: #585858;
      line-height: 22px;
      img {
        width: 24px;
        height: 24px;
        margin-right: 8px;
      }
    }
    .active {
      padding-left: 68px;
      border-left: 4px solid #1db3ce;
      background: rgba(29, 179, 206, 0.1);
      font-size: 16px;
      font-weight: 400;
      color: #1db3ce;
      line-height: 22px;
    }
  }
  .LeftMenu_close {
    position: absolute;
    bottom: 0;
    left: 0;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 66px;
    font-size: 15px;
    font-weight: 400;
    color: #585858;
    line-height: 21px;
    img {
      width: 24px;
      height: 24px;
      margin-right: 6px;
    }
  }
}
</style>
