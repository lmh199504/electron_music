import {
  apiBaseUrl
} from './config.js'

import {
  Base64
} from 'js-base64'

import rp from 'request-promise'

export const getKKK = () => {
  rp({
    uri: 'https://u.y.qq.com/cgi-bin/musics.fcg',
    qs: {
      '-': 'recom7532239292867224',
      g_tk: 468869789,
      sign: 'zzan0l6c8wuecfrgd492e15d7a2dffebd6c29c557cf68dc89',
      loginUin: 207374233,
      hostUin: 0,
      format: 'json',
      inCharset: 'utf8',
      outCharset: 'utf-8',
      notice: 0,
      platform: 'yqq.json',
      needNewCode: 0,
      data: '{"comm":{"ct":24},"new_album":{"module":"newalbum.NewAlbumServer","method":"get_new_album_info","param":{"area":2,"sin":0,"num":10}}}'
    },
    method: 'GET'
  }).then(res => {
    // console.log(res)
  }).catch(err => {
    // console.log(err)
  })
}

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

      for (let i = 0; i < list.length; i++) {
        listArr.push({
          img: 'http://imgcache.qq.com/music/photo/album_300/17/300_albumpic_' + list[i].albumid + '_0.jpg',
          singer: list[i].singer[0].name,
          songid: list[i].songid,
          songmid: list[i].songmid,
          songname: list[i].songname,
          albumname: list[i].albumname,
          interval: list[i].interval,
          albumdesc: list[i].albumdesc
        })
      }
      resolve(listArr)
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

export const getDiscList = () => {
  return new Promise((resolve, reject) => {
    rp({
      method: 'GET',
      uri: 'http://ustbhuangyi.com/music/api/getDiscList',
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
        categoryId: 10000000,
        rnd: Math.random()

      }
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
      uri: 'http://ustbhuangyi.com/music/api/getCdInfo',
      method: 'GET',
      qs: data
    }).then(res => {
      // console.log(res)
      resolve(res)
      // const listArr = [];
      // for (let i = 0; i < JSON.parse(res).cdlist[0].songlist.length; i++) {
      // 	let list = JSON.parse(res).cdlist[0].songlist[i];
      // 	listArr.push({
      // 		img: "http://imgcache.qq.com/music/photo/album_300/17/300_albumpic_" + list.albumid + "_0.jpg",
      // 		singer: list.singer[0].name,
      // 		songid: list.songid,
      // 		songmid: list.songmid,
      // 		songname: list.songname
      // 	})
      // }
      // resolve(listArr)
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
      // let data = JSON.parse(res.data.slice(5, res.data.length - 1)).songlist;
      // const result = [];
      // for (let i = 0; i < data.length; i++) {
      // 	result.push({
      // 		img: "http://imgcache.qq.com/music/photo/album_300/17/300_albumpic_" + data[i].data.albumid + "_0.jpg",
      // 		singer: data[i].data.singer[0].name,
      // 		songid: data[i].data.songid,
      // 		songmid: data[i].data.songmid,
      // 		songname: data[i].data.songname
      // 	})
      // }
      // resolve(result)
    }).catch(err => {
      reject(err)
    })
  })
}

export const getSongLyric = (songmid) => {
  return new Promise((resolve, reject) => {
    rp({

      uri: 'http://ustbhuangyi.com/music/api/lyric',
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

      }

    }).then(res => {
      let lyric = Base64.decode(JSON.parse(res).lyric)
      // console.log(lyric)
      resolve(lyric)
    }).catch(err => {
      reject(err)
    })
  })
}
