<template>
  <div class="DateList">
    <div class="data-list">
      <div class="data-list-header-box">
        <div class="data-list-header">
          <div class="col">
            Collection
          </div>
          <div class="col">
            NFT Staked
          </div>
          <div class="col">
            Staked Times
          </div>
          <div class="col">
            Total Staked
          </div>
          <div class="col">
            Floor Price
          </div>
          <div class="col">
            Loan To Value
          </div>
          <div class="col">
            Total Borrowed
          </div>
        </div>
      </div>
      <div class="list-item" v-for="(item,index) in dataObj" :key="index">
        <div class="col name">
          <img class="icon" :src="require('@/assets'+item.icon)" alt="">
          {{ item.name }}
        </div>
        <div class="col nft-stake">
          {{ dealNum(item.staked_value) }}
          <img class="icon" src="../../../assets/svg/etherscan.svg" alt="">
        </div>
        <div class="col">
          {{ (item.staked_times) }}
        </div>
        <div class="col stake">
          <img class="icon" :src="require('@/assets/svg/usdt.svg')" alt="">
          {{ dealNum(item.total_staking) }}
        </div>
        <div class="col floor-price">
          <div class="icon-box" v-for="(flItem,index) in item.floor_price" :key="index">
            <img class="icon" :src="require('@/assets'+flItem.icon)" alt="">
            {{ dealNum(flItem.value) }}
          </div>
        </div>
        <div class="col loan-to-value">
          <div class="value">
            {{ dealNum(item.max_borrow_rate) * 100 }}%
          </div>
          <div class="right">
            <div class="icon-box" v-for="(flItem,index) in item.max_borrow" :key="index">
              <img class="icon" :src="require('@/assets'+flItem.icon)" alt="">
              {{ dealNum(flItem.value) }}
            </div>
          </div>
        </div>
        <div class="col borrow">
          <img class="icon" src="../../../assets/svg/usdt.svg" alt="">
          {{ dealNum(item.borrow_sum) }}
        </div>
      </div>

    </div>
    <div class="data-list-m">
      <div class="list-item" v-for="(item,index) in dataObj" :key="index">
        <div class="item-header">
          <img class="icon" :src="require('@/assets'+item.icon)" alt="">
          <div class="name">
            {{ item.name }}
          </div>
        </div>
        <div class="data-box">
          <div class="name">
            NFT Staked
          </div>
          <div class="value-box">
            {{ dealNum(item.staked_value) }}
            <img style="margin-left: 3px" src="../../../assets/svg/etherscan.svg" alt="" class="icon">
          </div>
        </div>
        <div class="data-box">
          <div class="name">
            staked Times
          </div>
          <div class="value-box">
            {{ (item.staked_times) }}
          </div>
        </div>
        <div class="data-box">
          <div class="name">
            Total Staked
          </div>
          <div class="value-box">
            <img src="../../../assets/svg/usdt.svg" alt="" class="icon">
            {{ dealNum(item.total_staking) }}
          </div>
        </div>
        <div class="data-box">
          <div class="name">
            Floor Price
          </div>
          <div class="value-box">
            <div class="mul-line">
              <div class="in-line" v-for="(flItem,index) in item.floor_price" :key="index">
                <img class="icon" :src="require('@/assets'+flItem.icon)" alt="">
                {{ dealNum(flItem.value) }}
              </div>
            </div>
          </div>
        </div>
        <div class="data-box">
          <div class="name">
            Loan To Value
          </div>
          <div class="value-box">
            <span style="margin-right: 6px">
              {{ dealNum(item.max_borrow_rate) * 100 }}%
            </span>
            <div class="mul-line">
              <div class="in-line" v-for="(flItem,index) in item.max_borrow" :key="index">
                <img class="icon" :src="require('@/assets'+flItem.icon)" alt="">
                {{ dealNum(flItem.value) }}
              </div>
            </div>
          </div>
        </div>
        <div class="data-box">
          <div class="name">
            Total Borrowed
          </div>
          <div class="value-box">
            <img src="../../../assets/svg/usdt.svg" alt="" class="icon">
            {{ dealNum(item.borrow_sum) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import bigNumberUtil from "@/utils/bigNumberUtil";

const calculator = new bigNumberUtil();
import {mapGetters} from "vuex"
import {formatTime} from "@/utils/timeUtil";

export default {
  name: "DataList",
  props: ["dataObj"],
  computed: {
    ...mapGetters(["baseUrl"])
  },
  data() {
    return {
      formatTime,
      dealNum: calculator.dealNum
    }
  }
}
</script>

<style lang="scss" scoped>
.DateList {
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
      }
    }

    .col {
      &:nth-child(1) {
        width: 17%;
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
        width: 15%;
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

      .name {
        .icon {
          width: 40px;
          height: 40px;
          margin-right: 10px;
        }

        font-size: 16px;
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
        color: #000000;
        line-height: 19px;
      }

      .stake, .borrow {
        .icon {
          margin-right: 10px;
          width: 20px;
          height: 20px;
        }
      }

      .nft-stake {
        .icon {
          margin-left: 10px;
          width: 20px;
          height: 20px;
        }
      }

      .floor-price, .loan-to-value {
        display: block;

        .icon-box {
          display: flex;
          align-items: center;

          &:nth-child(2) {
            margin-top: 15px;
          }

          .icon {
            margin-right: 10px;
            width: 20px;
            height: 20px;
          }
        }
      }

      .loan-to-value {
        display: flex;

        .value {
          margin-right: 10px;
        }
      }

      .token-borrow {
        display: block;

        .icon-box {
          display: flex;
          align-items: center;

          .icon {
            margin-right: 10px;
            width: 20px;
            height: 20px;
          }
        }

        .worth {
          font-size: 16px;
          font-family: Roboto-SemiBold, Roboto;
          font-weight: 600;
          color: #999999;
          padding-left: 40px;
        }
      }
    }
  }

  .data-list-m {
    display: none;
  }

  @media screen and (max-width: 1000px) {
    .data-list {
      display: none;
    }
    .data-list-m {
      display: block;
      padding: 0 5vw;

      .list-item {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;

        .item-header {
          width: 100%;
          display: flex;
          align-items: center;
          padding: 3vh 0 0;

          .icon {
            width: 8vw;
            height: 8vw;
            margin-right: 10px;
          }

          .name {
            font-size: 4.2vw;
            font-family: Roboto-Black, Roboto;
            font-weight: 900;
          }
        }
      }

      .data-box {
        width: 30%;
        margin-top: 2vh;

        .name {
          font-size: 3.6vw;
          font-family: Roboto-SemiBold, Roboto;
          font-weight: 600;
          color: #C0C0C0;
        }

        .value-box {
          font-size: 3.2vw;
          font-family: Roboto-SemiBold, Roboto;
          font-weight: 600;
          margin-top: 1vh;
          display: flex;
          align-items: center;

          .icon {
            width: 20px;
            height: 20px;
            margin-right: 3px;
          }

          .mul-line {
            .in-line {
              &:last-child {
                margin-top: 1vh;
              }
            }
          }
        }
      }
    }
  }
}
</style>
