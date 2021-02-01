<template>
	<div class="rhead">
		
		<div class="head-left">
			<div class="myicon">
				<i class="el-icon-arrow-left" :class="{ 'el-icon-arrow-left-active':backActive }" @click="back"></i>
				<i class="el-icon-arrow-right" :class="{ 'el-icon-arrow-left-active':goActive }" @click="go"></i>
			</div>
			<div class="serach">
				<el-input v-model="input" placeholder="搜索音乐" prefix-icon="el-icon-search" @input="searchSong"  @focus="inputFocus"></el-input>
			</div>
			<div :class="{'serach-result':true,'active':show && input!=''}">
				<el-row :gutter="20">
					<el-col :span="4">单曲</el-col>
					<el-col :span="20">
						<div v-for="(item,index) in songArr" :key="item.songmid" v-show="index<4" @click="playThis(item)" class="song serach-item">
							<span>{{item.songname}}</span>
							<span class="singername">{{item.singer}}</span>
						</div>
					</el-col>
				</el-row>
				<el-row :gutter="20" v-if="zhidaSinger!=null">
					<el-col :span="4">歌手</el-col>
					<el-col :span="20" class="serach-item">
						<div @click="toSingerDetail">
							<img :src="zhidaSinger.singerPic" alt="" class="zhida_singer_img">
							<span class="singername">{{zhidaSinger.singerName}}</span>
						</div>
					</el-col>
				</el-row>
				<el-row :gutter="20" v-if="hotalbum.length != 0">
					<el-col :span="4">专辑</el-col>
					<el-col :span="20">
						<div v-for="(item,index) in hotalbum" :key="item.albumID" v-show="index<4"  class="album serach-item" @click="toAlbum(item)">
							<img :src="`https://y.gtimg.cn/music/photo_new/T002R300x300M000${item.albumMID}.jpg?max_age=2592000`" alt="" class="album_img">
							<span >{{item.albumName}}</span>
							<span class="singername">{{zhidaSinger.singerName}}</span>
						</div>
					</el-col>
				</el-row>
<!-- 				<el-row :gutter="20">
					<el-col :span="4">MV</el-col>
					<el-col :span="20"></el-col>
				</el-row> -->
				<!-- <div class="serach-item" v-for="item in list" :key="item.songmid" @click="playThis(item)">
					<div class="item-left"><img :src="item.img" alt="" /></div>
					<div class="item-right">
						<p class="songname">{{ item.songname }}</p>
						<p class="singer">{{ item.singer }}</p>
					</div>
				</div> -->
			</div>
		</div>
		<div class="head-right">
			<div style="float: right;display: flex;">
				<div class="head-img" @click="toCenter"><img src="../../static/images/center-head.jpg" alt="" width="30px" /></div>
				<div class="window_icon icon">
					<i class="el-icon-arrow-down"></i>
					<i class="el-icon-user"></i>
					<i class="el-icon-tickets" style="margin-right:15px;"></i>
				</div>
				<div class="window_icon">
					<i class="el-icon-minus" style="margin-left: 15px;" @click="minWin"></i>
					<i class="el-icon-monitor" @click="maxWin"></i>
					<i class="el-icon-close" @click="setSkip"></i>
				</div>
			</div>
		</div>
		
		<div :class="{'mask':true,'active':show}" @click="show=false"></div>
		
	</div>
</template>
<script>
var rp = require('request-promise')
export default {
  data () {
    return {
      input: '',
      timer: null,
      list: null,
      show: false,
      isMax: false,
	  index:0,
	  songArr:[],
	  zhidaSinger:null,
	  hotalbum:[],
	  history: []
    }
  },
  created () {

  },
  methods: {
	toCenter(){
		this.$router.push({
			path:'/center'
		})
	},
	back(){
		if ( this.index !== 0) {
			const route = this.history[this.index - 1]
			this.index--
			this.$router.push({
				path:route.path,
				query:{...route.query,back:true}
			})
		}
	},
	go(){
		
		if ( this.index !== (this.history.length - 1)) {
			
			const route = this.history[this.index + 1]
			this.index++ 
			this.$router.push({
				path:route.path,
				query:{...route.query,back:true}
			})
		}
	},
    minWin () {
      this.$Win.minWindow()
    },
    maxWin () {
      this.isMax = !this.isMax
      this.$Win.maxWindow(this.isMax)
    },
    setSkip () {
      this.$Win.hide()
    },
    searchSong () {
		//catZhida 0表示歌曲, 2表示歌手, 3表示专辑, 默认值为1

		clearTimeout(this.timer)
		this.timer = setTimeout(() => {
			this.$Api.getSearchByKey(this.input,1).then(res=>{
				this.show = true
				console.log(JSON.parse(res))
				this.zhidaSinger= null;
				this.hotalbum=[]
				let list = JSON.parse(res).data.song.list
				this.songArr = [];
				for(let i = 0;i<list.length;i++){
					this.songArr.push({
						img: 'http://imgcache.qq.com/music/photo/album_300/17/300_albumpic_' + list[i].album.id + '_0.jpg',
						singer: list[i].singer[0].name,
						songid: list[i].id,
						songmid: list[i].mid,
						songname: list[i].title,
						albumname: list[i].album.name,
						interval: list[i].interval,
						albumdesc: list[i].lyric
					})
				}
				if(JSON.parse(res).data.zhida.type===1){
					this.zhidaSinger = JSON.parse(res).data.zhida.zhida_singer;
					this.hotalbum = JSON.parse(res).data.zhida.zhida_singer.hotalbum;
				}else{
					this.zhidaSinger= null;
					this.hotalbum=[]
				}
			})
		},500)
    },
    inputFocus () {
      if (this.songArr != null) {
        this.show = true
      }
    },
    playThis (item) {
      this.show = false
      this.$store.commit('addPlaylist', item)
    },
	toSingerDetail(){
		this.show = false
		let item = {
			avatar: `https://y.gtimg.cn/music/photo_new/T001R300x300M000${this.zhidaSinger.singerMID}.jpg?max_age=2592000`,
			id: this.zhidaSinger.singerMID,
			name: this.zhidaSinger.singerName
		}
		this.$router.push({
		  path: '/singerDetail',
		  query: {
		    item: item
		  }
		})
	},
	toAlbum(_item){
		this.show = false
		this.$router.push({
			path:'/numDetail',
			query:{
				item:{
					album_name:_item.albumName,
					singer_name:this.zhidaSinger.singerName,
					album_mid:_item.albumMID,
				}
			}
		})
	}
  },
  computed: {
	backActive: function() {
		return this.index !== 0
	},
	goActive: function() {
		return this.index !== (this.history.length - 1)
	}
  },
  watch:{
  	$route:{
		handler: function(val) {
			const index = this.history.findIndex( item => item.path === val.path )
			console.log(val.query)
			if (val.query.back === 'true') { // 来自返回 和 前进的路由
				return
			} 
			
			if (index >= 0) {
				console.log('已经存在了')
				this.history.splice(index, 1)
				this.history.push(val)
				this.index = this.history.length - 1
			} else {
				this.history.push(val)
				this.index = this.history.length - 1
			}
			console.log(this.history)
		},
		immediate: true
  	}
  }
}
</script>
<style scoped>
.rhead {
	display: flex;
	height: 100%;
	width: 100%;
	line-height: 70px;
	border-bottom: 2px solid rgb(238, 238, 238);
	position: relative;
}
.head-left {
	width: 310px;
	display: flex;
}
.head-right {
	width: calc(100% - 310px);
}

.rhead .myicon i {
	margin-left: 10px;
	cursor: pointer;
	
}

.serach {
	margin-left: 30px;
	width: 160px;
	height: 30px;
	border-radius: 15px;
}

.head-img {
	height: 30px;
	width: 30px;
	margin-top: 20px;
	line-height: 20px;
	margin-right: 30px;
}

.head-img img {
	width: 100%;
	height: 100%;
	border-radius: 50%;
}
.window_icon {
	cursor: pointer;
}
.window_icon i {
	color: rgb(123, 123, 123);
	cursor: pointer;
	margin: 0 8px;
}
.window_icon i:hover {
	color: rgb(30, 206, 156);
}
.icon {
	position: relative;
}
.icon::after {
	content: '';
	height: 20px;
	top: 25px;
	border-left: 1px solid rgb(123, 123, 123);
	position: absolute;
	/*width: 1px*/
}
.serach-result {
	padding: 5px;
	width: 350px;
	height: auto;
	background-color: #fff;
	box-shadow: 0px 4px 12px rgba(235, 235, 235, 1);
	position: absolute;
	top: 60px;
	left: 80px;
	display: none;
	border-radius: 10px;
	transition: all 0.3s ease;
	z-index: 66;
	font-size: 12px;
}
.serach-result.active{
	display: block;
}
.serach-item {

	border-radius: 5px;
	cursor: pointer;
}
.serach-item:hover{
	background: rgb(243, 243, 243);
}

.song{
	height: 25px;
	line-height: 25px;
	font-size: 12px;
}
.album{
	height: 30px;
	line-height: 30px;
	
}
.album_img{
	width: 25px;
	height: 25px;
	vertical-align: -5px;
	border-radius: 6px;
}
.zhida_singer_img{
	width: 25px;
	height: 25px;
	border-radius: 50%;
	vertical-align: -5px;
}
.singername{
	color: rgb(234, 88, 63);
}
.mask{
	width: 100%;
	height: 100%;
	position: fixed;
	top:0;
	left: 0;
	z-index: 65;
	display: none;
}
.mask.active{
	display: block;
}
.el-icon-arrow-left,.el-icon-arrow-right {
	color: gray;
}
.el-icon-arrow-left-active{
	color: #000;
}
.el-icon-arrow-left-active:hover{
	color: #1ecd98;
}
</style>
<style>
.rhead .serach .el-input__inner {
	border-radius: 15px;
	height: 30px;
	background: rgb(227, 227, 227);
	outline: none;
	border: none;
}
</style>
