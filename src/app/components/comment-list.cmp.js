'use strict';

import { Component, Input, ViewMetadata, ComponentMetadata } from 'angular2/core';
import { NgFor, NgIf }     from 'angular2/common';

import Comment  from './comment.cmp';
import { HnFb } from '../services/';

function CommentList(db) {
  this.db = db;
}

CommentList.prototype.expand = async function expand(item) {
  if (!item.children) {
    item.children = await this.db.kids(item);
  }
}

CommentList.annotations = [
  new ViewMetadata({
    template: `
      <dd>
        <dl>
          <dt *ngFor='#kid of comments'>
            <comment [item]='kid' (on-expand)='expand(kid)'></comment>
            <comment-list *ngIf='kid.children' [comments]='kid.children'></comment-list>
          </dt>
        </dl>
      </dd>
    `,
    directives: [NgFor, NgIf, Comment, CommentList]
  }),
  new ComponentMetadata({
    selector: 'comment-list',
    inputs: ['comments']
  })
];

CommentList.parameters = [[HnFb]];

export { CommentList };
