import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
import { SeoFormService } from 'src/app/_forms/seo-form/seo-form.service';
import { PostType } from 'src/app/_utils/post-type.enum';


@Component({
  selector: 'app-upsert-tutorial',
  templateUrl: './upsert-tutorial.component.html',
  styleUrls: ['./upsert-tutorial.component.css']
})
export class UpsertTutorialComponent implements OnInit {
  apiUrl = environment.apiUrl;
  serverUrl = environment.serverUrl;
  uploader: FileUploader;

  createTutorialForm: FormGroup;
  formTextForm: FormGroup;
  textCharCount: number;
  textWordCount: number;
  internalLinkCount: number = 0;
  externalLinkCount: number = 0;
  metaDescLength: number = 0;
  submitted = false;
  keyPhraseContentWords: string[] = [];

  status: typeof Status;
  currentStatus: string;

  postType: typeof PostType;
  selectedPostType: string;

  user: User;

  @HostListener('window:beforeunload', ['$event']) unloadNofitifaction($event: any) {
    if(this.createTutorialForm.dirty
      || this.formTextForm.dirty ||
      this.seoFormService.seoForm.dirty) {
        $event.returnValue = true;
      }
  }
  

  constructor(
    private accountService: AccountService,
    public seoFormService: SeoFormService,
    private tutorialService: TutorialService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private route: ActivatedRoute) {
      this.status = Status;
      this.postType = PostType;
      this.currentStatus = this.status.NotSavedYet;
  }

  ngOnInit(): void {
    this.initializeForms();

    this.accountService.currentUser$
      .pipe(take(1))
      .subscribe(u => this.user = u);

    this.selectedPostType = this.route.snapshot.queryParams['posttype'];
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

    this.seoFormService.seoForm.patchValue({
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
        this.seoFormService.seoForm.markAsPristine();
        
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
          keyPhrase: (this.seoFormService.seoForm?.value['focusKeyphrase'] as string),
          seoTitle: (this.seoFormService.seoForm?.value['seoTitle'] as string),
          slug: (this.seoFormService.seoForm?.value['slug'] as string),
          metaDescription: (this.seoFormService.seoForm?.value['metaDescription'] as string),
        },
        length: this.textWordCount / WORD_PER_MINUTES
      } as CreatePostDto
    } as UpsertTutorialDto;

  }

  get createTutorialF() { return this.createTutorialForm.controls; }
  get seoF() { return this.seoFormService.seoForm.controls; }

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
}

                          
