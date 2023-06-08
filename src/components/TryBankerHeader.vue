<template>
  <div class="TryBankerHeader">
    <MNav v-show="showMNav" @closeDialog="showMNav=false"/>
    <div class="header-content pc">
      <img alt="logo" class="logo" @click="$router.push('/')" src="../assets/images/logo.webp">
      <div class="nav-list">
        <div class="nav-item" :class="{'active':$route.path=='/'}" @click="$router.push('/')">
          Home
        </div>
        <div class="nav-item" :class="{'active':$route.path=='/stake'}" @click="$router.push('/stake')">
          Staking
        </div>
        <div class="nav-item" :class="{'active':$route.path=='/lend'}" @click="$router.push('/lend')">
          Lending
        </div>
        <div class="nav-item" :class="{'active':$route.path=='/auction'}" @click="$router.push('/auction')">
          Auction
        </div>
        <div class="nav-item" :class="{'active':$route.path=='/governance'}" @click="$router.push('/governance')">
          Governance
        </div>
      </div>
      <div class="right-part">
        <div class="lng-btn normal-btn" @click="isShowLng=true">
          <img class="icon" src="../assets/images/english_icon.webp" alt="">
          English
          <div class="lng-dialog" v-show="isShowLng">
            <div class="mask" @click.stop="isShowLng=false"></div>
            <div class="dialog-content animate__fadeIn animate__animated ">
              <div class="lng-item" @click.stop="isShowLng=false">
                <img class="icon" src="../assets/images/english_icon.webp" alt="">
                English
              </div>
              <div class="lng-item" @click.stop="isShowLng=false">
                <img class="icon" src="../assets/images/english_icon.webp" alt="">
                English
              </div>
              <div class="lng-item" @click.stop="isShowLng=false">
                <img class="icon" src="../assets/images/english_icon.webp" alt="">
                English
              </div>
            </div>
          </div>
        </div>
        <Wallet/>
        <div class="person-icon normal-btn" @click="$router.push('/mynft')">
          <img class="icon" src="../assets/images/person_icon.webp" alt="">
        </div>
        <div class="notion-icon normal-btn" @click="showNotion=true">
          <img class="icon" src="../assets/images/notion_icon.webp" alt="">
          <div class="notion-dialog animate__animated sha" v-show="showNotion">
            <div class="dialog-mask" @click.stop="showNotion=false"></div>
            <div class="dialog-content">
              <NotionDialog/>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="header-content-m">
      <img alt="logo" class="logo" @click="$router.push('/')" src="../assets/images/logo.webp">
      <div class="right">
        <div class="notion-icon normal-btn" @click="isMWalletModal=true">
          <img class="icon" src="../assets/svg/wallet.svg" alt="">
        </div>
        <div class="person-icon normal-btn" @click="$router.push('/mynft')">
          <img class="icon" src="../assets/images/person_icon.webp" alt="">
        </div>
        <div class="notion-icon normal-btn" @click="showMNotion=true">
          <img class="icon" src="../assets/images/notion_icon.webp" alt="">
        </div>
        <img @click="showMNav=true" class="menu icon" src="../assets/svg/menu.svg" alt="">
      </div>
    </div>
    <Popup
        round
        position="bottom" v-model:show="isMWalletModal" class="">
      <WalletDialog/>
    </Popup>
    <Popup
        position="right" v-model:show="showMNotion" class="notion-m">
      <NotionDialog/>
    </Popup>
  </div>
</template>

<script>
import {Popup} from "vant"
import Wallet from "@/components/Wallet";
import MNav from "@/components/MNav";
import WalletDialog from "@/components/WalletDialog";
import NotionDialog from "@/components/NotionDialog";

export default {
  name: "TryBankerHeader",
  components: {Wallet, MNav, Popup, WalletDialog, NotionDialog, },
  data() {
    return {
      showMNav: false,
      showNotion: false,
      showMNotion: false,
      activeNav: 1,
      isShowLng: false,
      isMWalletModal: false,
      showSign:false,
    }
  },
  mounted(){

  }
}
</script>

<style lang="scss" scoped>
.TryBankerHeader {
  width: 100vw;
  background: #2D2A27;
  color: #fff;


  .lng-dialog {
    z-index: 10;
    position: absolute;
    top: 50px;
    left: -40px;

    .mask {
      position: fixed;
      width: 100vw;
      height: 100vh;
      left: 0;
      top: 0;
      z-index: -1;
    }

    .dialog-content {
      z-index: 1;
      width: 210px;
      background: #FFFFFF;
      box-shadow: 0px 5px 20px 5px rgba(0, 0, 0, 0.05);
      border-radius: 20px 20px 20px 20px;
      opacity: 1;
      border: 1px solid #E2E2E2;

      .lng-item {
        color: #000;
        display: flex;
        border-radius: 15px 15px 15px 15px;
        border: 1px solid #EAEAEA;
        align-items: center;
        padding: 10px;
        margin: 5px 10px;

        .icon {
          width: 30px;
          height: 30px;
        }

      }
    }
  }

  .header-content {
    width: var(--content-width);
    margin: 0 auto;
    display: flex;
    align-items: center;
    padding: 30px 0;
    justify-content: space-between;
    user-select: none;

    .logo {
      width: 130px;
      height: 40px;
    }

    .nav-list {
      display: flex;

      .nav-item {
        min-width: 80px;
        width: 6vw;
        height: 36px;
        line-height: 36px;
        text-align: center;
        cursor: pointer;
        user-select: none;

        &.active {
          background: linear-gradient(225deg, #FFAB00 0%, #FFC600 100%);
          border-radius: 30px 30px 30px 30px;
          opacity: 1;
          font-size: 14px;
          font-family: Roboto-Medium, Roboto;
          font-weight: 500;
          color: #333333;
        }


      }
    }

    .right-part {
      display: flex;
      align-items: center;

    }

    .lng-btn {
      margin-right: 10px;
      display: flex;
      align-items: center;
      position: relative;

      .icon {
        width: 20px;
        height: 20px;
        margin-right: 10px;
      }
    }

    .notion-icon, .person-icon {
      margin-left: 10px;
      text-align: center;
      width: 36px;
      height: 36px;
      padding: 0;
      line-height: 40px;
      position: relative;

      .notion-dialog {
        position: absolute;
        top: 70px;
        left: -160px;
        z-index: 10;

        .dialog-mask {
          position: fixed;
          z-index: 0;
          width: 100vw;
          height: 100vh;
          left: 0;
          top: 0;
        }

        .dialog-content {
          width: 320px;
          background: #fff;
          box-shadow: 0px 5px 20px 5px rgba(0, 0, 0, 0.05);
          border-radius: 20px 20px 20px 20px;
          border: 1px solid #E2E2E2;
        }
      }

      .icon {
        width: 16px;
        height: 16px;
      }
    }

    .wallet {

    }
  }

  .header-content-m {
    display: none;
    justify-content: space-between;
    align-items: center;
    user-select: none;
    padding: 20px 30px;

    .logo {
      width: 24vw;
      height: auto;
    }

    .right {
      display: flex;
      align-items: center;

    }

    .menu {
      width: 30px;
      height: 30px;
      margin-left: 10px;
    }

    .notion-icon, .person-icon {
      margin-left: 10px;
      text-align: center;
      width: 36px;
      height: 36px;
      padding: 0;
      line-height: 40px;

      .icon {
        width: 16px;
        height: 16px;
      }
    }
  }

  @media screen and (max-width: 1000px) {
    .notion-m {
      height: 100%;
      border-radius: 0;
    }
    .pc {
      display: none;
    }
    .header-content-m {
      display: flex;
    }
  }
}
</style>
