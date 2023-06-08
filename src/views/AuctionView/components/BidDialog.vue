<template>
  <div class="BidDialog dialog animate__animated animate__fadeIn">
    <div class="dialog-mask"></div>
    <div class="dialog-content">
      <div class="dialog-header">
        <div class="title">
          Bid - #5 Land
        </div>
        <img src="../../../assets/svg/close.svg" alt="" class="close" @click="$emit('closeDialog')">
      </div>
      <div class="dialog-content-container">
        <BidDialogContent></BidDialogContent>
      </div>
    </div>
  </div>
</template>

<script>
import BidDialogContent from "@/views/AuctionView/components/BidDialogContent";
export default {
  name: "BidDialog",
  props: ["closeDialog"],
  components:{BidDialogContent},
  data() {
    return {
      activeIndex: 1,
    }
  },


}
</script>

<style lang="scss" scoped>
.dialog-content-container {
  min-width: 400px;
  overflow-y: scroll;
  overflow-x: hidden;
  max-height: 80vh;
  padding-bottom: 38px;

  @media screen and (max-width: 1000px) {
    min-width: 0;
    width: 95vw;
  }
}
</style>
