import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GlobalService } from './global.service';

const httpOptions = {
	headers: new HttpHeaders({ 'Content-Type':'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class TwitterService {
	public url: string;

	constructor(
		private _http: HttpClient,
		private _global: GlobalService
	) {
		this.url = this._global.url;
	}

	getTweets() {
		return this._http.get(this.url + 'home_timeline');
	}

	getMentions() {
		return this._http.get(this.url + 'mentions_timeline');
  }
  
  twitear(tweet:any) {
		let params = {status: tweet};//JSON.stringify(tweet);
		return this._http.post(this.url + 'post_tweet',params, httpOptions);
	}

}
