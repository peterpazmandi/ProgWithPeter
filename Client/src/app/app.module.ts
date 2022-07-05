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
import { FileSelectorComponent } from './_forms/file-selector/file-selector.component';
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
import { TocComponent } from './_forms/toc/toc.component';
import { CourseComponent } from './course/course/course.component';
import { ByPassSecurityPipe } from './_pipes/by-pass-security.pipe';
import { AccordionModule } from './_forms/accordion/accordion.module';
import { CourseContentComponent } from './course/course/course-content/course-content.component';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { UpsertLectureListComponent } from './lecture/upsert-lecture-list/upsert-lecture-list.component';
import { UpsertCategoriesComponent } from './category/upsert-categories/upsert-categories.component';
import { CategoryBrowserComponent } from './category/category-browser/category-browser.component';
import { CategoryBrowserListItemComponent } from './category/category-browser/category-browser-list-item/category-browser-list-item.component';
import { UpsertCategoryComponent } from './category/upsert-category/upsert-category.component';
import { UpsertTagListComponent } from './tags/upsert-tag-list/upsert-tag-list.component';
import { UpsertTagListItemComponent } from './tags/upsert-tag-list/upsert-tag-list-item/upsert-tag-list-item.component';
import { UpsertTagModalComponent } from './tags/upsert-tag-list/upsert-tag-modal/upsert-tag-modal.component';
import { PricingComponent } from './pricing/pricing/pricing.component';
import { NgToggleModule } from 'ng-toggle-button';
import { CheckoutComponent } from './pricing/checkout/checkout.component';
import { PaymentSuccessComponent } from './pricing/payment-success/payment-success.component';
import { PaymentFailedComponent } from './pricing/payment-failed/payment-failed.component';
import { SourceCodeComponent } from './_forms/source-code/source-code.component';
import { ProfileComponent } from './profile/profile.component';
import { ProfileDetailsComponent } from './profile/profile-details/profile-details.component';
import { MembershipComponent } from './profile/membership/membership.component';
import { DynamicLoadingDirective } from './_directives/dynamic-loading.directive';
import { EditProfileComponent } from './profile/profile-details/edit-profile/edit-profile.component';
import { UpdateEmialComponent } from './authentication/update-emial/update-emial.component';
import { UpdatePasswordComponent } from './authentication/update-password/update-password.component';
import { YourCourseListItemComponent } from './profile/courses/course-list-item/your-course-list-item.component';
import { YourCoursesComponent } from './profile/courses/your-courses.component';

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
    FileSelectorComponent,
    InputCkeditorComponent,
    SeoFormComponent,
    UpsertContentListComponent,
    UpsertContentListItemComponent,
    UpsertCourseListComponent,
    UpsertSectionsAndLecturesComponent,
    UpsertSectionsAndLecturesListComponent,
    FindLectureByTitleComponent,
    CourseItemComponent,
    TocComponent,
    CourseComponent,
    ByPassSecurityPipe,
    CourseContentComponent,
    UpsertLectureListComponent,
    UpsertCategoriesComponent,
    CategoryBrowserComponent,
    CategoryBrowserListItemComponent,
    UpsertCategoryComponent,
    UpsertTagListComponent,
    UpsertTagListItemComponent,
    UpsertTagModalComponent,
    PricingComponent,
    CheckoutComponent,
    PaymentSuccessComponent,
    PaymentFailedComponent,
    SourceCodeComponent,
    ProfileComponent,
    ProfileDetailsComponent,
    MembershipComponent,
    DynamicLoadingDirective,
    EditProfileComponent,
    UpdateEmialComponent,
    UpdatePasswordComponent,
    YourCoursesComponent,
    YourCourseListItemComponent
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
    DragDropModule,
    AccordionModule,
    NgCircleProgressModule.forRoot({
      // set defaults here
      radius: 100,
      outerStrokeWidth: 16,
      outerStrokeColor: "#78C000",
      animationDuration: 300
    }),
    NgToggleModule.forRoot()
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
