<template>
    <div class="jingxuan">
        <div class="top-cur">
            <baseSwiper ></baseSwiper>
        </div>
        <div class="mycontainer title">
            <span class="big_title">官方歌单</span>
            <span class="small-title">官方甄选订阅歌单</span>
        </div>
        <div>
        	<baseDisco :list = 'list'></baseDisco>
        </div>
    </div>
</template>
<script>
import baseSwiper from '../base_swiper/base_swiper.vue'
import baseDisco from '../base_disco/base_disco.vue'
export default {
    data() {
        return {
            swiperOptions: {
                pagination: {
                    el: '.swiper-pagination'
                },
                autoplay: true, // 可选选项，自动滑动
                // Some Swiper option/callback...
                slidesPerView: 4,
                spaceBetween: 20,
                navigation: {
                    nextEl: '.next-top',
                    prevEl: '.prev-top'
                },
                breakpoints: {
                    1920: {
                        slidesPerView: 4
                    },
                    1366: {
                        slidesPerView: 3
                    },

                    1024: {
                        slidesPerView: 2
                    },
                    600: {
                        slidesPerView: 2
                    }
                }
            },
            list: [
            	
            ]
        }
    },
    created() {


        this.$Api.getDiscList(10000000).then(res => {
            this.list = res
        })
    },
    components:{
    	baseDisco,
    	baseSwiper
    },


}
</script>
<style scoped>
.jingxuan {
    height: 100%;
}

.swiper-container {
    height: 120px;
    --swiper-theme-color: rgb(30, 206, 158);
    /* 设置Swiper风格 */
    --swiper-navigation-color: rgb(30, 206, 158);
    /* 单独设置按钮颜色 */
    --swiper-navigation-size: 30px;
    /* 设置按钮大小 */
}

.mynext,
.myprev {
    color: rgb(30, 206, 158);
    border: none !important;
    display: none;
}

.title {
    margin: 20px 0;
}

.title .big_title {
    font-size: 20px;
    font-weight: bold;
}

.title .small-title {
    font-size: 15px;
    color: rgb(158, 158, 158);
    margin-left: 20px;
}

.top-cur,
.gedan {
    position: relative;
}

.mycontainer {
    position: relative;
    width: calc(100% - 82px);
    margin-left: 40px;
}

.top-cur:hover .mynext,
.top-cur:hover .myprev {
    display: block;
}

.swiper-slide img {
    width: 100%;
    height: 100%;
    border-radius: 10px;
}




</style>