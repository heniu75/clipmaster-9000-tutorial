const $ = require('jquery')
const electron = require('electron')
const request = require('request')

const createClippingElement = require('./support/create-clipping-element')

const clipboard = electron.clipboard
const shell = electron.shell

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
  var text = $(this).parents('.clippings-list-item').find('.clipping-text').text();
  console.log("text", text)
  // TODO: github api rate exceeded;  uncomment when auth'ed
  // request.post({
  //   url: 'https://api.github.com/gists',
  //   headers: {
  //     'User-Agent': 'Clipmaster 9000'
  //   },
  //   body: JSON.stringify({
  //     description: "Created with Clipmaster 9000",
  //     public: "true",
  //     files:{
  //       "clipping.txt": {
  //         content: text
  //       }
  //     }
  //   })
  // }, function (err, response, body) {
  //   console.log("err, response, body", err, response, body)
  //   if (err) { return alert(JSON.parse(err).message); }
  //
  //   var gistUrl = JSON.parse(body).html_url;
  //   alert(gistUrl);
  //   clipboard.writeText(gistUrl);
  // });


  const gistUrl = 'http://google.com'
  const notification = new Notification('Your clipping is published', {
    body: `Click to open ${gistUrl} in browser`
  })

  notification.onclick = _ => {
    shell.openExternal(gistUrl)
  }

  clipboard.writeText(gistUrl)
});
