import { Component, OnInit } from '@angular/core';
import {DataService} from '../data.service';

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

  constructor(private data: DataService) {
  }

  ngOnInit() {
    // Episodes of the Magicians
    this.data.getMagicians().subscribe(data => {
      this.magicians = data;
      console.log(this.magicians);
    });

    // All Shows airing currently
    this.data.getShows().subscribe(data => {
      this.shows = data;
      console.log(this.shows);
    });


    // Some modifications on the object theShows, will use it later to get the episodes of the shows in the list
    for (let i = 0; i < this.theShows.length; i++) {
      this.theShows[i].namei = this.theShows[i].namei.toLowerCase();
      this.theShows[i].namei = this.theShows[i].namei.split(' ').join('+');
      this.theShows[i].urli = 'http://api.tvmaze.com/singlesearch/shows?q=' + this.theShows[i].namei + '&embed=episodes';
    }
  }

}
