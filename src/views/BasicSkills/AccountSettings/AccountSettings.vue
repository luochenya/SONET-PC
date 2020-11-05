<template>
  <div class="AccountSettings">
    <Header />
    <div class="AccountSettings_box response">
      <LeftMenu />
      <AccountSettingsContent />
      <RightMenu />
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header";
import LeftMenu from "@/components/LeftMenu";
import RightMenu from "@/components/RightMenu";
import AccountSettingsContent from "./components/AccountSettings_content";
export default {
  name: "AccountSettings",
  components: {
    Header,
    LeftMenu,
    RightMenu,
    AccountSettingsContent
  }
}
</script>

<style lang="scss" scoped>
.AccountSettings {
  padding-top: 94px;
  padding-bottom: 14px;
  width: 100%;
  min-height: 100vh;
  background: #f6f7f8;
  .AccountSettings_box {
    display: flex;
    justify-content: space-between;
  }
}
</style>
