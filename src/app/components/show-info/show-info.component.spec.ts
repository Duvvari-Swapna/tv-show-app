import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowInfoComponent } from './show-info.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { TvShowService } from 'src/app/services/tv-show.service';
import { of } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ShowInfoComponent', () => {
  let component: ShowInfoComponent;
  let fixture: ComponentFixture<ShowInfoComponent>;
  let service: TvShowService;

  const MOCK_OBJ = {
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
      'webChannel': null,
      'image': {
        'medium': 'http://static.tvmaze.com/uploads/images/medium_portrait/31/78286.jpg',
        'original': 'http://static.tvmaze.com/uploads/images/original_untouched/31/78286.jpg'
      },
      // tslint:disable-next-line: max-line-length
      'summary': '<p>This Emmy winning series is a comic look at the assorted humiliations and rare triumphs of a group of girls in their 20s.</p>',
      'updated': 1577601053,
      '_links': {
        'nextepisode': {
          'href': 'http://api.tvmaze.com/shows/139'
        },
        'previousepisode': {
          'href': 'http://api.tvmaze.com/episodes/1079686'
        }
      }
    };

  const mockActivatedRoute = {
    snapshot: {
      params: { showId: MOCK_OBJ.id }
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ShowInfoComponent],
      imports: [
        SharedModule,
        RouterTestingModule.withRoutes([]),
        HttpClientModule,
        BrowserAnimationsModule
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
    component.show = MOCK_OBJ;
    fixture.detectChanges();
    service = TestBed.get(TvShowService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the image', async(() => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('#img').src).toContain(MOCK_OBJ.image.medium);
  }));

  it('should render the summary in innerHTML', async(() => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('#summary').innerHTML).toContain(MOCK_OBJ.summary);
  }));

  it('should render the title in p tag for show language', async(() => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('p#lang').textContent).toContain(MOCK_OBJ.language);
  }));

  it('should render the title in p tag for show schedule', async(() => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('p#schedule').textContent).toContain(MOCK_OBJ.schedule.days.join(', '));
  }));

  it('should render the title in p tag for show status', async(() => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('p#status').textContent).toContain(MOCK_OBJ.status);
  }));

  it('should render the title in p tag for show type', async(() => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('p#type').textContent).toContain(MOCK_OBJ.type);
  }));

  it('should render the title in p tag for show genres', async(() => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('p#genre').textContent).toContain(MOCK_OBJ.genres.join(' | '));
  }));

  it('should render link in a tag for show official site', async(() => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('p#site>a').textContent).toContain(MOCK_OBJ.officialSite);
  }));

  it('should check response of getShow()', () => {
    component.ngOnInit();
    spyOn(service, 'getShow').and.callFake(() => {
        return of(MOCK_OBJ);
    });
    service.getShow(MOCK_OBJ.id).subscribe(value => {
      component.show = value;
    });
    expect(component.show).toEqual(MOCK_OBJ);
  });


  it('should check response of getCastDetails()', () => {
    component.ngOnInit();
    spyOn(service, 'getCastDetails').and.callFake(() => {
        return of([]);
    });
    service.getCastDetails(MOCK_OBJ.id).subscribe(value => {
      component.castList = value;
    });
  });

  it('should check response of getCrewDetails()', () => {
    component.ngOnInit();
    spyOn(service, 'getCrewDetails').and.callFake(() => {
        return of([]);
    });
    service.getCrewDetails(MOCK_OBJ.id).subscribe(value => {
      component.crewList = value;
    });
  });

  it('should call goBack', () => {
    component.goBack();
  });

});
