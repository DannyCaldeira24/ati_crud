import { Component } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ati-spa';
  constructor(
    private _route:ActivatedRoute,
    private _router:Router 
  ){

  }
}
