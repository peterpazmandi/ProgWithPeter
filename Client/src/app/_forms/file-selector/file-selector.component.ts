import { Component, Input, OnInit, Self } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { FileUploader } from 'ng2-file-upload';
import { User } from 'src/app/_models/user.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'file-selector',
  templateUrl: './file-selector.component.html',
  styleUrls: ['./file-selector.component.css']
})
export class FileSelectorComponent implements OnInit, ControlValueAccessor {
  @Input() user: User;
  @Input() allowedFileType: string;
  @Input() endpoint: string;

  apiUrl = environment.apiUrl;
  serverUrl = environment.serverUrl;
  uploader: FileUploader;
  featuredImageUrl: string = '';

  constructor(@Self() public ngControl: NgControl) {
    this.ngControl.valueAccessor = this;
   }

  ngOnInit(): void {
    var sub = this.ngControl.valueChanges?.subscribe(featuredImageUrl => {
      this.featuredImageUrl = featuredImageUrl;

      sub?.unsubscribe();
    })
      
    this.initFileUploader();
  }

  writeValue(obj: any): void { }
  registerOnChange(fn: any): void { }
  registerOnTouched(fn: any): void { }


  private initFileUploader() {
    this.uploader = new FileUploader({
      url: this.apiUrl + this.endpoint,
      authToken: 'Bearer ' + this.user?.token,
      isHTML5: true,
      allowedFileType: [this.allowedFileType],
      removeAfterUpload: true,
      autoUpload: false
    });
 
    this.uploader.onSuccessItem = (item, response: any, status, headers) => {
      if(response) {
        this.featuredImageUrl = this.serverUrl + response;
        this.ngControl?.control?.setValue(this.featuredImageUrl);
        this.ngControl?.control?.markAsDirty();
      }
    }
  }
}
