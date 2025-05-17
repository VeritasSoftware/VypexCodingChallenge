import { AsyncPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { NzAlertComponent } from 'ng-zorro-antd/alert';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzTableModule } from 'ng-zorro-antd/table';
import { BehaviorSubject, catchError, Observable } from 'rxjs';
import { EditEmployeeModal } from './edit-employee/edit-employee.modal';
import { Employee } from './models';
import { EmployeeApiService } from './services/employee-api.service';

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
  private readonly employeeApiService = inject(EmployeeApiService);
  private readonly editEmployeeModal = inject(EditEmployeeModal);

  public employees$: Observable<Employee[]> = new Observable<Employee[]>();
  public error$: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  public ngOnInit() {
    this.load();
  }

  load() {
    this.employees$ = new Observable<Employee[]>();
    this.error$.next(null); // Reset error state.
    this.employees$ = this.employeeApiService.getEmployees().pipe(
      catchError((e) => {
        console.error('Error loading employees', e.message);
        this.error$.next(e);
        return new Observable<Employee[]>(observer => observer.next([]));
      })
    );
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
