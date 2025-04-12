import { AfterViewInit, Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @Output() selectedPage: EventEmitter<string> = new EventEmitter();

  constructor(){
    console.log("construtor called");
  }

  ngOnInit(): void {
    console.log("ngOnInit called");
  }

  ngAfterViewInit(): void {
    console.log("ngAfterViewInit called");
  }

  menuSwitch(pageValue: string) {
    this.selectedPage.emit(pageValue);
  }

}
