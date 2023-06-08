<template>
  <div class="StakeView">
    <TryBankerHeader ref="header" class="header"/>
    <EmailSignDialog v-show="showSign" @closeDialog="showSign=false" @updateData="handleEmailUpdate"/>
    <StakeNFTDialog
        v-show="showStakeNFT"
        :priceMap="priceMap"
        :availableLoanArr="availableLoanArr"
        :identifyArr="identifyArr"
        :identifyArrEstate="identifyArrEstate"

        :tokensData="tokensData"
        @updateData="getData"
        @initData="initData"
        ref="StakeDialog"
        :curIdentify="curIdentify"
        @closeDialog="initData();showStakeNFT=false;"/>
    <Popup round
           position="bottom" v-model:show="showMStakeNFT" class="stake-dialog-m">

      <StakeNFTDialog
          @closeDialog="initData();showMStakeNFT=false"
          :priceMap="priceMap"
          :availableLoanArr="availableLoanArr"
          :identifyArr="identifyArr"
          :identifyArrEstate="identifyArrEstate"
          @initData="initData"
          :tokensData="tokensData"
          @updateData="getData"
          ref="StakeDialog"
      />
    </Popup>
    <div class="stake-content">
      <div class="top-part">
        <div class="top-part-item">
          <img src="../../assets/images/stake_top_icon1.webp" alt="" class="icon">
          <div class="name">
            Available NFT
          </div>
          <div class="value">
            {{ dealNum(stakeData.stats.nft_count) }}
          </div>
        </div>
        <div class="top-part-item">
          <img src="../../assets/images/stake_top_icon2.webp" alt="" class="icon">
          <div class="name">
            My NFT Staking
          </div>
          <div class="value">
            {{ dealNum(stakeData.stats.staking_count) }}
          </div>
        </div>
        <div class="top-part-item">
          <img src="../../assets/images/stake_top_icon3.webp" alt="" class="icon">
          <div class="name">
            My NFT Near Liquidation
          </div>
          <div class="value">
            {{ dealNum(stakeData.stats.closeToLiquidation) }}
          </div>
        </div>
        <div class="top-part-item stake-btn">
          <div class="primary-btn-sha stake-pc border" @click="stake">
            Stake
          </div>
          <div class="primary-btn-sha stake-m border" @click="mstake">
            Stake
          </div>
        </div>
      </div>
      <div class="stake-list">
        <div class="stake-item" v-for="(item,index) in stakeData.nft_list" :key="index">
          <div class="stake-item-header">
            <img class="bg" :src="require('@/assets'+item.background)" alt="">
            <div class="logo-box">
              <img class="logo" :src="require('@/assets'+item.icon)" alt="">
            </div>
            <div class="name">
              {{ item.name }}
            </div>
          </div>

          <div class="stake-item-content">
            <div class="stake-item-part1">
              <div class="item">
                <div class="name">
                  Total Staking
                </div>
                <div class="value-box">
                  <strong>
                    {{ dealNum(item.total_staking) }}
                  </strong>
                  <img style="margin-left: 10px" class="icon" src="../../assets/svg/etherscan.svg" alt="">
                </div>
              </div>
              <div class="item">
                <div class="name">
                  Total Staked Value
                </div>
                <div class="value-box">
                  <img class="icon" src="../../assets/svg/usdt.svg" alt="">
                  <strong>
                    {{ dealNum(item.staked_value) }}
                  </strong>
                </div>
              </div>
              <div class="item">
                <div class="name">
                  Total Borrowed
                </div>
                <div class="value-box">
                  <img class="icon" src="../../assets/svg/usdt.svg" alt="">
                  <strong>
                    {{ dealNum(item.borrow_sum) }}
                  </strong>
                </div>
              </div>
            </div>
            <div class="stake-item-part2">
              <div class="item">
                <div class="name">
                  Floor Price
                </div>
                <div class="item-content">
                  <div class="value-box" v-for="(flItem,index) in item.floor_price" :key="index">
                    <img class="icon" :src="require('@/assets'+flItem.icon)" alt="">
                    <strong>
                      {{ dealNum(flItem.value) }}
                    </strong>
                  </div>
                </div>
              </div>
              <div class="item">
                <div class="name">
                  Loan to Value
                </div>
                <div class="item-content loan-value-box">
                  <div class="value-box">
                    <strong>{{ dealNum(item.max_borrow_rate * 100) }}%</strong>
                  </div>
                  <div class="value">
                    <div class="value-box" v-for="(bItem ,index) in item.max_borrow" :key="index"
                         :class="{'blue':bItem.name=='ETH','green':bItem.name=='USD'}">
                      {{ dealNum(bItem.value) }} {{ bItem.name }}
                    </div>
                  </div>
                </div>
              </div>
              <div class="item">
                <div class="name">
                  Available Balance
                </div>
                <div class="value-box">
                  <strong>
                    {{ dealNum(item.wallet_nft) }}
                  </strong>
                </div>
              </div>
            </div>
            <div class="primary-btn-sha stake-pc border" @click="stake(item)">
              Stake
            </div>
            <div class="primary-btn-sha stake-m border" @click="mstake(item)">
              Stake
            </div>
          </div>
        </div>
      </div>
      <div class="sub-title">
        Position
      </div>
      <div class="nav-list">
        <div class="nav-item" :class="{'active':activeNav==1}" @click="activeNav=1">
          All
        </div>
        <div class="nav-item" :class="{'active':activeNav=='ETH'}" @click="activeNav='ETH'">
          ETH
        </div>
        <div class="nav-item" :class="{'active':activeNav=='USD'}" @click="activeNav='USD'">
          USDT
        </div>
      </div>
      <div class="position-list">
        <PositionItem :dataObj="curPositions"/>
      </div>
    </div>
  </div>
</template>

<script>
import StakeNFTDialog from "@/views/StakeView/components/StakeNFTDialog";
import PositionItem from "@/views/StakeView/components/PositionItem";
import {getStakeData, getTokens} from "@/api/stakeApi";
import {Popup} from "vant"
import {mapGetters} from "vuex";
import bigNumberUtil from "@/utils/bigNumberUtil";
import EmailSignDialog from "@/components/EmailSignDialog";
import {message} from "ant-design-vue";

const calculator = new bigNumberUtil();
export default {
  name: "StakeView",
  components: {StakeNFTDialog, PositionItem, Popup, EmailSignDialog},
  data() {
    return {
      showSign: false,
      dealNum: calculator.dealNum,
      activeNav: 1,
      curIdentify: undefined,
      showMStakeNFT: false,
      showStakeNFT: false,
      availableLoanArr: [0, 0,],
      priceMap: {},
      identifyArr: [],
      identifyArrEstate:[],
      stakeData: {
        stats: {},
        nft_list: [],
        positions: [],
        email: ""
      },
      tokensData: {}
    }
  },
  computed: {
    ...mapGetters(["account", "web3", "isConnected", "chainId"]),
    curPositions() {
      if (this.activeNav == 1) {
        return this.stakeData.positions
      }

      let arr = []
      this.stakeData.positions.forEach(item => {
        if (item.underlying.name == this.activeNav) {
          arr.push(item)
        }
      })
      return arr
    }
  },
  watch: {
    account() {
      this.getData()
    },
    isConnected() {
    },
    chainId(val) {
      this.getData(val, this.account)
    }
  },
  methods: {
    handleEmailUpdate(email) {
      // this.getStakeData();
      this.showStakeNFT = true
      this.stakeData.email = email
    },
    mstake(item) {

      if (!this.isConnected) {
        message.info("Please connect")
        return
      }
      this.curIdentify = undefined
      if (!this.stakeData.email) {
        this.showSign = true

      } else {
        this.showMStakeNFT = true
        if (item && item.identify) {
          this.curIdentify = item.identify
        }
        this.identifyArr.forEach(item => {
          if (item.name == this.curIdentify) {
            item.isChoosed = true
          }
          this.tokensData.tokens.forEach(item => {
            if (item.identify == this.curIdentify) {
              item.isChoosed = !item.isChoosed
            }
          })
        })
        this.$nextTick(() => {
          this.$refs.StakeDialog.availbleLoan = this.dealNum(this.availableLoanArr[0])
        })

      }
    },
    stake(item) {
      if (!this.isConnected) {
        message.info("Please connect")
        return
      }
      this.curIdentify = undefined
      if (!this.stakeData.email) {
        this.showSign = true
        return
      }

      this.showStakeNFT = true
      if (item && item.identify) {
        this.curIdentify = item.identify
      }
      this.identifyArr.forEach(item => {
        if (item.name == this.curIdentify) {
          item.isChoosed = true
        }
        this.tokensData.tokens.forEach(item => {
          if (item.identify == this.curIdentify) {
            item.isChoosed = !item.isChoosed
          }
        })
      })
      this.$nextTick(() => {
        this.$refs.StakeDialog.availbleLoan = this.dealNum(this.availableLoanArr[0])
      })
    },
    async getStakeData() {
      const res = await getStakeData(this.chainId, this.account)
      this.stakeData = res.data.data
      // if (this.isConnected && !this.stakeData.email) {
      //   // this.showSign = true
      // }
    },
    async getData() {
      if (!this.isConnected) {
        return
      }

      const tokens = await getTokens(this.chainId, this.account)
      this.tokensData = tokens.data.data
      console.log( this.tokensData.merge_estates)
      await this.getStakeData()
      this.initData()
    },
    initData() {
      if (this.tokensData.pools) {
        this.tokensData.pools.forEach(item => {
          if (item.name == "ETH") {
            this.availableLoanArr[0] = item.max_borrow
            this.priceMap[item.name] = item.price
          } else {
            this.availableLoanArr[1] = item.max_borrow
          }
        })

      }
      this.identifyArr = []
      this.identifyArrEstate = []
      if (this.tokensData.tokens.length > 0) {
        let identifyArrTemp = []
        this.tokensData.tokens.forEach(item => {
          if (identifyArrTemp.indexOf(item.identify) < 0) {
            identifyArrTemp.push(item.identify)
          }
          item.isChoosed = false
          item.nfts.forEach(nft => {
            nft.choosed = false
          })
        })
        identifyArrTemp.forEach(item => {
          this.identifyArr.push({name: item, isChoosed: false})
        })
      }

      if (this.tokensData.merge_estates.length > 0) {
        let identifyArrTemp = []
        this.tokensData.merge_estates.forEach(item => {
          if (identifyArrTemp.indexOf(item.identify) < 0) {
            identifyArrTemp.push(item.identify)
          }
          item.isChoosed = false
        })
        identifyArrTemp.forEach(item => {
          this.identifyArrEstate.push({name: item, isChoosed: false})
        })
      }
    }
  },
  mounted() {
    this.getData()
  }

}
</script>

<style lang="scss" scoped>

.StakeView {
  .nav-list {
    margin-left: 12.5vw;
    display: flex;

    .nav-item {
      width: 10vw;
      min-width: 120px;
      height: 50px;
      border-radius: 30px 30px 30px 30px;
      margin-right: 10px;

      font-weight: 500;
      font-size: 18px;
      line-height: 50px;
      user-select: none;
      text-align: center;
      font-family: Roboto-Medium, Roboto;
      color: #333333;
      background: #E2E2E2;
      cursor: pointer;

      &.active {
        background: linear-gradient(225deg, #FFAB00 0%, #FFC600 100%);
      }
    }
  }

  .sub-title {
    font-size: 30px;
    font-family: Roboto-SemiBold, Roboto;
    font-weight: 600;
    color: #000000;
    line-height: 35px;
    margin-top: 60px;
    margin-bottom: 30px;
    margin-left: 12.5vw;
  }

  .stake-content {
    padding-bottom: 100px;

    .top-part {
      background: url("../../assets/images/stake_top_bg.webp");
      background-size: 100% 100%;
      width: var(--content-width);
      height: 20vw;
      box-shadow: 0px 5px 20px 5px rgba(0, 0, 0, 0.05);
      border-radius: 20px 20px 20px 20px;
      opacity: 1;
      margin: 30px auto 50px;
      padding: 3vw 6vw;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .top-part-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        font-family: Roboto-Medium, Roboto;

        .primary-btn-sha {
          width: 160px;
          height: 50px;
          background: linear-gradient(225deg, #FFAB00 0%, #FFC600 100%);
          border-radius: 30px 30px 30px 30px;
          line-height: 50px;
        }

        .icon {
          width: 66px;
          height: 66px;
        }

        .name {
          font-size: 16px;
          font-weight: 500;
          color: #C0C0C0;
          margin: 20px 0;
        }

        .value {
          font-size: 28px;
          font-weight: 900;
          line-height: 40px;
          background: linear-gradient(225deg, #FFAB00 0%, #FFC600 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      }
    }

    .stake-list {
      width: var(--content-width);
      margin: 50px auto;
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;

      .stake-item {
        width: 32%;
        margin-left: 2%;
        background: #FFFFFF;
        box-shadow: 0px 5px 20px 5px rgba(0, 0, 0, 0.05);
        border-radius: 20px 20px 20px 20px;
        border: 1px solid #E2E2E2;
        padding-bottom: 40px;

        &:nth-child(3n+1) {
          margin-left: 0;
        }

        &:nth-child(n+4) {
          margin-top: 10px;
        }

        .stake-item-content {
          margin: 0 auto;

          .value {
            .value-box {
              margin-top: 3px !important;
            }
          }
        }

        .stake-item-header {
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          align-items: center;

          .bg {
            width: 100%;
          }

          .logo-box {
            margin-top: -50px;
            z-index: 1;
            width: 100px;
            height: 100px;
            border-radius: 50%;
            background: #fff;
            user-select: none;
            padding: 4px;

            .logo {
              width: 100%;
              height: 100%;
            }

          }

          .name {
            margin-top: 20px;
            font-size: 20px;
            font-family: Roboto-Black, Roboto;
            font-weight: 900;
            color: #000000;
            line-height: 28px;
          }
        }

        .stake-item-part1, .stake-item-part2 {
          display: flex;
          margin: 40px 6% 0;
          padding-bottom: 30px;
          border-bottom: 1px solid #E2E2E2;
          justify-content: space-between;

          .item {
            text-align: justify;

            .name {
              white-space: nowrap;
              font-size: 12px;
              font-weight: 500;
              color: #999999;
            }

            .icon {
              width: 20px;
              height: 20px;
            }

            .value-box {
              margin-top: 10px;
              font-size: 14px;
              display: flex;
              align-items: center;

              .icon {
                margin-right: 10px;
              }
            }
          }
        }

        .stake-item-part2 {
          border: none;

          .item {
            .item-content {
              .blue {
                color: #6284F5;
              }

              .green {
                color: #27A17C;
              }

              .value-box {
                &:nth-child(n+2) {
                  margin-top: 3px;
                }

              }
            }
          }
        }

        .primary-btn-sha {
          font-family: RussoOneRegular, Russo One;
          margin: 0 6%;
          font-weight: 400;

        }
      }
    }

    .position-list {
      width: var(--content-width);
      margin: 30px auto 0px;

    }
  }
}

.stake-m {
  display: none;
}

@media screen and (max-width: 1000px) {
  .StakeView {
    .stake-content {
      .top-part {
        height: 42vh;
        position: relative;
        background: url("../../assets/images/stake_top_bg_m.webp");

        .stake-btn {
          position: absolute;
          bottom: 2vh;
          left: calc(50% - 15vw);
          font-family: Roboto-Bold, Roboto;

          .primary-btn-sha {
            height: 6vh;
            width: 30vw;

            color: #613A00;
            font-weight: bold;
            line-height: 6vh;
          }
        }

        .top-part-item {
          width: 33.3%;

          .icon {
            width: 10vw;
            height: 10vw;
          }

          .name {
            display: flex;
            text-align: center;
            white-space: normal;
            font-size: 3.4vw;
            height: 5vh;
          }

          .value {
            text-align: center;
            font-size: 5.2vw;
          }
        }
      }

      .stake-list {
        display: block;

        .stake-item {
          width: 100%;
          margin-bottom: 3vh;
          position: relative;
          margin-left: 0;

          .stake-item-header {

            .logo-box {
              position: absolute;
              width: 20vw;
              height: 20vw;
              left: 6vw;
              top: calc(168px - 10vw);
            }

            .bg {
              height: 120px;
            }

            .name {
              position: absolute;
              left: 28vw;
              top: 106px;
              font-size: 4vw;
            }
          }

          .stake-item-content {
            padding-top: 7vw;

            .stake-m {
              width: auto;
            }

            .stake-item-part1, .stake-item-part2 {
              margin: 3vh 5vw 0;
              padding-bottom: 2vh;

              .item {
                width: 33.3%;
                white-space: nowrap;

                .loan-value-box {
                  display: flex;

                  .value {
                    display: block;
                  }

                  .value-box {
                    margin-right: 6px;
                  }
                }
              }
            }
          }
        }
      }

      .sub-title {
        margin-left: 3vw;
      }

      .nav-list {
        margin: 0 3vw;
        justify-content: space-between;

        .nav-item {
          font-size: 4vw;
          width: 28vw;
          min-width: 100px;
        }
      }
    }
  }

  .stake-m {
    display: block;
    font-family: Roboto-Bold, Roboto;
    font-weight: bold !important;
    color: #613A00;
    line-height: 6vh;
    height: 6vh !important;
    width: 12vw;
  }
  .stake-pc {
    display: none !important;
  }
}
</style>
