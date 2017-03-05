// Polyfills
import 'angular2-universal-polyfills';
import 'ts-helpers';
import './__workaround.browser';

// Libraries
import './app/shared/lib/rxjs-operators';

// Plugins
import * as $ from 'jquery';
import * as Raven from 'raven-js';
import 'swiper';

// Angular 2
import { enableProdMode }      from '@angular/core';
import { platformBrowser }     from '@angular/platform-browser';
import { bootloader }          from '@angularclass/bootloader';

import { load as loadWebFont } from 'webfontloader';

enableProdMode();

import { MainModuleNgFactory } from './browser.module.ngfactory';

export const platformRef = platformBrowser();

export function main() {
  loadWebFont({
    google: {
      families: ['Open Sans']
    }
  });

  return platformRef.bootstrapModuleFactory(MainModuleNgFactory);
}

bootloader(main);
