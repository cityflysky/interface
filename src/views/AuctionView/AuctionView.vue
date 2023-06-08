<template>
  <div class="AuctionView">
    <TryBankerHeader class="header"/>
    <div class="action-content">
      <div class="nav-list">
        <div class="nav-item" :class="{'active':activeNav1==1}" @click="activeNav1=1">
          In Auction
        </div>
        <div class="nav-item" :class="{'active':activeNav1==2}" @click="activeNav1=2">
          Near Liquidation
        </div>
      </div>
      <div class="nav-list2">
        <div class="nav-item" :class="{'active':activeNav2=='Land'}" @click="activeNav2='Land'">
          Land
        </div>
        <div class="nav-item" :class="{'active':activeNav2=='Estate'}" @click="activeNav2='Estate'">
          Estate
        </div>
        <div class="nav-item" :class="{'active':activeNav2=='Bundle'}" @click="activeNav2='Bundle'">
          Bundle
        </div>
      </div>
      <div class="check-box-list">
        <div class="check-item" @click="item.check = !item.check" v-for="(item,index) in checkArr" :key="index">
          <div class="check-icon-box">
            <div class="checked" v-show="item.check"></div>
          </div>
          <div class="name">
            {{ item.name }}
          </div>
        </div>

      </div>
        <div class="in-auction" v-show="activeNav1==1">
          <AuctionItem
              isAction="1"
              @showBid="showBid=true"
              v-for="(item,index) in actionData.auctions"
              v-show="item.nft.type==activeNav2
              && (!checkArr[0].check || isOwner(item))
              && (!checkArr[1].check || isEnd(item))"

              :nftObj="item" :key="index"/>
        </div>
        <div class="near-liquidation" v-show="activeNav1==2">
          <AuctionItem
              v-for="(item,index) in actionData.near_liquidation"
              v-show="item.nft.type==activeNav2
              && (!checkArr[0].check || isOwner(item))
              && (!checkArr[1].check || isEnd(item))"

              :nftObj="item"
              :key="index"/>
        </div>
    </div>
    <BidDialog v-show="showBid" @closeDialog="showBid=false"/>
  </div>
</template>

<script>
import AuctionItem from "@/views/AuctionView/components/AuctionItem";
import BidDialog from "@/views/AuctionView/components/BidDialog";
import {getAuctionsData} from "@/api/auctionApi";
import {mapGetters} from "vuex";

export default {
  name: "AuctionView",
  components: {AuctionItem, BidDialog},
  data() {
    return {
      actionData:{},
      activeNav1: 1,
      activeNav2: "Land",
      showBid: false,
      checkArr: [{name: "My NFT"}, {name: "Ended"}],

      nftList: [{
        name: "#5 Bundle",
        infoArr: [
          {name: "Collaterals Value", value: "3,595M", type: 1},
          {name: "Debt", value: "3,595M", type: 1},
          {name: "Healthy Factor", value: 1.2, type: 3},
        ],
        infoArr2: [
          {name: "Lasted Bid", value: "3,595M", type: 1},
          {name: "My Bid", value: "-- -- - - ", type: 1},
          {name: "Est. Available Loan Time", value: 188, type: 2},
        ],
        operateName: "Bid"
      }, {
        name: "#5 Bundle",
        infoArr: [
          {name: "Collaterals Value", value: "3,595M", type: 1},
          {name: "Debt", value: "3,595M", type: 1},
          {name: "Healthy Factor", value: 1.2, type: 3},
        ],
        infoArr2: [
          {name: "Offer Price", value: "3,595M", type: 1},
        ],
        operateName: "Buy"

      }],
      liqList: [{
        name: "#5 Bundle",
        infoArr: [
          {name: "Collaterals Value", value: "3,595M", type: 1},
          {name: "Debt", value: "3,595M", type: 1},
          {name: "Healthy Factor", value: 1.2, type: 3},
        ],
        infoArr2: [],
        operateName: "Notify Me"
      }, {
        name: "#5 Bundle",
        infoArr: [
          {name: "Collaterals Value", value: "3,595M", type: 1},
          {name: "Debt", value: "3,595M", type: 1},
          {name: "Healthy Factor", value: 1.2, type: 3},
        ],
        infoArr2: [
          {}
        ],
        operateName: "Notified"
      }],
    }
  },
  computed:{
    ...mapGetters(["account", "web3", "isConnected", "chainId","usdtDecimal"]),
  },
  watch:{
    isConnected(){
      this.getData()
    },
    account(){
      this.getData()
    }
  },
  methods:{
    isEnd(item){
      if(item.end_time <= 0){
        return true
      }
      return false
    },
    isOwner(item){
      if(item.toString().toLowerCase() == this.account.toString().toLowerCase()){
        return true
      }
      return false
    },
    async getData(){
      if(!this.isConnected){
        return
      }
      try{
        const res = await getAuctionsData()
        this.actionData = res.data.data
        console.log( this.actionData)

      }catch (e) {
        console.log(e)
      }
    }
  },
  created() {
    this.getData()
  }
}
</script>

<style lang="scss" scoped>
.action-content {
  width: var(--content-width);
  margin: 0 auto;
  padding-bottom: 70px;

  .nav-list {
    display: flex;
    margin: 30px 0;

    border-bottom: 1px solid #E2E2E2;

    .nav-item {
      font-size: 18px;
      font-family: RoBoto-Medium, Roboto;
      font-weight: 500;
      color: #333333;
      padding: 20px 26px;
      cursor: pointer;

      user-select: none;

      &.active {
        color: #FFC001;
        border-bottom: 1px solid #FFC600;
      }
    }
  }

  .nav-list2 {
    display: flex;

    .nav-item {
      min-width: 100px;
      height: 36px;
      line-height: 36px;
      text-align: center;
      cursor: pointer;
      user-select: none;
      background: #E2E2E2;
      border-radius: 30px;
      margin-right: 10px;
      font-family: RoBoto-Medium, Roboto;

      &.active {
        background: linear-gradient(225deg, #FFAB00 0%, #FFC600 100%);
        font-size: 14px;
        font-family: Roboto-Medium, Roboto;
        font-weight: 500;
        color: #333333;
      }


    }
  }

  .check-box-list {
    display: flex;
    margin-top: 30px;

    .check-item {
      display: flex;
      align-items: center;
      margin-right: 50px;
      user-select: none;
      cursor: pointer;

      .check-icon-box {
        margin-right: 10px;
        width: 26px;
        height: 26px;
        border-radius: 5px 5px 5px 5px;
        border: 1px solid #FFAD01;
        display: flex;
        justify-content: center;
        align-items: center;

        .checked {
          width: 20px;
          height: 20px;
          background: #FFAD01;
          border-radius: 3px 3px 3px 3px;
        }
      }
    }
  }
  @media screen and (max-width: 1000px) {
    .check-box-list{
      padding: 0 3vw;
      .check-item{
        margin: 0 20px 0 0px;
      }
    }
  }
}
</style>
