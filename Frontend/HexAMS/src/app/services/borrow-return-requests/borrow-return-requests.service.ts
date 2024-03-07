import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IBorrowReturnRequest } from '../../interfaces/iborrowreturnrequest';
import { JwtDecryptorService } from '../../helpers/jwt-decryptor.service';

@Injectable({
    providedIn: 'root'
})
export class BorrowReturnRequestsService {

    constructor(private http: HttpClient, private jwtService: JwtDecryptorService) { }

    getAllBorrowReturnRequests() {
        const role = this.jwtService.getRole();
        if (role == 'Admin') {
            return this.http.get<IBorrowReturnRequest[]>('http://localhost:7234/api/v1/AssetBorrowReturnRequests', { withCredentials: true });
        }
        else {
            return this.http.get<IBorrowReturnRequest[]>('http://localhost:7234/api/v1/AssetBorrowReturnRequests/Employee/' + this.jwtService.getUserData().id, { withCredentials: true })
        }
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
