<template>
  <div class="SendInvitationCode">
    <Header />
    <div class="SendInvitationCode_box response">
      <LeftMenu />
      <SendInvitationCodeContent />
      <RightMenu />
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header";
import LeftMenu from "@/components/LeftMenu";
import RightMenu from "@/components/RightMenu";
import SendInvitationCodeContent from "./components/SendInvitationCode_content";
export default {
  name: "SendInvitationCode",
  components: {
    Header,
    LeftMenu,
    SendInvitationCodeContent,
    RightMenu
  }
}
</script>

<style lang="scss" scoped>
.SendInvitationCode {
  padding-top: 94px;
  padding-bottom: 14px;
  width: 100%;
  min-height: 100vh;
  background: #f6f7f8;
  .SendInvitationCode_box {
    display: flex;
    justify-content: space-between;
  }
}
</style>
