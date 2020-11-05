<template>
  <div class="SystemNotification">
    <Header />
    <div class="SystemNotification_box response">
      <LeftMenu />
      <NotificationSettingsContent />
      <RightMenu />
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header";
import LeftMenu from "@/components/LeftMenu";
import RightMenu from "@/components/RightMenu";
import NotificationSettingsContent from "./components/SystemNotification_content";
export default {
  name: "SystemNotification",
  components: {
    Header,
    LeftMenu,
    RightMenu,
    NotificationSettingsContent
  }
}
</script>

<style lang="scss" scoped>
.SystemNotification {
  padding-top: 94px;
  padding-bottom: 14px;
  width: 100%;
  min-height: 100vh;
  background: #f6f7f8;
  .SystemNotification_box {
    display: flex;
    justify-content: space-between;
  }
}
</style>
