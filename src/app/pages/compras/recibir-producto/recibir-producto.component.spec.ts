import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecibirProductoComponent } from './recibir-producto.component';

describe('RecibirProductoComponent', () => {
  let component: RecibirProductoComponent;
  let fixture: ComponentFixture<RecibirProductoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecibirProductoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecibirProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
