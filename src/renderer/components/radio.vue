<template>
	
	<div class="radio">
		
		<div class='mycontainer' v-for="group in groupList" :key="group.type">
			<h3 class='my_title'>{{ group.name }}</h3>
			
			<el-row :gutter="20">
				<el-col :xs="6" :sm="6" :md="6" :lg="4" v-for="item in group.radioList" :key="item.radioId">
					<div class="item-container">
						<div class="item" :style="`background:url(${item.radioImg});background-size:cover;`"  @click=playRadio(item.radioId)>
							<div class="mask">
								
							</div>
							<div class="playIcon">
								<img src="../static/images/cover_play@2x.png" alt="">
							</div>
							<div class="listennum">
								{{ item.listenNum | numberFormat}}
							</div>
						</div>
						<div class="item-foot">
							<p class="dissname">{{item.dissname}}</p>
							<p class="creator">{{item.radioName}}</p>
						</div>
					</div>
				</el-col>
			</el-row>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				groupList:[],
				activeName:'',
				radioList:[],
				listArr:[]
			}
		},
		created(){
			this.$Api.getRadioLists().then(res=>{
				console.log(JSON.parse(res))
				this.groupList = JSON.parse(res).data.data.groupList;
				this.activeName = this.groupList[0].name;
				this.radioList = this.groupList[0].radioList;
			})
			
		},
		methods:{

			playRadio(radioId){
				// this.$message({
				// 	type:"error",
				// 	message:"别点了,没写",
				// 	offset:300
				// })
				this.$Api.getRadioSong(radioId).then(res=>{
					var songList = JSON.parse(res).songlist.data.track_list
					this.listArr = []
					console.log(songList)
					for(let i = 0;i < songList.length;i++){
						let list = songList[i]
						this.listArr.push({
							img: 'https://y.gtimg.cn/music/photo_new/T002R300x300M000'+list.album.mid+'.jpg?max_age=2592000',
							singer: list.singer[0].name,
							songid: list.id,
							songmid: list.mid,
							songname: list.name,
							albumname: list.album.name,
							interval: list.interval,
							albumdesc: list.albumdesc
						});
					}
					
					
					this.$store.commit('setPlaylist', this.listArr);
					this.$store.commit('setIndex', 0);
				})
			}
		},
		filters: {
		  numberFormat (num) {
		    if (num < 10000) {
		      return num
		    } else if (num > 10000) {
		      return (num / 10000).toFixed(1) + 'W'
		    }
		  }
		}

	}
</script>

<style scoped>
	.radio{
		width: 100%;
	}
	.group-item-container{
		margin-bottom: 20px;
	}
	.groupItem{
		height: 100px;
		background-color: rgb(242, 242, 242);
		/* line-height: 100px; */
		padding-top: ;
		padding-top: 30px;
		text-align: center;
		cursor: pointer;
		
	}
	.item-name{
		margin-top: 5px;
		color:rgb(83, 83, 83);
		font-size: 14px;
	}
	.groupItem .iconfont{
		font-size: 20px;
		color:rgb(148, 148, 148);
	}
	.groupItem:hover .iconfont,.groupItem:hover .item-name{
		color:rgb(30, 206, 157);
	}
	
	.groupItem.active .iconfont,.groupItem.active .item-name{
		color:rgb(30, 206, 157);
	}
	.my_title{
		margin: 30px 0 ;
	}
	
	
	
	
	
	.item-container {
		position: relative;
		padding-top: 10px;
		height: 210px;
	}
	
	.item-container .item {
		background-size:cover;
		height: 160px;
		cursor: pointer;
		transition: all 0.4s ease;
		border-radius: 10px;
		position: relative;
	}
	
	.item .mask{
		position: absolute;
		height: 100%;
		width:100%;
		background: #000000;
		opacity: 0;
		top:0;
		border-radius: 10px;
		left:0;
		/* display: none; */
		/* transition: all 0.4; */
	}
	.item:hover .mask{
		opacity: 0.4;
	}
	.item .playIcon{
		width: 50px;
		height: 50px;
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%,-50%) scale(0.5);
		opacity: 0;
	}
	.item:hover .playIcon{
		opacity: 1;
		transform: scale(1) translateZ(0) translate(-50%,-50%);
		transition-property: opacity,transform;
		transition-duration: .5s;
	}
	.playIcon img{
		width:100%;
		height: 100%;
	}
	
	.item-container .item:hover {
		margin-top: -10px;
	}
	.item:hover .listennum{
		display: none;
	}
	
	.listennum{
		right: 6px;
		bottom: 8px;
		position: absolute;
		min-width:60px;
		padding: 0 5px;
		height: 22px;
		border-radius: 11px;
		background: rgb(28, 37, 44);
		color:#fff;
		line-height: 22px;
		text-align: center;
		font-size: 13px;
	}
	.item-foot{
		position: absolute;
		bottom: 0;
		width:100%;
	}
	.dissname{
		/* width: 100%; */
		white-space: nowrap;
		overflow: hidden;
		-o-text-overflow: ellipsis;
		text-overflow: ellipsis;
		font-size: 14px;
		/* margin-bottom:; */
		color:rgb(0, 0, 0);
		cursor: pointer;
	}
	.dissname:hover,.creator:hover{
		color:rgb(30, 206, 155)
	}
	.creator{
		font-size: 13px;
		color:rgb(123, 123, 123);
		cursor: pointer;
	}
</style>
