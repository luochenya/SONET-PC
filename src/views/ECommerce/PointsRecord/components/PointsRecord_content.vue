<template>
  <div class="PointsRecord_content">
    <div class="PointsRecord_contents">
      <HeaderMenu />
      <div class="PointsRecord_content_content">
        <h1>點數記錄</h1>
        <div class="PointsRecord_content_content_box">
          <h2 class="PointsRecord_content_content_box_h2">
            <img src="@/assets/img/Image1.png" alt="" />
            <span>1,052</span>
            pt
          </h2>
          <h3 class="PointsRecord_content_content_box_h3">
            ( 含 7 pt免費點數，5 pt免費點數，將於2020.06.30到期 )
          </h3>
          <div class="PointsRecord_content_content_box_button">
            <button>
              <img src="@/assets/img/button1.png" alt="" />
              購買點數
            </button>
            <button>
              <img src="@/assets/img/button2.png" alt="" />
              免費拿點
            </button>
          </div>
          <div
            class="PointsRecord_content_content_box_content"
            v-for="(item, index) in dataList"
            :key="index"
          >
            <div>
              <p>{{ item.name }}</p>
              <span>{{ item.time }}</span>
            </div>
            <em v-if="item.type == 'add'">+ {{ item.price }}</em>
            <i v-if="item.type == 'less'">- {{ item.price }}</i>
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
  </div>
</template>

<script>
import HeaderMenu from "@/components/HeaderMenu";
import Pagination from "@/components/Pagination";
export default {
  name: "PointsRecord_content",
  components: {
    HeaderMenu,
    Pagination
  },
  data() {
    return {
      offset: 1,
      limit: 10,
      total: 30,
      dataList: [
        {
          name: "購買 38 pt (含免費贈點 3 pt)",
          time: "2020.03.22 15:40",
          price: "38",
          type: "add"
        },
        {
          name: "購買 38 pt (含免費贈點 3 pt)",
          time: "2020.03.22 15:40",
          price: "348",
          type: "less"
        },
        {
          name: "購買 38 pt (含免費贈點 3 pt)",
          time: "2020.03.22 15:40",
          price: "348",
          type: "less"
        },
        {
          name: "購買 38 pt (含免費贈點 3 pt)",
          time: "2020.03.22 15:40",
          price: "48",
          type: "less"
        },
        {
          name: "購買 38 pt (含免費贈點 3 pt)",
          time: "2020.03.22 15:40",
          price: "178",
          type: "add"
        },
        {
          name: "購買 38 pt (含免費贈點 3 pt)",
          time: "2020.03.22 15:40",
          price: "38",
          type: "add"
        },
        {
          name: "購買 38 pt (含免費贈點 3 pt)",
          time: "2020.03.22 15:40",
          price: "348",
          type: "less"
        },
      ]
    };
  },
  methods: {
    // 分页切换
    handleCurrentChange(val) {
      this.offset = val;
    }
  }
};
</script>

<style lang="scss" scoped>
.PointsRecord_content {
  width: 766px;
  height: 1018px;
  position: relative;
  overflow: hidden;
  .PointsRecord_contents {
    position: absolute;
    left: 0;
    top: 0;
    right: -17px;
    bottom: 0;
    overflow-x: hidden;
    overflow-y: scroll;
    .PointsRecord_content_content {
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
      .PointsRecord_content_content_box {
        width: 100%;
        padding: 30px 0 44px;
        text-align: center;
        .PointsRecord_content_content_box_h2 {
          padding: 0 90px;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          font-size: 40px;
          font-weight: 300;
          color: #585858;
          line-height: 56px;
          img {
            width: 28px;
            height: 28px;
          }
          span {
            margin: 0 5px;
            font-weight: bold;
            color: #1db3ce;
          }
        }
        .PointsRecord_content_content_box_h3 {
          padding: 2px 90px 10px;
          text-align: left;
          font-size: 14px;
          font-weight: 400;
          color: #585858;
          line-height: 20px;
        }
        .PointsRecord_content_content_box_button {
          padding: 0 90px 10px;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          button {
            margin-right: 30px;
            width: 158px;
            height: 38px;
            background: #1db3ce;
            border-radius: 19px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 14px;
            font-weight: bold;
            color: #ffffff;
            line-height: 20px;
            img {
              width: 24px;
              height: 24px;
            }
          }
        }
        .PointsRecord_content_content_box_content {
          padding: 20px 90px;
          border-bottom: 1px solid #f6f7f8;
          display: flex;
          justify-content: space-between;
          align-items: center;
          div {
            text-align: left;
            p {
              font-size: 16px;
              font-weight: bold;
              color: #000000;
              line-height: 30px;
            }
            span {
              font-size: 16px;
              color: #585858;
              line-height: 30px;
            }
          }
          em {
            font-size: 18px;
            font-weight: bold;
            color: #1db3ce;
            line-height: 25px;
          }
          i {
            font-size: 18px;
            font-weight: bold;
            color: #c64040;
            line-height: 25px;
          }
        }
      }
    }
  }
}
</style>
