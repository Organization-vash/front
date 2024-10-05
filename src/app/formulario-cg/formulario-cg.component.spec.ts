import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioCgComponent } from './formulario-cg.component';

describe('FormularioCgComponent', () => {
  let component: FormularioCgComponent;
  let fixture: ComponentFixture<FormularioCgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioCgComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioCgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
