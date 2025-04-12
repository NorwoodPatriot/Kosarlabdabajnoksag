import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CsapatAdatokComponent } from './csapat-adatok.component';

describe('CsapatAdatokComponent', () => {
  let component: CsapatAdatokComponent;
  let fixture: ComponentFixture<CsapatAdatokComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CsapatAdatokComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CsapatAdatokComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
