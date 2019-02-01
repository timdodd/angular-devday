import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XkcdDetailComponent } from './xkcd-detail.component';

describe('XkcdDetailComponent', () => {
  let component: XkcdDetailComponent;
  let fixture: ComponentFixture<XkcdDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XkcdDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XkcdDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
