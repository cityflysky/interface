<template>
  <div class="PositionItem">
    <BorrowDialog v-show="showBorrow" @closeDialog="showBorrow=false"/>
    <div class="position-item" v-for="(item,index) in dataObj" :key="index">
      <div class="logo-box">
        <img :src="item.nft.image" alt="" class="logo">
        <div class="name">
          #{{ item.bundle_incr_id }} {{ item.identify }}
        </div>
      </div>
      <div class="position-info">
        <div class="in-line">
          <div class="name">
            Collaterals Value
          </div>
          <div class="value">
            <img class="icon" :src="require('@/assets'+item.underlying.icon)" alt="">
            <strong>{{ dealNum(item.staked_value) }}</strong>
          </div>
        </div>
        <div class="in-line">
          <div class="name">
            Loan to Value
          </div>
          <div class="value">
            <strong>{{ dealNum(item.max_borrow_rate * 100) }}%</strong>
            <span> {{ dealNum(item.staked_value * item.max_borrow_rate) }} {{ item.underlying.name }}</span>
          </div>
        </div>
        <div class="in-line">
          <div class="name">
            Total Borrowed
          </div>
          <div class="value">
            <img class="icon" :src="require('@/assets'+item.underlying.icon)" alt="">
            <strong>{{ dealNum(item.borrow_sum) }}</strong>
          </div>
        </div>
        <div class="in-line">
          <div class="name">
            Total Repaid
          </div>
          <div class="value">
            <img class="icon" :src="require('@/assets'+item.underlying.icon)" alt="">
            <strong>{{ dealNum(item.reply_sum) }}</strong>
          </div>
        </div>
      </div>

      <div class="position-info info2">
        <div class="in-line">
          <div class="name">
            Available to Borrow
          </div>
          <div class="value">
            <img class="icon" :src="require('@/assets'+item.underlying.icon)" alt="">
            <strong>{{ dealNum(item.available_borrow) }}</strong>
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
              <div class="progress-cycle" :class="{'health': item.health_index> 1.2 }"
                   :style="'left:' + (item.health_index / 3) * 100 + '%'">
                <strong>{{ item.health_index }}</strong>
              </div>
              <div class="progress-line1"></div>
              <div class="progress-line2"></div>
            </div>
          </div>
        </div>

        <div class="in-line available-time">
          <div class="name">
            Est. Available Loan Time
          </div>
          <div class="value">
            <strong> {{ parseInt(item.available_time / 86400) }} </strong>Days:
            <strong>{{ parseInt(item.available_time % 86400 / 3600) }}</strong>Hours
          </div>
        </div>
      </div>
      <div class="btn-box">
        <Button class="primary-btn-sha" @click="showBorrow=true">
          Borrow
        </Button>
        <Button class="primary-btn-sha">
          Repay
        </Button>
      </div>
    </div>
    <div class="position-item-m" v-for="(item,index) in dataObj" :key="index">
      <div class="position-header">
        <div class="logo-box">
          <img :src="item.nft.image" alt="" class="logo">
        </div>
        <div class="right">
          <div class="name">
            #{{ item.bundle_incr_id }} {{ item.identify }}
          </div>
          <div class="btn-box">
            <Button class="primary-btn-sha" @click="showBorrow=true">
              Borrow
            </Button>
            <Button class="primary-btn-sha">
              Repay
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
            <img class="icon" :src="require('@/assets'+item.underlying.icon)" alt="">
            <strong>{{ dealNum(item.staked_value) }}</strong>
          </div>
        </div>
        <div class="in-line">
          <div class="name">
            Loan to Value
          </div>
          <div class="value">
            <strong>{{ dealNum(item.max_borrow_rate * 100) }}%</strong>
            <span> {{ dealNum(item.staked_value * item.max_borrow_rate) }} {{ item.underlying.name }}</span>
          </div>
        </div>
        <div class="in-line">
          <div class="name">
            Total Borrowed
          </div>
          <div class="value">
            <img class="icon" :src="require('@/assets'+item.underlying.icon)" alt="">
            <strong>{{ dealNum(item.borrow_sum) }}</strong>
          </div>
        </div>
        <div class="in-line">
          <div class="name">
            Total Repaid
          </div>
          <div class="value">
            <img class="icon" :src="require('@/assets'+item.underlying.icon)" alt="">
            <strong>{{ dealNum(item.reply_sum) }}</strong>
          </div>
        </div>
      </div>

      <div class="position-info info2">
        <div class="in-line">
          <div class="name">
            Available to Borrow
          </div>
          <div class="value">
            <img class="icon" :src="require('@/assets'+item.underlying.icon)" alt="">
            <strong>{{ dealNum(item.available_borrow) }}</strong>
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
              <div class="progress-cycle" :class="{'health': item.health_index> 1.2 }"
                   :style="'left:' + (item.health_index / 3) * 100 + '%'">
                <strong>{{ item.health_index }}</strong>
              </div>
              <div class="progress-line1"></div>
              <div class="progress-line2"></div>
            </div>
          </div>
        </div>

        <div class="in-line available-time">
          <div class="name">
            Est. Available Loan Time
          </div>
          <div class="value">
            <strong> {{ parseInt(item.available_time / 86400) }} </strong>Days:
            <strong>{{ parseInt(item.available_time % 86400 / 3600) }}</strong>Hours
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import {Tooltip} from "ant-design-vue"
import BorrowDialog from "./BorrowDialog";
import bigNumberUtil from "@/utils/bigNumberUtil";

const calculator = new bigNumberUtil();
export default {
  name: "PositionItem",
  props: ["dataObj"],
  components: {Tooltip, BorrowDialog},
  data() {
    return {
      showBorrow: false,
      dealNum: calculator.dealNum
    }
  }
}
</script>

<style lang="scss" scoped>
.position-item {
  display: flex;
  background: #FFFFFF;
  box-shadow: 0px 5px 20px 5px rgba(0, 0, 0, 0.05);
  border-radius: 20px 20px 20px 20px;
  border: 1px solid #E2E2E2;
  padding: 20px;
  justify-content: space-between;
  margin-bottom: 10px;

  .logo-box {
    .logo {
      width: 120px;
      border-radius: 5px;
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
    margin: 0 0 0 10px;

    &.info2 {

      .in-line {
        min-width: 320px !important;
      }

      .value {
        margin-left: 2vw;
      }
    }

    .tip-icon {
      width: 16px;
      height: 16px;
      margin-left: 10px;
    }

    .in-line {
      display: flex;
      width: 22vw;
      justify-content: space-between;
      margin-bottom: 10px;
      align-items: center;

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
        margin-right: 3px;

      }
    }
  }

  .btn-box {
    width: 10vw;

    .primary-btn-sha {
      font-family: RussoOneRegular, Russo One;
      width: 8vw;
      height: 40px;
      font-size: 12px;
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
    margin-top: 10px;
    background: #FFFFFF;
    box-shadow: 0px 5px 20px 5px rgba(0, 0, 0, 0.05);
    border-radius: 20px 20px 20px 20px;
    border: 1px solid #E2E2E2;
    padding: 20px;
    display: block;

    .position-header {
      padding-bottom: 3vh;
      display: flex;
      border-bottom: 1px solid #E2E2E2;

      .logo-box {
        .logo {
          width: 30vw;
          height: 30vw;
          border-radius: 5px;
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
          max-height: 100px;
          font-size: 12px;
          font-family: RussoOneRegular, Russo One;

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

      .healthy-box {
        min-height: 60px;

        .value {
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
</style>
