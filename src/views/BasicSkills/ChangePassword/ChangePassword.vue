<template>
  <div class="ChangePassword">
    <Header />
    <div class="ChangePassword_box response">
      <LeftMenu />
      <ChangePasswordContent />
      <RightMenu />
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header";
import LeftMenu from "@/components/LeftMenu";
import RightMenu from "@/components/RightMenu";
import ChangePasswordContent from "./components/ChangePassword_content";
export default {
  name: "ChangePassword",
  components: {
    Header,
    LeftMenu,
    ChangePasswordContent,
    RightMenu
  }
}
</script>

<style lang="scss" scoped>
.ChangePassword {
  padding-top: 94px;
  padding-bottom: 14px;
  width: 100%;
  min-height: 100vh;
  background: #f6f7f8;
  .ChangePassword_box {
    display: flex;
    justify-content: space-between;
  }
}
</style>
