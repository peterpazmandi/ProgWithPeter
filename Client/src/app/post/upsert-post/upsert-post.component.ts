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
import { SeoFormService } from 'src/app/_forms/seo-form/seo-form.service';
import { PostType } from 'src/app/_utils/post-type.enum';
import { CourseService } from 'src/app/_services/course.service';
import { CreateMetaDto } from 'src/app/_models/createMetaDto.model';
import { UpsertCourseDto } from 'src/app/_models/upsertCourseDto.model';
import { BaseContent } from 'src/app/_models/base-content.model';
import { SectionsAndLecturesFormService } from 'src/app/section/upsert-sections-and-lectures-list/sections-and-lectures-form.service';
import { Course } from 'src/app/_models/courseDto.model';
import { Section } from 'src/app/_models/sectionDto.model';
import { UpsertSectionDto } from 'src/app/_models/upsertSectionDto.model';


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
      this.seoFormService.seoForm.dirty ||
      this.sectionsAndLecturesFormService.sectionsAndLecturesFrom.dirty) {
        $event.returnValue = true;
      }
  }
  

  constructor(
    private accountService: AccountService,
    public seoFormService: SeoFormService,
    public sectionsAndLecturesFormService: SectionsAndLecturesFormService,
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
      switch(this.selectedPostType) {
        case this.postType.Tutorial: {
          this.tutorialService.getTutorialByTitle(this.slug).subscribe(tutorial => {
            this.updatePostForms(tutorial);
          }, error => {
            console.log(error);
          });
          break;
        }
        case this.postType.Course: {
          this.courseService.getCourseByTitle(this.slug, this.user.id).subscribe(course => {
            this.updatePostForms(course);
          }, error => {
            console.log(error);
          })
          break;
        }
        case this.postType.Lecture: {
          let courseTitle = this.route.snapshot.queryParams['courseTitle'];
          break;
        }
      }
    }
  }
                          
  createBackRouterLink(): string {
    return '/' + this.selectedPostType.toLocaleLowerCase() + '-list';
  }
  
  updatePostForms(content: BaseContent) {
    this.currentStatus = content.status;
    
    this.createPostForm.patchValue({
      id: content.id,
      title: content.post.title,
      category: new TreeviewItem({
        text: content.post.category?.name,
        value: content.post.category?.id
      } as TreeItem),
      tags: content.post.tags,
      featuredImageUrl: content.post.featuredImageUrl
    });  

    this.formTextForm.patchValue({
      excerpt: content.post.excerpt,
      content: content.post.content
    });

    this.seoFormService.seoForm.patchValue({
      focusKeyphrase: content.post.meta?.keyPhrase,
      seoTitle: content.post.meta?.seoTitle,
      slug: content.post.meta?.slug,
      metaDescription: content.post.meta?.metaDescription
    });
    
    if(this.selectedPostType === PostType.Course) {
      this.sectionsAndLecturesFormService.sectionsAndLecturesFrom.patchValue({
        sections: (content as Course).sections
      })
    }
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
    var course = this.createCourseDtoFromForms(status);
    this.courseService.upsertCourse(course).subscribe((result: any) => {
      this.toastr.success(result.message);
      this.updatePostForms(result.course.result.value);

      // Undirty the forms
      this.createPostForm.markAsPristine();
      this.formTextForm.markAsPristine();
      this.seoFormService.seoForm.markAsPristine();
      
    }, error => {
      console.log(error);
    })
  }
  private createCourseDtoFromForms(status: string): UpsertCourseDto {
    return {
      id: (this.createPostForm?.value['id'] as number),
      status: status,
      price: 0,
      currency: '',
      post: this.createPostDtoFromForms(),
      sections: this.createSectionUpsertSectionDto()
    } as UpsertCourseDto;
  }

  private createTutorialDtoFromForms(status: string): UpsertTutorialDto {
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

  private createSectionUpsertSectionDto() {
    let sections: UpsertSectionDto[] = [];

    for(let section of this.sectionsAndLecturesFormService.sectionsAndLecturesFrom?.value['sections'] as Section[]) {
      sections.push(section);
    }

    return sections;
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
    
    this.sectionsAndLecturesFormService.sectionsAndLecturesFrom = this.fb.group({
      sections: [[] as Section[]]
    })
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

