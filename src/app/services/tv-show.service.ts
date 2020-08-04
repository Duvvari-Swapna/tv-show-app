import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IScheduledShow } from '../models/shows';
import { ISearchResult } from '../models/search-result';
import { IShow } from '../models/show';
import { map, catchError } from 'rxjs/operators';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root'
})
export class TvShowService {

  api: string;

  constructor(
    private http: HttpClient, private error: ErrorService
  ) {
    this.api = environment.API;
  }

  getscheduledAll() {
    return this.http.get(`${ this.api }/schedule/full`)
    .pipe(
      map((shows: IScheduledShow[]) => {
        if (shows) {
          return shows;
        }
      }),
      catchError(this.error.handleError)
    );
  }

  getShowsFromSearch(query: string) {
    return this.http.get<ISearchResult[]>(`${ this.api }/search/shows?q=${ query }`)
    .pipe(
      map((result: ISearchResult[]) => {
        if (result) {
          return result;
        }
      }),
      catchError(this.error.handleError)
    );
  }

  getShow(showId: number) {
    return this.http.get<IShow>(`${ this.api }/shows/${ showId }`)
    .pipe(
      map((show: IShow) => {
        if (show) {
          return show;
        }
      }),
      catchError(this.error.handleError)
    );
  }
}
