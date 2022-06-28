import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { CustomEncoder } from '../shared/custom-encoder';
import { ForgotPasswordDto } from '../_models/forgotPasswordDto.model';
import { ResetPasswordDto } from '../_models/resetPasswordDto.model';
import { UpdateEmailDto } from '../_models/updateEmailDto.model';
import { UpdatePasswordDto } from '../_models/updatePasswordDto.model';
import { UpdateProfileDetailesDto } from '../_models/updateProfileDetailesDto.model';
import { User } from '../_models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = environment.apiUrl;
  private currentUserSource = new ReplaySubject<User>(1);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(
    private http: HttpClient
  ) { }

  register(model: any) {
    return this.http.post(this.baseUrl + 'account/register', model).pipe(
      map((user: User | any) => {
        if(user) {
          this.setCurrentUser(user);
        }
      })
    )
  }

  login (model: any) {
    return this.http.post(this.baseUrl + 'account/login', model).pipe(
      map((response: User | any) => {
        const user = response;
        if(user) {
          this.setCurrentUser(user);
        }
      })
    )
  }

  setCurrentUser(user: User) {
    user.roles = [];
    const roles = this.getDecodedToken(user.token).role;
    Array.isArray(roles) ? user.roles = roles : user.roles.push(roles);
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSource.next(user);
  }

  updateCurrentUsersProfileDetailes(updateProfileDetailesDto: UpdateProfileDetailesDto) {
    const user: User = JSON.parse(localStorage.getItem('user') as string);

    user.username = updateProfileDetailesDto.username;
    user.firstName = updateProfileDetailesDto.firstName;
    user.lastName = updateProfileDetailesDto.lastName;
    user.gender = updateProfileDetailesDto.gender;
    user.country = updateProfileDetailesDto.country;
    
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSource.next(user);
  }

  signout() {
    localStorage.removeItem('user');
    this.currentUserSource.next(null as any);
  }

  confirmEmail(token: string, email: string) {
    let params = new HttpParams({encoder: new CustomEncoder()})
    params = params.append('token', token);
    params = params.append('email', email);
    return this.http.get(this.baseUrl + 'account/email-confirmation', { params: params});
  }

  resendConfirmEmail() {
    return this.http.get(this.baseUrl + 'account/resend-email-confirmation');
  }

  forgotPassword(forgotPasswordDto: ForgotPasswordDto) {
    return this.http.post(this.baseUrl + 'account/forgot-password', forgotPasswordDto);
  }

  resetPassword(resetPasswordDto: ResetPasswordDto) {
    return this.http.post(this.baseUrl + 'account/reset-password', resetPasswordDto);
  }

  updatePassword(updatePasswordDto: UpdatePasswordDto) {
    return this.http.post(this.baseUrl + 'account/update-user-password', updatePasswordDto);
  }

  updateCustomerId(customerId: string) {
    let params = new HttpParams();
    params = params.set('customerId', customerId);    
    return this.http.post(this.baseUrl + 'Users/UpdateCustomerId', params);
  }

  updateUserEmail(updateEmailDto: UpdateEmailDto) {
    return this.http.post(this.baseUrl + 'Account/update-user-email', updateEmailDto);
  }

  updateProfileDetailes(updateProfileDetailesDto: UpdateProfileDetailesDto) {
    const user: User = JSON.parse(localStorage.getItem('user') as string);
    updateProfileDetailesDto.id = user.id;
    return this.http.post(this.baseUrl + 'Users/UpdateProfileDetailes', updateProfileDetailesDto);
  }










  getDecodedToken(token: string) {
    return JSON.parse(atob(token.split('.')[1]));
  }
}
