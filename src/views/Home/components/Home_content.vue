<template>
  <div class="Home_content">
    <div class="Home_contents">
      <swiper
        :options="swiperOption"
        ref="mySwiper"
        class="Home_content_swiper"
      >
        <!-- slides -->
        <swiper-slide v-for="(item, index) in ImgList" :key="index">
          <img :src="item.img" alt="" />
        </swiper-slide>
        <!-- Optional controls -->
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
      <div
        class="Home_content_box"
        v-for="(item, index) in dataList"
        :key="index"
      >
        <div class="Home_content_box_details">
          <div class="Home_content_box_details_header">
            <img
              class="Home_content_box_details_header_headerImg"
              :src="item.headerImg"
              alt=""
            />
            <div class="Home_content_box_details_header_name">
              <p>{{ item.name }}</p>
              <span>{{ item.time }}</span>
            </div>
            <div
              class="Home_content_box_details_header_more"
              @click.stop="operationClick(index, operationList[index])"
            >
              <img src="@/assets/img/home_more.png" alt="" />
              <div v-if="operationList[index]">
                <p @click.stop="AddFavorites()">加入收藏夾</p>
                <p @click.stop="AddFavorites()">快速按讚</p>
                <p @click.stop="AddFavorites()">訂閱方案</p>
                <p @click.stop="operationClick(index, operationList[index])">
                  取消
                </p>
              </div>
            </div>
          </div>
          <div class="Home_content_box_details_content">
            <p
              class="Home_content_box_details_content_p"
              :class="contentList[index] ? '' : 'Home_content_box_details_content_p_active'"
              v-html="item.content"
            ></p>
            <button @click="expandTextClick(index)">
              <em>
                展開全文
                <img src="@/assets/img/btn_drop down_default.png" alt="" />
              </em>
            </button>
            <img src="@/assets/img/Rectangle.png" alt="" />
          </div>
        </div>
        <div class="Home_content_box_operation">
          <div class="Home_content_box_operation_left">
            <img src="@/assets/img/giveLike.png" alt="" />
            <button @click="openReply(index)">{{ item.num }}則留言</button>
          </div>
          <div class="Home_content_box_operation_right">
            <div v-for="(items, index) in item.list" :key="index">
              <span>
                <img class="img" :src="items.headerImg" alt="" />
                <img
                  class="img1"
                  v-if="items.type == 1"
                  src="@/assets/img/icon_1.png"
                  alt=""
                />
                <img
                  class="img1"
                  v-if="items.type == 2"
                  src="@/assets/img/icon_2.png"
                  alt=""
                />
                <img
                  class="img1"
                  v-if="items.type == 3"
                  src="@/assets/img/icon_3.png"
                  alt=""
                />
              </span>
              <p>{{ items.num }}</p>
            </div>
          </div>
        </div>
        <div
          v-if="replyStatusList[index]"
          class="Home_content_box_operation_leaveMessage Home_content_box_operation_leaveMessageMore"
        >
          <!-- 三角形 -->
          <div
            class="Home_content_box_operation_leaveMessage_triangle"
          ></div>
          <!-- 查看更多 -->
          <div class="Home_content_box_operation_leaveMessage_more">
            查看更多
            <img src="@/assets/img/btn_down.png" alt="" />
          </div>
          <div class="Home_content_box_operation_leaveMessage_Reply">
            <img src="@/assets/img/RightMenu2.png" alt="" />
            <div>
              <input type="text" />
              <button>
                <img src="@/assets/img/updateImg.png" alt="" />
              </button>
              <button class="button">送出</button>
            </div>
          </div>
          <div
            class="Home_content_box_operation_leaveMessage_ReplyUnderReply"
            v-for="(items, indexs) in item.leaveMessageList"
            :key="indexs"
          >
            <div class="ReplyUnderReply_headerImg">
              <img src="@/assets/img/RightMenu2.png" alt="" />
            </div>
            <div class="ReplyUnderReply_content">
              <div class="ReplyUnderReply_content_reply">
                <p>
                  {{ items.name }}：
                  <span>{{ items.content }}</span>
                </p>
                <div
                  class="ReplyUnderReply_content_reply_div"
                  @click.stop="
                    replyOperationClick(indexs, replyOperationList[indexs])
                  "
                >
                  <img src="@/assets/img/home_more.png" alt="" />
                  <div v-if="replyOperationList[indexs]">
                    <p
                      @click.stop="
                        replyOperationClick(indexs, replyOperationList[indexs])
                      "
                    >
                      刪除留言
                    </p>
                    <p
                      @click.stop="
                        replyOperationClick(indexs, replyOperationList[indexs])
                      "
                    >
                      取消
                    </p>
                  </div>
                </div>
              </div>
              <div class="ReplyUnderReply_content_reply divs">
                <h3>{{ items.time }}</h3>
                <button @click="replyUnderReplyClick(indexs)">回復</button>
              </div>
              <div
                class="ReplyUnderReplyUnderReply"
                v-if="replyUnderReplyList[indexs]"
              >
                <div class="ReplyUnderReplyUnderReply_triangle"></div>
                <div
                  class="ReplyUnderReplyUnderReply_triangle_div"
                  v-for="(itemss, indexss) in items.replyList"
                  :key="indexss"
                >
                  <img
                    class="ReplyUnderReplyUnderReply_triangle_div_headerImg"
                    :src="itemss.headerImg"
                    alt=""
                  />
                  <div class="ReplyUnderReplyUnderReply_triangle_div_content">
                    <p>
                      {{ itemss.name }}：
                      <span>{{ itemss.content }}</span>
                    </p>
                    <h3>{{ itemss.time }}</h3>
                  </div>
                </div>
                <div class="ReplyUnderReplyUnderReply_triangle_reply">
                  <img src="@/assets/img/RightMenu2.png" alt="" />
                  <div>
                    <input type="text" />
                    <button class="imgButton">
                      <img src="@/assets/img/updateImg.png" alt="" />
                    </button>
                    <button class="submitButton">送出</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home_content",
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
      // 顶部轮播图片
      ImgList: [
        {
          img: require("@/assets/img/homeContent.png")
        },
        {
          img: require("@/assets/img/homeContent.png")
        },
        {
          img: require("@/assets/img/homeContent.png")
        }
      ],
      // 数据列表
      dataList: [
        {
          headerImg: require("@/assets/img/RightMenu2.png"),
          name: "Eric周興哲",
          time: "2020.03.22・14:51",
          content:
            "<p>《小時候的我們》限量精裝專輯霸榜獻禮――――<a href=''>ERIC HOME系列 限量商品</a><br /><br /></p><p>感謝小興星們的支持，《小時候的我們》精裝專輯連續霸榜博客來銷售冠軍，特別獨家回饋，由Eric周興哲親手製造，並以NASA授權技術、奈米製程、100%純正無添加，原地高成本人工採集，完整收藏Eric呼吸過的家裡空氣、日常用水、蕭邦狗毛，數量稀少(比小編頭髮還少)...</p>",
          imgUrl: require("@/assets/img/giveLike.png"),
          num: "26,623",
          list: [
            {
              type: 1,
              headerImg: require("@/assets/img/RightMenu2.png"),
              num: "16.1k"
            },
            {
              type: 2,
              headerImg: require("@/assets/img/RightMenu2.png"),
              num: "14.6k"
            },
            {
              type: 3,
              headerImg: require("@/assets/img/RightMenu2.png"),
              num: "13.1k"
            },
            {
              type: 4,
              headerImg: require("@/assets/img/RightMenu2.png"),
              num: "12.1k"
            },
            {
              type: 5,
              headerImg: require("@/assets/img/RightMenu2.png"),
              num: "11.1k"
            }
          ],
          leaveMessageList: [
            {
              headerImg: require("@/assets/img/RightMenu2.png"),
              name: "Reaaal",
              content: "也太Q了吧……",
              time: "2020-04-02 17:51",
              replyList: [
                {
                  headerImg: require("@/assets/img/RightMenu2.png"),
                  name: "約翰：",
                  content: "有那麼誇張嗎",
                  time: "2020-04-02 17:51"
                },
                {
                  headerImg: require("@/assets/img/RightMenu2.png"),
                  name: "Reaaal",
                  content: "也太Q了吧……",
                  time: "2020-04-02 17:51"
                }
              ]
            },
            {
              headerImg: require("@/assets/img/RightMenu2.png"),
              name: "約翰：",
              content: "有那麼誇張嗎",
              time: "2020-04-02 17:51",
              replyList: [
                {
                  headerImg: require("@/assets/img/RightMenu2.png"),
                  name: "Reaaal",
                  content: "也太Q了吧……",
                  time: "2020-04-02 17:51"
                },
                {
                  headerImg: require("@/assets/img/RightMenu2.png"),
                  name: "Reaaal",
                  content: "也太Q了吧……",
                  time: "2020-04-02 17:51"
                }
              ]
            }
          ]
        },
        {
          headerImg: require("@/assets/img/RightMenu2.png"),
          name: "Eric周興哲",
          time: "2020.03.22・14:51",
          content:
            "<p>《小時候的我們》限量精裝專輯霸榜獻禮――――<a href=''>ERIC HOME系列 限量商品</a><br /><br /></p><p>感謝小興星們的支持，《小時候的我們》精裝專輯連續霸榜博客來銷售冠軍，特別獨家回饋，由Eric周興哲親手製造，並以NASA授權技術、奈米製程、100%純正無添加，原地高成本人工採集，完整收藏Eric呼吸過的家裡空氣、日常用水、蕭邦狗毛，數量稀少(比小編頭髮還少)...</p>",
          imgUrl: require("@/assets/img/giveLike.png"),
          num: "26,623",
          list: [
            {
              type: 1,
              headerImg: require("@/assets/img/RightMenu2.png"),
              num: "16.1k"
            },
            {
              type: 2,
              headerImg: require("@/assets/img/RightMenu2.png"),
              num: "14.6k"
            },
            {
              type: 3,
              headerImg: require("@/assets/img/RightMenu2.png"),
              num: "13.1k"
            },
            {
              type: 4,
              headerImg: require("@/assets/img/RightMenu2.png"),
              num: "12.1k"
            },
            {
              type: 5,
              headerImg: require("@/assets/img/RightMenu2.png"),
              num: "11.1k"
            }
          ],
          leaveMessageList: [
            {
              headerImg: require("@/assets/img/RightMenu2.png"),
              name: "Reaaal",
              content: "也太Q了吧……",
              time: "2020-04-02 17:51",
              replyList: [
                {
                  headerImg: require("@/assets/img/RightMenu2.png"),
                  name: "約翰：",
                  content: "有那麼誇張嗎",
                  time: "2020-04-02 17:51"
                },
                {
                  headerImg: require("@/assets/img/RightMenu2.png"),
                  name: "Reaaal",
                  content: "也太Q了吧……",
                  time: "2020-04-02 17:51"
                }
              ]
            },
            {
              headerImg: require("@/assets/img/RightMenu2.png"),
              name: "約翰：",
              content: "有那麼誇張嗎",
              time: "2020-04-02 17:51",
              replyList: [
                {
                  headerImg: require("@/assets/img/RightMenu2.png"),
                  name: "Reaaal",
                  content: "也太Q了吧……",
                  time: "2020-04-02 17:51"
                },
                {
                  headerImg: require("@/assets/img/RightMenu2.png"),
                  name: "Reaaal",
                  content: "也太Q了吧……",
                  time: "2020-04-02 17:51"
                }
              ]
            }
          ]
        },
        {
          headerImg: require("@/assets/img/RightMenu2.png"),
          name: "Eric周興哲",
          time: "2020.03.22・14:51",
          content:
            "<p>《小時候的我們》限量精裝專輯霸榜獻禮――――<a href=''>ERIC HOME系列 限量商品</a><br /><br /></p><p>感謝小興星們的支持，《小時候的我們》精裝專輯連續霸榜博客來銷售冠軍，特別獨家回饋，由Eric周興哲親手製造，並以NASA授權技術、奈米製程、100%純正無添加，原地高成本人工採集，完整收藏Eric呼吸過的家裡空氣、日常用水、蕭邦狗毛，數量稀少(比小編頭髮還少)...</p>",
          imgUrl: require("@/assets/img/giveLike.png"),
          num: "26,623",
          list: [
            {
              type: 1,
              headerImg: require("@/assets/img/RightMenu2.png"),
              num: "16.1k"
            },
            {
              type: 2,
              headerImg: require("@/assets/img/RightMenu2.png"),
              num: "14.6k"
            },
            {
              type: 3,
              headerImg: require("@/assets/img/RightMenu2.png"),
              num: "13.1k"
            },
            {
              type: 4,
              headerImg: require("@/assets/img/RightMenu2.png"),
              num: "12.1k"
            },
            {
              type: 5,
              headerImg: require("@/assets/img/RightMenu2.png"),
              num: "11.1k"
            }
          ],
          leaveMessageList: [
            {
              headerImg: require("@/assets/img/RightMenu2.png"),
              name: "Reaaal",
              content: "也太Q了吧……",
              time: "2020-04-02 17:51",
              replyList: [
                {
                  headerImg: require("@/assets/img/RightMenu2.png"),
                  name: "約翰：",
                  content: "有那麼誇張嗎",
                  time: "2020-04-02 17:51"
                },
                {
                  headerImg: require("@/assets/img/RightMenu2.png"),
                  name: "Reaaal",
                  content: "也太Q了吧……",
                  time: "2020-04-02 17:51"
                }
              ]
            },
            {
              headerImg: require("@/assets/img/RightMenu2.png"),
              name: "約翰：",
              content: "有那麼誇張嗎",
              time: "2020-04-02 17:51",
              replyList: [
                {
                  headerImg: require("@/assets/img/RightMenu2.png"),
                  name: "Reaaal",
                  content: "也太Q了吧……",
                  time: "2020-04-02 17:51"
                },
                {
                  headerImg: require("@/assets/img/RightMenu2.png"),
                  name: "Reaaal",
                  content: "也太Q了吧……",
                  time: "2020-04-02 17:51"
                }
              ]
            }
          ]
        }
      ],
      // 查看全文列表
      contentList: [],
      // 列表操作列表
      operationList: [],
      // 留言展开列表
      replyStatusList: [],
      // 留言操作列表
      replyOperationList: [],
      // 留言下的留言列表
      replyUnderReplyList: []
    };
  },
  mounted() {
    this.dataList.forEach((item, index) => {
      this.contentList.splice(index, 0, false);
      this.operationList.splice(index, 0, false);
      this.replyStatusList.splice(index, 0, false);
      item.leaveMessageList.forEach((items, indexs) => {
        this.replyOperationList.splice(indexs, 0, false);
        this.replyUnderReplyList.splice(indexs, 0, false);
      });
    });
  },
  methods: {
    // 列表操作点击
    operationClick(index, status) {
      var that = this;
      // 关闭其他打开操作
      that.operationList.forEach((item, index) => {
        that.operationList.splice(index, 0, false);
      });
      // 打开或关闭当前操作
      that.operationList.splice(index, 1, !status);
      function emojiDisShow() {
        //改变数据 重要的是在body上绑定事件, 让数据变成false, 最重要的是阻止点击emoji标签时候禁止冒泡到body上,所以用stop,
        that.operationList.forEach((item, index) => {
          that.operationList.splice(index, 0, false);
        });
        document.body.removeEventListener("click", emojiDisShow); //消失后,为了性能,取消body这个事件就可以了
      }
      document.body.addEventListener("click", emojiDisShow);
    },
    // 留言操作点击
    replyOperationClick(index, status) {
      var that = this;
      // 关闭其他打开操作
      that.replyOperationList.forEach((item, index) => {
        that.replyOperationList.splice(index, 0, false);
      });
      // 打开或关闭当前操作
      that.replyOperationList.splice(index, 1, !status);
      function emojiDisShows() {
        //改变数据 重要的是在body上绑定事件, 让数据变成false, 最重要的是阻止点击emoji标签时候禁止冒泡到body上,所以用stop,
        that.replyOperationList.forEach((item, index) => {
          that.replyOperationList.splice(index, 0, false);
        });
        document.body.removeEventListener("click", emojiDisShows); //消失后,为了性能,取消body这个事件就可以了
      }
      document.body.addEventListener("click", emojiDisShows);
    },
    // 打开关闭留言
    openReply(index) {
      this.replyStatusList.splice(index, 1, !this.replyStatusList[index]);
    },
    // 打开留言下的留言
    replyUnderReplyClick(index) {
      this.replyUnderReplyList.splice(
        index,
        1,
        !this.replyUnderReplyList[index]
      );
    },
    // 展开全文
    expandTextClick(index) {
      this.contentList.splice(index, 1, !this.contentList[index]);
    },
    // 加入购物车
    AddFavorites() {
      console.log("加入购物车");
    }
  }
};
</script>

<style lang="scss">
.Home_content {
  width: 766px;
  height: 1018px;
  position: relative;
  overflow: hidden;
  .Home_contents {
    position: absolute;
    left: 0;
    top: 0;
    right: -17px;
    bottom: 0;
    overflow-x: hidden;
    overflow-y: scroll;
    .Home_content_swiper {
      width: 100%;
      height: 395px;
      background: #ffffff;
      img {
        width: 100%;
        height: 100%;
      }
      .swiper-pagination-bullet {
        background: #ffffff;
      }
      .swiper-pagination-bullet-active {
        background: #ffffff;
      }
    }
    .Home_content_box {
      margin-top: 10px;
      background: #ffffff;
      .Home_content_box_details {
        padding: 26px 44px 30px 26px;
        .Home_content_box_details_header {
          display: flex;
          align-items: center;
          height: 62px;
          .Home_content_box_details_header_headerImg {
            width: 62px;
            height: 62px;
            margin-right: 14px;
          }
          .Home_content_box_details_header_name {
            p {
              font-size: 16px;
              font-weight: bold;
              color: #000000;
              line-height: 26px;
            }
            span {
              font-size: 14px;
              font-weight: 400;
              color: #585858;
              line-height: 22px;
            }
          }
          .Home_content_box_details_header_more {
            cursor: pointer;
            margin-left: auto;
            margin-bottom: auto;
            position: relative;
            img {
              width: 28px;
              height: 14px;
            }
            div {
              position: absolute;
              right: 0;
              top: 22px;
              width: 144px;
              padding: 4px 0;
              background: #ffffff;
              box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.3);
              border-radius: 2px;
              p {
                text-align: center;
                width: 100%;
                height: 40px;
                font-size: 14px;
                font-weight: 400;
                color: #585858;
                line-height: 40px;
              }
              p:hover {
                background: #f6f7f8;
                color: #c64040;
              }
            }
          }
        }
        .Home_content_box_details_content {
          padding-left: 76px;
          .Home_content_box_details_content_p {
            text-indent: 2em;
            font-size: 16px;
            font-weight: 400;
            color: #000000;
            line-height: 26px;
          }
          .Home_content_box_details_content_p_active {
            word-break: break-all;
            text-overflow: ellipsis;
            overflow: hidden;
            display: -webkit-box;
            -webkit-line-clamp: 5;
            -webkit-box-orient: vertical;
          }
          button {
            font-size: 16px;
            font-weight: 400;
            color: #1db3ce;
            height: 26px;
            line-height: 22px;
            em {
              display: flex;
              align-items: center;
              img {
                margin-top: 0;
              }
            }
          }
          img {
            margin-top: 22px;
          }
        }
      }
      .Home_content_box_operation {
        width: 100%;
        height: 92px;
        padding-left: 102px;
        padding-right: 44px;
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        justify-content: space-between;
        .Home_content_box_operation_left {
          img {
            width: 36px;
            height: 36px;
          }
          button {
            cursor: pointer;
            margin-top: 4px;
            display: block;
            text-decoration: underline;
            font-size: 12px;
            font-weight: 400;
            color: #1db3ce;
            line-height: 17px;
          }
        }
        .Home_content_box_operation_right {
          display: flex;
          div {
            margin-left: 10px;
            text-align: center;
            span {
              display: block;
              position: relative;
              width: 37px;
              height: 43px;
              .img {
                z-index: 1;
                width: 30px;
                height: 30px;
                position: absolute;
                left: 3.5px;
                bottom: 4px;
              }
              .img1 {
                position: absolute;
                left: 0;
                top: 0;
              }
            }
            p {
              margin-top: 4px;
              font-size: 12px;
              font-weight: 400;
              color: #585858;
              line-height: 17px;
            }
          }
        }
      }
      .Home_content_box_operation_leaveMessageMore {
        padding-bottom: 50px;
      }
      .Home_content_box_operation_leaveMessage {
        margin-top: -5px;
        width: 100%;
        background: #ecedef;
        position: relative;
        .Home_content_box_operation_leaveMessage_triangle {
          position: absolute;
          left: 130px;
          top: -12px;
          width: 0;
          height: 0;
          border-left: 5px solid transparent;
          border-right: 5px solid transparent;
          border-bottom: 12px solid #ecedef;
          border-color: transparent transparent #ecedef;
        }
        .Home_content_box_operation_leaveMessage_more {
          cursor: pointer;
          position: absolute;
          left: 0;
          bottom: 0;
          width: 100%;
          height: 50px;
          background: #ffffff;
          box-shadow: 0px -1px 2px 0px rgba(0, 0, 0, 0.05);
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 16px;
          font-weight: 400;
          color: #585858;
          img {
            transform: rotate(180deg);
          }
        }
        .Home_content_box_operation_leaveMessage_Reply {
          padding: 22px 44px 22px 42px;
          display: flex;
          align-items: center;
          img {
            margin-right: 10px;
            width: 50px;
            height: 50px;
          }
          div {
            width: calc(100% - 60px);
            display: flex;
            justify-content: space-between;
            input {
              padding: 0 18px;
              width: 474px;
              height: 40px;
              background: #ffffff;
              border-radius: 27px;
              border: 1px solid #1db3ce;
              font-size: 16px;
              font-weight: 400;
              color: #000000;
              line-height: 30px;
            }
            button {
              width: 40px;
              height: 40px;
              img {
                margin-right: 0;
                width: 100%;
                height: 100%;
              }
            }
            .button {
              width: 86px;
              height: 40px;
              background: #1db3ce;
              border-radius: 20px;
              font-size: 14px;
              font-weight: 400;
              color: #ffffff;
              line-height: 20px;
            }
          }
        }
        .Home_content_box_operation_leaveMessage_ReplyUnderReply {
          padding: 14px 44px 20px 42px;
          display: flex;
          justify-content: flex-end;
          border-bottom: 2px solid #f6f7f8;
          .ReplyUnderReply_headerImg {
            margin-right: 10px;
            width: 50px;
            height: 50px;
            text-align: right;
            img {
              width: 38px;
              height: 38px;
            }
          }
          .ReplyUnderReply_content {
            width: calc(100% - 60px);
            display: flex;
            flex-wrap: wrap;
            .ReplyUnderReply_content_reply {
              width: 100%;
              display: flex;
              justify-content: space-between;
              .ReplyUnderReply_content_reply_div {
                cursor: pointer;
                position: relative;
                img {
                  width: 28px;
                  height: 14px;
                }
                div {
                  position: absolute;
                  z-index: 2;
                  right: 0;
                  top: 22px;
                  width: 144px;
                  padding: 4px 0;
                  background: #ffffff;
                  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.3);
                  border-radius: 2px;
                  p {
                    text-align: center;
                    width: 100%;
                    height: 40px;
                    font-size: 14px;
                    font-weight: 400;
                    color: #585858;
                    line-height: 40px;
                  }
                  p:hover {
                    background: #f6f7f8;
                    color: #c64040;
                  }
                }
              }
              p {
                font-size: 14px;
                font-weight: 400;
                color: #1db3ce;
                line-height: 20px;
                span {
                  color: #585858;
                }
              }
              h3 {
                font-size: 14px;
                font-weight: 400;
                color: #9ba1a9;
                line-height: 20px;
              }
              button {
                font-size: 14px;
                font-weight: 400;
                color: #1db3ce;
                line-height: 20px;
              }
            }
            .divs {
              margin-top: 18px;
            }
            .ReplyUnderReplyUnderReply {
              padding: 10px 14px;
              width: 100%;
              margin-top: 12px;
              position: relative;
              background: rgba(155, 161, 169, 0.1);
              display: flex;
              flex-wrap: wrap;
              .ReplyUnderReplyUnderReply_triangle {
                position: absolute;
                right: 10px;
                top: -12px;
                width: 0;
                height: 0;
                border-left: 5px solid transparent;
                border-right: 5px solid transparent;
                border-bottom: 12px solid rgba(155, 161, 169, 0.1);
                border-color: transparent transparent rgba(155, 161, 169, 0.1);
              }
              .ReplyUnderReplyUnderReply_triangle_div {
                display: flex;
                width: 100%;
                .ReplyUnderReplyUnderReply_triangle_div_headerImg {
                  width: 30px;
                  height: 30px;
                  margin-right: 8px;
                }
                .ReplyUnderReplyUnderReply_triangle_div_content {
                  p {
                    font-size: 14px;
                    font-weight: 400;
                    color: #1db3ce;
                    line-height: 20px;
                    span {
                      color: #585858;
                    }
                  }
                  h3 {
                    margin: 4px 0;
                    font-size: 12px;
                    font-weight: 400;
                    color: #9ba1a9;
                    line-height: 17px;
                  }
                }
              }
              .ReplyUnderReplyUnderReply_triangle_reply {
                margin: 0 9px;
                padding: 13px 16px;
                width: calc(100% - 18px);
                background: #ffffff;
                border-radius: 2px;
                display: flex;
                align-items: center;
                img {
                  width: 30px;
                  height: 30px;
                  margin-right: 8px;
                }
                div {
                  display: flex;
                  align-items: center;
                  width: calc(100% - 38px);
                  input {
                    padding: 0 13px;
                    width: calc(100% - 120px);
                    height: 30px;
                    background: #ffffff;
                    border-radius: 27px;
                    border: 1px solid #1db3ce;
                    font-size: 14px;
                    font-weight: 400;
                    color: #000000;
                    line-height: 30px;
                  }
                  .imgButton {
                    width: 30px;
                    height: 30px;
                    margin: 0 10px;
                  }
                  .submitButton {
                    width: 70px;
                    height: 30px;
                    background: #1db3ce;
                    border-radius: 20px;
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
    }
  }
}
</style>
