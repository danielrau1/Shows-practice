import { Component, OnInit } from '@angular/core';
import {DataService} from '../data.service';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  users: Object;
  magicians: Object;
  shows: Object;
  theShows = [{namei: 'The Magicians', urli: ''}, {namei: 'Busy Tonight', urli: ''}];

  name1 = '';
showFile: Object;
allShows = [];

inputShow = '';
url = '';
episodes = Object;

  constructor(private data: DataService, private http: HttpClient) {
  }

  ngOnInit() {
    // Episodes of the Magicians
    this.data.getEpisodes('http://api.tvmaze.com/singlesearch/shows?q=the+magicians&embed=episodes').subscribe(data1 => {
      this.magicians = data1;
      console.log(this.magicians);
    });

    // All Shows airing currently
    this.data.getShows().subscribe(data2 => {
      this.shows = data2;
      console.log(this.shows);
    });


    // Import the shows and their episodes
    for (let i = 0; i < this.theShows.length; i++) {
      this.theShows[i].namei = this.theShows[i].namei.toLowerCase();
      this.theShows[i].namei = this.theShows[i].namei.split(' ').join('+');
      this.theShows[i].urli = 'http://api.tvmaze.com/singlesearch/shows?q=' + this.theShows[i].namei + '&embed=episodes';

      this.data.getEpisodes(this.theShows[i].urli).subscribe(data1 => {
        this.showFile = data1;
        console.log(this.showFile);
        this.allShows.push(this.showFile);
      });

    }
    console.log(this.allShows);

  // Input: import the episodes of the input show

  }
fetchEpisodes() {
    this.inputShow = document.getElementById('showBox').value;
    this.inputShow = this.inputShow.toLowerCase();
    this.inputShow = this.inputShow.split(' ').join('+');
    this.url = 'http://api.tvmaze.com/singlesearch/shows?q=' + this.inputShow + '&embed=episodes';

    this.data.getEpisodes(this.url).subscribe(data1 => {
      this.episodes = data1;
      console.log(this.episodes);
    });


};
}
