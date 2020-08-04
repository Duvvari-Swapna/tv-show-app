import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { ShowItemComponent } from './show-item.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

describe('ShowItemComponent', () => {
  let component: ShowItemComponent;
  let fixture: ComponentFixture<ShowItemComponent>;

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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`on click of show item should navigate to show info page with selected id`, inject(
    [Router],
    (router: Router) => {
      const showId = 139;
      spyOn(router, 'navigate').and.stub();
      router.navigate(['show'], {
        queryParams: { id: showId }
      });
      expect(router.navigate).toHaveBeenCalledWith(['show'], {
        queryParams: { id: showId }
      });
    }
  ));
});
