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

In this application, we're going to use [Max Ogden's excellent `menubar` module][menubar-repo]. This module abstracts some of the OS-specific implementation details of building a application that lives in the menu bar (OS X) or system tray (Windows).

[menubar-repo]: https://github.com/maxogden/menubar
