<template>
  <div class="DepositList">
    <div class="data-list">
      <div class="data-list-header-box">
        <div class="data-list-header">
          <div class="col">
            Chain
          </div>
          <div class="col">
            USDT APR
          </div>
          <div class="col">
            ETH APR
          </div>
          <div class="col deposit-op">
            Deposit
          </div>
        </div>

      </div>
      <div class="list-item">
        <div class="col name">
          <img class="icon" src="../../../assets/svg/ethereum.svg" alt="">
          Ethereum
        </div>
        <div class="col usdt-apr">
          {{chainRate1[1]?dealNum(chainRate1[1].deposit_apy * 100):0}}%

        </div>
        <div class="col eth-apr">
          {{(chainRate1[0]?dealNum(chainRate1[0].deposit_apy * 100):0)}}%

        </div>
        <div class="col borrow">
          <div class="primary-btn-sha"  @click="$router.push('/lend')">
            Deposit
          </div>
        </div>
      </div>
      <div class="list-item">
        <div class="col name">
          <img class="icon" src="../../../assets/svg/polygon.svg" alt="">

          Polygon
        </div>
        <div class="col usdt-apr">
          {{chainRate2[1]?dealNum(chainRate2[1].deposit_apy*100):0}}%

        </div>
        <div class="col eth-apr">
          {{chainRate2[0]?dealNum(chainRate2[0].deposit_apy * 100):0}}%
        </div>
        <div class="col borrow-op">
          <div class="primary-btn-sha"  @click="$router.push('/lend')">
            Deposit
          </div>
        </div>
      </div>

    </div>
    <div class="data-list-m">
      <div class="data-list-m">
        <div class="data-item-m">
          <div class="list-header">
            <img src="../../../assets/svg/ethereum.svg" alt="" class="icon">
            Ethereum chain
          </div>
          <div class="data-box">
            <div class="name">
              USDT APR
            </div>
            <div class="value-box g-c">
              {{chainRate1[1]?dealNum(chainRate1[1].deposit_apy * 100):0}}%
            </div>
          </div>
          <div class="data-box">
            <div class="name">
              ETH APR
            </div>
            <div class="value-box b-c">
              {{chainRate1[0]?dealNum(chainRate1[0].deposit_apy * 100):0}}%
            </div>
          </div>
          <div class="data-box">
            <div class="primary-btn" @click="$router.push('/lend')">
              Deposit
            </div>
          </div>

        </div>
        <div class="data-item-m">
          <div class="list-header">
            <img src="../../../assets/svg/polygon.svg" alt="" class="icon">
            Polygon chain
          </div>
          <div class="data-box">
            <div class="name">
              USDT APR
            </div>
            <div class="value-box g-c">
              {{chainRate2[1]?dealNum(chainRate1[1].deposit_apy * 100):0}}%
            </div>
          </div>
          <div class="data-box">
            <div class="name">
              ETH APR
            </div>
            <div class="value-box b-c">
              {{chainRate2[0]?dealNum(chainRate1[0].deposit_apy * 100):0}}%
            </div>
          </div>
          <div class="data-box">
            <div class="primary-btn" @click="$router.push('/lend')">
              Deposit
            </div>
          </div>

        </div>

      </div>

    </div>
  </div>
</template>

<script>
import bigNumberUtil from "@/utils/bigNumberUtil";
const calculator = new bigNumberUtil();
export default {
  name: "DepositList",
  props:["chainRate1","chainRate2"],
  data(){
    return {
      dealNum:calculator.dealNum
    }
  }

}
</script>

<style lang="scss" scoped>
.DepositList {
  .data-list {
    .data-list-header-box {
      padding: 40px 50px 30px;
      border-bottom: 1px solid #E2E2E2;

      .data-list-header {
        display: flex;
        justify-content: space-between;
        font-size: 14px;
        font-family: Roboto-SemiBold, Roboto;
        font-weight: 600;
        color: #999999;
        line-height: 19px;
        .deposit-op{
          text-align: center;
        }
      }
    }

    .col {
      &:nth-child(1) {
        width: 16%;
      }

      &:nth-child(2) {
        width: 12%;
      }

      &:nth-child(3) {
        width: 12%;
      }

      &:nth-child(4) {
        width: 12%;
      }

      &:nth-child(5) {
        width: 12%;
      }

      &:nth-child(6) {
        width: 12%;
      }

      &:nth-child(7) {
        width: 13%;
      }
    }

    .list-item {
      display: flex;
      justify-content: space-between;
      margin: 0 50px;
      padding: 35px 0;
      border-bottom: 1px solid #E2E2E2;

      &:last-child {
        border-bottom: none;
        padding-bottom: 0;
      }
      .usdt-apr{
        color: #27A17C;
      }
      .eth-apr{
        color: #6284F5;
      }
      .name {
        .icon {
              width: 40px;
          height: 40px;
          margin-right: 10px;
        }

        font-size: 14px;
        font-family: Roboto-Black, Roboto;
        font-weight: 900;
        color: #000000;
        line-height: 21px;
      }

      .col {
        display: flex;
        align-items: center;
        font-size: 14px;
        font-family: Roboto-SemiBold, Roboto;
        font-weight: 600;
        line-height: 19px;
      }
      .deposit-op{
        text-align: center;
      }
      .primary-btn-sha {
        width: 140px;
        height: 50px;
        line-height: 50px;
        font-size: 14px;
        font-family: Roboto-Bold, Roboto;


      }

    }
  }
  .data-list-m{
    display: none;
  }
  @media screen and (max-width: 1000px) {
    .data-list{
      display: none;
    }
    .data-list-m{
      display: block;
      .data-item-m{
        display: flex;
        flex-wrap: wrap;
        padding: 0 5vw;
        border-bottom:  1px solid #EAEAEA;
        padding-bottom: 2vh;
        &:last-child{
          border-bottom: none;
          padding-bottom: 0vh;

        }
        .list-header{
          width: 100%;
          display: flex;
          margin: 2vh 0;
          font-family: Roboto-Black, Roboto;
          font-weight: 900;
          font-size: 4vw;
          .icon{
            width: 6vw;
            height: 6vw;
            margin-right: 1vw;
          }
        }
        .data-box{
          margin-left: 4.5%;
          width: 30%;
          margin-top: 2vh;
          white-space: nowrap;
          &:nth-child(3n - 4){
            margin-left: 0;
          }
          .name{
            font-size: 3.4vw;
            font-family: Roboto-SemiBold, Roboto;
            font-weight: 600;
            color: #C0C0C0;
          }
          .value-box{
            font-size: 3.2vw;
            font-family: Roboto-SemiBold, Roboto;
            font-weight: 600;
            margin-top: 1vh;
            display: flex;
            align-items: center;
            .icon{
              width: 20px;
              height: 20px;
              margin-right: 3px;
            }
            .mul-line{
              .in-line{
                &:last-child{
                  margin-top: 1vh;
                }
              }
            }
          }
        }
      }

    }
  }
}
</style>
