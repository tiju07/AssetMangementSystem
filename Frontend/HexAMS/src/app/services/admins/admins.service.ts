import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUserProfile } from '../../interfaces/iuserprofile';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AdminsService {

    constructor(private http: HttpClient) { }

    url = environment.apiUrl;

    getAdminByID(id: number) {
        return this.http.get(`${this.url}/Admins/` + id, { withCredentials: true, observe: 'response' })
    }

    getAccountsWithPendingAccess() {
        return this.http.get(`${this.url}/Admins/GetAccountsWithPendingAccess`, { withCredentials: true, observe: 'response' })
    }

    updateAdmin(id: number, admin: IUserProfile) {
        return this.http.put<any>(`${this.url}/Admins/` + id, admin, { withCredentials: true, observe: 'response' })
    }

    allowAccess(id: number) {
        return this.http.post<any>(`${this.url}/Admins/AllowAdminAccess/${id}`, {}, { withCredentials: true, observe: 'response' })
    }

    denyAccess(id: number) {
        return this.http.delete<any>(`${this.url}/Admins/${id}`, { withCredentials: true, observe: 'response' })
    }
}
