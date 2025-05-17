import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UjfelhasznaloComponent } from './ujfelhasznalo.component';

describe('UjfelhasznaloComponent', () => {
  let component: UjfelhasznaloComponent;
  let fixture: ComponentFixture<UjfelhasznaloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UjfelhasznaloComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UjfelhasznaloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
