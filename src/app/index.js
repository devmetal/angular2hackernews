'use strict';

import { Component } from 'angular2/core';
import { RouteConfig, ROUTER_DIRECTIVES } from 'angular2/router';

import {
  Topstories,
  Newstories,
  Item
} from './components';

@Component({
  selector: 'my-app',
  template: `
  <nav>
    <div class='container navbar'>
      <a href='#/'>Home</a>
      <ul class='float-right'>
        <li><a [routerLink]="['Topstories']">Topstories</a></li>
        <li><a [routerLink]="['Newstories']">Newstories</a></li>
      </ul>
    </div>
  </nav>
  <!-- Routed views go here -->
  <div class='container'>
    <div class='row'>
      <div class='column'>
        <router-outlet></router-outlet>
      </div>
    </div>
  </div>
  `,
  directives: [ROUTER_DIRECTIVES]
})
@RouteConfig([
  {path: '/',         name:'Topstories', component: Topstories},
  {path: '/news',     name:'Newstories', component: Newstories},
  {path: '/item/:id', name:'Item',       component: Item}
])
class AppComponent {
  constructor() {}
}

export default AppComponent;
