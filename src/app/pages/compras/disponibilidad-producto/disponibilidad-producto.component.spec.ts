import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisponibilidadProductoComponent } from './disponibilidad-producto.component';

describe('DisponibilidadProductoComponent', () => {
  let component: DisponibilidadProductoComponent;
  let fixture: ComponentFixture<DisponibilidadProductoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisponibilidadProductoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisponibilidadProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
