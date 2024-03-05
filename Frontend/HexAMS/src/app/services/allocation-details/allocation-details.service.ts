import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAllocation } from '../../interfaces/iallocationdetails';

@Injectable({
    providedIn: 'root'
})
export class AllocationDetailsService {

    constructor(private http: HttpClient) { }

    getAllAllocationDetails() {
        return this.http.get<IAllocation[]>('http://localhost:7234/api/v1/AllocationDetails', { withCredentials: true, observe: 'response' })
    }

    getAllocationDetailByID(id: number) {
        return this.http.get<IAllocation>('http://localhost:7234/api/v1/AllocationDetails/' + id, { withCredentials: true, observe: 'response' })
    }

    createAllocation(allocationDetail: IAllocation) {
        return this.http.post<HttpResponse<any>>('http://localhost:7234/api/v1/AllocationDetails', allocationDetail, { withCredentials: true, observe: 'response' })
    }

    updateAllocation(id: number | null, allocationDetail: IAllocation) {
        return this.http.put<HttpResponse<any>>('http://localhost:7234/api/v1/AllocationDetails/' + id, allocationDetail, { withCredentials: true, observe: 'response' })
    }
}
