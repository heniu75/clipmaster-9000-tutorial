const $ = require('jquery');
const electron = require('electron');

const createClippingElement = require('./support/create-clipping-element');

const clipboard = electron.clipboard;

const $clippingsList = $('.clippings-list');
const $copyFromClipboardButton = $('#copy-from-clipboard');

function addClippingToList() {
  var text = clipboard.readText();
  var $clipping = createClippingElement(text);
  $clippingsList.append($clipping);
}

$copyFromClipboardButton.on('click', addClippingToList);
