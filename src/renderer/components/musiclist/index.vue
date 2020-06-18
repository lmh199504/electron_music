<template>
	<div class="musiclist">
		<div class="title">
			<el-row>
				<el-col :span="12">
					<span>歌曲</span>
				</el-col>
				<el-col :span="5">
					<span>歌手</span>
				</el-col>
				<el-col :span="5">
					<span>专辑</span>
				</el-col>
				<el-col :span="2">
					<span>时长</span>
				</el-col>
			</el-row>
		</div>
		<div class="music-container">
			<el-row v-for="item in list" :key="item.songmid" class="music-item">
				<el-col :span="12" class="songname">
					<div class='song_msg'>
						<i class="iconfont " :class="{ 'myiconicon-test':!item.islove,'myiconxihuan':item.islove }" @click="setLove(item)"></i>
						<span>{{item.songname}}</span>
						<span v-if="item.albumdesc !='' " class="albumdesc">{{'（' + item.albumdesc +'）'}}</span>
					</div>
					<div class="tool-btn">
						<i class="iconfont myiconbofang1" @click="playThis(item)"></i>
						<i class="iconfont myicontianjia" @click="addPlay(item)"></i>
						<i class="iconfont myicondownload" @click="down(item)"></i>
						
						<el-popover
						  placement="right"
						  width="160"
						  trigger="hover">
							<div class='listTitle'>
								添加到歌单
							</div>
	
							<div v-for="menu in createList" :key="menu.dissid" class="listitem" @click="addToCreateList(menu,item)">{{ menu.dissname }}</div>
							<i slot="reference" class="iconfont myicongengduo"></i>
						</el-popover>
					</div>
				</el-col>
				<el-col :span="5">
					<span>{{ item.singer }}</span>
				</el-col>
				<el-col :span="5">
					<span>{{ item.albumname }}</span>
				</el-col>
				<el-col :span="2">
					<span>{{ item.interval | formatDuratin}}</span>
				</el-col>
			</el-row>


		</div>
		<div class="no-data" v-if="list.length==0">
			还没有歌曲哦~~~
		</div>
	</div>
</template>

<script>
	// import { isLoveMixin } from '../../common/js/mixin.js'
	import { downloadFile } from '../../utils/download.js'
	import { mapGetters } from 'vuex'

	export default {
		props: {
			list: {
				type: Array,
				default: function() {
					return []
				}
			}
		},
		// mixins:[isLoveMixin],
		data() {
			return {

			}
		},
		created() {},
		computed: {
			...mapGetters(['lovelist','createList'])
		},
		mounted() {
			for (let i = 0; i < this.list.length; i++) {
				let item = this.list[i]
				// console.log(item.islove)
				if (item.islove == undefined) {
					let love = this.getIsLove(item)
					console.log(love)
					this.$set(item, 'islove', love)
				} else {
					item.islove = this.getIsLove(item)
				}
			}
		},
		methods: {
			playThis(item) {
				this.$store.commit('addPlaylist', item)
			},
			addPlay(item) {
				this.$store.commit('addLaterPlay', item)
				this.$message({
					type: 'success',
					message: '已添加至播放队列',
					offset: 300
				})
			},
			setLove(item) {
				if (item.islove == undefined) {
					this.$set(item, 'islove', true)
				} else {
					item.islove = !item.islove
				}
				let copyItem = this.deepClone(item)
				this.$store.commit('setLove', copyItem)
			},
			getIsLove(music) {
				let result = this.lovelist.findIndex(item => {
					return item.songmid == music.songmid
				})
				if (result == -1) {
					return false
				} else {
					return true
				}
			},
			deepClone(obj) {
				// 先检测是不是数组和Object
				// let isMap = Object.prototype.toString.call(obj) === '[object Map];
				// let isSet = Object.prototype.toString.call(obj) === '[object Set];
				// let isArr = Object.prototype.toString.call(obj) === '[object Array]';
				let isArr = Array.isArray(obj)
				let isJson = Object.prototype.toString.call(obj) === '[object Object]'
				if (isArr) {
					// 克隆数组
					let newObj = []
					for (let i = 0; i < obj.length; i++) {
						newObj[i] = this.deepClone(obj[i])
					}
					return newObj
				} else if (isJson) {
					// 克隆Object
					let newObj = {}
					for (let i in obj) {
						newObj[i] = this.deepClone(obj[i])
					}
					return newObj
				}
				// 不是引用类型直接返回
				return obj
			},
			down(item) {
				this.$Api.getPlaySrc(item).then(res => {
					console.log(res)
					if (res.data.items[0].vkey != '') {
						let src = 'http://ws.stream.qqmusic.qq.com/' + res.data.items[0].filename + '?fromtag=0&guid=126548448&vkey=' +
							res.data.items[0].vkey
						downloadFile(src,item.songname+'.mp3').then(res=>{
							if(res== 'success'){
								this.$message({
									type:"success",
									message:item.songname + '下载成功',
									offset:300
								})
							}
						})
					}
				})
			},
			addToCreateList(menu,item){
				let obj = {
					list:menu,
					music:item
				}
				this.$store.commit('addToCreated',obj)
			}
		},
		filters: {
			formatDuratin(time) {
				var m = parseInt(time / 60)
				var s = time % 60
				return (m > 9 ? m : '0' + m) + ':' + (s > 9 ? s : '0' + s)
			}
		},
		watch: {
			list(newList) {
				this.list = newList;
				for (let i = 0; i < this.list.length; i++) {
					let item = this.list[i]
					if (item.islove == undefined) {
						let love = this.getIsLove(item)
						this.$set(item, 'islove', love)
					} else {
						item.islove = this.getIsLove(item)
					}
				}
			}
		}
	}
</script>


<style scoped>
	.musiclist .title span {
		font-size: 13px;
		color: rgb(125, 125, 125);
	}

	.musiclist .title {
		margin-bottom: 10px;
	}

	.music-container .music-item {
		padding: 12px 5px;
		margin-bottom: 5px;
		cursor: pointer;
		border-radius: 4px;
	}

	.music-container .music-item:hover {
		background-color: rgb(242, 242, 242);
	}

	.music-item span {
		font-size: 13px;
		color: rgb(0, 0, 0);
	}

	.myiconicon-test {
		margin-right: 5px;
	}

	.myiconxihuan {
		color: rgb(255, 102, 100);
	}

	.myiconicon-test:hover {
		color: rgb(255, 102, 100);
	}

	.songname {
		position: relative;
	}

	.albumdesc {
		color: rgb(247, 247, 247);
	}

	.song_msg {
		width: 100%;
		display: inline-block;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	.music-item .tool-btn {
		/* display: inline-block; */
		width: 120px;
		display: none;

		color: rgb(122, 122, 122);
	}

	.music-item:hover .song_msg {
		width: calc(100% - 130px);
	}

	.music-item:hover .tool-btn {
		display: inline-block;

	}

	.tool-btn .iconfont {
		font-size: 18px;
		margin-right: 3px;
	}

	.tool-btn .iconfont:hover {
		color: rgb(32, 212, 184)
	}

	.no-data {
		position: absolute;
		left: 50%;
		top: 250px;
		transform: translate(-50%, -50%);
	}
	.listTitle{
		color:#000000;
		margin-bottom: 15px;
	}
	.
	.listitem{
		width: 100%;
		padding: 15px 0;
		margin:5px 0;
		cursor: pointer;
		padding: 5px;
	}
	.listitem:hover{
		background-color: rgb(217, 217, 217);
	}
</style>
