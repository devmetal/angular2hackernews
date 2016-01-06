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

import Preloader from './preloader.cmp';
import Item      from './item.cmp';

import { FavoritesDb } from '../services';

@Component({
  selector:'items',
  template:`
  <dl>
      <dt *ngFor='#item of items'>
        <item [item]='item' (on-favorite)='favorite(item)' [favorite]='isFavorite(item)'></item>
      </dt>
  </dl>
  <div>
    <div *ngIf='isPending'><preloader></preloader></div>
    <button class='button' *ngIf='!isPending' (click)='viewMore()'>View More</button>
  </div>
  `,
  directives:[NgFor, NgIf, Preloader, Item]
})
export default class {
  @Input()
  items;

  @Input()
  pending;

  @Output('view-more')
  viewMoreEvent: EventEmitter;

  constructor(favorites: FavoritesDb) {
    this.fv = favorites;
    this.favorites = [];
    this.getFavorites();
    this.viewMoreEvent = new EventEmitter();
  }

  viewMore() {
    this.viewMoreEvent.emit('event');
  }

  async favorite(item) {
    let result = await this.fv.save(item);
    if (result === true) {
      item.favorited = true;
    }
  }

  async getFavorites() {
    this.favorites = await this.fv.findAllId();
  }

  isFavorite(item) {
    return !!this.favorites.length
      && this.favorites.indexOf(item._id) !== -1;
  }

  get isPending() {
    return !!this.pending || false;
  }
}
