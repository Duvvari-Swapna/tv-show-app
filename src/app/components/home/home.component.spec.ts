import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { ShowItemComponent } from '../show-item/show-item.component';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from 'src/app/shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { TvShowService } from 'src/app/services/tv-show.service';
import { of } from 'rxjs/internal/observable/of';
import * as data from './../../../assets/JSON/shows.json';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let service: TvShowService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeComponent, ShowItemComponent ],
      imports: [RouterTestingModule, SharedModule, HttpClientModule],
      providers: [TvShowService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    service = TestBed.get(TvShowService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getAllShows service and check if response is there', () => {
    spyOn(service, 'getAllShows').and.callFake(() => {
      return of(data.default);
    });
    component.ngOnInit();
    expect(service.getAllShows).toHaveBeenCalledWith();
    expect(component.showsList.length).toBeGreaterThan(1);
  });

  it('should call getAllShows service and check if response is empty', () => {
    spyOn(service, 'getAllShows').and.callFake(() => {
      return of([]);
    });

    component.ngOnInit();
    expect(service.getAllShows).toHaveBeenCalledWith();
    expect(component.showsList).toEqual([]);
    expect(component.duplicateGenres).toEqual([]);
    expect(component.genreArr).toEqual([]);
    expect(component.selectedGenre).toMatch('');
  });

  it('should call getGenreSpeclist with specific genre', () => {
    const name = 'Drama';
    component.showsList = data.default;
    expect(component.showsList.length).toBeGreaterThan(1);
    component.getGenreSpeclist(name);
    expect(component.selectedGenre).toBe(name);
    component.showsList.filter(show => {
      show.genres.filter(genre => {
        if (component.selectedGenre === genre) {
          component.genreList.push(show);
        }
      });
    });
    expect(component.genreList.length).toBeGreaterThan(1);
    component.filteredList = component.genreList.slice(0, 5);
    expect(component.filteredList.length).toEqual(5);
    return component.filteredList;
  });

});
