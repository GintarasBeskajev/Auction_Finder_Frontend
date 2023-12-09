import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBidComponent } from './edit-bid.component';

describe('EditBidComponent', () => {
  let component: EditBidComponent;
  let fixture: ComponentFixture<EditBidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditBidComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditBidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
