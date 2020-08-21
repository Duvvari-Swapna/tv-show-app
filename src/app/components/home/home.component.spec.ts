import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { ShowItemComponent } from '../show-item/show-item.component';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from 'src/app/shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { TvShowService } from 'src/app/services/tv-show.service';
import { of } from 'rxjs/internal/observable/of';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let service: TvShowService;

  const DATA = [
    {
      'id': 1,
      'url': 'http://www.tvmaze.com/shows/1/under-the-dome',
      'name': 'Under the Dome',
      'type': 'Scripted',
      'language': 'English',
      'genres': [
         'Drama',
         'Science-Fiction',
         'Thriller'
      ],
      'status': 'Ended',
      'runtime': 60,
      'premiered': '2013-06-24',
      'officialSite': 'http://www.cbs.com/shows/under-the-dome/',
      'schedule': {
         'time': '22:00',
         'days': [
            'Thursday'
         ]
      },
      'rating': {
         'average': 6.5
      },
      'weight': 97,
      'webChannel': null,
      'image': {
         'medium': 'http://static.tvmaze.com/uploads/images/medium_portrait/81/202627.jpg',
         'original': 'http://static.tvmaze.com/uploads/images/original_untouched/81/202627.jpg'
      },
      // tslint:disable-next-line: max-line-length
      'summary': '<p><b>Under the Dome</b> is the story of a small town that is suddenly and inexplicably sealed off from the rest of the world by an enormous transparent dome.</p>',
      'updated': 1573667713,
      '_links': {
         'nextepisode': {
            'href': 'http://api.tvmaze.com/shows/1'
         },
         'previousepisode': {
            'href': 'http://api.tvmaze.com/episodes/185054'
         }
      }
    },
    {
      'id': 2,
      'url': 'http://www.tvmaze.com/shows/2/person-of-interest',
      'name': 'Person of Interest',
      'type': 'Scripted',
      'language': 'English',
      'genres': [
         'Action',
         'Crime',
         'Science-Fiction'
      ],
      'status': 'Ended',
      'runtime': 60,
      'premiered': '2011-09-22',
      'officialSite': 'http://www.cbs.com/shows/person_of_interest/',
      'schedule': {
         'time': '22:00',
         'days': [
            'Tuesday'
         ]
      },
      'rating': {
         'average': 8.9
      },
      'weight': 94,
      'webChannel': null,
      'image': {
         'medium': 'http://static.tvmaze.com/uploads/images/medium_portrait/163/407679.jpg',
         'original': 'http://static.tvmaze.com/uploads/images/original_untouched/163/407679.jpg'
      },
      // tslint:disable-next-line: max-line-length
      'summary': '<p>You are being watched. The government has a secret system, a machine that spies on you every hour of every day. I know because I built it. I designed the Machine to detect acts of terror but it sees everything. Violent crimes involving ordinary people. People like you. Crimes the government considered \'irrelevant\'. They would not act so I decided I would. But I needed a partner. Someone with the skills to intervene. Hunted by the authorities, we work in secret. You will never find us. But victim or perpetrator, if your number is up, we will find you.</p>',
      'updated': 1588773151,
      '_links': {
         'nextepisode': {
            'href': 'http://api.tvmaze.com/shows/2'
         },
         'previousepisode': {
            'href': 'http://api.tvmaze.com/episodes/659372'
         }
      }
   }
  ];

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
      return of(DATA);
    });
    component.ngOnInit();
    expect(service.getAllShows).toHaveBeenCalledWith();
    expect(component.showsList.length).toBeGreaterThan(0);
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

  it('should call displayShows with specific genre', () => {
    const name = 'Drama';
    component.showsList = DATA;
    component.displayShows(name);
    expect(component.selectedGenre).toBe('Drama');
    expect(component.showsList).toBe(DATA);
    expect(component.showsList.length).toEqual(2);
    expect(component.genreList.length).toEqual(1);
  });

  it('should call displayShows with specific genre', () => {
    const name = 'Action';
    component.showsList = DATA;
    component.displayShows(name);
    expect(component.selectedGenre).toBe('Action');
    expect(component.showsList).toBe(DATA);
    expect(component.showsList.length).toEqual(2);
    expect(component.genreList.length).toEqual(1);
  });

  it('should call displayShows with specific genre', () => {
    const name = 'Science-Fiction';
    component.showsList = DATA;
    component.displayShows(name);
    expect(component.selectedGenre).toBe('Science-Fiction');
    expect(component.showsList).toBe(DATA);
    expect(component.showsList.length).toEqual(2);
    expect(component.genreList.length).toEqual(2);
  });

  it('should call displayShows with specific genre', () => {
    const name = 'Thriller';
    component.showsList = DATA;
    component.displayShows(name);
    expect(component.selectedGenre).toBe('Thriller');
    expect(component.showsList).toBe(DATA);
    expect(component.showsList.length).toEqual(2);
    expect(component.genreList.length).toEqual(1);
  });

  it('should call displayShows with specific genre', () => {
    const name = 'Crime';
    component.showsList = DATA;
    component.displayShows(name);
    expect(component.selectedGenre).toBe('Crime');
    expect(component.showsList).toBe(DATA);
    expect(component.showsList.length).toEqual(2);
    expect(component.genreList.length).toEqual(1);
  });

});
