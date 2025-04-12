import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JatekosAdatokComponent } from './jatekos-adatok.component';

describe('JatekosAdatokComponent', () => {
  let component: JatekosAdatokComponent;
  let fixture: ComponentFixture<JatekosAdatokComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JatekosAdatokComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JatekosAdatokComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
