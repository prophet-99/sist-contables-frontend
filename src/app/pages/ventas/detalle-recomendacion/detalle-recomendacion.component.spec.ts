import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleRecomendacionComponent } from './detalle-recomendacion.component';

describe('DetalleRecomendacionComponent', () => {
  let component: DetalleRecomendacionComponent;
  let fixture: ComponentFixture<DetalleRecomendacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleRecomendacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleRecomendacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
