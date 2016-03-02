# Clipmaster 9000

This is a tutorial for building a clipboard manager using Electron. It is meant to accompany my session on _Building a desktop application with Electron_ ([Part 1][] and [Part 2][]) at [O'Reilly's Fluent Conference 2016][fluent].

[Part 1]: http://conferences.oreilly.com/fluent/javascript-html-us/public/schedule/detail/46730
[Part 2]: http://conferences.oreilly.com/fluent/javascript-html-us/public/schedule/detail/47788
[fluent]: http://conferences.oreilly.com/fluent/javascript-html-us

## Getting Started and Acclimated

To get started, clone this repository and install the dependencies using `npm install`.

We'll be working with four files for the duration of this tutorial:

- `lib/main.js`, which will contain code for the main process
- `lib/renderer.js`, which will code for the renderer process
- `lib/index.html`, which will contain the HTML for the user interface
- `lib/style.css`, which will contain the CSS to style the user interface

In a more robust application, you might break stuff into smaller files, but—for the sake of simplicity—we're not going to.

## Hello Menubar

In this application, we're going to use [Max Ogden's excellent _menubar_ module][menubar-repo]. This module abstracts some of the OS-specific implementation details of building a application that lives in the menu bar (OS X) or system tray (Windows).

[menubar-repo]: https://github.com/maxogden/menubar

In `main.js`, we'll get things rolling by including Electron and menubar.

```js
const electron = require('electron');
const Menubar = require('menubar');
```

 The `Menubar` is a constructor. We'll create an instance to work with.

 ```js
 const menubar = Menubar();
 ```

 In this case our `menubar` instance is very simular to `app` in [Fire Sale][]. We'll wait for the application to be fire a `ready` event and then we'll log to the console.

 [Fire Sale]: https://github.com/stevekinney/firesale-tutorial

```js
menubar.on('ready', function () {
  console.log('Application is ready.');
});
```

Let's use `npm start` to verify that it works correctly. The library gives us a pleasant little cat icon as a default.

![Cat icon in the menu bar on OS X](images/01-cat-in-menubar.png)

We also get a window correctly positioned above or below—depending on your operating system—the icon, which will load a blank page for starters. This is an instance of `BrowserWindow` as we saw before in [Fire Sale][].


![A correctly placed window appears when we click on the cat](images/02-open-window.gif)

### Loading Our HTML File

As we alluded to just a sentence or two ago, Menubar will create a `BrowserWindow` on our behalf. When it has done so, it will fire a `after-create-window` event. We can listen for this event and load our HTML page accordingly.

```js
menubar.on('after-create-window', function () {
  menubar.window.loadURL(`file://${__dirname}/index.html`);
});
```

## Implementing The Renderer Functionality

With menubar application up and running, it's time to shift our focus to the implementing the application's primary functionality.

When a user clicks the "Copy from Clipboard" button, we want to read from the clipboard and add that new clipping to the list.

We can make a few assumptions off the bat:

1. We'll need access to Electron's `clipboard` module.
1. We'll want a reference to the "Copy From Clipboard" button.
1. We'll want a reference to the clippings list in order to add our clippings later on.

Let's implement all three in one swift motion:

```js
const clipboard = electron.clipboard;

const $clippingsList = $('.clippings-list');
const $copyFromClipboardButton = $('#copy-from-clipboard');
```

Building the element that will display our clipping can be tedious. In the interest of time and focus, I've provided a function that will take some text and return a jQuery-wrapped DOM node that's ready to be appended to the clippings list.

```js
const createClippingElement = require('./support/create-clipping-element');
```

Spoiler alert: we'll eventually want to trigger reading from the clipboard by other means. So, let's keep break this functionality out into it's own function so that we can use it in multiple places.

```js
function addClippingToList() {
  var text = clipboard.readText();
  var $clipping = createClippingElement(text);
  $clippingsList.append($clipping);
}
```

Now, when a user clicks the "Copy from Clipboard" button, we'll read from the clipboard and add that clipping to the list.

```js
$copyFromClipboardButton.on('click', addClippingToList);
```

If all went well, our `renderer.js` looks something like this:

```js
const $ = require('jquery');
const electron = require('electron');

const clipboard = electron.clipboard;

const $clippingsList = $('.clippings-list');
const $copyFromClipboardButton = $('#copy-from-clipboard');
const createClippingElement = require('./support/create-clipping-element');

function addClippingToList() {
  var text = clipboard.readText();
  var $clipping = createClippingElement(text);
  $clippingsList.append($clipping);
}

$copyFromClipboardButton.on('click', addClippingToList);
```

Let's fire up our application and take it for a spin.

## Wiring Up Our Actions

We have three buttons on each clipping element.

1. "→ Clipboard" will write that clipping back to the clipboard.
1. "Publish" will send it up to an API that we can share.
1. "Remove" will remove it from the list.

We'll take advantage of [event delegation][], in order to avoid memory leaks. _Disclaimer_, we'll do this in the quickest—not necessarily the best—possible way in order to get back to focusing on Electron concepts.

[event delegation]: https://github.com/mdn/advanced-js-fundamentals-ck/blob/gh-pages/tutorials/04-events/05-event-delegation.md

Let's implement event listeners for all three. We'll use dummy functionality for "copy" and "publish".

```js
$clippingsList.on('click', '.remove-clipping', function () {
  $(this).parents('.clippings-list-item').remove();
});

$clippingsList.on('click', '.copy-clipping', function () {
  var text = $(this).parents('.clippings-list-item').find('.clipping-text').text();
  console.log('copy', text);
});

$clippingsList.on('click', '.publish-clipping', function () {
  var text = $(this).parents('.clippings-list-item').find('.clipping-text').text();
  console.log('publish', text);
});
```
