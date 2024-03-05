import { Component, OnInit } from '@angular/core';
import { BorrowReturnRequestsService } from '../../services/borrow-return-requests/borrow-return-requests.service';
import { IBorrowReturnRequest } from '../../interfaces/iborrowreturnrequest';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-view-asset-borrow-return-request',
    templateUrl: './view-asset-borrow-return-request.component.html',
    styleUrl: './view-asset-borrow-return-request.component.css'
})
export class ViewAssetBorrowReturnRequestComponent implements OnInit {

    constructor(private borrowReturnRequestService: BorrowReturnRequestsService, private activatedRoute: ActivatedRoute) { }

    request!: IBorrowReturnRequest;

    ngOnInit(): void {
        this.borrowReturnRequestService.getBorrowReturnRequestByID(this.activatedRoute.snapshot.params['id'])
            .subscribe(data => {
                this.request = data.body as IBorrowReturnRequest;
            })
    }
}
