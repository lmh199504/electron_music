<template>
	<div class="mydown">
		<div class="mycontainer">
			<div class="btn_group">
				<button @click="playAll" class="btn play">
					<i class="iconfont myiconbofang"></i>
					<span>播放全部</span>
				</button>
				<!-- <button class="btn" @click="clean">
					<i class="iconfont myiconshanchu"></i>
					<span>清空</span>
				</button> -->
			</div>
		</div>
		<div class="mycontainer">
			<musiclist :list="list"></musiclist>
		</div>
	</div>
</template>

<script>
	import musiclist from '../musiclist/index.vue'
	const downloadPath = 'D:/MUSIC';
	const path = require("path");
	
	const fs = require('fs');
	export default {
		data() {
			return {
				list: [],
				url:''
			}

		},
		created() {
			this.getDownList();
		},
		components:{
			musiclist
		},
		methods: {
			getFilename(filepath = () => {
				throw new Error
			}, type = 1) {
				
				let result = '';
				if (type === 1) {
					result = path.basename(filepath);
					// console.log(result)
				} else if (type === 2) {
					result = path.extname(filepath);
				} else {
					let basename = path.basename(filepath);
					let extname = path.extname(filepath);
					result = basename.substring(0, basename.indexOf(extname));
				}
				return result;
			},
			playAll(){
				this.$store.commit('setPlaylist', this.list)
				this.$store.commit('setIndex', 0)
			},
			readDownMp3(){
				var that = this;
				return new Promise((resolve,reject)=>{
					let arr = [];
					fs.readdir(downloadPath,function(err,files){
						if(err){
							reject(err)
						}else{
							let mypath = '';
							for (let i = 0; i < files.length; i++) {
								if(path.extname(files[i]) == '.mp3'){
									mypath = path.resolve(downloadPath, files[i]) + path.sep
									let stat = fs.statSync(mypath);
									
									
									if (stat.isFile()) {
										var resolvePath = fs.realpathSync(mypath);
										arr.push({
											url:resolvePath,
											name:that.getFilename(resolvePath).replace('.mp3','')
										})
									}
								}
							}
							resolve(arr)
							// console.log(arr)
						}
					})
				})
				
				
			},
			
			async getDownList(){
				let re = await this.readDownMp3()

				for(let i = 0;i<re.length;i++){
					let qsResult = await this.$Api.querySong(re[i].name);

					re[i].img = qsResult[0].img;
					re[i].albumdesc = qsResult[0].albumdesc;
					re[i].albumname = qsResult[0].albumname;
					re[i].interval = qsResult[0].interval
					re[i].singer = qsResult[0].singer;
					re[i].songid = qsResult[0].songid;
					re[i].songmid = qsResult[0].songmid;
					re[i].songname = qsResult[0].songname;
				}
				this.list = re;
			}

		}
	}
</script>

<style scoped>
	.btn_group{
		margin: 20px 0;
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

</style>
