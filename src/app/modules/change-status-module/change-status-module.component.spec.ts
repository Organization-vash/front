import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeStatusModuleComponent } from './change-status-module.component';

describe('ChangeStatusModuleComponent', () => {
  let component: ChangeStatusModuleComponent;
  let fixture: ComponentFixture<ChangeStatusModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChangeStatusModuleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangeStatusModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
