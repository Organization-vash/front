import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearServiceComponent } from './crear-service.component';

describe('CrearServiceComponent', () => {
  let component: CrearServiceComponent;
  let fixture: ComponentFixture<CrearServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearServiceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
