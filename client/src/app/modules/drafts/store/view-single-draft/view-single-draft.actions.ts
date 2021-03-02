import { createAction, props } from '@ngrx/store';
import { Post } from 'app/shared/models/data.model';

export enum DraftActionsTypes {
  ViewSingleDraft = '[Drafts] View Single Draft',
  ViewSingleDraftSuccess = '[Drafts] View Single Draft Success',
  ViewSingleDraftFail = '[Drafts] View Single Draft Fail',
}

export const viewSingleDraft = createAction(
  DraftActionsTypes.ViewSingleDraft,
  props<{
    id: number;
  }>()
);

export const draftSuccess = createAction(
  DraftActionsTypes.ViewSingleDraftSuccess,
  props<{
    draft: Post;
  }>()
);

export const draftFail = createAction(
  DraftActionsTypes.ViewSingleDraftFail,
  props<{
    error: string;
  }>()
);
