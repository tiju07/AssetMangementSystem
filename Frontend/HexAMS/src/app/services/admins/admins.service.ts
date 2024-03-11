import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUserProfile } from '../../interfaces/iuserprofile';

@Injectable({
    providedIn: 'root'
})
export class AdminsService {

    constructor(private http: HttpClient) { }

    getAdminByID(id: number) {
        return this.http.get('http://localhost:7234/api/v1/Admins/' + id, { withCredentials: true, observe: 'response' })
    }

    updateAdmin(id: number, admin: IUserProfile) {
        return this.http.put<any>('http://localhost:7234/api/v1/Admins/' + id, admin, { withCredentials: true, observe: 'response' })
    }
}
