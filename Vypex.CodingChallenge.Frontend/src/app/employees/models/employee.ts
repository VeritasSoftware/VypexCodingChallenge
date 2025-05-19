import { Guid } from './guid';

export interface Employee {
  id: Guid;
  name: string;
  totalLeaveDays: number;
}
