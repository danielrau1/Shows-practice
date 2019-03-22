import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  // getUsers() {
  //   return this.http.get('https://reqres.in/api/users');
  // }

  theURL = 'http://api.tvmaze.com/singlesearch/shows?q=the+magicians&embed=episodes';
  getEpisodes(u) {
    return this.http.get(u);
  }
  getShows() {
    return this.http.get('http://api.tvmaze.com/schedule?country=US&date=2019-03-21');
  }

}
