# T-80
Universtal starter kit for frontend
- [gulp 3.9.1](http://gulpjs.com/)
- [webpack 1.13.2](https://webpack.github.io/)
- [sass](http://sass-lang.com/)
- [postcss](http://postcss.org/) plugins:
	- [flexibility](https://github.com/7rulnik/postcss-flexibility)
	- [autoprefixer](https://github.com/postcss/autoprefixer)
	- [rucksack](https://github.com/simplaio/rucksack)
- [pug](https://pugjs.org/api/getting-started.html) or [nunjucks (html)](https://mozilla.github.io/nunjucks/)

### Install
```npm i```

### Start
```gulp``` or ```npm start``` (start with local gulp)

### With flags
- ```gulp --del --liveof --prefix```
- ```--del``` - clean *public* folder, autostart in production
- ```--liveof``` - livereload turnOff
- ```--prefix``` - css prefixs for old browsers, autostart in production
- ```--serverof``` - without server and watch

### For production: without sourcemaps in css and with clean *public* folder:
```NODE_ENV=production gulp --serverof``` or ```npm run build``` (start with local gulp)


### Webpack (only js)
To use ```webpack``` set variable ```config.webpack``` in package.json to ```true```.
There is only one enter file: ```assets/js/app.webpack.js```.

### Nunjucks
To use ```nunjucks``` set variable ```config.template``` in package.json to ```html``` and replace './assets' content with content from ```./tmp/assets_html```.

### Images
```
├── assets/                 # Sources
│   ├── img/                # Template images
│   ├── _img/               # Content images
```
