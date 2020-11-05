<template>
  <div class="SubscriptionManagement">
    <Header />
    <div class="SubscriptionManagement_box response">
      <LeftMenu />
      <SubscriptionManagement_Content />
      <RightMenu />
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header";
import LeftMenu from "@/components/LeftMenu";
import RightMenu from "@/components/RightMenu";
import SubscriptionManagement_Content from "./components/SubscriptionManagement_content";
export default {
  name: "SubscriptionManagement",
  components: {
    Header,
    LeftMenu,
    RightMenu,
    SubscriptionManagement_Content
  }
}
</script>

<style lang="scss" scoped>
.SubscriptionManagement {
  padding-top: 94px;
  padding-bottom: 14px;
  width: 100%;
  min-height: 100vh;
  background: #f6f7f8;
  .SubscriptionManagement_box {
    display: flex;
    justify-content: space-between;
  }
}
</style>
