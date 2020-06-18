

const downloadPath = 'D:/MUSIC'
const fs = require('fs');
const os = require('os');
const path = require('path');
const { arr } = require('./text.js')
try{
	var stat = fs.statSync(downloadPath);
}catch(e){
	fs.mkdirSync(downloadPath);
}



const request = require('request-promise');
export const downloadFile = (url,name) =>{
	
	
	
	
	return new Promise((resolve,reject)=>{
		let received_bytes = 0;
		let savepath = downloadPath+'/'+name;
		var req = request({
			"method": 'GET',
			"url": url
		});
		var out = fs.createWriteStream(savepath); //创建文件写入
		req.pipe(out);
		req.on('response', (data) => {
			// let startTime = new Date().getTime();
			console.log(data);
		});
		//接收到文件流事件
		req.on('data', (chunk) => {
			received_bytes += chunk.length;
		})
		//文件接收结束
		req.on('end', () => {
			console.log(`file ${name} download complete`)
			resolve('success')
		});
		req.on('error',()=>{
			req.reject('err')
		})
	})
}

export const writeSomeThing = () =>{
	const index = parseInt(Math.random()*arr.length);
	var homedir=os.homedir();
	console.log(arr[index])
	fs.writeFile(path.join(homedir,'\Desktop','每天一句话.txt'),arr[index],function(err){
		if(err){
			console.log("写入失败")
		}else{
			console.log("写入成功")
		}
		
		
	})
}
// writeSomeThing()
