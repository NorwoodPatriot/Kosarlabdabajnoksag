import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CsapatlistazasComponent } from './csapatlistazas.component';

describe('CsapatlistazasComponent', () => {
  let component: CsapatlistazasComponent;
  let fixture: ComponentFixture<CsapatlistazasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CsapatlistazasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CsapatlistazasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
