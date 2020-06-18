<template>
	<div class="paihang">
		<div>
			<div class="mycontainer">
				<el-row :gutter="20">
					<el-col :xs="12" :sm="12" :md="12" :lg="8" v-for="item in list" :key='item.id'>
						<div class="item-container top-container">
							<div class="item" @click="toRanking(item)">
								<div class="coverImg">
									<img :src="item.picUrl" alt="">
									<div class="mask">
										
									</div>
									<div class="playIcon">
										<img src="../../static/images/cover_play@2x.png" alt="">
									</div>
									<div class="listennum">
										<i class="iconfont myiconheadseterji"></i>
										<span>{{ item.listenCount | numberFormat}}</span>
									</div>
								</div>
								<div class="songlist">
									<h3 class="title">{{item.topTitle}}</h3>
									<div class="song">
										<div class="song-item" v-for="(song,index) in item.songList"  :key="song.songname">
											<span class="index">{{(index+1)}}</span> <span class="song_msg">{{song.songname}}-{{ song.singername}}</span>
										</div>
									</div>
								</div>
							</div>
						</div>
					</el-col>
				</el-row>
			</div>
<!-- 			<div class="mycontainer">
				<div class="big_title">地区榜</div>
				<el-row :gutter="20">
					<el-col :xs="8" :sm="8" :md="6" :lg="4" v-for="item in 10" :key='item'>
						<div class="item-container">
							<div class="item"></div>
						</div>
					</el-col>
				</el-row>
			</div>
			<div class="mycontainer">
				<div class="big_title">特色榜</div>
				<el-row :gutter="20">
					<el-col :xs="8" :sm="8" :md="6" :lg="4" v-for="item in 10" :key='item'>
						<div class="item-container">
							<div class="item"></div>
						</div>
					</el-col>
				</el-row>
			</div>
			
			<div class="mycontainer">
				<div class="big_title">全球榜</div>
				<el-row :gutter="20">
					<el-col :xs="8" :sm="8" :md="6" :lg="4" v-for="item in 10" :key='item'>
						<div class="item-container">
							<div class="item"></div>
						</div>
					</el-col>
				</el-row>
			</div>
			 -->
		</div>
	</div>
</template>

<script>
	export default{
	  data () {
	    return {
	      list: []
	    }
	  },
	  created () {
	    this.$Api.getTopList().then(res => {
	      console.log(res)
	      this.list = res
	    })
	  },
	  methods: {
	    toRanking (item) {
	      this.$router.push({
	        path: '/ranking',
	        query: {
	          item: item
	        }
	      })
	    }
	  },
	  filters: {
	    numberFormat (num) {
	      if (num < 10000) {
	        return num
	      } else if (num > 10000) {
	        return (num / 10000).toFixed(1) + '万'
	      }
	    }
	  }
	}
</script>

<style scoped>
	.paihang{
		
	}
	
	.item-container{
		width: 100%;
		padding-top: 10px;
		height: 200px;
		margin-bottom: 10px;
	}
	.top-container{
		height: 150px;
	}
	.item{
		transition: all 0.4s ease; 
		width: 100%;
		height: 100%;
		background-color: rgb(243, 243, 243);
		display: flex;
		border-radius: 10px;
		cursor: pointer;
	}
	.item:hover{
		margin-top: -10px;
	}
	.coverImg{
		width: 150px;
		height: 100%;
		position: relative;
		/* border-radius: 10px; */
	}
	.coverImg img{
		width: 100%;
		height: 100%;
		border-radius: 10px;
	}
	.big_title{
		font-size: 20px;
		font-weight: bold;
		margin: 10px 0;
	}
	.songlist{
		padding: 15px;
		width: calc(100% - 160px);
	}
	.song{
		color:rgb(122, 122, 122);
		font-size: 12px;
		line-height: 30px;
		width: 100%;
	}
	.song-item{
		width: 100%;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.index{
		margin-right: 10px ;
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
	.coverImg .playIcon{
		width: 50px;
		height: 50px;
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%,-50%) scale(0.5);
		opacity: 0;
	}
	.coverImg:hover .playIcon{
		opacity: 1;
		transform: scale(1) translateZ(0) translate(-50%,-50%);
		transition-property: opacity,transform;
		transition-duration: .5s;
	}
	.playIcon img{
		width:100%;
		height: 100%;
	}
	
	.coverImg:hover .listennum{
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
	.listennum .myiconheadseterji{
		/* margin-top: 5px; */
		/* position: absolute; */
		/* top:50%; */
		transform: translate(0,3px);
	}
</style>
