<template>
  <div class="HomeHeader">
    <TryBankerHeader class="header"/>
    <div class="header-content">
      <div class="left">
        <div class="title-box">
          Unlock Your<br/>
          Estate's Value<br/>
          with <span> NFT</span><br/>
          Mortgage Lending
        </div>
        <div class="tip">
          - The Future of Real Estate Financing
        </div>
        <button class="primary-btn-sha"  @click="$router.push('/stake')">
          Staking
        </button>
      </div>
      <div class="right swiper">
        <swiper
            :initial-slide="1"
            :effect="'overflow'"
            :coverflow-effect="'coverflowEffect'"
            :pagination="{ clickable: true }"
            :scrollbar="{ draggable: true }"
            :slides-per-view="4"
            :space-between="-100"
            :centered-slides="true"
            :autoplay="true"
            :modules="modules"
            @slideChange="onSlideChange"
            @swiper="onSwiper"
            class="mySwiper">
          <swiper-slide>
            <div class="img-box">
              <img src="../assets/images/img_1.webp" alt="">
            </div>
          </swiper-slide>
          <swiper-slide>
            <img src="../assets/images/img_2.webp" alt="">
          </swiper-slide>
          <swiper-slide>
            <img src="../assets/images/img_3.webp" alt="">
          </swiper-slide>
          <swiper-slide>
            <img src="../assets/images/img_4.webp" alt="">
          </swiper-slide>

        </swiper>
      </div>
      <button class="primary-btn-sha m-btn"  @click="$router.push('/stake')">
        Staking
      </button>
    </div>
  </div>
</template>

<script>
import {Swiper, SwiperSlide} from "swiper/vue";
import {Pagination, Autoplay} from "swiper";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";

export default {
  name: "HomeHeader",
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    const onSwiper = () => {
      };
    const onSlideChange = () => {
    };
    return {
      onSwiper,
      onSlideChange,
      modules: [Pagination, Autoplay],
    };
  },
}
</script>

<style lang="scss" scoped>

.HomeHeader {
  position: relative;
  color: #fff;
  background: url("../assets/images/banner.webp");
  background-size: 100% 100%;
  height: 50vw;
  min-height: 600px;
  .header{
    background: none!important;
  }
  .header-content {
     width: var(--content-width);
    margin: 0 auto;
    display: flex;
    padding-top: 12vh;

    .left {
      width: 40vw;

      .title-box {
        font-size: 3vw;
        font-family: RussoOneRegular, Russo One, sans-serif;
        font-weight: 400;
        color: #FFFFFF;
        line-height: 4vw;

        span {
          color: #FFC600;
        }
      }

      .tip {
        margin-top: 40px;
        font-size: 1.6vw;
        font-family: Roboto-Medium, Roboto;
        font-weight: 500;
        color: #FFFFFF;
        line-height: 30px;
      }

      .primary-btn-sha {
        margin-top: 40px;
        width: 200px;
        height: 55px;
        line-height: 55px;

        font-family: RussoOneRegular, Russo One;
      }
    }
    .m-btn{
      display: none;
    }
    .right {
      display: flex;
      justify-content: flex-end;
      overflow: hidden;

      ::v-deep(.swiper) {
        min-width: 50vw;
        height: 36vw;
        padding-bottom: 100px;
      }

      ::v-deep(.swiper-pagination) {
        .swiper-pagination-bullet {
          background: rgba(255, 255, 255, 0.5);
        }

        .swiper-pagination-bullet-active {
          padding: 1px;
          border: 1px solid rgba(255, 255, 255, 0.5);
          transform: scale(1.3);
          background: linear-gradient(225deg, #FFAB00 0%, #FFC600 100%);
        }
      }

      ::v-deep(.swiper-slide ) {
        transform: scale(0.9);

        img {
          transform: scale(0.6);
        }

        -webkit-filter: brightness(50%);
        filter: brightness(80%);
        text-align: center;
        font-size: 18px;
        color: #000000;
        /* Center slide text vertically */
        display: -webkit-box;
        display: -ms-flexbox;
        display: -webkit-flex;
        display: flex;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        -webkit-justify-content: center;
        justify-content: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        -webkit-align-items: center;
        align-items: center;
      }

      ::v-deep(.swiper-slide) {
        img {
          transform: scale(0.6);
        }
        //.img-box{
        //  transform: scale(0.6);
        //  background: rgba(255, 255, 255, .3);
        //  -webkit-backdrop-filter: blur(10px);
        //  backdrop-filter: blur(10px);
        //}


        -webkit-filter: brightness(50%);
        filter: brightness(80%);
        text-align: center;
        font-size: 18px;
        color: #000000;
        /* Center slide text vertically */
        display: -webkit-box;
        display: -ms-flexbox;
        display: -webkit-flex;
        display: flex;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        -webkit-justify-content: center;
        justify-content: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        -webkit-align-items: center;
        align-items: center;
      }

      ::v-deep(.swiper-slide-prev), ::v-deep(.swiper-slide-next) {
        img {
          transform: scale(0.8);
        }

        z-index: 5 !important;
      }

      ::v-deep(.swiper-slide-active) {
        img {
          transform: scale(1);
        }

        -webkit-transform: scale(1);

        z-index: 10;
        -webkit-filter: brightness(1);
        filter: brightness(1)
      }

      ::v-deep(.swiper-slide img) {
        width: 100%;
        height: 100%;
      }
    }
  }

  @media screen and (max-width: 1000px) {
    height: 95vh;
    background: url("../assets/images/m_banner.webp");
    background-size: 100% 100%;
    .header-content {
      display: block;
      padding: 20px 20px;
      width: 100%;
      .left{
        width: 100%;
        .title-box{
          font-size: 8vw;
          line-height: 10vw;
        }
        .tip {
          margin-top: 10px;
          font-size: 3.6vw;
        }

        .primary-btn-sha{
          display: none;
        }
      }
      .swiper {
        display: flex;
        margin-top: 3vh;
        justify-content: center;
        overflow: hidden;
        ::v-deep(.swiper) {
          min-width: 80vw;
          height: 60vw;
          padding-bottom: 40px;
        }
      }
      .m-btn{
        display: block;
        margin: 0 auto;
        width: 36vw;
        height: 6vh;
        font-family: RussoOneRegular, Russo One;
      }
    }

  }
}
</style>
