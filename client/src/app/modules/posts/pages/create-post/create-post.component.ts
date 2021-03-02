import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { createPost } from '../../store/create-post/create-post.actions';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss'],
})
export class CreatePostComponent implements OnInit {
  imageFile: any;
  croppedImage: any = '';

  createPostForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    content: new FormControl('', [Validators.required]),
    image: new FormControl(''),
  });

  constructor(private store: Store) {}

  ngOnInit() {
    this.imageFile = null;
  }

  get f() {
    return this.createPostForm.controls;
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
    if (this.createPostForm.invalid) {
      return;
    }
    this.store.dispatch(
      createPost({
        payload: { ...this.createPostForm.value, image: this.croppedImage },
      })
    );
  }
}
