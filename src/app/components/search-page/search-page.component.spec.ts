import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchPageComponent } from './search-page.component';
import { ShowItemComponent } from '../show-item/show-item.component';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from 'src/app/shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { TvShowService } from 'src/app/services/tv-show.service';
import { of } from 'rxjs';
import * as searchResults from './../../../assets/JSON/search-results.json';
import { ActivatedRoute } from '@angular/router';

describe('SearchPageComponent', () => {
  let component: SearchPageComponent;
  let fixture: ComponentFixture<SearchPageComponent>;
  let service: TvShowService;

  const mockActivatedRoute = {
    snapshot: {
      queryParams: { query: 'girls' }
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SearchPageComponent, ShowItemComponent],
      imports: [
        RouterTestingModule,
        SharedModule,
        HttpClientModule
      ],
      providers: [{ provide: ActivatedRoute, useValue: mockActivatedRoute }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    service = TestBed.get(TvShowService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render title in a h2 tag', async(() => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h2').textContent).toContain('Search results');
  }));

  it('should render title in a p tag', async(() => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('p').textContent).toContain('No Shows Available');
  }));

  it('should call ngOnInit', () => {
    component.ngOnInit();
  });

  it('should check response of subscribe and mock data match or not', () => {
    component.getShows();
    spyOn(service, 'getShowsFromSearch').and.callFake(function (girls) {
      if (girls) {
        return of(searchResults.default);
      }
    });
    service.getShowsFromSearch('girls').subscribe((value) => {
      expect(value).toBe(searchResults.default);
    });
  });

  it('should spy on getShows method', () => {
    spyOn(component, 'getShows').and.callThrough();
    component.getShows();
    expect(component.getShows).toHaveBeenCalledWith();
  });




});
