<template>
	<div class="discoDetail ">
		<div class="top mycontainer">
			<div class="coverImg"><img :src="coverImg" alt="" /></div>
			<div class="top-right">
				<h1 style="margin-top: 5px;">{{ dissname }}</h1>
				<div class="user">
					<img :src="headImg" alt="" class="headImg" />
					<span class="nickname">{{ nickname }}</span>
					<span class="tags" v-for="tag in tags" :key="tag.pid">#{{ tag.name }}</span>
				</div>
				<div class="desc">{{ desc }}</div>
				<div class="btn_group">
					<button class="btn play" @click="playAll">
						<i class="iconfont myiconbofang"></i>
						<span>播放全部</span>
					</button>
					<button class="btn love" @click="addCollect" v-if="this.$route.query.type != 'my'">
						<i class="iconfont  myiconicon-test"></i>
						<span>收藏</span>
					</button>
					<button class="btn more"><i class="iconfont myicongengduo"></i></button>
				</div>
			</div>
		</div>
		<div class="content">
			<el-tabs v-model="activeName">
				<el-tab-pane label="歌曲" name="one">
					<div class="mycontainer"><musiclist v-bind:list="listArr"></musiclist></div>
				</el-tab-pane>
				<el-tab-pane label="评论" name="two">
					<div class="mycontainer"><comment></comment></div>
				</el-tab-pane>
			</el-tabs>
		</div>
	</div>
</template>

<script>
import musiclist from '../musiclist/index.vue';
import comment from '../comment/index.vue';
import { mapGetters } from 'vuex';
export default {
	data() {
		return {
			headImg: '',
			listArr: [],
			coverImg: '',
			dissname: '',
			tags: [],
			nickname: '',
			desc: '',
			activeName: 'one'
		};
	},
	computed: {
		...mapGetters(['createList'])
	},
	created() {
		this.init();
	},
	methods: {
		init() {
			this.listArr = []
			if (this.$route.query.type == 'my') {
				//用户创建
				this.listArr = this.createList.find(item => {
					return item.dissid == this.$route.query.item.dissid;
				}).songlist;
				this.dissname = this.$route.query.item.dissname
				if(this.listArr.length!=0){
					this.coverImg = this.listArr[0].img;
				}
				this.tag = [];
				this.nickname = '韶华的华';
				this.desc = '这家伙很懒，什么都没有留下';
				this.headImg = ''
			} else {
				//网络歌单
				this.coverImg = this.$route.query.item.imgurl;
				this.$Api.getSongList(this.$route.query.item.dissid).then(res => {
					
					try{
						res = res.substring(13,res.length - 1)
						
						// console.log(res)
		
						
						// console.log(JSON.parse(res).cdlist[0]);
						this.headImg = JSON.parse(res).cdlist[0].headurl;
						this.dissname = JSON.parse(res).cdlist[0].dissname;
						this.nickname = JSON.parse(res).cdlist[0].nickname;
						this.desc = JSON.parse(res).cdlist[0].desc;
						this.tags = JSON.parse(res).cdlist[0].tags;
						for (let i = 0; i < JSON.parse(res).cdlist[0].songlist.length; i++) {
							let list = JSON.parse(res).cdlist[0].songlist[i];
							// console.log(list.albumid);
							this.listArr.push({
								img: 'http://imgcache.qq.com/music/photo/album_300/17/300_albumpic_' + list.albumid + '_0.jpg',
								singer: list.singer[0].name,
								songid: list.songid,
								songmid: list.songmid,
								songname: list.songname,
								albumname: list.albumname,
								interval: list.interval,
								albumdesc: list.albumdesc
							});
							
							
						}
					}catch(err){
						console.log(err)
						this.$router.push({
							path: '/musichall'
						});
					}
				});
			}
		},
		playAll() {
			this.$store.commit('setPlaylist', this.listArr);
			this.$store.commit('setIndex', 0);
		},
		addCollect() {
			this.$store.commit('addCollection', this.$route.query.item);
		}
	},
	components: {
		musiclist,
		comment
	},
	watch: {
		$route(newVal) {
			this.init();
		}
	}
};
</script>

<style scoped>
.discoDetail {
	padding-top: 10px;
	width: 100%;
	height: 100%;
}
.top {
	display: flex;
	margin-bottom: 20px;
	width: 100%;
}
.top .coverImg {
	width: 170px;
	height: 170px;
	border-radius: 5px;
	overflow: hidden;
}
.top .coverImg img {
	width: 100%;
	height: 100%;
}
.top-right {
	margin-left: 30px;
	width: calc(100% - 200px);
}
.top .top-right .headImg {
	width: 25px;
	height: 25px;
	border-radius: 50%;
	margin-right: 10px;
	vertical-align: -10px;
}
.top .user {
	margin-top: 15px;
	cursor: pointer;
}

.user .nickname {
	font-size: 12px;
}
.user .nickname:hover {
	color: rgb(30, 204, 148);
}
.user .tags {
	font-size: 12px;
	margin-left: 10px;
	color: rgb(125, 125, 125);
	letter-spacing: 2px;
}
.top .desc {
	color: rgb(125, 125, 125);
	font-size: 12px;
	margin-top: 15px;
	width: 100%;
	text-overflow: ellipsis;
	overflow: hidden;
	white-space: nowrap;
}
.btn_group .btn {
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
.btn_group .btn:hover {
	opacity: 0.8;
}
.btn_group .play {
	background: rgb(32, 213, 185);
	color: #fff;
}
.btn_group .love {
	background: rgb(229, 229, 229);
	color: rgb(0, 0, 0);
}
.btn_group .more {
	width: 30px;
}
</style>
