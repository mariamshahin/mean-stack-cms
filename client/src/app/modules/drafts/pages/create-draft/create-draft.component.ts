import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { createDraft } from '../../store/create-draft/create-draft.actions';

@Component({
  selector: 'app-create-draft',
  templateUrl: './create-draft.component.html',
  styleUrls: ['./create-draft.component.scss'],
})
export class CreateDraftComponent implements OnInit {
  imageFile: any;
  croppedImage: any = '';

  createDraftForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    content: new FormControl('', [Validators.required]),
    image: new FormControl(''),
  });

  constructor(private store: Store) {}

  ngOnInit() {
    this.imageFile = null;
  }

  get f() {
    return this.createDraftForm.controls;
  }

  selectFile(e) {
    if (e) {
      this.imageFile = e;
    }
  }

  imageCrop(e) {
    this.croppedImage = e;
  }

  formSubmit() {
    if (this.createDraftForm.invalid) {
      return;
    }
    this.store.dispatch(
      createDraft({
        payload: { ...this.createDraftForm.value, image: this.croppedImage },
      })
    );
  }
}
