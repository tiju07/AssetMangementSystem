import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAuditRequest } from '../../interfaces/iauditrequest';
import { JwtDecryptorService } from '../../helpers/jwt-decryptor.service';

@Injectable({
    providedIn: 'root'
})
export class AuditRequestsService {

    constructor(private http: HttpClient, private jwtService: JwtDecryptorService) { }

    getAllAuditRequests() {
        const role = this.jwtService.getRole();
        if (role == 'Admin') {
            return this.http.get<IAuditRequest[]>('http://localhost:7234/api/v1/AuditReportRequests', { withCredentials: true });
        } else {
            return this.http.get<IAuditRequest[]>('http://localhost:7234/api/v1/AuditReportRequests/Employee/' + this.jwtService.getUserData().id, { withCredentials: true })
        }
    }

    getAuditRequestByID(id: number) {
        return this.http.get<IAuditRequest>('http://localhost:7234/api/v1/AuditReportRequests/' + id, { withCredentials: true, observe: 'response' });
    }

    createAuditRequest(auditRequest: IAuditRequest) {
        return this.http.post<any>('http://localhost:7234/api/v1/AuditReportRequests', auditRequest, { withCredentials: true, observe: 'response' });
    }

    updateAuditRequest(id: number, auditRequest: IAuditRequest) {
        return this.http.put<any>('http://localhost:7234/api/v1/AuditReportRequests/' + id, auditRequest, { withCredentials: true, observe: 'response' });
    }
}