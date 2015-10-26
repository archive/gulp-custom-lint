# gulp-custom-lint

Use regexp or custom functions to create your own custom lint rules or ocd checks (gulp plugin)

![screenshot](/examples/screen.png?raw=true "screenshot")

## Install

```
$ npm install --save-dev gulp-custom-lint
```

## Usage
#### Gulpfile
```js
var gulp = require('gulp');
var customLint = require('gulp-custom-lint');

gulp.task('default', function() {
  return gulp.src('./code/*.*')
    .pipe(customLint())
    .pipe(customLint.reporter());
});
```
#### .jsclintrc
Create a ".jsclintrc"-file for your custom rules (place it at the same level as your gruntfile.js-file)
```js
module.exports = [
  {
    regexp: /pattern/g,
    message: 'Message to show on failures'
  },
  {
    func: function (content, file) {
      ... code ...
      return {
        failed: true/false
      }
    },
    message: 'Message to show on failures'
  }
];
```

Instead of the .jsclintrc"-file you can pass a rules object:
```js
var gulp = require('gulp');
var customLint = require('gulp-custom-lint');

gulp.task('default', function() {
  return gulp.src('./code/*.*')
    .pipe(customLint([
      {
        regexp: /pattern/g,
        message: 'Message to show on failures'
      }
    ]))
    .pipe(customLint.reporter());
});
```

## API
As seen above you can either use a regexp pattern or a custom function to validate content/files

### Regexp (regular expression) pattern
```js
{
  regexp: /pattern/,
  message: 'Message to show on failures'
}
```

#### rule.regexp
type: `RegExp`

A valid JavaScript regular expressen (with or without g-flag)

#### rule.message
type: `String`

The message to show if the pattern matches some content, the failure message

#### rule.ignore (optional)
type: `Array<RegExp>`

An array of regexp that will be matched against the file path, so if you want to ignore all files in the "./lib/"-folder, add ```[/\/lib\//]```

### Custom function
The custom function will be called with the files content (as a string) and the original [vinyl](https://www.npmjs.com/package/vinyl) file object. (Don't call toString on the file.content since is has already been done for the content-parameter, performance reasons).

```js
{
  func: function (content, file) {
    return {
      failed: true/false,
      indexes: [index]
    }
  },
  message: 'Message to show if the function returns failed === true'
}
```

#### rule.func
type: `Function`

In this function you will do your custom linting/checking. The function must return a object with the following format:
```js
return {
  failed: true/false
}
```
##### returnObject.failed
type: `Boolean`

True or false value

##### returnObject.indexes
type: `Array<int>`

An array of indexes where the problem was found. E.g. if the validation failed at char index 12, set indexes to [12]. If you don't have any index you can skip it or set it to [0]

#### rule.message
Same as for regexp pattern, please see above

#### rule.ignore (optional)
Same as for regexp pattern, please see above

## Some examples
(from https://github.com/archive/gulp-custom-lint/tree/master/examples)

```js
module.exports = [
  {
    regexp: /z-index: [0-9]/g,
    message: 'Use z-index value from constants file'
  },
  {
    regexp: /debugger;/g,
    message: 'Remove debugger from js file',
    ignore: [/test\-logger/]
  },
  {
    func: function(content, file) {
      return {
        failed: file.path.indexOf('_') !== -1,
        indexes: [1]
      };
    },
    message: 'Use "-" instead of "_" in file names'
  }
];
```
