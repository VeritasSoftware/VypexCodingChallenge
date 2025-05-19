import { AsyncPipe, CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzAlertComponent } from 'ng-zorro-antd/alert';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';
import { validateForm } from '../../common/validateForm';
import { LeaveEmployeeComponent } from '../leave-employee/leave-employee.component';
import { Guid } from '../models/guid';
import { Leave } from '../models/leave';
import { EmployeeApiService } from '../services/employee-api.service';
import { LeaveApiService } from '../services/leave-api.service';
import { NotificationService } from '../services/notification.service';
import { EditEmployeeBindings, EditEmployeeResult } from './edit-employee.modal';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzFormModule,
    NzButtonModule,
    NzInputModule,
    NzAlertComponent,
    AsyncPipe,
    LeaveEmployeeComponent
  ],
  providers: [
    NotificationService
  ]
})
export class EditEmployeeComponent implements OnInit {
  private readonly modalRef = inject(NzModalRef<EditEmployeeComponent, EditEmployeeResult>);
  private readonly modalData = inject<EditEmployeeBindings>(NZ_MODAL_DATA);
  private readonly fb = inject(FormBuilder);

  private readonly notificationService = inject(NotificationService);
  private readonly leaveNotificationService = inject(NotificationService);

  private readonly employeeApiService = inject(EmployeeApiService);
  private readonly leaveApiService = inject(LeaveApiService);

  public leaves$ = this.notificationService.data$;
  public error$ = this.notificationService.error$;

  public leave$ = this.leaveNotificationService.data$;
  public leaveError$ = this.leaveNotificationService.error$;

  public id = this.modalData.id;
  public name = this.modalData.name;

  protected readonly form = this.fb.group({
    name: this.fb.nonNullable.control("", Validators.required)
  })

  ngOnInit(): void {
    this.form.setValue({ name: this.modalData.name }); // Set employee name.
    this.load(); // Load employee data.
  }

  sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  load() {
    this.reset(); // Reset error and leaves state.
    this.notificationService.subscribe(this.employeeApiService.getEmployeeLeaves(this.id)); // Fetch leaves by employee id.
  }

  protected cancel(): void {
    this.modalRef.triggerCancel();
  }

  protected submit(): void {
    if (!validateForm(this.form)) return;

    const formValue = this.form.getRawValue();

    // Handle form submission logic here

    this.modalRef.close({});
  }

  addLeave(leave: Leave) {
    console.log("Add Leave");
    this.resetLeave(); // Reset error and leaves state.
    this.leaveNotificationService.subscribe(this.leaveApiService.add(leave)); // Add leave.
    this.sleep(1000).then(() => {
      this.load(); // Reload leaves.
    });
  }

  updateLeave(leave: Leave) {
    console.log("Update Leave");
    this.resetLeave(); // Reset error and leaves state.
    this.leaveNotificationService.subscribe(this.leaveApiService.update(leave)); // Update leave.
    this.sleep(1000).then(() => {
      this.load(); // Reload leaves.
    });
  }

  deleteLeave(leaveId: Guid) {
    console.log("Delete Leave " + leaveId);
    this.resetLeave(); // Reset error and leaves state.
    this.leaveNotificationService.subscribe(this.leaveApiService.delete(leaveId)); // Delete leave.
    this.sleep(1000).then(() => {
      this.load(); // Reload leaves.
    });
  }

  clearLeave() {
    console.log("Clear Leave");
    this.resetLeave(); // Reset error and leaves state.
  }

  resetLeave() {
    this.leave$.next(null); // Reset leave state.
    this.leaveError$.next(null); // Reset leave error state.
  }

  reset() {
    this.leaves$.next([]); // Reset leaves state.
    this.error$.next(null); // Reset error state.
  }
}
