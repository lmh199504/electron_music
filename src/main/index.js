'use strict'

import {
	app,
	BrowserWindow,
	Tray,
	Menu,
	nativeImage,
	ipcMain,
	screen
} from 'electron'
const path = require('path')



/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
	global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}
let LyricWindow = null;
let tray
let mainWindow
const winURL = process.env.NODE_ENV === 'development' ?
	`http://localhost:9080` :
	`file://${__dirname}/index.html`

const LyricURL = process.env.NODE_ENV === 'development' ?
	`http://localhost:9080/#desktoplyric` :
	`file://${__dirname}/index.html#desktoplyric`


function createWindow() {
	const {
		height,
		width
	} = screen.getPrimaryDisplay().workAreaSize
	console.log(width - (1024 * 2))
	LyricWindow = new BrowserWindow({
		frame: false,
		height: 70,
		minHeight: 70,
		minWidth: 780,
		width: 1024,
		x: (width - 1024) / 2,
		y: height - 100,
		fullscreenable: false,
		// minimizable: false,
		maximizable: false,
		resizable: true,
		transparent: true,
		alwaysOnTop: true,
		skipTaskbar: true, // 任务栏中不显示窗口面板
		// closable: false,
		webPreferences: {
			webSecurity: false,
			nodeIntegration: true
		}
	})
	LyricWindow.loadURL(LyricURL)
	LyricWindow.on('closed', () => {
		LyricWindow = null
	})


	/**
	 * Initial window options
	 */
	mainWindow = new BrowserWindow({
		height: 634,
		useContentSize: true,
		width: 1024,
		minWidth: 1024,
		minHeight: 634,
		center: true,
		frame: false,
		resizable: true,
		movable: true,
		// transparent: true,
		fullscreenable: true,
		webPreferences: {
			webSecurity: false,
			nodeIntegration: true
		}
	})

	mainWindow.loadURL(winURL)

	mainWindow.on('closed', () => {
		mainWindow = null
	})

	mainWindow.on('ready-to-show', function() {
		mainWindow.show() // 初始化后再显示
	})
	tray = new Tray(`${__static}/icon.ico`)
	const contextMenu = Menu.buildFromTemplate([{
			label: '退出',
			click: () => {
				// mainWindow.destroy()
				try {
					mainWindow.webContents.send('exit', 'out');
					LyricWindow.destroy();
				} catch (e) {
					//TODO handle the exceptions
				}
			}
		} // 我们需要在这里有一个真正的退出（这里直接强制退出）
	])
	tray.setToolTip('猫猫音乐')
	tray.setContextMenu(contextMenu)
	tray.on('click', () => { // 我们这里模拟桌面程序点击通知区图标实现打开关闭应用的功能
		try {
			mainWindow.isVisible() ? '' : mainWindow.show()
			mainWindow.isVisible() ? mainWindow.setSkipTaskbar(false) : mainWindow.setSkipTaskbar(true)
		} catch (e) {
			
		}
	})

	ipcMain.on('postlyric', (event, arg) => {
		console.log(arg)
		try {
			LyricWindow.webContents.send('getlyric', arg);
		} catch (e) {
			//TODO handle the exception
		}
	})


	ipcMain.on('ctrlLyWin', (event, arg) => {
		try {
			LyricWindow.webContents.send('LyWin', arg);
		} catch (e) {
			//TODO handle the exception
		}

	})

	//禁止右键菜单
	preventDragbarContext(mainWindow)
	preventDragbarContext(LyricWindow)
}

app.on('ready', createWindow)
Menu.setApplicationMenu(null)
app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit()
	}
})

app.on('activate', () => {
	if (mainWindow === null) {
		createWindow()
	}
})


/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
app.getPath('home'); // 获取用户根目录
app.getPath('userData'); // 用于存储 app 用户数据目录
app.getPath('appData'); // 用于存储 app 数据的目录，升级会被福噶
app.getPath('desktop'); // 桌面目录


function preventDragbarContext(win) {

	var WM_INITMENU = 0x116; //278
	win.hookWindowMessage(WM_INITMENU, function(e) {
		console.log('hook', e);
		win.setEnabled(false);
		setTimeout(() => {
			win.setEnabled(true);
		}, 100);
		return true;
	})
}


