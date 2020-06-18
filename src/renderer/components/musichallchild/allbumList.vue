<template>
	<div class="allbumList">
		<div>
			<baseSwiper :banner="banner"></baseSwiper>
		</div>
		<div v-for="(item,index) in content" :key="index">
			<baseNum :list="item"></baseNum>
		</div>
	</div>
</template>


<script>
	import baseNum from '../base_num/base_num.vue'
	import baseSwiper from '../base_swiper/base_swiper.vue'
	export default{
		data(){
			return{
				banner:[],
				content:[]
			}
		},
		created(){
			this.$Api.getDigitalAlbumLists().then(res=>{
				console.log(JSON.parse(res))
				this.banner = JSON.parse(res).data.banner;
				this.content = JSON.parse(res).data.content;
				console.log(this.content)
			})
		},
		components:{
			baseSwiper,
			baseNum
		}
	}

</script>

<style scoped>
	.allbumList{
		width: 100%;
	}

</style>