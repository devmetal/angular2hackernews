'use strict';

import moment from 'moment';

export class ItemModel {
  fid;
  _pid;
  _rev;
  by;
  time;
  text;
  url;
  score;
  title;
  kids;

  constructor(item) {
    this.fid   = item.id;
    this._pid  = item._id || "";
    this._rev  = item._rev || "";
    this.by    = item.by;
    this.time  = item.time;
    this.text  = item.text || "";
    this.url   = item.url || "";
    this.score = item.score || 0;
    this.title = item.title || "";
    this.kids  = item.kids || [];
  }

  timeAgo() {
    return moment.unix(this.time).fromNow();
  }

  isFavorite() {
    return typeof this._pid !== 'undefined';
  }
}
