'use strict';

import { Injectable } from 'angular2/core';
import PouchDB        from 'pouchdb';
import { ItemModel }  from '../models';
import { Observable } from 'rxjs';

@Injectable()
export default class {

  constructor() {
    this.db = new PouchDB('favorites');

    this.datas = {
      favorites:[]
    };

    this.loadPromise = null;
    this.loaded = false;
    this.favorites = null;
    this.favoritesObserver = null;

    this.initObserver();
  }

  initObserver() {
    this.favorites = Observable.create((observer) => {
      this.favoritesObserver = observer;
    });
  }

  getFavorites() {
    if (this.loaded === true) {
      return Promise.resolve(this.datas.favorites);
    }

    if (this.loadPromise) {
      return this.loadPromise;
    }

    let resolve, reject;
    this.loadPromise = new Promise((res, rej) => {
      resolve = res;
      reject = rej;
    });

    const opts = {include_docs: true};
    this.db.allDocs(opts)
      .then(items  => items.rows.map(item => new ItemModel(item.doc)))
      .then(models => {
        this.loaded = true;
        this.datas.favorites = models;
        resolve(this.datas.favorites);
        this.loadPromise = null;
      })
      .catch(err => {
        this.datas.favorites = [];
        resolve(this.datas.favorites);
        this.loadPromise = null;
      });

    return this.loadPromise;
  }

  async loadFavorites() {
    let items;

    try {
      const opts = {include_docs: true};
      items = await this.db.allDocs(opts);
    } catch(err) {
      this.datas.favorites = [];
    }

    this.datas.favorites = items.rows.map(
      item => new ItemModel(item.doc)
    );

    this.loaded = true;

    this.favoritesObserver.next(this.datas.favorites);
  }

  async save(item) {
    let result = await this.db.post(item);
    if (result.ok !== true) {
      this.favoritesObserver.error('Save error');
      return false;
    }

    item._pid = result.id;
    item._rev = result.rev;

    this.datas.favorites.push(item);
    this.favoritesObserver.next(this.datas.favorites);

    return true;
  }

  async delete(item) {
    let id = item._pid;
    let rev = item._rev;
    let result = await this.db.remove(id, rev);

    if (result.ok !== true) {
      this.favoritesObserver.error('Delete error');
      return false;
    }

    let index = this.datas.favorites.indexOf(item);
    this.datas.favorites.splice(index, 1);
    this.favoritesObserver.next(this.datas.favorites);

    return true;
  }
}
