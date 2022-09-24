import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankerComponent } from './banker.component';

describe('BankerComponent', () => {
  let component: BankerComponent;
  let fixture: ComponentFixture<BankerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BankerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BankerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
