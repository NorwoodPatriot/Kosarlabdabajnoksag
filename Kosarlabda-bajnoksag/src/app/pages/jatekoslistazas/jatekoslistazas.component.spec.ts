import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JatekoslistazasComponent } from './jatekoslistazas.component';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';

describe('JatekoslistazasComponent', () => {
  let component: JatekoslistazasComponent;
  let fixture: ComponentFixture<JatekoslistazasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        JatekoslistazasComponent,
        MatTableModule,
        MatSortModule,
        MatFormFieldModule,
        MatSelectModule,
        FormsModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(JatekoslistazasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should filter players by team', () => {
    component.selectedTeam = 'Alba Fehérvár';
    fixture.detectChanges();
    expect(component.filteredPlayers.every(p => p.team === 'Alba Fehérvár')).toBeTrue();
  });

  it('should sort players', () => {
    const initialFirst = component.filteredPlayers[0].name;
    component.sort = { active: 'name', direction: 'desc' };
    fixture.detectChanges();
    expect(component.filteredPlayers[0].name).not.toEqual(initialFirst);
  });
});