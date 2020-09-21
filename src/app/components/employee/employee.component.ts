import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { NgForm } from '@angular/forms';
import { Employee } from '../../models/employee';
import { Xliff } from '@angular/compiler';

// decorador
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
})

//clase de lògica en cada componente
export class EmployeeComponent implements OnInit {
  constructor(public employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.getEmployess();
  }

  cleanForm(form: NgForm) {
    form.reset();
  }

  getEmployess() {
    this.employeeService.getEmployees().subscribe(
      (res) => {
        this.employeeService.employees = res;
      },
      (err) => console.error(err)
    );
  }
  addEmployee(form: NgForm) {
    if (form.value._id) {
      this.employeeService.updateEmployee(form.value).subscribe(
        (res) => {
          console.log(res);
          this.getEmployess();
          form.reset();
        },
        (err) => console.log(err)
      );
    } else {
      this.employeeService.createEmployee(form.value).subscribe(
        (res) => {
          this.getEmployess();
          form.reset();
        },
        (err) => console.error(err)
      );
    }
  }

  deleteEmployee(id: string) {
    if (confirm('Esta segur@ de querer eliminar?')) {
      this.employeeService.deleteEmployee(id).subscribe(
        (res) => {
          this.getEmployess();
        },
        (err) => console.error(err)
      );
    }
  }

  employeeEdit(employee: Employee) {
    console.log(employee);
    this.employeeService.selectedEmployees = employee;
  }
}
