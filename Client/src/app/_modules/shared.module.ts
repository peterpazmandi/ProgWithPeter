import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ModalModule } from "ngx-bootstrap/modal";
import { ToastrModule } from "ngx-toastr";

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        ModalModule.forRoot(),
        ToastrModule.forRoot({
            positionClass: "toast-top-center"
        })
    ],
    exports: [
        ModalModule
    ]
})
export class SharedModule {}