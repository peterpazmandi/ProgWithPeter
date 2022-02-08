import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TreeItem, TreeviewItem } from 'ngx-treeview';
import { UpsertPostDto } from 'src/app/_models/upsertPostDto.model';
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
import { CourseService } from 'src/app/_services/course.service';
import { CreateMetaDto } from 'src/app/_models/createMetaDto.model';


@Component({
  selector: 'upsert-post',
  templateUrl: './upsert-post.component.html',
  styleUrls: ['./upsert-post.component.css']
})
export class UpsertPostComponent implements OnInit {
  slug: string;

  apiUrl = environment.apiUrl;
  serverUrl = environment.serverUrl;
  uploader: FileUploader;

  createPostForm: FormGroup;
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
  backRouterLink: string;

  user: User;

  @HostListener('window:beforeunload', ['$event']) unloadNofitifaction($event: any) {
    if(this.createPostForm.dirty
      || this.formTextForm.dirty ||
      this.seoFormService.seoForm.dirty) {
        $event.returnValue = true;
      }
  }
  

  constructor(
    private accountService: AccountService,
    public seoFormService: SeoFormService,
    private tutorialService: TutorialService,
    private courseService: CourseService,
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
    this.backRouterLink = this.createBackRouterLink();
    this.slug = this.route.snapshot.queryParams['slug'];
    if(this.slug) {
      this.tutorialService.getTutorialByTitle(this.slug).subscribe(tutorial => {
        this.updatePostForms(tutorial);
      }, error => {
        console.log(error);
      });
    }
  }
                          
  createBackRouterLink(): string {
    return '/' + this.selectedPostType.toLocaleLowerCase() + '-list';
  }
  
  updatePostForms(tutorial: Tutorial) {
    this.currentStatus = tutorial.status;
    
    this.createPostForm.patchValue({
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
  
  onUpload(status: string) {
      this.submitted = true;
      this.currentStatus = status;

      // stop here if form is invalid
      if (this.createPostForm.invalid) {
          return;
      }

      switch(this.selectedPostType) {
        case PostType.Tutorial: { 
          this.uploadTutorial(status); 
          break;
        }
        case PostType.Course: { 
          this.uploadCourse(status); 
          break;
        }
      }
  }

  private uploadTutorial(status: string) {
    var tutorial = this.createTutorialDtoFromForms(status);
    
    this.tutorialService.upsertTutorial(tutorial).subscribe((result: any) => {
      console.log(result);
      this.toastr.success(result.message);
      this.createPostForm.patchValue({
        id: result.tutorialId
      })

      // Undirty the forms
      this.createPostForm.markAsPristine();
      this.formTextForm.markAsPristine();
      this.seoFormService.seoForm.markAsPristine();
      
    }, error => {
      console.log(error);
    });
  }

  private uploadCourse(status: string) {
    var tutorial = this.createCourseDtoFromForms(status);

  }
  private createCourseDtoFromForms(status: string) {
    
  }

  private createTutorialDtoFromForms(status: string) {
    return {
      id: (this.createPostForm?.value['id'] as number),
      status: status,
      price: 9.9,
      currency: 'USD',
      post: this.createPostDtoFromForms()
    } as UpsertTutorialDto;

  }

  private createPostDtoFromForms(): UpsertPostDto {
    let tagIds: number[] = [];
    let tags: Tag[] = this.createPostForm?.value['tags'] as Tag[];
    for(let tag of tags) {
      tagIds.push(tag.id);
    }
    return {
      title: (this.createPostForm?.value['title'] as string),
      excerpt: (this.formTextForm?.value['excerpt'] as string),
      content: (this.formTextForm?.value['content'] as string),
      password: '',
      featuredImageUrl: (this.createPostForm?.value['featuredImageUrl'] as string),
      tagIds: tagIds,
      categoryName: (this.createPostForm?.value['category'] as TreeviewItem).text,
      meta: this.createMetaDtoFromForms(),
      length: this.textWordCount / WORD_PER_MINUTES
    } as UpsertPostDto
  }

  private createMetaDtoFromForms(): CreateMetaDto {
    return {
      keyPhrase: (this.seoFormService.seoForm?.value['focusKeyphrase'] as string),
      seoTitle: (this.seoFormService.seoForm?.value['seoTitle'] as string),
      slug: (this.seoFormService.seoForm?.value['slug'] as string),
      metaDescription: (this.seoFormService.seoForm?.value['metaDescription'] as string),
    }
  }

  get createTutorialF() { return this.createPostForm.controls; }
  get seoF() { return this.seoFormService.seoForm.controls; }

  private initializeForms() {
    this.createPostForm = this.fb.group({
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

