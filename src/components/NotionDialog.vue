<template>
  <div class="NotionDialog">
    <div class="header">
      <div class="name">
        Auction
      </div>
      <div class="right">
        All Read
      </div>
    </div>
    <div class="notion-list">
      <div class="notion" v-for="(item,index) in notionList" :key="index">
        <div class="notion-header">
          <div class="circle"></div>
          <div class="title">
            {{ item.title }}
          </div>
        </div>
        <div class="notion-content">
          {{ item.content }}
        </div>
        <div class="time">
          {{ item.time }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NotionDialog",
  data() {
    return {
      notionList: [
        {
          title: "NFT Liquidation Warning",
          content: "Your NFT Healthy Factor has below the warning line, please pay back in time.",
          time: "May 2, 2023, 9:57 AM"
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.NotionDialog {
  color: #111;
  padding: 20px 5%;

  .header {
    display: flex;
    justify-content: space-between;
    padding-bottom: 10px;

    .right {
      color: #999999;
    }
  }

  .notion-list {
    .notion {
      width: 100%;
      padding: 10px;
      border-radius: 15px 15px 15px 15px;
      border: 1px solid #EAEAEA;

      .notion-header {
        display: flex;
        align-items: center;

        .circle {
          width: 10px;
          height: 10px;
          background: #FF5963;
          margin-right: 10px;
          border-radius: 50%;
        }
      }

      .notion-content {
        font-size: 14px;
        font-family: Roboto-Regular, Roboto;
        font-weight: 400;
        color: #BBBBBB;
        text-align: left;
        line-height: 18px;
      }

      .time {
        font-size: 14px;
        font-family: Roboto-Regular, Roboto;
        font-weight: 400;
        color: #BBBBBB;
        text-align: left;
      }
    }
  }
}

@media screen and (max-width: 1000px) {
  .NotionDialog {
    width: 66vw;
    height:100vh;
    border-radius: 0;
    .notion{

    }

  }
}
</style>
