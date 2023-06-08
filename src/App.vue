<template>
  <div class="app-container">
    <router-view class="content"/>
    <TryBankerFooter/>
  </div>
</template>
<script>
import TryBankerFooter from "@/components/TryBankerFooter";
import addressMap from "@/abi/addressMap";
import {mapGetters} from "vuex"
export default {
  components:{TryBankerFooter},
  computed:{
    ...mapGetters(["account","isConnected","chainId"])
  },
  watch:{
    account(){
      this.getBalance()
    },
    isConnected(){
      this.getBalance()

    }
  },
  methods:{
    async getBalance(){
      if(this.$store.state.app.isConnected){
        let res = await this.$store.dispatch("erc20/balanceOf",{account:this.account,address:addressMap[this.chainId]["usdt"]})
        let decimal = await this.$store.dispatch("erc20/decimals",{address:addressMap[this.chainId]["usdt"]})
        this.$store.commit("app/SET_USDTDecimal", 10**decimal)
        this.$store.commit("app/SET_USDTBalance", res / 10**decimal )
      }
    }
  },
  beforeMount(){
    this.getBalance()
  }
}
</script>

<style lang="scss" scoped>
.app-container{
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: var(--app-bg);
  .content{
    flex-grow: 1;
  }
}
</style>
