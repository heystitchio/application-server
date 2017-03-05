// Polyfills
import 'angular2-universal-polyfills';
import 'ts-helpers';
import './__workaround.node';

import * as fs from 'fs';
import * as path from 'path';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as morgan from 'morgan';
import * as mcache from 'memory-cache';
const { gzipSync } = require('zlib');
const accepts = require('accepts');
const { compressSync } = require('iltorb');
const interceptor = require('express-interceptor');

// Plugins
import * as Raven from 'raven-js';

// Angular
import { enableProdMode }      from '@angular/core';
import { createEngine }        from 'angular2-express-engine';

// App
import { MainModuleNgFactory } from './node.module.ngfactory';

// Routes
import { routes } from './server.routes';

// Apollo
import { client as apolloClient } from './apollo.node';

enableProdMode();

const app = express();
const ROOT = path.join(path.resolve(__dirname, '..'));

app.engine('.html', createEngine({
  precompile: false,
  ngModule: MainModuleNgFactory,
  providers: [
    // use only if you have shared state between users
    // { provide: 'LRU', useFactory: () => new LRU(10) }

    // stateless providers only since it's shared
  ]
}));

app.set('port', process.env.PORT || 3000);
app.set('views', __dirname);
app.set('view engine', 'html');
app.set('json spaces', 2);

app.use(cookieParser());
app.use(bodyParser.json());
app.use(interceptor((req, res)=>({
  // don't compress responses with this request header
  isInterceptable: () => (!req.headers['x-no-compression']),
  intercept: ( body, send ) => {
    const encodings  = new Set(accepts(req).encodings());
    const bodyBuffer = new Buffer(body);
    // url specific key for response cache
    const key = '__response__' + req.originalUrl || req.url;
    let output = bodyBuffer;
    // check if cache exists
    if (mcache.get(key) === null) {
      // check for encoding support
      if (encodings.has('br')) {
        // brotli
        res.setHeader('Content-Encoding', 'br');
        output = compressSync(bodyBuffer);
        mcache.put(key, {output, encoding: 'br'});
      } else if (encodings.has('gzip')) {
        // gzip
        res.setHeader('Content-Encoding', 'gzip');
        output = gzipSync(bodyBuffer);
        mcache.put(key, {output, encoding: 'gzip'});
      }
    } else {
      const { output, encoding } = mcache.get(key);
      if(encodings.has(encoding)){
          res.setHeader('Content-Encoding', encoding);
          send(output);
          return;
      }
    }
    send(output);
  }
})));

const accessLogStream = fs.createWriteStream(ROOT + '/morgan.log', {flags: 'a'})

app.use(morgan('common', {
  skip: (req, res) => res.statusCode < 400,
  stream: accessLogStream
}));

function cacheControl(req, res, next) {
  res.header('Cache-Control', 'max-age=60');
  next();
}

app.use('/assets', cacheControl, express.static(path.join(__dirname, 'assets'), {maxAge: 30}));
app.use(cacheControl, express.static(path.join(ROOT, 'dist/client'), {index: false}));

process.on('uncaughtException', function (err) { 
  console.error('Catching uncaught errors to avoid process crash', err);
});

function ngApp(req, res) {

  function onHandleError(parentZoneDelegate, currentZone, targetZone, error)  {
    console.warn('Error in SSR, serving for direct CSR');
    res.sendFile('index.html', {root: './src'});
    return false;
  }

  apolloClient.initStore();

  Zone.current.fork({ name: 'CSR fallback', onHandleError }).run(() => {
    res.render('index', {
      req,
      res,
      preboot: { appRoot: 'app' },
      baseUrl: '/',
      requestUrl: req.originalUrl,
      originUrl: `http://localhost:${ app.get('port') }`
    });
  });

}

app.get('/', ngApp);
routes.forEach(route => {
  app.get(`/${route}`, ngApp);
  app.get(`/${route}/*`, ngApp);
});

app.get('*', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  var pojo = { status: 404, message: 'No Content' };
  var json = JSON.stringify(pojo, null, 2);
  res.status(404).send(json);
});

// Server
let server = app.listen(app.get('port'), () => {
  console.log(`Listening on: http://localhost:${server.address().port}`);
});
