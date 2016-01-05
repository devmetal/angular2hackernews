'use strict';

import {
  Component,
  Attribute,
  Input,
  Output,
  EventEmitter
} from 'angular2/core';

import {
  NgFor,
  NgIf
} from 'angular2/common';

import {
  ROUTER_DIRECTIVES
} from 'angular2/router';

import Preloader from './preloader.cmp';

@Component({
  selector:'items',
  template:`
  <dl>
      <dt *ngFor='#item of items'>
        <div>
          <a [href]='item.url' target='_blank'>{{item.title}}</a>
        </div>
        <div class='info'>
          <ul>
            <li>{{item.score}}</li>
            <li>by {{item.by}}</li>
            <li><a [routerLink]="['/Item', {id: item.id}]">comments</a></li>
          </ul>
        </div>
      </dt>
  </dl>
  <div>
    <div *ngIf='isPending'><preloader></preloader></div>
    <button class='button' *ngIf='!isPending' (click)='viewMore()'>View More</button>
  </div>
  `,
  directives:[NgFor, NgIf, Preloader, ROUTER_DIRECTIVES]
})
export default class {
  @Input()
  items;

  @Input()
  pending;

  @Output('view-more')
  viewMoreEvent: EventEmitter;

  constructor() {
    this.viewMoreEvent = new EventEmitter();
  }

  viewMore() {
    this.viewMoreEvent.emit('event');
  }

  get isPending() {
    return !!this.pending || false;
  }
}
