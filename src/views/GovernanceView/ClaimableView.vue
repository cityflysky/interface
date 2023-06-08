<template>
  <div class="ClaimableView">
    <ClaimDialog v-show="showClaim" @closeDialog="showClaim=false"/>
    <div class="info-list">
      <div class="info-item">
        <div class="name">
          Claimable
        </div>
        <div class="value-box">
          <img src="../../assets/images/coin-logo.webp" alt="" class="icon">
          <strong>3,595</strong>
        </div>
        <div class="bottom">
          TBC ready to be claimed
        </div>
      </div>
      <div class="info-item">
        <div class="name">
          Awaiting Processing
        </div>
        <div class="value-box">
          <img src="../../assets/images/coin-logo.webp" alt="" class="icon">
          <strong>3,595</strong>
        </div>
        <div class="bottom">
          TBC to be delivered
        </div>
      </div>
      <div class="info-item">
        <div class="name">
          Claim
        </div>
        <div class="detail">
          Token can be claimed including investment or participation in product acquisition of Token.Available TBC will
          be delivered to your wallet address.
        </div>
        <div class="primary-btn-sha" @click="showClaim=true">
          Claim Rewards
        </div>
      </div>
    </div>
    <div class="title">
      Events
    </div>
    <div class="events-list">
      <div class="list-header">
        <div class="col">
          Status
        </div>
        <div class="col">
          Event
        </div>
        <div class="col">
          Amount
        </div>
      </div>
      <div class="list-item" v-for="(item,index) in eventList" :key="index">
        <div class="col">
          <div class="time">
            <img src="../../assets/images/event_status_active.webp" v-if="item.status==2" alt="" class="icon">
            <img src="../../assets/images/event_status_on.webp" v-if="item.status==1" alt="" class="icon">
            {{ item.time }}
          </div>
        </div>
        <div class="col">
          Delivered TBC from participation
        </div>
        <div class="col">
          <img src="../../assets/images/coin-logo.webp" alt="" class="icon">
          0.0000 TBC
        </div>
      </div>
    </div>
    <div class="events-list-m">
      <div class="list-item" v-for="(item,index) in eventList" :key="index">
        <div class="row">
          <div class="time">
            <img src="../../assets/images/event_status_active.webp" v-if="item.status==2" alt="" class="icon">
            <img src="../../assets/images/event_status_on.webp" v-if="item.status==1" alt="" class="icon">
            {{ item.time }}
          </div>
        </div>
        <div class="row flex-box">
          Delivered TBC from participation
          <div class="col">
            <img src="../../assets/images/coin-logo.webp" alt="" class="icon">
            0.0000 TBC
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import ClaimDialog from "@/views/GovernanceView/components/ClaimDialog";

export default {
  name: "ClaimableView",
  components: {ClaimDialog},
  data() {
    return {
      showClaim: false,
      eventList: [{
        time: "May.20,2023 12:00pm",
        status: 1,
        name: "Claim TBC",
        amount: "0.0000"
      }, {
        time: "May.20,2023 12:00pm",
        status: 2,
        name: "Delivered TBC from Staking",
        amount: "0.0000"
      }, {
        time: "May.20,2023 12:00pm",
        status: 1,
        name: "Delivered TBC from participation",
        amount: "0.0000"
      }]
    }
  }
}
</script>

<style lang="scss" scoped>
.ClaimableView {
  .info-list {
    display: flex;
    justify-content: space-between;

    .info-item {
      width: 32%;
      background: #FFFFFF;
      box-shadow: 0px 5px 20px 5px rgba(0, 0, 0, 0.05);
      border-radius: 20px 20px 20px 20px;
      border: 1px solid #E2E2E2;
      padding: 30px 20px;

      .name {
        font-size: 18px;
        font-family: Roboto-Medium, Roboto;
        font-weight: 500;
      }

      .value-box {
        margin: 30px 0 40px 0;
        display: flex;
        align-items: center;

        .icon {
          width: 30px;
          height: 30px;
        }

        strong {
          font-family: Roboto-Black, Roboto;
          font-weight: 900;
          line-height: 35px;
          color: #FFAB00;
          font-size: 26px;
          margin-left: 10px;
        }
      }

      .bottom {
        font-size: 15px;
        font-family: Roboto-Medium, Roboto;
        font-weight: 500;
        color: #999999;
      }

      .detail {
        margin: 15px 0;
        font-size: 12px;
        font-family: Roboto-Regular, Roboto;
        font-weight: 400;
      }

      .primary-btn-sha {
        font-family: RussoOneRegular, Russo One;
      }
    }
  }

  .title {
    font-size: 30px;
    font-family: Roboto-SemiBold, Roboto;
    font-weight: 600;
    color: #000000;
    line-height: 35px;
    margin: 40px 0 22px 0;
  }
  .events-list-m{
    display: none;
  }
  .events-list {
    width: 100%;
    background: #FFFFFF;
    box-shadow: 0px 4px 15px 4px rgba(0, 0, 0, 0.05);
    border-radius: 15px 15px 15px 15px;
    opacity: 1;
    border: 1px solid #E2E2E2;

    .col {
      &:nth-child(1) {
        width: 30%;
      }

      &:nth-child(2) {
        width: 45%;
      }
    }

    .list-header {
      width: 100%;
      display: flex;
      padding: 20px 40px;
      border-bottom: 1px solid #E2E2E2;

      .col {
        font-size: 12px;
        font-family: Roboto-SemiBold, Roboto;
        font-weight: 600;
        color: #999999;
      }
    }

    .list-item {
      padding: 25px 20px;
      margin: 0 20px;
      border-bottom: 1px solid #E2E2E2;

      &:last-child {
        border-bottom: none;
      }

      display: flex;
      align-items: center;
      font-size: 14px;
      font-family: Roboto-Medium, Roboto;
      font-weight: 500;
      color: #333333;

      .icon {
        width: 20px;
        height: 20px;
        margin-right: 10px;
      }

    }
  }

  @media screen and (max-width: 1000px) {
    .info-list {
      display: block;
      .info-item{
        width: 100%;
        margin-bottom: 3vh;
      }
    }
    .events-list{
      display: none;
    }
    .events-list-m{
      display: block;
      background: #FFFFFF;
      box-shadow: 0px 4px 15px 4px rgba(0, 0, 0, 0.05);
      border-radius: 15px 15px 15px 15px;
      opacity: 1;
      border: 1px solid #E2E2E2;

      .list-item {
        padding: 3vh 3vw;
        margin: 0 20px;
        border-bottom: 1px solid #E2E2E2;
        .row{
          display: flex;
          align-items: center;
        }
        .flex-box{
          margin-top: 2vh;
          justify-content: space-between;
          font-family: Roboto-Bold, Roboto;
          font-weight: bold;
          font-size: 3.8vw;
        }
        &:last-child {
          border-bottom: none;
        }
        .icon {
          width: 20px;
          height: 20px;
          margin-right: 10px;
        }

      }

    }
  }
}
</style>
