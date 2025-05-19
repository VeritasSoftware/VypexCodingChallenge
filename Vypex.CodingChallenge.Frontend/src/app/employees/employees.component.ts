import { AsyncPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { NzAlertComponent } from 'ng-zorro-antd/alert';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzTableModule } from 'ng-zorro-antd/table';
import { EditEmployeeModal } from './edit-employee/edit-employee.modal';
import { Employee } from './models';
import { SearchEmployeesComponent } from './search-employees/search-employees.component';
import { EmployeeApiService } from './services/employee-api.service';
import { NotificationService } from './services/notification.service';

@Component({
  selector: 'app-employees',
  imports: [
    NzTableModule,
    NzButtonComponent,
    NzAlertComponent,
    AsyncPipe,
    SearchEmployeesComponent
  ],
  providers: [
    EditEmployeeModal,
    NotificationService
  ],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.scss'
})
export class EmployeesComponent implements OnInit {
  private readonly notificationService = inject(NotificationService<Employee[]>);
  private readonly employeeApiService = inject(EmployeeApiService);
  private readonly editEmployeeModal = inject(EditEmployeeModal);

  public employees$ = this.notificationService.data$;
  public error$ = this.notificationService.error$;

  private subscribe$ = this.employeeApiService.getEmployees();

  isLastSearchByName: boolean = false;
  lastSearchName: string = "";

  public ngOnInit() {
    this.load();
  }

  error(error: any) {
    this.reset(); // Reset error and employees state.
    this.error$.next(error); // Display error.
  }

  load() {
    this.isLastSearchByName = false; // Reset search state.
    this.reset(); // Reset error and employees state.
    this.notificationService.subscribe(this.subscribe$);//Fetch employees.
  }

  search(searchName: string) {
    this.isLastSearchByName = true; // Set search state.
    this.lastSearchName = searchName; // Store last search name.
    this.reset(); // Reset error and employees state.

    this.notificationService.subscribe
      (
        this.employeeApiService.getEmployeesByName(searchName)
      );// Fetch employees by name.
  }

  reset() {
    this.error$.next(null); // Reset error state.
    this.employees$.next([]); // Reset employees state.
  }

  public edit(employee: Employee) {
    this.editEmployeeModal.open({ id: employee.id, name: employee.name })
      .afterClose
      .subscribe(result => {
        //if (result === undefined) return; // Modal cancelled.

        if (this.isLastSearchByName) {
          this.search(this.lastSearchName); // Refresh employees by name.
        }
        else {
          this.load(); // Refresh employees.
        }
        // TODO: Handle result
      });
  }
}
