import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EmailConfirmationComponent } from './email-confirmation/email-confirmation.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { AuthGuard } from '../_guards/auth.guard';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: 'emailconfirmation', component: EmailConfirmationComponent},
      { 
        path: 'resetpassword',
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        component: ResetPasswordComponent }
    ])
  ]
})
export class AuthenticationModule { }
