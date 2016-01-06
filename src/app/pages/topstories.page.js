'use strict';

import { Component } from 'angular2/core';

import { Items } from '../components';
import { HnFb }  from '../services';

@Component({
  selector:'topstories-page',
  template:`
    <h1>Topstories</h1>
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
    this.n = 25;
    this.pending = true;
    this.fetchStories(25);
  }

  viewMore() {
    this.n += 25;
    this.pending = true;
    this.fetchStories(this.n);
  }

  async fetchStories(n = 25) {
    this.stories = await this.db.topstories(n);
    this.pending = false;
  }
}
