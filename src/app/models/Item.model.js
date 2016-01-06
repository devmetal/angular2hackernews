'use strict';

import moment from 'moment';

export class ItemModel {
  _id;
  by;
  time;
  text;
  url;
  score;
  title;
  kids;

  constructor(item) {
    this._id   = "" + item.id;
    this.by    = item.by;
    this.time  = item.time;
    this.text  = item.text || "";
    this.url   = item.url || "";
    this.score = item.score || 0;
    this.title = item.title || "";
    this.kids  = item.kids || [];
  }

  timeAgo() {
    return moment.unix(this.time)
      .fromNow();
  }
}
