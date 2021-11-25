import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TreeItem, TreeviewConfig, TreeviewItem } from 'ngx-treeview';
import { Category } from 'src/app/_models/categoryDto.model';
import { Tag } from 'src/app/_models/tagDto.model';
import { CategoryService } from 'src/app/_services/category.service';
import { TagsService } from 'src/app/_services/tags.service';
import * as Editor from '../../_ckeditor5/build/ckeditor';


@Component({
  selector: 'app-create-tutorial',
  templateUrl: './create-tutorial.component.html',
  styleUrls: ['./create-tutorial.component.css']
})
export class CreateTutorialComponent implements OnInit {
  createTutorialForm: FormGroup;
  seoForm: FormGroup;
  submitted = false;
  public Editor = Editor;
  charCount: number;
  wordCount: number;
  selectedCategory: TreeviewItem[] = [];
  selectedTags: Tag[] = [];
  contentWords: number = 0;

  constructor(
    private categoryService: CategoryService,
    private tagsService: TagsService,
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.initializeForms();
  }

  onSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      if (this.createTutorialForm.invalid) {
          return;
      }
  }

  get createTutorialF() { return this.createTutorialForm.controls; }
  get seoF() { return this.seoForm.controls; }

  private initializeForms() {
    this.createTutorialForm = this.fb.group({
      focusKeyphrase: ['', [Validators.required]],
      title: ['', [Validators.required, Validators.minLength(8)]],
      category: ['', [Validators.required]],
      tags: [[], [Validators.required]]
    })

    this.seoForm = this.fb.group({
      focusKeyphrase: ['', [Validators.required, this.nameValidation()]],
      seoTitle: ['', [Validators.required]],
      slug: ['', [Validators.required]],
      metaDescription: ['', [Validators.required]]
    })

    this.seoForm.get('seoTitle')?.valueChanges.subscribe((value: string) => {
      this.calculateSeoTitleLengthStrength(value.length);
    });

    this.getInitialCategories();
  }

  // Custom validators
  nameValidation(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      var focusKeyPhrase = control.value;
      var splitted: string[] = focusKeyPhrase.split(" ");

      // Remove last item, if length is zero
      splitted = splitted.filter(item => item.length !== 0);

      // for(let i = 0; i < splitted.length; i++) {
      //   console.log(splitted[i]);
      //   if(functionWords.includes(splitted[i].toLowerCase())) {
      //     console.log(splitted);
      //     splitted = splitted.filter(item => item.toLowerCase() !== splitted[i].toLowerCase());
      //   }
      // }
      
      splitted = splitted.filter(item => !functionWords.includes(item.toLowerCase()));
      console.log(splitted);
      this.contentWords = splitted.length;

      return splitted.length > 3 && splitted.length < 7 ? null : {strongEnough: true};
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
        'bulletedList', 'numberedList', 'todoList', '|',
        'code', 'codeBlock', '|',
        'insertTable', '|',
        'imageUpload', 'mediaEmbed', 'blockQuote', '|',
        'todoList', '|',
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
          this.charCount = stats.characters;
          this.wordCount = stats.words;
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
        'imageStyle:alignLeft', 'imageStyle:alignCenter', 'imageStyle:alignRight',
        '|',
        'ImageResize',
        '|',
        'imageTextAlternative'
      ]
    },
    simpleUpload: {
        // The URL that the images are uploaded to.
        uploadUrl: 'http://example.com',

        // Enable the XMLHttpRequest.withCredentials property.
        withCredentials: true,

        // Headers sent along with the XMLHttpRequest to the upload server.
        headers: {
            'X-CSRF-TOKEN': 'CSRF-Token',
            Authorization: 'Bearer <JSON Web Token>'
        }
    },

    language: 'en'
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


  // SEO
  calculateSeoTitleLengthStrength(length: number) {
    console.dir(length);
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

