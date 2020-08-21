import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { ShowItemComponent } from './show-item.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

describe('ShowItemComponent', () => {
  let component: ShowItemComponent;
  let fixture: ComponentFixture<ShowItemComponent>;

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

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowItemComponent ],
      imports: [SharedModule,
        RouterTestingModule.withRoutes([])
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowItemComponent);
    component = fixture.componentInstance;
    component.show = MOCK_OBJ;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`on click of show item should navigate to show info page with selected id`, inject(
    [Router],
    (router: Router) => {
      const showId = MOCK_OBJ.id;
      spyOn(router, 'navigate').and.stub();
      router.navigate(['show'], {
        queryParams: { id: showId }
      });
      expect(router.navigate).toHaveBeenCalledWith(['show'], {
        queryParams: { id: showId }
      });
    }
  ));

  it('should render the image', async(() => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('mat-card.card>img').src).toContain(MOCK_OBJ.image.medium);
  }));

  it('should render title in p tag for name', async(() => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('#name').textContent).toContain(MOCK_OBJ.name);
  }));

  it('should render title in p tag for language', async(() => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('#language').textContent).toContain(MOCK_OBJ.language);
  }));

  it('should render title in p tag for rating', async(() => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('#rating').textContent).toContain(MOCK_OBJ.rating.average);
  }));
});
