<template>
	<div class="musichall">
		<h1 :class="{'head-title':true,'active':!$store.state.isTop}">音乐馆</h1>
		<el-tabs v-model="activeName" @tab-click="handleClick" :class="{'isFixed':!$store.state.isTop}">
			<el-tab-pane label="精选" name="first" :lazy="true">
				<jingxuan></jingxuan>
			</el-tab-pane>
			<el-tab-pane label="排行" name="second" :lazy="true">
				<paihang></paihang>
			</el-tab-pane>
			<el-tab-pane label="歌手" name="third" >
				<singer :activeName="activeName"></singer>
			</el-tab-pane>
			<el-tab-pane label="分类歌单" name="fourth" :lazy="true">
				<categories></categories>
			</el-tab-pane>
			<el-tab-pane label="数字专辑" name="fifth" :lazy="true">
				<allbumList></allbumList>
			</el-tab-pane>
			<el-tab-pane label="有声节目" name="sixth" :lazy="true">
				<radio></radio>
			</el-tab-pane>
		</el-tabs>
	</div>
</template>

<script>
import jingxuan from './musichallchild/jingxuan.vue'
import paihang from './musichallchild/paihang.vue'
import singer from './musichallchild/singer.vue'
import categories from './musichallchild/categories.vue'
import allbumList from './musichallchild/allbumList.vue'
import radio from './musichallchild/radio.vue'
 
export default {
  data () {
    return {
      activeName: 'first'
    }
  },
  components: {
    jingxuan,
    paihang,
    singer,
    categories,
    allbumList,
	radio
  },
  methods: {
    handleClick () {

    },
    scroll () {

    }
  }
}
</script>

<style scoped>
	.musichall{
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
