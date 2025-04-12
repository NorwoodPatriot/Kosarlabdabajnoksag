import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JatekoslistazasComponent } from './jatekoslistazas.component';

describe('JatekoslistazasComponent', () => {
  let component: JatekoslistazasComponent;
  let fixture: ComponentFixture<JatekoslistazasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JatekoslistazasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JatekoslistazasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
