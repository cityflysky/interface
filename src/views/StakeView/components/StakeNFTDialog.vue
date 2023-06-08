<template>
  <div class="StakeNFTDialog ">
    <div class="dialog-content-m">
      <div class="dialog-header">
        <div class="title">
          Stake NFT
        </div>
        <img src="../../../assets/svg/close.svg" alt="" class="close" @click="$emit('closeDialog')">
      </div>
      <div class="dialog-content-container">
        <div class="nav-list">
          <div class="nav-item" :class="{'active':activeIndex=='Land'}" @click="activeIndex='Land' ">
            Land
          </div>
          <div class="nav-item" :class="{'active':activeIndex=='Estate'}"
               @click="$emit('initData');activeIndex='Estate'; ">
            Estate
          </div>
        </div>
        <div class="nav-btn-box">
          <div class="nav-item" v-show="activeIndex=='Land'"
               :class="{'active':item.isChoosed}"
               @click="chooseIdentify(item)" v-for="(item,index) in identifyArr" :key="index">
            <img src="../../../assets/svg/choosed.svg" alt="" class="icon">
            {{ item.name }}
          </div>
          <div class="nav-item" v-show="activeIndex=='Estate'"
               :class="{'active':item.isChoosed}"
               @click="item.isChoosed=!item.isChoosed" v-for="(item,index) in tokensData.merge_estates" :key="index">
            <img src="../../../assets/svg/choosed.svg" alt="" class="icon">
            {{ item.identify }}
          </div>
        </div>
        <div class="nft-list">
          <template v-for="(item,index) in  tokensData.tokens" :key="index">
            <div class="nft-list-part" v-show="item.isChoosed">
              <div class="nft-item" @click="chooseNFT(nft,item)" :class="{'active':nft.choosed==true}"
                   v-for="(nft,idx) in  item.nfts" :key="idx">
                <img :src="nft.image" alt="" class="icon">
                <div class="name">
                  <strong v-if="nft.name">{{ nft.name }}</strong>
                  <strong v-else>{{ nft.token_id }}</strong>
                </div>
                <div class="choose-box">
                  <img src="../../../assets/svg/choosed.svg" alt="" class="icon">
                </div>
              </div>
            </div>
          </template>
        </div>
        <div class="nft-detail-box">
          <div class="part1" v-if="curNFT&&activeIndex=='Estate'">
            <div class="img-box">
              <img :src="curNFT.image" alt="" class="icon">
            </div>
            <div class="part1-content">
              <div class="flex-box">
                <!--                <img v-if="curTypeObj.icon" :src="require('@/assets'+curTypeObj.icon)" alt="" class="icon">-->

                <strong>{{ curTypeObj.name }}</strong>
              </div>
              <div class="info-list">
                <div class="item">
                  <div class="name">
                    ID
                  </div>
                  <div class="value">
                    {{ curNFT.token_id }}
                  </div>
                </div>
                <div class="item">

                </div>
                <div class="item">
                  <div class="name">
                    Location
                  </div>
                  <div class="value">
                    {{ curNFT.name }}
                  </div>
                </div>

              </div>

            </div>
            <a v-if="curNFT.metadata" class="primary-btn-sha" :href="curNFT.metadata.external_url" target="_blank">
              View map
            </a>
          </div>
          <div class="part2">
            <div class="left-part">

              <div class="flex-box">
                <div class="name">
                  Collaterals Value
                </div>
                <div class="value-box">
                  <img v-show="selectCoin=='ETH'" src="../../../assets/svg/ethereum.svg" alt="" class="icon">
                  <img v-show="selectCoin=='USD'" src="../../../assets/svg/usdt.svg" alt="" class="icon">
                  {{ collateralsValuePrice }}
                </div>
              </div>
              <div class="flex-box">
                <div class="name">
                  Loan to Value
                </div>
                <div class="value-box">
                  <div :class="{'blue':selectCoin=='ETH',}">{{ canLoanValuePrice }} {{ selectCoin }}</div>
                </div>
              </div>
            </div>
            <div class="right-part">
              <div class="flex-box">
                <div class="name">
                  Available Loan Limit
                </div>
                <div class="value-box">
                  <img v-show="selectCoin=='ETH'" src="../../../assets/svg/ethereum.svg" alt="" class="icon">
                  <img v-show="selectCoin=='USD'" src="../../../assets/svg/usdt.svg" alt="" class="icon">
                  {{ availbleLoan }}
                </div>
              </div>

              <div class="flex-box">
                <div class="name">
                  Est. Loan Time Available
                </div>
                <div class="value-box available-time">
                  <!--                    <strong> 188 </strong> Days: <strong style="margin-left: 3px"> 05 </strong> Hours-->
                  {{ availableTime }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="bottom-content">
          <div class="title">
            Borrow Amount
          </div>
          <div class="input-box">
            <input type="number" v-model="amount">
            <div class="right-tip">
              <div class="max-btn primary-btn" @click="setMax">
                Max
              </div>
              <div class="line"></div>
              <Select
                  ref="select"
                  v-model:value="selectCoin"
                  style="width: 120px"
                  class="select-box"
              >
                <template #option="{ label,icon }">
                  <img :src="require('../../../assets/svg/'+`${icon}.svg`)" style="width: 20px;" class="icon" alt="">
                  &nbsp;&nbsp;{{ label }}
                </template>
                <SelectOption value="ETH" label="ETH" icon="ethereum">
                  ETH
                </SelectOption>
                <SelectOption value="USD" label="USD" icon="usdt">
                  USD
                </SelectOption>
              </Select>

            </div>
          </div>
          <div class="operate-box">
            <a-button class="primary-btn-sha" @click="setApprovalForAll">
              Approve
            </a-button>
            <a-button :loading="isLoading" class="primary-btn-sha" @click="stake">
              Staking NFT
            </a-button>
          </div>
        </div>
      </div>
    </div>
    <div class="dialog pc">
      <div class="dialog-mask "></div>
      <div class="dialog-content ">
        <div class="dialog-header">
          <div class="title">
            Stake NFT
          </div>
          <img src="../../../assets/svg/close.svg" alt="" class="close" @click="handleClose">
        </div>
        <div class="dialog-content-container">
          <div class="nav-list">
            <div class="nav-item" :class="{'active':activeIndex=='Land'}" @click="activeIndex='Land'">
              Land
            </div>
            <div class="nav-item" :class="{'active':activeIndex=='Estate'}"
                 @click="$emit('initData');activeIndex='Estate';">
              Estate
            </div>
          </div>
          <div class="nav-btn-box">
            <div class="nav-item" v-show="activeIndex=='Land'"
                 :class="{'active':item.isChoosed}"
                 @click="chooseIdentify(item)" v-for="(item,index) in identifyArr" :key="index">
              <img src="../../../assets/svg/choosed.svg" alt="" class="icon">
              {{ item.name }}
            </div>
            <div class="nav-item" v-show=" activeIndex=='Estate'"
                 :class="{'active':item.isChoosedType}"
                 @click="chooseEstateIdentify(item)" v-for="(item,index) in identifyArrEstate"
                 :key="index">
              <img src="../../../assets/svg/choosed.svg" alt="" class="icon">
              {{ item.name }}
            </div>
          </div>
          <div class="nft-list" v-show="activeIndex=='Land'">
            <template v-for="(item,index) in  tokensData.tokens" :key="index">
              <div class="nft-item"
                   @click="chooseNFT(nft,item)"
                   v-show="item.isChoosed"
                   :class="{'active':nft.choosed==true}"
                   v-for="(nft,idx) in  item.nfts"
                   :key="idx">
                <img :src="nft.image" alt="" class="icon">
                <div class="name">
                  <strong v-if="nft.name">{{ nft.name }}</strong>
                  <strong v-else>{{ nft.token_id }}</strong>
                </div>
                <div class="choose-box">
                  <img src="../../../assets/svg/choosed.svg" alt="" class="icon">
                </div>
              </div>
            </template>
          </div>
          <div class="nft-list" v-show="activeIndex=='Estate'">
            <div class="nft-item"
                 @click="chooseEstate(nft)"
                 v-show="nft.isChoosedType"
                 :class="{'active':nft.choosed==true}"
                 v-for="(nft,idx) in  tokensData.merge_estates"
                 :key="idx">
              <img :src="nft.icon" alt="" class="icon">
              <div class="name">
                <strong v-if="nft.name">{{ nft.name }}</strong>
                <strong v-else>{{ nft.token_id }}</strong>
              </div>
              <div class="choose-box">
                <img src="../../../assets/svg/choosed.svg" alt="" class="icon">
              </div>
            </div>
          </div>
          <div class="nft-detail-box">
            <div class="part1" v-if="curNFT&&activeIndex=='Estate'">
              <div class="img-box">
                <img :src="curNFT.image" alt="" class="icon">
              </div>
              <div class="part1-content">
                <div class="flex-box">
                  <!--                  <img :src="require('@/assets'+curTypeObj.icon)" alt="" class="icon">-->

                  <strong>{{ curTypeObj.name }}</strong>
                </div>
                <div class="info-list">
                  <div class="item">
                    <div class="name">
                      Size
                    </div>
                    <div class="value">
                      {{ curNFT.size }}* {{ curNFT.size }}
                    </div>
                  </div>
                  <div class="item">

                  </div>
                  <div class="item">
                    <div class="name">
                      Parcels
                    </div>
                    <div class="value">
                      {{ curNFT.token_ids ? curNFT.token_ids.length : 0 }}
                    </div>
                  </div>

                </div>

              </div>
              <a v-if="curNFT.metadata" class="primary-btn-sha" :href="curNFT.metadata.external_url" target="_blank">
                View map
              </a>
            </div>
            <div class="part2">
              <div class="left-part">

                <div class="flex-box">
                  <div class="name">
                    Collaterals Value
                  </div>
                  <div class="value-box">
                    <img v-show="selectCoin=='ETH'" src="../../../assets/svg/ethereum.svg" alt="" class="icon">
                    <img v-show="selectCoin=='USD'" src="../../../assets/svg/usdt.svg" alt="" class="icon">
                    {{ collateralsValuePrice }}
                  </div>
                </div>
                <div class="flex-box">
                  <div class="name">
                    Loan to Value
                  </div>
                  <div class="value-box">
                    <div :class="{'blue':selectCoin=='ETH',}">{{ canLoanValuePrice }} {{ selectCoin }}</div>
                  </div>
                </div>
              </div>
              <div class="right-part">
                <div class="flex-box">
                  <div class="name">
                    Available Loan Limit
                  </div>
                  <div class="value-box">
                    <img v-show="selectCoin=='ETH'" src="../../../assets/svg/ethereum.svg" alt="" class="icon">
                    <img v-show="selectCoin=='USD'" src="../../../assets/svg/usdt.svg" alt="" class="icon">
                    {{ availbleLoan }}
                  </div>
                </div>

                <div class="flex-box">
                  <div class="name">
                    Est. Loan Time Available
                  </div>
                  <div class="value-box available-time">
                    <!--                    <strong> 188 </strong> Days: <strong style="margin-left: 3px"> 05 </strong> Hours-->
                    {{ availableTime }}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="bottom-content">
            <div class="title">
              Borrow Amount
            </div>
            <div class="input-box">
              <input type="number" v-model="amount">
              <div class="right-tip">
                <div class="max-btn primary-btn" @click="setMax">
                  Max
                </div>
                <div class="line"></div>
                <Select
                    ref="select"
                    v-model:value="selectCoin"
                    style="width: 120px"
                    class="select-box"
                >
                  <template #option="{ label,icon }">
                    <img :src="require('../../../assets/svg/'+`${icon}.svg`)" style="width: 20px;" class="icon" alt="">
                    &nbsp;&nbsp;{{ label }}
                  </template>
                  <SelectOption value="ETH" label="ETH" icon="ethereum">
                    ETH
                  </SelectOption>
                  <SelectOption value="USD" label="USD" icon="usdt">
                    USD
                  </SelectOption>
                </Select>

              </div>
            </div>
            <div class="operate-box">
              <a-button class="primary-btn-sha" @click="setApprovalForAll">
                Approve
              </a-button>
              <a-button :loading="isLoading" class="primary-btn-sha" @click="stake">
                Staking NFT
              </a-button>
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
import {message, Select, SelectOption} from "ant-design-vue"
import addressMap from "@/abi/addressMap";
import {mapGetters} from "vuex";
import {dealRes} from "@/utils/utilMehods";
import bignumber from "bignumber.js"

export default {
  name: "StakeNFTDialog",
  props: ["closeDialog", "tokensData", "availableLoanArr", "priceMap", "identifyArr", "identifyArrEstate", "curIdentify", "initData"],
  components: {Select, SelectOption},
  data() {
    return {
      availbleLoan: 0,
      canLoanValue: 0,
      collateralsValue: 0,
      isLoading: false,
      dealNum: calculator.dealNum,
      curTypeObj: null,
      curNFT: null,
      selectCoin: "ETH",
      activeIndex2: 1,
      active: false,
      amount: undefined,
      activeIndex: "Land",
      nftList: [{name: "Land (59,235)"}, {name: "Land (59,235)"}, {name: "Land (59,235)"}, {name: "Land (59,235)"}, {name: "Land (59,235)"}, {name: "Land (59,235)"}, {name: "Land (59,235)"}, {name: "Land (59,235)"}, {}]
    }
  },
  computed: {
    ...mapGetters(["account", "web3", "isConnected", "chainId", "usdtDecimal"]),
    collateralsValuePrice() {
      if (this.selectCoin == "ETH") {
        return this.collateralsValue
      }
      return this.dealNum(this.collateralsValue * this.priceMap["ETH"])
    },
    canLoanValuePrice() {
      if (this.selectCoin == "ETH") {
        return this.canLoanValue
      }
      return this.dealNum(bignumber(this.canLoanValue * this.priceMap["ETH"]).toFixed(2, bignumber.ROUND_DOWN))
    },
    availableTime() {
      const lqApr = this.tokensData.liquidate_rate / 10000
      if (!this.canLoanValuePrice || !this.amount) {
        return "0 Days 0 Hours"
      }
      const availAmount = calculator.subtract(this.collateralsValuePrice * lqApr, this.amount)
      let canBorrowYears = 0
      this.tokensData.pools.forEach(item => {
        if (item.name == this.selectCoin) {
          const onYearCost = this.amount * item.borrow_apy
          canBorrowYears = calculator.divide(availAmount, onYearCost)
        }
      })
      if (!canBorrowYears || canBorrowYears <= 0) {
        return "0 Days 0 Hours"
      }
      const days = parseInt(canBorrowYears * 365).toFixed(0)
      const hours = (canBorrowYears * 365 - days) * 24
      return days + " Days:" + bignumber(hours).toFixed(0) + " Hours"
    }
  },
  watch: {

    selectCoin(coin) {
      if (coin == "ETH") {
        this.availbleLoan = this.dealNum(this.availableLoanArr[0])
      } else {
        this.availbleLoan = this.dealNum(this.availableLoanArr[1])

      }
    },
  },
  methods: {
    handleClose() {
      this.$emit('closeDialog')
    },

    chooseIdentify(identify) {
      identify.isChoosed = !identify.isChoosed
      this.tokensData.tokens.forEach(item => {
        if (item.identify == identify.name) {
          item.isChoosed = !item.isChoosed
        }
      })
    },
    chooseEstateIdentify(identify) {
      identify.isChoosedType = !identify.isChoosedType
      this.tokensData.merge_estates.forEach(item => {
        if (item.identify == identify.name) {
          item.isChoosedType = !item.isChoosedType
        }
      })
    },

    chooseEstate(nft) {
      this.$emit("initData") // reset arr data
      this.chooseNFT(nft, nft)
    },
    chooseNFT(nft, nftTypeObj) {
      this.curTypeObj = nftTypeObj
      nft.choosed = !nft.choosed
      const loanV = calculator.multiply(nftTypeObj.pledge_rate, nftTypeObj.floor_price)

      if (nft.choosed) {
        this.curNFT = nft
        this.collateralsValue = this.dealNum(calculator.add(this.collateralsValue, nftTypeObj.floor_price))
        this.canLoanValue = this.dealNum(calculator.add(this.canLoanValue, loanV))
      } else {
        this.curNFT = null
        this.collateralsValue = this.dealNum(calculator.subtract(this.collateralsValue, nftTypeObj.floor_price))
        this.canLoanValue = this.dealNum(calculator.subtract(this.canLoanValue, loanV))

        if (this.collateralsValue <= 0) {
          this.collateralsValue = 0
        }
      }
    },
    setMax() {
      this.amount = this.canLoanValuePrice
    },
    async handleStake(addrArr, chooseNftArr, underlying, decimals) {
      console.log(addrArr, chooseNftArr)
      let idArr = []
      chooseNftArr.forEach(item => {
        idArr.push(item.token_id)
      })
      try {
        this.isLoading = true
        await this.$store.dispatch("stake/stake", {
          _nfts: addrArr,
          _ids: idArr,
          _underlying: underlying,
          _amount: bignumber(this.amount * decimals).toFixed(0)
        }).then(async (res) => {
          await dealRes(res.transactionHash,)
          this.$emit("updateData")
          this.isLoading = false
        }).catch(e => {
          this.isLoading = false
          console.log(e.message)
          if (e.message && e.message.indexOf("{") < 0) {
            message.error(e.message)
          } else {
            const err = JSON.parse(e.message.substr(e.message.indexOf("{"), e.message.length))
            message.error(err.originalError.message)
            this.isLoading = false
          }
        })
      } catch (e) {
        console.log(e)
        this.isLoading = false

        if (e.message && e.message.indexOf("{") < 0) {
          message.error(e.message)
        } else {
          const err = JSON.parse(e.message.substr(e.message.indexOf("{"), e.message.length))
          message.error(err.originalError.message)
          this.isLoading = false
        }

      }
    },
    async stakeSame(chooseNftTypeArr, chooseNftArr, underlying, decimals) {
      console.log(chooseNftTypeArr, chooseNftArr)

      try {
        this.isLoading = true
        await this.$store.dispatch("stake/stakeSame", {
          _nft: chooseNftTypeArr[0].contract,
          _ids: chooseNftArr,
          _underlying: underlying,
          _amount: bignumber(this.amount * decimals).toFixed(0)
        }).then(async (res) => {
          await dealRes(res.transactionHash,)
          this.$emit("updateData")
          this.isLoading = false
        })
      } catch (e) {
        console.log(e)
        this.isLoading = false
        if (e.message && e.message.indexOf("{") < 0) {
          message.error(e.message, 1000)
        } else {
          const err = JSON.parse(e.message.substr(e.message.indexOf("{"), e.message.length))
          message.error(err.originalError.message)
          this.isLoading = false
        }

      }
    },
    async estateStake(underlying, decimals) {
      let chooseNftArr = [], contractArr = []
      this.tokensData.merge_estates.forEach(nfts => {
        if (nfts.choosed) {
          chooseNftArr = nfts.token_ids
          console.log(nfts.token_ids)
          contractArr.push({
            contract: nfts.contract
          })
        }
      })
      this.stakeSame(contractArr, chooseNftArr, underlying, decimals)
    },
    async stake() {
      if (!this.isConnected) {
        message.info("Please connect")
        return
      }
      if (!this.amount || this.amount <= 0) {
        message.info("Please input amount")
        return
      }

      let chooseNftArr = [], chooseTypeNum = 0,
          chooseNftTypeArr = [], addrArr = [],
          underlying = "", decimals = 10 ** 18

      this.tokensData.pools.forEach(item => {
        if (item.name == this.selectCoin) {
          underlying = item.underlying
          decimals = 10 ** item.decimals
        }
      })
      if (this.activeIndex == "Estate") { // estate Stake
        this.estateStake(underlying, decimals)
        return
      }
      this.tokensData.tokens.forEach(item => {
        if (item.isChoosed) {
          let hasNft = false
          item.nfts.forEach(nft => {
            if (nft.choosed) {
              hasNft = true
              chooseNftArr.push(nft)
              addrArr.push(item.contract)
            }
          })
          if (hasNft) {
            chooseTypeNum++
            chooseNftTypeArr.push(item)
          }
        }
      })


      if (chooseTypeNum <= 0 || chooseNftArr.length <= 0) {
        message.info("Please choose nft")
        return
      }
      if (chooseTypeNum === 1) {
        let idArr = []
        chooseNftArr.forEach(item => {
          idArr.push(item.token_id)
        })
        this.stakeSame(chooseNftTypeArr, idArr, underlying, decimals)
      }
      if (chooseTypeNum > 1) {
        this.handleStake(addrArr, chooseNftArr, underlying, decimals)
      }
    },
    async setApprovalForAll() {
      if (!this.isConnected) {
        message.info("Please connect")
        return
      }
      if (this.activeIndex == "Estate") { // estate approve
        let contractAddr = ""
        this.tokensData.merge_estates.forEach(item => {
          if (item.choosed) {
            contractAddr = item.contract
          }
        })
        console.log(contractAddr)
        await this.$store.dispatch("erc721/setApprovalForAll", {
          address: contractAddr,
          approved: true,
          to: addressMap[this.chainId]["stake"]
        }).then(() => {
        })
        return
      }

      let chooseTypeNum = 0, chooseNftTypeArr = []
      this.tokensData.tokens.forEach(item => {
        if (item.isChoosed) {
          let hasNft = false
          item.nfts.forEach(nft => {
            if (nft.choosed) {
              hasNft = true
            }
          })
          if (hasNft) {
            chooseTypeNum++
            chooseNftTypeArr.push(item)
          }
        }
      })
      if (chooseTypeNum <= 0) {
        message.info("Please choose nft")
        return
      }
      chooseNftTypeArr.forEach(async item => {
        await this.$store.dispatch("erc721/setApprovalForAll", {
          address: item.contract,
          approved: true,
          to: addressMap[this.chainId]["stake"]
        }).then(() => {
        })
      })

    },
  },

}
</script>

<style lang="scss" scoped>
::v-deep(.ant-select-item-option-content) {
  .icon {
    width: 20px;
  }
}

.dialog-content-container {
  min-width: 700px;
  width: 55vw;
  overflow-y: scroll;
  overflow-x: hidden;
  max-height: 80vh;
  padding-bottom: 38px;

  ::v-deep(.ant-select-selector) {
    background: none !important;
    border: none;
  }

  ::v-deep(.select-box) {
    background: none !important;
    border: none !important;

  }

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
      text-transform: capitalize;
      height: 44px;
      padding: 0 20px;
      background: #E2E2E2;
      border-radius: 50px 50px 50px 50px;
      display: flex;
      user-select: none;
      align-items: center;
      justify-content: center;
      font-size: 14px;
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
      margin: 0 4px 8px 4px;
      height: 113px;
      background: #FFFFFF;
      border-radius: 8px 8px 8px 8px;
      border: 2px solid #fff;
      padding: 6px;
      position: relative;

      &.active {
        border: 2px solid #FFC001;

        .choose-box {
          .icon {
            display: block;
          }
        }
      }

      &:nth-child(6n) {
        margin-right: 0;
      }

      .choose-box {
        position: absolute;
        top: 12px;
        right: 10px;
        width: 15px;
        height: 15px;
        background: #FFFFFF;
        border-radius: 50%;

        .icon {
          width: 16px;
          filter: drop-shadow(#FFC600 5000px -2px);
          height: 16px;
          transform: translate(-5000px, 2px);
          display: none;
        }
      }

      .icon {
        width: 75px;
        height: 75px;
      }

      .name {
        font-size: 10px;
        font-family: Roboto-Medium, Roboto;
        font-weight: 500;
        color: #333333;
        margin-top: 6px;
        white-space: nowrap;
        overflow: hidden;

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
            border-radius: 50%;
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
        width: 45%;
        height: 5vh;

        font-family: RussoOneRegular, Russo One;
      }
    }
  }
}

.dialog-content-m {
  display: none;
}

@media screen and (max-width: 1000px) {
  .pc {
    display: none;
  }
  .dialog-content-m {
    display: block;
  }
  .dialog-header {
    display: flex;
    padding: 3vh 30px 0;
    justify-content: space-between;

    .title {
      font-size: 5vw;
      font-family: Roboto-SemiBold, Roboto;
      font-weight: 600;
      color: #000000;
    }

    .close {
      width: 30px;
      height: 30px;
      cursor: pointer;
    }
  }

  .dialog-content-container {
    min-width: 100%;
    width: 100%;

    .nav-list {
      margin: 1vh 0 2vh 0;
      padding: 0 5vw;

    }

    .nav-btn-box {
      padding: 0 5vw;
      overflow-x: scroll;
      overflow-y: hidden;

      .nav-item {
        font-size: 3.4vw;
        width: 33vw;
        height: 10vw;

        .icon {
          width: 20px;
          height: 20px;
        }
      }
    }

    .nft-list {
      margin: 3vh 5vw;
      width: 90vw;
      height: 30vh;
    }

    .nft-detail-box {
      padding: 2vh 5vw;

      .part1 {
        .img-box {

          .icon {
            width: 100%;
          }
        }

        .part1-content {
          padding: 0 3vw;
          margin: 0;

          .flex-box {
            .icon {
              width: 20px;
              height: 20px;
            }

            strong {
              font-size: 3.4vw;
            }
          }

          .info-list {
            margin-top: 2vh;
            width: 30vw;
            display: block;

            .item {
              display: flex;
              justify-content: space-between;
              align-items: center;

              .name {
                font-size: 3.2vw;
              }

              .value {
                margin-top: 0;
                font-size: 3.4vw;
              }
            }

          }
        }

        .primary-btn-sha {
          width: 20vw;
          min-width: 100px;
          font-size: 3.2vw;
          white-space: nowrap;
        }
      }

      .part2 {
        display: block;

        .left-part, .right-part {
          width: 100%;
        }
      }
    }

    .bottom-content {
      padding: 0 5vw;
    }
  }
}
</style>
