<template>
	<div class="down">
		<h1 :class="{'head-title':true,'active':!$store.state.isTop}">本地和下载</h1>
		<el-tabs v-model="activeName" :class="{'isFixed':!$store.state.isTop}">
			<el-tab-pane label="本地歌曲" name="first" :lazy="true">
				
			</el-tab-pane>
			<el-tab-pane label="下载歌曲" name="second" :lazy="true">
				<mydown></mydown>
			</el-tab-pane>
			<el-tab-pane label="下载的视频" name="third" :lazy="true">
				
			</el-tab-pane>
			<el-tab-pane label="正在下载" name="four" :lazy="true">
				
			</el-tab-pane>
		</el-tabs>
	</div>
</template>


<script>
	import mydown from './downchild/mydown.vue'
	export default{
		data(){
			return{
				activeName:"first"
			}
		},
		components:{
			mydown
		}
	}
</script>


<style scoped>
	.down{
		width:100%;
		height: 100%;
	}
	.head-title{
		padding: 0 40px;
		margin-top:10px;
		transition: all 0.4s ease;
	}
	.head-title.active{
		font-size: 0px;
	}
</style>

<style>
	.isFixed .el-tabs__header{
		/*position: fixed;*/
		position: fixed;
		top: 85px;
		background: #fff;
		width: 100%;
		z-index: 10;
	}
</style>