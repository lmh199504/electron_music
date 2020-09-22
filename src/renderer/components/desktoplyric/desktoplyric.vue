<template>
	<div class="desktoplyric">
		<div class="lyric">
			{{ playLyric }}
		</div>
		<div class="color_container">
			<div class="color_item">1</div>
			<div class="color_item">2</div>
			<div class="color_item">3</div>
			<div class="color_item">4</div>
		</div>
	</div>
</template>

<script>

	const { ipcRenderer} = require('electron')
	export default{
		data(){
			return{
				playLyric:'所谓伊人，在水一方.'
			}
				
		},
		created(){
			
		},
		mounted(){

			ipcRenderer.on('getlyric',(event,arg)=>{
				console.log(arg)
				this.playLyric = arg
			})
			ipcRenderer.on('LyWin',(event,arg)=>{
				if(arg  == true){
					this.$Win.show()
				}else{
					this.$Win.hide()
				}
			})
			
		}
	}
	
</script>

<style scoped>
	body{
		border-radius: 10px;
	}
	.desktoplyric{
		cursor: pointer;
		height: 100%;
		background: transparent;
		-webkit-app-region: drag;
		overflow: hidden;
	}
	.lyric{
		/* background: transparent; */
		background: rgba(0,0,0,0.1);
		border-radius: 10px;
		height: 100%;
		line-height: 70px;
		text-align: center;
		font-family: 'loverabbit';
		font-size: 30px;
		cursor: pointer;
		color: #43C1B4;
	}
	.color_container{
		position: absolute;
		bottom: 5px;
		display: flex;
		justify-content: space-between;
		width: 100px;
		margin: auto;
		left: 50%;
		margin-left: -50px;
		cursor: pointer;
		display: none;
	}
	.color_item{
		background-color: #000000;
		width: 15px;
		height: 15px;
		border-radius: 5px;
	}
	.desktoplyric:hover .color_container{
		display: block;
	}
</style>
