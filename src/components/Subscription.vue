<template>
  <div class="Subscription">
    
    <!-- 訂閲方案彈窗 -->
    <div
      class="Subscription_Plan"
      v-if="SubscriptionPlanStatus"
      @click="SubscriptionPlanStatus = false"
    >
      <div class="Subscription_Plan_box" @click.stop="">
        <img
          class="Subscription_Plan_box_img"
          @click="SubscriptionPlanStatus = false"
          src="@/assets/img/btn_ close.png"
          alt=""
        />
        <h1 class="Subscription_Plan_box_h1">訂閱方案</h1>
        <h2 class="Subscription_Plan_box_h2">
          請選擇下列您想要訂閱的方案進行訂閱，訂閱後就可以查看更多詳細的內容喔！
        </h2>
        <div class="Subscription_Plan_box_box">
          <div class="Subscription_Plan_box_box_div">
            <div
              class="Subscription_Plan_box_div"
              v-for="(item, index) in SubscriptionPlanList"
              :key="index"
            >
              <div>
                <p>{{ item.name }}（{{ item.days }}日）</p>
                <span v-if="item.type == 'free'">免费</span>
                <span v-if="item.type == 'charge'">$ {{ item.price }}元</span>
              </div>
              <button
                v-if="item.is_subscribe"
                @click="OpenSubscriptionPlanCancel()"
                class="Subscription_Plan_box_div_subscriptionCancel"
              >
                取消訂閱
              </button>
              <button
                v-if="!item.is_subscribe"
                @click="subscribeClick(item.fan_club_grade_item_id, item.type)"
                class="Subscription_Plan_box_div_subscription"
              >
                訂閱
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 取消订阅弹窗 -->
    <div
      class="Subscription_PlanCancel"
      v-if="SubscriptionPlanCancelStatus"
    >
      <div class="Subscription_PlanCancel_box">
        <img src="@/assets/img/icon_lose.png" alt="" />
        <h1>確定取消</h1>
        <h2>取消訂閱後，下個月起不再享有該方案的粉絲福利</h2>
        <div>
          <button class="cancel" @click="SubscriptionPlanCancelClick()">
            殘忍取消
          </button>
          <button @click="SubscriptionPlanCancelStatus = false">
            改變心意
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { GET_GetGrade, POST_Subscribe, POST_Unsubscribe } from "@/api/api";
export default {
  name: "Subscription",
  props: {
    fan_club_id: ''
  },
  data() {
    return {
      SubscriptionPlanStatus: true,
      SubscriptionPlanCancelStatus: false,
      SubscriptionPlanList: [],
    }
  },
  created() {
    this._getGrade();
  },
  methods: {
    // 获取订阅方案
    _getGrade() {
      GET_GetGrade({ fan_club_id: this.fan_club_id }).then(res => {
        if (res.code == 200) {
          this.SubscriptionPlanList = res.data.list;
        }
      });
    },
    // 订阅订阅方案
    subscribeClick(id, type) {
      // 免费订阅
      if (type == "free") {
        POST_Subscribe({ fan_club_grade_item_id: id }).then(res => {
          if (res.code == 200) {
            this.$message({
              duration: 1500,
              message: res.msg,
              type: "success"
            });
            this._getGrade();
          }
        });
      } else {
        console.log("收费");
      }
    },
    // 取消订阅方案 // 残忍取消
    SubscriptionPlanCancelClick() {
      POST_Unsubscribe({ fan_club_id: this.fan_club_id }).then(res => {
        if (res.code == 200) {
            this.$message({
              duration: 1500,
              message: res.msg,
              type: "success"
            });
          this._getGrade();
          this.SubscriptionPlanCancelStatus = false;
        }
      });
    },
    // 打开订阅弹窗
    subscriptionClick() {
      this.SubscriptionPlanStatus = true;
    },
    // 打开取消订阅弹窗
    OpenSubscriptionPlanCancel() {
      this.SubscriptionPlanCancelStatus = true;
    },
  }
}
</script>

<style lang="scss" scoped>
.Subscription {
  .Subscription_Plan {
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
    .Subscription_Plan_box {
      padding: 60px;
      width: 692px;
      overflow: hidden;
      background: #ffffff;
      border-radius: 10px;
      .Subscription_Plan_box_img {
        cursor: pointer;
        position: absolute;
        right: 26px;
        top: 26px;
      }
      .Subscription_Plan_box_h1 {
        font-size: 24px;
        font-weight: 400;
        color: #000000;
        line-height: 33px;
        text-align: center;
      }
      .Subscription_Plan_box_h2 {
        margin: 20px 0 24px;
        font-size: 16px;
        font-weight: 400;
        color: #585858;
        line-height: 22px;
      }
      .Subscription_Plan_box_box {
        position: relative;
        overflow: hidden;
        height: 416px;
        width: 100%;
        .Subscription_Plan_box_box_div {
          position: absolute;
          left: 0;
          top: 0;
          right: -17px;
          bottom: 0;
          overflow-x: hidden;
          overflow-y: scroll;
          .Subscription_Plan_box_div {
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
            .Subscription_Plan_box_div_subscriptionCancel {
              font-size: 16px;
              font-weight: bold;
              color: #1db3ce;
              line-height: 22px;
            }
            .Subscription_Plan_box_div_subscription {
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
  .Subscription_PlanCancel {
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
    .Subscription_PlanCancel_box {
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
}
</style>