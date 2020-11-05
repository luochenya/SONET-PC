<template>
  <div class="NotificationSettings_content">
    <div class="NotificationSettings_contents">
      <HeaderMenu />
      <div class="NotificationSettings_content_box">
        <h1>通知設定</h1>
        <div class="NotificationSettings_content_box_div">
          <div class="NotificationSettings_content_box_div_WebPush">
            <p>網頁推播</p>
            <img
              @click="WebPushClick()"
              :src="WebPush == 0 ? btnIsFlase : btnIsTrue"
              alt=""
            />
          </div>
          <h3 class="NotificationSettings_content_box_div_h3">基本功能</h3>
          <div class="NotificationSettings_content_box_div_basicSkills">
            <p>官方活動推播</p>
            <img
              @click="basicSkillsClick()"
              :src="dataForm.is_open_app_push == 0 ? btnIsFlase : btnIsTrue"
              alt=""
            />
          </div>
          <!-- <div class="NotificationSettings_content_box_div_basicSkills">
            <p>app推播</p>
            <img
              @click="appClick()"
              :src="dataForm.is_open_firebase_push == 0 ? btnIsFlase : btnIsTrue"
              alt=""
            />
          </div> -->
          <h3 class="NotificationSettings_content_box_div_h3">FC通知</h3>
          <div
            class="NotificationSettings_content_box_div_FCNotice"
            v-for="(item, index) in dataForm.fan_club_notice"
            :key="index"
          >
            <div>
              <img :src="item.avatar" alt="" />
              <p>{{ item.name }}</p>
            </div>
            <img
              @click="FCNoticeClick(index)"
              :src="item.is_fc_content_notice == 0 ? btnIsFlase : btnIsTrue"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderMenu from "@/components/HeaderMenu";
import { GET_GetNotice, POST_NoticeUpdate } from "@/api/api";
export default {
  name: "NotificationSettings_content",
  components: {
    HeaderMenu
  },
  data() {
    return {
      btnIsTrue: require("@/assets/img/btn_Turn_on.png"),
      btnIsFlase: require("@/assets/img/btn_Turn on_default.png"),
      WebPush: 0,
      basicSkills: false,
      FCNotice: false,
      dataForm: {}
    };
  },
  created() {
    this._getNotice();
  },
  methods: {
    // 获取通知设定列表
    _getNotice() {
      GET_GetNotice().then(res => {
        if (res.code == 200) {
          this.dataForm = res.data;
        }
      });
    },
    // 网页推播
    WebPushClick() {
      if (this.WebPush == 1) {
        this.WebPush = 0;
      } else {
        this.WebPush = 1;
      }
    },
    // 官方活动推播
    basicSkillsClick() {
      if (this.dataForm.is_open_app_push == 1) {
        this.dataForm.is_open_app_push = 0;
      } else {
        this.dataForm.is_open_app_push = 1;
      }
    },
    // APP推播
    appClick() {
      if (this.dataForm.is_open_firebase_push == 1) {
        this.dataForm.is_open_firebase_push = 0;
      } else {
        this.dataForm.is_open_firebase_push = 1;
      }
    },
    // FC通知
    FCNoticeClick(index) {
      if (this.dataForm.fan_club_notice[index].is_fc_content_notice == 1) {
        this.dataForm.fan_club_notice[index].is_fc_content_notice = 0;
      } else {
        this.dataForm.fan_club_notice[index].is_fc_content_notice = 1;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.NotificationSettings_content {
  width: 766px;
  height: 1018px;
  position: relative;
  overflow: hidden;
  .NotificationSettings_contents {
    position: absolute;
    left: 0;
    top: 0;
    right: -17px;
    bottom: 0;
    overflow-x: hidden;
    overflow-y: scroll;
    .NotificationSettings_content_box {
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
      .NotificationSettings_content_box_div {
        width: 100%;
        padding: 30px 154px 30px 90px;
        text-align: center;
        .NotificationSettings_content_box_div_WebPush {
          display: flex;
          align-items: center;
          justify-content: space-between;
          p {
            font-size: 15px;
            font-weight: bold;
            color: #000000;
            line-height: 21px;
          }
          img {
            cursor: pointer;
            width: 54px;
            height: 30px;
          }
        }
        .NotificationSettings_content_box_div_h3 {
          margin-top: 34px;
          margin-bottom: 10px;
          text-align: left;
          font-size: 14px;
          font-weight: 400;
          color: #585858;
          line-height: 20px;
        }
        .NotificationSettings_content_box_div_basicSkills {
          margin-bottom: 10px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          p {
            padding-left: 15px;
            font-size: 15px;
            font-weight: bold;
            color: #000000;
            line-height: 21px;
          }
          img {
            cursor: pointer;
            width: 54px;
            height: 30px;
          }
        }
        .NotificationSettings_content_box_div_FCNotice {
          margin-bottom: 18px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          div {
            height: 64px;
            display: flex;
            align-items: center;
            padding-left: 15px;
            p {
              margin-left: 15px;
              font-size: 15px;
              font-weight: bold;
              color: #000000;
              line-height: 21px;
            }
            img {
              width: 64px;
              height: 64px;
            }
          }
          img {
            cursor: pointer;
            width: 54px;
            height: 30px;
          }
        }
      }
    }
  }
}
</style>
