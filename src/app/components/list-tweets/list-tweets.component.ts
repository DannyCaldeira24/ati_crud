import { Component, OnInit } from '@angular/core';
import { TwitterService } from '../../services/twitter.service';
import { Tweet } from '../../models/tweet';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-tweets',
  templateUrl: './list-tweets.component.html',
  styleUrls: ['./list-tweets.component.scss']
})
export class ListTweetsComponent implements OnInit {
  public mentions;
  public tweets;
  public tweet: Tweet;
  public tweet_text="";
  constructor(
    private _twitterService: TwitterService
  ) { this.tweet = new Tweet(''); }

  ngOnInit() {
    this.getTweets();
    this.getMentions();
  }

  getTweets() {
    this._twitterService.getTweets().subscribe(
      result => {
        if (!result['data']) {
          console.log(result);
        } else {
          this.tweets = result['data'];
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  getMentions() {
    this._twitterService.getMentions().subscribe(
      result => {
        if (!result['data']) {
          console.log(result);
        } else {
          this.mentions = result['data'];
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  onSubmit() {
    console.log(this.tweet_text);
    Swal.fire({
      showCancelButton: false,
      showConfirmButton: false,
      html: '<div class = "animated fadeIn fa-child-ss"><i class="fas fa-spinner fa-spin fa-2x"></i></div>',
      allowOutsideClick: false
    });
    this._twitterService.twitear(this.tweet_text).subscribe(
      response => {
        Swal.close();
        if(response['data']){
          Swal.fire("Excelente", "El tweet fue enviado", "success");
        }else{
          Swal.fire("Ups", "El tweet no fue enviado", "warning");
        }
        
      },
      error => {
        console.log(<any>error);
      }
    );

  }

}
