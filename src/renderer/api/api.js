import axios from 'axios'

import {
	apiBaseUrl
} from './config.js'

import {
	Base64
} from 'js-base64'

import rp from 'request-promise'



export const querySong = (query) => {
	return new Promise((resolve, reject) => {
		rp({
			uri: apiBaseUrl + '/soso/fcgi-bin/client_search_cp',
			qs: {
				aggr: 1,
				cr: 1,
				flag_qc: 0,
				p: 1,
				n: 10,
				w: query
			},
			method: 'GET'
		}).then(res => {
			let data = res
			data = data.slice(9, data.length - 1)
			const list = JSON.parse(data).data.song.list
			const listArr = []
			// console.log(list)
			for (let i = 0; i < list.length; i++) {
				listArr.push({
					img: 'http://imgcache.qq.com/music/photo/album_300/17/300_albumpic_' + list[i].albumid + '_0.jpg',
					singer: list[i].singer[0].name,
					songid: list[i].songid,
					songmid: list[i].songmid,
					songname: list[i].songname,
					albumname: list[i].albumname,
					interval: list[i].interval,
					albumdesc: list[i].lyric
				})
			}
			resolve(listArr)
		}).catch(err => {
			reject(err)
		})
	})
}


export const getSearchByKey = (key, catZhida) => {
	return new Promise((resolve, reject) => {
		rp({
			url: apiBaseUrl + '/soso/fcgi-bin/client_search_cp',
			method: 'GET',
			qs: {
				g_tk: 1124214810,
				loginUin: 0,
				hostUin: 0,
				inCharset: 'utf8',
				outCharset: 'utf-8',
				notice: 0,
				platform: 'yqq.json',
				needNewCode: 0,
				format: 'json',
				outCharset: 'utf-8',
				ct: 24,
				qqmusic_ver: 1298,
				new_json: 1,
				remoteplace: 'txt.yqq.song',
				t: 0,
				aggr: 1,
				cr: 1,
				lossless: 0,
				flag_qc: 0,
				n: 10,
				p: 1,
				catZhida: catZhida,
				w: key
			},
			headers: {
				referer: 'https://c.y.qq.com/',
				host: 'c.y.qq.com',
			},
		}).then(res => {
			resolve(res)
		}).catch(err => {
			reject(err)
		})
	})
}



export const getPlaySrc = music => {
	return new Promise((resolve, reject) => {
		rp({
			uri: apiBaseUrl + '/base/fcgi-bin/fcg_music_express_mobile3.fcg',
			method: 'GET',
			qs: {
				format: 'json205361747',
				platform: 'yqq',
				cid: '205361747',
				songmid: music.songmid,
				filename: 'C400' + music.songmid + '.m4a',
				guid: '126548448'
			}
		}).then(res => {
			resolve(JSON.parse(res))
		}).catch(err => {
			reject(err)
		})
	})
}

export const getMusicVKey = (music) => {
	const songmid = music.songmid;
	const _guid = Math.round(2147483647 * Math.random()) * (new Date).getUTCMilliseconds() % 1e10;
	const guid = '126548448'
	const data = {
		req: {
			module: "CDN.SrfCdnDispatchServer",
			method: "GetCdnDispatch",
			param: {
				guid,
				calltype: 0,
				userip: ""
			}
		},
		req_0: {
			module: "vkey.GetVkeyServer",
			method: "CgiGetVkey",
			param: {
				guid,
				songmid: [songmid],
				songtype: [0],
				uin: "0",
				loginflag: 1,
				platform: "20"
			}
		},
		comm: {
			uin: 0,
			format: "json",
			ct: 24,
			cv: 0
		}
	}

	return new Promise((resolve, reject) => {
		rp({
			uri: "https://u.y.qq.com/cgi-bin/musicu.fcg",
			method: 'GET',
			qs: {
				loginUin: 0,
				hostUin: 0,
				g_tk: '1124214810',
				format: 'json',
				inCharset: 'utf8',
				outCharset: 'utf-8',
				notice: 0,
				platform: 'yqq.json',
				needNewCode: 0,
				format: 'json',
				data: JSON.stringify(data),
			},
			headers: {
				referer: 'https://y.qq.com/portal/player.html',
				host: 'u.y.qq.com',
				'content-type': 'application/x-www-form-urlencoded',
			},
		}).then(res => {
			resolve(res)
		}).catch(err => {
			reject(err)
		})
	})
}


export const getDiscList = (categoryId) => {
	return new Promise((resolve, reject) => {
		rp({
			method: 'GET',
			url: 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg',

			qs: {
				g_tk: 1928093487,
				inCharset: 'utf-8',
				outCharset: 'utf-8',
				notice: 0,
				format: 'json',
				platform: 'yqq',
				hostUin: 0,
				sin: 0,
				ein: 29,
				sortId: 5,
				needNewCode: 0,
				categoryId: categoryId,
				rnd: Math.random()

			},
			headers: {
				referer: 'https://c.y.qq.com/',
				host: 'c.y.qq.com'
			},
		}).then(res => {

			resolve(JSON.parse(res).data.list)
		}).catch(err => {
			reject(err)
		})
	})
}

export const getSongList = (disstid) => {
	let data = {
		g_tk: 1928093487,
		inCharset: 'utf-8',
		outCharset: 'utf-8',
		notice: 0,
		format: 'jsonp',
		disstid,
		type: 1,
		json: 1,
		utf8: 1,
		onlysong: 0,
		platform: 'yqq',
		hostUin: 0,
		needNewCode: 0
	}
	return new Promise((resolve, reject) => {
		rp({
			uri: 'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg',
			method: 'GET',
			qs: data,
			headers: {
				referer: 'https://c.y.qq.com/',
				host: 'c.y.qq.com'
			},
		}).then(res => {
			// console.log(res)


			resolve(res)

		}).catch(err => {
			reject(err)
		})
	})
}

export const getSinger = (pagenum) => {
	return new Promise((resolve, reject) => {
		rp({
			uri: apiBaseUrl + '/v8/fcg-bin/v8.fcg',
			method: 'GET',
			qs: {
				g_tk: 1928093487,
				inCharset: 'utf-8',
				outCharset: 'utf-8',
				notice: 0,
				format: 'jsonp',
				channel: 'singer',
				page: 'list',
				key: 'all_all_all',
				pagesize: 100,
				pagenum: pagenum,
				hostUin: 0,
				needNewCode: 0,
				platform: 'yqq',
				jsonpCallback: 'jp1'
			}
		}).then(res => {
			let data = JSON.parse(res.slice(5, res.length - 1))
			resolve(data)
		}).catch(err => {
			reject(err)
		})
	})
}

export const getSingerDeatil = (singerId) => {
	return new Promise((resolve, reject) => {
		rp({
			uri: apiBaseUrl + '/v8/fcg-bin/fcg_v8_singer_track_cp.fcg',
			method: 'GET',
			qs: {
				singermid: singerId,
				g_tk: 1928093487,
				inCharset: 'utf-8',
				outCharset: 'utf-8',
				notice: 0,
				format: 'jsonp',
				hostUin: 0,
				needNewCode: 0,
				platform: 'yqq',
				order: 'listen',
				begin: 0,
				num: 80,
				songstatus: 1,
				jsonpCallback: 'jp1'
			}
		}).then(res => {
			let data = JSON.parse(res.slice(5, res.length - 1))

			resolve(data)
		}).catch(err => {
			reject(err)
		})
	})
}

export const getTopList = () => {
	return new Promise((resolve, reject) => {
		rp({
			uri: apiBaseUrl + '/v8/fcg-bin/fcg_myqq_toplist.fcg',
			method: 'GET',
			qs: {
				g_tk: 1928093487,
				inCharset: 'utf-8',
				outCharset: 'utf-8',
				notice: 0,
				format: 'jsonp',
				uin: 0,
				needNewCode: 1,
				platform: 'h5',
				jsonpCallback: 'jp3'
			}
		}).then(res => {
			let data = JSON.parse(res.slice(4, res.length - 1)).data.topList
			resolve(data)
		}).catch(err => {
			reject(err)
		})
	})
}

export const getTopDetail = (topid) => {
	return new Promise((resolve, reject) => {
		rp({
			uri: apiBaseUrl + '/v8/fcg-bin/fcg_v8_toplist_cp.fcg',
			method: 'GET',
			qs: {
				g_tk: 1928093487,
				inCharset: 'utf-8',
				outCharset: 'utf-8',
				notice: 0,
				format: 'jsonp',
				topid: topid,
				needNewCode: 1,
				uin: 0,
				tpl: 3,
				page: 'detail',
				type: 'top',
				platform: 'h5',
				jsonpCallback: 'jp5'
			}
		}).then(res => {
			let data = JSON.parse(res.slice(5, res.length - 1))
			resolve(data)

		}).catch(err => {
			reject(err)
		})
	})
}

export const getSongLyric = (songmid) => {
	return new Promise((resolve, reject) => {
		rp({

			uri: 'https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg',
			method: 'GET',
			qs: {
				g_tk: 1928093487,
				inCharset: 'utf-8',
				outCharset: 'utf-8',
				notice: 0,
				format: 'json',
				songmid: songmid,
				platform: 'yqq',
				hostUin: 0,
				needNewCode: 0,
				categoryId: 10000000,
				pcachetime: 1585214600726

			},
			headers: {
				referer: 'https://c.y.qq.com/',
				host: 'c.y.qq.com',
			},

		}).then(res => {
			let lyric = Base64.decode(JSON.parse(res).lyric)

			resolve(lyric)
		}).catch(err => {
			reject(err)
		})
	})
}



export const getSongListCategories = () => {
	return new Promise((resolve, reject) => {
		rp({
			uri: 'https://c.y.qq.com' + '/splcloud/fcgi-bin/fcg_get_diss_tag_conf.fcg',
			method: "GET",
			headers: {
				referer: 'https://c.y.qq.com/',
				host: 'c.y.qq.com',
			},
			qs: {
				format: 'json',
				outCharset: 'utf-8',
			},

		}).then(res => {
			resolve(res)
		}).catch(e => {
			reject(e)
		})
	})
}


//获取数字专辑

export const getDigitalAlbumLists = () => {
	return new Promise((resolve, reject) => {
		rp({
			uri: apiBaseUrl + '/v8/fcg-bin/musicmall.fcg',
			qs: {
				g_tk: 1928093487,
				loginUin: 0,
				hostUin: 0,
				inCharset: 'utf8',
				outCharset: 'utf-8',
				format: 'json',
				notice: 0,
				platform: 'yqq.json',
				needNewCode: 0,
				format: 'json',
				outCharset: 'utf-8',
				cmd: 'pc_index_new',
			},
			headers: {
				referer: 'https://c.y.qq.com/',
				host: 'c.y.qq.com',
			},
			method: "GET"
		}).then(res => {
			resolve(res);
		}).catch(err => {
			reject(err);
		})
	})
}


//获取专辑信息

export const getAlbumInfo = (albummid) => {
	return new Promise((resolve, reject) => {
		rp({
			url: apiBaseUrl + '/v8/fcg-bin/fcg_v8_album_info_cp.fcg',
			method: "GET",
			qs: {
				g_tk: 1928093487,
				loginUin: 0,
				hostUin: 0,
				inCharset: 'utf8',
				outCharset: 'utf-8',
				format: 'json',
				notice: 0,
				platform: 'yqq.json',
				needNewCode: 0,
				albummid: albummid
			},
			headers: {
				referer: 'https://c.y.qq.com/',
				host: 'c.y.qq.com',
			},
		}).then(res => {
			resolve(res)
		}).catch(err => {
			reject(err)
		})
	})
}


export const getRadioLists = () => {
	return new Promise((resolve, reject) => {
		rp({
			uri: apiBaseUrl + '/v8/fcg-bin/fcg_v8_radiolist.fcg',
			qs: {
				g_tk: 1124214810,
				loginUin: 0,
				hostUin: 0,
				inCharset: 'utf8',
				outCharset: 'utf-8',
				// format: 'json',
				notice: 0,
				platform: 'yqq.json',
				needNewCode: 0,
				format: 'json',
				outCharset: 'utf-8',
				channel: 'radio',
				page: 'index',
				tpl: 'wk',
				new: 1,
				p: Math.round(1),
			},
			method: "GET"
		}).then(res => {
			resolve(res)
		}).catch(err => {
			reject(err)
		})
	})
}


//播放电台

export const getPlayRadio = (radioid) => {
	return new Promise((resolve, reject) => {
		rp({
			uri: 'https://u.y.qq.com/cgi-bin/musics.fcg',
			qs: {
				g_tk: 1124214810,
				loginUin: 0,
				hostUin: 0,
				inCharset: 'utf8',
				outCharset: 'utf-8',
				// format: 'json',
				notice: 0,
				platform: 'yqq.json',
				needNewCode: 0,
				format: 'json',
				data: `{"songlist":{"module":"mb_track_radio_svr","method":"get_radio_track","param":{"id":${radioid},"firstplay":1,"num":10}},"comm":{"ct":24,"cv":0}}`
			},
			method: "GET"
		}).then(res => {
			resolve(res)
		}).catch(err => {
			reject(err)
		})
	})

}


export const getMvByTag = () => {
	return new Promise((resolve, reject) => {
		rp({
			uri: apiBaseUrl + '/mv/fcgi-bin/getmv_by_tag',
			qs: {

				g_tk: 1124214810,
				loginUin: 0,
				hostUin: 0,
				inCharset: 'utf8',
				outCharset: 'utf-8',
				// format: 'json',
				notice: 0,
				platform: 'yqq.json',
				needNewCode: 0,
				format: 'json',
				outCharset: 'GB2312',
				cmd: 'shoubo',
				lan: 'all',
			},
			method: "GET"
		}).then(res => {
			resolve(res)
		}).catch(err => {
			reject(err)
		})
	})
}


//
export const getMvPlay = (vid) => {
	return new Promise((resolve, reject) => {

		const data = {
			comm: {
				ct: 24,
				cv: 4747474
			},
			getMVUrl: {
				module: "gosrf.Stream.MvUrlProxy",
				method: "GetMvUrls",
				param: {
					vids: [vid],
					request_typet: 10001
				}
			},
			mvinfo: {
				module: "video.VideoDataServer",
				method: "get_video_info_batch",
				param: {
					vidlist: [vid],
					required: [
						"vid",
						"type",
						"sid",
						"cover_pic",
						"duration",
						"singers",
						"video_switch",
						"msg",
						"name",
						"desc",
						"playcnt",
						"pubdate",
						"isfav",
						"gmid"
					]
				}
			},
			other: {
				module: "video.VideoLogicServer",
				method: "rec_video_byvid",
				param: {
					vid,
					required: [
						"vid",
						"type",
						"sid",
						"cover_pic",
						"duration",
						"singers",
						"video_switch",
						"msg",
						"name",
						"desc",
						"playcnt",
						"pubdate",
						"isfav",
						"gmid",
						"uploader_headurl",
						"uploader_nick",
						"uploader_encuin",
						"uploader_uin",
						"uploader_hasfollow",
						"uploader_follower_num"
					],
					support: 1
				}
			}
		};



		rp({
			uri: "https://u.y.qq.com/cgi-bin/musicu.fcg",
			qs: {
				format: 'json',
				data: JSON.stringify(data),
			},

			headers: {
				referer: 'https://y.qq.com/portal/player.html',
				host: 'u.y.qq.com',
				'content-type': 'application/x-www-form-urlencoded',
			},
		}).then(res => {
			resolve(res)
		}).catch(err => {
			reject(err)
		})
	})
}


//获取电台歌曲
export const getRadioSong = (radioId) => {
	return new Promise((resolve, reject) => {
		const params = {
			format: "json",
			outCharset: "utf-8",
			notice: 0,
			platform: "yqq.json",
			g_tk: 1124214810,
			loginUin: 0,
			hostUin: 0,
			outCharset: 'utf-8',
			notice: 0,
			needNewCode: 0,
		}

		const props = {
			method: 'get',
			option: {},
			params,
		}

		var data = {
			...params,
			data: JSON.stringify({"songlist":{"module":"pf.radiosvr","method":"GetRadiosonglist","param":{"id":Number(radioId),"firstplay":1,"num":100}},"radiolist":{"module":"pf.radiosvr","method":"GetRadiolist","param":{"ct":"24"}},"comm":{"ct":24,"cv":0}})
		}
		
		
		rp({
			uri:'https://u.y.qq.com/cgi-bin/musicu.fcg',
			qs: data ,
			headers: {
				referer: 'https://y.qq.com/portal/player.html',
				host: 'u.y.qq.com',
				'content-type': 'application/x-www-form-urlencoded',
			},
			method:"GET"
		}).then(res => {
			resolve(res)
		}).catch(error => {
			reject(error)
		})
	})
}
