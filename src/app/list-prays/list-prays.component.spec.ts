import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPraysComponent } from './list-prays.component';

describe('ListPraysComponent', () => {
  let component: ListPraysComponent;
  let fixture: ComponentFixture<ListPraysComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListPraysComponent]
    });
    fixture = TestBed.createComponent(ListPraysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
