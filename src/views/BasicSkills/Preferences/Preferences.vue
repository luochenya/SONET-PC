<template>
  <div class="Preferences">
    <Header />
    <div class="Preferences_box response">
      <LeftMenu />
      <PreferencesContent />
      <RightMenu />
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header";
import LeftMenu from "@/components/LeftMenu";
import RightMenu from "@/components/RightMenu";
import PreferencesContent from "./components/Preferences_content";
export default {
  name: "Preferences",
  components: {
    Header,
    LeftMenu,
    RightMenu,
    PreferencesContent
  }
}
</script>

<style lang="scss" scoped>
.Preferences {
  padding-top: 94px;
  padding-bottom: 14px;
  width: 100%;
  min-height: 100vh;
  background: #f6f7f8;
  .Preferences_box {
    display: flex;
    justify-content: space-between;
  }
}
</style>
