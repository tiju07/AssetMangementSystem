import { Component, OnInit } from '@angular/core';
import { IBorrowReturnRequest } from '../interfaces/iborrowreturnrequest';
import { BorrowReturnRequestsService } from '../services/borrow-return-requests/borrow-return-requests.service';
import { Router } from '@angular/router';
import { Column } from '../interfaces/column';




@Component({
    selector: 'app-asset-borrow-return-requests',
    templateUrl: './asset-borrow-return-requests.component.html',
    styleUrl: './asset-borrow-return-requests.component.css'
})
export class AssetBorrowReturnRequestsComponent implements OnInit {
    constructor(private borrowReturnRequestService: BorrowReturnRequestsService, private router: Router) { }

    requests!: IBorrowReturnRequest[];
    cols!: Column[];
    selectedRequest!: IBorrowReturnRequest;

    ngOnInit(): void {
        this.borrowReturnRequestService.getAllBorrowReturnRequests().subscribe((data) => {
            this.requests = data.body as IBorrowReturnRequest[];
        })
        this.cols = [
            { field: 'requestID', header: 'Request ID' },
            { field: 'employeeID', header: 'Employee ID' },
            { field: 'adminID', header: 'Admin ID' },
            { field: 'assetID', header: 'Asset ID' },
            { field: 'assetRequestType', header: 'Asset Request Type' },
            { field: 'assetAllocationFrom', header: 'Asset Allocation From' },
            { field: 'assetAllocationTill', header: 'Asset Allocation Till' },
            { field: 'assetCount', header: 'Asset Count' },
            { field: 'requestDetails', header: 'Request Details' },
        ]
    }

    onRowSelect() {
        this.router.navigate(['/asset-borrow-return-requests', 'view', this.selectedRequest.requestID]);
    }
}
