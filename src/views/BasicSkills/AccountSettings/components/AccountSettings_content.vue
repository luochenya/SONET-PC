<template>
  <div class="AccountSettings_Content">
    <div class="AccountSettings_Contents">
      <HeaderMenu />
      <div class="AccountSettings_Content_box">
        <h1>個人資料</h1>
        <div class="AccountSettings_Content_box_div">
          <p class="AccountSettings_Content_box_div_p">
            <span>暱稱</span>
            <em v-if="nicknameStatus">必填</em>
          </p>
          <div class="AccountSettings_Content_box_div_input">
            <input
              type="text"
              placeholder="請輸入暱稱"
              v-model="dataForm.nick_name"
              @input="nicknameChange()"
            />
          </div>
          <p class="AccountSettings_Content_box_div_p">
            <span>電子信箱</span>
            <em v-if="emailStatus">無法變更</em>
          </p>
          <div class="AccountSettings_Content_box_div_input">
            <input
              type="text"
              placeholder="請輸入電子信箱"
              disabled
              v-model="dataForm.email"
            />
          </div>
          <p class="AccountSettings_Content_box_div_p">
            <span>真實姓名</span>
          </p>
          <div class="AccountSettings_Content_box_div_input">
            <input
              type="text"
              placeholder="請輸入真實姓名"
              v-model="dataForm.name"
            />
          </div>
          <p class="AccountSettings_Content_box_div_p">
            <span>性別</span>
          </p>
          <div class="AccountSettings_Content_box_div_input">
            <el-select v-model="dataForm.sex" placeholder="請選擇性別">
              <el-option
                v-for="item in ageList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
          <p class="AccountSettings_Content_box_div_p">
            <span>生日</span>
          </p>
          <div class="AccountSettings_Content_box_div_input">
            <el-date-picker
              v-model="dataForm.birthday"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="請選擇日期"
            ></el-date-picker>
          </div>
          <p class="AccountSettings_Content_box_div_p">
            <span>聯絡電話</span>
          </p>
          <div class="AccountSettings_Content_box_div_input">
            <input
              type="text"
              placeholder="請輸入聯絡電話"
              v-model="dataForm.mobile"
            />
          </div>
          <p class="AccountSettings_Content_box_div_p">
            <span>聯絡地址</span>
          </p>
          <div
            class="AccountSettings_Content_box_div_input AccountSettings_Content_box_div_select"
          >
            <el-select v-model="cityItem" value-key="id" placeholder="請選擇市" no-data-text="無數據" @change="cityChange()">
              <el-option
                v-for="item in cityList"
                :key="item.id"
                :label="item.region"
                :value="item"
              >
              </el-option>
            </el-select>
            <el-select v-model="dataForm.district" placeholder="請選擇區" no-data-text="無數據">
              <el-option
                v-for="item in districtList"
                :key="item.id"
                :label="item.region"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </div>
          <p class="AccountSettings_Content_box_div_p">
            <span>詳細地址</span>
          </p>
          <div class="AccountSettings_Content_box_div_input">
            <input
              type="text"
              placeholder="請輸入詳細地址"
              v-model="dataForm.address"
            />
          </div>
          <div class="AccountSettings_Content_box_div_checkout">
            <p>公開訂閱的FC</p>
            <img
              @click="subscriptionClick()"
              v-if="dataForm.is_open_fc == 0"
              src="@/assets/img/btn_Turn_on.png"
              alt=""
            />
            <img
              @click="subscriptionClick()"
              v-if="dataForm.is_open_fc == 1"
              src="@/assets/img/btn_Turn on_default.png"
              alt=""
            />
          </div>
          <button class="AccountSettings_Content_box_div_button" @click="submit()">
            儲存變更
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderMenu from "@/components/HeaderMenu";
import { GET_GetRegion, GET_GetUserInfo, POST_UpdateInfo } from "@/api/api";
export default {
  name: "AccountSettings_Content",
  components: {
    HeaderMenu
  },
  data() {
    return {
      // 昵称提示
      nicknameStatus: false,
      // 邮箱提示
      emailStatus: true,
      dataForm: {},
      cityItem: {},
      ageList: [
        {
          value: 0,
          label: "保密"
        },
        {
          value: 1,
          label: "男"
        },
        {
          value: 2,
          label: "女"
        }
      ],
      cityList: [],
      districtList: []
    };
  },
  created() {
    this._getUserInfo();
  },
  methods: {
    // 獲取個人信息
    _getUserInfo() {
      GET_GetUserInfo().then(res => {
        if (res.code == 200) {
          this.dataForm = res.data;
          sessionStorage.setItem("userInfo", JSON.stringify(res.data));
          if (this.dataForm.region.length && this.dataForm.region && this.dataForm.region[0].id) {
            this._getRegion(this.dataForm.region[0].id);
          } else {
            this._getRegion();
          }
          this.dataForm.city = this.dataForm.region[0].id;
          this.dataForm.district = this.dataForm.region[1].id;
        }
      });
    },
    // 獲取市區
    _getRegion(id) {
      GET_GetRegion().then(res => {
        if (res.code == 200) {
          res.data.list.forEach(item => {
            if (item.pid == 0) {
              this.cityList.push(item)
            }
          })
          if (id) {
            this.cityList.forEach(item => {
              if (item.id == id) {
                this.cityItem = item;
                this.districtList = item.item;
              }
            });
          }
        }
      });
    },
    // 市變動獲取區列表
    cityChange() {
      // 區列表賦值
      this.districtList = this.cityItem.item;
      // 市賦值
      this.dataForm.city = this.cityItem.id;
      // 區值清空
      this.dataForm.district = "";
    },
    // 是否訂閲FC
    subscriptionClick() {
      if (this.dataForm.is_open_fc == 0) {
        this.dataForm.is_open_fc = 1;
      } else {
        this.dataForm.is_open_fc = 0;
      }
    },
    // 儲存變更
    submit() {
      if (!this.dataForm.nick_name) {
        this.nicknameStatus = true;
        return false;
      } else {
        this.nicknameStatus = false;
      }
      this.dataForm.region_ids = this.dataForm.city + ',' + this.dataForm.district;
      POST_UpdateInfo(this.dataForm).then(res => {
        if (res.code == 200) {
          this.$message({
            duration: 1500,
            message: "資料更新成功",
            type: "success"
          });
          this._getUserInfo();
        }
      });
    }
  }
};
</script>

<style lang="scss">
.AccountSettings_Content {
  width: 766px;
  height: 1018px;
  position: relative;
  overflow: hidden;
  .AccountSettings_Contents {
    position: absolute;
    left: 0;
    top: 0;
    right: -17px;
    bottom: 0;
    overflow-x: hidden;
    overflow-y: scroll;
    .AccountSettings_Content_box {
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
      .AccountSettings_Content_box_div {
        width: 100%;
        padding: 30px 174px 30px 90px;
        text-align: center;
        .AccountSettings_Content_box_div_p {
          padding: 0 15px;
          display: flex;
          justify-content: space-between;
          font-size: 16px;
          font-weight: bold;
          color: #585858;
          line-height: 22px;
          em {
            color: #c64040;
          }
        }
        .AccountSettings_Content_box_div_input {
          margin: 6px 0 24px;
          width: 100%;
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
          .el-select,
          .el-date-editor {
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
                color: #585858;
                font-weight: bold;
              }
            }
          }
          .el-date-editor {
            .el-input__inner {
              border: none;
            }
            .el-input__prefix {
              display: none;
            }
            .el-input__suffix {
              right: 14px;
            }
            .el-input__icon {
              font-size: 20px;
              color: #585858;
              // font-weight: bold;
            }
          }
          input::-webkit-input-placeholder {
            /* WebKit browsers */
            font-size: 14px;
            font-weight: 400;
            color: #9ba1a9;
            line-height: 20px;
          }
          input::-moz-placeholder {
            /* Mozilla Firefox 19+ */
            font-size: 14px;
            font-weight: 400;
            color: #9ba1a9;
            line-height: 20px;
          }
          input:-ms-input-placeholder {
            /* Internet Explorer 10+ */
            font-size: 14px;
            font-weight: 400;
            color: #9ba1a9;
            line-height: 20px;
          }
        }
        .AccountSettings_Content_box_div_select {
          display: flex;
          justify-content: space-between;
          .el-select {
            width: 240px;
          }
        }
        .AccountSettings_Content_box_div_checkout {
          margin-top: 16px;
          margin-bottom: 42px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          p {
            padding-left: 15px;
            font-size: 15px;
            font-weight: bold;
            color: #000000;
            line-height: 21px;
          }
          img {
            width: 54px;
            height: 30px;
            cursor: pointer;
          }
        }
        .AccountSettings_Content_box_div_button {
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
