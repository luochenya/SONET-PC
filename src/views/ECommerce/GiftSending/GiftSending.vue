<template>
  <div class="GiftSending">
    <Header />
    <div class="GiftSending_box response">
      <LeftMenu />
      <GiftSendingContent />
      <RightMenu />
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header";
import LeftMenu from "@/components/LeftMenu";
import RightMenu from "@/components/RightMenu";
import GiftSendingContent from "./components/GiftSending_content";
export default {
  name: "GiftSending",
  components: {
    Header,
    LeftMenu,
    GiftSendingContent,
    RightMenu
  }
}
</script>

<style lang="scss" scoped>
.GiftSending {
  padding-top: 94px;
  padding-bottom: 14px;
  width: 100%;
  min-height: 100vh;
  background: #f6f7f8;
  .GiftSending_box {
    display: flex;
    justify-content: space-between;
  }
}
</style>
