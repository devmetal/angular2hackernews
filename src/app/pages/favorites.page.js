'use strict';

import { Component }   from 'angular2/core';
import { NgFor } from 'angular2/common';
import { FavoritesDb }   from '../services';

@Component({
  selector: 'favorites-page',
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
  constructor(db: FavoritesDb) {
    this.db = db;
    this.items = [];
  }

  ngOnInit() {
    this.subscribtion = this.db.favorites.subscribe(
      favorites => this.items = favorites,
      err       => console.log(err)
    );

    this.db.loadFavorites();
  }

  ngOnDestroy() {
    this.subscribtion.unsubscribe();
  }
}
