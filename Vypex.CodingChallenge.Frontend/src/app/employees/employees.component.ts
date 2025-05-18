import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { NzAlertComponent } from 'ng-zorro-antd/alert';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconDirective, NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzTableModule } from 'ng-zorro-antd/table';
import { EditEmployeeModal } from './edit-employee/edit-employee.modal';
import { EmployeeApiService } from './services/employee-api.service';
import { NotificationService } from './services/notification.service';

@Component({
  selector: 'app-employees',
  imports: [
    NzTableModule,
    NzButtonComponent,
    NzAlertComponent,
    AsyncPipe,
    NzFormModule,
    NzInputModule,
    NzIconModule,
    NzIconDirective,
    CommonModule,
    ReactiveFormsModule
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

  public employees$ = this.notificationService.data$;
  public error$ = this.notificationService.error$;

  private subscribe$ = this.employeeApiService.getEmployees();

  private readonly fb = inject(FormBuilder);

  protected readonly form = this.fb.group({
    searchName: this.fb.nonNullable.control(null!)
  })

  public ngOnInit() {
    this.load();
  }

  load() {
    this.reset(); // Reset error and employees state.
    this.notificationService.subscribe(this.subscribe$);
  }

  search() {
    this.reset(); // Reset error and employees state.

    let searchName = <string><unknown>this.form.value.searchName;
    if (searchName.length === 0) {
      this.load();
      return;
    }

    if (searchName.length < 3) {
      this.error$.next({ message: 'Search name must be at least 3 characters long.' });
      return;
    }

    this.notificationService.subscribe
      (
        this.employeeApiService.getEmployeesByName(searchName)
      );
  }

  reset() {
    this.error$.next(null); // Reset error state.
    this.employees$.next([]); // Reset employees state.
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
