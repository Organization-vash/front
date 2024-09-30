import { ComponentFixture, TestBed } from '@angular/core/testing';

// @ts-ignore
import { TicketCgComponent } from './ticket-cg.component';

describe('TicketCgComponent', () => {
  let component: TicketCgComponent;
  let fixture: ComponentFixture<TicketCgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TicketCgComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TicketCgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
