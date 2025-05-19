import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: null })
export class NotificationService {

    public data$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
    public error$: BehaviorSubject<any> = new BehaviorSubject<any>(null);

    public subscribe<T>(observer: Observable<T>) {
        observer.subscribe({
            next: (data) => {
                console.log('Data loaded successfully', data);
                this.data$.next(data);
            },
            error: (e) => {
                console.error('Error loading data', e.message);
                this.error$.next(e);
            }
        });
    }
}
