import { EmployeesComponent } from './../employees/employees.component';
import { Component, Input } from '@angular/core';
import { Employee } from '../interface/employee'; 

@Component({
  selector: 'app-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.css']
})
export class TableViewComponent extends EmployeesComponent {
  
}
