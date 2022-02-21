import { Injectable } from "@angular/core";
import { CanDeactivate } from "@angular/router";
import { Observable } from "rxjs";
import { UpsertPostComponent } from "../post/upsert-post/upsert-post.component";
import { ConfirmService } from "../_services/confirm.service";

@Injectable({
    providedIn: 'root'
})
export class PreventUnsavedChangesGuard implements CanDeactivate<unknown> {

    constructor(private confirmService: ConfirmService) {}



    canDeactivate(component: UpsertPostComponent): boolean | Observable<boolean> {
        if(component.createPostForm.dirty
            || component.formTextForm.dirty ||
            component.seoFormService.seoForm.dirty ||
            component.sectionsAndLecturesFormService.sectionsAndLecturesFrom.dirty) {
                return this.confirmService.confirm();
        }

        return true;
    }
    

    

}