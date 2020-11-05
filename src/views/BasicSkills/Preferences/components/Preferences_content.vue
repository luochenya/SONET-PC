<template>
  <div class="Preferences_Content">
    <div class="Preferences_Contents">
      <HeaderMenu />
      <div class="Preferences_Content_box">
        <h1>偏好設定</h1>
        <div class="Preferences_Content_box_div">
          <div v-for="(item, index) in dataList" :key="index">
            <p>{{ item.name }}</p>
            <img
              @click="checkoutClick(index)"
              v-if="checkoutLit[index]"
              src="@/assets/img/checkout.png"
              alt=""
            />
            <img
              @click="checkoutClick(index)"
              v-if="!checkoutLit[index]"
              src="@/assets/img/noCheckout.png"
              alt=""
            />
          </div>
          <button @click="submit">儲存變更</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderMenu from "@/components/HeaderMenu";
import { GET_GetCategoryLists, POST_SetUserCategory } from "@/api/api";
export default {
  name: "Preferences_Content",
  components: {
    HeaderMenu
  },
  data() {
    return {
      checkoutLit: [],
      dataList: []
    };
  },
  created() {
    this._getCategoryLists();
  },
  methods: {
    // 获取偏好列表
    _getCategoryLists() {
      GET_GetCategoryLists().then(res => {
        if (res.code == 200) {
          this.dataList = res.data.list;
          this.checkoutLit = [];
          res.data.list.forEach((item, index) => {
            if (item.is_user_category) {
              this.checkoutLit.splice(index, 0, true);
            } else {
              this.checkoutLit.splice(index, 0, false);
            }
          });
        }
      });
    },
    // 选中偏好
    checkoutClick(index) {
      this.checkoutLit.splice(index, 1, !this.checkoutLit[index]);
    },
    // 设置偏好
    submit() {
      let category_ids = [];
      this.checkoutLit.forEach((item, index) => {
        if (item) {
          category_ids.push(this.dataList[index].id);
        }
      });
      if (category_ids.length == 0) {
        return this.$message({
          duration: 1500,
          message: "請至少選擇一項感興趣的內容",
          type: "warning"
        });
      }
      category_ids = category_ids.toString();
      POST_SetUserCategory({ category_ids: category_ids }).then(res => {
        if (res.code == 200) {
          this.$message({
            duration: 1500,
            message: res.msg,
            type: "success"
          });
          this._getCategoryLists();
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.Preferences_Content {
  width: 766px;
  height: 1018px;
  position: relative;
  overflow: hidden;
  .Preferences_Contents {
    position: absolute;
    left: 0;
    top: 0;
    right: -17px;
    bottom: 0;
    overflow-x: hidden;
    overflow-y: scroll;
    .Preferences_Content_box {
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
      .Preferences_Content_box_div {
        width: 100%;
        padding: 30px 174px 30px 90px;
        text-align: center;
        div {
          margin-bottom: 46px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          p {
            font-size: 16px;
            font-weight: bold;
            color: #000000;
            line-height: 22px;
          }
          img {
            cursor: pointer;
            width: 24px;
            height: 24px;
          }
        }
        button {
          margin-top: 64px;
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
