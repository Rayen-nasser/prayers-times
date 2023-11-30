import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AthkarAfterPrayComponent } from './athkar-after-pray.component';

describe('AthkarAfterPrayComponent', () => {
  let component: AthkarAfterPrayComponent;
  let fixture: ComponentFixture<AthkarAfterPrayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AthkarAfterPrayComponent]
    });
    fixture = TestBed.createComponent(AthkarAfterPrayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
