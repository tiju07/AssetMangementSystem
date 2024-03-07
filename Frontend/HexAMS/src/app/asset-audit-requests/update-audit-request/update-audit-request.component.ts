import { Component } from '@angular/core';
import { AuditRequestsService } from '../../services/audit-requests/audit-requests.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { AssetService } from '../../services/asset-catalogue/asset.service';
import { MessageService } from 'primeng/api';
import { EmployeesService } from '../../services/employees/employees.service';
import { IAsset } from '../../interfaces/iasset';
import { IEmployee } from '../../interfaces/iemployee';
import { IAuditRequest } from '../../interfaces/iauditrequest';

@Component({
    selector: 'app-update-audit-request',
    templateUrl: './update-audit-request.component.html',
    styleUrl: './update-audit-request.component.css'
})
export class UpdateAuditRequestComponent {
    constructor(private auditRequestService: AuditRequestsService, private router: Router, private fb: FormBuilder, private assetService: AssetService, private messageService: MessageService, private employeeService: EmployeesService, private activatedRoute: ActivatedRoute) { }

    assets!: IAsset[]
    employees!: IEmployee[];
    statuses = ['Pending', 'Verified', 'Rejected'];

    form = this.fb.group({
        requestID: [0],
        employeeID: [null, [Validators.required]],
        assetID: [null, [Validators.required]],
        requestDetails: [''],
        requestStatus: ['Open']
    })

    ngOnInit(): void {
        this.activatedRoute.data.subscribe(data => {
            this.assets = data['assets'] as IAsset[]
        })
        this.activatedRoute.data.subscribe(data => {
            this.employees = data['employees'] as IEmployee[]
        })
        this.activatedRoute.data.subscribe({
            next: (data) => {
                if (data['request'].error && data['request'].error.status == 401) {
                    this.messageService.add({ key: 'error', severity: 'error', summary: 'Error', detail: 'Unauthorized Access' });
                    this.router.navigate(['/request-details']);
                } else if (data['request'].status == 200) {
                    this.form.patchValue(data['request'] as any)
                }
                else {
                    this.messageService.add({ key: 'error', severity: 'error', summary: 'Error', detail: data['request'].error.statusText });
                }
            },
            error: (error) => { console.log("Error: " + error) }
        })
    }

    updateRequest() {
        if (!this.form.valid) {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please fill in all required fields' });
            return;
        }
        else {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Request Updated Successfully! Redirecting...', life: 2000 });
            // this.auditRequestService.createAuditRequest(this.form.getRawValue()).subscribe({
            //     next: data => {
            //         if (data.status == 200) {
            //             this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Request Updated Successfully! Redirecting...', life: 2000 });
            //             setTimeout(() => this.router.navigate(['/audit-requests']), 2000);
            //         }
            //         else {
            //             this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed Updating Request!' });
            //         }
            //     },
            //     error: err => {
            //         this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed Updating Request!' });
            //     }
            // })
        }
    }
}