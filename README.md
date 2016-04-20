=======
# Gulp bundle for frontend

## For development
### Install
```npm install```

### Start
```gulp```

## With flags
```gulp --del --open --live --prefix```
```--del``` - clean *public* folder, autostart in production
```--open``` - open site in browser
```--live``` - livereload turnOn
```--prefix``` - css prefixs for old browsers, autostart in production
```--build``` - without server and watch


### For production: without sourcemaps in css and with clean *public* folder:
```NODE_ENV=production gulp```