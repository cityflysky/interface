<template>
  <div class="ClaimDialog dialog">
    <div class="dialog-mask"></div>
    <div class="dialog-content">
      <div class="dialog-header">
        <div class="title">
          Claim TBC
        </div>
        <img src="../../../assets/svg/close.svg" alt="" class="close" @click="$emit('closeDialog')">
      </div>
      <div class="dialog-content-container">
        <div class="info">
          Claim all TBC
        </div>
        <div class="input-box">
          <input type="number" placeholder="Claimable">
          <div class="right-tip">
            <img src="../../../assets/images/coin-logo.webp" alt="" class="icon">
            1,200 TBC
          </div>
        </div>
        <div class="input-box">
          <div class="left">Wallet TBC</div>
          <div class="right-tip">
            1,200 TBC
            <div class="to">
              >
            </div>
            1,200 TBC
          </div>
        </div>
        <div class="primary-btn-sha">
          Claim TBC
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ClaimDialog"
}
</script>

<style lang="scss" scoped>
.ClaimDialog {
  .dialog-content{
    width: 345px;

    .dialog-content-container{
      padding: 0 30px;
      .info{
        font-size: 12px;
        font-family: Roboto-Medium, Roboto;
        font-weight: 500;
        color: #333333;
      }
      .primary-btn-sha{
        margin-top: 40px;
        font-family: RussoOneRegular, Russo One;
      }
      .input-box {
        width: 100%;
        height: 50px;
        margin-top: 20px;
        background: #F1F1F1;
        border-radius: 50px 50px 50px 50px;
        position: relative;

        .left{
          line-height: 50px;
          font-size: 12px;
          font-family: Roboto-Medium, Roboto;
          color: #C3C3C3;
          padding-left: 20px;
        }
        input {
          background: none;
          height: 100%;
          width: 100%;
          &::placeholder{
            font-size: 12px;
            font-family: Roboto-Medium, Roboto;
            color: #C3C3C3;
            padding-left: 10px;
          }
        }

        .right-tip {
          position: absolute;
          right: 10px;
          top: 0;
          display: flex;
          align-items: center;
          height: 50px;
          font-size: 14px;
          font-family: Roboto-Black, Roboto;
          font-weight: 900;
          color: #333333;
          .to{
            margin: 0 10px;
          }
          .icon {
            width: 20px;
            height: 20px;
            margin-right: 10px;
          }

          .max-btn {
            width: 76px;
            height: 40px;
            line-height: 40px;
            font-size: 16px;
            font-family: Roboto-Bold, Roboto;
            font-weight: bold;
            color: #613A00;
          }

          .line {
            height: 30px;
            width: 1px;
            background: #DADADA;
            margin: 0 30px 0 20px;
          }
        }

      }

    }
  }
}
</style>
