import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XkcdListComponent } from './xkcd-list.component';

describe('XkcdListComponent', () => {
  let component: XkcdListComponent;
  let fixture: ComponentFixture<XkcdListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XkcdListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XkcdListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
