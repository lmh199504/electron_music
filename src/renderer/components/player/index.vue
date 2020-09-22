<template>
    <div class="player">
        <div class="progress">
            <el-slider v-model="percent" :format-tooltip="formatTooltip" @change="changeTime"></el-slider>
        </div>
        <div class="container">
            <div class="left item">
                <div class="left-music-img">
                    <img :src="player_bg" alt="" width="40px" />
                    <i class="iconfont myiconxiangshang" @click="show = true"></i>
                    <div class="mask"></div>
                </div>
                <div class="left-tool">
                    <p v-if=" songReady || playingLyric == 'QQ音乐，让生活充满音乐' ">{{ playingLyric }}</p>
                    <p v-else>{{ currentSong.songname }}/{{ currentSong.singer }}</p>
                    <div style="margin-top: 3px;">
                        <i class="iconfont myiconicon-test love" title="我喜欢" :class="{ 'myiconicon-test':!islove,'myiconxihuan': islove}" @click="setLove"></i>
                        <i class="iconfont myicondownload down" title="下载歌曲" @click="down(currentSong)"></i>
                        <i class="iconfont myicongengduo more" title="更多"></i>
                    </div>
                </div>
            </div>
            <div class="center item">
                <i class="mode iconfont  c_color" :class="{'myiconliebiaoxunhuan':mode==3,'myiconsuijibofang':mode==2,'myicondanquxunhuan':mode==1}" @click="changeMode"></i>
                <i class="iconfont myiconshangyishou c_color" @click="prev"></i>
                <div class="stop-play"><i :class="{ iconfont: true, myiconbofang1: !playing, myiconzanting_huaban: playing }" @click="togglePlay"></i></div>
                <i class="iconfont myiconxiayishou c_color" @click="next"></i>
                <el-popover class="volumn" placement="bottom" width="20" trigger="click" :tabindex="10000">
                    <el-slider v-model="voice" @change=changeVoice>
                    </el-slider>
                    <i class="iconfont myiconvolume_icon c_color" slot="reference"></i>
                </el-popover>
            </div>
            <div class="right item">
                <div class="cur_end_time">{{ currentTime | formatDuratin }}/{{ currentSong.interval ? currentSong.interval : 0 | formatDuratin }}</div>
                <div class="ci" :class="{ 'active': showDeskLyric}" @click="createNewWin">词</div>
                <div @click="rightShow = true">
                    <i class="iconfont myiconliebiao" style="color:rgb(30, 205, 153)"></i>
                    <span class="songLength">{{ playlist.length }}</span>
                </div>
            </div>
        </div>
        <div :class="{ big_player: true, active: show }">
            <div class="head">
                <div class="hide_player" @click="show = false"><i class="iconfont myiconxia"></i></div>
                <div class="screen_btn">
                    <i class="iconfont myiconquanpingzuidahua" @click="fullScreen"></i>
                    <i class="el-icon-minus" @click="minWIn"></i>
                    <i class="iconfont myiconzuidahua" @click="maxWin"></i>
                    <i class="el-icon-close" @click='hideWin'></i>
                </div>
            </div>
            <div class="content">
                <div class="coverPic"><img :src="player_bg" alt="" /></div>
                <div class="lyric-container">
                    <div class="songMsg">
                        <h3 class="songName">{{ currentSong.songname ? currentSong.songname :'暂无'}}</h3>
                        <p class="singerName">歌手：{{ currentSong.singer ? currentSong.singer :'暂无' }}</p>
                        <p class="albumname">专辑：{{ currentSong.albumname ? currentSong.albumname : '暂无' }}</p>
                    </div>
                    <div class="songLyric">
                        <scroll class="middle-r" ref="lyricList" :data="currentLyric && currentLyric.lines">
                            <div class="lyric-wrapper">
                                <div v-if="currentLyric">
                                    <p ref="lyricLine" class="text" :class="{ current: currentLineNum === index }" v-for="(line, index) in currentLyric.lines" :key="index">
                                        {{ line.txt }}
                                    </p>
                                </div>
                                <div class="pure-music" v-show="isPureMusic">
                                    <p>{{ pureMusicLyric }}</p>
                                </div>
                            </div>
                        </scroll>
                    </div>
                </div>
            </div>
            <div class="footer ">
                <div class="progress" style="padding: 0 30px;">
                    <el-slider v-model="percent" :format-tooltip="formatTooltip" @change="changeTime"></el-slider>
                </div>
                <div class="container">
                    <div class="left item" style=" line-height: 50px; ">
                        <div class="left-tool">
                            <i class="iconfont love" :class="{ 'myiconicon-test':!islove,'myiconxihuan': islove}" title="我喜欢" @click="setLove"></i>
                            <i class="iconfont myicondownload down" title="下载歌曲" @click="down(currentSong)"></i>
                            <i class="iconfont myicongengduo more" title="更多"></i>
                            <span class="cur_end_time">{{ currentTime | formatDuratin }}/ {{ currentSong.interval ? currentSong.interval:0 | formatDuratin }}</span>
                        </div>
                    </div>
                    <div class="center item">
                        <i class="mode iconfont  c_color" :class="{'myiconliebiaoxunhuan':mode==3,'myiconsuijibofang':mode==2,'myicondanquxunhuan':mode==1}" @click="changeMode"></i>
                        <i class="iconfont myiconshangyishou c_color" @click="prev"></i>
                        <div class="stop-play"><i :class="{ iconfont: true, myiconbofang1: !playing, myiconzanting_huaban: playing }" @click="togglePlay"></i></div>
                        <i class="iconfont myiconxiayishou c_color" @click="next"></i>
                        <el-popover class="volumn" style="top:10px" placement="bottom" width="20" trigger="click" :tabindex="10000">
                            <el-slider v-model="voice" @change=changeVoice>
                            </el-slider>
                            <i class="iconfont myiconvolume_icon c_color" slot="reference"></i>
                        </el-popover>
                    </div>
                    <div class="right item">
                        <div class="ci" :class="{ 'active': showDeskLyric}"  @click="createNewWin">词</div>
                        <div @click="rightShow = true">
                            <i class="iconfont myiconliebiao" style="color:rgb(30, 205, 153)"></i>
                            <span class="songLength">{{ playlist.length }}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div id="background" class="wall"></div>
            <div id="midground" class="wall" :class="{ active: playing }"></div>
            <div id="foreground" class="wall" :class="{ active: playing }"></div>
            <div id="top" class="wall" :class="{ active: playing }"></div>
            <div class="player_bg" :style="`background:url(${player_bg}) no-repeat;background-size:cover;background-position: 50%;`"></div>
            <div class="player_mask"></div>
        </div>
        <div :class="{ rightSongList: true, active: rightShow }">
            <playsonglist></playsonglist>
        </div>
        <div :class="{ rightSongListMask: true, active: rightShow }" @click="rightShow = false"></div>
        <audio ref="audio" @playing="ready" @error="error" @timeupdate="updateTime" @ended="end" @pause="paused"></audio>
    </div>
</template>
<script>
import {
    mapGetters
} from 'vuex'
import Lyric from 'lyric-parser'
import playsonglist from '../playsonglist/index.vue'
import scroll from '../scroll/scroll.vue'
import {
    playMode
} from '../../common/js/config.js'
import {
    isLoveMixin
} from '../../common/js/mixin.js'
import {
    isLove
} from '../../utils/love.js'
import { downloadFile } from '../../utils/download.js'
const { remote,ipcRenderer } = require('electron');

const BrowserWindow = remote.BrowserWindow;
const screen =  remote.screen;
const { height } = screen.getPrimaryDisplay().workAreaSize
const timeExp = /\[(\d{2}):(\d{2}):(\d{2})]/g

export default {
    mixins: [isLoveMixin],
    data() {
        return {
            show: false,
            percent: 0, // 歌曲进度
            rightShow: false,
            // player_bg:"https://y.gtimg.cn/music/photo_new/T002R300x300M000002Cw7M230PBpZ.jpg?max_age=2592000"
            player_bg: 'https://xiaohongll.oss-cn-beijing.aliyuncs.com/lmh.jpg?t='+Math.random(),
            songName: 'QQ音乐',
            singerName: 'QQ',
            albumname: 'QQ',

            // 播放歌曲相关
            voice: 50, // 音量
            songReady: false,
            currentTime: 0,
            radius: 32,
            currentLyric: null,
            currentLineNum: 0,
            playingLyric: 'QQ音乐，让生活充满音乐',
            isPureMusic: false,
            pureMusicLyric: 'QQ音乐，让生活充满音乐',
            islove: false,
            mode: '3', // 1单曲  2// 随机  3//列表
            full: false,
            isMax: false,
			lyricWindowid:'', //歌词窗口id,
			showDeskLyric:true,
        }
    },
    computed: {
        ...mapGetters(['playlist', 'currentSong', 'playing', 'currentIndex', 'lovelist'])
    },

    components: {
        scroll,
        playsonglist
    },
    created() {
        if (this.currentSong && this.currentSong.songmid) {
            this.islove = this.getIsLove(this.currentSong)
            this.$Api.getPlaySrc(this.currentSong).then(res => {
                if (res.data.items && res.data.items[0].vkey != '') {
                    let src = 'http://ws.stream.qqmusic.qq.com/' + res.data.items[0].filename + '?fromtag=0&guid=126548448&vkey=' +
                        res.data.items[0].vkey
                    this.$refs.audio.src = src
                    // this.getLyric();
                    this.player_bg = this.currentSong.img
                } else {
                    // console.log("..................")
                    if (this.playlist.length > 1) {
                        let index = this.currentIndex + 1
                        if (index === this.playlist.length) {
                            index = 0
                        }
                        this.$store.commit('setIndex', index)
                    }
                }
            })
        }
		
		
		remote.globalShortcut.register("CommandOrControl+right",()=>{
		  // console.log("您按下了ctrl + G");
		  this.next()
		  
		})
		
		remote.globalShortcut.register("CommandOrControl+left",()=>{
		  // console.log("您按下了ctrl + G");
		  this.prev()
		  
		})
		
		remote.globalShortcut.register("CommandOrControl+up",()=>{
		  // console.log("您按下了ctrl + G");
		  if(this.voice < 100){
			  this.voice ++
			  this.$refs.audio.volume = this.voice / 100
		  }
		  
		})
		
		remote.globalShortcut.register("CommandOrControl+down",()=>{
		  // console.log("您按下了ctrl + G");
		  // console.log(this.voice)
		  if(this.voice > 0){
			this.voice --
			this.$refs.audio.volume = this.voice / 100
			
		  }
		  
		})
		
    },
    mounted() {
        this.$nextTick(() => {
            this.$refs.audio.volume = this.voice / 100
        })
        document.onkeydown = (e) => {
            // console.log(e)
            if (e.keyCode == 27) {
                this.full = false;
                this.$Win.fullScreen(this.full)
            }
        }
    },
    methods: {
        fullScreen() {
            this.full = !this.full
            this.$Win.fullScreen(this.full);
			this.createNewWin()
        },
        minWIn() {
            this.$Win.minWindow()
        },
        maxWin() {
            this.isMax = !this.isMax
            this.$Win.maxWindow(this.isMax)
        },
        hideWin() {
            this.$Win.hide()
        },
        format(time) {
            time = parseInt(time)
            var m = parseInt(time / 60)
            var s = time % 60
            return (m > 9 ? m : '0' + m) + ':' + (s > 9 ? s : '0' + s)
        },
        formatTooltip(val) {
            if (this.playing) {
                return this.format(this.currentSong.interval / 100 * val)
            } else {
                return '未播放歌曲'
            }
        },
        changeVoice(val) {
			this.voice = val
            this.$refs.audio.volume = val / 100
			
        },
        changeTime(val) {
            if (this.playing) {
                this.$refs.audio.currentTime = this.currentSong.interval / 100 * val
                this.currentLyric.seek(this.currentSong.interval / 100 * val * 1000)
            }
        },
        ready() {
            clearTimeout(this.timer)
            // 监听 playing 这个事件可以确保慢网速或者快速切换歌曲导致的 DOM Exception
            this.songReady = true
            this.canLyricPlay = true
            this.$store.commit('addHistory', this.currentSong)
            // 如果歌曲的播放晚于歌词的出现，播放的时候需要同步歌词
            if (this.currentLyric && !this.isPureMusic) {
                this.currentLyric.seek(this.currentTime * 1000)
            }
        },
        error() {},
        updateTime() {
            this.currentTime = this.$refs.audio.currentTime
            this.percent = (this.$refs.audio.currentTime / this.$refs.audio.duration) * 100
        },
        end() {
            this.currentTime = 0
            if (this.mode === '1') {
                this.loop()
            } else {
                this.next()
            }
        },
        loop() {
            this.$refs.audio.currentTime = 0
            this.$refs.audio.play()
            this.$store.commit('setPlaying', true)
            if (this.currentLyric) {
                this.currentLyric.seek(0)
            }
        },
        next() {
            if (!this.songReady) {
                return
            }
            if (this.playlist.length === 1) {
                this.loop()
            } else {
                if (this.mode == 1) { // 单曲
                    this.loop()
                } else if (this.mode == 2) { // 随机
                    let len = this.playlist.length
                    let index = parseInt(Math.random() * len)

                    this.$store.commit('setIndex', index)
                    // this.setCurrentIndex(index);
                    if (!this.playing) {
                        this.togglePlay()
                    }
                } else if (this.mode == 3) { // 列表
                    let index = this.currentIndex + 1
                    if (index === this.playlist.length) {
                        index = 0
                    }
                    this.$store.commit('setIndex', index)
                    // this.setCurrentIndex(index);
                    if (!this.playing) {
                        this.togglePlay()
                    }
                }
            }
        },
        prev() {
            if (!this.songReady) {
                return
            }
            if (this.playlist.length === 1) {
                this.loop()
            } else {
                if (this.mode == 1) {
                    this.loop()
                } else if (this.mode == 2) {
                    let len = this.playlist.length
                    let index = parseInt(Math.random() * len)

                    this.$store.commit('setIndex', index)
                    // this.setCurrentIndex(index);
                    if (!this.playing) {
                        this.togglePlay()
                    }
                } else if (this.mode == 3) {
                    let index = this.currentIndex - 1
                    if (index === -1) {
                        index = this.playlist.length - 1
                    }
                    this.$store.commit('setIndex', index)
                    // this.setCurrentIndex(index);
                    if (!this.playing) {
                        this.togglePlay()
                    }
                }
            }
        },
        paused() {},
        togglePlay() {
            if (this.currentSong != null && this.currentSong.songmid) {
                if (this.playing == true) {
                    this.$refs.audio.pause()
                    if (this.currentLyric) {
                        this.currentLyric.stop()
                    } else {
                        this.getLyric()
                    }

                    this.$store.commit('setPlaying', false)
                } else {
                    this.$refs.audio.play()
                    if (this.currentLyric) {
                        this.currentLyric.play(this.currentTime * 1000)
                    } else {
                        this.getLyric()
                    }
                    if (this.$refs.audio.src == '') {
                        this.next()
                    }
                    this.$store.commit('setPlaying', true)
                }
            }
        },
        handleLyric({
            lineNum,
            txt
        }) {
            if (!this.$refs.lyricLine) {
                return
            }
            this.currentLineNum = lineNum
            // console.log(this.currentLineNum);
            if (lineNum > 5) {
                let lineEl = this.$refs.lyricLine[lineNum - 5]
                // console.log(lineEl);
                this.$refs.lyricList.scrollToElement(lineEl, 1000)
            } else {
                this.$refs.lyricList.scrollTo(0, 0, 1000)
            }
            this.playingLyric = txt
			console.log(txt)
			ipcRenderer.send('postlyric',txt);
			

        },
        getLyric() {
            this.$Api
                .getSongLyric(this.currentSong.songmid)
                .then(lyric => {
                    // console.log(lyric);
                    // if (this.currentSong.lyric !== lyric) {
                    // 	return;
                    // }
                    this.currentLyric = new Lyric(lyric, this.handleLyric)
                    // console.log(this.currentLyric);
                    this.isPureMusic = !this.currentLyric.lines.length
                    this.currentLyric.play()
                    if (this.isPureMusic) {
                        this.pureMusicLyric = this.currentLyric.lrc.replace(timeExp, '').trim()
                        this.playingLyric = this.pureMusicLyric
                    } else {
                        if (this.playing && this.canLyricPlay) {
                            // 这个时候有可能用户已经播放了歌曲，要切到对应位置
                            this.currentLyric.seek(this.currentTime * 1000)
                        }
                    }
                })
                .catch(() => {
                    this.currentLyric = null
                    this.playingLyric = ''
                    this.currentLineNum = 0
                })
        },
        reset() {
            this.songReady = false
            this.playingLyric = 'QQ音乐，让生活充满音乐'
            this.$refs.audio.pause()
            this.currentTime = 0
            this.duration = 0
            this.percent = 0
            if (this.currentLyric) {
                this.currentLyric.stop()
                this.currentLyric = null
            }
            this.player_bg = 'https://xiaohongll.oss-cn-beijing.aliyuncs.com/lmh.jpg?t='+Math.random()
        },
        setLove() {
            this.islove = !this.islove
            this.$store.commit('setLove', this.currentSong)
        },
        changeMode() {
            if (this.mode == 3) {
                this.mode = 1
            } else {
                this.mode++
            }

            // console.log(this.mode)
            switch (this.mode) {
                case 1:
                    this.$message({
                        type: 'success',
                        message: '单曲循环',
                        offset: 300
                    })
                    break
                case 2:
                    this.$message({
                        type: 'success',
                        message: '随机播放',
                        offset: 300
                    })
                    break
                case 3:
                    this.$message({
                        type: 'success',
                        message: '列表循环',
                        offset: 300
                    })
                    break
                default:
                    break
            }
        },
        down(item) {
        	if(item.songmid == undefined){
        		return false
        	}
			
            this.$Api.getPlaySrc(item).then(res => {
                console.log(res)
                if (res.data.items[0].vkey != '') {
                    let src = 'http://ws.stream.qqmusic.qq.com/' + res.data.items[0].filename + '?fromtag=0&guid=126548448&vkey=' +
                        res.data.items[0].vkey
                    downloadFile(src, item.songname + '.mp3').then(res => {
                        if (res == 'success') {
                            this.$message({
                                type: "success",
                                message: item.songname + '下载成功',
                                offset: 300
                            })
                        }
                    })
                }
            })
        },
		createNewWin(){
			this.showDeskLyric = !this.showDeskLyric;
			ipcRenderer.send('ctrlLyWin',this.showDeskLyric)
		}
    },

    watch: {
        currentSong(newSong, oldSong) {
            if (!newSong.songid || newSong.songid === oldSong.songid) {
                this.$message({
                    type: 'wraning',
                    message: '与当前歌曲相同',
                    offset: 300
                })
                return
            }
            this.islove = this.getIsLove(this.currentSong)
            // console.log(newSong);
			this.$Api.getMusicVKey(newSong).then(res=>{
				console.log(JSON.parse(res))
				if(JSON.parse(res).req_0.data.midurlinfo[0].vkey != ''){
					let src = 'http://ws.stream.qqmusic.qq.com/' +JSON.parse(res).req_0.data.midurlinfo[0].filename + '?fromtag=0&guid=126548448&vkey=' +
					    JSON.parse(res).req_0.data.midurlinfo[0].vkey

	
					console.log(src)
					this.$refs.audio.src = src
					if (this.currentLyric) {
					    this.currentLyric.stop()
					    // 重置为null
					    this.currentLyric = null
					    this.currentTime = 0
					    this.playingLyric = ''
					    this.currentLineNum = 0
					}
					
					this.getLyric()
					this.$refs.audio.play()
					this.$store.commit('setPlaying', true)
					this.player_bg = this.currentSong.img
				}else{
					console.log("等待5秒")
					setTimeout(()=>{
					    if (this.currentLyric) {
					        this.currentLyric.stop()
					        // 重置为null
					        this.currentLyric = null
					        this.currentTime = 0
					        this.playingLyric = ''
					        this.currentLineNum = 0
					    }
					    this.$message({
					        type: 'error',
					        message: 'VIP歌曲',
					        offset: 300
					    })
					
					    if (this.playlist.length > 1) {
					        // this.songReady = true
					        this.next()
					    }
					},5000)
				}
				
			}).catch(err=>{
				console.log(err)
			})
     //        this.$Api.getPlaySrc(newSong).then(res => {
     //            console.log(res);

     //            if (res.data.items[0].vkey != '') {
     //                let src = 'http://ws.stream.qqmusic.qq.com/' + res.data.items[0].filename + '?fromtag=0&guid=126548448&vkey=' +
     //                    res.data.items[0].vkey
     //                this.$refs.audio.src = src
     //                if (this.currentLyric) {
     //                    this.currentLyric.stop()
     //                    // 重置为null
     //                    this.currentLyric = null
     //                    this.currentTime = 0
     //                    this.playingLyric = ''
     //                    this.currentLineNum = 0
     //                }

     //                this.getLyric()
     //                this.$refs.audio.play()
     //                this.$store.commit('setPlaying', true)
     //                this.player_bg = this.currentSong.img
     //                // console.log('.....')
     //            } else {
     //                // 下一首
					// console.log("等待5秒")
     //                setTimeout(()=>{
     //                    if (this.currentLyric) {
     //                        this.currentLyric.stop()
     //                        // 重置为null
     //                        this.currentLyric = null
     //                        this.currentTime = 0
     //                        this.playingLyric = ''
     //                        this.currentLineNum = 0
     //                    }
     //                    this.$message({
     //                        type: 'error',
     //                        message: 'VIP歌曲',
     //                        offset: 300
     //                    })

     //                    if (this.playlist.length > 1) {
     //                        // this.songReady = true
     //                        this.next()
     //                    }
     //                },5000)
     //            }
     //        })
        },
        playlist(newList) {
            if (newList.length == 0) {
                this.reset()
            }
        },
        lovelist() {
            this.islove = this.getIsLove(this.currentSong)
        },


    },
    filters: {
        formatDuratin(time) {
            time = parseInt(time)
            var m = parseInt(time / 60)
            var s = time % 60
            return (m > 9 ? m : '0' + m) + ':' + (s > 9 ? s : '0' + s)
        }
    }
}
</script>
<style scoped>
.big_player {
    transition: all 0.4s ease;
    width: 100%;
    height: 100%;
    position: fixed;
    background: rgb(41, 42, 43);
    top: 100%;
    left: 0px;
    z-index: 1200;
}

.big_player.active {
    top: 0;
}

.hide_player {
    height: 100%;
    width: 30px;
}

.hide_player i {
    font-weight: bold;
    font-size: 18px;
}

.screen_btn i,
.hide_player i {
    margin-left: 10px;
    color: rgb(160, 162, 166);
    cursor: pointer;
}

.screen_btn i:hover,
.hide_player:hover i {
    color: rgb(30, 205, 155);
}

.player_bg {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -10;
    filter: blur(65px);
    opacity: 0.6;
    transform: translateZ(0);
    display: block;
}

.player_mask {
    background-color: rgba(0, 0, 0, 0.35);
    z-index: -9;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

.container {
    display: flex;
    padding: 0 30px;
}

.item {
    flex: 1;
    display: flex;
}

.left {
    text-align: left;
}

.left-music-img {
    width: 40px;
    height: 40px;
    border-radius: 5px;
    overflow: hidden;
    cursor: pointer;
    position: relative;
}

.left-music-img .mask {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: #111;
    opacity: 0;
}

.left-music-img:hover .mask {
    opacity: 0.3;
}

.left-music-img .myiconxiangshang {
    position: absolute;
    top: 50%;
    left: 50%;
    font-size: 35px;
    color: rgb(231, 230, 237);
    transform: translate(-50%, -50%);
    z-index: 3;
    display: none;
    animation: moveUp 0.4s ease;
}

.left-music-img:hover .myiconxiangshang {
    display: block;
}

@keyframes moveUp {
    from {
        top: 100%;
    }

    to {
        top: 50%;
    }
}

.left-tool {
    margin-left: 5px;
    cursor: pointer;
    width: calc(100% - 50px);
}

.left-tool p {
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.left-tool .love:hover {
    color: rgb(255, 114, 114);
}

.left-tool .myiconxihuan {
    color: rgb(255, 114, 114);
}

.left-tool .down:hover {
    color: rgb(37, 205, 151);
}

.left-tool .more:hover {
    color: rgb(37, 205, 151);
}

.left-tool .iconfont {
    margin-right: 5px;
    font-size: 16px;
}

.center {
    text-align: center;
    justify-content: center;
}

.progress {
    padding: 0 5px;
}

.center .iconfont {
    font-size: 20px;
    margin: 10px;
    cursor: pointer;
}

.center .c_color:hover {
    color: rgb(30, 205, 153);
}

.center .stop-play {
    display: inline-block;
    height: 35px;
    width: 35px;
    border-radius: 50%;
    background: rgb(30, 206, 155);
    position: relative;
    margin-top: 2px;
}

.stop-play .iconfont {
    position: absolute;
    top: 50%;
    left: 50%;
    color: #fff;
    transform: translate(-50%, -50%);
    margin: initial;
}

.right {
    text-align: right;
    justify-content: flex-end;
    cursor: pointer;
    line-height: 55px;
}

.cur_end_time {
    color: rgb(140, 140, 140);
    font-size: 14px;
    margin-right: 5px;
}

.ci {
    color: rgb(140, 140, 140);
    margin-right: 5px;
}
.ci.active{
	color:rgb(30, 205, 153);
}

.songLength {
    color: rgb(30, 206, 156);
    font-size: 14px;
}

.rightSongList {
    position: absolute;
    right: -300px;
    height: 100%;
    top: 0;
    width: 300px;
    /* background: rgb(30, 207, 157); */
    box-shadow: 50px 50px 0px 0px rgb(248, 248, 248);
    background-color: #fff;
    z-index: 1222;
    transition: all 0.4s ease;
}

.rightSongList.active {
    right: 0;
}

.rightSongListMask {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: transparent;
    z-index: 1221;
    display: none;
}

.rightSongListMask.active {
    display: block;
}

.head {
    width: 100%;
    height: 60px;
    display: flex;
    justify-content: space-between;
    padding: 0 20px;
    line-height: 60px;
}

.content {
    width: 100%;
    height: calc(100% - 170px);
    display: flex;
}

.footer {
    width: 100%;
    height: 90px;
    color: rgb(138, 140, 145);
}

.content .coverPic,
.content .lyric-container {
    position: relative;
    flex: 1;
}

.content .lyric-container {
    text-align: center;
    /* background-color: red; */
    height: 100%;
}

.lyric-wrapper {
    /* height: 100%; */
    overflow: hidden;
}

.content .coverPic img {
    width: 60%;
    /* height: calc(60vw); */
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    max-width: 400px;
}

.middle-r {
    display: inline-block;
    vertical-align: top;
    width: 100%;
    height: 100%;
    overflow: hidden;
}

.songMsg {
    height: 100px;
}

.songLyric {
    overflow: hidden;
    height: calc(100% - 170px);
}

.text {
    margin-bottom: 15px;
    color: rgb(230, 230, 231);
    font-size: 14px;
}

.current {
    color: rgb(30, 207, 157);
}

.songName {
    margin-top: 60px;
    color: #fff;
    margin-bottom: 20px;
}

.singerName,
.albumname {
    color: rgb(158, 160, 165);
    font-size: 12px;
    margin-top: 10px;
}

.big_player .center .iconfont {
    color: #fff;
}

.big_player .center .iconfont:hover {
    color: rgb(31, 212, 184);
}

.big_player .center .stop-play .iconfont:hover {
    color: #fff;
}

.volumn {
    position: relative;
    top: 10px;
}




/* //动画背景 */

.wall {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: -4;
}

div#midground {
    z-index: -8;
    -webkit-animation: cc 100s linear infinite;
    -moz-animation: cc 100s linear infinite;
    -o-animation: cc 100s linear infinite;
    animation: cc 100s linear infinite;
}

div#midground.active {
    background: url('../../static/images/midground.png');
}

div#foreground {
    z-index: -7;
    -webkit-animation: cc 153s linear infinite;
    -o-animation: cc 153s linear infinite;
    -moz-animation: cc 153s linear infinite;
    animation: cc 153s linear infinite;
}

div#foreground.active {
    background: url('../../static/images/foreground.png');
}

div#top {
    z-index: -6;
    -webkit-animation: dd 100s linear infinite;
    -o-animation: dd 100s linear infinite;
    animation: da 100s linear infinite;
}

div#top.active {
    background: url('../../static/images/midground.png');
}

@-webkit-keyframes cc {
    from {
        background-position: 0 0;
        transform: translateY(10px);
    }

    to {
        background-position: 600% 0;
    }
}

@-o-keyframes cc {
    from {
        background-position: 0 0;
        transform: translateY(10px);
    }

    to {
        background-position: 600% 0;
    }
}

@-moz-keyframes cc {
    from {
        background-position: 0 0;
        transform: translateY(10px);
    }

    to {
        background-position: 600% 0;
    }
}

@keyframes cc {
    0% {
        background-position: 0 0;
    }

    100% {
        background-position: 600% 0;
    }
}

@keyframes da {
    0% {
        background-position: 0 0;
    }

    100% {
        background-position: 0 600%;
    }
}

@-webkit-keyframes da {
    0% {
        background-position: 0 0;
    }

    100% {
        background-position: 0 600%;
    }
}

@-moz-keyframes da {
    0% {
        background-position: 0 0;
    }

    100% {
        background-position: 0 600%;
    }
}

@-ms-keyframes da {
    0% {
        background-position: 0 0;
    }

    100% {
        background-position: 0 600%;
    }
}
</style>
<style>
.player .el-slider__bar {
    height: 2px;
    background-color: rgb(30, 205, 153);
}

.player .el-slider__runway {
    height: 2px;
}

.player .el-slider__button {
    height: 10px;
    width: 10px;
    background-color: rgb(30, 205, 153);
}

.player .el-slider__button-wrapper {
    top: -17px;
}
</style>