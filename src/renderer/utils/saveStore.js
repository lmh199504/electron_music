

// const Api = require('electron').remote.require('./api');
const app = require('electron').remote.app

const fs = require('fs');
const path = require('path');

const userData = app.getPath('userData');


console.log(userData);

export const save = (str) => {
	return new Promise((resolve,reject)=>{
		fs.writeFile(path.join(userData,'data.txt'),str,function(err){
			if(err){
				reject(err)
			}else{
				resolve('success')
			}
		})
	})
}


export const read = () =>{
	return new Promise((resolve,reject)=>{
		fs.readFile(path.join(userData,'data.txt'),function(err,data){
			if(err){
				reject(err)
			}else{
				// console.log(data);
				resolve(data.toString())
			}
		})
	})
}