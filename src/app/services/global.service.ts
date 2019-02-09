import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  public url;
  constructor() {
    this.url = "http://localhost:3000/api/";
  }
}
