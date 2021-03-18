import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatCheckboxDefaultOptions, MAT_CHECKBOX_DEFAULT_OPTIONS } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { DialogEditTaskComponent } from 'src/app/ui/dialog-edit-task/dialog-edit-task.component';
import { Task } from 'src/model/task';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.scss'],
  providers: [
    { provide: MAT_CHECKBOX_DEFAULT_OPTIONS, useValue: { clickAction: 'noop' } as MatCheckboxDefaultOptions }
  ]
})
export class ToDoListComponent implements OnInit{

  @Input() search: boolean | undefined;
  displayedColumns: string[] = ['check', 'task', 'modifyBtn'];

  taskArray: Task[] = [];
  dataSource = new MatTableDataSource(this.taskArray);
  searchBar: boolean | undefined ;

  constructor(
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    const v = localStorage.getItem('Task List')
    if(v){
    this.taskArray = JSON.parse(v)
    this.dataSource.data = this.taskArray
    }
  }
  
  removeSelectedRows(i: number): void {
    this.taskArray = this.taskArray.filter((v: Task, index: number) => index != i);
    this.dataSource.data = this.taskArray
    this.storeData(this.taskArray)
    console.log(this.taskArray);
  }
  checkMethod(ind: number): void {
    this.taskArray = this.taskArray
      .map((v: Task, index: number) => {
        if (index == ind) {
          v.checked = !v.checked;
        }
        return v;
      })
      this.storeData(this.taskArray)
    //console.log(this.taskArray);
  }
  openDialog(i?: number): void {
    const dialogRef = this.dialog.open(DialogEditTaskComponent,
      { data: (typeof i !== 'undefined') ? this.taskArray[i] : null });
    //se true esegui quello che c'è dopo
    dialogRef.afterClosed().subscribe((newTask: Task | null) => {
      //all'altimo indice ti crea il task
      newTask && (this.taskArray[(typeof i == 'undefined') ? this.taskArray.length : i] = newTask);
      this.dataSource.data = this.taskArray
      this.storeData(this.taskArray)
      //this.MatTable?.renderRows();
      //i || this.taskArray.length
    })
    //console.log(this.taskArray);
  }
  filter(x: string): void {
    switch (x) {
      case 'all':
        this.dataSource.data = this.taskArray
        break
      case 'done':
        this.dataSource.data = this.taskArray.filter(v => v.checked);
        break
      case 'todo':
        this.dataSource.data = this.taskArray.filter(v => !v.checked);
        break
    }
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    //console.log(filterValue);
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  searchShow(search: boolean):void{
    this.searchBar = search;    
  }
  storeData(data: Task[]):void{
    localStorage.setItem('Task List', JSON.stringify(data))
  }
}
