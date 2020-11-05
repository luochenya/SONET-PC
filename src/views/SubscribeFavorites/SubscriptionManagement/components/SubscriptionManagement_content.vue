<template>
  <div class="SubscriptionManagement_content">
    <div class="SubscriptionManagement_contents">
      <HeaderMenu />
      <div class="SubscriptionManagement_content_box">
        <h1>訂閱管理</h1>
        <div class="SubscriptionManagement_content_box_div">
          <div class="SubscriptionManagement_content_box_div_null" v-if="!dataList || dataList.length == 0">
            <img src="@/assets/img/icon_notice.png" alt="" />
            <p>尚無任何訂閲</p>
          </div>
          <div
            class="SubscriptionManagement_content_box_div_content"
            v-for="(item, index) in dataList"
            :key="index"
          >
            <em></em>
            <img :src="item.avatar" alt="" />
            <div>
              <h3>{{ item.name }}</h3>
              <p>{{ item.fan_club_grade.name }}</p>
              <p>自動續訂日期：{{ item.auto_renewal_at.split(" ")[0] }}</p>
              <button @click="SubscriChange(item.fan_club_id)">變更</button>
            </div>
          </div>
          <!-- 分頁 -->
          <Pagination
            :currentpage="offset"
            :pagesize="limit"
            :total="total"
            :handleCurrentChange="handleCurrentChange"
          ></Pagination>
        </div>
      </div>
      <Subscription v-if="SubscriptionStatus" :fan_club_id="fan_club_id" />
    </div>
  </div>
</template>

<script>
import HeaderMenu from "@/components/HeaderMenu";
import Pagination from "@/components/Pagination";
import Subscription from "@/components/Subscription";
import { GET_GetSubscribeList } from "@/api/api";
export default {
  name: "SubscriptionManagement_content",
  components: {
    HeaderMenu,
    Pagination,
    Subscription
  },
  data() {
    return {
      SubscriptionStatus: false,
      fan_club_id: "",
      offset: 1,
      limit: 10,
      total: 0,
      dataList: []
    };
  },
  created() {
    this._getSubscribeList();
  },
  methods: {
    // 訂閲變更
    SubscriChange(id) {
      this.fan_club_id = id
      this.SubscriptionStatus = true
    },
    // 分页切换
    handleCurrentChange(val) {
      this.offset = val;
      this._getSubscribeList();
    },
    // 获取订阅管理
    _getSubscribeList() {
      let form = {
        page: this.offset,
        per_page: this.limit
      };
      GET_GetSubscribeList(form).then(res => {
        if (res.code == 200) {
          this.dataList = res.data.list;
          this.total = res.data.pagination.total;
        }
      });
    },
  }
};
</script>

<style lang="scss" scoped>
.SubscriptionManagement_content {
  width: 766px;
  height: 1018px;
  position: relative;
  overflow: hidden;
  .SubscriptionManagement_contents {
    position: absolute;
    left: 0;
    top: 0;
    right: -17px;
    bottom: 0;
    overflow-x: hidden;
    overflow-y: scroll;
    .SubscriptionManagement_content_box {
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
      .SubscriptionManagement_content_box_div {
        width: 100%;
        padding: 30px 0 30px 90px;
        display: flex;
        flex-wrap: wrap;
        .SubscriptionManagement_content_box_div_null {
          // margin: 110px auto 0;
          width: 100%;
          padding-right: 90px;
          padding-top: 110px;
          text-align: center;
          p {
            margin-top: 27px;
            font-size: 16px;
            font-weight: 400;
            color: #9BA1A9;
            line-height: 24px;
          }
        }
        .SubscriptionManagement_content_box_div_content:hover {
          em {
            display: block;
          }
        }
        .SubscriptionManagement_content_box_div_content {
          cursor: pointer;
          display: flex;
          padding: 16px 16px 12px 16px;
          margin: 0 18px 18px 0;
          width: 310px;
          background: #ffffff;
          box-shadow: 0px 14px 120px -18px rgba(0, 0, 0, 0.1);
          border-radius: 6px;
          position: relative;
          em {
            display: none;
            pointer-events: none;
            position: absolute;
            left: 0;
            top: 0;
            bottom: 0;
            right: 0;
            width: 100%;
            height: 100%;
            background: rgba(88, 88, 88, 0.1);
            border-radius: 6px;
          }
          img {
            width: 62px;
            height: 62px;
            margin-right: 17px;
          }
          div {
            width: calc(100% - 79px);
            h3 {
              font-size: 14px;
              font-weight: bold;
              color: #585858;
              line-height: 20px;
            }
            p {
              margin: 5px 0;
              font-size: 14px;
              font-weight: 400;
              color: #9ba1a9;
              line-height: 24px;
            }
            button {
              float: right;
              width: 84px;
              height: 30px;
              background: #1db3ce;
              border-radius: 15px;
              font-size: 14px;
              font-weight: 400;
              color: #ffffff;
              line-height: 20px;
            }
          }
        }
      }
    }
  }
}
</style>
