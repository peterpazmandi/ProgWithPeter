import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TreeItem, TreeviewItem } from 'ngx-treeview';
import { CreatePostDto } from 'src/app/_models/createPostDto.model';
import { Tag } from 'src/app/_models/tag.model';
import { TutorialService } from 'src/app/_services/tutorial.service';
import { Status } from '../../_utils/status.enum';
import { environment } from 'src/environments/environment';
import { WORD_PER_MINUTES } from 'src/app/_utils/global.variables';
import { FileUploader } from 'ng2-file-upload';
import { UpsertTutorialDto } from 'src/app/_models/upsertTutorialDto.model';
import { AccountService } from 'src/app/_services/account.service';
import { User } from 'src/app/_models/user.model';
import { take } from 'rxjs/operators';
import { Tutorial } from 'src/app/_models/tutorialDto.model';
import { functionWords } from 'src/app/shared/global-variables';


@Component({
  selector: 'app-upsert-tutorial',
  templateUrl: './upsert-tutorial.component.html',
  styleUrls: ['./upsert-tutorial.component.css']
})
export class UpsertTutorialComponent implements OnInit {
  apiUrl = environment.apiUrl;
  serverUrl = environment.serverUrl;
  uploader:FileUploader;

  createTutorialForm: FormGroup;
  formTextForm: FormGroup;
  seoForm: FormGroup;
  textCharCount: number;
  textWordCount: number;
  internalLinkCount: number = 0;
  externalLinkCount: number = 0;
  metaDescLength: number = 0;
  submitted = false;
  keyPhraseContentWords: string[] = [];

  status: typeof Status;
  currentStatus: string;

  user: User;

  @HostListener('window:beforeunload', ['$event']) unloadNofitifaction($event: any) {
    if(this.createTutorialForm.dirty
      || this.formTextForm.dirty ||
      this.seoForm.dirty) {
        $event.returnValue = true;
      }
  }
  

  constructor(
    private accountService: AccountService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private tutorialService: TutorialService,
    private route: ActivatedRoute) {
      this.status = Status;
      this.currentStatus = this.status.NotSavedYet;
  }

  ngOnInit(): void {
    this.initializeForms();

    this.accountService.currentUser$
      .pipe(take(1))
      .subscribe(u => this.user = u);

    const slug = this.route.snapshot.queryParams['slug'];
    if(slug) {
      this.tutorialService.getTutorialByTitle(slug).subscribe(tutorial => {
        this.updateTutorialForms(tutorial);
      }, error => {
        console.log(error);
      });
    }
  }
  updateTutorialForms(tutorial: Tutorial) {
    this.currentStatus = tutorial.status;
    
    this.createTutorialForm.patchValue({
      id: tutorial.id,
      title: tutorial.post.title,
      category: new TreeviewItem({
        text: tutorial.post.category.name,
        value: tutorial.post.category.id
      } as TreeItem),
      tags: tutorial.post.tags,
      featuredImageUrl: tutorial.post.featuredImageUrl
    });  

    this.formTextForm.patchValue({
      excerpt: tutorial.post.excerpt,
      content: tutorial.post.content
    });

    this.seoForm.patchValue({
      focusKeyphrase: tutorial.post.meta.keyPhrase,
      seoTitle: tutorial.post.meta.seoTitle,
      slug: tutorial.post.meta.slug,
      metaDescription: tutorial.post.meta.metaDescription
    });
  }
  
  onUploadTutorial(status: string) {
      this.submitted = true;
      this.currentStatus = status;

      // stop here if form is invalid
      if (this.createTutorialForm.invalid) {
          return;
      }

      var tutorial = this.createTutorialDtoFromForms(status);
      console.log(tutorial);
      this.tutorialService.upsertTutorial(tutorial).subscribe((result: any) => {
        console.log(result);
        this.toastr.success(result.message);
        this.createTutorialForm.patchValue({
          id: result.tutorialId
        })

        // Undirty the forms
        this.createTutorialForm.markAsPristine();
        this.formTextForm.markAsPristine();
        this.seoForm.markAsPristine();
        
      }, error => {
        console.log(error);
      });
  }

  createTutorialDtoFromForms(status: string) {
    let tagIds: number[] = [];
    let tags: Tag[] = this.createTutorialForm?.value['tags'] as Tag[];
    for(let tag of tags) {
      tagIds.push(tag.id);
    }

    return {
      id: (this.createTutorialForm?.value['id'] as number),
      status: status,
      price: 9.9,
      currency: 'USD',
      post: {
        title: (this.createTutorialForm?.value['title'] as string),
        excerpt: (this.formTextForm?.value['excerpt'] as string),
        content: (this.formTextForm?.value['content'] as string),
        password: '',
        featuredImageUrl: (this.createTutorialForm?.value['featuredImageUrl'] as string),
        tags: tagIds,
        category: (this.createTutorialForm?.value['category'] as TreeviewItem).text,
        meta: {
          keyPhrase: (this.seoForm?.value['focusKeyphrase'] as string),
          seoTitle: (this.seoForm?.value['seoTitle'] as string),
          slug: (this.seoForm?.value['slug'] as string),
          metaDescription: (this.seoForm?.value['metaDescription'] as string),
        },
        length: this.textWordCount / WORD_PER_MINUTES
      } as CreatePostDto
    } as UpsertTutorialDto;

  }

  get createTutorialF() { return this.createTutorialForm.controls; }
  get seoF() { return this.seoForm.controls; }

  private initializeForms() {
    this.createTutorialForm = this.fb.group({
      id: [0],
      title: ['', [Validators.required, Validators.minLength(8)]],
      category: ['', [Validators.required]],
      tags: [[], [Validators.required]],
      featuredImageUrl: [[], [Validators.required]]      
    })

    this.formTextForm = this.fb.group({
      excerpt: [''],
      content: ['']
    })

    this.seoForm = this.fb.group({
      focusKeyphrase: ['', [Validators.required, this.focusKeyPhraseValidation()]],
      seoTitle: ['', [Validators.required, this.fieldStartsWithFocusKeyphrase()]],
      slug: ['', [Validators.required]],
      metaDescription: ['', [Validators.required, this.fieldContainsFocusKeyphrase(), this.metaDescriptionLength()]]
    })

    this.seoForm.get('focusKeyphrase')?.valueChanges.subscribe((value: string) => {
      this.updateSlug(value);
    });

    this.formTextForm.get('content')?.valueChanges.subscribe((value: string) => {
      this.internalLinkCount = this.countTotalAmountOfSpecificWordInaString(value, 'internalLink');
      this.externalLinkCount = this.countTotalAmountOfSpecificWordInaString(value, 'externalLink');
    });
  }

  updateTextCharCount(charCount: number) {
    this.textCharCount = charCount;
  }
  updateTextWordCount(wordCount: number) {
    this.textWordCount = wordCount;
  }

  countTotalAmountOfSpecificWordInaString(text: string, toFind: string)
  {
    let next = 0;
    let findedword = 0;
        do {
              var n = text.indexOf(toFind, next);
              findedword = findedword +1;
              next = n + toFind.length;
            } 
        while (n>=0);
     return findedword - 1;
   }

  updateSlug(value: string) {
    let re = /\ /gi;
    var slug = value.replace(re, '-');
    this.seoForm.patchValue({
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
      var focusKeyPhrase = (this.seoForm?.value['focusKeyphrase'] as string)?.toLocaleLowerCase();

      if(fieldContent.length === 0 || focusKeyPhrase.length === 0) {
        return {startsWithFocusKeyphrase: true};
      }

      return fieldContent.startsWith(focusKeyPhrase, 0) ? null : {startsWithFocusKeyphrase: true};
    };
  }
  fieldContainsFocusKeyphrase(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {

      var fieldContent = (control.value as string).toLocaleLowerCase();
      var focusKeyPhrase = (this.seoForm?.value['focusKeyphrase'] as string)?.toLocaleLowerCase();

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

                          
