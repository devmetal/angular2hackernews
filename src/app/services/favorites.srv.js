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

    item = Object.assign(item, {
      _id: `${item.id}`
    });

    console.log(item);

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
        return items.rows.map(row => row.doc);
      } else {
        return false;
      }
    } catch(err) {
      return false;
    }
  }
}
