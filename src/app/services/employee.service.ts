import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employee } from '../models/employee';

@Injectable({
  providedIn: 'root',
})

// contendra modulos con los que interactuaremos con la base de datos desplegada en mongodb atlas
export class EmployeeService {
  URL_API = 'https://api-colaborator-employees.herokuapp.com/api/employees';

  selectedEmployees: Employee = {
    name: '',
    office: '',
    position: '',
    salary: 0,
  };

  employees: Employee[];

  constructor(private http: HttpClient) {}

  getEmployees() {
    return this.http.get<Employee[]>(this.URL_API);
  }

  createEmployee(employee: Employee) {
    return this.http.post(this.URL_API, employee);
  }

  updateEmployee(employee: Employee) {
    delete employee._id;
    return this.http.put(`${this.URL_API}/${employee._id}`, employee);
  }

  deleteEmployee(_id: string) {
    return this.http.delete(`${this.URL_API}/${_id}`);
  }
}
