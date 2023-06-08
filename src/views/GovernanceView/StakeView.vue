<template>
  <div class="StakeView">
    <div class="title">
      Stake TBC
    </div>
    <div class="info">
      Stake TBC to Receive Rewards
    </div>
    <div class="add-coin">
      Add TBC to MateMask
    </div>
    <div class="nav-list">
      <div class="nav-item" :class="{'active':activeNav1==1}" @click="activeNav1=1">
        Stake
      </div>
      <div class="nav-item" :class="{'active':activeNav1==2}" @click="activeNav1=2">
        Position
      </div>
    </div>
    <div class="stake-box" v-show="activeNav1==1">
      <div class="stake-option" :class="{'active':activeOption==1}" @click="activeOption=1">
        <div class="stake-option-header">
          <div class="left">
            <div class="name">
              90-Day
              <img src="../../assets/svg/down.svg" alt="" class="icon">
            </div>
          </div>
          <div class="right">
            APY
            <img class="icon" src="../../assets/svg/question.svg" alt="">
            <strong>4.56%</strong>
          </div>
        </div>
        <div class="stake-option-content" v-show="activeOption==1">
          <div class="left">
            Pool Size
          </div>
          <div class="right">
            300,000,000.00
          </div>
        </div>
      </div>
      <div class="stake-option" :class="{'active':activeOption==2}" @click="activeOption=2">
        <div class="stake-option-header">
          <div class="left">
            <div class="name">
              90-Day
              <img src="../../assets/svg/down.svg" alt="" class="icon">

            </div>
          </div>
          <div class="right">
            APY
            <img class="icon" src="../../assets/svg/question.svg" alt="">
            <strong>4.56%</strong>
          </div>
        </div>
        <div class="stake-option-content" v-show="activeOption==2">
          <div class="left">
            Pool Size
          </div>
          <div class="right">
            300,000,000.00
          </div>
        </div>
      </div>
      <div class="stake-content-box">
        <div class="input-box-header">
          <div class="left">
            <div class="name">
              Stake
            </div>
          </div>
          <div class="right">
            <span class="">
              Balance:
            </span>
            <img src="../../assets/images/coin-logo.webp" alt="" class="icon">
            <div class="balance">
              0.2585
            </div>
          </div>
        </div>
        <div class="input-box">
          <input type="number">
          <div class="right-tip">
            <div class="primary-btn max-btn">
              Max
            </div>
            <div class="line"></div>
            <img src="../../assets/images/coin-logo.webp" alt="" class="icon">
            <div class="name">
              TBC
            </div>
          </div>
        </div>
        <div class="automatic">
          <div class="check-box">
            <div class="checked"></div>
          </div>
          Automatic Reinvestment
          <img src="../../assets/svg/question.svg" alt="" class="tip-icon">
        </div>
        <div class="primary-btn-sha">
          Stake
        </div>
        <div class="bottom-info">
          <div class="name">
            Maturity Date（UTC）
          </div>
          <div class="value">
            Mar 290, 2019
          </div>
        </div>
      </div>
    </div>
    <div class="position-box" v-show="activeNav1==2">
      <div class="position-info">
        <div class="info-item">
          <div class="name">
            Balance
          </div>
          <div class="value">
            549,485.5998 TBC
          </div>
        </div>
        <div class="flex-box">
          <div class="info-item">
            <div class="name">
              Accumulated Rewards
            </div>
            <div class="value">
              549,485.5998 TBC
            </div>
          </div>
          <div class="info-item">
            <div class="name">
              Latest Rewards
            </div>
            <div class="value">
              85.54 TBC
            </div>
          </div>
        </div>
      </div>
      <div class="position-detail" @click="activeStake=1" :class="{'active':activeStake==1}">
        <div class="position-detail-header">
          <div class="left">
            <div class="title">
              Matured Stakes
            </div>
            <img src="../../assets/svg/down.svg" alt="" class="icon">
          </div>
          <div class="right" @click="isSelectAll=!isSelectAll">
            <div class="check-box">
              <div class="checked" v-show="isSelectAll"></div>
            </div>
            All
          </div>
        </div>
        <div v-show="activeStake==1">
          <template v-for="(item,index) in stakeList" :key="index">
            <div class="position-detail-part" v-if="index<total">
              <div class="position-detail-info">
                <div class="info-item">
                  <div class="name">
                    Stake Period
                  </div>
                  <div class="value">
                    {{ item.day }}-Day
                  </div>
                </div>
                <div class="info-item">
                  <div class="name">
                    Duration
                  </div>
                  <div class="value">
                    23 Day
                  </div>
                </div>
                <div class="info-item">
                  <div class="name">
                    Maturity Date
                  </div>
                  <div class="value">
                    Mar 290, 2019
                  </div>
                </div>
                <div class="info-item">
                  <div class="name">
                    Staked Principal
                  </div>
                  <div class="value">
                    2,000,000 TBC
                  </div>
                </div>
                <div class="info-item">
                  <div class="name">
                    Rewards
                  </div>
                  <div class="value">
                    5,350 TBC
                  </div>
                </div>
              </div>
              <div class="operate-box" v-show="!isSelectAll">
                <button class="primary-btn-sha">
                  Restake
                </button>
                <button class="primary-btn-sha">
                  Withdraw
                </button>
              </div>
              <div class="operate-box" v-show="isSelectAll&&index==(total-1)">
                <button class="primary-btn-sha">
                  Restake
                </button>
                <button class="primary-btn-sha">
                  Withdraw
                </button>
              </div>
            </div>
          </template>
          <div class="more-btn" @click="getMore">
            More
          </div>
        </div>
      </div>

      <div class="position-detail" @click="activeStake=2" :class="{'active':activeStake==2}">
        <div class="position-detail-header">
          <div class="left">
            <div class="title">
              Stakes(3)
            </div>
            <img src="../../assets/svg/down.svg" alt="" class="icon">
          </div>
          <div class="right" @click="isSelectAll=!isSelectAll">
            <div class="check-box">
              <div class="checked" v-show="isSelectAll"></div>
            </div>
            All
          </div>
        </div>
        <div v-show="activeStake==2">
          <template v-for="(item,index) in stakeList" :key="index">
            <div class="position-detail-part" v-if="index<total2">
              <div class="position-detail-info">
                <div class="info-item">
                  <div class="name">
                    Stake Period
                  </div>
                  <div class="value">
                    {{ item.day }}-Day
                  </div>
                </div>
                <div class="info-item">
                  <div class="name">
                    Duration
                  </div>
                  <div class="value">
                    23 Day
                  </div>
                </div>
                <div class="info-item">
                  <div class="name">
                    Maturity Date
                  </div>
                  <div class="value">
                    Mar 290, 2019
                  </div>
                </div>
                <div class="info-item">
                  <div class="name">
                    Staked Principal
                  </div>
                  <div class="value">
                    2,000,000 TBC
                  </div>
                </div>
                <div class="info-item">
                  <div class="name">
                    Rewards
                  </div>
                  <div class="value">
                    5,350 TBC
                  </div>
                </div>
              </div>
              <div class="automatic-bottom">
                <div class="left">
                  <img src="../../assets/images/opensea_icon.webp" alt="" class="icon">
                  Opensea
                </div>
                <div class="right">
                  Automatic Reinvestment
                  <Switch class="switch" v-model:checked="item.checked"/>
                </div>
              </div>
            </div>
          </template>
          <div class="more-btn" @click="getMore2">
            More
          </div>
        </div>
      </div>

      <div class="position-detail history" @click="activeStake=3" :class="{'active':activeStake==3}">
        <div class="position-detail-header">
          <div class="left">
            <div class="title">
              History(2)
            </div>
            <img src="../../assets/svg/down.svg" alt="" class="icon">
          </div>
        </div>
        <div v-show="activeStake==3">
          <template v-for="(item,index) in stakeList" :key="index">
            <div class="position-detail-part" v-if="index<total2">
              <div class="position-detail-info">
                <div class="info-item">
                  <div class="name">
                    Stake Period
                  </div>
                  <div class="value">
                    {{ item.day }}-Day
                  </div>
                </div>
                <div class="info-item">
                  <div class="name">
                    Duration
                  </div>
                  <div class="value">
                    23 Day
                  </div>
                </div>
                <div class="info-item">
                  <div class="name">
                    Maturity Date
                  </div>
                  <div class="value">
                    Mar 290, 2019
                  </div>
                </div>
                <div class="info-item">
                  <div class="name">
                    Staked Principal
                  </div>
                  <div class="value">
                    2,000,000 TBC
                  </div>
                </div>
                <div class="info-item">
                  <div class="name">
                    Rewards
                  </div>
                  <div class="value">
                    5,350 TBC
                  </div>
                </div>
              </div>

            </div>
          </template>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import {Switch} from "ant-design-vue"

export default {
  name: "StakeView",
  components: {Switch},
  data() {
    return {
      activeOption: 1,
      activeStake: 1,
      activeNav1: 1,
      isSelectAll: false,
      total: 2,
      total2: 2,
      stakeList: [{day: 10}, {day: 90}, {day: 90}],

    }
  },
  methods: {
    getMore() {
      this.total = this.total + 5
      if (this.total > this.stakeList.length) {
        this.total = this.stakeList.length
      }
    },
    getMore2() {
      this.total2 = this.total2 + 5
      if (this.total2 > this.stakeList.length) {
        this.total2 = this.stakeList.length
      }
    },
  }
}
</script>

<style lang="scss" scoped>
.StakeView {
  display: flex;
  flex-direction: column;
  align-items: center;

  .title {
    font-size: 30px;
    font-family: Roboto-SemiBold, Roboto;
    font-weight: 600;
    color: #000000;
  }

  .add-coin {
    width: 200px;
    height: 32px;
    background: linear-gradient(225deg, rgba(#FFAB00, 0.3) 0%, rgba(#FFC600, 0.3) 100%);
    border-radius: 30px 30px 30px 30px;
    text-align: center;
    border: 1px solid #FFAD01;
    margin-top: 20px;
    font-size: 16px;
    font-family: Roboto-Medium, Roboto;
    font-weight: 500;
    color: #FFAD01;
    line-height: 32px;

  }

  .stake-box {
    .stake-option {
      margin-bottom: 10px;
      overflow: hidden;
      background: #FFFFFF;
      box-shadow: 0px 5px 20px 5px rgba(0, 0, 0, 0.1);
      border-radius: 20px 20px 20px 20px;
      padding: 20px 30px;
      width: 544px;
      transition: 0.3s;
      height: 80px;
      cursor: pointer;

      &.active {
        cursor: default;
        height: 130px;
        border: 1px solid #FFAD01;

        .stake-option-header {
          .left {
            .icon {
              transform: rotate(180deg);
              transition: 0.3s;
            }
          }
        }
      }

      .stake-option-header {
        display: flex;
        justify-content: space-between;

        .left {
          .name {
            font-size: 20px;
            font-family: Roboto-Black, Roboto;
            font-weight: 900;
            color: #000000;

            .icon {
              margin-left: 10px;
              width: 20px;
              height: 20px;
            }
          }
        }

        .right {
          display: flex;
          font-size: 16px;
          font-family: Roboto-Bold, Roboto;
          font-weight: bold;
          color: #000000;
          align-items: center;

          .icon {
            width: 20px;
            margin: 0 10px;
            height: 20px;
          }

          strong {
            font-size: 18px;
          }
        }
      }

      .stake-option-content {
        display: flex;
        justify-content: space-between;
        margin-top: 30px;

        .left {
          font-size: 16px;
          font-family: Roboto-Medium, Roboto;
          font-weight: 500;
          color: #999999;
        }

        .right {
          font-size: 16px;
          font-family: Roboto-Black, Roboto;
          font-weight: 900;
          color: #333333;
        }
      }
    }

    .stake-content-box {
      padding: 30px;
      width: 544px;
      background: #FFFFFF;
      box-shadow: 0px 5px 20px 5px rgba(0, 0, 0, 0.05);
      border-radius: 20px 20px 20px 20px;
      opacity: 1;
      border: 1px solid #E2E2E2;

      .input-box-header {
        display: flex;
        justify-content: space-between;

        .left {
          .name {
            font-size: 20px;
            font-family: Roboto-Black, Roboto;
            font-weight: 900;
            color: #000000;
          }
        }

        .right {
          display: flex;
          align-items: center;
          font-size: 16px;
          font-family: Roboto-Black, Roboto;
          font-weight: 900;
          color: #333333;

          .icon {
            width: 20px;
            height: 20px;
            margin-right: 10px;
          }

          span {
            font-size: 16px;
            font-weight: 500;
            color: #999999;
            margin-right: 20px;
            font-weight: 500;
          }

        }
      }

      .input-box {
        width: 100%;
        height: 50px;
        margin-top: 20px;
        background: #F1F1F1;
        border-radius: 50px 50px 50px 50px;
        position: relative;

        input {
          background: none;
          height: 100%;
          font-size: 4vw;
        }

        .right-tip {
          position: absolute;
          right: 10px;
          top: 0;
          display: flex;
          align-items: center;
          height: 50px;
          font-size: 16px;
          font-family: Roboto-Black, Roboto;
          font-weight: 900;
          color: #333333;

          .icon {
            width: 20px;
            height: 20px;
            margin-right: 6px;
          }

          .max-btn {
            height: 32px;
            font-size: 14px;
            font-family: Roboto-Bold, Roboto;
            font-weight: bold;
            color: #613A00;
          }

          .line {
            height: 30px;
            width: 1px;
            background: #DADADA;
            margin: 0 10px 0 10px;
          }
        }

      }

      .automatic {
        display: flex;
        margin: 30px 0;
        font-size: 18px;
        font-family: Roboto-Medium, Roboto;
        font-weight: 500;
        color: #333333;
        align-items: center;

        .tip-icon {
          width: 26px;
          height: 26px;
          margin-left: 10px;
        }


      }

      .primary-btn-sha {
        height: 50px;
        font-family: RussoOneRegular, Russo One;
      }

      .bottom-info {
        display: flex;
        margin-top: 40px;
        justify-content: space-between;

        .value {
          font-size: 18px;
          font-family: Roboto-Bold, Roboto;
          font-weight: bold;
          color: #333333;
        }

        .name {

          font-size: 18px;
          font-family: Roboto-Medium, Roboto;
          font-weight: 500;
          color: #999999;
        }
      }
    }
  }

  .info {
    font-size: 18px;
    font-family: Roboto-SemiBold, Roboto;
    font-weight: 600;
    color: #000000;
    margin-top: 20px;
  }

  .nav-list {
    width: 300px;
    height: 60px;
    background: #E2E2E2;
    border-radius: 50px 50px 50px 50px;
    display: flex;
    margin: 40px 0 30px;

    .nav-item {
      width: 150px;
      height: 60px;
      cursor: pointer;
      text-align: center;
      line-height: 60px;
      border-radius: 30px 30px 30px 30px;
      font-size: 18px;
      font-family: Roboto-Bold, Roboto;
      font-weight: bold;
      color: #613A00;

      &.active {
        background: linear-gradient(225deg, #FFAB00 0%, #FFC600 100%);
      }
    }
  }

  .position-box {
    .position-info {
      width: 544px;
      padding: 20px 40px;
      background: #FFFFFF;
      box-shadow: 0px 5px 20px 5px rgba(0, 0, 0, 0.1);
      border-radius: 20px 20px 20px 20px;
      opacity: 1;
      border: 1px solid #E2E2E2;

      .info-item {
        .name {
          font-size: 16px;
          font-family: Roboto-Medium, Roboto;
          font-weight: 500;
          color: #999999;
        }

        .value {
          font-size: 16px;
          font-family: Roboto-Bold, Roboto;
          font-weight: bold;
          color: #000000;
          margin-top: 8px;
        }
      }

      .flex-box {
        margin-top: 20px;
        display: flex;
        justify-content: space-between;

        .info-item {
          .value {
            color: #FFC001;
          }
        }
      }


    }

    .position-detail {
      width: 544px;
      cursor: pointer;
      background: #FFFFFF;
      box-shadow: 0px 5px 20px 5px rgba(0, 0, 0, 0.1);
      border-radius: 20px 20px 20px 20px;
      padding: 30px;
      border: 1px solid #E2E2E2;
      margin-top: 20px;
      transition: 0.3s;

      &.active {
        cursor: default;

        .position-detail-header {
          .left {
            .icon {
              transform: rotate(180deg);
            }
          }
        }
      }

      .position-detail-header {
        display: flex;
        justify-content: space-between;
        align-items: center;


        .left {
          display: flex;
          align-items: center;

          .title {
            font-size: 20px;
            font-family: Roboto-Black, Roboto;
            font-weight: 900;
            color: #000000;
          }

          .icon {
            margin-left: 10px;
            width: 20px;
          }
        }

        .right {
          cursor: pointer;
          display: flex;
          font-size: 18px;
          font-family: Roboto-Medium, Roboto;
          font-weight: 500;
          color: #333333;
        }
      }

      .position-detail-part {
        border-radius: 15px 15px 15px 15px;
        border: 1px solid #D2D2D2;
        padding: 30px 20px;
        margin-top: 20px;
        transition: 0.3s;

        .position-detail-info {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;

          .info-item {
            width: 30%;
            margin-bottom: 20px;
            white-space: nowrap;

            .name {
              font-size: 16px;
              font-family: Roboto-Medium, Roboto;
              font-weight: 500;
              color: #999999;
            }

            .value {
              margin-top: 6px;
              font-size: 16px;
              font-family: Roboto-Bold, Roboto;
              font-weight: bold;
              color: #000000;
            }
          }
        }

        .operate-box {
          display: flex;
          justify-content: space-between;

          .primary-btn-sha {
            width: 48%;
            height: 50px;
            font-family: RussoOneRegular, Russo One;
          }
        }

        .automatic-bottom {
          display: flex;
          justify-content: space-between;
          font-size: 16px;
          font-family: Roboto-Bold, Roboto;
          color: #000000;
          border-top: 1px solid #D2D2D2;
          padding-top: 20px;

          .left {
            display: flex;
            align-items: center;
            font-weight: bold;

            .icon {
              width: 30px;
              height: 30px;
              margin-right: 10px;
            }
          }

          .right {
            display: flex;
            align-items: center;
            font-weight: 500;

            .switch {
              margin-left: 10px;
            }
          }
        }
      }

      .more-btn {
        margin: 20px auto;
        width: 100px;
        height: 30px;
        border-radius: 50px 50px 50px 50px;
        border: 1px solid #D2D2D2;
        font-size: 16px;
        text-align: center;
        font-family: Roboto-Medium, Roboto;
        cursor: pointer;
        line-height: 30px;
        font-weight: 500;
        color: #999999;
      }
    }


  }
}
@media screen and (max-width: 1000px) {
  .StakeView{
    .stake-box {
      width: 100%;
      .stake-option {
        width: 100%;
      }
      .stake-content-box{
        width: 100%;
        .input-box{
          .max-btn {
            font-size: 3.2vw;
          }
        }
        .automatic{
          font-size: 3.8vw;
        }
        .bottom-info{
          .name{
            font-size: 3.8vw;
          }
          .value{
            font-size: 4vw;
          }
        }
      }
    }
    .position-box {
      width: 100%;
      .position-info {
        width: 100%;
        .info-item{
          .name{
            font-size: 3.4vw;
          }
          .value{
            font-size: 3.8vw;
          }
        }
      }
      .position-detail{
        width: 100%;

        .position-detail-part{
          padding: 3vh 3vw;
          .position-detail-info{
            .info-item{
              .name{
                font-size: 3.2vw;
              }
              .value{
                font-size: 3.6vw;
              }
            }
          }
          .automatic-bottom{
            .left{
              font-size: 3.4vw;
              .icon{
                width: 20px;
                height: 20px;
              }
            }
            .right{
              font-size: 3.2vw;
            }
          }

        }
      }

    }
  }
}
</style>
