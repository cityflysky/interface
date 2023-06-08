<template>
  <div class="BidDialogContent">
    <div class="bottom-content">

      <div class="input-header">
        Pay Margin
        <div class="right">
          <img src="../../../assets/svg/ethereum.svg" alt="" class="icon">
          100
        </div>
      </div>
      <div class="input-box">
        <input type="number">
        <div class="right-tip">
          <div class="max-btn primary-btn">
            Max
          </div>
          <div class="line"></div>
          <img src="../../../assets/svg/ethereum.svg" alt="" class="icon">
          ETH
        </div>
      </div>
      <div class="input-bottom">
        <div class="left">
          <div class="check-box">
            <div class="checked"></div>
          </div>
          Proxy Bid
        </div>
        <div class="right">
          <strong> 188 </strong>Days: <strong>05</strong>Hours
        </div>
      </div>
      <div class="operate-box">
        <div class="primary-btn-sha">
          Pay Margin
        </div>
      </div>
    </div>

  </div>

</template>

<script>
export default {
name: "BidDialogContent"
}
</script>

<style lang="scss" scoped>
.BidDialogContent{
  .bottom-content {
    padding: 0 30px;

    .title {
      font-size: 20px;
      font-family: Roboto-Bold, Roboto;
      font-weight: bold;
      color: #000000;
      padding: 30px 0 20px;
    }
    .input-bottom{
      display: flex;
      justify-content: space-between;
      margin-top: 20px;
      .right{
        font-weight: bold;
        strong {
          color: #FFBD01;
          margin-right: 3px;
        }
      }
      .left{
        display: flex;
        align-items: center;

      }
    }
    .input-header{
      display: flex;
      justify-content: space-between;
      font-size: 16px;
      margin: 20px 0 15px 0;
      font-family: Roboto-Black, Roboto;
      font-weight: 900;
      color: #333333;
      align-items: center;
      .right{
        display: flex;
        align-items: center;
        font-size: 14px;
        .icon{
          width: 20px;
          height: 20px;
          margin-right: 6px;
        }
      }
    }
    .input-box {

      position: relative;
      height: 50px;
      background: #F1F1F1;
      border-radius: 50px 50px 50px 50px;
      padding-left: 20px;
      font-family: Roboto-Black, Roboto;

      input {
        width: 100%;
        height: 100%;
        background: none;
      }

      .right-tip {
        position: absolute;
        display: flex;
        right: 0;
        top: 10px;
        align-items: center;
        padding-right: 26px;

        .max-btn {
          font-size: 12px;
          font-family: Roboto-Bold, Roboto;
          font-weight: bold;
          height: 30px;
          line-height: 30px;
        }

        .line {
          width: 1px;
          height: 30px;
          background: #DADADA;
          margin: 0 10px;
        }

        .icon {
          width: 20px;
          height: 20px;
          margin: 0 10px;
        }

        font-size: 14px;
        font-family: Roboto-Black, Roboto;
        font-weight: 900;
        color: #333333;
      }
    }

    .operate-box {
      justify-content: space-between;
      display: flex;
      margin-top: 23px;

      .primary-btn-sha {
        width: 100%;
        font-family: RussoOneRegular, Russo One;
      }
    }
  }
}
</style>
