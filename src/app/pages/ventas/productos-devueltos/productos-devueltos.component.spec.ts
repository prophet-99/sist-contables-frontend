import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductosDevueltosComponent } from './productos-devueltos.component';

describe('ProductosDevueltosComponent', () => {
  let component: ProductosDevueltosComponent;
  let fixture: ComponentFixture<ProductosDevueltosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductosDevueltosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductosDevueltosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
