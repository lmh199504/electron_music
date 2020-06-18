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
				playLyric:'每天两首歌'
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
	.desktoplyric{
		cursor: pointer;
		height: 100%;
		/* background: transparent; */
		-webkit-app-region: drag;
	}
	.lyric{
		/* background: transparent; */
		height: 100%;
		line-height: 70px;
		text-align: center;
		font-family: 'loverabbit';
		font-size: 30px;
		cursor: pointer;
		/* color: #000000; */
	}
</style>
