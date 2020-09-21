<template>
	<div class="center">
		<div class="mycontainer top">
			<div class="coverImg">
				<img src="../../static/images/center-head.jpg" alt=""> 
			</div>
			<div class="top-right">
				<h1 style="margin-top: 5px;">{{singer}} <img src="../../static/images/lu.jpg" alt="" width="30px"></h1>
					
				<div class="updatatime">
					音乐口味：星弟、华语流行、中国风
				</div>
				<div class="updatatime">
					<span>粉丝：1</span>
					<span>关注：4</span>
				</div>
			</div>
		</div>
		
		<div>
			<el-tabs v-model="activeName">
				<el-tab-pane name="first" label="我喜欢">
					<love :ishide="true"></love>
				</el-tab-pane>
				<el-tab-pane name="second" label="创建的歌单"> </el-tab-pane>
				<el-tab-pane name="third" label="上传的视频"> </el-tab-pane>
			</el-tabs>
			
		</div>
	</div>
</template>

<script>
	import love from '../love.vue'
	export default{
		data(){
			return{
				coverImg:'../../static/images/center-head.jpg',
				singer:'海绵宝宝',
				activeName:'first'
			}
		},
		components:{
			love
		}
	}
</script>

<style scoped>
	.center{
		padding-top: 30px;
	}
	.top{
		
		display: flex;
		margin-bottom: 20px;
		width: 100%;
	}
	.top .coverImg{
		width: 170px;
		height: 170px;
		border-radius: 50%;
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
	.updatatime{
		padding-left: 5px;
		color:rgb(125, 125, 125);
		font-size: 12px;
		line-height: 80px;
		height: 75px;
	}
</style>
