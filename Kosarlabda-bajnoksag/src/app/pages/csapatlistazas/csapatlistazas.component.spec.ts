import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CsapatlistazasComponent } from './csapatlistazas.component';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule, Sort } from '@angular/material/sort';

describe('CsapatlistazasComponent', () => {
  let component: CsapatlistazasComponent;
  let fixture: ComponentFixture<CsapatlistazasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CsapatlistazasComponent, MatTableModule, MatSortModule]
    }).compileComponents();

    fixture = TestBed.createComponent(CsapatlistazasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should sort teams', () => {
    const initialFirstTeam = component.teams[0].name;
    component.sortData({ active: 'name', direction: 'desc' } as Sort);
    expect(component.teams[0].name).not.toEqual(initialFirstTeam);
  });
});