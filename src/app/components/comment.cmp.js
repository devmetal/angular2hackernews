'use strict';

import {
  Component,
  Input,
  Output,
  EventEmitter
} from 'angular2/core';

import { NgIf } from 'angular2/common';

@Component({
  selector:'comment',
  template: `
    <div><a href="" *ngIf='hasReply' (click)='expand($event)'> + </a> <strong> {{item.by}} </strong></div>
    <div [innerHTML]='item.text'></div>
  `,
  decorators: [NgIf]
})
export default class {
  constructor() {
    this.expandEvent = new EventEmitter();
  }

  @Input()
  item;

  @Output('on-expand')
  expandEvent: EventEmitter;

  expand($event) {
    $event.preventDefault();
    this.expandEvent.emit('event');
  }

  get hasReply() {
    return !!(this.item.kids || []).length;
  }
}
