import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InicioGcComponent } from './inicio-gc.component';

describe('InicioGcComponent', () => {
  let component: InicioGcComponent;
  let fixture: ComponentFixture<InicioGcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InicioGcComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InicioGcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
