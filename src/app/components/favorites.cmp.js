'use strict';

import { Component }   from 'angular2/core';
import { NgFor } from 'angular2/common';
import { FavoritesDb }   from '../services';

@Component({
  selector: 'favorites',
  template: `
    <h1>Favorites</h1>
    <dl>
      <dt *ngFor='#item of items'>
        {{item.title}}
      </dt>
    </dl>
  `,
  directives: [NgFor]
})
export default class {
  constructor(favorites: FavoritesDb) {
    this.favorites = favorites;
    this.items = [];
    this.fetchAll();
  }

  async fetchAll() {
    this.items = await this.favorites.findAll();
  }
}
