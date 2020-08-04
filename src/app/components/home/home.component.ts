import { Component, OnInit } from '@angular/core';
import { IShow } from 'src/app/models/show';
import { Genres } from 'src/app/models/genres';
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
  genreArr = [];

  constructor(private tvShowService: TvShowService) {
    this.showsList = [], this.genreList = [], this.filteredList = [];
    this.genreArr = Object.entries(Genres).filter(e => !isNaN(e[0] as any)).map(e => ({ name: e[1] }));
   }

  ngOnInit() {
    this.tvShowService.getscheduledAll().subscribe((response) => {
      if (response.length > 0) {
      response.filter(shows => {
        this.showsList.push(shows._embedded.show);
      });
      // shuffle genre array to get random genre everytime
      const randomGenre = this.genreArr.sort(() => 0.5 - Math.random());
      this.selectedGenre = randomGenre[0]['name'];
      this.showsList.forEach((show) => {
          show.genres.filter((genre) => {
            if (genre === this.selectedGenre) {
              this.genreList.push(show);
            }
          });
      });
      this.filteredList = this.genreList.sort(() => 0.5 - Math.random()).slice(0, 5);
    } else {
      this.showsList = [];
      this.genreList = [];
      this.selectedGenre = '';
      this.filteredList = [];
    }
    });

  }

}
