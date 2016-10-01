# Gulp bundle for frontend

## For development
### Install
```npm i```

### Start
```gulp``` or ```npm start``` (start with local gulp)

## With flags
```gulp --del --open --liveof --prefix```
```--del``` - clean *public* folder, autostart in production
```--open``` - open site in browser
```--liveof``` - livereload turnOff
```--prefix``` - css prefixs for old browsers, autostart in production
```--serverof``` - without server and watch


### For production: without sourcemaps in css and with clean *public* folder:
```NODE_ENV=production gulp --serverof``` or ```npm run build``` (start with local gulp)


### Webpack (only js)
There is only one enter file: assets/js/app.webpack.js