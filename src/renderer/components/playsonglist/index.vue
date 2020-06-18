<template>
	
	<div class="playsonglist">
		<h3 class="title">播放队列</h3>
		<div class="top-ctrl">
			<div class="songLength">{{playlist.length}}首歌曲</div>
			<div>
				<i class="iconfont myiconshanchu" title="清空播放队列" @click="clean"></i>
			</div>
		</div>
		<div class="song-container">
			<div class="item" v-for="(item,index) in copyPlayList" :key="index">
				<div class="singer_song">
					<p class="songname">{{ item.songname}}</p>
					<p class="singer">{{ item.singer }}</p>
				</div>
				<div class="time">
					{{ item.interval | formatDuratin }}
				</div>
				<div class="ctrl">
					<i class="iconfont myiconbofang" @click="playThis(item)"></i>
					<i class="iconfont myiconxihuan" :class="{ 'islove':item.islove }" @click="setLove(item)"></i>
					<i class="iconfont myicongengduo"></i>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
import { isLoveMixin } from '../../common/js/mixin.js'
export default{
  mixins: [isLoveMixin],
  data () {
    return {
      copyPlayList: []
    }
  },

  computed: {
    ...mapGetters(['playlist', 'currentSong', 'mode', 'playing'])
  },
  created () {
    this.copyPlayList = this.deepClone(this.playlist)
    this.setItemLove()
  },
  methods: {
    clean () {
      this.$store.commit('setPlaylist', [])
      this.$store.commit('setPlaying', false)
      this.$store.commit('setIndex', -1)
    },
    playThis (item) {
      this.$store.commit('addPlaylist', item)
    },
    setLove (item) {
      this.$store.commit('setLove', item)
    },
    setItemLove () {
      for (let i = 0; i < this.copyPlayList.length; i++) {
        let item = this.copyPlayList[i]
        // console.log(item.islove)
        if (item.islove == undefined) {
          let love = this.getIsLove(item)

          this.$set(item, 'islove', love)
        } else {
          item.islove = this.getIsLove(item)
        }
      }
    },

    deepClone (obj) {
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
    }
  },
  filters: {
    formatDuratin (time) {
      time = parseInt(time)
      var m = parseInt(time / 60)
      var s = time % 60
      return (m > 9 ? m : '0' + m) + ':' + (s > 9 ? s : '0' + s)
    }
  },
  watch: {
    playlist () {
      this.copyPlayList = this.deepClone(this.playlist)
      this.setItemLove()
    },
    lovelist () {
      this.copyPlayList = this.deepClone(this.playlist)
      this.setItemLove()
    }

  }
}
</script>

<style scoped>
	
	.playsonglist{
		height: 100%;
		width: 100%;
	}
	.title{
		padding:10px 30px  ;
	}
	.top-ctrl{
		padding: 0 30px;
		display: flex;
		justify-content: space-between;
	}
	.song-container{
		height: calc(100% - 80px);
		overflow-x: hidden;
		overflow-y: scroll;
		margin-top: 10px;
	}
	.item{
		cursor: pointer;
		width: 100%;
		padding: 10px 10px 10px 30px;
		display: flex;
		margin-bottom: 10px;
		height: 60px;
		overflow: hidden;
	}
	.item:hover{
		background-color: rgb(248, 248, 248);
		
	}
	.item:hover .time{
		display: none;
	}
	.item:hover .singer_song{
		width: calc(100% - 110px);
	}
	.item:hover .ctrl{
		display: block;
	}
	.singer_song{
		width: calc(100% - 60px);
	}
	.songname{
		width: 100%;
		overflow: hidden;
		font-size: 13px;
		margin-bottom: 5px;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.singer{
		font-size: 12px;
		color: rgb(128, 128, 128);
		text-overflow: ellipsis;
		white-space: nowrap;
		width: 100%;
		overflow: hidden;
	}
	.ctrl{
		width: 100px;
		display: none;
		line-height: 40px;
		text-align: right;
	}
	.ctrl .iconfont{
		color:rgb(125, 125, 125);
		font-size: 18px;
		margin-left: 3px;
	}
	.ctrl .iconfont:hover{
		color:rgb(30, 205, 155);
	}
	.time{
		width: 50px;
		color: rgb(179, 179, 179);
		text-align: right;
		line-height: 40px;
		font-size: 12px;
	}
	.songLength{
		font-size: 13px;
		color:rgb(128, 128, 128);
	}
	.top-ctrl .iconfont{
		cursor: pointer;
	}
	.top-ctrl .iconfont:hover{
		color: rgb(30, 205, 153);
	}
	.ctrl .islove{
		color:rgb(255, 114, 114);
	}
	.ctrl .islove:hover{
		color:rgb(255, 114, 114);
	}
</style>
