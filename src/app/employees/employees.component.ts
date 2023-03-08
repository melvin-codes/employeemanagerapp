import { Component, OnInit } from '@angular/core';
import { Employee } from '../interface/employee';
import { EmployeeService } from '../service/employee.service';
import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  employees: Employee[];
  order: any;
  editEmployee: Employee;
  deleteEmployee: Employee;
  currentEmployee: Employee[];

  editModalBox: boolean = false;
  deleteModalBox: boolean = false;
  addModalBox: boolean = false;
  
  constructor(private employeeService: EmployeeService) {}

  ngOnInit() {
      this.getAllEmployees();
  }

  sortNameAZ() {
    this.employees.sort((a, b) => (a.firstName > b.firstName) ? 1 : -1);
  }
  sortNameZA() {
    this.employees.sort((a, b) => (b.firstName > a.firstName) ? 1 : -1);
  }

  //PRESELECTS GENDER WHEN EDITING ONE THATS ALREADY THERE
  setGender(gender: string): void {
    if(gender === 'Male') {
        const ele = document.getElementById('gender') as HTMLInputElement;
        ele.checked = true;
    } else if(gender === 'Female') {
        const ele = document.getElementById('gender2') as HTMLInputElement;
        ele.checked = true;
    } else if(gender === 'Others') {
        const ele = document.getElementById('gender3') as HTMLInputElement;
        ele.checked = true;
    } else if(gender === 'Prefer Not To Say') {
        const ele = document.getElementById('gender4') as HTMLInputElement;
        ele.checked = true;
    }
    
  }

  //GETS ALL EMPLOYEES
  getAllEmployees(): void {
    this.employeeService.getAll()
    .subscribe({
      next: (response: Employee[]) => {
        this.employees = response
        console.log(response);
      },
      error: (e) => console.error(e)
    });
  }

  //GETS EMPLOYEE BY ID
  getEmployeeById(id: number): void {
    this.employeeService.get(id)
    .subscribe({
      next: (response: Employee[]) => {
        console.log(response);
        this.currentEmployee = response;
      },
      error: (e: HttpErrorResponse) => {
        alert(e.message);

      }
    });
  }

  
  //ADD EMPLOYEES
  onAddEmployee(addForm: NgForm): void {
    document.getElementById('add-employee-form').click();
    this.employeeService.create(addForm.value)
      .subscribe({
        next: (response: Employee) => {
          console.log(response);
          this.getAllEmployees();
          addForm.reset();
        },
        error: (e: HttpErrorResponse) => {
          alert(e.message);
          addForm.reset();
        } 
      });
  }

  //UPDATE EMPLOYEES
  onUpdateEmployee(employee: Employee): void {
    this.employeeService.update(employee)
      .subscribe({
        next: (response: Employee) => {
          console.log(response);
          this.getAllEmployees();
        },
        error: (e: HttpErrorResponse) => {
          alert(e.message);
        }
      });
  }

  //DELETE EMPLOYEES
  onDeleteEmployee(employeeId: any): void {
    this.employeeService.delete(employeeId)
      .subscribe({
        next: (response: void) => {
          console.log(response);
          this.getAllEmployees();
        },
        error: (e: HttpErrorResponse) => {
          alert(e.message);
        }
      });
  }

  //SEARCH EMPLOYEES
  searchEmployees(key: string): void {
    console.log(key);
    const results: Employee[] = [];
    for(const employee of this.employees) {
      if (employee.firstName.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || employee.lastName.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || employee.email.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || employee.phoneNumber.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || employee.jobTitle.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(employee);
      }
    }
    this.employees = results;
    if( results.length === 0 || !key) {
      this.getAllEmployees();
    }
  }

  //OPEN MODALS FUNCTION
  public openModal(employee: Employee, mode: string): void {
  
    if(mode === 'add') {
      this.addModalBox = true;
    }
    if(mode === 'edit') {
      this.editEmployee = employee;
      this.editModalBox = true;
    }
    if(mode === 'delete') {
      this.deleteEmployee = employee;
      this.deleteModalBox = true;
      
    }
  }
}
