const {
	ipcRenderer,
	remote
} = require('electron')

const WinReg = require('winreg')
const RUN_LOCATION = '\\Software\\Microsoft\\Windows\\CurrentVersion\\Run'
const file = process.execPath
// 最小化
export const minWindow = () => {
	remote.getCurrentWindow().minimize()
}

// 窗口最大化
export const maxWindow = (isMaxed) => {
	const browserWindow = remote.getCurrentWindow()
	if (!isMaxed) {
		browserWindow.unmaximize()
	} else {
		browserWindow.maximize()
	}
}

export const setSkip = () => {
	const browserWindow = remote.getCurrentWindow()
	browserWindow.setSkipTaskbar(true)
}

// 下载文件
export const download = (url) => {
	remote.getCurrentWebContents().downloadURL(url)
}
// 隐藏窗口

export const hide = () => {
	const browserWindow = remote.getCurrentWindow()
	browserWindow.hide()
}
// 显示窗口

export const show = () => {
	const browserWindow = remote.getCurrentWindow()
	browserWindow.show()
}

// 窗口闪烁
export const flashFrame = () => {
	const browserWindow = remote.getCurrentWindow()
	//   if(browserWindow.isFocused() || browserWindow.isVisible())
	if (!browserWindow.isFocused()) {
		browserWindow.showInactive()
		browserWindow.flashFrame(true)
	}
}

// 设置窗口最前端显示
export const setAlwaysOnTop = (top) => {
	const browserWindow = remote.getCurrentWindow()
	browserWindow.setAlwaysOnTop(top)
}

// 取消开机启动
export const disableAutoStart = (callback) => {
	let key = new WinReg({
		hive: WinReg.HKCU,
		key: RUN_LOCATION
	})
	key.remove('EUC', (err) => {
		console.log('取消自动启动' + err)
		callback(err)
	})
}
// 获取是否开机启动
export const getAutoStartValue = (callback) => {
	let key = new WinReg({
		hive: WinReg.HKCU,
		key: RUN_LOCATION
	})
	key.get('EUC', function(error, result) {
		console.log('查询自动启动:' + JSON.stringify(result))
		console.log('file:' + file)
		if (result) {
			callback(true)
		} else {
			callback(false)
		}
	})
}

/**
 * 托盘图标闪烁
 * @param flash true：闪烁；false：停止
 */
export const flashTray = (flash) => {
	let hasIcon = false
	const tayIcon = './imgs/logo.ico'
	const tayIcon1 = './imgs/empty.png'
	if (flash) {
		if (flashTrayTimer) {
			return
		}
		flashTrayTimer = window.setInterval(() => {
			ipcRenderer.send('ChangeTrayIcon', hasIcon ? tayIcon : tayIcon1)
			hasIcon = !hasIcon
		}, 500)
	} else {
		if (flashTrayTimer) {
			window.clearInterval(flashTrayTimer)
			flashTrayTimer = null
		}
		ipcRenderer.send('ChangeTrayIcon', tayIcon)
	}
}


export const fullScreen = (flag) => {
	const browserWindow = remote.getCurrentWindow()
	browserWindow.setFullScreen(flag)
}

export const quit = () => {
	const app = remote.app;
	app.quit()
	const browserWindow = remote.getCurrentWindow()
	browserWindow.destroy();
}


export const getCurrentWindowId = ()=>{
	const browserWindow = remote.getCurrentWindow()
	return browserWindow.id
}