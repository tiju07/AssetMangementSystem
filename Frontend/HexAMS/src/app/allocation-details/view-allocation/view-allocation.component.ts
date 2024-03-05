import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AllocationDetailsService } from '../../services/allocation-details/allocation-details.service';
import { IAllocation } from '../../interfaces/iallocationdetails';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-view-allocation',
    templateUrl: './view-allocation.component.html',
    styleUrl: './view-allocation.component.css'
})
export class ViewAllocationComponent implements OnInit {

    constructor(private http: HttpClient, private allocationService: AllocationDetailsService, private activatedRoute: ActivatedRoute) { }

    allocation!: IAllocation;

    ngOnInit(): void {
        this.allocationService.getAllocationDetailByID(this.activatedRoute.snapshot.params['id']).subscribe((data) => this.allocation = data.body as IAllocation);
    }
}
