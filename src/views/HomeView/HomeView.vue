<template>
  <div class="home">
    <HomeHeader/>
    <div class="home-container">
      <div class="home-content">
        <div class="header-list">
          <div class="list-item">
            <div class="name">
              NFT Staking
            </div>
            <div class="value">
              {{dealNum(homeData.status.nft_count)}}
            </div>
          </div>
          <div class="list-item">
            <div class="name">
              ETH Deposit
            </div>
            <div class="value">
              {{dealNum(homeData.status.eth)}}
            </div>
          </div>
          <div class="list-item">
            <div class="name">
              USDT Deposit
            </div>
            <div class="value">
              ${{dealNum(homeData.status.usd)}}
            </div>
          </div>
          <div class="list-item">
            <div class="name">
              Total Borrow
            </div>
            <div class="value">
              $ {{dealNum(homeData.status.borrow)}}
            </div>
          </div>
          <div class="list-item">
            <div class="name">
              Network
            </div>
            <div class="value icon-box">
              <img class="icon" src="../../assets/svg/ethereum.svg" alt="">
              <img class="icon" src="../../assets/svg/polygon.svg" alt="">
            </div>
          </div>
        </div>
        <div class="networks">
          <div class="networks-item" v-for="(networkObj,index) in homeData.networks" :key="index">
            <div class="sub-title">
              <img src="../../assets/svg/ethereum.svg" alt="" class="icon">
              {{ networkObj.name }} Chain
            </div>
            <div class="content-item">
              <div class="content-item-title">
                NFT Collections
              </div>
              <NFTDataList :dataObj="networkObj.nft_list"></NFTDataList>
            </div>
            <div class="content-item">
              <div class="content-item-title">
                Tokens
              </div>
              <TokenDataList :dataObj="networkObj.pool_list"></TokenDataList>
            </div>
          </div>
        </div>

        <div class="sub-title">
          Staking / Auction
        </div>
        <div class="stake-action">
          <div class="stake-box">
            <div class="top-content">
              <img class="icon" src="../../assets/images/stake_icon.webp" alt="">
              <div class="content">
                <div class="title">
                  NFT Staking
                </div>
                <div class="detail">
                  Is there a borrowing requirement for the ETH or USDT?
                  Get up to 64% loan for Staking NFT.
                </div>
              </div>
            </div>
            <div class="bottom-content">
              <div class="primary-btn-sha" @click="$router.push('/stake')">
                NFT staking
              </div>
              <div class="bottom-right">
                <img class="icon" src="../../assets/images/sandbox_icon.webp" alt="">
                <img class="icon" src="../../assets/images/otherdeed_icon.webp" alt="">
                <img class="icon" src="../../assets/images/mana_icon.webp" alt="">
              </div>
            </div>
          </div>
          <div class="auction-box">
            <div class="top-content">
              <img class="icon" src="../../assets/images/aution_icon.webp" alt="">
              <div class="content">
                <div class="title">
                  Auction
                </div>
                <div class="detail">
                  Are you looking for an NFT arbitration?
                  Auction of NFTs in liquidation, purchase NFTs below floor price and sell them for profit.
                </div>
              </div>
            </div>
            <div class="bottom-content">
              <div class="primary-btn-sha"  @click="$router.push('/auction')">
                Auction
              </div>
              <div class="bottom-right">
                <img class="icon" src="../../assets/images/au_1.webp" alt="">
                <img class="icon" src="../../assets/images/au_2.webp" alt="">
                <img class="icon" src="../../assets/images/au_3.webp" alt="">
              </div>
            </div>
          </div>
        </div>
        <div class="sub-title">
          Deposit
        </div>
        <div class="content-item">
          <div class="content-item-title">
            Deposit Earn passive income
          </div>
          <DepositList :chainRate1="chainRate1" :chainRate2="chainRate2" />
        </div>
        <div class="sub-title">
          Borrow
        </div>
        <div class="content-item">
          <div class="content-item-title">
            Staking NFT Release Value Liquidity
          </div>
          <BorrowList :chainRate1="chainRate1" :chainRate2="chainRate2" />
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import HomeHeader from "@/components/HomeHeader";
import TokenDataList from "@/views/HomeView/components/TokenDataList";
import NFTDataList from "@/views/HomeView/components/NFTDataList";
import DepositList from "@/views/HomeView/components/DepositList";
import BorrowList from "@/views/HomeView/components/BorrowList";
import {getLendingData, getMainData} from "@/api/homeApi";
import bigNumberUtil from "@/utils/bigNumberUtil";
const calculator = new bigNumberUtil();

export default {
  name: 'HomeView',
  components: {
    HomeHeader,
    NFTDataList,
    TokenDataList,
    DepositList,
    BorrowList
  },
  data(){
    return {
      dealNum:calculator.dealNum,
      homeData:{
        status:{
          eth:0
        },
        networks:{}
      },
      chainRate1:{},
      chainRate2:{}
    }
  },
  async created() {
    let res = await getMainData()
    this.homeData = res.data.data
    let list1 = await getLendingData(1, this.account)
    let list2 = await getLendingData(2, this.account)
    this.chainRate1 = list1.data.data
    this.chainRate2 = list2.data.data

  }
}
</script>
<style lang="scss" scoped>
@import "@/assets/style/mixin.scss";

.home {

  .home-container {
    position: relative;
    margin-top: -20px;
    margin-bottom: -20px;
    border-radius: 20px;
    padding-top: 40px;
    padding-bottom: 70px;
    z-index: 1;
    @include bg_color($background-color-theme);

    .home-content {
      width: var(--content-width);
      margin: 0 auto;

      .header-list {
        display: flex;
        justify-content: space-between;

        .list-item {
          padding: 36px 30px;
          width: 18%;
          background: #FFFFFF;
          box-shadow: 0px 5px 20px 5px rgba(0, 0, 0, 0.05);
          border-radius: 20px 20px 20px 20px;
          border: 1px solid #E2E2E2;

          .name {
            font-size: 14px;
            font-family: Roboto-Medium, Roboto;
            font-weight: 500;
            color: #999999;
          }

          .value {
            margin-top: 20px;
            font-size: 18px;
            font-family: Roboto-Black, Roboto;
            font-weight: 900;
            line-height: 35px;
            background: linear-gradient(225deg, #FFAB00 0%, #FFC600 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }

          .icon-box {
            display: flex;

            .icon {
              margin-right: 10px;
              width: 35px;
              height: 35px;
            }
          }
        }
      }

      .sub-title {
        font-size: 28px;
        font-family: Roboto-SemiBold, Roboto;
        font-weight: 600;
        color: #000000;
        line-height: 35px;
        margin-top: 60px;
        margin-bottom: 30px;
        display: flex;
        align-items: center;
        .icon{
          margin-right: 10px;
          width: 30px;
          height: 30px;
        }
      }
    }

    .content-item {
      box-shadow: 0px 5px 20px 5px rgba(0, 0, 0, 0.05);
      border-radius: 20px 20px 20px 20px;
      opacity: 1;
      padding: 40px 0;
      background: #fff;
      margin-top: 30px;

      &:nth-child(1) {
        margin-top: 0;
      }

      .content-item-title {
        font-size: 20px;
        font-family: Roboto-SemiBold, Roboto;
        font-weight: 600;
        color: #000000;
        padding-left: 50px;
      }

    }

    .stake-action {
      display: flex;
      justify-content: space-between;

      .stake-box, .auction-box {
        background: url("../../assets/images/stake_bg.webp");
        background-size: 100% 100%;
        color: #fff;
        padding: 45px;
        width: 48%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .top-content {
          display: flex;

          .icon {
            width: 60px;
            height: 60px;
            margin-right: 30px;
          }

          .title {
            font-size: 24px;
            font-family: Roboto-SemiBold, Roboto;
            font-weight: 600;
            color: #FFFFFF;
            margin-bottom: 20px;
            line-height: 28px;
          }

          .detail {
            color: rgba(255, 255, 255, 0.49);
          }
        }

        .bottom-content {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;

          .primary-btn-sha {
            max-width: 180px;
            height: 50px;
            line-height: 50px;
            width: 16vw;
            white-space: nowrap;
            font-family: Roboto-Bold, Roboto;
            font-weight: bold;
            color: #613A00!important;
            font-size: 15px;
            &:active {
              transform: translate(3px, 3px);
            }

          }

          .bottom-right {
            display: flex;

            .icon {
              user-select: none;
              width: 50px;
              height: 50px;
              margin-right: 20px;

              &:last-child {
                margin-right: 0;
              }
            }
          }
        }
      }

      .auction-box {
        .bottom-content {
          .primary-btn-sha {
            margin-top: -10px;
          }

          .bottom-right {
            .icon {
              width: 80px;
              height: 120px;
              margin-right: 0px;
            }
          }
        }
      }
    }
  }

  @media screen and (max-width: 1000px) {
    .home-container {
      .home-content {
        .header-list {
          flex-wrap: wrap;

          .list-item {
            width: 48%;
            padding: 2vh 30px;
            margin-top: 2vh;
            .value{
              margin-top: 2vh;
            }
            .icon-box{
              .icon{
              }
            }
          }
        }
        .sub-title{
          font-size: 6vw;
          .icon{
            width: 6vw;
            height: 6vw;
          }
        }
        .content-item{
          padding: 3vh 0;
          .content-item-title{
            padding-left: 5vw;
            font-size: 4vw;
            border-bottom: 1px solid #EAEAEA;
            padding-bottom: 3vh;
          }
        }

        .stake-action {
          display: block;
          .auction-box{
            margin-top: 3vh;
          }
          .stake-box, .auction-box {
            width: 100%;
            padding: 5vh 5vw;
            .top-content{
              .icon{
                width: 10vw;
                height:10vw;
              }
              .content{
                .title{
                  font-size: 6vw;
                }
                .detail{
                  font-size: 3.4vw;
                }
              }
            }

            .bottom-content{
              margin-top: 3vh;
              .primary-btn-sha{
                  width: 30vw;
                  height: 6vh;
                line-height: 6vh;
              }
              .bottom-right{
                .icon{
                  width: 10vw;
                  height: 10vw;
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
