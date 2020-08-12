import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
        BrowserAnimationsModule,
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

  it('should call goToDashboard with home route ', inject([Router], (router: Router) => {
      spyOn(router, 'navigate').and.stub();
      router.navigate(['home']);
      component.goToDashboard();
      expect(router.navigate).toHaveBeenCalledWith(['home']);
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
      component.searchShows();
      expect(router.navigate).toHaveBeenCalledWith(['search-results'], {
        queryParams: { query: queryObj }
      });
      expect(component.query).toBe('');
    }
  ));

});
