'use strict'

import { app, BrowserWindow, session } from 'electron'

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`
const webSecurity = process.env.NODE_ENV !== 'development'

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 810,
    useContentSize: true,
    webPreferences: {webSecurity: webSecurity},
    width: 1440
  })

  mainWindow.loadURL(winURL)
  /**
   *  监听渲染程序的Cookie的请求
   */
  const {ipcMain} = require('electron')
  ipcMain.on('request_cookie', (event, arg) => {
    console.log('got it')
    session.defaultSession.cookies.get({}, (error, cookies) => {
      event.sender.send('response_cookie', cookies)
      // event.returnValue = cookies
      console.log(error, cookies)
    })
  })
  ipcMain.on('set_cookie', (event, arg) => {
    console.log(arg) // prints "ping"
    session.defaultSession.cookies.set(arg, error => {
      console.log(error)
      event.sender.send('save_cookie_result', error)
    })
  })
  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', createWindow)

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
