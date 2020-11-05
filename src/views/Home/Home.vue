<template>
  <div class="Home">
    <Header />
    <div class="response Home_box">
      <!-- 左侧栏 -->
      <LeftMenu />
      <!-- 左侧栏 -->

      <!-- 中间内容 -->
      <HeaderContent />
      <!-- 中间内容 -->

      <!-- 右侧栏 -->
      <RightMenu />
      <!-- 右侧栏 -->
    </div>
    <div class="Home_pupop" v-if="interestStatus">
      <div class="Home_pupop_boxdiv">
        <div class="Home_pupop_box">
          <h1 class="Home_pupop_box_h1">請選擇您的愛好</h1>
          <div class="Home_pupop_box_div">
            <div
              v-for="(item, index) in dataFormList"
              :key="index"
              @click="checkoutClick(index)"
            >
              <span></span>
              <img
                :class="checkoutList[index] ? '' : 'gray'"
                :src="item.img"
                alt=""
              />
              <!-- <img v-if="!checkoutList[index]" :src="item.img" alt="" />
              <img v-if="checkoutList[index]" :src="item.select_img" alt="" /> -->
              <p>{{ item.name }}</p>
            </div>
          </div>
          <button class="Home_pupop_box_button" @click="toUseTeaching()">
            下一步
          </button>
        </div>
      </div>
    </div>
    <div
      class="Home_swiper"
      v-if="swuperStatus"
      @click="closeInterestStatus()"
    >
      <div class="Home_swiper_div" @click="stopPropagation">
        <img
          class="Home_swiper_div_close"
          src="@/assets/img/btn_close.png"
          alt=""
          @click="swuperStatus = false"
        />
        <swiper
          :options="swiperOption"
          ref="mySwiper"
          class="Home_swiper_box"
        >
          <!-- slides -->
          <swiper-slide v-for="(item, index) in swiperList" :key="index">
            <div class="Home_swiper_box_div">
              <div class="Home_swiper_box_img">
                <img :src="item.img" alt="" />
              </div>
              <h1 class="Home_swiper_box_img_h1">{{ item.title }}</h1>
              <h2 class="Home_swiper_box_img_h2">{{ item.content }}</h2>
            </div>
          </swiper-slide>
          <!-- Optional controls -->
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
      </div>
    </div>
  </div>
</template>

<script>
import LeftMenu from "@/components/LeftMenu";
import RightMenu from "@/components/RightMenu";
import Header from "@/components/Header";
import HeaderContent from "./components/Home_content";
import {
  GET_GetCategoryLists,
  POST_SetUserCategory,
  GET_GetUserInfo,
  GET_GetNewUserTeaching
} from "@/api/api";
export default {
  name: "Home",
  components: {
    LeftMenu,
    Header,
    RightMenu,
    HeaderContent
  },
  data() {
    return {
      swiperOption: {
        // 参数选项,显示小点
        pagination: ".swiper-pagination",
        //点击小点切换
        paginationClickable: true,
        //循环
        loop: true,
        //每张播放时长3秒，自动播放
        autoplay: 2000,
        //滑动速度
        speed: 1000
        // delay:1000
      },
      swuperStatus: false,
      swiperList: [],
      dataFormList: [],
      checkoutList: [],
      category_ids: [],
      interestStatus: this.$route.query.registered ? true : false
      // interestStatus: true
    };
  },
  created() {
    // this.getUserInfo();
    this.loginOrRegistered();
    this.getNewUserTeaching();
  },
  methods: {
    // 點擊黑色關閉
    closeInterestStatus() {
      this.swuperStatus = false;
    },
    // 阻止事件冒泡
    stopPropagation(event) {
      event.stopPropagation();
    },
    loginOrRegistered() {
      if (this.$route.query.registered) {
        this.getCategoryLists();
      }
    },
    // 获取个人信息
    getUserInfo() {
      GET_GetUserInfo().then(res => {
        if (res.code == 200) {
          if (res.data.is_set_user_category == false) {
            this.interestStatus = true;
          }
        }
      });
    },
    // 获取新人指导
    getNewUserTeaching() {
      GET_GetNewUserTeaching().then(res => {
        if (res.code == 200) {
          this.swiperList = res.data.list;
        }
      });
    },
    // 获取感兴趣列表
    getCategoryLists() {
      GET_GetCategoryLists().then(res => {
        if (res.code == 200) {
          this.dataFormList = res.data.list;
          this.dataFormList.forEach((item, index) => {
            this.checkoutList.splice(index, 0, false);
          });
        }
      });
    },
    // 选择感兴趣的内容（选中或取消选中）
    checkoutClick(index) {
      this.checkoutList.splice(index, 1, !this.checkoutList[index]);
    },
    // 下一步
    toUseTeaching() {
      // 获取拿到的偏好ID组成数组
      this.checkoutList.forEach((item, index) => {
        if (item) {
          this.category_ids.push(this.dataFormList[index].id);
        }
      });
      let category_ids = this.category_ids.join(",");
      if (!category_ids) {
        return this.$message({
          duration: 1500,
          message: "請選擇您的愛好！",
          type: "warning"
        });
      }
      let form = {
        category_ids: category_ids
      };
      // 提交设置偏好
      POST_SetUserCategory(form).then(res => {
        if (res.code == 200) {
          this.interestStatus = false;
          this.swuperStatus = true;
        }
      });
    }
  }
};
</script>

<style lang="scss">
.Home {
  padding-top: 94px;
  padding-bottom: 14px;
  width: 100%;
  min-height: 100vh;
  background: #f6f7f8;
  .Home_box {
    display: flex;
    justify-content: space-between;
  }
  // 爱好选择弹窗
  .Home_pupop {
    z-index: 22;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.9);
    position: fixed;
    left: 0;
    top: 0;
    .Home_pupop_boxdiv {
      height: 100%;
      overflow-x: auto;
      width: 100%;
      position: relative;
    }
    .Home_pupop_box {
      position: absolute;
      left: 50%;
      // top: 50%;
      transform: translate(-50%, 0);
      width: 924px;
      padding: 50px 0;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      .Home_pupop_box_h1 {
        width: 100%;
        padding-bottom: 54px;
        font-size: 32px;
        font-weight: 500;
        color: #ffffff;
        line-height: 45px;
        letter-spacing: 2px;
      }
      .Home_pupop_box_div {
        display: flex;
        flex-wrap: wrap;
        div {
          border-radius: 10px;
          cursor: pointer;
          margin-bottom: 70px;
          margin-right: 120px;
          width: 228px;
          height: 158px;
          position: relative;
          .gray {
            -webkit-filter: grayscale(100%);
            -moz-filter: grayscale(100%);
            -ms-filter: grayscale(100%);
            -o-filter: grayscale(100%);
            filter: grayscale(100%);
            filter: gray;
          }
          span {
            border-radius: 10px;
            z-index: 2;
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.2);
          }
          img {
            border-radius: 10px;
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
          }
          p {
            z-index: 3;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            font-size: 20px;
            font-weight: 500;
            color: #ffffff;
            line-height: 28px;
            text-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
          }
        }
        div:nth-child(3n + 3) {
          margin-right: 0;
        }
      }
      .Home_pupop_box_button {
        width: 542px;
        height: 56px;
        background: #1db3ce;
        border-radius: 28px;
        font-size: 20px;
        font-weight: 500;
        color: #ffffff;
        line-height: 28px;
      }
    }
  }
  // 教学轮播弹窗
  .Home_swiper {
    z-index: 22;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.9);
    position: fixed;
    left: 0;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    .swiper-pagination-fraction,
    .swiper-pagination-custom,
    .swiper-container-horizontal > .swiper-pagination-bullets {
      bottom: 32px;
    }
    .Home_swiper_div {
      position: relative;
      .Home_swiper_div_close {
        position: absolute;
        right: 10px;
        top: 10px;
        z-index: 2;
        cursor: pointer;
      }
    }
    .Home_swiper_box {
      width: 600px;
      background: #ffffff;
      border-radius: 10px;
      .Home_swiper_box_div {
        width: 100%;
        padding: 78px 50px 82px;
        .Home_swiper_box_img {
          width: 100%;
          height: 300px;
          display: flex;
          justify-content: center;
          align-items: center;
          img {
            max-width: 100%;
            max-height: 100%;
          }
        }
        .Home_swiper_box_img_h1 {
          margin: 30px auto 15px;
          text-align: center;
          font-size: 24px;
          font-weight: 500;
          color: #000000;
          line-height: 33px;
        }
        .Home_swiper_box_img_h2 {
          font-size: 18px;
          text-align: center;
          font-weight: 400;
          color: #585858;
          line-height: 26px;
        }
      }
    }
  }
}
</style>
