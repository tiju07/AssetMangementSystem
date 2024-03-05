import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IBorrowReturnRequest } from '../../interfaces/iborrowreturnrequest';

@Injectable({
    providedIn: 'root'
})
export class BorrowReturnRequestsService {

    constructor(private http: HttpClient) { }

    getAllBorrowReturnRequests() {
        return this.http.get<IBorrowReturnRequest[]>('http://localhost:7234/api/v1/AssetBorrowReturnRequests', { withCredentials: true, observe: 'response' });
    }

    getBorrowReturnRequestByID(id: number) {
        return this.http.get<IBorrowReturnRequest>('http://localhost:7234/api/v1/AssetBorrowReturnRequests/' + id, { withCredentials: true, observe: 'response' });
    }

    createBorrowReturnRequest(borrowReturnRequest: IBorrowReturnRequest) {
        return this.http.post<any>('http://localhost:7234/api/v1/AssetBorrowReturnRequests', borrowReturnRequest, { withCredentials: true, observe: 'response' });
    }

    updateBorrowReturnRequest(id: number, borrowReturnRequest: IBorrowReturnRequest) {
        return this.http.put<any>('http://localhost:7234/api/v1/AssetBorrowReturnRequests/' + id, borrowReturnRequest, { withCredentials: true, observe: 'response' });
    }
}
