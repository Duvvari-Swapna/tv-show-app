import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchPageComponent } from './search-page.component';
import { ShowItemComponent } from '../show-item/show-item.component';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from 'src/app/shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { TvShowService } from 'src/app/services/tv-show.service';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

describe('SearchPageComponent', () => {
  let component: SearchPageComponent;
  let fixture: ComponentFixture<SearchPageComponent>;
  let service: TvShowService;

  const SEARCH_RESULT = [
    {
       'show': {
          'id': 41332,
          'url': 'http://www.tvmaze.com/shows/41332/the-good-lord-bird',
          'name': 'The Good Lord Bird',
          'type': 'Scripted',
          'language': 'English',
          'genres': [
             'Drama',
             'War'
          ],
          'status': 'In Development',
          'runtime': 60,
          'premiered': '2020-10-04',
          'officialSite': 'https://www.sho.com/the-good-lord-bird',
          'schedule': {
             'time': '22:00',
             'days': [
                'Sunday'
             ]
          },
          'rating': {
             'average': null
          },
          'weight': 98,
          'network': {
             'id': 9,
             'name': 'Showtime',
             'country': {
                'name': 'United States',
                'code': 'US',
                'timezone': 'America/New_York'
             }
          },
          'webChannel': null,
          'externals': {
             'tvrage': null,
             'thetvdb': 367633,
             'imdb': 'tt3673480'
          },
          'image': {
             'medium': 'http://static.tvmaze.com/uploads/images/medium_portrait/268/671010.jpg',
             'original': 'http://static.tvmaze.com/uploads/images/original_untouched/268/671010.jpg'
          },
          // tslint:disable-next-line: max-line-length
          'summary': '<p>Based on the National Book Award-winning novel by bestselling author James McBride, <b>The Good Lord Bird</b> is told from the point of view of Onion, an enslaved teenager who becomes a member in Brown\'s motley family during the time of Bleeding Kansas, eventually participating in the famous 1859 raid on the Army depot at Harpers Ferry. Brown\'s raid failed to initiate the slave revolt he intended, but was the instigating event that started the Civil War.</p>',
          'updated': 1597567866,
          '_links': {
             'self': {
                'href': 'http://api.tvmaze.com/shows/41332'
             },
             'nextepisode': {
                'href': 'http://api.tvmaze.com/episodes/1863940'
             }
          }
       }
    },
    {
       'show': {
          'id': 33352,
          'url': 'http://www.tvmaze.com/shows/33352/the-lord-of-the-rings',
          'name': 'The Lord of the Rings',
          'type': 'Scripted',
          'language': 'English',
          'genres': [
             'Drama',
             'Adventure',
             'Fantasy'
          ],
          'status': 'In Development',
          'runtime': 60,
          'premiered': null,
          'officialSite': 'http://amazon.com/lotronprime',
          'schedule': {
             'time': '',
             'days': [

             ]
          },
          'rating': {
             'average': null
          },
          'weight': 95,
          'network': null,
          'webChannel': {
             'id': 3,
             'name': 'Amazon Prime',
             'country': null
          },
          'externals': {
             'tvrage': null,
             'thetvdb': 367506,
             'imdb': 'tt7631058'
          },
          'image': {
             'medium': 'http://static.tvmaze.com/uploads/images/medium_portrait/205/512528.jpg',
             'original': 'http://static.tvmaze.com/uploads/images/original_untouched/205/512528.jpg'
          },
          // tslint:disable-next-line: max-line-length
          'summary': '<p>Set in Middle Earth during the Second Age, the television adaptation will explore new storylines approximately 3,000 years before the events of J.R.R. Tolkien\'s <i>The Fellowship of the Ring</i>.</p>',
          'updated': 1579043794,
          '_links': {
             'self': {
                'href': 'http://api.tvmaze.com/shows/33352'
             }
          }
       }
    },
    {
       'show': {
          'id': 43660,
          'url': 'http://www.tvmaze.com/shows/43660/the-grand-lord',
          'name': 'The Grand Lord',
          'type': 'Animation',
          'language': 'Chinese',
          'genres': [
             'Action',
             'Adventure',
             'Anime',
             'Fantasy'
          ],
          'status': 'Ended',
          'runtime': 24,
          'premiered': '2019-08-08',
          'officialSite': 'https://www.iqiyi.com/a_19rrhsgm1t.html',
          'schedule': {
             'time': '08:00',
             'days': [
                'Thursday'
             ]
          },
          'rating': {
             'average': null
          },
          'weight': 34,
          'network': null,
          'webChannel': {
             'id': 67,
             'name': 'iQIYi',
             'country': {
                'name': 'China',
                'code': 'CN',
                'timezone': 'Asia/Shanghai'
             }
          },
          'externals': {
             'tvrage': null,
             'thetvdb': 365780,
             'imdb': null
          },
          'image': {
             'medium': 'http://static.tvmaze.com/uploads/images/medium_portrait/209/524535.jpg',
             'original': 'http://static.tvmaze.com/uploads/images/original_untouched/209/524535.jpg'
          },
          // tslint:disable-next-line: max-line-length
          'summary': '<p>Many worlds intertwine and interact, but not all reach the top of at least one of the worlds. Martyr first of the world Bailing was lucky enough to get to the school of the Soul Path. The selection of disciples was made by the Measurement of Judgment only once every three years, and no disciple from the lower world had ever been so honored. The best graduates of this school can go to one of The five Great Universities. But having committed a bloody crime of Torment, he is expelled from school and returned to his native world in disgrace, where he has to start all over again to get a chance to enter one of the Great Universities. And the first step of a new path for him becomes contest schools West and East, winners which are taken to the primary school Tianze, where gifted warriors are trained.</p>',
          'updated': 1591628040,
          '_links': {
             'self': {
                'href': 'http://api.tvmaze.com/shows/43660'
             },
             'previousepisode': {
                'href': 'http://api.tvmaze.com/episodes/1715711'
             }
          }
       }
    },
    {
       'show': {
          'id': 21029,
          'url': 'http://www.tvmaze.com/shows/21029/lord-tramp',
          'name': 'Lord Tramp',
          'type': 'Scripted',
          'language': 'English',
          'genres': [
             'Comedy'
          ],
          'status': 'Ended',
          'runtime': 25,
          'premiered': '1977-08-01',
          'officialSite': null,
          'schedule': {
             'time': '16:00',
             'days': [
                'Monday'
             ]
          },
          'rating': {
             'average': null
          },
          'weight': 0,
          'network': {
             'id': 35,
             'name': 'ITV',
             'country': {
                'name': 'United Kingdom',
                'code': 'GB',
                'timezone': 'Europe/London'
             }
          },
          'webChannel': null,
          'externals': {
             'tvrage': null,
             'thetvdb': 252376,
             'imdb': null
          },
          'image': {
             'medium': 'http://static.tvmaze.com/uploads/images/medium_portrait/74/185550.jpg',
             'original': 'http://static.tvmaze.com/uploads/images/original_untouched/74/185550.jpg'
          },
          // tslint:disable-next-line: max-line-length
          'summary': '<p>Hughie Wagstaff is a penniless tramp who suddenly finds his life turned upside down when he is revealed as the heir to a title and a large estate - complete with stately home and servants. He finds his new life difficult to adjust to and can\'t help slipping in to his old ways, much to the consternation of his staff and snobby neighbours.</p>',
          'updated': 1473697839,
          '_links': {
             'self': {
                'href': 'http://api.tvmaze.com/shows/21029'
             },
             'previousepisode': {
                'href': 'http://api.tvmaze.com/episodes/925008'
             }
          }
       }
    },
    {
       'show': {
          'id': 5403,
          'url': 'http://www.tvmaze.com/shows/5403/flintoff-lord-of-the-fries',
          'name': 'Flintoff: Lord of the Fries',
          'type': 'Documentary',
          'language': 'English',
          'genres': [
             'Adventure',
             'Food',
             'Travel'
          ],
          'status': 'Ended',
          'runtime': 45,
          'premiered': '2015-02-13',
          'officialSite': null,
          'schedule': {
             'time': '20:00',
             'days': [
                'Tuesday'
             ]
          },
          'rating': {
             'average': null
          },
          'weight': 68,
          'network': {
             'id': 63,
             'name': 'Sky 1',
             'country': {
                'name': 'United Kingdom',
                'code': 'GB',
                'timezone': 'Europe/London'
             }
          },
          'webChannel': null,
          'externals': {
             'tvrage': null,
             'thetvdb': 292278,
             'imdb': 'tt4440656'
          },
          'image': {
             'medium': 'http://static.tvmaze.com/uploads/images/medium_portrait/175/438471.jpg',
             'original': 'http://static.tvmaze.com/uploads/images/original_untouched/175/438471.jpg'
          },
          // tslint:disable-next-line: max-line-length
          'summary': '<p><b>Flintoff: Lord of the Fries</b> follows Freddie Flintoff and cyclist Rob Penn as they embark on a Summer adventure around England and Ireland in an eco-friendly chip van.</p>',
          'updated': 1576973559,
          '_links': {
             'self': {
                'href': 'http://api.tvmaze.com/shows/5403'
             },
             'previousepisode': {
                'href': 'http://api.tvmaze.com/episodes/1013796'
             }
          }
       }
    },
    {
       'show': {
          'id': 36232,
          'url': 'http://www.tvmaze.com/shows/36232/lord-peter-wimsey',
          'name': 'Lord Peter Wimsey',
          'type': 'Scripted',
          'language': 'English',
          'genres': [
             'Drama'
          ],
          'status': 'Ended',
          'runtime': 50,
          'premiered': '1972-04-05',
          'officialSite': null,
          'schedule': {
             'time': '',
             'days': [
                'Wednesday'
             ]
          },
          'rating': {
             'average': null
          },
          'weight': 0,
          'network': {
             'id': 12,
             'name': 'BBC One',
             'country': {
                'name': 'United Kingdom',
                'code': 'GB',
                'timezone': 'Europe/London'
             }
          },
          'webChannel': null,
          'externals': {
             'tvrage': null,
             'thetvdb': 78796,
             'imdb': null
          },
          'image': {
             'medium': 'http://static.tvmaze.com/uploads/images/medium_portrait/153/382850.jpg',
             'original': 'http://static.tvmaze.com/uploads/images/original_untouched/153/382850.jpg'
          },
          // tslint:disable-next-line: max-line-length
          'summary': '<p>Lord Peter Wimsey, the brother of the Duke of Denver, is a scholar with time on his hands and an inclination for solving murder mysteries. Bunter is his manservant and partner in crime-detection, while Inspector Charles Parker is his friend (and later his brother-in-law) in the Metropolitan Police. </p>',
          'updated': 1549283851,
          '_links': {
             'self': {
                'href': 'http://api.tvmaze.com/shows/36232'
             },
             'previousepisode': {
                'href': 'http://api.tvmaze.com/episodes/1450700'
             }
          }
       }
    },
    {
       'show': {
          'id': 22773,
          'url': 'http://www.tvmaze.com/shows/22773/the-lord-mayors-show',
          'name': 'The Lord Mayor\'s Show',
          'type': 'Variety',
          'language': 'English',
          'genres': [

          ],
          'status': 'To Be Determined',
          'runtime': 80,
          'premiered': '2007-11-10',
          'officialSite': 'http://www.bbc.co.uk/programmes/b00fmghb',
          'schedule': {
             'time': '10:45',
             'days': [
                'Saturday'
             ]
          },
          'rating': {
             'average': null
          },
          'weight': 0,
          'network': {
             'id': 12,
             'name': 'BBC One',
             'country': {
                'name': 'United Kingdom',
                'code': 'GB',
                'timezone': 'Europe/London'
             }
          },
          'webChannel': null,
          'externals': {
             'tvrage': null,
             'thetvdb': null,
             'imdb': null
          },
          'image': {
             'medium': 'http://static.tvmaze.com/uploads/images/medium_portrait/84/210953.jpg',
             'original': 'http://static.tvmaze.com/uploads/images/original_untouched/84/210953.jpg'
          },
          'summary': '<p>Coverage of the annual parade as the Lord Mayor of London is inaugurated.</p>',
          'updated': 1591659829,
          '_links': {
             'self': {
                'href': 'http://api.tvmaze.com/shows/22773'
             },
             'previousepisode': {
                'href': 'http://api.tvmaze.com/episodes/1750364'
             }
          }
       }
    },
    {
       'show': {
          'id': 12357,
          'url': 'http://www.tvmaze.com/shows/12357/lord-of-shanghai',
          'name': 'Lord of Shanghai',
          'type': 'Scripted',
          'language': 'Chinese',
          'genres': [
             'Drama',
             'Crime',
             'History'
          ],
          'status': 'Ended',
          'runtime': 60,
          'premiered': '2015-10-26',
          'officialSite': 'http://programme.tvb.com/drama/lordofshanghai/',
          'schedule': {
             'time': '21:30',
             'days': [
                'Monday',
                'Tuesday',
                'Wednesday',
                'Thursday',
                'Friday',
                'Saturday',
                'Sunday'
             ]
          },
          'rating': {
             'average': null
          },
          'weight': 6,
          'network': {
             'id': 241,
             'name': 'TVB',
             'country': {
                'name': 'Hong Kong',
                'code': 'HK',
                'timezone': 'Asia/Hong_Kong'
             }
          },
          'webChannel': null,
          'externals': {
             'tvrage': null,
             'thetvdb': null,
             'imdb': null
          },
          'image': {
             'medium': 'http://static.tvmaze.com/uploads/images/medium_portrait/42/105111.jpg',
             'original': 'http://static.tvmaze.com/uploads/images/original_untouched/42/105111.jpg'
          },
          // tslint:disable-next-line: max-line-length
          'summary': '<p>Sworn brothers Kiu Ngo Tin and Kung Siu San have to rely on each other in a time Shanghai was being controlled by merciless warlords. Together they create a world of their own, but in order to stay on top, Ngo Tin has no choice, but to leave his complete past behind him, without exception for his confidant and true love Ku Siu Lau.</p>',
          'updated': 1454008624,
          '_links': {
             'self': {
                'href': 'http://api.tvmaze.com/shows/12357'
             },
             'previousepisode': {
                'href': 'http://api.tvmaze.com/episodes/589789'
             }
          }
       }
    },
    {
       'show': {
          'id': 44087,
          'url': 'http://www.tvmaze.com/shows/44087/lord-critical-world',
          'name': 'L.O.R.D. Critical World',
          'type': 'Scripted',
          'language': 'Chinese',
          'genres': [
             'Drama',
             'Action',
             'Fantasy'
          ],
          'status': 'Ended',
          'runtime': 45,
          'premiered': '2019-05-27',
          'officialSite': null,
          'schedule': {
             'time': '',
             'days': [
                'Monday',
                'Tuesday',
                'Wednesday',
                'Thursday',
                'Sunday'
             ]
          },
          'rating': {
             'average': null
          },
          'weight': 0,
          'network': null,
          'webChannel': {
             'id': 67,
             'name': 'iQIYi',
             'country': {
                'name': 'China',
                'code': 'CN',
                'timezone': 'Asia/Shanghai'
             }
          },
          'externals': {
             'tvrage': null,
             'thetvdb': 364818,
             'imdb': null
          },
          'image': {
             'medium': 'http://static.tvmaze.com/uploads/images/medium_portrait/213/532648.jpg',
             'original': 'http://static.tvmaze.com/uploads/images/original_untouched/213/532648.jpg'
          },
          // tslint:disable-next-line: max-line-length
          'summary': '<p>As the 7th duke, Yin Chen has the ability to wield the power of the wind, fire, water and earth. As he tries to protect his disciple Qi Ling, he uncovers an earth-shattering secret. During the 15th century B.C., the descendants of previous emperors were caught in an endless battle for the rule over Shang. Although Yang Jia succeeds in assuming the throne, the nation has become rife with internal and external turmoil. According to legends, the one who obtains the help of Chi You\'s descendant can rule the world. Yin Chen leads the search in hopes of ending the conflict. Qi Ling is a young man from a small village who becomes Yin Chen\'s disciple by chance, thus beginning his extraordinary journey.</p>',
          'updated': 1574474156,
          '_links': {
             'self': {
                'href': 'http://api.tvmaze.com/shows/44087'
             },
             'previousepisode': {
                'href': 'http://api.tvmaze.com/episodes/1723224'
             }
          }
       }
    },
    {
       'show': {
          'id': 18921,
          'url': 'http://www.tvmaze.com/shows/18921/tarzan-lord-of-the-jungle',
          'name': 'Tarzan, Lord of the Jungle',
          'type': 'Animation',
          'language': 'English',
          'genres': [
             'Adventure',
             'Children'
          ],
          'status': 'Ended',
          'runtime': 30,
          'premiered': '1976-09-11',
          'officialSite': null,
          'schedule': {
             'time': '',
             'days': [
                'Saturday'
             ]
          },
          'rating': {
             'average': null
          },
          'weight': 46,
          'network': {
             'id': 2,
             'name': 'CBS',
             'country': {
                'name': 'United States',
                'code': 'US',
                'timezone': 'America/New_York'
             }
          },
          'webChannel': null,
          'externals': {
             'tvrage': null,
             'thetvdb': 70553,
             'imdb': 'tt0149533'
          },
          'image': {
             'medium': 'http://static.tvmaze.com/uploads/images/medium_portrait/65/163366.jpg',
             'original': 'http://static.tvmaze.com/uploads/images/original_untouched/65/163366.jpg'
          },
          // tslint:disable-next-line: max-line-length
          'summary': '<p><b>Tarzan, Lord of the Jungle</b> was a Filmation cartoon that aired on CBS from 1976 to 1980. Unlike the simple-minded man depicted in the movies, this cartoon had an intelligent, well-spoken Tarzan who was accompanied by a monkey sidekick, N\'kima. In many ways, this series was the most faithful of all screen-based adaptations of Edgar Rice Burroughs\' Tarzan, and featured a number of "lost cities" from the original novels. The rotoscoped animation is based upon the work of Burrough\'s favorite Tarzan artist, Burne Hogarth.</p>',
          'updated': 1588672446,
          '_links': {
             'self': {
                'href': 'http://api.tvmaze.com/shows/18921'
             },
             'previousepisode': {
                'href': 'http://api.tvmaze.com/episodes/853910'
             }
          }
       }
    }
 ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SearchPageComponent, ShowItemComponent],
      imports: [
        RouterTestingModule,
        SharedModule,
        HttpClientModule
      ],
      providers: [{
        provide: ActivatedRoute, useValue: {
          queryParams: of({
            query: 'lord'
          })
        }
      }]
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

  it('should check response of getShows()', () => {
    const result = [];
    component.getShows();
    expect(component.query).toBe('lord');
    spyOn(service, 'getShowsFromSearch').and.callFake(() => {
        return of(SEARCH_RESULT);
    });
    service.getShowsFromSearch('lord').subscribe((value) => {
      value.filter(list => {
        result.push(list.show);
      });
    });
    component.searchResults = result;
    expect(component.searchResults.length).toEqual(SEARCH_RESULT.length);
  });

  it('should call goBack', () => {
   component.goBack();
 });

});
