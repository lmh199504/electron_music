<template>
	<div id="app">
		<router-view></router-view>
		<!-- <layout></layout> -->


		<div class="enter_action" :class="{'enter_action_hide':enter_action_hide,'enter_action_hide_':enter_action_hide_}">
			<div class="enter_text">
				<p v-for="(item,index) in text" :key="index">
					{{ item }}
				</p>
			</div>
			<div id="stars">
				<div class="star" style="top: 0px;left: 500px;"></div>
			</div>
		</div>
	</div>
</template>
<script>

	const { ipcRenderer} = require('electron')
	// import { quit } from './utils/window.js'
	import { arr } from './utils/text.js'
	import layout from './components/layout/index.vue'
	import { save,read } from './utils/saveStore.js'

	export default {
		name: 'my-project',
		data(){
			return{
				text:[],
				enter_action_hide:false,
				enter_action_hide_:false
			}
		},
		components: {
			layout
		},
		computed: {
			mystate: function() {
				return this.$store.state
			}
		},
		created() {
			ipcRenderer.on('exit',(event,arg)=>{
				var id = localStorage.getItem('lyricWindowid');
				if(id != null && id != undefined && id != ''){
					ipcRenderer.sendTo(Number(id),'exit','exit')
				}
				
				if(this.$route.path == '/desktoplyric'){
					return
				}
				
				
				this.$store.dispatch('set_playing', false).then(() => {
					save(JSON.stringify(this.$store.state)).then(res=>{
						this.$message({
							type:"success",
							message:res
						})
						this.$Win.quit()
					}).catch(err=>{
						this.$message({
							type:"success",
							message:'存储失败'+err
						})
						console.log(err)
						this.$Win.quit()
					})
				})
			})


			// 在页面加载时读取localStorage里的状态信息


			read().then(res=>{
				const data = JSON.parse(res)
				this.$store.replaceState(Object.assign({}, this.$store.state, data))
			}).catch(err=>{
				console.log(err)
			})
				
				// localStorage.removeItem('store')


			// 在页面刷新时将vuex里的信息保存到localStorage里
			window.addEventListener('beforeunload', () => {
				this.$store.commit('setPlaying', false)
				save(JSON.stringify(this.$store.state)).then(res=>{
					console(res)
				}).catch(err=>{
					console.log(err)
				})
				
				// localStorage.setItem('store', JSON.stringify(this.$store.state))
			})

			const index = parseInt(Math.random()*arr.length);
			this.text = arr[index].split('\n');

		},
		mounted() {
			console.log(this.$route.path)
			if(this.$route.path == '/desktoplyric'){
				this.enter_action_hide = true;
				this.enter_action_hide_ = true;
				return
			}
			this.$nextTick(() => {
				var stars = document.getElementById('stars')

				// js随机生成流星
				for (var j = 0; j < 20; j++) {
					var newStar = document.createElement("div")
					newStar.className = "star"
					newStar.style.top = randomDistance(500, -100) + 'px'
					newStar.style.left = randomDistance(1980, 300) + 'px'
					stars.appendChild(newStar)
				}

				// 封装随机数方法
				function randomDistance(max, min) {
					var distance = Math.floor(Math.random() * (max - min + 1) + min)
					return distance
				}

				var star = document.getElementsByClassName('star')

				// 给流星添加动画延时
				for (var i = 0, len = star.length; i < len; i++) {
					star[i].style.animationDelay = i % 6 == 0 ? '0s' : i * 0.8 + 's'
				}
			});
			setTimeout(()=>{
				this.enter_action_hide = true;
			},6000)
			setTimeout(()=>{
				this.enter_action_hide_ = true;
			},7000)
		}
	}
</script>
<style>
	@font-face{
		font-family: 'loverabbit';
		src : url('style/fonts/loverabbit.ttf');
	}
	body{
		background: transparent;
	}
	
	@import url('style/index.css');

	#app {
		min-width: 1020px;
		width: 100%;
		height: 100%;
		overflow: hidden;
	}

	
	.enter_action {
		top: 0;
		left: 0;
		position: fixed;
		width: 100%;
		background: #000000;
		height: 100%;
		z-index: 99999;
		background: #000000;
		transition: all 0.6s ease;
	}
	.enter_action_hide{
		/* display: none; */
		opacity: 0;
	}
	.enter_action_hide_{
		display: none;
	}
	#stars {
		width: 100%;
	}

	.star {
		display: block;
		width: 5px;
		height: 5px;
		border-radius: 50%;
		background: #FFF;
		position: absolute;
		transform-origin: 100% 0;
		animation: star-ani 4s linear infinite;
		-webkit-animation: star-ani 5s linear infinite;
		box-shadow: 0 0 5px 5px rgba(255, 255, 255, .3);
		opacity: 0;
		z-index: 2;
	}

	.star:after {
		content: '';
		display: block;
		top: 0px;
		left: 4px;
		border: 0px solid #fff;
		border-width: 0px 90px 2px 90px;
		border-color: transparent transparent transparent rgba(255, 255, 255, .3);
		transform: rotate(-45deg) translate3d(1px, 3px, 0);
		box-shadow: 0 0 1px 0 rgba(255, 255, 255, .1);
		transform-origin: 0% 100%;
	}

	@keyframes star-ani {
		0% {
			opacity: 0;
			transform: scale(0) translate3d(0, 0, 0);
		}

		20% {
			opacity: 0.8;
			transform: scale(0.2) translate3d(-100px, 100px, 0);
		}

		40% {
			opacity: 0.8;
			transform: scale(0.4) translate3d(-200px, 200px, 0);
		}

		60% {
			opacity: 0.8;
			transform: scale(0.6) translate3d(-300px, 300px, 0);
		}

		80% {
			opacity: 1;
			transform: scale(1) translate3d(-350px, 350px, 0);
		}

		100% {
			opacity: 1;
			transform: scale(1.2) translate3d(-400px, 380px, 0);
		}
	}
	.enter_action p{
		font-family:'loverabbit' ;
		text-align: center;
		color:#fff;
		line-height: 30px;
		font-size:18px ;
		
	}
	.enter_text{
		position: absolute;
		top:50%;
		left:50%;
		transform: translate(-50%,-50%);
	}
	/* CSS */
</style>
