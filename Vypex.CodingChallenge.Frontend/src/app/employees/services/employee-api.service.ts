import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee';
import { Guid } from '../models/guid';
import { Leave } from '../models/leave';

@Injectable({ providedIn: 'root' })
export class EmployeeApiService {
  private readonly httpClient = inject(HttpClient);

  private readonly baseUrl = 'https://localhost:7189/api';

  public getEmployees(): Observable<Array<Employee>> {
    return this.httpClient.get<Array<Employee>>(`${this.baseUrl}/employees`);
  }

  public getEmployeesByName(name: string): Observable<Array<Employee>> {
    return this.httpClient.get<Array<Employee>>(`${this.baseUrl}/employees/search/${name}`);
  }

  public getEmployeeById(id: Guid): Observable<Employee> {
    return this.httpClient.get<Employee>(`${this.baseUrl}/employees/${id}`);
  }

  public getEmployeeLeaves(employeeId: Guid): Observable<Leave[]> {
    return this.httpClient.get<Leave[]>(`${this.baseUrl}/employees/${employeeId}/leaves`);
  }
}
