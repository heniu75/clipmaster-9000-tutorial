const electron = require('electron')
const Menubar = require('menubar')

const menubar = new Menubar()
const globalShortcut = electron.globalShortcut

menubar.on('ready', _ => {
  console.log('App ready')
})

menubar.on('after-create-window', _ => {
  menubar.window.loadURL(`file://${__dirname}/index.html`)

  const createClipping = globalShortcut.register('CommandOrControl+!', _ => {
    menubar.window.webContents.send('create-new-clipping')
  })

  if (!createClipping) {
    console.log('Registration failed', 'createClipping')
  }
})
