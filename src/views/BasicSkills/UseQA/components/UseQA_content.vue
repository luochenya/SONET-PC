<template>
  <div class="UseQAContent">
    <div class="UseQAContents">
      <HeaderMenu />
      <div class="UseQAContent_box">
        <h1>使用Q&A</h1>
        <div class="UseQAContent_box_div">
          <div class="UseQAContent_box_div_search">
            <el-select v-model="tag_id" placeholder="請選擇" no-data-text="無數據" @change="_getAnswerSearch()">
              <el-option
                v-for="item in tagList"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
            <div class="UseQAContent_box_div_search_input">
              <input type="text" v-model="title" />
              <button @click="_getAnswerSearch()">
                <img src="@/assets/img/QAsearch.png" alt="" />
                搜尋
              </button>
            </div>
          </div>
          <!-- 有數據 -->
          <div class="UseQAContent_box_div_content" v-for="(item, index) in dataList" :key="index" @click="openList(index)">
            <h2>Q：{{item.title}}</h2>
            <h3 v-if="selectList[index]">{{item.content}}</h3> 
            <div>
              <button>
                <i v-if="selectList[index]">收起</i>
                <img :class="selectList[index] ? '' : 'img'" src="@/assets/img/btn_down.png" alt="" />
              </button>
            </div>
          </div>
          <!-- 無數據 -->
          <div class="UseQAContent_box_div_Null" v-if="dataList && dataList.length == 0">
            <img src="@/assets/img/icon_notice.png" alt="" />
            <p>查無此關鍵字</p>
            <button @click="returnQAList()">返回使用Q&A列表</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderMenu from "@/components/HeaderMenu";
import { GET_GetAnswerTag, GET_GetAnswerSearch} from "@/api/api"
export default {
  name: "UseQAContent",
  components: {
    HeaderMenu
  },
  data() {
    return {
      title: "",
      tag_id: "",
      tagList: [],
      selectList:[],
      dataList: []
    };
  },
  created() {
    this._getAnswerTag()
    this._getAnswerSearch()
  },
  methods: {
    // 獲取QA分類
    _getAnswerTag() {
      GET_GetAnswerTag().then(res => {
        if (res.code == 200) {
          this.tagList = res.data.list
        }
      })
    },
    // QA分類搜索
    _getAnswerSearch() {
      let form = {
        title: this.title,
        tag_id: this.tag_id
      }
      GET_GetAnswerSearch(form).then(res => {
        if (res.code == 200) {
          this.dataList = res.data.list
          res.data.list.forEach((item, index) => {
            this.selectList.splice(index, 0, false)
          }) 
        }
      })
    },
    // 返回QA列表
    returnQAList() {
      this.title = ""
      this.tag_id = ""
      this._getAnswerSearch()
    },
    // 展開内容
    openList(index) {
      this.selectList.splice(index, 1, !this.selectList[index])
    }
  }
};
</script>

<style lang="scss">
.UseQAContent {
  width: 766px;
  height: 1018px;
  position: relative;
  overflow: hidden;
  .UseQAContents {
    position: absolute;
    left: 0;
    top: 0;
    right: -17px;
    bottom: 0;
    overflow-x: hidden;
    overflow-y: scroll;
    .UseQAContent_box {
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
      .UseQAContent_box_div {
        width: 100%;
        padding: 30px 90px;
        .UseQAContent_box_div_search {
          margin-bottom: 20px;
          width: 100%;
          display: flex;
          justify-content: space-between;
          .el-select {
            width: 144px;
            height: 40px;
            .el-input {
              width: 100%;
              height: 100%;
              .el-input__inner {
                border: none;
                border: 1px solid #C0CAD3;
                padding: 0 20px;
                background: #FFFFFF;
                border-radius: 20px;
                font-size: 14px;
                font-weight: bold;
                color: #585858;
                line-height: 20px;
              }
              .el-input__suffix {
                right: 3px;
              }
              .el-select__caret {
                font-size: 14px;
                color: #585858;
                font-weight: bold;
              }
            }
          }
          .UseQAContent_box_div_search_input {
            width: 390px;
            height: 40px;
            position: relative;
            input {
              padding: 0 90px 0 20px;
              width: 100%;
              height: 100%;
              background: #FFFFFF;
              border-radius: 20px;
              border: 1px solid #1DB3CE;
            }
            button {
              position: absolute;
              right: 0;
              top: 0;
              width: 80px;
              height: 40px;
              background: #1DB3CE;
              border-radius: 0px 20px 20px 0px;
              font-size: 14px;
              font-weight: 400;
              color: #FFFFFF;
              line-height: 20px;
              display: flex;
              justify-content: center;
              align-items: center;
              img {
                margin-right: 4px;
                height: 24px;
                width: 24px;
              }
            }
          }
        }
        .UseQAContent_box_div_content {
          padding-top: 20px;
          padding-bottom: 20px;
          border-bottom: 1px solid #F6F7F8;
          h2 {
            font-size: 14px;
            font-weight: bold;
            color: #424247;
            line-height: 20px;
          }
          h3 {
            margin-top: 10px;
            font-size: 14px;
            font-weight: bold;
            color: #585858;
            line-height: 20px;
          }
          div {
            display: flex;
            align-items: center;
            justify-content: center;
            button {
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 14px;
              font-weight: bold;
              color: #1DB3CE;
              line-height: 20px;
              .img {
                transform: rotate(180deg);
              }
            }
          }
        }
        .UseQAContent_box_div_Null {
          margin-top: 100px;
          text-align: center;
          img {
            width: 192px;
            height: 217px;
          }
          p {
            margin: 27px 0 38px;
            font-size: 17px;
            font-weight: bold;
            color: #9BA1A9;
            line-height: 24px;
          }
          button {
            width: 282px;
            height: 56px;
            background: #1DB3CE;
            border-radius: 28px;
            font-size: 16px;
            font-weight: bold;
            color: #FFFFFF;
            line-height: 22px;
          }
        }
      }
    }
  }
}
</style>
