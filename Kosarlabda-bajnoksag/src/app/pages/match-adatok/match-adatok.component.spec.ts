import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchAdatokComponent } from './match-adatok.component';

describe('MatchAdatokComponent', () => {
  let component: MatchAdatokComponent;
  let fixture: ComponentFixture<MatchAdatokComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatchAdatokComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatchAdatokComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
