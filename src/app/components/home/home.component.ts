import { Component, OnInit } from '@angular/core';
import { IShow } from 'src/app/models/show';
import { TvShowService } from 'src/app/services/tv-show.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  showsList: Array<IShow> = [];
  selectedGenre = '';
  genreList: Array<IShow> = [];
  filteredList: Array<IShow> = [];
  duplicateGenres: Array<string> = [];
  genreArr: Array<string> = [];

  constructor(private tvShowService: TvShowService) { }

  ngOnInit() {
    this.tvShowService.getAllShows().subscribe((response) => {
      this.showsList = [];
      if (response.length > 0) {
        this.showsList = response;
        // sorting the response to show highest rated shows accordingly of genre
        this.showsList.sort((prev, curr) => (prev.rating.average < curr.rating.average) ? 1 : -1);
        this.duplicateGenres = [];
        this.showsList.forEach(show => {
          show.genres.filter(genre => {
            this.duplicateGenres.push(genre);
          });
        });
        // Array.from creates a new array instance by iterating through duplicateGenres
        this.genreArr = Array.from(new Set(this.duplicateGenres));
      } else {
        this.showsList = [];
        this.duplicateGenres = [];
        this.selectedGenre = '';
        this.genreArr = [];
      }
    });

  }

  getGenreSpeclist(name) {
    this.selectedGenre = name;
    this.filteredList = [], this.genreList = [];
    this.showsList.forEach(show => {
      show.genres.filter(genre => {
        if (this.selectedGenre === genre) {
          this.genreList.push(show);
        }
      });
    });
    return this.genreList;
  }

}
