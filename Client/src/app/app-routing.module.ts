import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { AuthGuard } from "./_guards/auth.guard";

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'authentication', loadChildren: () => import('./authentication/auth-routing.module').then(m => m.AuthenticationModule)}
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {}