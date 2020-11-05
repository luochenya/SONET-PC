<template>
  <div class="SendInvitationCode_content">
    <div class="SendInvitationCode_contents">
      <HeaderMenu />
      <div class="SendInvitationCode_content_content">
        <h1>
          邀請碼發送
          <button @click="AddPopupStatus = true">
            <img src="@/assets/img/addGiftSending.png" alt="" />
            新增邀請碼
          </button>
        </h1>
        <div class="SendInvitationCode_content_content_box">
          <div class="SendInvitationCode_content_content_box_Inquire">
            <div
              class="SendInvitationCode_content_content_box_Inquire_bigSelect"
            >
              <el-select v-model="value" placeholder="邀請碼類型">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
            <div
              class="SendInvitationCode_content_content_box_Inquire_smallSelect"
            >
              <el-select v-model="value" placeholder="狀態">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
            <div
              class="SendInvitationCode_content_content_box_Inquire_input"
            >
              <input type="text" placeholder="邀請碼名稱" />
              <button>
                <img src="@/assets/img/btn_search.png" alt="" />
                搜尋
              </button>
            </div>
          </div>
        </div>
        <div
          class="SendInvitationCode_content_content_list"
          v-for="(item, index) in dataList"
          :key="index"
          @click="openPopup(item.sendStatus)"
        >
          <div>
            <p>{{ item.name }}</p>
            <span>
              <em>{{ item.type }}</em>
              <i>{{ item.time }}</i>
            </span>
          </div>
          <div>
            <h2 :class="item.sendStatus ? '' : 'active'">
              {{ item.sendStatus ? "已發送" : "未發送" }}
            </h2>
            <h2 :class="item.sendStatus ? '' : 'active'">
              發送 {{ item.num }}人
            </h2>
          </div>
        </div>
        <!-- 分頁 -->
        <Pagination
          style="padding-right: 90px"
          :currentpage="offset"
          :pagesize="limit"
          :total="total"
          :handleCurrentChange="handleCurrentChange"
        ></Pagination>
      </div>
    </div>

    <!-- 查看彈窗 -->
    <div class="SendInvitationCode_content_ViewPopup" v-if="ViewPopupStatus">
      <div class="SendInvitationCode_content_ViewPopup_content">
        <img
          @click="ViewPopupStatus = false"
          class="SendInvitationCode_content_ViewPopup_content_closeImg"
          src="@/assets/img/btn_ close.png"
          alt=""
        />
        <h1 class="SendInvitationCode_content_ViewPopup_content_h1">
          邀請碼發送
          <span>查看</span>
        </h1>
        <div class="SendInvitationCode_content_ViewPopup_content_div">
          <h2>發送時間</h2>
          <div
            class="SendInvitationCode_content_ViewPopup_content_div_input"
          >
            <el-date-picker
              v-model="value1"
              value-format="yy-MM-dd HH:mm:ss"
              type="datetime"
              placeholder="选择日期时间"
            >
            </el-date-picker>
          </div>
        </div>
        <div class="SendInvitationCode_content_ViewPopup_content_div">
          <h2>禮物名稱</h2>
          <div
            class="SendInvitationCode_content_ViewPopup_content_div_input"
          >
            <input type="text" placeholder="會員活動贈送禮物" />
          </div>
        </div>
        <div class="SendInvitationCode_content_ViewPopup_content_div">
          <h2>訂閲類型</h2>
          <div
            class="SendInvitationCode_content_ViewPopup_content_div_inputs inputWidth"
          >
            <div>
              <el-select v-model="value" placeholder="指定折數">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
          </div>
        </div>
        <div class="SendInvitationCode_content_ViewPopup_content_div">
          <h2>邀請碼類型</h2>
          <div
            class="SendInvitationCode_content_ViewPopup_content_div_inputs"
          >
            <div>
              <el-select v-model="value" placeholder="指定折數">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
            <div>
              <input type="text" placeholder="" />
              <span class="span">%</span>
            </div>
          </div>
        </div>
        <div class="SendInvitationCode_content_ViewPopup_content_divs">
          <h2>添加備註</h2>
          <div
            class="SendInvitationCode_content_ViewPopup_content_divs_input"
          >
            <el-input
              type="textarea"
              :rows="5"
              :resize="'none'"
              placeholder="請填寫您的付款資訊，在確認購買的項目與金額後，點選下方『前往付款』"
              v-model="textarea"
            >
            </el-input>
          </div>
        </div>
        <div class="SendInvitationCode_content_ViewPopup_content_text">
          <p>發送清單：100人</p>
          <span>|</span>
          <p>下載清單</p>
        </div>
        <button
          class="SendInvitationCode_content_ViewPopup_content_button"
          @click="ViewPopupStatus = false"
        >
          確定
        </button>
      </div>
    </div>
    <!-- 查看彈窗 -->

    <!-- 新增彈窗 -->
    <div class="SendInvitationCode_content_ViewPopup" v-if="AddPopupStatus">
      <div class="SendInvitationCode_content_ViewPopup_content">
        <img
          @click="AddPopupStatus = false"
          class="SendInvitationCode_content_ViewPopup_content_closeImg"
          src="@/assets/img/btn_ close.png"
          alt=""
        />
        <h1 class="SendInvitationCode_content_ViewPopup_content_h1">
          邀請碼發送
          <span>新增</span>
        </h1>
        <div class="SendInvitationCode_content_ViewPopup_content_select">
          <h2>發送時間</h2>
          <div
            class="SendInvitationCode_content_ViewPopup_content_div_input"
          >
            <button
              :class="activeStatus == 1 ? 'buttonActive' : ''"
              @click="activeStatusClick(1)"
            >
              <img
                :src="activeStatus == 1 ? checkoutImg : noCheckoutImg"
                alt=""
              />
              立即發送
            </button>
            <button
              :class="activeStatus == 0 ? 'buttonActive' : ''"
              @click="activeStatusClick(0)"
            >
              <img
                :src="activeStatus == 0 ? checkoutImg : noCheckoutImg"
                alt=""
              />
              排程發送
              <el-date-picker
                v-model="sendDate"
                value-format="yy-MM-dd HH:mm:ss"
                type="datetime"
                placeholder="請填寫排程發送時間"
              >
              </el-date-picker>
            </button>
          </div>
        </div>
        <div class="SendInvitationCode_content_ViewPopup_content_div">
          <h2>禮物名稱</h2>
          <div
            class="SendInvitationCode_content_ViewPopup_content_div_input"
          >
            <input type="text" placeholder="會員活動贈送禮物" />
          </div>
        </div>
        <div class="SendInvitationCode_content_ViewPopup_content_div">
          <h2>訂閲類型</h2>
          <div
            class="SendInvitationCode_content_ViewPopup_content_div_inputs inputWidth"
          >
            <div>
              <el-select v-model="value" placeholder="指定折數">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
          </div>
        </div>
        <div class="SendInvitationCode_content_ViewPopup_content_div">
          <h2>邀請碼類型</h2>
          <div
            class="SendInvitationCode_content_ViewPopup_content_div_inputs"
          >
            <div>
              <el-select v-model="value" placeholder="指定折數">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
            <div>
              <input type="text" placeholder="" />
              <span class="span">%</span>
            </div>
          </div>
        </div>
        <div class="SendInvitationCode_content_ViewPopup_content_divs">
          <h2>添加備註</h2>
          <div
            class="SendInvitationCode_content_ViewPopup_content_divs_input"
          >
            <el-input
              type="textarea"
              :rows="5"
              :resize="'none'"
              placeholder="請填寫您的付款資訊，在確認購買的項目與金額後，點選下方『前往付款』"
              v-model="textarea"
            >
            </el-input>
          </div>
        </div>
        <div class="SendInvitationCode_content_ViewPopup_content_text">
          <p>發送清單：100人</p>
          <span>|</span>
          <p>下載清單</p>
          <span>|</span>
          <p>Excel上傳</p>
        </div>
        <button
          class="SendInvitationCode_content_ViewPopup_content_button"
          @click="addSubmit()"
        >
          儲存
        </button>
      </div>
    </div>
    <!-- 新增彈窗 -->

    <!-- 编辑彈窗 -->
    <div
      class="SendInvitationCode_content_ViewPopup"
      v-if="UpdatePopupStatus"
    >
      <div class="SendInvitationCode_content_ViewPopup_content">
        <img
          @click="UpdatePopupStatus = false"
          class="SendInvitationCode_content_ViewPopup_content_closeImg"
          src="@/assets/img/btn_ close.png"
          alt=""
        />
        <h1 class="SendInvitationCode_content_ViewPopup_content_h1">
          邀請碼發送
          <span>编辑</span>
        </h1>
        <div class="SendInvitationCode_content_ViewPopup_content_select">
          <h2>發送時間</h2>
          <div
            class="SendInvitationCode_content_ViewPopup_content_div_input"
          >
            <button
              :class="activeStatus == 1 ? 'buttonActive' : ''"
              @click="activeStatusClick(1)"
            >
              <img
                :src="activeStatus == 1 ? checkoutImg : noCheckoutImg"
                alt=""
              />
              立即發送
            </button>
            <button
              :class="activeStatus == 0 ? 'buttonActive' : ''"
              @click="activeStatusClick(0)"
            >
              <img
                :src="activeStatus == 0 ? checkoutImg : noCheckoutImg"
                alt=""
              />
              排程發送 2020.01.01 23:00
            </button>
          </div>
        </div>
        <div class="SendInvitationCode_content_ViewPopup_content_div">
          <h2>禮物名稱</h2>
          <div
            class="SendInvitationCode_content_ViewPopup_content_div_input"
          >
            <input type="text" placeholder="會員活動贈送禮物" />
          </div>
        </div>
        <div class="SendInvitationCode_content_ViewPopup_content_div">
          <h2>訂閲類型</h2>
          <div
            class="SendInvitationCode_content_ViewPopup_content_div_inputs inputWidth"
          >
            <div>
              <el-select v-model="value" placeholder="指定折數">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
          </div>
        </div>
        <div class="SendInvitationCode_content_ViewPopup_content_div">
          <h2>邀請碼類型</h2>
          <div
            class="SendInvitationCode_content_ViewPopup_content_div_inputs"
          >
            <div>
              <el-select v-model="value" placeholder="指定折數">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
            <div>
              <input type="text" placeholder="" />
              <span class="span">%</span>
            </div>
          </div>
        </div>
        <div class="SendInvitationCode_content_ViewPopup_content_divs">
          <h2>添加備註</h2>
          <div
            class="SendInvitationCode_content_ViewPopup_content_divs_input"
          >
            <el-input
              type="textarea"
              :rows="5"
              :resize="'none'"
              placeholder="請填寫您的付款資訊，在確認購買的項目與金額後，點選下方『前往付款』"
              v-model="textarea"
            >
            </el-input>
          </div>
        </div>
        <div class="SendInvitationCode_content_ViewPopup_content_text">
          <p>發送清單：100人</p>
          <span>|</span>
          <p>下載清單</p>
          <span>|</span>
          <p>Excel上傳</p>
        </div>
        <button
          class="SendInvitationCode_content_ViewPopup_content_button"
          @click="updateSubmit()"
        >
          儲存
        </button>
      </div>
    </div>
    <!-- 编辑彈窗 -->

    <!-- 手续费扣除弹窗 -->
    <div class="SendInvitationCode_content_Popup" v-if="HandlingFeeStatus">
      <div class="SendInvitationCode_content_Popup_content">
        <img src="@/assets/img/icon_lose (1).png" alt="" />
        <h1>手續費扣除</h1>
        <h2>贈品月結清款時，將扣除需支付給Dolfan的手續費成本</h2>
        <button @click="HandlingFeeStatus = false">確定</button>
      </div>
    </div>
    <!-- 手续费扣除弹窗 -->
  </div>
</template>

<script>
import HeaderMenu from "@/components/HeaderMenu";
import Pagination from "@/components/Pagination";
export default {
  name: "SendInvitationCode_content",
  components: {
    HeaderMenu,
    Pagination
  },
  data() {
    return {
      // 查看弹窗状态
      ViewPopupStatus: false,
      // 新增弹窗状态
      AddPopupStatus: false,
      // 修改弹窗状态
      UpdatePopupStatus: false,
      // 手续费弹窗状态
      HandlingFeeStatus: false,
      // 单选未选中图片
      noCheckoutImg: require("@/assets/img/noCheckout.png"),
      // 单选选中图片
      checkoutImg: require("@/assets/img/checkout.png"),
      // 发送时间状态
      activeStatus: 0,
      // 分页
      offset: 1,
      limit: 10,
      total: 30,
      options: [
        {
          value: "選項1",
          label: "選項1"
        },
        {
          value: "選項2",
          label: "選項2"
        }
      ],
      value: "",
      value1: "",
      sendDate: "",
      textarea: "",
      dataList: [
        {
          name: "會員活動贈送禮物邀請碼名稱",
          type: "邀請碼類型",
          time: "2020.01.01",
          sendStatus: true,
          num: "100"
        },
        {
          name: "會員活動贈送禮物邀請碼名稱",
          type: "邀請碼類型",
          time: "2020.01.01",
          sendStatus: true,
          num: "100"
        },
        {
          name: "會員活動贈送禮物邀請碼名稱",
          type: "邀請碼類型",
          time: "2020.01.01",
          sendStatus: false,
          num: "100"
        },
        {
          name: "會員活動贈送禮物邀請碼名稱",
          type: "邀請碼類型",
          time: "2020.01.01",
          sendStatus: false,
          num: "100"
        },
        {
          name: "會員活動贈送禮物邀請碼名稱",
          type: "邀請碼類型",
          time: "2020.01.01",
          sendStatus: true,
          num: "100"
        }
      ]
    };
  },
  methods: {
    // 分页切换
    handleCurrentChange(val) {
      this.offset = val;
    },
    // 點擊數據打開查看或修改彈窗
    openPopup(type) {
      if (type) {
        this.ViewPopupStatus = true;
      } else {
        this.UpdatePopupStatus = true;
      }
    },
    // 发送时间切换
    activeStatusClick(type) {
      this.activeStatus = type;
      if (type == 1) {
        this.sendDate = "";
      }
    },
    // 新增储存提交
    addSubmit() {
      this.AddPopupStatus = false;
      this.HandlingFeeStatus = true;
    },
    // 编辑储存提交
    updateSubmit() {
      this.UpdatePopupStatus = false;
      this.HandlingFeeStatus = true;
    }
  }
};
</script>

<style lang="scss">
.SendInvitationCode_content {
  width: 766px;
  height: 1018px;
  position: relative;
  overflow: hidden;
  .SendInvitationCode_contents {
    position: absolute;
    left: 0;
    top: 0;
    right: -17px;
    bottom: 0;
    overflow-x: hidden;
    overflow-y: scroll;
    .SendInvitationCode_content_content {
      margin-top: 10px;
      width: 100%;
      min-height: 875px;
      background: #fff;
      h1 {
        display: flex;
        height: 63px;
        padding-left: 90px;
        border-bottom: 1px solid #f6f7f8;
        font-size: 20px;
        font-weight: bold;
        color: #000000;
        line-height: 63px;
        button {
          margin-left: 36px;
          font-size: 18px;
          font-weight: 400;
          color: #1db3ce;
          line-height: 25px;
          display: flex;
          justify-content: center;
          align-items: center;
          img {
            margin-right: 5px;
            width: 24px;
            height: 24px;
          }
        }
      }
      .SendInvitationCode_content_content_box {
        width: 100%;
        .SendInvitationCode_content_content_box_Inquire {
          padding: 30px 90px;
          display: flex;
          justify-content: space-between;
          .SendInvitationCode_content_content_box_Inquire_bigSelect {
            width: 124px;
          }
          .SendInvitationCode_content_content_box_Inquire_smallSelect {
            width: 82px;
          }
          .SendInvitationCode_content_content_box_Inquire_input {
            width: 360px;
            position: relative;
            input {
              position: absolute;
              left: 0;
              top: 0;
            }
            button {
              position: absolute;
              right: 0;
              top: 0;
              width: 80px;
              height: 40px;
              background: #1db3ce;
              border-radius: 0px 20px 20px 0px;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 14px;
              font-weight: 400;
              color: #ffffff;
              line-height: 20px;
              img {
                width: 24px;
                height: 24px;
                margin-right: 4px;
              }
            }
          }
          input {
            padding-left: 24px;
            padding-right: 80px;
            border: 1px solid #c0cad3;
            width: 100%;
            height: 40px;
            background: #ffffff;
            border-radius: 20px;
            font-size: 14px;
            font-weight: bold;
            color: #585858;
            line-height: 20px;
          }
          .el-select {
            width: 100%;
            height: 40px;
            .el-input {
              width: 100%;
              height: 100%;
              .el-input__inner {
                border: none;
                padding: 0 24px;
                border: 1px solid #c0cad3;
                background: #ffffff;
                border-radius: 20px;
                font-size: 14px;
                font-weight: bold;
                color: #000000;
                line-height: 20px;
              }
              .el-input__suffix {
                right: 4px;
              }
              .el-select__caret {
                font-size: 16px;
                color: #585858;
                font-weight: bold;
              }
            }
          }
          input::-webkit-input-placeholder {
            /* WebKit browsers */
            font-size: 14px;
            font-weight: 400;
            color: #585858;
            line-height: 20px;
          }
          input::-moz-placeholder {
            /* Mozilla Firefox 19+ */
            font-size: 14px;
            font-weight: 400;
            color: #585858;
            line-height: 20px;
          }
          input:-ms-input-placeholder {
            /* Internet Explorer 10+ */
            font-size: 14px;
            font-weight: 400;
            color: #585858;
            line-height: 20px;
          }
        }
      }
      .SendInvitationCode_content_content_list {
        border-radius: 2px;
        cursor: pointer;
        display: flex;
        justify-content: space-between;
        padding: 16px 90px;
        border-bottom: 1px solid #f6f7f8;
        div {
          p {
            font-size: 16px;
            font-weight: bold;
            color: #000000;
            line-height: 30px;
          }
          span {
            display: flex;
            justify-content: space-between;
            font-size: 16px;
            color: #585858;
            line-height: 30px;
          }
          h2 {
            text-align: right;
            font-size: 16px;
            font-weight: bold;
            color: #1db3ce;
            line-height: 30px;
          }
          .active {
            color: #c64040;
          }
        }
      }
      .SendInvitationCode_content_content_list:hover {
        background: #f6f7f8;
      }
    }
  }
  .SendInvitationCode_content_ViewPopup {
    z-index: 10;
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    .SendInvitationCode_content_ViewPopup_content {
      width: 692px;
      padding: 0 98px;
      background: #ffffff;
      border-radius: 10px;
      position: relative;
      text-align: center;
      .SendInvitationCode_content_ViewPopup_content_closeImg {
        cursor: pointer;
        position: absolute;
        right: 26px;
        top: 26px;
        width: 16px;
        height: 16px;
      }
      .SendInvitationCode_content_ViewPopup_content_h1 {
        margin-bottom: 20px;
        padding-top: 50px;
        padding-bottom: 20px;
        font-size: 24px;
        font-weight: 400;
        color: #000000;
        line-height: 33px;
        border-bottom: 1px solid #f6f7f8;
        span {
          margin-left: 5px;
          color: #1db3ce;
        }
      }
      .SendInvitationCode_content_ViewPopup_content_div {
        margin-bottom: 30px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        h2 {
          font-size: 16px;
          font-weight: 400;
          color: #000000;
          line-height: 22px;
        }
        input::-webkit-input-placeholder {
          /* WebKit browsers */
          font-size: 14px;
          font-weight: bold;
          color: rgba(88, 88, 88, 0.5);
          line-height: 20px;
        }
        input::-moz-placeholder {
          /* Mozilla Firefox 19+ */
          font-size: 14px;
          font-weight: bold;
          color: rgba(88, 88, 88, 0.5);
          line-height: 20px;
        }
        input:-ms-input-placeholder {
          /* Internet Explorer 10+ */
          font-size: 14px;
          font-weight: bold;
          color: rgba(88, 88, 88, 0.5);
          line-height: 20px;
        }
        .SendInvitationCode_content_ViewPopup_content_div_input {
          width: 400px;
          height: 40px;
          input {
            padding: 0 30px;
            width: 100%;
            height: 100%;
            background: #f6f7f8;
            border-radius: 20px;
            font-size: 14px;
            font-weight: bold;
            color: #000000;
            line-height: 20px;
          }
          .el-date-editor {
            width: 100%;
            height: 100%;
            .el-input__inner {
              border: none;
              padding: 0 30px;
              background: #f6f7f8;
              border-radius: 20px;
              font-size: 14px;
              font-weight: bold;
              color: #000000;
              line-height: 22px;
            }
            .el-input__suffix {
              right: 14px;
            }
            .el-input__prefix {
              display: none;
            }
            .el-input__icon {
              font-size: 20px;
              color: rgba(88, 88, 88, 0.5);
              // font-weight: bold;
            }
          }
        }
        .SendInvitationCode_content_ViewPopup_content_div_inputs {
          width: 400px;
          height: 40px;
          display: flex;
          justify-content: space-between;
          div {
            width: 186px;
            height: 100%;
            position: relative;
            .span {
              position: absolute;
              right: 14px;
              top: 0;
              font-size: 16px;
              font-weight: bold;
              color: rgba(88, 88, 88, 0.5);
              line-height: 40px;
            }
            input {
              padding: 0 30px;
              width: 100%;
              height: 100%;
              background: #f6f7f8;
              border-radius: 20px;
              font-size: 14px;
              font-weight: bold;
              color: #000000;
              line-height: 20px;
            }
            .el-select {
              width: 100%;
              height: 100%;
              .el-input {
                width: 100%;
                height: 100%;
                .el-input__inner {
                  border: none;
                  padding: 0 30px;
                  background: #f6f7f8;
                  border-radius: 20px;
                  font-size: 14px;
                  font-weight: bold;
                  color: #000000;
                  line-height: 20px;
                }
                .el-input__suffix {
                  right: 14px;
                }
                .el-select__caret {
                  font-size: 20px;
                  // color: #585858;
                  font-weight: bold;
                }
              }
            }
          }
        }
        .inputWidth {
          div {
            width: 100%;
          }
        }
      }
      .SendInvitationCode_content_ViewPopup_content_divs {
        display: flex;
        justify-content: space-between;
        h2 {
          font-size: 16px;
          font-weight: 400;
          color: #000000;
          line-height: 22px;
        }
        .SendInvitationCode_content_ViewPopup_content_divs_input {
          width: 400px;
          margin-bottom: 20px;
          .el-textarea {
            textarea {
              padding: 10px 30px;
              background: #f6f7f8;
              border-radius: 16px;
              font-size: 14px;
              font-weight: bold;
              color: #000000;
              line-height: 20px;
              border: none;
            }
          }
        }
      }
      .SendInvitationCode_content_ViewPopup_content_text {
        display: flex;
        justify-content: center;
        align-items: center;
        p {
          cursor: pointer;
          font-size: 16px;
          font-weight: bold;
          color: #585858;
          line-height: 22px;
          text-decoration: underline;
        }
        span {
          margin: 0 20px;
        }
      }
      .SendInvitationCode_content_ViewPopup_content_button {
        margin-top: 55px;
        margin-bottom: 38px;
        width: 282px;
        height: 56px;
        background: #1db3ce;
        border-radius: 28px;
        font-size: 16px;
        font-weight: bold;
        color: #ffffff;
        line-height: 22px;
      }
      .SendInvitationCode_content_ViewPopup_content_select {
        display: flex;
        justify-content: space-between;
        margin-bottom: 20px;
        input::-webkit-input-placeholder {
          /* WebKit browsers */
          font-size: 14px;
          font-weight: bold;
          color: rgba(88, 88, 88, 0.5);
          line-height: 20px;
        }
        input::-moz-placeholder {
          /* Mozilla Firefox 19+ */
          font-size: 14px;
          font-weight: bold;
          color: rgba(88, 88, 88, 0.5);
          line-height: 20px;
        }
        input:-ms-input-placeholder {
          /* Internet Explorer 10+ */
          font-size: 14px;
          font-weight: bold;
          color: rgba(88, 88, 88, 0.5);
          line-height: 20px;
        }
        .SendInvitationCode_content_ViewPopup_content_div_input {
          width: 400px;
          button {
            display: flex;
            align-items: center;
            margin-bottom: 10px;
            font-size: 16px;
            font-weight: bold;
            color: #585858;
            line-height: 22px;
            img {
              margin-right: 15px;
              width: 26px;
              height: 26px;
            }
            .el-date-editor {
              margin-left: 5px;
              width: 290px;
              height: 40px;
              .el-input__inner {
                border: none;
                padding: 0 30px;
                background: #f6f7f8;
                border-radius: 20px;
                font-size: 14px;
                font-weight: bold;
                color: #000000;
                line-height: 22px;
              }
              .el-input__suffix {
                right: 14px;
              }
              .el-input__prefix {
                display: none;
              }
              .el-input__icon {
                font-size: 20px;
                color: rgba(88, 88, 88, 0.5);
                // font-weight: bold;
              }
            }
          }
          .buttonActive {
            color: #000000;
          }
        }
      }
    }
  }
  .SendInvitationCode_content_Popup {
    z-index: 10;
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    .SendInvitationCode_content_Popup_content {
      width: 378px;
      padding: 62px 37px 44px;
      background: #ffffff;
      border-radius: 10px;
      position: relative;
      text-align: center;
      img {
        height: 118px;
        width: 118px;
      }
      h1 {
        margin-top: 30px;
        margin-bottom: 16px;
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
      button {
        margin-top: 40px;
        width: 100%;
        height: 56px;
        background: #1DB3CE;
        border-radius: 28px;
        font-size: 20px;
        font-weight: bold;
        color: #FFFFFF;
        line-height: 28px;
      }
    }
  }
}
</style>
