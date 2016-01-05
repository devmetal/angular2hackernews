'use strict';

import { Component } from 'angular2/core';

import Items     from './items.cmp';
import { HnFb }  from '../services';

@Component({
  selector:'newstories',
  template:`
    <h1>New Stories</h1>
    <items
      [items]='stories'
      [pending]='pending'
      (view-more)='viewMore()'>
    </items>
  `,
  directives:[Items]
})
export default class {
  constructor(db: HnFb) {
    this.db = db;
    this.stories = [];
    this.pending = true;
    this.fetchStories();
  }

  async fetchStories() {
    this.stories = await this.db.newstories(50);
    this.pending = false;
  }
}
