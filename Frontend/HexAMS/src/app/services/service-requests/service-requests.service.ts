import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IServiceRequest } from '../../interfaces/iservicerequest';

@Injectable({
    providedIn: 'root'
})
export class ServiceRequestsService {

    constructor(private http: HttpClient) { }

    getAllServiceRequests() {
        return this.http.get<IServiceRequest[]>('http://localhost:7234/api/v1/AssetServiceRequests', { withCredentials: true })
    }

    getServiceRequestByID(id: number) {
        return this.http.get<IServiceRequest>('http://localhost:7234/api/v1/AssetServiceRequests/' + id, { withCredentials: true })
    }

    createServiceRequest(serviceRequest: IServiceRequest) {
        return this.http.post<any>('http://localhost:7234/api/v1/AssetServiceRequests', serviceRequest, { withCredentials: true, observe: 'response' })
    }

    updateServiceRequest(id: number | null, serviceRequest: IServiceRequest) {
        return this.http.put<any>('http://localhost:7234/api/v1/AssetServiceRequests/' + id, serviceRequest, { withCredentials: true, observe: 'response' })
    }
}
