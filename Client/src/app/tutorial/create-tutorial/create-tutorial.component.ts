import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TreeItem, TreeviewConfig, TreeviewItem } from 'ngx-treeview';
import { MyUploadAdapter } from 'src/app/shared/my-upload-adapter';
import { Category } from 'src/app/_models/category.model';
import { CreatePostDto } from 'src/app/_models/createPostDto.model';
import { Tag } from 'src/app/_models/tag.model';
import { CategoryService } from 'src/app/_services/category.service';
import { TagsService } from 'src/app/_services/tags.service';
import { TutorialService } from 'src/app/_services/tutorial.service';
import { Status } from '../../_utils/status.enum';
import { environment } from 'src/environments/environment';
import * as Editor from '../../_ckeditor5/build/ckeditor';
import { WORD_PER_MINUTES } from 'src/app/_utils/global.variables';
import { FileUploader } from 'ng2-file-upload';
import { UpsertTutorialDto } from 'src/app/_models/upsertTutorialDto.model';
import { AccountService } from 'src/app/_services/account.service';
import { User } from 'src/app/_models/user.model';
import { take } from 'rxjs/operators';


@Component({
  selector: 'app-create-tutorial',
  templateUrl: './create-tutorial.component.html',
  styleUrls: ['./create-tutorial.component.css']
})
export class CreateTutorialComponent implements OnInit {
  apiUrl = environment.apiUrl;
  serverUrl = environment.serverUrl;
  uploader:FileUploader;

  createTutorialForm: FormGroup;
  formTextForm: FormGroup;
  seoForm: FormGroup;
  Editor = Editor;
  @ViewChild('myEditor') myEditor: any;
  selectedCategory: TreeviewItem[] = [];
  selectedTags: Tag[] = [];
  featuredImageUrl: string = '';
  textCharCount: number;
  textWordCount: number;
  internalLinkCount: number = 0;
  externalLinkCount: number = 0;
  metaDescLength: number = 0;
  submitted = false;
  keyPhraseContentWords: string[] = [];
  keyPhraseContentWordsCount: number = 0;
  
  IFRAME_SRC = '//cdn.iframe.ly/api/iframe';
  IFRAMELY_API_KEY = environment.iFramelyApiKey;

  status: typeof Status;

  user: User;
  

  constructor(
    private accountService: AccountService,
    private categoryService: CategoryService,
    private tagsService: TagsService,
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private tutorialService: TutorialService) {
      this.status = Status;
  }

  ngOnInit(): void {
    this.initializeForms();

    this.accountService.currentUser$
      .pipe(take(1))
      .subscribe(u => this.user = u);
      
    this.initFileUploader();
  }

  onSaveTutorial() {

  }
  onUploadTutorial(status: string) {
      this.submitted = true;

      // stop here if form is invalid
      if (this.createTutorialForm.invalid) {
          return;
      }

      var tutorial = this.createTutorialDtoFromForms(status);
      this.tutorialService.upsertTutorial(tutorial).subscribe((result: any) => {
        console.log(result);
        this.toastr.success(result.message);
        this.createTutorialForm.patchValue({
          id: result.tutorialId
        })
      }, error => {
        console.log(error);
      });
  }


  createTutorialDtoFromForms(status: string) {
    let tagIds: number[] = [];
    for(let tag of this.selectedTags) {
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

    this.getInitialCategories();
  }

  private initFileUploader() {
    this.uploader = new FileUploader({
      url: this.apiUrl + 'Tutorial/add-featured-post-image',
      authToken: 'Bearer ' + this.user?.token,
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false
    });
 
    this.uploader.onSuccessItem = (item, response: any, status, headers) => {
      if(response) {
        this.featuredImageUrl = this.serverUrl + response;
        this.createTutorialForm.patchValue({
          featuredImageUrl: this.featuredImageUrl
        })
      }
    }
  }

  countTotalAmountOfSpecificWordInaString(text: string, toFind: string)
  {
    let next = 0;
    let findedword = 0;
        do {
            var n = text.indexOf(toFind, next);
            findedword = findedword +1;
            next = n + toFind.length;
            } while (n>=0);
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
      this.keyPhraseContentWordsCount = splitted.length;

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


  editorConfig = {
    toolbar: {
      items: [
        'heading', '|',
        'fontfamily', 'fontsize', 'alignment', 'fontColor', 'fontBackgroundColor', 'highlight', 'removeFormat', '|',
        'bold', 'italic', 'strikethrough', 'underline', 'subscript', 'superscript', '|',
        'link', '|',
        'outdent', 'indent', '|',
        'bulletedList', 'numberedList', '|',
        'code', 'codeBlock', '|',
        'insertTable', '|',
        'imageUpload', 'mediaEmbed', 'blockQuote', '|',
        'pageBreak', '|',
        'horizontalLine', 'findAndReplace', '|', 
        'undo', 'redo', '|', 
        'sourceEditing', 'specialCharacters', 'restrictedEditingException', '|',
        'textPartLanguage'
      ],
      shouldNotGroupWhenFull: true,

    },
    heading: {
      options: [
          { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
          { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
          { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' },
          { model: 'heading3', view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3' },
          { model: 'heading4', view: 'h4', title: 'Heading 4', class: 'ck-heading_heading4' },
          { model: 'heading5', view: 'h5', title: 'Heading 5', class: 'ck-heading_heading5' },
          { model: 'heading6', view: 'h6', title: 'Heading 6', class: 'ck-heading_heading6' }
      ]
    },
    wordCount: {
      onUpdate: (stats: any) => {
          // Prints the current content statistics.
          this.textCharCount = stats.characters;
          this.textWordCount = stats.words;
      }
    },
    fontColor: {
      colors: [
          {
              color: 'hsl(0, 0%, 0%)',
              label: 'Black'
          },
          {
              color: 'hsl(0, 0%, 30%)',
              label: 'Dim grey'
          },
          {
              color: 'hsl(0, 0%, 60%)',
              label: 'Grey'
          },
          {
              color: 'hsl(0, 0%, 90%)',
              label: 'Light grey'
          },
          {
              color: 'hsl(0, 0%, 100%)',
              label: 'White',
              hasBorder: true
          },
          {
              color: '#1976D2',
              label: 'Nav Blue'
          },

          // ...
      ]
    },
    link: {
      decorators: {
          toggleDownloadable: {
              mode: 'manual',
              label: 'Downloadable',
              attributes: {
                  download: 'file'
              }
          },
          openInNewTab: {
              mode: 'manual',
              label: 'Open in a new tab',
              defaultValue: true,			// This option will be selected by default.
              attributes: {
                  target: '_blank',
                  rel: 'noopener noreferrer'
              }
          },
          addInternalLink: {
            mode: 'manual',
            label: 'Internal link',
            attributes: {
                tag: 'internalLink',
            }
          },
          addExternalLink: {
            mode: 'manual',
            label: 'External link',
            attributes: {
                tag: 'externalLink',
            }
          }
      }
    },
    image: {
      // Configure the available styles.
      styles: [
        'alignLeft', 'alignCenter', 'alignRight'
      ],
      // Configure the available image resize options.
      resizeOptions: [
        {
          name: 'resizeImage:original',
          label: 'Original',
          value: null
        },
        {
          name: 'resizeImage:50',
          label: '25%',
          value: '25'
        },
        {
          name: 'resizeImage:50',
          label: '50%',
          value: '50'
        },
        {
          name: 'resizeImage:75',
          label: '75%',
          value: '75'
        }
      ],

      // You need to configure the image toolbar, too, so it shows the new style
      // buttons as well as the resize buttons.
      toolbar: [
        'imageStyle:alignLeft', 'imageStyle:alignCenter', 'imageStyle:alignRight', 'imageStyle:block', 'imageStyle:side',
        '|',
        'ImageResize',
        '|',
        'imageTextAlternative',
        '|',
        'toggleImageCaption',
        '|',
        'linkImage'
      ]
    },
    mediaEmbed: {

      // Previews are always enabled if there’s a provider for a URL (below regex catches all URLs)
      // By default `previewsInData` are disabled, but let’s set it to `false` explicitely to be sure
      previewsInData: false,

      providers: [
          {
              // hint: this is just for previews. Get actual HTML codes by making API calls from your CMS
              name: 'iframely previews', 

              // Match all URLs or just the ones you need:
              url: /.+/,

              html: (match: any) => {
                  const url = match[ 0 ];
                  
                  var iframeUrl = this.IFRAME_SRC + '?app=1&api_key=' + this.IFRAMELY_API_KEY + '&url=' + encodeURIComponent(url);
                  // alternatively, use &key= instead of &api_key with the MD5 hash of your api_key
                  // more about it: https://iframely.com/docs/allow-origins

                  return (
                      // If you need, set maxwidth and other styles for 'iframely-embed' class - it's yours to customize
                      '<div class="iframely-embed">' +
                          '<div class="iframely-responsive">' +
                              `<iframe src="${ iframeUrl }" ` +
                                  'frameborder="0" allow="autoplay; encrypted-media" allowfullscreen>' +
                              '</iframe>' +
                          '</div>' +
                      '</div>'
                  );
                }
            }
        ]
    },

    language: 'en',
    placeholder: 'Type here..'
  };

  value = 11;
  categories: TreeviewItem[];
  config = TreeviewConfig.create({
    hasFilter: true,
    hasCollapseExpand: true
  });

  onCategoryValueChange(value: number): void {
    let selectedItem = this.categories.find(i => i.value === value) as TreeviewItem;
    this.selectedCategory.push(selectedItem);
    this.createTutorialForm.patchValue({
      category: selectedItem
    })
    this.getChildCategories(selectedItem.value);
  }

  onRemoveCategories() {
    this.selectedCategory = this.selectedCategory.filter(i => i.value < 0) as TreeviewItem[];
    this.getChildCategories(null as any);
    this.createTutorialForm.patchValue({
      category: null
    })
  }

  // Category
  private generateTreeviewItemArray(categories: Category[]): TreeviewItem[] {
    let treeViewItems: TreeviewItem[] = [];
    for (let index = 0; index < categories.length; index++) {
      treeViewItems.push(new TreeviewItem({
          text: categories[index].name,
          value: categories[index].id
        } as TreeItem
      ));
    }
    return treeViewItems;
  }
  private getInitialCategories() {
    this.categoryService.getCategories(null).subscribe((result: any) => {
      this.categories = this.generateTreeviewItemArray(result as Category[]);
    }, error => {
      console.log('API Error: ' + error);
    });
  }
  private getChildCategories(value: number) {    
    this.categories = [new TreeviewItem({ text: "", value: 0 })];

    this.categoryService.getCategories(value).subscribe((result: any) => {
      this.categories = this.generateTreeviewItemArray(result as Category[]);
    }, error => {
      console.log('API Error: ' + error);
    });
  }



  // AutoComplete
  historyIdentifier = [];
  keyword = 'name';
  tags = [];
  selectEvent(item: any) {
    let alreadyAdded = this.selectedTags.filter(_item => _item.id === item.id).length > 0;
    if(!alreadyAdded) {
      this.selectedTags.push({
        id: item.id,
        name: item.name
      } as Tag);
      this.createTutorialForm.patchValue({
        tags: this.selectedTags
      })
    } else {
      this.toastr.warning('You have already added ' + item.name);
    }
  }
  onChangeSearch(searchText: string) {
    this.tagsService.searchTags(searchText)?.subscribe(result => {
      if(result) {
        this.tags = result as [];
      }
    })
  }

  onRemoveTag(id: number) {
    this.selectedTags = this.selectedTags.filter(item => item.id !== id);

    if(this.selectedTags.length === 0) {
      this.createTutorialForm.patchValue({
        tags: []
      })
    }
  }

  onReady($event: any) {
    $event.plugins.get('FileRepository').createUploadAdapter = (loader: any) => {
      return new MyUploadAdapter(loader, this.serverUrl, this.apiUrl);
    };
  }
}

export const functionWords = ["a", 
                          "about", 
                          "above", 
                          "across", 
                          "after", 
                          "afterwards", 
                          "again", 
                          "against", 
                          "all", 
                          "almost", 
                          "alone", 
                          "along", 
                          "already", 
                          "also", 
                          "although", 
                          "always", 
                          "am", 
                          "among", 
                          "amongst", 
                          "amoungst", 
                          "an", 
                          "and", 
                          "another", 
                          "any", 
                          "anyhow", 
                          "anyone", 
                          "anything", 
                          "anyway", 
                          "anywhere", 
                          "are", 
                          "around", 
                          "as", 
                          "at", 
                          "be", 
                          "became", 
                          "because", 
                          "been", 
                          "before", 
                          "beforehand", 
                          "behind", 
                          "being", 
                          "below", 
                          "beside", 
                          "besides", 
                          "between", 
                          "beyond", 
                          "both", 
                          "but", 
                          "by", 
                          "can", 
                          "cannot", 
                          "could", 
                          "dare", 
                          "despite", 
                          "did", 
                          "do", 
                          "does", 
                          "done", 
                          "down", 
                          "during", 
                          "each", 
                          "eg", 
                          "either", 
                          "else", 
                          "elsewhere", 
                          "enough", 
                          "etc", 
                          "even", 
                          "ever", 
                          "every", 
                          "everyone", 
                          "everything", 
                          "everywhere", 
                          "except", 
                          "few", 
                          "first", 
                          "for", 
                          "former", 
                          "formerly", 
                          "from", 
                          "further", 
                          "furthermore", 
                          "had", 
                          "has", 
                          "have", 
                          "he", 
                          "hence", 
                          "her", 
                          "here", 
                          "hereabouts", 
                          "hereafter", 
                          "hereby", 
                          "herein", 
                          "hereinafter", 
                          "heretofore", 
                          "hereunder", 
                          "hereupon", 
                          "herewith", 
                          "hers", 
                          "herself", 
                          "him", 
                          "himself", 
                          "his", 
                          "how", 
                          "however", 
                          "i", 
                          "ie", 
                          "if", 
                          "in", 
                          "indeed", 
                          "inside", 
                          "instead", 
                          "into", 
                          "is", 
                          "it", 
                          "its", 
                          "itself", 
                          "last", 
                          "latter", 
                          "latterly", 
                          "least", 
                          "less", 
                          "lot", 
                          "lots", 
                          "many", 
                          "may", 
                          "me", 
                          "meanwhile", 
                          "might", 
                          "mine", 
                          "more", 
                          "moreover", 
                          "most", 
                          "mostly", 
                          "much", 
                          "must", 
                          "my", 
                          "myself", 
                          "namely", 
                          "near", 
                          "need", 
                          "neither", 
                          "never", 
                          "nevertheless", 
                          "next", 
                          "no", 
                          "nobody", 
                          "none", 
                          "noone", 
                          "nor", 
                          "not", 
                          "nothing", 
                          "now", 
                          "nowhere", 
                          "of", 
                          "off", 
                          "often", 
                          "oftentimes", 
                          "on", 
                          "once", 
                          "one", 
                          "only", 
                          "onto", 
                          "or", 
                          "other", 
                          "others", 
                          "otherwise", 
                          "ought", 
                          "our", 
                          "ours", 
                          "ourselves", 
                          "out", 
                          "outside", 
                          "over", 
                          "per", 
                          "perhaps", 
                          "rather", 
                          "re", 
                          "same", 
                          "second", 
                          "several", 
                          "shall", 
                          "she", 
                          "should", 
                          "since", 
                          "so", 
                          "some", 
                          "somehow", 
                          "someone", 
                          "something", 
                          "sometime", 
                          "sometimes", 
                          "somewhat", 
                          "somewhere", 
                          "still", 
                          "such", 
                          "than", 
                          "that", 
                          "the", 
                          "their", 
                          "theirs", 
                          "them", 
                          "themselves", 
                          "then", 
                          "thence", 
                          "there", 
                          "thereabouts", 
                          "thereafter", 
                          "thereby", 
                          "therefore", 
                          "therein", 
                          "thereof", 
                          "thereon", 
                          "thereupon", 
                          "these", 
                          "they", 
                          "third", 
                          "this", 
                          "those", 
                          "though", 
                          "through", 
                          "throughout", 
                          "thru", 
                          "thus", 
                          "to", 
                          "together", 
                          "too", 
                          "top", 
                          "toward", 
                          "towards", 
                          "under", 
                          "until", 
                          "up", 
                          "upon", 
                          "us", 
                          "used", 
                          "very", 
                          "via", 
                          "was", 
                          "we", 
                          "well", 
                          "were", 
                          "what", 
                          "whatever", 
                          "when", 
                          "whence", 
                          "whenever", 
                          "where", 
                          "whereafter", 
                          "whereas", 
                          "whereby", 
                          "wherein", 
                          "whereupon", 
                          "wherever", 
                          "whether", 
                          "which", 
                          "while", 
                          "whither", 
                          "who", 
                          "whoever", 
                          "whole", 
                          "whom", 
                          "whose", 
                          "why", 
                          "whyever", 
                          "will", 
                          "with", 
                          "within", 
                          "without", 
                          "would", 
                          "yes", 
                          "yet", 
                          "you", 
                          "your", 
                          "yours", 
                          "yourself", 
                          "yourselves"]
                          
