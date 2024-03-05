import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAuditRequest } from '../../interfaces/iauditrequest';

@Injectable({
    providedIn: 'root'
})
export class AuditRequestsService {

    constructor(private http: HttpClient) { }

    getAllAuditRequests() {
        return this.http.get<IAuditRequest[]>('http://localhost:7234/api/v1/AuditReportRequests', { withCredentials: true });
    }

    getAuditRequestByID(id: number) {
        return this.http.get<IAuditRequest>('http://localhost:7234/api/v1/AuditReportRequests/' + id, { withCredentials: true });
    }

    createAuditRequest(auditRequest: IAuditRequest) {
        return this.http.post<any>('http://localhost:7234/api/v1/AuditReportRequests', auditRequest, { withCredentials: true, observe: 'response' });
    }

    updateAuditRequest(id: number | null, auditRequest: IAuditRequest) {
        return this.http.put<any>('http://localhost:7234/api/v1/AuditReportRequests/' + id, auditRequest, { withCredentials: true, observe: 'response' });
    }
}