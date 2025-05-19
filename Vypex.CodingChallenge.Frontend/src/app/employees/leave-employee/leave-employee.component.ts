import { CommonModule, DatePipe } from '@angular/common';
import { Component, inject, Input, OnInit, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzTableModule } from 'ng-zorro-antd/table';
import { BehaviorSubject } from 'rxjs';
import { Leave } from '../models';
import { Guid } from '../models/guid';

@Component({
  selector: 'app-leave-employee',
  imports: [
    NzFormModule,
    NzInputModule,
    NzTableModule,
    NzButtonModule,
    NzDatePickerModule,
    ReactiveFormsModule,
    CommonModule,
    DatePipe
  ],
  templateUrl: './leave-employee.component.html',
  styleUrl: './leave-employee.component.scss'
})
export class LeaveEmployeeComponent implements OnInit {

  onAdd = output<Leave>();
  onUpdate = output<Leave>();
  onDelete = output<any>();
  onClear = output<void>();

  @Input() employeeId: Guid = "";
  @Input() leaves: BehaviorSubject<Leave[]> = new BehaviorSubject<Leave[]>([]);

  private readonly fb = inject(FormBuilder);

  protected readonly form = this.fb.group({
    id: this.fb.nonNullable.control(""),
    startDate: this.fb.nonNullable.control(new Date(), Validators.required),
    endDate: this.fb.nonNullable.control(new Date(), Validators.required),
    employeeId: this.fb.nonNullable.control(""),
  })

  public isUpdate: boolean = false;

  today = new Date();

  ngOnInit(): void {

  }

  disableDates = (current: Date): boolean => {
    // Disable dates before today
    return current < this.today;
  };

  addLeave() {
    console.log("Add Leave");

    let leave: Leave = {
      startDate: this.form.value.startDate!,
      endDate: this.form.value.endDate!,
      employeeId: this.employeeId,
      id: "00000000-0000-0000-0000-000000000000"
    };

    this.onAdd.emit(leave); // Emit event to parent component.
    this.clearLeave(); // Clear form after adding.
  }

  updateLeave() {
    console.log("Update Leave");

    let leave: Leave = {
      startDate: this.form.value.startDate!,
      endDate: this.form.value.endDate!,
      employeeId: this.employeeId,
      id: this.form.value.id!
    };

    this.onUpdate.emit(leave); // Emit event to parent component.
    this.clearLeave(); // Clear form after updating.
  }

  selectLeave(leave: Leave) {
    console.log("Select Leave", leave);
    this.form.setValue({
      id: leave.id,
      employeeId: leave.employeeId,
      startDate: leave.startDate,
      endDate: leave.endDate
    });
    this.isUpdate = true; // Set update mode.
  }

  deleteLeave() {
    let id = this.form.value.id!;

    console.log("Delete Leave", id);

    if (id.length === 0) {
      console.log("Leave ID cannot be empty.");
      return;
    }

    this.onDelete.emit(id); // Emit event to parent component.
    this.clearLeave(); // Clear form after deletion.
  }

  clearLeave() {
    this.form.setValue({
      id: "00000000-0000-0000-0000-000000000000",
      employeeId: this.employeeId,
      startDate: this.today,
      endDate: this.today
    });
    this.isUpdate = false; // Reset update mode.
  }
}
