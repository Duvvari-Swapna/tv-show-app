import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ISearchResult } from '../models/search-result';
import { IShow } from '../models/show';
import { map, catchError } from 'rxjs/operators';
import { ErrorService } from './error.service';
import { Observable } from 'rxjs';

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

  getAllShows(): Observable<IShow[]> {
    return this.http.get(`${ this.api }/shows`)
    .pipe(
      map((shows: IShow[]) => {
        if (shows) {
          return shows;
        }
      }),
      catchError(this.error.handleError)
    );
  }

  getShowsFromSearch(query: string): Observable<ISearchResult[]> {
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

  getShow(showId: number): Observable<IShow> {
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

  getCastDetails(showId: number) {
    return this.http.get(`${ this.api }/shows/${ showId }/cast`)
    .pipe(
      map((cast: Array<object>) => {
        if (cast) {
          return cast;
        }
      }),
      catchError(this.error.handleError)
    );
  }

  getCrewDetails(showId: number) {
    return this.http.get(`${ this.api }/shows/${ showId }/crew`)
    .pipe(
      map((crew: Array<object>) => {
        if (crew) {
          return crew;
        }
      }),
      catchError(this.error.handleError)
    );
  }
}
