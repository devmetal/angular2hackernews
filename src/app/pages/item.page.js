'use strict';

import {
  Component,
  Input
} from 'angular2/core';

import {
  NgFor,
  NgIf
} from 'angular2/common';

import {
  RouteParams
} from 'angular2/router';

import { HnFb } from '../services';

import { CommentList } from '../components';

@Component({
  selector:'item-page',
  template:`
    <dl *ngIf='item'>
      <dt>
        <a [href]='item.url' target='_blank'><strong>{{item.title}}</strong></a>
      </dt>
      <comment-list *ngIf='!!kids.length' [comments]='kids'></comment-list>
    </dl>
  `,
  directives: [NgFor, NgIf, CommentList]
})
export default class {
  constructor(db: HnFb, routeParam: RouteParams) {
    this.db = db;
    this.item = null;
    this.kids = [];
    this.routeParam = routeParam;
    this.fetchItem();
  }

  async fetchItem() {
    let id = this.routeParam.params.id;
    this.item = await this.db.item(id);
    this.kids = await this.db.kids(this.item);
  }
}
