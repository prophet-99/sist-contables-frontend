import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearNominaComponent } from './crear-nomina.component';

describe('CrearNominaComponent', () => {
  let component: CrearNominaComponent;
  let fixture: ComponentFixture<CrearNominaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearNominaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearNominaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
