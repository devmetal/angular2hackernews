'use strict';

import {
  Component,
  Input,
  Output,
  Attribute,
  EventEmitter
} from 'angular2/core';

import {
  NgIf
} from 'angular2/common';

import {
  ROUTER_DIRECTIVES
} from 'angular2/router';

import { ItemModel } from '../models';

@Component({
  selector: 'item',
  directives: [NgIf, ROUTER_DIRECTIVES],
  template: `
    <div>
      <a [href]='item.url' target='_blank'>{{item.title}}</a>
    </div>
    <div class='info'>
      <ul>
        <li>{{item.score}}</li>
        <li>by {{item.by}}</li>
        <li>{{item.timeAgo()}}</li>
        <li><a [routerLink]="['/Item', {id: item._id}]">comments</a></li>
        <li *ngIf='!favorite'><a href="#" (click)='clickOnFavorite($event)'>favorite</a></li>
      </ul>
    </div>
  `
})
export default class {
  @Input()
  item: ItemModel;

  @Input()
  favorite;

  @Output('on-favorite')
  onFavorite: EventEmitter;

  constructor(){
    this.onFavorite = new EventEmitter();
  }

  clickOnFavorite($event) {
    $event.preventDefault();
    this.onFavorite.emit('event');
  }
}
