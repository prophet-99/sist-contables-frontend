import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntregaInventarioComponent } from './entrega-inventario.component';

describe('EntregaInventarioComponent', () => {
  let component: EntregaInventarioComponent;
  let fixture: ComponentFixture<EntregaInventarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntregaInventarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntregaInventarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
