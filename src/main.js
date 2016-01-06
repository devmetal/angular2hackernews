'use strict'

import 'zone.js/lib/browser/zone-microtask';
import 'reflect-metadata';
import 'babel-polyfill';

import PouchDB from 'pouchdb';
import AppComponent          from './app';
import { HnFb, FavoritesDb } from './app/services';

import { provide }    from 'angular2/core';
import { bootstrap }  from 'angular2/bootstrap';
import {
  ROUTER_PROVIDERS,
  LocationStrategy,
  HashLocationStrategy
} from 'angular2/router';

window.PouchDB = PouchDB;

bootstrap(AppComponent, [
  HnFb,
  FavoritesDb,
  ROUTER_PROVIDERS,
  provide(LocationStrategy, { useClass: HashLocationStrategy })
]);
