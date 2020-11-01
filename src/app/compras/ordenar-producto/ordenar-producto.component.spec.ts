import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdenarProductoComponent } from './ordenar-producto.component';

describe('OrdenarProductoComponent', () => {
  let component: OrdenarProductoComponent;
  let fixture: ComponentFixture<OrdenarProductoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdenarProductoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdenarProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
