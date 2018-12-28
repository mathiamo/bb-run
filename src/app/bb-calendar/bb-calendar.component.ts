import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';

export interface UserData {
  id: string;
  name: string;
  progress: string;
  color: string;
}
export interface BBData {
 position: number;
 name: string;
 apperances: number;
 streak: number;
}
/** Constants used to fill up our data base. */
const COLORS: string[] = ['maroon', 'red', 'orange', 'yellow', 'olive', 'green', 'purple',
  'fuchsia', 'lime', 'teal', 'aqua', 'blue', 'navy', 'black', 'gray'];
const NAMES: string[] = ['Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack',
  'Charlotte', 'Theodore', 'Isla', 'Oliver', 'Isabella', 'Jasper',
  'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'];

@Component({
  selector: 'app-bb-calendar',
  templateUrl: './bb-calendar.component.html',
  styleUrls: ['./bb-calendar.component.scss']
})
export class BbCalendarComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'apperances', 'streak'];
  dataSource: MatTableDataSource<BBData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor() {
    // Create 100 users
    const bbData = [
      {
        position: 1,
        name: 'Fredrik',
        streak: 6,
        apperances: 16
      },
      {
        position: 2,
        name: 'Mathias',
        streak: 4,
        apperances: 15
      },
      {
        position: 3,
        name: 'Molly',
        streak: 6,
        apperances: 15
      },
      {
        position: 4,
        name: 'Knut',
        streak: 6,
        apperances: 13
      },
      {
        position: 5,
        name: 'Anne',
        streak: 6,
        apperances: 12
      },
      {
        position: 6,
        name: 'Øystein',
        streak: 6,
        apperances: 12
      },
      {
        position: 7,
        name: 'Pål',
        streak: 6,
        apperances: 10
      },
      {
        position: 8,
        name: 'Hanna',
        streak: 6,
        apperances: 10
      },
      {
        position: 9,
        name: 'Sean',
        streak: 6,
        apperances: 9
      },
      {
        position: 10,
        name: 'Markus',
        streak: 6,
        apperances: 9
      }
    ];

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(bbData);
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}



