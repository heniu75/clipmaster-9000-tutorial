const electron = require('electron');
const Menubar = require('menubar');

const menubar = Menubar();

menubar.on('ready', function () {
  console.log('Application is ready.');
});

menubar.on('after-create-window', function () {
  menubar.window.loadURL(`file://${__dirname}/index.html`);
});
