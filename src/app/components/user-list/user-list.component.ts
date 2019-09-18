import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DataService } from '../../services/data.service';
import { Iuser } from 'src/app/models/user.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UserListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'firstname', 'lastname', 'email', 'edit'];
  public usersData: MatTableDataSource<Iuser>;

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(public dataSvc: DataService) {}

  applyFilter(filterValue: string) {
    this.usersData.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit() {
    this.usersData = new MatTableDataSource<Iuser>(this.dataSvc.getUsersData());
    this.usersData.filterPredicate = (data, filter: string): boolean => {
      return data.lastname.toLowerCase().includes(filter);
    };
    this.usersData.sort = this.sort;
  }
}
