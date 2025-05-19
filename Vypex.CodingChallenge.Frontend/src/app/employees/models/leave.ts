import { Guid } from './guid';

export interface Leave {
    id: Guid;
    startDate: Date;
    endDate: Date;
    employeeId: Guid;
}
