'use strict';

import { Component, Attribute, Input, Output, EventEmitter, Query, QueryList } from 'angular2/core';
import { NgFor, NgIf }     from 'angular2/common';
import { RouteConfig, ROUTER_DIRECTIVES } from 'angular2/router';
import HnDb from './HnDb';

@Component({
  selector:'preloader',
  template:`
  <div class="preloader-wrapper small active">
   <div class="spinner-layer spinner-green-only">
     <div class="circle-clipper left">
       <div class="circle"></div>
     </div><div class="gap-patch">
       <div class="circle"></div>
     </div><div class="circle-clipper right">
       <div class="circle"></div>
     </div>
   </div>
 </div>
  `
})
class Preloader {
  constructor(){}
}

@Component({
  selector: 'item',
  template: `
  <li>
    <div class='collapsible-header'>
      {{item.title}}
      <span class='badge'>{{item.score}}</span>
    </div>
    <div class='collapsible-body'>
      <p>
        <a class="waves-effect waves-light btn" [href]='item.url' target='_blank'><i class="material-icons left">launch</i>Read more</a>
        <a class="waves-effect waves-light btn"><i class="material-icons left">favorite</i>Favorite</a>
        <a class="waves-effect waves-light btn"><i class="material-icons left">share</i>Facebook</a>
        <a class="waves-effect waves-light btn"><i class="material-icons left">share</i>Twitter</a>
      </p>
      <div *ngFor='#kid of kids'>
        <p>{{kid.text}}</p>
      </div>
    </div>
  </li>
  `,
  directives:[NgFor]
})
class Item {
  @Input()
  item;

  constructor(db: HnDb) {
    this.db = db;
    this.kids = [];
    this.pending = false;
  }

  loadKids() {
    this.fetchKids();
    return true;
  }

  async fetchKids() {
    if (!this.pending && !this.kids.length) {
      this.pending = true;
      this.kids = await this.db.kids(this.item);
      console.log(this.kids);
      this.pending = false;
    }
  }
}

@Component({
  selector:'items',
  template:`
  <ul class='collapsible' data-collapsible='accordion'>
    <li *ngFor='#item of items' (click)='kids(item)'>
      <div class='collapsible-header'>
        {{item.title}}
        <span class='badge'>{{item.score}}</span>
      </div>
      <div class='collapsible-body'>
        <p>
          <a class="waves-effect waves-light btn" [href]='item.url' target='_blank'><i class="material-icons left">launch</i>Read more</a>
          <a class="waves-effect waves-light btn"><i class="material-icons left">favorite</i>Favorite</a>
          <a class="waves-effect waves-light btn"><i class="material-icons left">share</i>Facebook</a>
          <a class="waves-effect waves-light btn"><i class="material-icons left">share</i>Twitter</a>
        </p>
        <div *ngIf='item.loadedKids'>
          <div class='container'>
            <div class='row'>
              <div class='col s12'>
                <div class='comment z-depth-1' *ngFor='#kid of item.loadedKids'>
                <div class="chip">
                  {{kid.by}}
                </div>
                  <div [innerHTML]='kid.text'></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </li>
  </ul>
  <div class='collection'>
    <div *ngIf='isPending'  class='collection-item center-align'><preloader></preloader></div>
    <div *ngIf='!isPending' class='collection-item' (click)='viewMore()'>View More</div>
  </div>
  `,
  directives:[NgFor, NgIf, Preloader]
})
class Items {
  @Input()
  items: Array;

  @Input()
  pending;

  @Output('view-more')
  viewMoreEvent: EventEmitter;

  constructor(@Attribute('title') title, db: HnDb) {
    this.db = db;
    this.title = title;
    this.active = null;
    this.viewMoreEvent = new EventEmitter();
  }

  async kids(item) {
    if (!item.loadedKids) {
      item.loadedKids = await this.db.kids(item);
    }
  }

  viewMore() {
    this.viewMoreEvent.emit('event');
  }

  get isPending() {
    return !!this.pending || false;
  }
}

@Component({
  selector:'topstories',
  template:`
    <div class='container'>
      <div class='row'>
        <div class='col s10 offset-s1'>
          <items [items]='stories' [pending]='pending' (view-more)='viewMore()' title='Topstories'></items>
        </div>
      </div>
    </div>
  `,
  directives:[Items]
})
class Topstories {
  constructor(db: HnDb) {
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

@Component({
  selector:'topstories',
  template:`
    <div class='container'>
      <div class='row'>
        <div class='col s10 offset-s1'>
          <items [items]='stories' [pending]='pending' (view-more)='viewMore()' title='Newstories'></items>
        </div>
      </div>
    </div>
  `,
  directives:[Items]
})
class Newstories {
  constructor(db: HnDb) {
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

@Component({
  selector: 'my-app',
  template: `
  <nav class="indigo indigo-text darken-4 text-lighten-5">
    <div class="container nav-wrapper">
      <a href="#/" class="brand-logo">Home</a>
      <ul id="nav-mobile" class="right hide-on-med-and-down">
        <li><a [routerLink]="['Topstories']">Topstories</a></li>
        <li><a [routerLink]="['Newstories']">Newstories</a></li>
      </ul>
    </div>
  </nav>
  <!-- Routed views go here -->
  <router-outlet></router-outlet>
  `,
  directives: [ROUTER_DIRECTIVES]
})
@RouteConfig([
  {path: '/', name:'Topstories', component: Topstories},
  {path: '/news', name:'Newstories', component: Newstories}
])
class AppComponent {
  constructor() {}
}

export default AppComponent;
