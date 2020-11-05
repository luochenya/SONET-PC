<template>
  <div class="UseQA">
    <Header />
    <div class="UseQA_box response">
      <LeftMenu />
      <UseQAContent />
      <RightMenu />
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header";
import LeftMenu from "@/components/LeftMenu";
import RightMenu from "@/components/RightMenu";
import UseQAContent from "./components/UseQA_content";
export default {
  name: "UseQA",
  components: {
    Header,
    LeftMenu,
    RightMenu,
    UseQAContent
  }
}
</script>

<style lang="scss" scoped>
.UseQA {
  padding-top: 94px;
  padding-bottom: 14px;
  width: 100%;
  min-height: 100vh;
  background: #f6f7f8;
  .UseQA_box {
    display: flex;
    justify-content: space-between;
  }
}
</style>
