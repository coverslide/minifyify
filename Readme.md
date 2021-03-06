Minifyify
=========
#### Tiny, Debuggable Browserify Bundles

[![Build Status](https://travis-ci.org/ben-ng/minifyify.png?branch=master)](https://travis-ci.org/ben-ng/minifyify)

Before, browserify made you choose between sane debugging and sane load times. Now, you can have both.

Minifyify minifies your bundle and pulls the source map out into a separate file. Now you can deploy a minified bundle in production, and still have a sourcemap handy for when things inevitably break!

## Usage

```js
var browserify = require('browserify')
  , minifyify = require('minifyify')
  , fs = require('fs')
  , bundle = new browserify()
  , opts = {
      // The URL the source is available at
      file: '/bundle.js'

      // The URL this map is available at
    , map: '/bundle.map'

      // Do *not* apply transforms to the bundle yourself, and
      // make sure that the key exactly matches the module name
      // See [https://github.com/ben-ng/minifyify/issues/11](issue 11) for why
    , transforms: {
        hbsfy: require('hbsfy')
      , envify: require('envify')
      }
    };

bundle.add('entryScript.js');

minifyify(bundle, opts, function(code, map) {
  // SourceMappingURL comment is already added for you at this point
  fs.writeFileSync('www/bundle.js', code);
  fs.writeFileSync('www/bundle.map', map);
});
```

## FAQ

 * How does this work?

   Minifyify uses the `--list` advanced option in browserify to discover what files are in your bundle. It then uglifies each file, adds an inline sourcemap, and runs browserify on the minified files. Browserify will combine and offset the sourcemaps.

 * Why don't I apply transforms myself?

   Minifyify needs to know your transforms to create the dependency graph and minify things like precompiled templates. Since there is no public API to do this in browserify, transforms have to be specified as an option.

 * Why does the sourcemap cause my debugger to behave erratically?

   Some of the optimizations UglifyJS performs will result in sourcemaps that appear to broken. For example, when UglifyJS uses the comma operator to shorten statements on different lines, a single debugger "step" in minified code may execute multiple lines of the original source.

## License

The MIT License (MIT)

Copyright (c) 2013 Ben Ng

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
