<template>
  <div class="PointsRecord">
    <Header />
    <div class="PointsRecord_box response">
      <LeftMenu />
      <PointsRecordContent />
      <RightMenu />
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header";
import LeftMenu from "@/components/LeftMenu";
import RightMenu from "@/components/RightMenu";
import PointsRecordContent from "./components/PointsRecord_content";
export default {
  name: "PointsRecord",
  components: {
    Header,
    LeftMenu,
    PointsRecordContent,
    RightMenu
  }
}
</script>

<style lang="scss" scoped>
.PointsRecord {
  padding-top: 94px;
  padding-bottom: 14px;
  width: 100%;
  min-height: 100vh;
  background: #f6f7f8;
  .PointsRecord_box {
    display: flex;
    justify-content: space-between;
  }
}
</style>
