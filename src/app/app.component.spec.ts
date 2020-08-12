import { TestBed, async, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { HeaderComponent } from './components/header/header.component';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

describe('AppComponent', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        SharedModule,
        FormsModule
      ],
      declarations: [
        AppComponent,
        HeaderComponent
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'TVShow'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('TVShow');
  });

  it('should call ngOnInit with home route ', inject([Router], (router: Router) => {
    const fixture = TestBed.createComponent(AppComponent);
    const component = fixture.componentInstance;
    spyOn(router, 'navigate').and.stub();
    router.navigate(['']);
    component.ngOnInit();
    expect(router.navigate).toHaveBeenCalledWith(['']);
}));

});
