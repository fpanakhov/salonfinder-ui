import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterSalonComponent } from './register-salon.component';

describe('RegisterSalonComponent', () => {
  let component: RegisterSalonComponent;
  let fixture: ComponentFixture<RegisterSalonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterSalonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterSalonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
