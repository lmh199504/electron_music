<template>
    <div class="base_num">
        <div class="mycontainer">
            <h3 class='my_title'>{{ list.title }}</h3>
        </div>
        <div class="mycontainer">
            <el-row :gutter="20">
                <el-col :xs="6" :sm="6" :md="6" :lg="4" v-for="item in list.albumlist" :key="item.actid" class="mycol">
                    <div class="item-container">
                        <div class="item" @click="toDetail(item)">
                            <img :src="`https://y.gtimg.cn/music/photo_new/T002R300x300M000${item.album_mid}.jpg?max_age=2592000`" alt="">
                        </div>
                        <div class="mask"></div>
                        <div class="item-foot">
                            <p class="dissname">{{item.album_name}}</p>
                            <p class="creator" @click="goToSinger(item)">{{item.singer_name}}</p>
                        </div>
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        list: {
            type: Object,
            default: () => {
                return new Object()
            }
        }
    },
    data() {
        return {

        }
    },
    methods: {
    	toDetail(item){
			
    		this.$router.push({
				path:'/numDetail',
				query:{
					item:item
				}
			})
    	},
        goToSinger(item) {
            this.$router.push({
                path: '/singerDetail',
                query: {
                    item: {
                        avatar: `https://y.gtimg.cn/music/photo_new/T001R300x300M000${item.singer_mid}.jpg?max_age=2592000`,
                        id: item.singer_mid,
                        name: item.singer_name
                    }
                }
            })
        }
    }

}
</script>
<style scoped>
.base_num {
    width: 100%;
}

.my_title {
    display: block;
    margin: 15px 0;
}

.item-container {
    position: relative;
    padding-top: 10px;
    height: 210px;
}

.item-container .item {
    background-size: cover;
    height: 160px;
    cursor: pointer;
    transition: all 0.4s ease;
    border-radius: 10px;
    position: relative;
}

.item .mask {
    position: absolute;
    height: 100%;
    width: 100%;
    background: #000000;
    opacity: 0;
    top: 0;
    border-radius: 10px;
    left: 0;
    /* display: none; */
    /* transition: all 0.4; */
}

.item img {
    width: 100%;
    height: 100%;
    border-radius: 10px;
}

.item:hover .mask {
    opacity: 0.4;
}

.item-container .item:hover {
    margin-top: -10px;
}

.item:hover .listennum {
    display: none;
}

.listennum {
    right: 6px;
    bottom: 8px;
    position: absolute;
    min-width: 60px;
    padding: 0 5px;
    height: 22px;
    border-radius: 11px;
    background: rgb(28, 37, 44);
    color: #fff;
    line-height: 22px;
    text-align: center;
    font-size: 13px;
}

.item-foot {
    position: absolute;
    bottom: 0;
    width: 100%;
}

.dissname {
    /* width: 100%; */
    white-space: nowrap;
    overflow: hidden;
    -o-text-overflow: ellipsis;
    text-overflow: ellipsis;
    font-size: 14px;
    /* margin-bottom:; */
    color: rgb(0, 0, 0);
    cursor: pointer;
    margin-top: 5px;
}

.dissname:hover,
.creator:hover {
    color: rgb(30, 206, 155)
}

.creator {
    font-size: 13px;
    color: rgb(123, 123, 123);
    cursor: pointer;
}

@media screen and (max-width: 1024px) {

    .mycol:nth-child(5),
    .mycol:nth-child(6) {
        display: none;
    }
}
</style>