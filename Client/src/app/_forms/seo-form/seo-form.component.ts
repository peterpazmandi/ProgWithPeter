import { ChangeDetectionStrategy, Component, Input, OnInit, Self } from '@angular/core';
import { AbstractControl, FormBuilder, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { functionWords } from 'src/app/shared/global-variables';
import { SeoFormService } from './seo-form.service';

@Component({
  selector: 'seo-form',
  templateUrl: './seo-form.component.html',
  styleUrls: ['./seo-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SeoFormComponent implements OnInit {
  //@Input() seoForm: FormGroup;
  @Input() textWordCount: number = 0;
  @Input() internalLinkCount: number = 0;
  @Input() externalLinkCount: number = 0;
  metaDescLength: number = 0;
  keyPhraseContentWords: string[] = [];

  get seoF() { return this.seoFormService.seoForm.controls; }

  constructor(
    public seoFormService: SeoFormService,
    private fb: FormBuilder
    ) { }

  ngOnInit(): void {
    this.initializeForms();
  }

  private initializeForms() {
    this.seoFormService.seoForm = this.fb.group({
      focusKeyphrase: ['', [Validators.required, this.focusKeyPhraseValidation()]],
      seoTitle: ['', [Validators.required, this.fieldStartsWithFocusKeyphrase()]],
      slug: ['', [Validators.required]],
      metaDescription: ['', [Validators.required, this.fieldContainsFocusKeyphrase(), this.metaDescriptionLength()]]
    })

    this.seoFormService.seoForm.get('focusKeyphrase')?.valueChanges.subscribe((value: string) => {
      this.updateSlug(value);
    });
  }

  updateSlug(value: string) {
    let re = /\ /gi;
    var slug = value.replace(re, '-');
    this.seoFormService.seoForm.patchValue({
      slug: slug.toLocaleLowerCase()
    })
  }


  // Custom validators
  focusKeyPhraseValidation(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      var focusKeyPhrase = control.value;
      var splitted: string[] = focusKeyPhrase.split(" ");

      // Remove last item, if length is zero
      splitted = splitted.filter(item => item.length !== 0);
      
      // Remove function words
      splitted = splitted.filter(item => !functionWords.includes(item.toLowerCase()));

      this.keyPhraseContentWords = splitted;

      return splitted.length > 3 && splitted.length < 7 ? null : {strongEnough: true};
    };
  }
  fieldStartsWithFocusKeyphrase(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {

      var fieldContent = (control.value as string).toLocaleLowerCase();
      var focusKeyPhrase = (this.seoFormService.seoForm?.value['focusKeyphrase'] as string)?.toLocaleLowerCase();

      if(fieldContent.length === 0 || focusKeyPhrase.length === 0) {
        return {startsWithFocusKeyphrase: true};
      }

      return fieldContent.startsWith(focusKeyPhrase, 0) ? null : {startsWithFocusKeyphrase: true};
    };
  }
  fieldContainsFocusKeyphrase(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {

      var fieldContent = (control.value as string).toLocaleLowerCase();
      var focusKeyPhrase = (this.seoFormService.seoForm?.value['focusKeyphrase'] as string)?.toLocaleLowerCase();

      if(fieldContent.length === 0 || focusKeyPhrase.length === 0) {
        return {containsFocusKeyphrase: true};
      }

      return fieldContent.includes(focusKeyPhrase, 0) ? null : {containsFocusKeyphrase: true};
    };
  }
  metaDescriptionLength(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {

      var metaDesc = control.value as string;
      this.metaDescLength = metaDesc.length;

      return metaDesc.length > 119 && metaDesc.length < 157 ? null : {metaDescriptionLength: true};
    };
  }
}
