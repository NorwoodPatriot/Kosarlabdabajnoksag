import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeccsnaptarComponent } from './meccsnaptar.component';

describe('MeccsnaptarComponent', () => {
  let component: MeccsnaptarComponent;
  let fixture: ComponentFixture<MeccsnaptarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeccsnaptarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeccsnaptarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
