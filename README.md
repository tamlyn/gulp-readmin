# gulp-readmin
> Load files from `script` and `link` tags into a stream to do with as you wish

## Usage

First, install `gulp-readmin` as a development dependency:

```shell
npm install --save-dev gulp-readmin
```

Then, add it to your `gulpfile.js`:

```javascript
var readmin = require('gulp-readmin');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

gulp.task('minifyjs', function () {
  return gulp.src('templates/layout.html')
      .pipe(readmin({type: 'js'))
      .pipe(uglify())
      .pipe(concat('scripts.min.js'))
      .pipe(gulp.dest('build'));
});
```

## API

### Blocks
Blocks are expressed as:

```html
<!-- build:<pipelineId>(alternate search path) -->
... HTML Markup, list of script / link tags.
<!-- endbuild -->
```

- **pipelineId**: `js` or `css`
- **alternate search path**: (optional) By default the input files are relative to the treated file. Alternate search path allows one to change that

For example:

```html
<!-- build:js -->
<script src="lib/framework.js"></script>
<script src="src/app.js"></script>
<!-- endbuild -->
```

### Options

#### type
Type `String`

Set to `js` or `css` to filter out the other type. Default is to include both in stream.

#### path
Type: `String`

Default alternate search path for files. Can be overridden by the alternate search path option for a given block.

## Use case

```
|
+- gulpfile.js
+- src
|   +- templates
|       +- layout.php
+- web
|   +- index.php
|   +- js
|   |   +- foo.js
|   |   +- bar.js
|   +- css
|   |   +- normalize.css
|   |   +- main.css
|   +- build
```

We want to optimize scripts (in the correct order) into `scripts.min.js`, and styles into `styles.min.css`. `layout.php` should contain the following blocks:

```html
    <!-- build:css(web) -->
    <link rel="stylesheet" href="css/clear.css"/>
    <link rel="stylesheet" href="css/main.css"/>
    <!-- endbuild -->

    <!-- build:js(web) -->
    <script src="js/foo.js"></script>
    <script src="js/bar.js"></script>
    <!-- endbuild -->
```

We want our files to be generated in the `web/build` directory. `gulpfile.js` should contain the following tasks:

```javascript
gulp.task('minifycss', function () {
  return gulp.src('src/templates/layout.php')
      .pipe(readmin({type:'css'}))
      .pipe(minifyCss())
      .pipe(concat('styles.min.css'))
      .pipe(gulp.dest('web/build'));
});

gulp.task('minifyjs', function () {
  return gulp.src('src/templates/layout.php')
      .pipe(readmin({type:'js'}))
      .pipe(uglify())
      .pipe(concat('scripts.min.js'))
      .pipe(gulp.dest('web/build'));
});
```


## Changelog

#### 0.1.0
- initial release
