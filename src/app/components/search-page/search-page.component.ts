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
  ) {
    this.searchResults = [];
  }

  ngOnInit() {
    this.getShows();
  }

  getShows() {
    this.query = this.activatedRoute.snapshot.queryParams['query'];
    this.service.getShowsFromSearch(this.query).subscribe((response) => {
      response.filter((list) => this.searchResults.push(list.show));
    });
  }
}
