import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowInfoComponent } from './show-info.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import * as searchResults from './../../../assets/JSON/search-results.json';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';

describe('ShowInfoComponent', () => {
  let component: ShowInfoComponent;
  let fixture: ComponentFixture<ShowInfoComponent>;

  const mockObj = {
    'score': 16.932875,
    'show': {
      'id': 139,
      'url': 'http://www.tvmaze.com/shows/139/girls',
      'name': 'Girls',
      'type': 'Scripted',
      'language': 'English',
      'genres': [
        'Drama',
        'Romance'
      ],
      'status': 'Ended',
      'runtime': 30,
      'premiered': '2012-04-15',
      'officialSite': 'http://www.hbo.com/girls',
      'schedule': {
        'time': '22:00',
        'days': [
          'Sunday'
        ]
      },
      'rating': {
        'average': 6.7
      },
      'weight': 97,
      'network': {
        'id': 8,
        'name': 'HBO',
        'country': {
          'name': 'United States',
          'code': 'US',
          'timezone': 'America/New_York'
        }
      },
      'webChannel': null,
      'externals': {
        'tvrage': 30124,
        'thetvdb': 220411,
        'imdb': 'tt1723816'
      },
      'image': {
        'medium': 'http://static.tvmaze.com/uploads/images/medium_portrait/31/78286.jpg',
        'original': 'http://static.tvmaze.com/uploads/images/original_untouched/31/78286.jpg'
      },
      // tslint:disable-next-line: max-line-length
      'summary': '<p>This Emmy winning series is a comic look at the assorted humiliations and rare triumphs of a group of girls in their 20s.</p>',
      'updated': 1577601053,
      '_links': {
        'self': {
          'href': 'http://api.tvmaze.com/shows/139'
        },
        'previousepisode': {
          'href': 'http://api.tvmaze.com/episodes/1079686'
        }
      }
    }
  };

  const mockActivatedRoute = {
    snapshot: {
      params: { showId: mockObj.show.id }
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ShowInfoComponent],
      imports: [
        SharedModule,
        RouterTestingModule.withRoutes([]),
        HttpClientModule
      ],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowInfoComponent);
    component = fixture.componentInstance;
    component.show = searchResults.default[0].show;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render title in a h2 tag', async(() => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h2').textContent).toContain(mockObj.show.name);
  }));

  it('should render the image', async(() => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('div.col-md-4>img').src).toContain(mockObj.show.image.medium);
  }));

  it('should render the summary in innerHTML', async(() => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('div.col-md-8>div.summary').innerHTML).toContain(mockObj.show.summary);
  }));

  it('should render the title in matcard', async(() => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('mat-card.header').textContent).toContain('Details');
  }));

  it('should render the title in p tag for show language', async(() => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('p#lang').textContent).toContain(mockObj.show.language);
  }));

  it('should render the title in p tag for show schedule', async(() => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('p#schedule').textContent).toContain(mockObj.show.schedule.days.join(', '));
  }));

  it('should render the title in p tag for show status', async(() => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('p#status').textContent).toContain(mockObj.show.status);
  }));

  it('should render the title in p tag for show type', async(() => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('p#type').textContent).toContain(mockObj.show.type);
  }));

  it('should render the title in p tag for show genres', async(() => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('p#genre').textContent).toContain(mockObj.show.genres.join(' | '));
  }));

  it('should render link in a tag for show official site', async(() => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('p#site>a').textContent).toContain(mockObj.show.officialSite);
  }));

});
