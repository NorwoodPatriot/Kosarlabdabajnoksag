import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent, MatToolbarModule, MatButtonModule]
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit page selection', () => {
    spyOn(component.selectedPage, 'emit');
    component.menuSwitch('home');
    expect(component.selectedPage.emit).toHaveBeenCalledWith('home');
  });

  it('should set active page', () => {
    component.menuSwitch('tabella');
    expect(component.activePage).toBe('tabella');
  });
});