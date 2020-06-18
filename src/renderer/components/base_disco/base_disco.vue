<template>
	<div class="base_disco">
		<div class="gedan" style="position: relative;">
			<div class="mycontainer">
				<el-row :gutter="20">
					<el-col :xs="6" :sm="6" :md="6" :lg="4" v-for="item in list" :key="item.dissid">
						<div class="item-container">
							<div class="item" :style="`background: url(${item.imgurl}) 0 0 no-repeat;background-size:cover;`" @click="toDetail(item)">
								<div class="mask">
									
								</div>
								<div class="playIcon">
									<img src="../../static/images/cover_play@2x.png" alt="">
								</div>
								<div class="listennum">
									{{ item.listennum | numberFormat}}
								</div>
							</div>
							<div class="item-foot">
								<p class="dissname">{{item.dissname}}</p>
								<p class="creator">{{item.creator.name}}</p>
							</div>
						</div>
					</el-col>
				</el-row>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		props:{
			list:{
				type:Array,
				default:()=>{
					return []
				}
			}
		},
		data(){
			return{
				
			}
		},
		created(){
			
		},
		methods: {
		  toDetail (item) {
		    this.$router.push({
		      path: '/discoDetail',
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
		      return (num / 10000).toFixed(1) + 'W'
		    }
		  }
		}
		
	}
	
</script>

<style scoped>
	.base_disco{
		width: 100%;
	}
	
	
	.item-container {
		position: relative;
		padding-top: 10px;
		height: 210px;
	}
	
	.item-container .item {
		background-size:cover;
		height: 160px;
		cursor: pointer;
		transition: all 0.4s ease;
		border-radius: 10px;
		position: relative;
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
	.item .playIcon{
		width: 50px;
		height: 50px;
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%,-50%) scale(0.5);
		opacity: 0;
	}
	.item:hover .playIcon{
		opacity: 1;
		transform: scale(1) translateZ(0) translate(-50%,-50%);
		transition-property: opacity,transform;
		transition-duration: .5s;
	}
	.playIcon img{
		width:100%;
		height: 100%;
	}
	
	.item-container .item:hover {
		margin-top: -10px;
	}
	.item:hover .listennum{
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
	.item-foot{
		position: absolute;
		bottom: 0;
		width:100%;
	}
	.dissname{
		/* width: 100%; */
		white-space: nowrap;
		overflow: hidden;
		-o-text-overflow: ellipsis;
		text-overflow: ellipsis;
		font-size: 14px;
		/* margin-bottom:; */
		color:rgb(0, 0, 0);
		cursor: pointer;
	}
	.dissname:hover,.creator:hover{
		color:rgb(30, 206, 155)
	}
	.creator{
		font-size: 13px;
		color:rgb(123, 123, 123);
		cursor: pointer;
	}

</style>
