import { Component, OnInit } from '@angular/core';
import { EmployeesService } from '../services/employees/employees.service';
import { IEmployee } from '../interfaces/iemployee';
import { Column } from '../interfaces/column';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
    selector: 'app-employees',
    templateUrl: './employees.component.html',
    styleUrl: './employees.component.css'
})
export class EmployeesComponent implements OnInit {
    constructor(private employeesService: EmployeesService, private router: Router, private messageService: MessageService, private confirmationService: ConfirmationService) { }

    employees!: IEmployee[];
    cols!: Column[];
    selectedEmployee!: IEmployee;

    ngOnInit(): void {
        this.employeesService.getEmployees().subscribe(data => this.employees = data as IEmployee[]);
        this.cols = [
            { field: 'id', header: 'Employee ID' },
            { field: 'name', header: 'First Name' },
            { field: 'email', header: 'Email' },
            { field: 'gender', header: 'Gender' },
            { field: 'assetsAllocated', header: 'Assets Allocated' },
        ]
    }

    onRowSelect() {
        this.router.navigate(['/employees/view', this.selectedEmployee.id]);
    }

    deleteEmployee(id: number) {
        this.confirmationService.confirm({
            message: 'Are you sure that you want to proceed?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            acceptIcon: "none",
            rejectIcon: "none",
            rejectButtonStyleClass: "p-button-text",
            accept: () => {
                this.messageService.add({ severity: 'success', key: 'success', summary: 'Successful', detail: 'Employee Deleted Successfully! Redirecting...', life: 2000 });
                // this.employeesService.deleteEmployee(id).subscribe(data => {
                //     if (data.status == 200) {
                //         this.messageService.add({ severity: 'success', key: 'success', summary: 'Successful', detail: 'Employee Deleted Successfully! Redirecting...', life: 2000 });
                //         setTimeout(() => this.router.navigate(['/employees']), 2000);
                //     } else {
                //         this.messageService.add({ severity: 'error', key: 'error', summary: 'Error', detail: 'Error Deleting Employee!', life: 3000 });
                //     }
                // });
            },
            reject: () => {
                this.messageService.add({ severity: 'error', key: 'error', summary: 'Error', detail: 'Employee Deletion Cancelled!', life: 3000 });
            }
        });
    }

}
