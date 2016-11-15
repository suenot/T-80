# T-80
Universtal starter kit for frontend
![](https://github.com/suenot/T-80/raw/master/source/_img/t-80.jpg)

- [gulp 3.9.1](http://gulpjs.com/) (es5 syntax && one file: for ≈0.9s start)
- [webpack 1.13.2](https://webpack.github.io/)
- [sass](http://sass-lang.com/) (stylus in 20 times slower)
- [postcss](http://postcss.org/) plugins:
	- [flexibility](https://github.com/7rulnik/postcss-flexibility)
	- [autoprefixer](https://github.com/postcss/autoprefixer)
	- [rucksack](https://github.com/simplaio/rucksack)
- [pug](https://pugjs.org/api/getting-started.html) (known as ```jade```) or [nunjucks](https://mozilla.github.io/nunjucks/) (html)

### Install
```yarn``` or ```npm i```

### Start
```gulp``` or ```npm start``` (start with local gulp)

### With flags
- ```gulp --del --liveof --prefix```
- ```--del``` - clean *public* folder, autostart in production
- ```--liveoff``` - livereload turnOff
- ```--prefix``` - css prefixs for old browsers, autostart in production
- ```--serveroff``` - without server and watch

### For production: without sourcemaps in css and with clean *public* folder:
```NODE_ENV=production gulp --serveroff``` or ```npm run build``` (start with local gulp)


### Webpack (only js)
To use ```webpack``` set variable ```config.webpack``` in package.json to ```true```.
There is only one enter file: ```source/js/app.webpack.js```.

### Nunjucks
To use ```nunjucks``` set variable ```config.template``` in package.json to ```html``` and replace './source' content with content from ```./tmp/source_html```.

### Postcss plugins
To use ```rucksack``` set variable ```config.rucksack``` in package.json to ```true```.

### Images
```
├── source/
│   ├── img/                # Template images
│   ├── _img/               # Content images
```

### Vendor plugins
- [jquery-2.2.4](https://jquery.com/)
- [jquery.browser-0.1.0](https://github.com/gabceb/jquery-browser-plugin)
- [modernizr.js](https://modernizr.com/) (test flexbox)
- [flexibility.js](https://github.com/jonathantneal/flexibility) (flexbox polyfill for ie8-9, postcss plugin included)
- [bootstrap 4.0.0-alpha.4](http://v4-alpha.getbootstrap.com/)
- [fixed-sticky-0.1.7](https://github.com/filamentgroup/fixed-sticky)
- [isvg](https://github.com/suenot/isvg)
- [vv](https://github.com/suenot/vv)
- [font-awesome-4.6.3](http://fontawesome.io/)

### Favicons
```npm run favicons```

### Clear+Build+Zip
```npm run zip```

### Clear+Build+Sftp
```npm run sftp```
