import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanDeactivate, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { UpsertTutorialComponent } from "../tutorial/upsert-tutorial/upsert-tutorial.component";
import { ConfirmService } from "../_services/confirm.service";

@Injectable({
    providedIn: 'root'
})
export class PreventUnsavedChangesGuard implements CanDeactivate<unknown> {

    constructor(private confirmService: ConfirmService) {}



    canDeactivate(component: UpsertTutorialComponent): boolean | Observable<boolean> {
        if(component.createTutorialForm.dirty
            || component.formTextForm.dirty ||
            component.seoForm.dirty) {
                return this.confirmService.confirm();
        }

        return true;
    }
    

    

}