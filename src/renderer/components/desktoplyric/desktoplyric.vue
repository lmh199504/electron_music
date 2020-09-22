<template>
	<div class="desktoplyric">
		<div class="lyric">
			{{ playLyric }}
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
</style>
