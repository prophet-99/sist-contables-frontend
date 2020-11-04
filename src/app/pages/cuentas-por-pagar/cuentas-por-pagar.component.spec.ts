import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CuentasPorPagarComponent } from './cuentas-por-pagar.component';

describe('CuentasPorPagarComponent', () => {
  let component: CuentasPorPagarComponent;
  let fixture: ComponentFixture<CuentasPorPagarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CuentasPorPagarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CuentasPorPagarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
