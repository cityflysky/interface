<template>
  <div class="MyNFTView">
    <TryBankerHeader/>
    <div class="mynft-box">
      <div class="title">
        My NFT
      </div>
      <div class="nav-list">
        <div class="nav-item" :class="{'active':activeNav==1}" @click="activeNav=1">
          Available (24)
        </div>
        <div class="nav-item" :class="{'active':activeNav==2}" @click="activeNav=2">
          Staking
        </div>
      </div>
      <div class="sub-nav">
        <div class="nav-item" :class="{'active':activeNav2==1}" @click="activeNav2=1">
          Land
        </div>
        <div class="nav-item" :class="{'active':activeNav2==2}" @click="activeNav2=2">
          Estate
        </div>
      </div>
      <div class="nav-btn-box">
        <div class="nav-item" :class="{'active':typeCheckObj.check1}" @click="typeCheckObj.check1=!typeCheckObj.check1">
          <img src="../../assets/svg/choosed.svg" alt="" class="icon">
          The Sandbox
        </div>
        <div class="nav-item" :class="{'active':typeCheckObj.check2}" @click="typeCheckObj.check2=!typeCheckObj.check2">
          <img src="../../assets/svg/choosed.svg" alt="" class="icon">
          Otherdeed
        </div>
        <div class="nav-item" :class="{'active':typeCheckObj.check3}" @click="typeCheckObj.check3=!typeCheckObj.check3">
          <img src="../../assets/svg/choosed.svg" alt="" class="icon">
          Decentraland
        </div>
      </div>
      <div class="nft-list">
        <div class="nft-item" v-for="i in 100" :key="i">
          <div class="nft">
            <img src="../../assets/images/position_logo1.webp" alt="" class="icon">
            <div class="name">
              Land (59,235){{ i }}
            </div>
            <div class="is-choose">
              <img class="icon" src="../../assets/svg/choosed.svg" alt="">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TryBankerHeader from "@/components/TryBankerHeader";

export default {
  name: "MyNFTView",
  components: {TryBankerHeader},
  data() {
    return {
      activeIndex: 1,
      activeNav: 1,
      activeNav2: 1,
      typeCheckObj: {},

    }
  }
}
</script>

<style lang="scss" scoped>
.MyNFTView {
  .mynft-box {
    width: var(--content-width);
    margin: 0 auto;
  }

  .nav-list {
    display: flex;
    margin: 30px 0;

    border-bottom: 1px solid #E2E2E2;

    .nav-item {
      font-size: 18px;
      font-family: Roboto-Medium, Roboto;
      font-weight: 500;
      color: #333333;
      padding: 20px 26px;
      cursor: pointer;

      &.active {
        color: #FFC001;
        border-bottom: 1px solid #FFC600;
      }
    }
  }

  .sub-nav {
    display: flex;
    margin: 30px 0;

    .nav-item {
      cursor: pointer;
      width: 150px;
      height: 60px;
      background: #E2E2E2;
      border-radius: 50px 50px 50px 50px;
      line-height: 60px;
      text-align: center;
      font-size: 18px;
      font-family: Roboto-Bold, Roboto;
      font-weight: bold;
      color: #613A00;
      margin-right: 10px;

      &.active {
        background: linear-gradient(225deg, #FFAB00 0%, #FFC600 100%);
      }
    }
  }

  .nav-btn-box {
    display: flex;

    .nav-item {
      width: 180px;
      height: 50px;
      background: #E2E2E2;
      border-radius: 50px 50px 50px 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 18px;
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
    margin-top: 30px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    background: #FFFFFF;
    box-shadow: 0px 5px 20px 5px rgba(0, 0, 0, 0.05);
    border-radius: 20px 20px 20px 20px;
    opacity: 1;
    border: 1px solid #E2E2E2;
    padding: 20px;

    .nft-item {
      margin-bottom: 10px;
      margin-right: 10px;
      width: 140px;
      background: #FFFFFF;
      border-radius: 10px 10px 10px 10px;
      border: 1px solid #FFAD01;
      padding: 10px;
      cursor: pointer;

      .nft {
        position: relative;

        .icon {
          width: 100%;
        }

        .name {
          width: 100%;
          font-size: 16px;
          font-family: Roboto-Medium, Roboto;
          font-weight: 500;
          color: #333333;
          margin: 15px 0 5px;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }

        .is-choose {
          position: absolute;
          right: 5px;
          top: 5px;
          width: 19px;
          height: 19px;
          border-radius: 100%;
          background: #FFFFFF;

          .icon {
            width: 20px;
            height: 20px;
            filter: drop-shadow(#FFC600 10000px -2px);
            transform: translateX(-10000px);
          }
        }
      }
    }
  }

  .title {
    font-size: 30px;
    font-family: Roboto-SemiBold, Roboto;
    font-weight: 600;
    color: #000000;
  }
}

@media screen and (max-width: 1000px) {
  .MyNFTView {
    .title{
      margin: 3vh 0 0 3vw;
      font-size: 6vw;
    }
    .sub-nav ,.nav-btn-box{
      .nav-item{
        width: 30vw;
        height: 10vw;
        line-height: 10vw;
        font-size: 3.4vw;
        white-space: nowrap;
        .icon{
          width: 20px;
          height: 20px;
        }
      }
    }
    .nft-list{
      .nft-item{
        width: 30%;
      }
    }
  }
}
</style>
