import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { currentRouteState } from 'app/store';
import { Subscription } from 'rxjs';
import { Post } from 'app/shared/models/data.model';
import { selectPosts } from '../../store';
import { viewSinglePost } from '../../store/view-single-post/view-single-post.actions';
import { updatePost } from '../../store/update-post/update-post.actions';

@Component({
  selector: 'app-update-post',
  templateUrl: './update-post.component.html',
  styleUrls: ['./update-post.component.scss'],
})
export class UpdatePostComponent implements OnInit, OnDestroy {
  imageFile: any;
  croppedImage: any = '';
  routeSub: Subscription;
  postSub: Subscription;
  routeParams: { [key: string]: any };
  postData: Post;
  updatePostForm: FormGroup;

  routerData$ = this.store.pipe(
    select(currentRouteState),
    map((state) => state)
  );

  postData$ = this.store.pipe(
    select(selectPosts),
    map((state) => state.viewSinglePost.post)
  );

  constructor(
    @Inject('API_BASE_URL') public apiUrl: string,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.imageFile = null;
    this.routeSub = this.routerData$.subscribe((route: any) => {
      this.routeParams = route.params;
    });
    this.postSub = this.postData$.subscribe((post) => {
      this.postData = post;
      this.updatePostForm = new FormGroup({
        title: new FormControl(post?.title, [Validators.required]),
        content: new FormControl(post?.content, [Validators.required]),
        image: new FormControl(''),
      });
    });
    this.store.dispatch(viewSinglePost({ id: this.routeParams?.id }));
  }

  get f() {
    return this.updatePostForm.controls;
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
    if (this.updatePostForm.invalid) {
      return;
    }
    this.store.dispatch(
      updatePost({
        payload: { ...this.updatePostForm.value, image: this.croppedImage },
        id: this.routeParams?.id,
      })
    );
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
    this.postSub.unsubscribe();
  }
}
