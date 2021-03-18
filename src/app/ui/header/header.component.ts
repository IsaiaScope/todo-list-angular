import { Component, EventEmitter, Output } from '@angular/core';
import { ToDoListComponent } from '../../pages/to-do-list/to-do-list.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  @Output() search: EventEmitter<boolean> = new EventEmitter<boolean>();
  searchValue: boolean = false;

  constructor(
    private todoCom: ToDoListComponent
  ) { }
  openDialog(): void {
    this.todoCom.openDialog()
  }
  filter(x: string): void {
    this.todoCom.filter(x)
  }
  searchEmit(){
    this.searchValue = !this.searchValue
    this.search.emit(this.searchValue)
    //console.log(this.searchValue); 
  }
}
