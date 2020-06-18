<template>
	<div class="love">
		<div class="mycontainer" :class="{ 'ishide':ishide }">
			<div class="btn_group">
				<button @click="playAll" class="btn play">
					<i class="iconfont myiconbofang"></i>
					<span>播放全部</span>
				</button>
				<button class="btn" @click="clean">
					<i class="iconfont myiconshanchu"></i>
					<span>清空</span>
				</button>
			</div>
		</div>
		
		<div class="mycontainer">
			<musiclist :list="copylist"></musiclist>
		</div>
	</div>
</template>

<script>
	import musiclist from './musiclist/index.vue'
	import { mapGetters } from 'vuex'
export default{
	props:{
		ishide:{
			type:Boolean,
			default:()=>{
				return false
			}
		}
	},
	  data () {
	    return {
	      copylist: [],
		  
	    }
	  },
	  computed: {
	    ...mapGetters(['lovelist'])
	  },
	  components: {
	    musiclist
	  },
	  created () {
	    this.copylist = this.deepClone(this.lovelist)
	},
	  methods: {
	    playAll () {
	      this.$store.commit('setPlaylist', this.lovelist)
	      this.$store.commit('setIndex', 0)
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
	    },
	    clean () {
	      this.$store.commit('clearLove')
	    }
	  },
	  watch: {
	    lovelist (newVal) {
	      this.copylist = this.deepClone(this.lovelist)
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
	.ishide{
		display: none;
	}
</style>
