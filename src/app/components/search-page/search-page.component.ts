import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IShow } from './../../models/show';
import { TvShowService } from 'src/app/services/tv-show.service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit {
  searchResults: IShow[] = [];
  query = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private service: TvShowService,
  ) {}

  ngOnInit() {
    sessionStorage.clear();
    this.getShows();
  }

  getShows() {
    this.query = '';
    this.activatedRoute.queryParams.subscribe(val => {
      this.query = val.query;
      this.searchResults = [];
      this.service.getShowsFromSearch(this.query).subscribe((response) => {
        response.filter((list) => this.searchResults.push(list.show));
      });
    });
  }
}
