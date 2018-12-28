import { Person } from './person.model';

export class BBEvent {
  id: number;
  date: string;
  pace: string;
  participants: Person[];
}
