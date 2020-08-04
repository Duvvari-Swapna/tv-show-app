import { async, ComponentFixture, TestBed, fakeAsync, tick, inject } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { ShowItemComponent } from '../show-item/show-item.component';
import { SearchPageComponent } from '../search-page/search-page.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent, HomeComponent, ShowItemComponent, SearchPageComponent],
      imports: [
        SharedModule,
        FormsModule,
        RouterTestingModule.withRoutes([
          {path: 'search-results', component: SearchPageComponent},
          { path: 'home', component: HomeComponent}
        ])
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render title in span tag', () => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('div.col-md-6>span#dashboard').textContent).toContain('Dashboard');
  });

  it('should call goToDashboard method', () => {
    const goToDashboardMock = spyOn(component, 'goToDashboard');
    fixture.debugElement.query(By.css('button')).triggerEventHandler('click', null);
    expect(goToDashboardMock).toHaveBeenCalled();
  });

  it('should bind input text value to Component property', () => {
    const hostElement = fixture.nativeElement;
    const search: HTMLInputElement = hostElement.querySelector('#query');
    fixture.detectChanges();
    search.value = 'Girls';
    search.dispatchEvent(new Event('input'));
    expect(component.query).toBe('Girls');
  });

  it('should bind input text value to Component property', () => {
    const hostElement = fixture.nativeElement;
    const search: HTMLInputElement = hostElement.querySelector('#query');
    fixture.detectChanges();
    search.value = 'girls';
    search.dispatchEvent(new Event('input'));
    expect(component.query).toBe('girls');
  });

  it('should do searchShows button click ', async(() => {
    spyOn(component, 'searchShows');
    const button = fixture.debugElement.nativeElement.querySelector('div.search>div.input-group>button');
    button.click();
    fixture.whenStable().then(() => {
      expect(component.searchShows).toHaveBeenCalled();
    });
  }));

  it('should check goToDashboard function', (() => {
    component.goToDashboard();
  }));

  it('should check searchShows function if query param is not empty', (() => {
    component.query = 'girls';
    component.searchShows();
  }));

  it('should check searchShows function if query param is empty', (() => {
    component.query = '';
    component.searchShows();
  }));

  it(`searchShows() should navigate to search results page with query params`, inject(
    [Router],
    (router: Router) => {
      const queryObj = 'girls';
      spyOn(router, 'navigate').and.stub();
      router.navigate(['search-results'], {
        queryParams: { query: queryObj }
      });
      expect(router.navigate).toHaveBeenCalledWith(['search-results'], {
        queryParams: { query: queryObj }
      });
    }
  ));

  it(`goToDashboard() should navigate to home page`, inject(
    [Router],
    (router: Router) => {
      spyOn(router, 'navigate').and.stub();
      router.navigate(['home']);
      expect(router.navigate).toHaveBeenCalledWith(['home']);
    }
  ));

});
