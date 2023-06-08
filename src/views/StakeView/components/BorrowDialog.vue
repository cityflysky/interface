<template>
  <div class="BorrowDialog dialog">
    <div class="dialog-mask"></div>
    <div class="dialog-content">
      <div class="dialog-header">
        <div class="title">
          Borrow/Repay
        </div>
        <img src="../../../assets/svg/close.svg" alt="" class="close" @click="$emit('closeDialog')">
      </div>
      <div class="dialog-content-container">
        <div class="nav-list">
          <div class="nav-item" :class="{'active':activeIndex==1}" @click="activeIndex=1">
            Borrow
          </div>
          <div class="nav-item" :class="{'active':activeIndex==2}" @click="activeIndex=2">
            Repay
          </div>
        </div>
        <div class="nft-detail-box">
          <div class="part1">
            <div class="img-box">
              <img src="../../../assets/images/position_logo1.webp" alt="" class="icon">
            </div>
            <div class="part1-content">
              <div class="flex-box">
                <img src="../../../assets/images/sandbox_icon.webp" alt="" class="icon">
                <strong>The Sandbox</strong>
              </div>
              <div class="info-list">
                <div class="item">
                  <div class="name">
                    Size
                  </div>
                  <div class="value">
                    6*6
                  </div>
                </div>
                <div class="item">
                  <div class="name">
                    Parcels
                  </div>
                  <div class="value">
                    9
                  </div>
                </div>
                <div class="item">
                  <div class="name">
                    Location
                  </div>
                  <div class="value">
                    135,-24
                  </div>
                </div>

              </div>

            </div>
            <div class="primary-btn-sha">
              View map
            </div>
          </div>
          <div class="part2">
            <div class="left-part">
              <div class="flex-box">
                <div class="name">
                  Collaterals Value
                </div>
                <div class="value-box">
                  <img src="../../../assets/svg/ethereum.svg" alt="" class="icon"> 4.94
                </div>

              </div>
              <div class="flex-box healthy-box">
                <div class="name">
                  Healthy Factor
                  <Tooltip placement="top">
                    <template #title>
                      <span>NFTs will be liquidated When the liquidation factor is below 1</span>
                    </template>
                    <img src="../../../assets/images/tip_icon.webp" alt="" class="tip-icon">
                  </Tooltip>
                </div>
                <div class="value">
                  <div class="progress-box">
                    <div class="progress-content">
                      <div class="progress-part1"></div>
                      <div class="progress-part2"></div>
                      <div class="progress-part3"></div>
                    </div>
                    <div class="progress-cycle">
                      <strong>1.2</strong>
                    </div>
                    <div class="progress-line1"></div>
                    <div class="progress-line2"></div>
                  </div>
                </div>
              </div>

            </div>
            <div class="right-part">
              <div class="flex-box">
                <div class="name">
                  Available Loan Limit
                </div>
                <div class="value-box">
                  <img src="../../../assets/svg/ethereum.svg" alt="" class="icon"> 3,196.8
                </div>

              </div>

              <div class="flex-box">
                <div class="name">
                  Est. Loan Time Available
                </div>
                <div class="value-box available-time">
                  <strong> 188 </strong>Days: <strong>05</strong>Hours
                </div>
              </div>
              <div class="flex-box">
                <div class="name">
                  Debt with Interest
                </div>
                <div class="value-box">
                  60%
                </div>

              </div>
            </div>
          </div>
        </div>
        <div class="bottom-content">
          <div class="title">
            {{ activeIndex == 1 ? "Borrow" : "Repay" }} Amount
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
          <div class="operate-box">
            <div class="primary-btn-sha" v-show="activeIndex==1">
              Borrow
            </div>
            <div class="primary-btn-sha" v-show="activeIndex==2">
              Repay
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {Tooltip} from "ant-design-vue"

export default {
  name: "BorrowDialog",
  components: {Tooltip},
  props: ["closeDialog"],
  data() {
    return {
      activeIndex: 1,
    }
  },


}
</script>

<style lang="scss" scoped>
.dialog-content-container {
  min-width: 650px;
  overflow-y: scroll;
  overflow-x: hidden;
  max-height: 80vh;
  padding-bottom: 38px;

  .nav-list {
    display: flex;
    margin: 30px 0;
    padding: 0 30px;

    border-bottom: 1px solid #E2E2E2;

    .nav-item {
      font-size: 16px;
      font-family: Roboto-Medium, Roboto;
      font-weight: 500;
      color: #333333;
      padding: 16px 26px;
      cursor: pointer;

      &.active {
        color: #FFC001;
        border-bottom: 1px solid #FFC600;
      }
    }
  }

  .nav-btn-box {
    display: flex;
    padding: 0 30px;

    .nav-item {
      width: 180px;
      height: 44px;
      background: #E2E2E2;
      border-radius: 50px 50px 50px 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
      font-family: Roboto-SemiBold, Roboto;
      font-weight: 600;
      color: #613A00;
      margin-right: 10px;
      cursor: pointer;

      .icon {
        display: none;
        width: 30px;
        height: 30px;
        margin-right: 6px;
      }

      &.active {
        background: linear-gradient(225deg, #FFAB00 0%, #FFC600 100%);

        .icon {
          display: block;
        }
      }
    }
  }

  .nft-list {
    display: flex;
    margin: 22px 30px;
    padding: 15px;
    width: 610px;
    overflow: auto;
    height: 150px;
    background: #F3F3F3;
    flex-wrap: wrap;
    border-radius: 23px 23px 23px 23px;

    &::-webkit-scrollbar {
      display: none;
    }

    .nft-item {
      width: 90px;
      margin: 0 8px 8px 0px;
      height: 113px;
      background: #FFFFFF;
      border-radius: 8px 8px 8px 8px;
      border: 2px solid #FFC001;
      padding: 8px;

      &:nth-child(6n) {
        margin-right: 0;
      }

      .icon {
        width: 75px;
        height: 75px;
      }

      .name {
        font-size: 12px;
        font-family: Roboto-Medium, Roboto;
        font-weight: 500;
        color: #333333;
        margin-top: 6px;
        white-space: nowrap;
      }
    }
  }

  .nft-detail-box {
    padding: 0 30px;

    .part1 {
      display: flex;
      padding-bottom: 26px;
      border-bottom: 1px solid #E2E2E2;
      align-items: center;
      width: 100%;

      .img-box {
        width: 113px;
        height: 113px;
        background: #F3F3F3;
        border-radius: 8px 8px 8px 8px;
        border: 1px solid #E2E2E2;
        padding: 4px;

        .icon {
          width: 105px;
          height: 105px;
        }
      }

      .part1-content {
        margin-left: 15px;
        flex-grow: 1;
        padding-right: 20%;

        .flex-box {
          display: flex;
          align-items: center;

          .icon {
            width: 30px;
            height: 30px;
            margin-right: 8px;
          }

          strong {
            font-size: 18px;
            font-family: Roboto-Black, Roboto;
            font-weight: 900;
            color: #000000;
          }
        }

        .info-list {
          display: flex;
          justify-content: space-between;
          margin-top: 20px;

          .item {
            .name {
              font-size: 14px;
              font-family: Roboto-Medium, Roboto;
              font-weight: 500;
              color: #999999;
            }

            .value {
              margin-top: 12px;
              font-size: 14px;
              font-family: Roboto-Black, Roboto;
              font-weight: 900;
              color: #333333;
            }
          }
        }

      }

      .primary-btn-sha {
        font-size: 12px;
        font-family: RussoOneRegular, Russo One;
        font-weight: 400;
        color: #613A00;
      }
    }

    .part2 {
      display: flex;
      justify-content: space-between;
      padding: 26px 0;

      .left-part, .right-part {
        width: 48%;
      }

      .flex-box {
        justify-content: space-between;
        padding: 6px 0;
        display: flex;
        align-items: center;

        .name {
          font-size: 14px;
          font-family: Roboto-Medium, Roboto;
          font-weight: 500;
          color: #999999;
        }

        .value-box {
          display: flex;
          align-items: center;
          font-size: 14px;
          font-family: Roboto-Black, Roboto;
          font-weight: 900;

          .icon {
            width: 20px;
            height: 20px;
            margin-right: 10px;
          }

          .blue {
            font-size: 14px;
            font-family: Roboto-SemiBold, Roboto;
            font-weight: 600;
            color: #6284F5;
            margin-left: 10px;
          }

        }

        .available-time {
          font-weight: bold;

          strong {
            color: #FFBD01;
            margin-right: 3px;
          }
        }
      }
    }
  }

  .bottom-content {
    padding: 0 20%;

    .title {
      font-size: 20px;
      font-family: Roboto-Bold, Roboto;
      font-weight: bold;
      color: #000000;
      padding: 30px 0 20px;
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
