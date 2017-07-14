import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookSalonComponent } from './book-salon.component';

describe('BookSalonComponent', () => {
  let component: BookSalonComponent;
  let fixture: ComponentFixture<BookSalonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookSalonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookSalonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
