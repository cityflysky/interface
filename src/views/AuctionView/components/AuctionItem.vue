<template>
  <div class="AuctionItem">
    <div class="position-item">
      <div class="logo-box">
        <img :src="nftObj.nft?nftObj.nft.image:''" alt="" class="logo">
        <div class="name" v-if="nftObj.nft">
          {{ nftObj.nft.name ? nftObj.nft.name : nftObj.nft.type + ' #' + nftObj.nft.token_id }}
        </div>
      </div>
      <div class="position-info">
        <div class="in-line">
          <div class="name">
            Collaterals Value
          </div>
          <div class="value">
            <img class="icon" src="../../../assets/svg/ethereum.svg" alt="">
            <strong>{{ dealNum(nftObj.stake_value) }}</strong>
          </div>
        </div>
        <div class="in-line">
          <div class="name">
            Debt
          </div>
          <div class="value">
            <img class="icon" src="../../../assets/svg/ethereum.svg" alt="">
            <strong>{{ dealNum(nftObj.loan) }}</strong>
          </div>
        </div>
        <div class="in-line healthy-box">
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
              <div class="progress-cycle" :class="{'health': nftObj.health_index> 1.2,'red': nftObj.health_index<1 }"
                   :style="'left:' + (nftObj.health_index / 3) * 100 + '%'">
                <strong>{{ nftObj.health_index }}</strong>
              </div>
              <div class="progress-line1"></div>
              <div class="progress-line2"></div>
            </div>
          </div>
        </div>

      </div>

      <div class="position-info info2">
        <div v-if="isAction">
          <div class="in-line">
            <div class="name">
              Lasted Bid
            </div>
            <div class="value">
              <img class="icon" src="../../../assets/svg/ethereum.svg" alt="">
              <strong>{{ dealNum(nftObj.bid_price) }}</strong>
            </div>
          </div>
          <div class="in-line">
            <div class="name">
              My Bid
            </div>
            <div class="value">
              <img class="icon" src="../../../assets/svg/ethereum.svg" alt="">
              <strong>{{ nftObj.my_bid_price ? dealNum(nftObj.my_bid_price) : "-- --" }}</strong>
            </div>
          </div>
          <div class="in-line available-time">
            <div class="name">
              Est. Available Loan Time
            </div>
            <div class="value">
              <strong> {{ getEndDay(nftObj.end_time) }} </strong> Days:
              <strong> {{ getEndHours(nftObj.end_time) }} </strong> Hours
            </div>
          </div>


        </div>


      </div>
      <div class="btn-box" v-if="isAction">
<!--        v-if="nftObj.auction_id || nftObj.auction_id===0"-->
        <Button class="primary-btn-sha" @click="$emit('showBid')" >
          Bid
        </Button>

      </div>
      <div class="btn-box" v-if="!isAction">
        <Button class="primary-btn-sha" @click="$emit('showBid')" v-if="nftObj.auction_id || nftObj.auction_id===0">
          Notify Me
        </Button>
        <Button class="primary-btn-sha" @click="$emit('showBid')" v-if="!nftObj.auction_id && nftObj.auction_id!==0 ">
          Notified
        </Button>
      </div>
    </div>
    <div class="position-item-m">
      <div class="position-header">
        <div class="logo-box">
          <img :src="nftObj.nft?nftObj.nft.image:''" alt="" class="logo">
        </div>
        <div class="right">
          <div class="name">
            {{ nftObj.nft.name ? nftObj.nft.name : nftObj.nft.type + ' #' + nftObj.nft.token_id }}
          </div>
          <div class="btn-box">
            <Button class="primary-btn-sha" @click="$emit('showBid')">
              {{ nftObj.operateName }}
            </Button>
          </div>
        </div>
      </div>
      <div class="position-info">
        <div class="in-line">
          <div class="name">
            Collaterals Value
          </div>
          <div class="value">
            <img class="icon" src="../../../assets/svg/ethereum.svg" alt="">
            <strong>{{ dealNum(nftObj.stake_value) }}</strong>
          </div>
        </div>
        <div class="in-line">
          <div class="name">
            Debt
          </div>
          <div class="value">
            <img class="icon" src="../../../assets/svg/ethereum.svg" alt="">
            <strong>{{ dealNum(nftObj.loan) }}</strong>
          </div>
        </div>
        <div class="in-line healthy-box">
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
              <div class="progress-cycle" :class="{'health': nftObj.health_index> 1.2,'red': nftObj.health_index<1 }"
                   :style="'left:' + (nftObj.health_index / 3) * 100 + '%'">
                <strong>{{ nftObj.health_index }}</strong>
              </div>
              <div class="progress-line1"></div>
              <div class="progress-line2"></div>
            </div>
          </div>
        </div>

      </div>

      <div class="position-info info2">
        <div v-if="isAction">
          <div class="in-line">
            <div class="name">
              Lasted Bid
            </div>
            <div class="value">
              <img class="icon" src="../../../assets/svg/ethereum.svg" alt="">
              <strong>{{ dealNum(nftObj.bid_price) }}</strong>
            </div>
          </div>
          <div class="in-line">
            <div class="name">
              My Bid
            </div>
            <div class="value">
              <img class="icon" src="../../../assets/svg/ethereum.svg" alt="">
              <strong>{{ nftObj.my_bid_price ? dealNum(nftObj.my_bid_price) : "-- --" }}</strong>
            </div>
          </div>
          <div class="in-line available-time">
            <div class="name">
              Est. Available Loan Time
            </div>
            <div class="value">
              <strong> {{ getEndDay(nftObj.end_time) }} </strong> Days:
              <strong> {{ getEndHours(nftObj.end_time) }} </strong> Hours
            </div>
          </div>


        </div>


      </div>

    </div>
  </div>
</template>

<script>
import {Tooltip} from "ant-design-vue"
import bigNumberUtil from "@/utils/bigNumberUtil";

const calculator = new bigNumberUtil();

export default {
  name: "AuctionItem",
  props: ["nftObj", "isAction"],
  components: {Tooltip},
  data() {
    return {
      dealNum: calculator.dealNum,
    }
  },
  methods: {
    getEndDay(item) {
      if (item < 0) {
        return 0
      }
      return parseInt(item / 86400)
    },
    getEndHours(item) {
      if (item < 0) {
        return 0
      }
      return parseInt(parseInt(item % 86400) / 3600)
    },
  }
}
</script>

<style lang="scss" scoped>
.AuctionItem {
  margin-top: 30px;

  .position-item {
    display: flex;
    background: #FFFFFF;
    box-shadow: 0px 5px 20px 5px rgba(0, 0, 0, 0.05);
    border-radius: 20px 20px 20px 20px;
    border: 1px solid #E2E2E2;
    padding: 20px;
    justify-content: space-between;

    .logo-box {
      .logo {
        width: 120px;
        height: 120px;
      }

      .name {
        margin-top: 20px;
        font-size: 20px;
        font-family: Roboto-Black, Roboto;
        font-weight: 900;
        color: #333333;
        line-height: 30px;
        text-align: center;
      }
    }

    .position-info {
      width: 20vw;
      margin: 0 0 0 2vw;

      &.info2 {

        .in-line {
        }

        .value {
          min-width: 130px;
          text-align: right;
        }
      }

      .tip-icon {
        width: 16px;
        height: 16px;
      }

      .in-line {
        min-height: 20px;
        height: 12%;
        display: flex;
        justify-content: space-between;
        margin-bottom: 10px;

        .name {
          white-space: nowrap;
          font-size: 12px;
          font-family: Roboto-Medium, Roboto;
          font-weight: 500;
          color: #999999;
          margin-right: 1vw;

        }

        .value {
          font-size: 12px;

          span {
            margin-left: 10px;
          }

          .icon {
            width: 16px;
            height: 16px;
            margin-right: 10px;
          }
        }
      }


      .available-time {
        font-weight: bold;

        strong {
          color: #FFBD01;
        }
      }
    }

    .btn-box {
      .primary-btn-sha {
        font-family: RussoOneRegular, Russo One;
        width: 10vw;
        min-width: 110px;
        max-width: 160px;
        padding: 0 20px;
        font-size: 14px;
        margin-top: 30px;
      }
    }
  }

  .position-item-m {
    display: none;
  }

  @media screen and (max-width: 1000px) {
    .position-item {
      display: none;
    }
    .position-item-m {
      background: #FFFFFF;
      box-shadow: 0px 5px 20px 5px rgba(0, 0, 0, 0.05);
      border-radius: 20px 20px 20px 20px;
      border: 1px solid #E2E2E2;
      padding: 20px;
      display: block;

      .healthy-box {
        .progress-box {
          width: 40vw;
        }
      }

      .position-header {
        padding-bottom: 3vh;
        display: flex;
        border-bottom: 1px solid #E2E2E2;

        .logo-box {
          .logo {
            width: 30vw;
            height: 30vw;
          }

        }

        .right {
          padding-left: 3vw;
          flex: 1;
        }

        .name {
          margin-top: 20px;
          font-size: 20px;
          font-family: Roboto-Black, Roboto;
          font-weight: 900;
          color: #333333;
        }

        .btn-box {
          width: 100%;
          margin-top: 3vh;
          display: flex;
          justify-content: space-between;

          .primary-btn-sha {
            width: 45%;
            height: 5vh;
            max-height: 60px;
            min-width: 100px;
            font-size: 12px;
          }
        }

      }

      .position-info {
        margin: 3vh 0 0 0;

        &.info2 {

          .in-line {
            min-width: 300px !important;
          }

          .value {
            margin-left: 2vw;
          }
        }

        .tip-icon {
          width: 20px;
          height: 20px;
          margin-left: 20px;
        }

        .in-line {
          display: flex;
          justify-content: space-between;
          margin-bottom: 10px;
          width: 100%;

          .name {
            font-size: 12px;
            font-family: Roboto-Medium, Roboto;
            font-weight: 500;
            color: #999999;
          }

          .value {
            font-size: 12px;

            span {
              margin-left: 10px;
            }

            .icon {
              width: 20px;
              height: 20px;
              margin-right: 10px;
            }
          }
        }

        .available-time {
          font-weight: bold;

          strong {
            color: #FFBD01;
          }
        }
      }

    }
  }
}
</style>
