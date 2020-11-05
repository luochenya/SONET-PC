<template>
  <div class="HeaderMenu">
    <div class="HeaderMenu_box" v-for="(item, index) in SocialList" :key="index" @click="SocialClick(index)">
      <img :src="item.img" alt="" />
      <p v-if="item.type">{{item.title}}</p>
      <h3 v-if="!item.type">未绑定</h3>
    </div>
    <div class="HeaderMenu_poput" v-if="popupStatus" @click="popupStatus = false">
      <div class="HeaderMenu_poput_box" @click.stop="">
        <img src="@/assets/img/icon_lose.png" alt="" />
        <h2>確定取消</h2>
        <h3>取消綁定後，社群軟體上的行為將不再適用點數贈與條款</h3>
        <div>
          <button @click="popupStatus = false">取消</button>
          <button class="button" @click="submit()">確定</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HeaderMenu",
  data() {
    return {
      index: "",
      popupStatus: false,
      SocialList: [
        {
          img: require("@/assets/img/icon_spotify.png"),
          title: "Spotify",
          type: true
        },
        {
          img: require("@/assets/img/icon_ins.png"),
          title: "Instagram",
          type: true
        },
        {
          img: require("@/assets/img/icon_facebook.png"),
          title: "Facebook",
          type: false
        },
        {
          img: require("@/assets/img/icon_yt.png"),
          title: "YouTube",
          type: false
        }
      ]
    }
  },
  methods: {
    // 社交软件解绑
    SocialClick(index) {
      this.popupStatus = true
      this.index = index
    },
    submit() {
      this.SocialList[this.index].type = false
      this.popupStatus = false
    }
  }
}
</script>

<style lang="scss" scoped>
.HeaderMenu {
  width: 100%;
  height: 133px;
  background: #fff;
  display: flex;
  justify-content: space-around;
  align-items: center;
  .HeaderMenu_box {
    width: 25%;
    cursor: pointer;
    text-align: center;
    p {
      margin-top: 12px;
      font-size: 14px;
      font-weight: bold;
      color: #000000;
      line-height: 20px;
    }
    h3 {
      margin-top: 12px;
      font-size: 14px;
      font-weight: bold;
      line-height: 20px;
      color: #9BA1A9;
    }
  }
  .HeaderMenu_poput {
    z-index: 90;
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    .HeaderMenu_poput_box {
      text-align: center;
      padding: 62px 28px 44px;
      width: 378px;
      background: #FFFFFF;
      border-radius: 10px;
      img {
        width: 118px;
        height: 118px;
      }
      h2 {
        margin: 34px 0 12px;
        font-size: 24px;
        font-weight: bold;
        color: #000000;
        line-height: 33px;
      }
      h3 {
        font-size: 18px;
        font-weight: 400;
        color: #585858;
        line-height: 25px;
        letter-spacing: 1px;
      }
      div {
        margin-top: 35px;
        display: flex;
        justify-content: space-between;
        button {
          width: 140px;
          height: 56px;
          background: rgba(29,179,206, 0.2);
          border-radius: 28px;
          font-size: 20px;
          font-weight: bold;
          color: #FFFFFF;
          line-height: 28px;
        }
        .button {
          background: rgba(29,179,206, 1);
        }
      }
    }
  }
}
</style>
