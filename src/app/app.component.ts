import { HttpErrorResponse } from '@angular/common/http';
import { Employee } from './interface/employee';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeService } from './service/employee.service';
import { Observable } from 'rxjs';
import { NgForm } from '@angular/forms';
import { ViewChild } from '@angular/core';
import { NgModel } from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  
}
