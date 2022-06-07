import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appDynamicLoading]'
})
export class DynamicLoadingDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
