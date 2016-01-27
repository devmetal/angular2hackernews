'use strict';

import { Injectable }  from 'angular2/core';
import Firebase      	 from 'firebase';
import { ItemModel }   from '../models';
import { Observable }  from 'rxjs';

const ref = new Firebase('https://hacker-news.firebaseio.com/v0/');

const DEF_LIMIT = 200;

let keysAsync = (table, limit) => {
	let n = limit || DEF_LIMIT;
	return new Promise((resolve, reject) => {
		ref.child(table).limitToFirst(n).once('value', (snap) => {
			resolve(snap.val());
		})
	});
}

let retreiveAsync = (key) => {
	return new Promise((resolve, reject) => {
		ref.child('item').child(key).once('value', snap => resolve(snap.val()))
	});
};

let isStory = (x) => x.type === 'story';

let hasUrl  = (x) => x.url && x.url.length > 0;

@Injectable()
export default class {
	constructor() {

	}

	async item(id) {
		let i = await retreiveAsync(id);
		return new ItemModel(i);
	}

	async topstories(limit) {
		let storyKeys = await keysAsync('topstories', limit);
		let stories   = await Promise.all(storyKeys.map(retreiveAsync));

		return stories
			.filter(s => isStory(s) && hasUrl(s))
			.map(s => new ItemModel(s));
	}

	async newstories(limit) {
		let storyKeys = await keysAsync('newstories', limit);
		let stories   = await Promise.all(storyKeys.map(retreiveAsync));

		return stories
			.filter(s => isStory(s) && hasUrl(s))
			.map(s => new ItemModel(s));
	}

	async kids(item) {
		let keys = item.kids || [];

		if (!keys.length) {
			return [];
		}

		let childs = await Promise.all(keys.map(retreiveAsync));

		return childs
			.map(c => new ItemModel(c));
	}
}
