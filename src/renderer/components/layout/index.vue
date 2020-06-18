<template>
	<div class="layout" @click="active_menu=false">
		<div class="left">
			<div class="left-head"><img src="../../static/images/logo.png" alt="" /></div>
			<div class="left-menu">
				<p class="left-menu-title">在线音乐</p>
				<router-link to="/musichall" class="left-menu-item">
					<i class="iconfont myiconyinle1"></i>
					<span>音乐馆</span>
				</router-link>
				<router-link to="/video" class="left-menu-item">
					<i class="iconfont myiconshipin"></i>
					<span>视频</span>
				</router-link>
				<router-link to="/radio" class="left-menu-item">
					<i class="iconfont myicondiantai"></i>
					<span>电台</span>
				</router-link>
				<p class="left-menu-title">我的音乐</p>
				<router-link to="/love" class="left-menu-item">
					<i class="iconfont myiconxihuan"></i>
					<span>我喜欢</span>
				</router-link>
				<router-link to="/down" class="left-menu-item">
					<i class="iconfont myicondiannao"></i>
					<span>本地和下载</span>
				</router-link>
				<router-link to="/history" class="left-menu-item">
					<i class="iconfont myiconliebiao"></i>
					<span>历史播放</span>
				</router-link>
				<router-link to="/try" class="left-menu-item">
					<i class="iconfont myiconziyuan"></i>
					<span>试听列表</span>
				</router-link>

				<div class="my-collapse">
					<div class="collapse-head" @click="active_my = !active_my">
						<div class="title">创建的歌单</div>

						<div class="ctrl">
							<i class="el-icon-plus" @click="addMyList($event)"></i>
							<i :class="{ 'el-icon-arrow-right': !active_my, 'el-icon-arrow-down': active_my }"></i>
						</div>
					</div>
					<div class="collapse-item-wrap" :class="{ active: active_my }">
						<div class="collapse-item left-menu-item" @click="toMyCreate(item)" @contextmenu.prevent="itemCtrl($event)" @mousedown="active_menu = false" @mouseup="active_menu = true" v-for="(item,index) in createList" :key="index">{{item.dissname}}</div>
					</div>
				</div>

				<div class="my-collapse">
					<div class="collapse-head" @click="active_sc = !active_sc">
						<div class="title">收藏的歌单</div>
						<div class="ctrl"><i :class="{ 'el-icon-arrow-down': active_sc, 'el-icon-arrow-right': !active_sc }"></i></div>
					</div>
					<div class="collapse-item-wrap" :class="{ active: active_sc }">
						<div class="collapse-item left-menu-item" @click="toCollection(item)" @contextmenu.prevent="itemCtrl($event)" @mousedown="active_menu = false" @mouseup="active_menu = true" v-for="item in collection" :key="item.dissid">{{ item.dissname }}</div>

					</div>
				</div>

				<!-- 				<el-collapse v-model="activeNames">
				  <el-collapse-item title="创建的歌单" name="1">
					<div class="my_song_list">创建歌单</div>
				    <div class="my_song_list">星弟许嵩许嵩许嵩许嵩许嵩</div>
				    <div class="my_song_list">许嵩许嵩许嵩许嵩</div>
				  </el-collapse-item>
				  <el-collapse-item title="收藏的歌单" name="2">
				    <div class="my_song_list">星弟</div>
				    <div class="my_song_list">许嵩许嵩许嵩许嵩许嵩许嵩</div>
				  </el-collapse-item>
				</el-collapse> -->
			</div>
		</div>
		<div class="right">
			<div class="header">
				<div class="drag"></div>
				<rhead></rhead>
			</div>
			<div class="main" @scroll="myScroll($event)" @toTop="toTop" ref="main">
				<transition><router-view></router-view></transition>
				<el-backtop target=".main" :bottom="70"></el-backtop>
			</div>
			<div class="footer"><player></player></div>
		</div>
		<div class="contextmenu" :class="{'active':active_menu}" ref="contextmenu">
			<div class="menu-item"><i class="iconfont myiconbofang1"></i><span>播放</span></div>
			<div class="menu-item"><i class="iconfont myiconshanchu"></i><span>删除</span></div>
			<div class="menu-item"><i class="iconfont myiconshu"></i><span>重命名</span></div>
		</div>
		<div class="menumask"></div>
	</div>
</template>
<script>
import rhead from '../rhead/index.vue';
import player from '../player/index.vue';
import {mapGetters} from 'vuex'
export default {
	name: 'layout',
	data() {
		return {
			activeNames: [],
			active_sc: false,
			active_my: false,
			active_menu:false,
			
		};
	},
	computed:{
		...mapGetters(['collection','createList'])
	},
	components: {
		rhead,
		player,
	},
	methods: {
		myScroll($event) {
			// console.log($event.target.scrollTop);
			if ($event.target.scrollTop == 0) {
				this.$store.commit('setTop', true);
				console.log(this.$store.state.isTop);
			} else {
				this.$store.commit('setTop', false);
			}
		},
		toTop() {
			this.$refs.main.scrollTop = 0;
		},
		addMyList($event) {
			$event.stopPropagation();
			
			this.$prompt('', '创建歌单', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				// inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
				// inputErrorMessage: '邮箱格式不正确'
			})
			.then(({ value }) => {
				if(value!=''&& value!=null){
					let obj = {
						dissname:value,
						dissid:new Date().getTime(),
						songlist:[]
					}
					this.$store.commit('addCreate',obj);
					this.$message({
						type: 'success',
						message: '创建成功' 
					});
				}
				
			})
			.catch(() => {
				this.$message({
					type: 'info',
					message: '取消输入'
				});
			});
		},
		itemCtrl($event){
			let top =  $event.clientY
			if(window.innerHeight - 160 < $event.clientY){
				top = $event.clientY - 160
			}
			this.$refs.contextmenu.style.top = top + 'px'
			this.$refs.contextmenu.style.left = ($event.clientX + 30) + 'px'
			this.active_menu = true;
		},
		toMyCreate(item){
			this.$router.push({
				path:"/discoDetail",
				query:{
					item:item,
					type:'my'	
				}
			}).catch(err=>{
				console.log(err)
			})
		},
		toCollection(item){
			this.$router.push({
				path:"/discoDetail",
				query:{
					item:item
				}
			}).catch(err=>{
				console.log(err)
			})
		}
		
	},

};
</script>
<style scoped>
.drag {
	position: absolute;
	height: 25px;
	/* background: red; */
	width: 100%;
	top: 1px;
	-webkit-app-region: drag;
}
* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
}
.layout {
	display: flex;
	width: 100%;
	height: 100%;
}

.left {
	width: 210px;
	height: 100%;
	padding: 20px;
}

.left .left-head {
	width: 100%;
	height: 30px;
	overflow: hidden;
	text-align: center;
}

.left .left-head img {
	width: 100px;
	/*height:30px;*/
}

.left .left-menu {
	height: calc(100vh - 50px);
	overflow-x: hidden;
	overflow-y: auto;
	/*padding: 40px 0 0 0 ;*/
}

.left .left-menu-title {
	margin-top: 40px;
	padding-left: 20px;
	color: rgb(120, 120, 120);
	font-size: 12px;
}

.left .left-menu .left-menu-item {
	box-sizing: border-box !important;
	width: 100%;
	height: 30px;
	margin-top: 10px;
	color: rgb(48, 48, 48);
	font-size: 14px;
	padding: 5px 20px;
	border-radius: 5px;
	display: block;
	text-decoration: none;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}

.left-menu-item:hover {
	background: rgb(216, 216, 216);
}

.left .left-menu .left-menu-item.active {
	background: rgb(30, 205, 153);
	color: #fff;
}

.right {
	width: calc(100% - 210px);
	height: 100%;
	padding: 15px 15px 0 15px;
}

.header {
	width: 100%;
	height: 70px;
}

.main {
	height: calc(100% - 150px);
	/*background: red;*/
	overflow-y: scroll;
	overflow-x: hidden;
	position: relative;
}

.footer {
	height: 80px;
	width: 100%;
	/* background: red; */
}

.v-enter {
	opacity: 0;
	transform: translateX(100px);
}
.v-leave-to {
	opacity: 0;
	transform: translateX(-100px);
	position: absolute;
	/* z-index: 1; */
}
.v-enter-active,
.v-leave-active {
	transition: all 0.4s ease;
}

.my_song_list {
	overflow: hidden;
	width: 100%;
	text-overflow: ellipsis;
	white-space: nowrap;
}
.my-collapse {
	margin-top: 20px;
	padding: 0 20px;
}
.my-collapse .collapse-head {
	display: flex;
	align-items: center;
	justify-content: space-between;
}
.collapse-head .title,
.collapse-head .ctrl {
	color: rgb(120, 120, 120);
	font-size: 12px;
	cursor: pointer;
}
.collapse-head .title:hover {
	color: rgb(48, 48, 48);
}
.collapse-head .ctrl i {
	margin-left: 10px;
	font-weight: bold;
	transition: all 0.4s ease;
}
.my-collapse .collapse-item {
	padding: 5px 0px;
}
.collapse-item-wrap {
	height: 0;
	overflow: hidden;
	transition: all 0.4s ease;
}
.collapse-item-wrap.active {
	height: auto;
}
.contextmenu{
	width: 160px;
	top:0;
	left:0;
	position: absolute;
	display: none;
	background-color: #fff;
	border-radius: 10px;
	padding: 15px 0; 
	box-shadow:0px 4px 12px rgba(235,235,235,1);
	z-index: 20;
}
.contextmenu.active{
	display: block;
}
.contextmenu .menu-item{
	width: 100%;
	padding: 10px;
	cursor: pointer;
	font-size: 12px;
}
.contextmenu .menu-item i {
	margin-right: 15px;
}
.contextmenu .menu-item:hover{
	background-color: rgb(216, 216, 216);
}
.menumask{
	width: 100%;
	height: 100%;
	position: fixed;
	left: 0;
	top: 0;
	z-index: 19;
	display: none;
}
</style>

<style>
.layout .el-collapse {
	padding: 0 20px;
	border-top: 0px;
	border-bottom: 0px;
}
.layout .el-collapse-item__header,
.layout .el-collapse-item__wrap {
	border: none;
}
</style>
