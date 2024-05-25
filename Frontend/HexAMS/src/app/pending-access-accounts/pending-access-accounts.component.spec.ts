import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingAccessAccountsComponent } from './pending-access-accounts.component';

describe('PendingAccessAccountsComponent', () => {
  let component: PendingAccessAccountsComponent;
  let fixture: ComponentFixture<PendingAccessAccountsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PendingAccessAccountsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PendingAccessAccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
