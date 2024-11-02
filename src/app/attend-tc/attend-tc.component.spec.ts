import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendTcComponent } from './attend-tc.component';

describe('AttendTcComponent', () => {
  let component: AttendTcComponent;
  let fixture: ComponentFixture<AttendTcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttendTcComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttendTcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
