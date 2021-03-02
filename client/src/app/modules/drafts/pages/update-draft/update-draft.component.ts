import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { currentRouteState } from 'app/store';
import { Subscription } from 'rxjs';
import { Post } from 'app/shared/models/data.model';
import { selectDrafts } from '../../store';
import { viewSingleDraft } from '../../store/view-single-draft/view-single-draft.actions';
import { updateDraft } from '../../store/update-draft/update-draft.actions';

@Component({
  selector: 'app-update-draft',
  templateUrl: './update-draft.component.html',
  styleUrls: ['./update-draft.component.scss'],
})
export class UpdateDraftComponent implements OnInit, OnDestroy {
  imageFile: any;
  croppedImage: any = '';
  routeSub: Subscription;
  draftSub: Subscription;
  routeParams: { [key: string]: any };
  draftData: Post;
  updateDraftForm: FormGroup;

  routerData$ = this.store.pipe(
    select(currentRouteState),
    map((state) => state)
  );

  draftData$ = this.store.pipe(
    select(selectDrafts),
    map((state) => state.viewSingleDraft.draft)
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
    this.draftSub = this.draftData$.subscribe((draft) => {
      this.draftData = draft;
      this.updateDraftForm = new FormGroup({
        title: new FormControl(draft?.title, [Validators.required]),
        content: new FormControl(draft?.content, [Validators.required]),
        image: new FormControl(''),
      });
    });
    this.store.dispatch(viewSingleDraft({ id: this.routeParams?.id }));
  }

  get f() {
    return this.updateDraftForm.controls;
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
    if (this.updateDraftForm.invalid) {
      return;
    }
    this.store.dispatch(
      updateDraft({
        payload: { ...this.updateDraftForm.value, image: this.croppedImage },
        id: this.routeParams?.id,
      })
    );
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
    this.draftSub.unsubscribe();
  }
}
