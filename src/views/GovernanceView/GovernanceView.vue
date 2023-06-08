<template>
  <div class="GovernanceView">
    <TryBankerHeader/>
    <div class="governance-content">
      <div class="title">
        Governance
      </div>
      <div class="nav-list">
        <div class="nav-item" :class="{'active':activeNav1==3}" @click="activeNav1=3">
          TBC Claim
        </div>
        <div class="nav-item" :class="{'active':activeNav1==1}" @click="activeNav1=1">
          TBC Staking
        </div>
        <div class="nav-item" :class="{'active':activeNav1==2}" @click="activeNav1=2">
          Proposal
        </div>
      </div>
      <StakeView v-show="activeNav1==1"/>
      <ProposalView v-show="activeNav1==2"/>
      <ClaimableView v-show="activeNav1==3"/>
    </div>
  </div>
</template>

<script>
import StakeView from "@/views/GovernanceView/StakeView";
import ProposalView from "@/views/GovernanceView/ProposalView";
import ClaimableView from "@/views/GovernanceView/ClaimableView";

export default {
  name: "GovernanceView",
  components: {StakeView, ProposalView, ClaimableView},
  data() {
    return {
      activeNav1: 3
    }
  }
}
</script>

<style lang="scss" scoped>
.GovernanceView {
  .governance-content {
    width: var(--content-width);
    margin: 0 auto;
    padding: 50px 0 100px;
  }

  .title {
    font-size: 28px;
    font-family: Roboto-SemiBold, Roboto;
    font-weight: 600;
    color: #000000;
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

  @media screen and (max-width: 1000px) {
    .title{
      font-size: 6vw;
    }
    .nav-list{
      margin-top: 0;
      .nav-item{
        padding: 2vh 3vw;
      }
    }
  }
}
</style>
