import Vue from 'vue'
import Vuex from 'vuex'

import {
	createPersistedState,
	createSharedMutations
} from 'vuex-electron'

import modules from './modules'

Vue.use(Vuex)

export default new Vuex.Store({
	modules,
	state: {
		isTop: true,
		currentIndex: -1,
		playlist: [],

		playing: false,
		lovelist: [],
		history: [], // 播放历史
		createList: [], //用户创建的歌单
		collection: [] //用户收藏的歌单
	},
	getters: {
		currentSong: (state) => {
			return state.playlist[state.currentIndex] || {}
		},
		currentIndex(state) {
			return state.currentIndex
		},
		playlist(state) {
			return state.playlist
		},
		playing(state) {
			return state.playing
		},
		lovelist(state) {
			return state.lovelist
		},
		history(state) {
			return state.history
		},
		createList(state) {
			return state.createList
		},
		collection(state) {
			return state.collection
		}


	},
	mutations: {
		setTop(state, str) {
			state.isTop = str
		},
		setPlaylist(state, obj) {
			state.playlist = obj
		},
		addPlaylist(state, music) { // 添加并播放
			let result = state.playlist.findIndex(item => {
				return music.songmid == item.songmid
			})
			if (result == -1) { // -1 列表中不存在
				let i = state.currentIndex + 1
				state.playlist.splice(i, 0, music)
				state.currentIndex = i
			} else { // 已经存在
				// state.playlist.splice(result,1);
				state.currentIndex = result
			}
		},
		addLaterPlay(state, music) { // 添加至稍后播放
			let result = state.playlist.findIndex(item => {
				return music.songmid == item.songmid
			})
			if (result == -1) {
				let i = state.currentIndex + 1
				state.playlist.splice(i, 0, music) // 添加至列表
			} else {
				console.log('已存在该歌曲')
			}
		},
		setIndex(state, index) {
			state.currentIndex = index
		},

		setPlaying(state, bool) {
			state.playing = bool
			return Promise.resolve()
		},
		setLove(state, music) {
			let result = state.lovelist.findIndex(item => {
				return item.songmid == music.songmid
			})
			if (result == -1) {
				state.lovelist.push(music)
			} else {
				state.lovelist.splice(result, 1)
			}
		},
		clearLove(state) {
			state.lovelist = []
		},
		addHistory(state, music) {
			let result = state.history.findIndex(item => {
				return item.songmid == music.songmid
			})
			if (result == -1) { // 不在历史中
				state.history.unshift(music)
			} else { // 已在历史中
				state.history.splice(result, 1)
				state.history.unshift(music)
			}
		},
		clearHistory(state) {
			state.history = []
		},
		addCreate(state, obj) { //创建新的歌单
			let result = state.createList.findIndex((item) => {
				return obj.dissname = item.dissname
			})
			if (result == -1) {
				state.createList.push(obj)
			}
		},
		addToCreated(state, obj) { // 添加歌曲到歌单
			console.log('新的歌曲')
			let listItem = state.createList.find(item => {
				return obj.list.dissid == item.dissid
			})
			if (listItem) {
				let index = listItem.songlist.findIndex((item) => {
					return obj.music.songmid == item.songmid
				})
				if (index == -1) {
					listItem.songlist.push(obj.music)
				}
			}

		},

		addCollection(state, obj) { //收藏新的歌单
			console.log(obj)
			let result = state.collection.findIndex((item) => {
				return obj.dissid == item.dissid
			})
			if (result == -1) { //不存在
				state.collection.push(obj)
			} else {

			}
		},


	},
	// plugins: [
	//   createPersistedState(),
	//   createSharedMutations()
	// ],
	strict: process.env.NODE_ENV !== 'production'
})
