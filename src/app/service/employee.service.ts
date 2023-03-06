import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError, tap } from 'rxjs';
import { Employee } from '../interface/employee';

@Injectable({providedIn: 'root'})

export class EmployeeService {
  private readonly apiUrl = 'http://localhost:8080/app';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.apiUrl}/employee/all`);
  }

  get(id: number): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.apiUrl}/employee/find/${id}`);
  }

  create(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(`${this.apiUrl}/employee/add`,employee);
  }

  update(employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${this.apiUrl}/employee/update`, employee);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/employee/${id}`);
  }



  
}
