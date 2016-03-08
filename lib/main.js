const electron = require('electron')
const Menubar = require('menubar')

const menubar = new Menubar()

menubar.on('ready', _ => {
  console.log('App ready')
})

menubar.on('after-create-window', _ => {
  menubar.window.loadURL(`file://${__dirname}/index.html`)
})
