# gulp-json-modifier

gulp-json-modifier is a [gulp](https://github.com/gulpjs/gulp) plugin to modify
JSON objects, forked from
[gulp-json-editor](https://github.com/rejas/gulp-json-editor) and simplified to
not rely on `js-beautify` and other dependencies.

## Usage

```javascript
var jsonModifier = require('gulp-json-modifier');

// edit JSON object by merging with user specific object
gulp.src('./manifest.json')
  .pipe(jsonModifier({
    version: '1.2.3'
  }))
  .pipe(gulp.dest('./dest'));

// edit JSON object by using user specific function
gulp.src('./manifest.json')
  .pipe(jsonModifier(function(json) {
    json.version = '1.2.3';
    return json; // must return JSON object.
  }))
  .pipe(gulp.dest('./dest'));

// specify indent option
gulp.src('./manifest.json')
  .pipe(jsonModifier({
    version: '1.2.3'
  },
  {
    indent: 2
  }))
  .pipe(gulp.dest('./dest'));

// specify deepmerge option
gulp.src('./manifest.json')
  .pipe(jsonModifier({ 
    authors: ['tomcat'] 
  },
  { 
    merge: {
      arrayMerge: function (dist, source, options) {
        return source;
      } 
    }
  }))
  .pipe(gulp.dest('./dest'));
```

## API
### jsonModifier(modify, options)
#### modify
Type: `JSON object` | `function`

JSON object to merge with, or callback to modify the JSON object with, using
the following signature: `function (json) {}`, and returning a JSON object.

#### options.indent
Type: `number`

The indent option passed to `JSON.stringify()`

#### options.merge
Type: `object`

The [option](https://github.com/TehShrike/deepmerge#options) passed to
`deepmerge`.
