import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarServiceComponent } from './actualizar-service.component';

describe('ActualizarServiceComponent', () => {
  let component: ActualizarServiceComponent;
  let fixture: ComponentFixture<ActualizarServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActualizarServiceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActualizarServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
