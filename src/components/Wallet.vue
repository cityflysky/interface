<template>
  <div class="connectWallet">
    <button class="normal-btn connect-btn">
      <div class="left-part" @click="showChooseChain=true">
        <div class="connected">
          <img class="icon" src="../assets/images/eth_icon.webp" alt="">
          Ethereum
        </div>
        <div class="dot" :class="{'active':isConnected}"></div>

      </div>
      <span class="right-part" @click="isWalletModal=true">
              <span class="line"></span>
        <img class="icon" src="../assets/images/wallet.webp" alt=""/>
      </span>
      <div class="choose-chain-dialog" v-show="showChooseChain">
        <div class="mask" @click.stop="showChooseChain=false"></div>
        <div class="dialog-content">
          <div class="chain-item" @click="switchNetwork('0xaa36a7')">
            <div class="icon-box">
              <img src="../assets/svg/ethereum.svg" alt="" class="icon">
            </div>
            Ethereum
            <img src="../assets/svg/choosed.svg" alt="" class="choosed">
          </div>
          <div class="chain-item" @click="switchNetwork('0x89')">
            <div class="icon-box">
              <img src="../assets/svg/matic.svg" alt="" class="icon">
            </div>
            Polygon
            <img src="../assets/svg/choosed.svg" alt="" class="choosed">
          </div>
        </div>
      </div>
      <div class="connect-modal-dialog">
        <WalletDialog
            @updateData="getEmail"
            :curEmail="curEmail" ref="wallet" v-show="isWalletModal" @closeDialog="isWalletModal=false"/>
      </div>
    </button>
    <SignDialog @closeDialog="showSign=false" v-show="showSign"/>

  </div>
</template>

<script>

import {mapGetters} from "vuex"
import {Network} from '@/config/constants';
import detectEthereumProvider from '@metamask/detect-provider';
import WalletDialog from "@/components/WalletDialog";
import SignDialog from "@/components/SignDialog";
import {message} from "ant-design-vue";
import {getPersonInfo} from "@/api/common";

export default {
  name: "ConnectWallet",
  components: {WalletDialog, SignDialog},
  data() {
    return {
      curEmail:undefined,
      connectedLoading: false,
      networkObj: Network,
      curChain: "",
      connectIdx: 0,
      connectArr: ['', 'MetaMask', 'WalletConnect', 'Fortmatic'],
      isWalletModal: false,
      wrongNetWork: false,
      showChooseChain: false,
      showSign: false,
    }
  },
  computed: {
    ...mapGetters([
      'isConnected',
      'account',
      'currentTheme',
      'isSign'
    ]),
    chainId() {
      return this.$store.state.app.chainId
    },
    showAccount() {
      return this.account.substring(0, 6) + '...' + this.account.substring(38, 42);
    },
    onConnecting(){
      return this.$store.state.app.onConnecting
    }
  },

  watch: {
    onConnecting(val){
      console.log(val)
      if (this.$route.path != '/' &&!this.isConnected &&!val) {
        message.info("Please connect wallet")
        this.isWalletModal = true
      }
    },
    account(){
      this.getEmail()
    }
  },
  async created(){
    this.getEmail()
    if (this.$route.path != '/' &&!this.isConnected  &&!this.onConnecting) {
      message.info("Please connect wallet")
      this.isWalletModal = true
    }
  },
  mounted() {
    setTimeout(()=>{
      detectEthereumProvider()
          .then(async (provider) => {
            if (!provider) {
              console.log("noe provider")
              message.info('Install MetaMask first!');
              return;
            } else {
              // console.log(provider._state ,provider._state && provider._state.accounts[0])
              if(provider._state && provider._state.accounts[0] && this.$refs["wallet"]){
                this.$refs["wallet"].handleConnect()
              }else{
                this.$store.commit("app/SET_ONCONNECTING", false)
              }

            }
          })
    },1000)

    const chain = localStorage.getItem('curChain')
    if (chain && chain.length > 0) {
      this.curChain = chain
    }
  },
  methods: {
    async getEmail(){
      if(!this.account){
        return
      }
      const info = await getPersonInfo(this.account)

      if(info.data.data){
        this.curEmail = info.data.data.email
      }
    },
    async switchNetwork(value) {
      try {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{chainId: value}],
        });

        await this.$refs["wallet"].registerWeb3()
        if (this.isConnected && !this.isSign) {
          this.showSign = true
        }
        this.showChooseChain = false

      } catch (switchError) {
        // This error code indicates that the chain has not been added to MetaMask.
        try {
          console.log(this.networkObj[value])
          let paramsArry = [
            {
              chainId: this.networkObj[value].chainId,
              chainName: this.networkObj[value].chainName,
              rpcUrls: this.networkObj[value].rpcUrls,
              nativeCurrency: this.networkObj[value].nativeCurrency,
              blockExplorerUrls: this.networkObj[value].blockExplorerUrls ? this.networkObj[value].blockExplorerUrls : null,
            },
          ];
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: paramsArry,
          });

          await this.$refs["wallet"].registerWeb3()
        } catch (addError) {
          console.log({addError});
        }
        this.showChooseChain = false

      }
    },

    disConnect() {
      if (this.connectIdx != 1) {
        if (this.provider) this.provider.disconnect()
      }
      this.$store.commit("app/SET_ACCOUNT", "")
      this.$store.commit("app/SET_ISCONNECT", false)
      this.$store.commit("app/SET_Balance", 0)
      this.$store.commit("app/SET_Web3", null)
    }
  },
}
</script>

<style lang="scss" scoped>

.connect-modal-dialog, .choose-chain-dialog {
  position: absolute;
  left: -70px;
  top: 50px;
  z-index: 10;

  .mask {
    position: fixed;
    width: 100vw;
    height: 100vh;
    left: 0;
    top: 0;
    z-index: -1;
  }

  .dialog-content {
    width: 320px;
    background: #FFFFFF;
    box-shadow: 0px 5px 20px 5px rgba(0, 0, 0, 0.05);
    border-radius: 20px 20px 20px 20px;
    opacity: 1;
    border: 1px solid #E2E2E2;
    padding: 20px 20px 40px;
    z-index: 10;

    .connect-mask {
      padding: 6px;
      border-radius: 15px;
      border: 1px solid #EAEAEA;
      position: relative;

      .logout {
        position: absolute;
        color: #999;
        top: 100px;
        left: calc(50% - 20px);
      }

      .logo {
        width: 70px;
        height: 70px;
      }

      font-family: Roboto-Medium, Roboto;
      display: flex;
      align-items: center;

      .connect-mask-content {
        .name {
          font-size: 16px;
          font-weight: 500;
          text-align: left;
          color: #000000;
          line-height: 19px;
        }

        .address {
          margin-top: 10px;
          font-weight: 500;
          color: #999999;
        }
      }
    }

    .email-box {
      padding: 10px;
      margin-top: 60px;
      border-radius: 15px;
      border: 1px solid #EAEAEA;

      .input-box {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .icon {
          width: 60px;
          height: 60px;
          margin-right: 10px;
        }

        input {
          width: 200px;
          height: 40px;
          background: #EAEAEA;
          border-radius: 10px 10px 10px 10px;
          opacity: 1;
          border: none;
          padding: 0 10px;

          &::placeholder {
            color: #C3C3C3;
          }
        }

      }

      .primary-btn {
        margin-top: 15px;
        border-radius: 10px;
        width: 100%;
        font-size: 14px;

      }
    }

    .balance-box {
      width: 100%;

      .balance-title {
        font-size: 16px;
        color: #999999;
        margin: 30px 0 20px;
        text-align: left;
      }

      .balance-list {
        color: #000;

        .balance {


          align-items: center;
          display: flex;
          justify-content: space-between;
          font-family: Roboto-SemiBold, Roboto;

          &:last-child {
            margin-top: 10px;
          }

          .name {
            display: flex;
            align-items: center;

            .icon {
              width: 23px;
              margin-right: 10px;
            }
          }

        }
      }
    }
  }
}

.choose-chain-dialog {
  .dialog-content {
    width: 320px;
    padding: 10px;

    .chain-item {
      width: 100%;
      border-radius: 15px 15px 15px 15px;
      opacity: 1;
      border: 1px solid #EAEAEA;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      font-size: 16px;
      font-family: Roboto-Medium, Roboto;
      font-weight: 500;
      color: #000000;
      padding: 20px;

      &:nth-child(2) {
        margin-top: 6px;
      }

      .icon-box {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0px 0px 10px #eee;
        margin-right: 10px;

        .icon {
          width: 20px;
          height: 20px;
        }
      }

    }
  }
}

.connectWallet {
  .connect-btn {
    width: 190px;
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
    line-height: 16px;
    padding: 0 10px;

    .left-part {
      width: 60%;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .icon {
        width: 20px;
        height: 20px;
      }

      .dot {
        width: 8px;
        height: 8px;
        background: #D8D8D8;
        border-radius: 50%;

        &.active {
          background: #52DF9B;
        }
      }
    }

    .right-part {
      display: flex;
      align-items: center;
      position: relative;
      padding-left: 20px;

      .icon {
        width: 20px;
        height: 20px;
      }

      .line {
        left: 0;
        top: 0;
        position: absolute;
        height: 100%;
        width: 1px;
        background: rgba(255, 255, 255, 0.5);
      }

    }


  }

}
</style>
