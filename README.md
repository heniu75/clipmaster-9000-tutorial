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
