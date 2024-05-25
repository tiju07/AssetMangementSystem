import { Component, OnInit } from '@angular/core';
import { IUserProfile } from '../interfaces/iuserprofile';
import { AdminsService } from '../services/admins/admins.service';
import { Observable, map } from 'rxjs';
import { Column } from '../interfaces/column';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
    selector: 'app-pending-access-accounts',
    templateUrl: './pending-access-accounts.component.html',
    styleUrl: './pending-access-accounts.component.css'
})
export class PendingAccessAccountsComponent implements OnInit {
    constructor(private adminService: AdminsService, private messageService: MessageService, private confirmationService: ConfirmationService) { }

    accounts!: IUserProfile[];
    cols!: Column[];

    ngOnInit() {
        this.adminService.getAccountsWithPendingAccess().subscribe(data => this.accounts = data.body as IUserProfile[]);
        this.cols = [
            { field: 'id', header: 'Employee ID' },
            { field: 'name', header: 'First Name' },
            { field: 'email', header: 'Email' },
            { field: 'username', header: 'Username' },
            { field: 'gender', header: 'Gender' },
            { field: 'contactNumber', header: 'Contact Number' },
            { field: 'address', header: 'Address' }
        ]
    }

    allowAccess(id: number) {
        this.confirmationService.confirm({
            message: 'Are you sure that you want to allow access to this user?',
            header: 'Allow Access',
            icon: 'pi pi-exclamation-triangle',
            acceptIcon: "pi pi-check",
            rejectIcon: "pi pi-times",
            acceptLabel: "",
            rejectLabel: "",
            acceptButtonStyleClass: "p-button-success",
            rejectButtonStyleClass: "p-button-danger",
            accept: () => {
                this.adminService.allowAccess(id).subscribe(data => {
                    if (data.status == 200) {
                        this.messageService.add({ severity: 'success', key: 'success', summary: 'Successful', detail: 'Access Granted Successfully!', life: 2000 });
                        setTimeout(() => this.adminService.getAccountsWithPendingAccess().subscribe(data => this.accounts = data.body as IUserProfile[]), 1500);
                    } else {
                        this.messageService.add({ severity: 'error', key: 'error', summary: 'Error', detail: 'Error Granting Access!', life: 2000 });
                    }
                });
            },
            reject: () => {
            }
        });

    }

    denyAccess(id: number) {
        this.confirmationService.confirm({
            message: 'Are you sure that you want to deny access to this user?',
            header: 'Deny Access',
            icon: 'pi pi-exclamation-triangle',
            acceptIcon: "pi pi-check",
            rejectIcon: "pi pi-times",
            acceptLabel: "",
            rejectLabel: "",
            acceptButtonStyleClass: "p-button-success",
            rejectButtonStyleClass: "p-button-danger",
            accept: () => {
                this.adminService.denyAccess(id).subscribe(data => {
                    if (data.status == 200) {
                        this.messageService.add({ severity: 'success', key: 'success', summary: 'Successful', detail: 'Removed User Successfully!', life: 2000 });
                        setTimeout(() => this.adminService.getAccountsWithPendingAccess().subscribe(data => this.accounts = data.body as IUserProfile[]), 1500);
                    } else {
                        this.messageService.add({ severity: 'error', key: 'error', summary: 'Error', detail: 'Error Removing User!', life: 2000 });
                    }
                });
            },
            reject: () => {
            }
        });

    }
}
