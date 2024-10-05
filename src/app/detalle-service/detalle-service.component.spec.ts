import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleServiceComponent } from './detalle-service.component';

describe('DetalleServiceComponent', () => {
  let component: DetalleServiceComponent;
  let fixture: ComponentFixture<DetalleServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalleServiceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalleServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
