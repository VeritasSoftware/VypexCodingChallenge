import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Leave } from '../models/leave';

@Injectable({ providedIn: 'root' })
export class LeaveApiService {
    private readonly httpClient = inject(HttpClient);

    private readonly baseUrl = 'https://localhost:7189/api';

    public add(leave: Leave): Observable<Leave> {
        console.log('My leave', leave);
        return this.httpClient.post<Leave>(`${this.baseUrl}/leaves`, leave);
    }

    public update(leave: Leave): Observable<Leave> {
        return this.httpClient.put<Leave>(`${this.baseUrl}/leaves/${leave.id}`, leave);
    }

    public delete(leaveId: string): Observable<void> {
        return this.httpClient.delete<void>(`${this.baseUrl}/leaves/${leaveId}`);
    }
}
