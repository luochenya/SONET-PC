<template>
  <div class="SystemNotification_content">
    <div class="SystemNotification_contents">
      <HeaderMenu />
      <div class="SystemNotification_content_box">
        <h1>系統公告</h1>
        <div
          class="SystemNotification_content_box_null"
          v-if="!dataList || dataList.length == 0"
        >
          <img src="@/assets/img/icon_notice.png" alt="" />
          <p>尚無任何系統公告</p>
        </div>
        <div
          class="SystemNotification_content_box_div"
          v-for="(item, index) in dataList"
          :key="index"
        >
          <h2 class="SystemNotification_content_box_div_h2">
            <p>{{ item.title }}</p>
            <span>{{ item.release_at }}</span>
          </h2>
          <h3 class="SystemNotification_content_box_div_h3">
            {{ item.desc }}
          </h3>
          <h4
            class="SystemNotification_content_box_div_h4"
            v-if="statusList[index]"
            v-html="item.content"
          ></h4>
          <div class="SystemNotification_content_box_div_img">
            <img
              :class="statusList[index] ? '' : 'active'"
              @click="imgClick(index)"
              src="@/assets/img/btn_down.png"
              alt=""
            />
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
  </div>
</template>

<script>
import HeaderMenu from "@/components/HeaderMenu";
import Pagination from "@/components/Pagination";
import { GET_Getannouncemen } from "@/api/api";
export default {
  name: "SystemNotification_content",
  components: {
    HeaderMenu,
    Pagination
  },
  data() {
    return {
      offset: 1,
      limit: 10,
      total: 0,
      statusList: [],
      dataList: []
    };
  },
  created() {
    this._getannouncemen();
  },
  methods: {
    // 分页切换
    handleCurrentChange(val) {
      this.offset = val;
      this._getannouncemen();
    },
    // 获取公告列表
    _getannouncemen() {
      let form = {
        page: this.offset,
        per_page: this.limit
      };
      GET_Getannouncemen(form).then(res => {
        if (res.code == 200) {
          this.dataList = res.data.list;
          this.total = res.data.pagination.total;
          this.statusList = []
          res.data.list.forEach((item, index) => {
            this.statusList.splice(index, 0, false);
          });
        }
      });
    },
    // 点击展开公告
    imgClick(index) {
      this.statusList.splice(index, 1, !this.statusList[index]);
    }
  }
};
</script>

<style lang="scss" scoped>
.SystemNotification_content {
  width: 766px;
  height: 1018px;
  position: relative;
  overflow: hidden;
  .SystemNotification_contents {
    position: absolute;
    left: 0;
    top: 0;
    right: -17px;
    bottom: 0;
    overflow-x: hidden;
    overflow-y: scroll;
    .SystemNotification_content_box {
      margin-top: 10px;
      width: 100%;
      padding-bottom: 20px;
      min-height: 875px;
      background: #fff;
      h1 {
        height: 63px;
        padding-left: 90px;
        font-size: 20px;
        font-weight: bold;
        color: #000000;
        line-height: 63px;
      }
      .SystemNotification_content_box_null {
        border-top: 1px solid #f6f7f8;
        padding: 147px 90px 0;
        text-align: center;
        p {
          margin-top: 27px;
          font-size: 16px;
          font-weight: 400;
          color: #9BA1A9;
          line-height: 24px;
        }
      }
      .SystemNotification_content_box_div {
        border-top: 1px solid #f6f7f8;
        padding: 30px 90px 20px;
        .SystemNotification_content_box_div_h2 {
          margin-bottom: 10px;
          display: flex;
          justify-content: space-between;
          p {
            font-size: 14px;
            font-weight: bold;
            color: #424247;
            line-height: 20px;
          }
          span {
            font-size: 14px;
            font-weight: 400;
            color: #9ba1a9;
            line-height: 20px;
          }
        }
        .SystemNotification_content_box_div_h3 {
          font-size: 14px;
          font-weight: bold;
          color: #585858;
          line-height: 20px;
          margin-bottom: 10px;
        }
        .SystemNotification_content_box_div_h4 {
          font-size: 14px;
          font-weight: bold;
          color: #585858;
          line-height: 20px;
        }
        .h3Active {
          text-overflow: -o-ellipsis-lastline;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          line-clamp: 2;
          -webkit-box-orient: vertical;
        }
        .SystemNotification_content_box_div_img {
          text-align: center;
          img {
            cursor: pointer;
            width: 28px;
            height: 28px;
          }
          .active {
            transform: rotate(180deg);
          }
        }
      }
    }
  }
}
</style>
