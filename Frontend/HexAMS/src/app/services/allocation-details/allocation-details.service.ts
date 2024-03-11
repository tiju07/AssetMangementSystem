import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAllocation } from '../../interfaces/iallocationdetails';
import { JwtDecryptorService } from '../../helpers/jwt-decryptor.service';

@Injectable({
    providedIn: 'root'
})
export class AllocationDetailsService {
    getAllocationDetailsByEmployee(employeeID: number) {
        return this.http.get<IAllocation[]>('http://localhost:7234/api/v1/AllocationDetails/Employee/' + employeeID, { withCredentials: true, observe: 'response' })
    }

    constructor(private http: HttpClient, private jwtService: JwtDecryptorService) { }

    getAllAllocationDetails() {
        const role = this.jwtService.getRole();
        if (role == 'Admin') {
            return this.http.get<IAllocation[]>('http://localhost:7234/api/v1/AllocationDetails', { withCredentials: true })
        }
        else {
            return this.http.get<IAllocation[]>('http://localhost:7234/api/v1/AllocationDetails/Employee/' + this.jwtService.getUserData().id, { withCredentials: true })
        }
    }

    getAllocationDetailByID(id: number) {
        return this.http.get<HttpResponse<any>>('http://localhost:7234/api/v1/AllocationDetails/' + id, { withCredentials: true, observe: 'response' })

    }

    createAllocation(allocationDetail: IAllocation) {
        return this.http.post<HttpResponse<any>>('http://localhost:7234/api/v1/AllocationDetails', allocationDetail, { withCredentials: true, observe: 'response' })
    }

    updateAllocation(id: number | null, allocationDetail: IAllocation) {
        return this.http.put<HttpResponse<any>>('http://localhost:7234/api/v1/AllocationDetails/' + id, allocationDetail, { withCredentials: true, observe: 'response' })
    }
}
