import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroRecomendacionComponent } from './registro-recomendacion.component';

describe('RegistroRecomendacionComponent', () => {
  let component: RegistroRecomendacionComponent;
  let fixture: ComponentFixture<RegistroRecomendacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistroRecomendacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroRecomendacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
