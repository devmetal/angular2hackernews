'use strict'

import 'zone.js/lib/browser/zone-microtask';
import 'reflect-metadata';
import 'babel-polyfill';

import AppComponent   from './app/hn';
import HnDb           from './app/HnDb';
import { provide } from 'angular2/core';
import { bootstrap }  from 'angular2/bootstrap';
import { ROUTER_PROVIDERS, LocationStrategy, HashLocationStrategy } from 'angular2/router';

bootstrap(AppComponent, [
  HnDb,
  ROUTER_PROVIDERS,
  provide(LocationStrategy, { useClass: HashLocationStrategy })
]);
