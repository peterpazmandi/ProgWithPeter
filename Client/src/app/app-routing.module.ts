import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { UpsertPostComponent } from "./post/upsert-post/upsert-post.component";
import { UpsertTutorialListComponent } from "./tutorial/upsert-tutorial-list/upsert-tutorial-list.component";
import { TutorialComponent } from "./tutorial/tutorial/tutorial.component";
import { AuthGuard } from "./_guards/auth.guard";
import { PreventUnsavedChangesGuard } from "./_guards/prevent-unsaved-changes.guard";
import { UpsertCourseListComponent } from "./course/upsert-course-list/upsert-course-list.component";
import { CourseComponent } from "./course/course/course.component";

const routes: Routes = [
    { path: '', component: HomeComponent },
    { 
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        children: [
            { path: 'tutorial-list', component: UpsertTutorialListComponent},
            { path: 'upsert-post', component: UpsertPostComponent, canDeactivate: [PreventUnsavedChangesGuard]},
            { path: 'course-list', component: UpsertCourseListComponent},
        ]
    },
    {
        path: 'tutorial',
        component: TutorialComponent,
        children: [
            {
                path: ':type',
                component: TutorialComponent
            }
        ]
    },
    {
        path: 'course',
        component: CourseComponent,
        children: [
            {
                path: ':type',
                component: CourseComponent
            }
        ]
    },
    { 
        path: 'authentication', 
        loadChildren: () => import('./authentication/auth-routing.module').then(m => m.AuthenticationModule)
    },
    {path: '', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [RouterModule],
    providers: [AuthGuard]
})
export class AppRoutingModule {}