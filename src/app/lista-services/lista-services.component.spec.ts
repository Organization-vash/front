import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaServicesComponent } from './lista-services.component';

describe('ListaServicesComponent', () => {
  let component: ListaServicesComponent;
  let fixture: ComponentFixture<ListaServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaServicesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
