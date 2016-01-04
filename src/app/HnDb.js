'use strict';

import {Injectable}   from 'angular2/core';
import Firebase       from 'firebase';
import {EventEmitter} from 'events';

let ref = new Firebase('https://hacker-news.firebaseio.com/v0/');

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

@Injectable()
export default class {
	constructor() {}

	async topstories(limit) {
		let isStory = (x) => x.type === 'story';
		let hasUrl  = (x) => x.url && x.url.length > 0;

		let storyKeys = await keysAsync('topstories', limit);
		let stories   = await Promise.all(storyKeys.map(retreiveAsync));

		return stories
			.filter(s => isStory(s) && hasUrl(s))
			.sort((a,b) => b.score - a.score);
	}

	async newstories(limit) {
		let isStory = (x) => x.type === 'story';
		let hasUrl  = (x) => x.url && x.url.length > 0;

		let storyKeys = await keysAsync('newstories', limit);
		let stories   = await Promise.all(storyKeys.map(retreiveAsync));

		return stories
			.filter(s => isStory(s) && hasUrl(s))
			.sort((a,b) => b.score - a.score);
	}

	async kids(item) {
		let keys = item.kids || [];

		if (!keys || !keys.length) {
			return [];
		}

		return await Promise.all(keys.map(retreiveAsync));
	}
}
