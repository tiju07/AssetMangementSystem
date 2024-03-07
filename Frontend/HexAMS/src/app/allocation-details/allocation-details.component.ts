import { Component, OnInit } from '@angular/core';
import { IAllocation } from '../interfaces/iallocationdetails';
import { AllocationDetailsService } from '../services/allocation-details/allocation-details.service';
import { ActivatedRoute, Router } from '@angular/router';

interface Column {
    field: string;
    header: string;
}

@Component({
    selector: 'app-allocation-details',
    templateUrl: './allocation-details.component.html',
    styleUrl: './allocation-details.component.css'
})
export class AllocationDetailsComponent implements OnInit {

    constructor(private allocationService: AllocationDetailsService, private router: Router, private activatedRoute: ActivatedRoute) { }

    allocationDetails!: IAllocation[];
    cols!: Column[];
    selectedAllocation!: IAllocation;

    ngOnInit(): void {

        this.activatedRoute.data.subscribe(data => {
            this.allocationDetails = data['allocations'] as any;
        })
        this.cols = [
            { field: 'assetAllocationID', header: 'Allocation ID' },
            { field: 'employeeID', header: 'Employee ID' },
            { field: 'assetID', header: 'Asset ID' },
            { field: 'assetCount', header: 'Asset Count' },
            { field: 'allocationDetails', header: 'Allocation Details' },
            { field: 'assetAllocatedFrom', header: 'Allocated From' },
            { field: 'assetAllocatedTill', header: 'Allocated Till' },
            { field: 'allocationStatus', header: 'Allocation Status' }
        ]
    }

    onRowSelect() {
        this.router.navigate(['/allocation-details', 'view', this.selectedAllocation.assetAllocationID]);
    }
}
