import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NextQueueComponent } from './next-queue.component';

describe('NextQueueComponent', () => {
  let component: NextQueueComponent;
  let fixture: ComponentFixture<NextQueueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NextQueueComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NextQueueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
