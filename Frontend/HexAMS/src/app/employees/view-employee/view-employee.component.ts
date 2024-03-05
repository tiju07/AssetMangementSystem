import { Component, OnInit } from '@angular/core';
import { EmployeesService } from '../../services/employees/employees.service';
import { IEmployee } from '../../interfaces/iemployee';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
    selector: 'app-view-employee',
    templateUrl: './view-employee.component.html',
    styleUrl: './view-employee.component.css'
})
export class ViewEmployeeComponent implements OnInit {

    constructor(private employeeService: EmployeesService, private route: ActivatedRoute, private messageService: MessageService, private confirmationService: ConfirmationService) {
    }
    employee!: IEmployee;
    ngOnInit(): void {
        this.employeeService.getEmployeeByID(parseInt(this.route.snapshot.paramMap.get('id')!))
            .subscribe(
                data => this.employee = data as IEmployee
            );
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Employee Viewed Successfully' });
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
