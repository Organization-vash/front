import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarUserComponent } from './actualizar-user.component';

describe('ActualizarUserComponent', () => {
  let component: ActualizarUserComponent;
  let fixture: ComponentFixture<ActualizarUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActualizarUserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActualizarUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
