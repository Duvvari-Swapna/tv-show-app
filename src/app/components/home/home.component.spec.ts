import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { ShowItemComponent } from '../show-item/show-item.component';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from 'src/app/shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { TvShowService } from 'src/app/services/tv-show.service';
import { of } from 'rxjs/internal/observable/of';
import * as data from './../../../assets/JSON/scheduled.json';

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
    fixture.detectChanges();
    service = TestBed.get(TvShowService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getscheduledAll service if response is empty', () => {
    spyOn(service, 'getscheduledAll').and.callFake(() => {
      return of([]);
    });

    component.ngOnInit();
    expect(service.getscheduledAll).toHaveBeenCalledWith();
    expect(component.showsList).toEqual([]);
    expect(component.genreList).toEqual([]);
    expect(component.filteredList).toEqual([]);
    expect(component.selectedGenre).toMatch('');
  });

  it('should call getscheduledAll service if response is there', () => {
    spyOn(service, 'getscheduledAll').and.callFake(() => {
      return of(data.default);
    });
    component.ngOnInit();
    expect(service.getscheduledAll).toHaveBeenCalledWith();
  });

  it('should render title in p tag', () => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('div.show-list>p').textContent).toContain('No Shows Available');
  });

});
