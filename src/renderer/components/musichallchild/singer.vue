<template>
	<div class="singer">
		<div class="mycontainer" v-infinite-scroll="load" 
		:infinite-scroll-distance='30' 
		>
			<div v-for="item in singerArr" :key="item.Fsinger_id" class="item" @click="toDetail(item)">
				<div class="img">
					<img :src="item.avatar" alt="" width="50px">
				</div>
				<div class="name"><span>{{item.name}}</span></div>
			</div>
		</div>
		<p v-if="loading">加载中...</p>
		<p v-if="noMore">没有更多了</p>
	</div>
</template>

<script>
	export default {
	  props: {
	    activeName: ''
	  },
	  data () {
	    return {
	      singerArr: [],
	      pagenum: 1,
	      loading: false,
	      noMore: false
	    }
	  },
	  created () {
	    this.getSinger()
	  },
	  methods: {
	    getSinger () {
	      this.$Api.getSinger(this.pagenum).then(res => {
	        // console.log(res)
	        for (let i = 0; i < res.data.list.length; i++) {
	          this.singerArr.push({
	            avatar: `https://y.gtimg.cn/music/photo_new/T001R300x300M000${res.data.list[i].Fsinger_mid}.jpg?max_age=2592000`,
	            id: res.data.list[i].Fsinger_mid,
	            name: res.data.list[i].Fsinger_name
	          })
	        }
	      })
	    },
	    load () {
	      if (this.activeName == 'third') {
	        this.pagenum++
	        this.getSinger()
	      }
	    },
	    disabled () {
	      return this.loading || this.noMore
	    },
	    toDetail (item) {
	      this.$router.push({
	        path: '/singerDetail',
	        query: {
	          item: item
	        }
	      })
	    }
	  },
	  watch: {
	    activeName (newVal) {
	      // console.log(newVal);
	      this.activeName = newVal
	    }
	  }
	}
</script>

<style scoped>
	
	.mycontainer{
		display: flex;
		flex-wrap: wrap;
	}
	.item{
		cursor: pointer;
		width: 160px;

		height: 200px;
		margin-bottom: 10px;
		margin-right: 10px;
	}
	.img{
		height: 160px;
		width: 160px;
		border-radius: 50%;
		overflow: hidden;
		
	}
	.img img{
		height: 100%;
		width:100%;
	}
	.name{
		width:100%;
		text-overflow: ellipsis;
		white-space: nowrap;
		margin-top: 10px;
		text-align: center;
		overflow: hidden;
	}
	.name:hover{
		color:rgb(31, 207, 159);
	}
</style>
