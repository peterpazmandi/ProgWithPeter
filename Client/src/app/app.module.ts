import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './_modules/shared.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ThemeModule } from './_theme/theme.module';
import { lightTheme } from './_theme/light-theme';
import { darkTheme } from './_theme/dark-theme';
import { TextInputComponent } from './_forms/text-input/text-input.component';
import { DateInputComponent } from './_forms/date-input/date-input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './authentication/register/register.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInterceptor } from './_interceptors/error.interceptor';
import { LoadingInterceptor } from './_interceptors/loading.interceptor';
import { EmailConfirmationComponent } from './authentication/email-confirmation/email-confirmation.component';
import { JwtModule } from '@auth0/angular-jwt';
import { JwtInterceptor } from './_interceptors/jwt.interceptor';
import { LoginComponent } from './authentication/login/login.component';
import { ForgotPasswordComponent } from './authentication/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './authentication/reset-password/reset-password.component';
import { HasRoleDirective } from './_directives/has-role.directive';
import { UpsertTutorialListComponent } from './tutorial/upsert-tutorial-list/upsert-tutorial-list.component';
import { UpsertPostComponent } from './post/upsert-post/upsert-post.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { TreeviewModule } from 'ngx-treeview';
import { DropdownTreeviewSelectComponent } from './_forms/dropdown-treeview-select/dropdown-treeview-select.component';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { SocialMediaIconsComponent } from './home/social-media-icons/social-media-icons.component';
import { CoursesComponent } from './home/courses/courses.component';
import { TutorialsComponent } from './home/tutorials/tutorials.component';
import { FooterComponent } from './footer/footer.component';
import { FileUploadModule } from 'ng2-file-upload';
import { TutorialsItemComponent } from './home/tutorials/tutorial-item/tutorial-item.component';
import { TagItemComponent } from './tags/tag-item/tag-item.component';
import { TutorialComponent } from './tutorial/tutorial/tutorial.component';
import { PostComponent } from './post/post/post.component';
import { DomChangedDirective } from './_directives/dom-changed.directive';
import { ConfirmDialogComponent } from './modals/confirm-dialog/confirm-dialog.component';
import { TagSelectorComponent } from './_forms/tag-selector/tag-selector.component';
import { CategorySelectorComponent } from './_forms/category-selector/category-selector.component';
import { ImageSelectorComponent } from './_forms/image-selector/image-selector.component';
import { InputCkeditorComponent } from './_forms/input-ckeditor/input-ckeditor.component';
import { SeoFormComponent } from './_forms/seo-form/seo-form.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { UpsertContentListComponent } from './_forms/lists/upsert-content-list/upsert-content-list.component';
import { UpsertContentListItemComponent } from './_forms/lists/upsert-content-list/upsert-content-list-item/upsert-content-list-item.component';
import { UpsertCourseListComponent } from './course/upsert-course-list/upsert-course-list.component';
import { DragDropModule } from "@angular/cdk/drag-drop";
import { UpsertSectionsAndLecturesComponent } from './section/upsert-sections-and-lectures/upsert-sections-and-lectures.component';
import { UpsertSectionsAndLecturesListComponent } from './section/upsert-sections-and-lectures-list/upsert-sections-and-lectures-list.component';
import { FindLectureByTitleComponent } from './lecture/find-lecture-by-title/find-lecture-by-title.component';
import { CourseItemComponent } from './home/courses/course-item/course-item.component';

export function tokenGetter() {
  return localStorage.getItem("token");
}

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    TextInputComponent,
    DateInputComponent,
    RegisterComponent,
    EmailConfirmationComponent,
    LoginComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    HasRoleDirective,
    UpsertTutorialListComponent,
    UpsertPostComponent,
    DropdownTreeviewSelectComponent,
    SocialMediaIconsComponent,
    CoursesComponent,
    TutorialsComponent,
    FooterComponent,
    TutorialsItemComponent,
    TagItemComponent,
    TutorialComponent,
    PostComponent,
    DomChangedDirective,
    ConfirmDialogComponent,
    TagSelectorComponent,
    CategorySelectorComponent,
    ImageSelectorComponent,
    InputCkeditorComponent,
    SeoFormComponent,
    UpsertContentListComponent,
    UpsertContentListItemComponent,
    UpsertCourseListComponent,
    UpsertSectionsAndLecturesComponent,
    UpsertSectionsAndLecturesListComponent,
    FindLectureByTitleComponent,
    CourseItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    NgxSpinnerModule,
    ThemeModule.forRoot({
      themes: [lightTheme, darkTheme],
      active: 'light'
    }),
    BsDatepickerModule.forRoot(),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["localhost:5001"],
        disallowedRoutes : []
      }
    }),
    CKEditorModule,
    TreeviewModule.forRoot(),
    AutocompleteLibModule,
    FileUploadModule,
    TabsModule.forRoot(),
    DragDropModule
  ],
  exports: [
    FileUploadModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
