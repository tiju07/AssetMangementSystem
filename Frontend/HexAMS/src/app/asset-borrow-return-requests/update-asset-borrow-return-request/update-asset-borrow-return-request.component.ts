import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AssetService } from '../../services/asset-catalogue/asset.service';
import { BorrowReturnRequestsService } from '../../services/borrow-return-requests/borrow-return-requests.service';
import { IAsset } from '../../interfaces/iasset';
import { IBorrowReturnRequest } from '../../interfaces/iborrowreturnrequest';
import { formatDate } from '@angular/common';

@Component({
    selector: 'app-update-asset-borrow-return-request',
    templateUrl: './update-asset-borrow-return-request.component.html',
    styleUrl: './update-asset-borrow-return-request.component.css'
})
export class UpdateAssetBorrowReturnRequestComponent {
    constructor(private fb: FormBuilder, private messageService: MessageService, private router: Router, private assetService: AssetService, private borrowReturnRequestService: BorrowReturnRequestsService, private activatedRoute: ActivatedRoute) { }

    assets!: IAsset[];
    requestTypes = ['Borrow', 'Return'];
    request!: IBorrowReturnRequest;

    dateRangeValidator = (control: AbstractControl) => {
        const from = control.get('assetAllocationFrom')?.value;
        const to = control.get('assetAllocationTill')?.value;
        return from && to && new Date(to) <= new Date(from) ? { 'dateRange': true } : null;
    }

    form = this.fb.group({
        employeeID: new FormControl(1, [Validators.required]),
        adminID: new FormControl(1, [Validators.required]),
        assetID: new FormControl(null, [Validators.required]),
        assetRequestType: new FormControl('', [Validators.required]),
        assetAllocationFrom: new FormControl('', [Validators.required]),
        assetAllocationTill: new FormControl('', [Validators.required]),
        assetCount: new FormControl(null, [Validators.required, Validators.min(1)]),
        requestDetails: new FormControl(null)
    }, { validators: this.dateRangeValidator });

    ngOnInit(): void {
        this.activatedRoute.data.subscribe(data => this.assets = data['assets'] as IAsset[]);
        this.activatedRoute.data.subscribe({
            next: (data) => {
                if (data['allocation'].error && data['allocation'].error.status == 401) {
                    this.messageService.add({ key: 'error', severity: 'error', summary: 'Error', detail: 'Unauthorized Access' });
                    this.router.navigate(['/allocation-details']);
                } else if (data['allocation'].status == 200) {
                    this.request = data['request'] as IBorrowReturnRequest;
                    this.form.patchValue(this.request as any);
                    this.form.patchValue({
                        assetAllocationFrom: formatDate(this.request.assetAllocationFrom as Date, "yyyy-MM-dd", "en"),
                        assetAllocationTill: formatDate(this.request.assetAllocationTill as Date, "yyyy-MM-dd", "en")
                    });
                }
                else {
                    this.messageService.add({ key: 'error', severity: 'error', summary: 'Error', detail: data['allocation'].error.statusText });
                }
            },
            error: (error) => { console.log("Error: " + error) }
        });
    }

    validateDateRange() {
        return this.form.hasError('dateRange');
    }

    updateRequest() {
        if (!this.form.valid) {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please fill in all required fields.' });
        } else {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Request Update Successful! Redirecting...', life: 2000 });
            // this.borrowReturnRequestService.updateBorrowReturnRequest(this.activatedRoute.snapshot.params['id'], {requestID:this.request.requestID, ...this.form.getRawValue() }).subscribe({
            //     next: data => {
            //         if (data.status == 200) {
            //             this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Request Update Successful! Redirecting...', life: 2000 });
            //             setTimeout(() => this.router.navigate(['/asset-borrow-return-requests']), 2000);
            //         } else {
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
