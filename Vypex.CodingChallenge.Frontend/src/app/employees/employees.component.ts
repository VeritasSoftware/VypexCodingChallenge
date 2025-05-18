import { AsyncPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { NzAlertComponent } from 'ng-zorro-antd/alert';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzTableModule } from 'ng-zorro-antd/table';
import { BehaviorSubject } from 'rxjs';
import { EditEmployeeModal } from './edit-employee/edit-employee.modal';
import { Employee } from './models';
import { EmployeeApiService } from './services/employee-api.service';
import { NotificationService } from './services/notification.service';

@Component({
  selector: 'app-employees',
  imports: [
    NzTableModule,
    NzButtonComponent,
    NzAlertComponent,
    AsyncPipe
  ],
  providers: [
    EditEmployeeModal
  ],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.scss'
})
export class EmployeesComponent implements OnInit {
  private readonly notificationService = inject(NotificationService);
  private readonly employeeApiService = inject(EmployeeApiService);
  private readonly editEmployeeModal = inject(EditEmployeeModal);

  public employees$: BehaviorSubject<Employee[]> = this.notificationService.data$;
  public error$: BehaviorSubject<any> = this.notificationService.error$;

  subscribe$ = this.employeeApiService.getEmployees();

  public ngOnInit() {
    this.load();
  }

  load() {
    this.error$.next(null); // Reset error state.
    this.employees$.next([]); // Reset employees state.
    this.notificationService.subscribe(this.subscribe$);
  }

  public edit(employeeId: number) {
    this.editEmployeeModal.open({ id: employeeId })
      .afterClose
      .subscribe(result => {
        if (result === undefined) return; // Modal cancelled.

        // TODO: Handle result
      });
  }
}
