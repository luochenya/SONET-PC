<template>
  <div class="Pupop">
    <div class="Pupop_box">
      <img src="@/assets/img/successful.png" alt="" />
      <slot name="body"></slot>
      <button @click="$emit('submit')">確定</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Pupop",
  props: {
    submit: Function
  }
};
</script>

<style lang="scss" scoped>
.Pupop {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  .Pupop_box {
    width: 378px;
    padding: 80px 48px 52px;
    background: #FFFFFF;
    border-radius: 10px;
    text-align: center;
    h1 {
      margin: 24px 0 11px;
      font-size: 24px;
      font-weight: 500;
      color: #000000;
      line-height: 33px;
      letter-spacing: 1px;
    }
    h2 {
      font-size: 18px;
      font-weight: 400;
      color: #585858;
      line-height: 25px;
      letter-spacing: 1px;
    }
    button {
      margin-top: 40px;
      width: 100%;
      height: 56px;
      background: #1DB3CE;
      border-radius: 28px;
      font-size: 16px;
      font-weight: 500;
      color: #FFFFFF;
      line-height: 22px;
    }
  }
}
</style>
