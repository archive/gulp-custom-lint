# gulp-custom-lint

Gulp plugin for your custom lint rules/ocd checks via regexp patterns or custom functions

## Install

```
$ npm install --save-dev gulp-custom-lint
```

## Usage
```js
gulpfile.js:
--------------------------------------------
var gulp = require('gulp');
var customLint = require('gulp-custom-lint');

gulp.task('default', function () {
  return gulp.src('/some-files/**/*.*')
    .pipe(customLint())
    .pipe(customLint.reporter());
});


.jsclintrc:
--------------------------------------------
module.exports = [
  {
    regexp: /lipsum/g,
    message: "Should not contain lipsum"
  },
  {
    func: function (content, file) {
      return {
        failed: content.length !== 42
      }
    },
    message: "The content length must be 42"
  }
];
```

## API
The lint rules can either be a regexp pattern or a custom function.

### Regexp
```
{
  regexp: /pattern/g,
  message: "Message to show if the pattern is found within afile"
}
```

### Custom function
The custom function is called with content (as a string) and the original (vinyl)[https://www.npmjs.com/package/vinyl] file object. Don't call toString on the vinyl object since is has already been done for the content parameter (performance reasons).

#### Signature:
```function (content, file)```

#### Contract for return object:
failed (bool, mandatory)
True or false

indexes (array, optional)
The indexes where the problems were found.

```
return {
  failed: true/false,
  indexes: [1]
}
```

## .jsclintrc or rules object
.jsclintrc (same folder as the gulpfile.js)
```js
return gulp.src('/some-files/**/*.*')
  .pipe(customLint())
  .pipe(customLint.reporter());
```

Rules object
```js
return gulp.src('/some-files/**/*.*')
  .pipe(customLint([
    {
      regexp: /pattern/,
      message: "message"
    },
  ]))
  .pipe(customLint.reporter());
```