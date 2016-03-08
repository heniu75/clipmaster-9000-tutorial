const $ = require('jquery')
const electron = require('electron')

const createClippingElement = require('./support/create-clipping-element')

const clipboard = electron.clipboard

const $clippingsList = $('.clippings-list')
const $copyFromClipboardButton = $('#copy-from-clipboard')

function addClippingToList() {
  const text = clipboard.readText()
  const $clipping = createClippingElement(text)
  $clippingsList.append($clipping)
}

$copyFromClipboardButton.on('click', addClippingToList)

$clippingsList.on('click', '.remove-clipping', function () {
  $(this).parents('.clippings-list-item').remove()
})

$clippingsList.on('click', '.copy-clipping', function () {
  const text = $(this).parents('.clippings-list-item').find('.clipping-text').text()
  console.log("text", text)
  clipboard.writeText(text)
})

$clippingsList.on('click', '.publish-clipping', function () {
  const text = $(this).parents('.clippings-list-item').find('.clipping-text').text()
  console.log('PUBLISH', text)
})
