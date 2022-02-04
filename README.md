<!--

@license Apache-2.0

Copyright (c) 2018 The Stdlib Authors.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

-->

# Disposable HTTP Server

[![NPM version][npm-image]][npm-url] [![Build Status][test-image]][test-url] [![Coverage Status][coverage-image]][coverage-url] <!-- [![dependencies][dependencies-image]][dependencies-url] -->

> Create a disposable HTTP server.

<section class="installation">

## Installation

```bash
npm install @stdlib/net-disposable-http-server
```

Alternatively,

-   To load the package in a website via a `script` tag without installation and bundlers, use the [ES Module][es-module] available on the [`esm` branch][esm-url].
-   If you are using Deno, visit the [`deno` branch][deno-url].
-   For use in Observable, or in browser/node environments, use the [Universal Module Definition (UMD)][umd] build available on the [`umd` branch][umd-url].

</section>

<section class="usage">

## Usage

<!-- run-disable -->

```javascript
var httpServer = require( '@stdlib/net-disposable-http-server' );
```

#### httpServer( options\[, clbk] )

Creates a disposable HTTP server; i.e., the server closes immediately after serving provided content.

<!-- run-disable -->

```javascript
var opts = {
    'html': '<script src="/bundle.js"></script>',
    'javascript': 'console.log( "Boop" );'
};

httpServer( opts );
```

The function accepts the following options:

-   **html**: `buffer` or `string` to serve as HTML content.
-   **javascript**: `buffer` or `string` to serve as JavaScript.
-   **port**: server port. Default: `0` (i.e., randomly assigned).
-   **maxport**: max server port (used when port hunting). Default: `=port`.
-   **hostname**: server hostname.
-   **address**: server address. Default: `"0.0.0.0"`.
-   **open**: `boolean` indicating whether to launch a web browser. Default: `false`.

To serve HTML content, set the `html` option. Once the content is requested, the server will close.

<!-- run-disable -->

```javascript
var opts = {
    'html': '<h1>Beep</h1>'
};

httpServer( opts );
```

To serve JavaScript, set the `javascript` option. If no HTML is provided, an HTML boilerplate is served and the JavaScript is served as `/bundle.js`. Once the content is requested, the server will close.

<!-- run-disable -->

```javascript
var opts = {
    'javascript': 'console.log( "Boop" );'
};

httpServer( opts );
```

If HTML and JavaScript are provided, in order for the JavaScript to be served, the HTML content should request the file `/bundle.js`.

<!-- run-disable -->

```javascript
var opts = {
    'html': '<script src="/bundle.js"></script>',
    'javascript': 'console.log( "Boop" );'
};

httpServer( opts );
```

To obtain the `server` handle, provide a callback.

<!-- run-disable -->

```javascript
var nextTick = require( '@stdlib/utils-next-tick' );

function onReady( error, server ) {
    if ( error ) {
        throw error;
    }
    nextTick( close );
    function close() {
        server.close();
    }
}

var opts = {
    'html': html,
    'javascript': 'console.log( "Boop" );'
};

httpServer( opts, onReady );
```

</section>

<!-- /.usage -->

<section class="notes">

## Notes

-   If neither the `html` or `javascript` option is set, the server serves an HTML boilerplate and then closes.

</section>

<!-- /.notes -->

<section class="examples">

## Examples

<!-- run-disable -->

<!-- eslint no-undef: "error" -->

```javascript
var join = require( 'path' ).join;
var readFileSync = require( '@stdlib/fs-read-file' ).sync;
var httpServer = require( '@stdlib/net-disposable-http-server' );

var html = join( __dirname, 'examples', 'fixtures', 'index.html' );
var js = join( __dirname, 'examples', 'fixtures', 'script.js' );

var opts = {
    'html': readFileSync( html ),
    'javascript': readFileSync( js ),
    'port': 7331,
    'hostname': 'localhost',
    'open': false
};

httpServer( opts, clbk );

function clbk( error, server ) {
    if ( error ) {
        throw error;
    }
    // Give the user a few seconds to open her web browser before closing the server...
    setTimeout( onTimeout, 5000 );

    function onTimeout() {
        server.close();
    }
}
```

</section>

<!-- /.examples -->

* * *

<section class="cli">

## CLI

<section class="installation">

## Installation

To use the module as a general utility, install the module globally

```bash
npm install -g @stdlib/net-disposable-http-server
```

</section>

<section class="usage">

### Usage

```text
Usage: temp-http-server [options] (--html path | --js path | --stdin type)

Options:

  -h,    --help                Print this message.
  -V,    --version             Print the package version.
         --html path           Serve HTML.
  --js,  --javascript path     Serve JavaScript.
         --stdin type          Type of content: html or javascript.
  -p,    --port port           Server port. Default: 0.
         --maxport maxport     Max server port. Default: `port`.
         --hostname hostname   Server hostname.
         --address address     Server address. Default: 0.0.0.0.
         --open                Launch a browser once server is ready.
```

The application recognizes the following [environment variables][environment-variable]:

-   `DEBUG`: enable verbose logging.
-   `PORT`: server port.
-   `MAXPORT`: max server port.
-   `HOSTNAME`: server hostname.
-   `ADDRESS`: server address.

</section>

<!-- /.usage -->

<section class="notes">

### Notes

-   Command-line arguments **always** take precedence over [environment variables][environment-variable].
-   If either the `--html` or `--javascript` command-line flag is set, `stdin` is assumed to be of the other type. Accordingly, the `--stdin` flag may be omitted.

</section>

<!-- /.notes -->

<section class="examples">

### Examples

To serve an HTML file,

```bash
$ DEBUG=* temp-http-server --html ./examples/fixtures/index.html
...
```

To serve a JavaScript file (and a default HTML boilerplate),

```bash
$ DEBUG=* temp-http-server --javascript ./examples/fixtures/script.js
...
```

In addition to file input, the application accepts [standard input][standard-streams]. To pipe HTML,

```bash
$ cat ./examples/fixtures/index.html | DEBUG=* temp-http-server --port 7331 --stdin html
...
```

To pipe HTML and load a JavaScript file,

```bash
$ cat ./examples/fixtures/index.html | DEBUG=* temp-http-server --port 7331 --javascript ./examples/fixtures/script.js
...
```

To pipe JavaScript (and serve a default HTML boilerplate),

```bash
$ cat ./examples/fixtures/script.js | DEBUG=* temp-http-server --address '127.0.0.1' --stdin javascript
...
```

To pipe JavaScript and serve custom HTML content which requests a `/bundle.js` file,

```bash
$ cat ./examples/fixtures/script.js | DEBUG=* temp-http-server --html ./examples/fixtures/index.html
...
```

</section>

<!-- /.examples -->

</section>

<!-- /.cli -->

<!-- Section for related `stdlib` packages. Do not manually edit this section, as it is automatically populated. -->

<section class="related">

</section>

<!-- /.related -->

<!-- Section for all links. Make sure to keep an empty line after the `section` element and another before the `/section` close. -->


<section class="main-repo" >

* * *

## Notice

This package is part of [stdlib][stdlib], a standard library for JavaScript and Node.js, with an emphasis on numerical and scientific computing. The library provides a collection of robust, high performance libraries for mathematics, statistics, streams, utilities, and more.

For more information on the project, filing bug reports and feature requests, and guidance on how to develop [stdlib][stdlib], see the main project [repository][stdlib].

#### Community

[![Chat][chat-image]][chat-url]

---

## License

See [LICENSE][stdlib-license].


## Copyright

Copyright &copy; 2016-2021. The Stdlib [Authors][stdlib-authors].

</section>

<!-- /.stdlib -->

<!-- Section for all links. Make sure to keep an empty line after the `section` element and another before the `/section` close. -->

<section class="links">

[npm-image]: http://img.shields.io/npm/v/@stdlib/net-disposable-http-server.svg
[npm-url]: https://npmjs.org/package/@stdlib/net-disposable-http-server

[test-image]: https://github.com/stdlib-js/net-disposable-http-server/actions/workflows/test.yml/badge.svg
[test-url]: https://github.com/stdlib-js/net-disposable-http-server/actions/workflows/test.yml

[coverage-image]: https://img.shields.io/codecov/c/github/stdlib-js/net-disposable-http-server/main.svg
[coverage-url]: https://codecov.io/github/stdlib-js/net-disposable-http-server?branch=main

<!--

[dependencies-image]: https://img.shields.io/david/stdlib-js/net-disposable-http-server.svg
[dependencies-url]: https://david-dm.org/stdlib-js/net-disposable-http-server/main

-->

[umd]: https://github.com/umdjs/umd
[es-module]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules

[deno-url]: https://github.com/stdlib-js/net-disposable-http-server/tree/deno
[umd-url]: https://github.com/stdlib-js/net-disposable-http-server/tree/umd
[esm-url]: https://github.com/stdlib-js/net-disposable-http-server/tree/esm

[chat-image]: https://img.shields.io/gitter/room/stdlib-js/stdlib.svg
[chat-url]: https://gitter.im/stdlib-js/stdlib/

[stdlib]: https://github.com/stdlib-js/stdlib

[stdlib-authors]: https://github.com/stdlib-js/stdlib/graphs/contributors

[stdlib-license]: https://raw.githubusercontent.com/stdlib-js/net-disposable-http-server/main/LICENSE

[environment-variable]: https://en.wikipedia.org/wiki/Environment_variable

[standard-streams]: https://en.wikipedia.org/wiki/Standard_streams

</section>

<!-- /.links -->
