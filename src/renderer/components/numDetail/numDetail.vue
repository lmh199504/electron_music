<template>
	<div class="numDetail">
		<div class="top mycontainer">
			<div class="coverImg">
				<img :src="`https://y.gtimg.cn/music/photo_new/T002R300x300M000${singerData.album_mid}.jpg?max_age=2592000`" alt=""> 
				
			</div>
			<div class="top-right">
				<h1 style="margin-top: 5px;">{{singerData.album_name}}</h1>
				<div class="user">
					
					<span class="nickname">{{singerData.singer_name}}</span>
					<!-- <span class="tags" v-for="tag in tags"  :key="tag.pid">#{{ tag.name }}</span> -->
				</div>
				<div class="updatatime">
					{{singerData.publictime | formattime}}
				</div>
				<div class="btn_group">
					<button class="btn play" @click="playAll">
						<i class="iconfont myiconbofang"></i>
						<span>播放全部</span>
					</button>
					<button class="btn love">
						<i class="iconfont  myiconicon-test"></i>
						<span> 收藏</span>
					</button>
					<button class="btn more">
						<i class="iconfont myicongengduo"></i>
					</button>
				</div>
			</div>
		</div>
		<div class="mycontainer">
			<musiclist :list="list"></musiclist>
		</div>
	</div>
</template>

<script>
	import musiclist from '../musiclist/index.vue'
	export default{
		data(){
			return{
				singerData:new Object(),
				list:[]
			}
			
		},
		created(){
			console.log(this.$route.query)
			this.singerData = this.$route.query.item;
			if(this.singerData.singer_name == undefined){
				this.$router.push({
					path:"/"
				})
			}
			
			this.$Api.getAlbumInfo(this.singerData.album_mid).then(res=>{
				console.log(JSON.parse(res));
				const arr = JSON.parse(res).data.list;
				for(let i = 0;i<arr.length;i++){
					let item = arr[i];
					this.list.push({
						img:  'http://imgcache.qq.com/music/photo/album_300/17/300_albumpic_' + item.albumid + '_0.jpg',
						singer: item.singer[0].name,
						songid: item.songid,
						songmid: item.songmid,
						songname: item.songname,
						albumname: item.albumname,
						interval: item.interval,
						albumdesc: item.albumdesc
					})
				}
				
			}).catch(err=>{
				console.log(err);
			})
		},
		methods:{
			playAll(){
				this.$store.commit('setPlaylist', this.list)
				this.$store.commit('setIndex', 0)
			}
		},
		filters:{
			formattime(time){
				var dt = new Date(time * 1000);
				var year = dt.getFullYear();
				var month = dt.getMonth() + 1;
				var day = dt.getDay();
				
				return year+'-'+(month>9 ? month : '0' + month)+'-'+( day>9 ? day : '0' + day )
			}
		},
		components:{
			musiclist
		}
	}
</script>

<style scoped>
	.numDetail{
		width: 100%;
	}
	
	.discoDetail{
		padding-top: 10px;
		width: 100%;
		height: 100%;
	}
	.top{
		display: flex;
		margin-bottom: 20px;
		width: 100%;
	}
	.top .coverImg{
		width: 170px;
		height: 170px;
		border-radius: 5px;
		overflow: hidden;
	}
	.top .coverImg img{
		width: 100%;
		height: 100%;
	}
	.top-right{
		margin-left: 30px;
		width: calc(100% - 200px);
	}
	.top .top-right .headImg{
		width: 25px;
		height: 25px;
		border-radius: 50%;
		margin-right: 10px;
		vertical-align: -10px;
	}
	.top .user{
		margin-top: 10px;
		cursor: pointer;
	}
	
	.user .nickname{
		font-size: 12px;
		
	}
	.user .nickname:hover{
		color:rgb(30, 204, 148);
	}
	.user .tags{
		font-size: 12px;
		margin-left: 10px;
		color: rgb(125, 125, 125);
		letter-spacing: 2px;
	}
	.top .desc{
		color:rgb(125, 125, 125);
		font-size: 12px;
		margin-top: 10px;
		width: 100%;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
	}
	.btn_group .btn{
		/* margin-top: 20px; */
		cursor: pointer;
		outline: none;
		border: none;
		width: 110px;
		height: 30px;
		border-radius: 15px;
		line-height: 30px;
		font-size: 14px;
		margin-right: 10px;
		text-align: center;
	}
	.btn_group .btn:hover{
		opacity: 0.8;
	}
	.btn_group .play{
		background: rgb(32, 213, 185);
		color:#fff;
	}
	.btn_group .love{
		background: rgb(229, 229, 229);
		color: rgb(0, 0, 0);
	}
	.btn_group .more{
		width: 30px;
	}
	.updatatime{
		padding-left: 5px;
		color:rgb(125, 125, 125);
		font-size: 12px;
		line-height: 60px;
		height: 70px;
	}
	
</style>
