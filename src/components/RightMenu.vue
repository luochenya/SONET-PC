<template>
  <div class="RightMenu">
    <!-- 头像 -->
    <div class="RightMenu_personal">
      <div class="RightMenu_personal_header"></div>
      <div class="RightMenu_personal_content">
        <div class="RightMenu_personal_content_headerImg">
          <div @click="popupStatus = true">
            <span>
              <img src="@/assets/img/RightMenuUpdate.png" alt="" />
            </span>
            <img :src="userInfo.avatar" alt="" />
          </div>
          <p>{{userInfo.nick_name}}</p>
        </div>
        <div class="RightMenu_personal_content_num">
          <div>
            <p>100</p>
            <span>追蹤</span>
          </div>
          <i></i>
          <div>
            <p>100</p>
            <span>點數</span>
          </div>
        </div>
      </div>
    </div>
    <!-- 訂閱內容 -->
    <div class="RightMenu_Subscription">
      <h1>訂閱內容</h1>
      <div class="RightMenu_Subscription_content_overflow">
        <div class="RightMenu_Subscription_content">
          <div
            class="RightMenu_Subscription_content_box"
            v-for="(item, index) in SubscriptionList"
            :key="index"
          >
            <img
              class="RightMenu_Subscription_content_box_headerImg"
              :src="item.imgUrl"
              alt=""
            />
            <div class="RightMenu_Subscription_content_box_div">
              <h2>{{ item.name }}</h2>
              <h3>訂閱人數：{{ item.num }}</h3>
            </div>
            <p
              class="RightMenu_Subscription_content_box_p"
              v-if="item.status == 1"
            >
              已訂閱
            </p>
            <button
              class="RightMenu_Subscription_content_box_button"
              v-if="item.status == 0"
              @click="subscriptionClick(5)"
            >
              <img src="@/assets/img/RightMenu3.png" alt="" />
              訂閱
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- 热门推荐 -->
    <div class="RightMenu_Subscription">
      <h1>熱門推薦</h1>
      <div class="RightMenu_Subscription_content_overflow">
        <div class="RightMenu_Subscription_content">
          <div
            class="RightMenu_Subscription_content_box"
            v-for="(item, index) in recommendationList"
            :key="index"
          >
            <img
              class="RightMenu_Subscription_content_box_headerImg"
              :src="item.imgUrl"
              alt=""
            />
            <div class="RightMenu_Subscription_content_box_div">
              <h2>{{ item.name }}</h2>
              <h3>訂閱人數：{{ item.num }}</h3>
            </div>
            <p
              class="RightMenu_Subscription_content_box_p"
              v-if="item.status == 1"
            >
              已訂閱
            </p>
            <button
              class="RightMenu_Subscription_content_box_button"
              v-if="item.status == 0"
              @click="subscriptionClick(5)"
            >
              <img src="@/assets/img/RightMenu3.png" alt="" />
              訂閱
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 訂閲彈窗 -->
    <Subscription v-if="SubscriptionStatus" :fan_club_id="fan_club_id" />

    <!-- 头像上传 -->
    <div class="RightMenu_popup" v-if="popupStatus">
      <div class="RightMenu_popup_box">
        <img class="RightMenu_popup_box_close" src="@/assets/img/btn_close.png" @click="popupClose()" alt="" />
        <h1 class="RightMenu_popup_box_h1">編輯頭貼</h1>
        <div class="RightMenu_popup_box_headerImg">
          <div class="RightMenu_popup_box_headerImg_left">
            <img class="RightMenu_popup_box_headerImg_left_img" v-if="headerImg" :src="headerImg" alt="" />
            <div v-if="!headerImg">
              <el-upload action="" :show-file-list="false" :http-request="uploadImg">
                <button>選擇照片</button>
              </el-upload>
              <p>支持jpg、png格式的圖片</p>
            </div>
          </div>
          <div class="RightMenu_popup_box_headerImg_right">
            <div class="RightMenu_popup_box_headerImg_right_big">
              <img v-if="headerImg" :src="headerImg" alt="" />
            </div>
            <div class="RightMenu_popup_box_headerImg_right_in">
              <img v-if="headerImg" :src="headerImg" alt="" />
            </div>
            <div class="RightMenu_popup_box_headerImg_right_small">
              <img v-if="headerImg" :src="headerImg" alt="" />
            </div>
            <button class="RightMenu_popup_box_headerImg_right_button" @click="openImg()">預覽</button>
          </div>
        </div>
        <button :class="headerImg ? 'RightMenu_popup_box_button_active RightMenu_popup_box_button' : 'RightMenu_popup_box_button'" @click="headerImgSubmit()">儲存</button>
      </div>
    </div>
  </div>
</template>

<script>
import Subscription from "@/components/Subscription";
import { GET_GetGrade, POST_Subscribe, POST_Unsubscribe, UPLOAD_Upload, POST_UpdateInfo, GET_GetUserInfo } from "@/api/api";
export default {
  name: "RightMenu",
  components: {
    Subscription
  },
  data() {
    return {
      SubscriptionStatus: false,
      fan_club_id: "",
      popupStatus: false,
      headerImg: "",
      userInfo: JSON.parse(sessionStorage.getItem("userInfo")),
      SubscriptionList: [
        {
          imgUrl: require("@/assets/img/RightMenu2.png"),
          name: "周杰伦",
          num: "12k",
          status: 1
        },
        {
          imgUrl: require("@/assets/img/RightMenu2.png"),
          name: "周杰伦",
          num: "12k",
          status: 1
        },
        {
          imgUrl: require("@/assets/img/RightMenu2.png"),
          name: "周杰伦",
          num: "12k",
          status: 1
        },
        {
          imgUrl: require("@/assets/img/RightMenu2.png"),
          name: "周杰伦",
          num: "12k",
          status: 1
        },
        {
          imgUrl: require("@/assets/img/RightMenu2.png"),
          name: "周杰伦",
          num: "12k",
          status: 1
        },
        {
          imgUrl: require("@/assets/img/RightMenu2.png"),
          name: "周杰伦",
          num: "12k",
          status: 1
        },
        {
          imgUrl: require("@/assets/img/RightMenu2.png"),
          name: "周杰伦",
          num: "12k",
          status: 1
        },
        {
          imgUrl: require("@/assets/img/RightMenu2.png"),
          name: "周杰伦",
          num: "12k",
          status: 1
        },
        {
          imgUrl: require("@/assets/img/RightMenu2.png"),
          name: "周杰伦",
          num: "12k",
          status: 1
        }
      ],
      recommendationList: [
        {
          imgUrl: require("@/assets/img/RightMenu2.png"),
          name: "周杰伦",
          num: "12k",
          status: 0
        },
        {
          imgUrl: require("@/assets/img/RightMenu2.png"),
          name: "周杰伦",
          num: "12k",
          status: 0
        },
        {
          imgUrl: require("@/assets/img/RightMenu2.png"),
          name: "周杰伦",
          num: "12k",
          status: 0
        },
        {
          imgUrl: require("@/assets/img/RightMenu2.png"),
          name: "周杰伦",
          num: "12k",
          status: 0
        },
        {
          imgUrl: require("@/assets/img/RightMenu2.png"),
          name: "周杰伦",
          num: "12k",
          status: 0
        },
        {
          imgUrl: require("@/assets/img/RightMenu2.png"),
          name: "周杰伦",
          num: "12k",
          status: 0
        },
        {
          imgUrl: require("@/assets/img/RightMenu2.png"),
          name: "周杰伦",
          num: "12k",
          status: 0
        },
        {
          imgUrl: require("@/assets/img/RightMenu2.png"),
          name: "周杰伦",
          num: "12k",
          status: 0
        },
        {
          imgUrl: require("@/assets/img/RightMenu2.png"),
          name: "周杰伦",
          num: "12k",
          status: 0
        }
      ]
    };
  },
  created() {
    this._getUserInfo()
  },
  methods: {
    // 訂閲變更
    subscriptionClick(id) {
      this.fan_club_id = id
      this.SubscriptionStatus = true
    },
    // 获取个人信息
    _getUserInfo() {
      GET_GetUserInfo().then(res => {
        if (res.code == 200) {
          sessionStorage.setItem("userInfo", JSON.stringify(res.data));
        }
      });
    },
    // 头像弹窗关闭
    popupClose() {
      this.popupStatus = false;
      this.headerImg = ""
    },
    // 头像储存提交
    headerImgSubmit() {
      if (!this.headerImg) {
        return false;
      }
      this.userInfo.avatar = this.headerImg
      this.userInfo.region_ids = this.userInfo.region_ids.toString()
      POST_UpdateInfo(this.userInfo).then(res => {
        if (res.code == 200) {
          sessionStorage.setItem("userInfo", JSON.stringify(res.data));
          this.popupClose();
        }
      });
    },
    // 头像预览
    openImg() {
      if (!this.headerImg) {
        return false;
      }
      window.open(this.headerImg);
    },
    // 头像上传
    uploadImg (file) {
      const isJPG = 'jpg,gif,png'
      const name = file.file.name.split('.')
      const imgName = name[name.length - 1]
      if (isJPG.indexOf(imgName.toLowerCase()) === -1) {
        this.$message.error('上傳頭像圖片只能是 jpg/gig/png 格式!')
        return false
      }
      const isLt2M = file.file.size / 1024 / 1024 < 10
      if (!isLt2M) {
        this.$message.error('上傳圖片大小不能超過 10MB!')
        return false
      }
      var UploadData = new FormData()
      UploadData.append('upload_file', file.file)
      UPLOAD_Upload(UploadData).then(res => {
        if (res.code == 200) {
          this.headerImg = res.data
          console.log(this.headerImg)
        }
      })
    },
  }
};
</script>

<style lang="scss" scoped>
.RightMenu {
  width: 270px;
  .RightMenu_personal {
    width: 100%;
    height: 194px;
    background: #ffffff;
    .RightMenu_personal_header {
      width: 100%;
      height: 75px;
      background: transparent url("../assets/img/RightMenu.png") center
        center no-repeat;
      background-size: cover;
    }
    .RightMenu_personal_content {
      width: 100%;
      height: 119px;
      position: relative;
      .RightMenu_personal_content_headerImg {
        position: absolute;
        left: 50%;
        top: -31px;
        transform: translate(-50%, 0);
        div {
          cursor: pointer;
          width: 62px;
          height: 62px;
          position: relative;
          span {
            position: absolute;
            width: 62px;
            height: 62px;
            background: rgba(0, 0, 0, 0.4);
            display: none;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            img {
              width: 24px;
              height: 24px;
            }
          }
          img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
          }
        }
        div:hover {
          span {
            display: flex;
          }
        }
        p {
          margin-top: 6px;
          font-size: 14px;
          font-weight: 500;
          color: #000000;
          line-height: 20px;
          text-align: center;
        }
      }
      .RightMenu_personal_content_num {
        position: absolute;
        top: 65px;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        div {
          text-align: center;
          font-size: 16px;
          font-weight: bold;
          color: #000000;
          line-height: 20px;
          span {
            font-size: 12px;
            color: #585858;
          }
        }
        i {
          margin: 0 40px;
          height: 33px;
          width: 1px;
          background: #f6f7f8;
        }
      }
    }
  }
  .RightMenu_Subscription {
    margin: 10px 0;
    width: 100%;
    height: 402px;
    background: #ffffff;
    h1 {
      padding: 18px 18px 6px;
      border-bottom: 1px solid #f6f7f8;
      font-size: 16px;
      font-weight: bold;
      color: #000000;
      line-height: 22px;
    }
    .RightMenu_Subscription_content_overflow {
      position: relative;
      overflow: hidden;
      height: 354px;
      .RightMenu_Subscription_content {
        padding: 6px 18px;
        position: absolute;
        left: 0;
        top: 0;
        right: -17px;
        bottom: 0;
        overflow-x: hidden;
        overflow-y: scroll;
        .RightMenu_Subscription_content_box {
          display: flex;
          align-items: center;
          padding: 10px 0;
          .RightMenu_Subscription_content_box_headerImg {
            margin-right: 12px;
            width: 40px;
            height: 40px;
          }
          .RightMenu_Subscription_content_box_div {
            h2 {
              font-size: 15px;
              font-weight: 400;
              color: #000000;
              line-height: 22px;
            }
            h3 {
              font-size: 12px;
              font-weight: 400;
              color: #9ba1a9;
              line-height: 18px;
            }
          }
          .RightMenu_Subscription_content_box_p {
            margin-left: auto;
            font-size: 14px;
            font-weight: 400;
            color: #9ba1a9;
            line-height: 20px;
          }
          .RightMenu_Subscription_content_box_button {
            cursor: pointer;
            margin-left: auto;
            width: 70px;
            height: 30px;
            background: #1db3ce;
            box-shadow: 0px 1px 2px 0px rgba(29, 179, 206, 0.2);
            border-radius: 16px;
            font-size: 14px;
            font-weight: 400;
            color: #ffffff;
            line-height: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            img {
              margin-right: 4px;
            }
          }
        }
        // .RightMenu_Subscription_content_box::-webkit-scrollbar {
        //   display: none;
        // }
      }
    }
  }
  .RightMenu_SubscriptionPlan {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 30;
    display: flex;
    align-items: center;
    justify-content: center;
    .RightMenu_SubscriptionPlan_box {
      padding: 60px;
      width: 692px;
      overflow: hidden;
      background: #ffffff;
      border-radius: 10px;
      .RightMenu_SubscriptionPlan_box_img {
        cursor: pointer;
        position: absolute;
        right: 26px;
        top: 26px;
      }
      .RightMenu_SubscriptionPlan_box_h1 {
        font-size: 24px;
        font-weight: 400;
        color: #000000;
        line-height: 33px;
        text-align: center;
      }
      .RightMenu_SubscriptionPlan_box_h2 {
        margin: 20px 0 24px;
        font-size: 16px;
        font-weight: 400;
        color: #585858;
        line-height: 22px;
      }
      .RightMenu_SubscriptionPlan_box_box {
        position: relative;
        overflow: hidden;
        height: 416px;
        width: 100%;
        .RightMenu_SubscriptionPlan_box_box_div {
          position: absolute;
          left: 0;
          top: 0;
          right: -17px;
          bottom: 0;
          overflow-x: hidden;
          overflow-y: scroll;
          .RightMenu_SubscriptionPlan_box_div {
            padding: 24px 0;
            height: 104px;
            width: 100%;
            border-top: 1px solid #f6f7f8;
            display: flex;
            align-items: center;
            justify-content: space-between;
            div {
              font-size: 16px;
              font-weight: 400;
              color: #000000;
              line-height: 28px;
              span {
                color: #585858;
              }
            }
            .RightMenu_SubscriptionPlan_box_div_subscriptionCancel {
              font-size: 16px;
              font-weight: bold;
              color: #1db3ce;
              line-height: 22px;
            }
            .RightMenu_SubscriptionPlan_box_div_subscription {
              width: 120px;
              height: 56px;
              background: #1db3ce;
              border-radius: 28px;
              font-size: 16px;
              font-weight: bold;
              color: #ffffff;
              line-height: 22px;
            }
          }
        }
      }
    }
  }
  .RightMenu_SubscriptionPlanCancel {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 30;
    display: flex;
    align-items: center;
    justify-content: center;
    .RightMenu_SubscriptionPlanCancel_box {
      padding: 62px 28px 44px;
      width: 378px;
      background: #ffffff;
      border-radius: 10px;
      text-align: center;
      img {
        width: 118px;
        height: 118px;
      }
      h1 {
        margin-top: 34px;
        margin-bottom: 12px;
        font-size: 24px;
        font-weight: bold;
        color: #000000;
        line-height: 33px;
      }
      h2 {
        font-size: 18px;
        font-weight: 400;
        color: #585858;
        line-height: 25px;
        letter-spacing: 1px;
      }
      div {
        display: flex;
        justify-content: space-between;
        margin-top: 35px;
        button {
          width: 140px;
          height: 56px;
          background: #1db3ce;
          border-radius: 28px;
          font-size: 20px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #ffffff;
          line-height: 28px;
        }
        .cancel {
          opacity: 0.2;
        }
      }
    }
  }
  .RightMenu_popup {
    z-index: 10;
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    .RightMenu_popup_box {
      position: relative;
      padding: 30px 63px;
      width: 692px;
      background: #FFFFFF;
      border-radius: 10px;
      text-align: center;
      .RightMenu_popup_box_close {
        cursor: pointer;
        position: absolute;
        right: 26px;
        top: 26px;
        width: 16px;
        height: 16px;
      }
      .RightMenu_popup_box_h1 {
        margin: 20px 0;
        font-size: 24px;
        font-weight: 400;
        color: #000000;
        line-height: 33px;
      }
      .RightMenu_popup_box_headerImg {
        display: flex;
        justify-content: space-between;
        .RightMenu_popup_box_headerImg_left {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          width: 430px;
          height: 430px;
          background: #F6F7F8;
          .RightMenu_popup_box_headerImg_left_img {
            width: 100%;
            height: 100%;
          }
          div {
            button {
              width: 140px;
              height: 50px;
              background: #1DB3CE;
              border-radius: 28px;
              font-size: 16px;
              font-weight: 400;
              color: #FFFFFF;
              line-height: 22px;
            }
            p {
              margin-top: 8px;
              font-size: 16px;
              font-weight: 400;
              color: #585858;
              line-height: 28px;
            }
          }
        }
        .RightMenu_popup_box_headerImg_right {
          width: 134px;
          height: 430px;
          background: #F6F7F8;
          .RightMenu_popup_box_headerImg_right_big {
            margin: 50px auto 40px;
            width: 82px;
            height: 82px;
            background: #C0CAD3;
            border: 2px solid #FFFFFF;
            border-radius: 50%;
            img {
              width: 100%;
              height: 100%;
              border-radius: 50%;
            }
          }
          .RightMenu_popup_box_headerImg_right_in {
            margin: 0 auto;
            width: 62px;
            height: 62px;
            background: #C0CAD3;
            border: 2px solid #FFFFFF;
            border-radius: 50%;
            img {
              width: 100%;
              height: 100%;
              border-radius: 50%;
            }
          }
          .RightMenu_popup_box_headerImg_right_small {
            margin: 40px auto 70px;
            width: 42px;
            height: 42px;
            background: #C0CAD3;
            border: 2px solid #FFFFFF;
            border-radius: 50%;
            img {
              width: 100%;
              height: 100%;
              border-radius: 50%;
            }
          }
          .RightMenu_popup_box_headerImg_right_button {
            font-size: 16px;
            font-weight: 400;
            color: #585858;
            line-height: 28px;
          }
        }
      }
      .RightMenu_popup_box_button {
        margin-top: 30px;
        width: 282px;
        height: 56px;
        background: #1DB3CE;
        border-radius: 28px;
        opacity: 0.3;
        font-size: 16px;
        font-weight: bold;
        color: #FFFFFF;
        line-height: 22px;
      }
      .RightMenu_popup_box_button_active {
        opacity: 1;
      }
    }
  }
}
</style>
