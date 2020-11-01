import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TomarOrdenComponent } from './tomar-orden.component';

describe('TomarOrdenComponent', () => {
  let component: TomarOrdenComponent;
  let fixture: ComponentFixture<TomarOrdenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TomarOrdenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TomarOrdenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
