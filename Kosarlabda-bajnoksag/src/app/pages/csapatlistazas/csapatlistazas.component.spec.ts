import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CsapatlistazasComponent } from './csapatlistazas.component';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule, Sort } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';

describe('CsapatlistazasComponent', () => {
  let component: CsapatlistazasComponent;
  let fixture: ComponentFixture<CsapatlistazasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CsapatlistazasComponent,
        MatTableModule,
        MatSortModule,
        MatFormFieldModule,
        MatSelectModule,
        FormsModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CsapatlistazasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should sort teams', () => {
    const initialFirstTeam = component.filteredTeams[0].name;
    component.sortData({ active: 'name', direction: 'desc' } as Sort);
    expect(component.filteredTeams[0].name).not.toEqual(initialFirstTeam);
  });

  it('should filter champion teams', () => {
    component.filterOption = 'champions';
    component.applyFilter();
    expect(component.filteredTeams.length).toBe(3);
    expect(component.filteredTeams.every(t => t.championships > 0)).toBeTrue();
  });

  it('should show all teams when filter is reset', () => {
    component.filterOption = 'champions';
    component.applyFilter();
    component.filterOption = 'all';
    component.applyFilter();
    expect(component.filteredTeams.length).toBe(component.teams.length);
  });
});