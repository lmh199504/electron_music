<template>
    <div class="base_swiper">
    	<div class="top-cur">
            <div class="swiper-button-prev myprev prev-top"></div>
            <div class="mycontainer">
                <swiper ref="mySwiper" :options="swiperOptions">
                    <swiper-slide v-for="item in banner" :key="item.picurl">
                        <img :src="item.picurl" alt="">
                    </swiper-slide>
                
                    <div class="swiper-pagination" slot="pagination"></div>
                </swiper>
            </div>
            <div class="swiper-button-next mynext next-top"></div>
        </div>
    </div>
</template>
<script>
export default {
	props:{
		banner:{
			type:Array,
			default:()=>{
				return [
					{picurl:'https://xiaohongll.oss-cn-beijing.aliyuncs.com/banner/1.jpg'},
	            	{picurl:'https://xiaohongll.oss-cn-beijing.aliyuncs.com/banner/2.jpg'},
	            	{picurl:'https://xiaohongll.oss-cn-beijing.aliyuncs.com/banner/3.jpg'},
	            	{picurl:'https://xiaohongll.oss-cn-beijing.aliyuncs.com/banner/4.jpg'},
	            	{picurl:'https://xiaohongll.oss-cn-beijing.aliyuncs.com/banner/5.jpg'},
				]
			}
		}
	},
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

        }
    },
    computed:{
    	swiper() {
            return this.$refs.mySwiper.$swiper
        }
    },
    mouted(){
    	this.swiper.slideTo(3, 1000, false)
    }


}
</script>
<style scoped>

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

/*.mycontainer {
    position: relative;
    width: calc(100% - 82px);
    margin-left: 40px;
}
*/
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