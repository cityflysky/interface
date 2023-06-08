<template>
  <div class="LendView">
    <TryBankerHeader class="header"/>
    <div class="lend-item" v-for="(item,index) in tokenList" :key="index">
      <div class="left-part">
        <div class="deposit-box">
          <img class="icon" :src="require('@/assets'+item.icon)" alt="">
          <div class="deposit-content">
            <div class="name">
              Deposit APR
            </div>
            <div class="value">
              {{ dealNum(item.deposit_apy* 100 ) }}%
            </div>
          </div>
        </div>
        <div class="deposit-list">
          <div class="deposit-item">
            <div class="name">
              Total Deposit
            </div>
            <div class="value">
              {{ dealNum(item.aum) }}
            </div>
          </div>
          <div class="deposit-item">
            <div class="name">
              My Deposited
            </div>
            <div class="value">
              {{ dealNum(item.balance * item.cost_price) }}
            </div>
          </div>
          <div class="deposit-item">
            <div class="name">
              Total Earnings
            </div>
            <div class="value">
              {{ dealNum(item.balance * (item.new_price - item.cost_price)) }}
            </div>
          </div>
        </div>
      </div>
      <div class="right-part">
        <div class="right-nav">
          <div class="nav-item" :class="{'active':(item.operate==1||!item.operate)}" @click="item.operate=1">
            Deposit
          </div>
          <div class="nav-item" :class="{'active':item.operate==2}" @click="item.operate=2">
            Withdraw
          </div>
        </div>
        <div class="deposit-operate-box">
          <div class="input-header">
            <div class="name">
              {{ item.operate == 2 ? "Withdraw" : "Deposit" }}
            </div>
            <div class="value">
              <span>Balance:</span>
              <strong>
                <img class="icon" :src="require('@/assets'+item.icon)" alt="">
                <strong v-show="item.name=='ETH' && item.operate!=2">{{ dealNum(ethBalance) }}</strong>
                <strong v-show="item.name=='USD'&& item.operate!=2">{{ dealNum(usdtBalance) }}</strong>

                <strong v-show="item.operate==2">{{ dealNum(item.balance) }}</strong>
              </strong>
            </div>
          </div>
          <div class="input-box">
            <input type="text" v-model="item.amount">
            <div class="input-right-tip">
              <img class="icon" :src="require('@/assets'+item.icon)" alt="">
              <strong>{{ item.tokenName }}</strong>
            </div>
          </div>
          <div class="choose-rate">
            <div class="rate" :class="{'active':item.rateIdx==1}" @click="item.rateIdx=1;setAmount(item,0.25)">
              25%
            </div>
            <div class="rate" :class="{'active':item.rateIdx==2}" @click="item.rateIdx=2;setAmount(item,0.5)">
              50%
            </div>
            <div class="rate" :class="{'active':item.rateIdx==3}" @click="item.rateIdx=3;setAmount(item,0.75)">
              75%
            </div>
            <div class="rate" :class="{'active':item.rateIdx==4}" @click="item.rateIdx=4;setAmount(item,1)">
              100%
            </div>
          </div>

          <div v-show="item.operate != 2">
            <a-button :loading="item.isLoading" class="primary-btn-sha"
                      v-show="item.name=='USD'&&( allowanceBalance<item.amount)"
                      @click="approve(item)">
              Approve
            </a-button>
            <a-button :loading="item.isLoading" class="primary-btn-sha"
                      v-show="item.name=='USD'&&(allowanceBalance>=item.amount||!item.amount)" @click="deposit(item)">
              Deposit
            </a-button>
            <a-button :loading="item.isLoading" class="primary-btn-sha" @click="deposit(item)" v-show="item.name!='USD'">
              Deposit {{ item.tokenName }}
            </a-button>
          </div>
          <div v-show="item.operate == 2">
            <a-button :loading="item.isLoading" class="primary-btn-sha" @click="withdraw(item)">
              Withdraw {{ item.tokenName }}
            </a-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {getLendingData} from "@/api/homeApi";
import bigNumberUtil from "@/utils/bigNumberUtil";
import {message} from "ant-design-vue"
import {mapGetters} from "vuex"
import addressMap from "@/abi/addressMap";
import {getTranStatus} from "@/api/common";
import bignumber from "bignumber.js";

const calculator = new bigNumberUtil();


export default {
  name: "LendView",
  data() {
    return {
      tokenList: [],
      dealNum: calculator.dealNum,
      amount: 0,
      allowanceBalance: 0,

    }
  },
  computed: {
    ...mapGetters(["account", "web3", "ethBalance", "usdtBalance", "isConnected", "chainId"]),


  },
  watch: {
    account() {
      this.allowance()
      this.getData()

    },
    isConnected() {
      this.allowance()
      this.getData()
    },

  },
  beforeMount() {
    this.allowance()
  },
  methods: {
    async  dealRes(transactionHash) {
      let statusRes = await getTranStatus(transactionHash);
      if (statusRes.data.data == 1) {
        setTimeout(() => {
          this.getData()
          return

        }, 3000);
      } else {
        setTimeout(() => {
          this.dealRes(transactionHash);
        }, 3000);
      }
    },
    setAmount(item, rate) {
      if(item.operate == 2){
        item.amount = item.balance  * rate
      }else{
        if (item.name == "ETH") {
          item.amount = this.ethBalance * rate
        } else {
          item.amount = this.usdtBalance * rate

        }
      }

    },
    async allowance() {
      if (this.isConnected) {
        let res = await this.$store.dispatch("erc20/allowance", {
          owner: this.account,
          spender: addressMap[this.chainId]["vault"],
          address: addressMap[this.chainId]["usdt"]
        })
        this.allowanceBalance = res / this.$store.state.app.usdtDecimal
      }
    },
    async approve(item) {
      if (this.isConnected) {
        console.log(calculator.multiply(item.amount, this.$store.state.app.usdtDecimal * 10).toString())
        await this.$store.dispatch("erc20/approve", {
          spender: addressMap[this.chainId]["vault"],
          amount: bignumber(calculator.multiply(item.amount, this.$store.state.app.usdtDecimal * 10)).toFixed(0),
          address: item.underlying
        }).then(() => {
          this.allowance()
          this.getBalance()
        })
      }
    },
    async getBalance() {
      if (this.$store.state.app.isConnected) {
        let res = await this.$store.dispatch("erc20/balanceOf", {
          account: this.account,
          address: addressMap[this.chainId]["usdt"]
        })
        this.$store.commit("app/SET_USDTBalance", res / this.$store.state.app.usdtDecimal)
      }
    },
    deposit(item) {
      let value = 0, amount = 0

      if (!this.isConnected) {
        message.info("Please connect")
        return
      }
      if (!item.amount || item.amount <= 0) {
        message.info("amount should >0")
        return
      }
      if ((item.name == "ETH" && item.amount > this.ethBalance) || (item.name == "USD" && item.amount > this.usdtBalance)) {
        message.info("balance not enough")
        return
      }
      if ((item.name == "ETH")) {
        value = item.amount
        amount = this.web3.utils.toWei(item.amount.toString())
      } else {
        amount = bignumber((item.amount * this.$store.state.app.usdtDecimal)).toFixed(0)
      }
      try {
        item.isLoading = true
        this.$store.dispatch("vault/deposit", {
          value,
          _underlying: item.underlying,
          _amount: amount,
        }).then(async (res) => {
          console.log(res)
          if (res) {
            this.getBalance()
            item.isLoading = false
            item.balance = calculator.add(item.balance ,item.amount)
            message.success("Deposit SUCCESS")
            this.$store.dispatch("app/getETHBalance")
            await this.dealRes(res.transactionHash,)
            this.getData()
          }
        }).catch(e => {
          if (e.message && e.message.indexOf("{") < 0) {
            message.error(e.message)
          } else {
            const err = JSON.parse(e.message.substr(e.message.indexOf("{"), e.message.length))
            message.error(err.originalError.message)
            this.isLoading = false
          }
          item.isLoading = false

        })
      } catch (e) {
        item.isLoading = false
        console.log(e)
        if (e.message) {
          message.error(e.message)
        } else {
          JSON.parse(e.message.substr(24, e.message.length)).message
        }
      }
    },
    withdraw(item) {
      let amount = 0
      item.isLoading = true
      if (!this.isConnected) {
        message.info("Please connect")
        return
      }
      if (!item.amount || item.amount <= 0) {
        message.info("amount should >0")
        return
      }

      if ((item.name == "ETH")) {
        amount = this.web3.utils.toWei(item.amount.toString())
      } else {
        amount = (item.amount * 10 ** 6).toString()
      }
      try {
        this.$store.dispatch("vault/withdraw", {
          _underlying: item.underlying,
          _share: amount,
        }).then(async (res) => {
          this.getBalance()
          item.isLoading = false
          item.balance = calculator.subtract(item.balance ,item.amount)
          this.$store.dispatch("app/getETHBalance")
          message.success("Withdraw SUCCESS")
          await this.dealRes(res.transactionHash)
          this.getData()
        }).catch(e => {
          message.info(e.message)
        })
      } catch (e) {
        message.info(e.message)
      }
    },
    async getData() {
      if(!this.isConnected){
        return
      }
      let res = await getLendingData(this.chainId, this.account)
      this.tokenList = res.data.data
    }
  },

  async created() {
    this.getData()
  }
}
</script>

<style lang="scss" scoped>
.LendView {

  .lend-item {
    margin: 30px auto;
    width: var(--content-width);
    background: #FFFFFF;
    box-shadow: 0px 5px 20px 5px rgba(0, 0, 0, 0.05);
    border-radius: 20px 20px 20px 20px;
    border: 1px solid #E2E2E2;
    padding: 50px;
    display: flex;

    .left-part {
      width: 50%;
      padding-right: 40px;
      border-right: 1px solid #E2E2E2;;

      .deposit-box {
        display: flex;

        .icon {
          width: 80px;
          height: 80px;
          margin-right: 20px;
        }

        .deposit-content {
          .name {
            font-size: 20px;
            font-family: Roboto-Medium, Roboto;
            font-weight: 500;
            color: #999999;
          }

          .value {
            display: flex;
            align-items: center;
            font-size: 30px;
            font-family: Roboto-Black, Roboto;
            font-weight: 900;
            color: #000000;
          }
        }
      }

      .deposit-list {
        margin-top: 50px;
        display: flex;
        justify-content: space-between;

        .deposit-item {
          .name {
            font-size: 18px;
            font-family: Roboto-Medium, Roboto;
            font-weight: 500;
            color: #999999;
          }

          .value {
            display: flex;
            align-items: center;
            margin-top: 20px;
            font-size: 22px;
            font-family: Roboto-Black, Roboto;
            font-weight: 900;
            color: #333333;
          }
        }
      }
    }

    .right-part {
      width: 50%;
      padding-left: 40px;

      .right-nav {
        width: 100%;
        display: flex;
        border-bottom: 1px solid #E2E2E2;

        .nav-item {
          cursor: pointer;
          width: 100px;
          padding-bottom: 10px;
          font-size: 18px;
          font-family: Roboto-Medium, Roboto;
          font-weight: 500;
          text-align: center;
          user-select: none;

          &.active {
            color: #FFC600;
            border-bottom: 2px solid #FFC600;
          }
        }
      }

      .deposit-operate-box {
        width: 100%;

        .input-header {
          margin-top: 20px;
          width: 100%;
          display: flex;
          justify-content: space-between;

          .name {
            font-size: 20px;
            font-family: Roboto-Bold, Roboto;
            font-weight: bold;
            color: #000000;
          }

          .value {
            display: flex;
            align-items: center;
            strong{
              display: flex;
              align-items: center;
              color: #333;

            }
            span {
              font-size: 16px;
              font-family: Roboto-Medium, Roboto;
              font-weight: 500;
              color: #999;

            }

            .icon {
              width: 20px;
              height: 20px;
              margin: 0 5px 0 12px;
            }
          }
        }

        .input-box {
          height: 60px;
          background: #F1F1F1;
          border-radius: 50px 50px 50px 50px;
          margin-top: 20px;
          position: relative;

          input {

            width: 100%;
            height: 100%;
            background: none;
            padding: 0 20px;
            font-size: 18px;
            font-weight: bold;
          }

          .input-right-tip {
            position: absolute;
            right: 20px;
            top: 15px;
            display: flex;
            align-items: center;
            font-size: 16px;
            padding-left: 20px;
            border-left: 1px solid #DADADA;

            .icon {
              width: 30px;
              height: 30px;
              margin-right: 10px;
            }
          }
        }

        .choose-rate {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin: 10px 0 20px 0;

          .rate {
            width: 20%;
            min-height: 30px;
            height: 3vh;
            background: #F1F1F1;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50px 50px 50px 50px;
            font-size: 14px;
            font-family: Roboto-Medium, Roboto;
            font-weight: 500;
            cursor: pointer;
            user-select: none;

            &.active {
              background: linear-gradient(225deg, #FFAB00 0%, #FFC600 100%);
            }
          }
        }

        .primary-btn-sha {
          height: 5vh;
          color:#613A00;
          min-height: 40px;
          width: 100%;
          font-family: RussoOneRegular, Russo One;
        }
      }
    }
  }

  @media screen and (max-width: 1000px) {
    .lend-item {
      display: block;
      padding: 3vh 5vw;

      .left-part, .right-part {
        width: 100%;
        padding: 0;
      }

      .left-part {
        border-right: none;

        .deposit-box {
          .icon {
            width: 15vw;
            height: 15vw;
          }

          .deposit-content {
            .name {
              font-size: 3.8vw;
            }

            .value {
              font-size: 6vw;
            }
          }
        }

        .deposit-list {
          padding-bottom: 3vh;

          .deposit-item {
            .name {
              font-size: 3.8vw;
            }

            .value {
              font-size: 5vw;
            }
          }
        }
      }

      .right-part {
        .right-nav {
          .nav-item {
            width: 22vw;
            font-size: 4vw;
            min-width: 80px;
          }
        }

        .deposit-operate-box {
          .input-header {
            .name {
              font-size: 5vw;
            }

            .value {
              font-size: 3.8vw;

              span {
                font-size: 4vw;
              }
            }
          }

        }
      }
    }

  }
}
</style>
