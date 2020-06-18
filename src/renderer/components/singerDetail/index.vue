<template>
	<div class="discoDetail ">
		<div class="top mycontainer">
			<div class="coverImg">
				<img :src="coverImg" alt=""> 
			</div>
			<div class="top-right">
				<h1 style="margin-top: 5px;">{{singer}}</h1>
		
				<div class="updatatime">
					<!-- {{}} -->
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
		<div class="content">
			<div class="mycontainer">
				<musiclist v-bind:list="list"></musiclist>
			</div>
		</div>
	</div>
</template>


<script>
	import musiclist from '../musiclist/index.vue'
	export default{
	  data () {
	    return {
	      list: [],
	      coverImg: '',
	      singer: ''
	    }
	  },
	  created () {
	    console.log(this.$route.query.item)
	    this.coverImg = this.$route.query.item.avatar
	    this.singer = this.$route.query.item.name
	    this.$Api.getSingerDeatil(this.$route.query.item.id).then(res => {
	      console.log(res)
	
	      for (let i = 0; i < res.data.list.length; i++) {
	        let item = res.data.list[i]
	        this.list.push({
	          img: 'http://imgcache.qq.com/music/photo/album_300/17/300_albumpic_' + item.musicData.albumid +
							'_0.jpg',
	          singer: item.musicData.singer[0].name,
	          songid: item.musicData.songid,
	          songmid: item.musicData.songmid,
	          songname: item.musicData.songname,
	          albumname: item.musicData.albumname,
	          interval: item.musicData.interval,
	          albumdesc: item.musicData.albumdesc
	        })
	      }
	    }).catch(err => {
	      console.log(err)
	      this.$router.push({
	        path: '/musichall'
	      })
	    })
	  },
	  components: {
	    musiclist
	  },
	  methods: {
	    playAll () {
	      this.$store.commit('setPlaylist', this.list)
	      this.$store.commit('setIndex', 0)
	    }
	  }
	}
</script>

<style scoped>
	
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
		margin-top: 15px;
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
		margin-top: 15px;
		width: 100%;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
	}
	.btn_group .btn{
		margin-top: 20px;
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
		line-height: 80px;
		height: 75px;
	}
</style>
