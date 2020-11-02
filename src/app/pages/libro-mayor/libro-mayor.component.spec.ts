import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LibroMayorComponent } from './libro-mayor.component';

describe('LibroMayorComponent', () => {
  let component: LibroMayorComponent;
  let fixture: ComponentFixture<LibroMayorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LibroMayorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LibroMayorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
