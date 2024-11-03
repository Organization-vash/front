import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaModulesComponent } from './list-modules.component';

describe('ListModulesComponent', () => {
  let component: ListaModulesComponent;
  let fixture: ComponentFixture<ListaModulesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaModulesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaModulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
