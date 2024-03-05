import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, Validators } from '@angular/forms';
import { IAsset } from '../../interfaces/iasset';
import { MessageService } from 'primeng/api';
import { AssetService } from '../../services/asset-catalogue/asset.service';
import { BorrowReturnRequestsService } from '../../services/borrow-return-requests/borrow-return-requests.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-create-asset-borrow-return-request',
    templateUrl: './create-asset-borrow-return-request.component.html',
    styleUrl: './create-asset-borrow-return-request.component.css',
})
export class CreateAssetBorrowReturnRequestComponent implements OnInit {
    constructor(private fb: FormBuilder, private messageService: MessageService, private router: Router, private assetService: AssetService, private borrowReturnRequestService: BorrowReturnRequestsService) { }

    assets!: IAsset[];
    requestTypes = ['Borrow', 'Return'];

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
        assetAllocationFrom: new FormControl(null, [Validators.required]),
        assetAllocationTill: new FormControl(null, [Validators.required]),
        assetCount: new FormControl(null, [Validators.required, Validators.min(1)]),
        requestDetails: new FormControl(null)
    }, { validators: this.dateRangeValidator });

    ngOnInit(): void {
        this.assetService.getAllAssets().subscribe(data => this.assets = data as IAsset[]);
    }


    validateDateRange() {
        return this.form.get('assetAllocationFrom')?.dirty && this.form.get('assetAllocationTill')?.dirty &&
            this.form.hasError('dateRange');
    }

    createRequest() {
        if (!this.form.valid) {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please fill in all required fields!', life: 4000 });
        }
        else {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Request Creation Successful! Redirecting...', life: 2000 });
            // this.borrowReturnRequestService.createBorrowReturnRequest({ requestID: 0, ...this.form.getRawValue() }).subscribe({
            //     next: data => {
            //         if (data.status == 201) {
            //             this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Request Creation Successful! Redirecting...', life: 2000 });
            //             setTimeout(() => this.router.navigate(['/asset-borrow-return-requests']), 2000);
            //         } else {
            //             this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed Creating Request!' });
            //         }
            //     },
            //     error: err => {
            //         this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed Creating Request!' });
            //         console.log(err);
            //     }
            // })
        }
    }
}
