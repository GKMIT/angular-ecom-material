import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormArray,
  FormControl
} from '@angular/forms';
import { FormService } from 'src/app/providers/form/form.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BannerService } from 'src/app/providers/catalog/banner.service';
import {
  startWith,
  debounceTime,
  tap,
  switchMap,
  finalize
} from 'rxjs/operators';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { TypeService } from 'src/app/providers/catalog/type.service';
import { Constant } from 'src/app/helper/constant';

class ImageSnippet {
  constructor(public src: string, public file: File) {}
}

@Component({
  selector: 'app-banner-form',
  templateUrl: './banner-form.component.html',
  styleUrls: ['./banner-form.component.css']
})
export class BannerFormComponent implements OnInit {
  public pageHeading = 'Banner Form';
  public data: any;
  public status: any;
  public message: any;
  public messageTitle: string;
  hide = true;
  type;
  typeId;
  name;
  public imageGroup: FormArray;
  selectedFile: ImageSnippet;

  types;
  isLoading = false;

  public form: FormGroup;
  public formErrors = {
    name: '',
    type: ''
  };

  constructor(
    public masterService: BannerService,
    public typeService: TypeService,
    private formBuilder: FormBuilder,
    private formService: FormService,
    private router: Router,
    public activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  get formData() {    
    return (this.form.get('images') as FormArray).controls;
  }

  getId() {
    const id = this.activatedRoute.snapshot.paramMap.get('id')
      ? this.activatedRoute.snapshot.paramMap.get('id')
      : 'new';
    return id;
  }

  goBack() {
    this.router.navigate(['/banners']);
  }

  createImage(name, image, imageThumb, link, sortOrder): FormGroup {
    return this.formBuilder.group({
      name: new FormControl(name),
      image: new FormControl(image),
      image_thumb: new FormControl(imageThumb),
      link: new FormControl(link),
      sort_order: new FormControl(sortOrder)
    });
  }

  addImage(): void {
    this.imageGroup = <FormArray>this.form.controls['images'];
    this.imageGroup.push(this.createImage('', '', '', '', ''));

    console.log(this.form.controls.images);
  }

  delImage(index: number): void {
    const arrayControl = <FormArray>this.form.controls['images'];
    arrayControl.removeAt(index);
  }

  ngOnInit() {
    if (this.getId() !== 'new') {
      this.getDetail(this.getId());
    }

    this.form = this.formBuilder.group({
      name: [this.name, Validators.required],
      typeId: [this.typeId],
      type: [this.type, Validators.required],
      images: this.formBuilder.array([])
    });

    this.form.valueChanges.subscribe(data => {
      this.formErrors = this.formService.validateForm(
        this.form,
        this.formErrors,
        true
      );
    });

    this.getAutocomplete();
  }

  getAutocomplete() {
    const constant = new Constant();
    this.form
      .get('type')
      .valueChanges.pipe(
        startWith(''),
        debounceTime(1000),
        tap(() => (this.isLoading = true)),
        switchMap(value =>
          this.typeService
            .list({
              search: value,
              pageSize: constant.autocompleteListSize,
              pageIndex: 0,
              sort_by: 'name'
            })
            .pipe(finalize(() => (this.isLoading = false)))
        )
      )
      .subscribe(res => {
        if (res.status) {
          this.types = res.data;
        }
      });
  }

  onSelectionChanged(event: MatAutocompleteSelectedEvent) {
    this.form.controls.typeId.setValue(event.option.value.id);
  }

  displayFn(data: any): string {
    return data ? data.name : data;
  }

  getDetail(id) {
    this.masterService.detail(id).subscribe(
      response => {
        if (response.status) {
          this.name = response.data.name;
          this.type = {
            id: response.data.type_id,
            name: response.data.type
          };
          this.typeId = response.data.type_id;

          this.imageGroup = this.form.get('images') as FormArray;

          if (response.data.images) {
            response.data.images.forEach(element => {
              this.imageGroup.push(
                this.createImage(
                  element.name,
                  element.image,
                  element.image_thumb,
                  element.link,
                  element.sort_order
                )
              );
            });
          }
        }
      },
      err => {
        console.error(err);
      }
    );
  }

  public onSubmit() {
    console.log(this.form.value);
    // mark all fields as touched
    this.formService.markFormGroupTouched(this.form);
    if (this.form.valid) {
      this.masterService.save(this.form.value, this.getId()).subscribe(
        response => {
          if (!response.status) {
            if (response.result) {
              response.result.forEach((element: { id: any; text: any }) => {
                this.formErrors[`${element.id}`] = element.text;
              });
            }
          } else {
            this.form.reset();
            this.router.navigate(['/banners']);
          }

          this.snackBar.open(response.message, 'X', {
            duration: 2000
          });
        },
        err => {
          console.error(err);
        }
      );
    } else {
      this.formErrors = this.formService.validateForm(
        this.form,
        this.formErrors,
        false
      );
    }
  }

  uploadImage(e: any, control: any) {
    const file: File = e.target.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {
      this.selectedFile = new ImageSnippet(event.target.result, file);
      this.masterService.imageUpload(this.selectedFile.file).subscribe(
        res => {
          control.value.image = res.data.base_path;
          control.value.image_thumb = res.data.full_path;
        },
        err => {
          console.log(err);
        }
      );
    });

    reader.readAsDataURL(file);
  }
}
