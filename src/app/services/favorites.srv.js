'use strict';

import { Injectable } from 'angular2/core';
import PouchDB        from 'pouchdb';
import { ItemModel }  from '../models';

@Injectable()
export default class {

  constructor() {
    this.db = new PouchDB('favorites');
  }

  async save(item) {
    try {
      let resp = await this.db.put(item);
      console.log(resp);
      return resp.ok === true;
    } catch(err) {
      console.log(err);
      return false;
    }
  }

  async delete(id) {
    try {
      let item = await this.db.get(id);
      let resp = await this.db.remove(item);
      return resp.ok === true;
    } catch(err) {
      return false;
    }
  }

  async findAll() {
    try {
      let items = await this.db.allDocs({
        include_docs: true
      });

      if (items.rows) {
        return items.rows.map(row => new ItemModel(row.doc));
      } else {
        return [];
      }
    } catch(err) {
      return false;
    }
  }

  async isFavorite(item) {
    try {
      
    } catch(err) {

    }
  }

  async findAllId() {
    try {
      let items = await this.db.allDocs({
        include_docs: false
      });
      console.log(items);
      if (items.rows) {
        console.log(items.rows);
        return items.rows.map(row => row.id);
      } else {
        return [];
      }
    } catch(err) {
      console.log(err);
      return false;
    }
  }
}
