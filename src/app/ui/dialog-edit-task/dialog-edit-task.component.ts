import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Task } from 'src/model/task';

@Component({
  selector: 'app-dialog-edit-task',
  templateUrl: './dialog-edit-task.component.html',
  styleUrls: ['./dialog-edit-task.component.scss']
})
export class DialogEditTaskComponent {
  form = this.fb.group({
    checked: false, 
    desc: ''
  })
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Task | null,
    private dialogRef: MatDialogRef<DialogEditTaskComponent>,
    private fb: FormBuilder
  ) {
    data && this.form.patchValue(data)
  }
  close() {
    this.dialogRef.close(null)
  }
  onSubmit() {
    this.dialogRef.close(this.form.value)
  }

}
